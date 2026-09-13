# Depth and `sol` Bridge Spec

## Purpose

This project defines a versioned browser-safe authoring contract that can later be interpreted by a spatial runtime without changing the authored intent.

- In flat browsers, `depth` changes shadow, lift, occlusion, and lighting cues.
- In spatial runtimes, the same `depth` value may become real geometry depth.
- `aframe-bootstrap` remains responsible for scene-native UI primitives and interaction, while this contract remains document-level and declarative.

## Authoring Contract

Current version: `depth-sol/0.3`

### Document Light

```html
<sol x="44" y="-36" z="116" size="58" color="hsl(196 90% 64%)" axes="xyz"></sol>
```

Authoring meaning:

- `x`: horizontal light position relative to the document scene origin
- `y`: vertical light position relative to the document scene origin
- `z`: distance of the light away from the page plane
- `size`: softness / area-light hint
- `color`: emitted light color
- `axes`: which axes the light should influence, default `xyz`

### Depth-Aware Surface

```css
.surface {
  width: 252px;
  aspect-ratio: 1;
  depth: 88px;
  z-index: var(--depth-sol-z-index);
}
```

Authoring meaning:

- `width`: planar size
- `aspect-ratio`: planar proportion
- `depth`: semantic height into space
- `layer`: ordered 2D stacking intent, normalized separately from physical depth
- `hovered`, `focused`, `selected`: boolean interaction state hints
- `motion`: one of `idle`, `enter`, `exit`, `active`, or `settled`

State may be authored through data attributes such as `data-depth-sol-layer`, `data-depth-sol-hover`, `data-depth-sol-focus`, `data-depth-sol-selected`, and `data-depth-sol-motion`, or passed directly to the module API. These names are producer metadata only; consumers decide how to map them into their own controls, scenes, and tokens.

## Flat Browser Interpretation

The element remains planar and should not require visible extrusion.

Recommended browser mapping:

- `depth` increases cast-shadow offset range
- `depth` increases blur radius and ambient occlusion
- `sol.x` and `sol.y` steer shadow direction
- `sol.z` increases light falloff and shadow softness
- `sol.size` broadens glow and penumbra
- `sol.color` influences highlight and atmospheric tint

This is presentation guidance for the concept, not a browser standard.

## Spatial Runtime Interpretation

The same markup may be transformed into a scene-native representation.

### Proposed A-Frame Mapping

Document contract:

```html
<sol x="44" y="-36" z="116" size="58" color="hsl(196 90% 64%)" axes="xyz"></sol>
<article class="surface" style="width:252px; aspect-ratio:1; depth:88px;"></article>
```

Generated spatial shape:

```html
<a-entity position="0 1.6 -2.5">
  <a-entity
    light="type: point; color: hsl(196 90% 64%); intensity: 1.0; distance: 5.8; decay: 1.4"
    position="0.44 -0.36 1.16"
  ></a-entity>

  <a-box
    width="0.252"
    height="0.252"
    depth="0.088"
    position="0 0 0.044"
    material="color: #4dbed9; roughness: 0.45; metalness: 0.05"
    shadow="cast: true; receive: true"
  ></a-box>
</a-entity>
```

### Normalization Rules

- Convert CSS pixels to scene units using a fixed bridge scale.
- Recommended default: `1000px = 1m`
- `width_px / 1000 => width_m`
- `height_px / 1000 => height_m`
- `depth_px / 1000 => depth_m`
- Surface position is shifted by `depth / 2` on local z so the authored plane represents the front face.
- `sol` coordinates are normalized using the same scale.

### Recommended Bridge Behavior

- The front face should preserve the authored 2D surface look as closely as possible.
- The runtime should extrude backward or around the authored plane consistently; default is forward by `depth / 2` from the document plane.
- If a runtime cannot safely extrude, it should fall back to the flat browser interpretation instead of failing.
- `axes` may be used to constrain which light directions affect the shadow model in flat mode, but spatial runtimes should normally respect all axes.

## Relationship to `aframe-bootstrap`

This bridge does not replace `aframe-bootstrap` primitives.

Recommended relationship:

- `z-depth-css` defines authoring semantics for depth and light
- bridge code converts those semantics into scene-ready values
- `aframe-bootstrap` may choose to consume the bridged values inside its existing primitive and token system

Possible future integration patterns:

1. Preprocess DOM-authored surfaces into A-Frame entities before scene boot.
2. Attach a component that reads `depth` and `sol` metadata and applies scene geometry/material/light settings.
3. Allow `aframe-bootstrap` primitives to accept bridged values from a companion parser, without changing their public direction.

## Current Proof of Concept

Z-Depth CSS includes a small bridge utility in [`bridge.js`](./bridge.js).

- `createBridgeModel(...)` converts `depth` and `sol` values into normalized browser and runtime data.
- `formatSourceContract(...)` emits the authored contract string.
- `formatAframeBridge(...)` emits an A-Frame-shaped runtime snippet from that model.

The demo uses that utility directly, so the spatial output shown on the page is generated from the same inputs as the flat-browser shadow model.

## Bridge Module API

### `createDepthSolContract(options)`

Normalizes one document light and one or more surfaces into a versioned contract.

Returned shape:

```js
{
  version: "depth-sol/0.3",
  sol: { x, y, z, size, color, axes },
  surfaces: [{ id, label, widthPx, aspectRatio, depthPx, hue, variant, layer, hovered, focused, selected, motion }]
}
```

### `createBridgeModels(contract, options)`

Converts every surface in a contract into a bridge model.

Optional options:

- `scale`, default `1000`
- `sceneOrigin`, default `{ x: 0, y: 1.6, z: -2.5 }`

### `pxToMeters(value, scale)`

Converts CSS-like pixel values into scene units.

- `value`: pixel-space number
- `scale`: pixels per meter, default `1000`
- returns: rounded meter value

### `createBridgeModel(options)`

Builds the shared model used by both formatted snippets for a single surface. This remains as a convenience wrapper around `createDepthSolContract(...)` and `createBridgeModels(...)`.

Required options:

- `widthPx`
- `depthPx`
- `hue`
- `sol`

Optional options:

- `aspectRatio`, default `1`
- `scale`, default `1000`
- `sceneOrigin`, default `{ x: 0, y: 1.6, z: -2.5 }`

Returned model sections:

- `source`: original authoring contract values
- `browser`: flat-browser shadow and lift hints
- `runtime`: normalized light, geometry, material, shadow, and interaction data

### `parseDepthDeclaration(cssText)`

Parses a small declaration block containing `width`, `aspect-ratio`, and `depth`. The current parser only accepts pixel lengths for `width` and `depth`; unsupported values resolve to documented defaults.

### `parseSolElement(element)`

Reads a DOM-like element with `getAttribute(name)` and returns a normalized `sol` object.

### `parseDepthSolDocument(root)`

Reads a DOM root for one `<sol>` and any `[data-depth-sol-surface]` elements. The helper is intended for browser-side progressive enhancement.

### `getCssCustomProperties(model)`

Returns the flat-browser fallback custom properties for one bridge model.

State-related properties include:

- `--depth-sol-layer`
- `--depth-sol-z-index`
- `--depth-sol-depth-offset`
- `--depth-sol-hover`
- `--depth-sol-focus`
- `--depth-sol-selected`
- `--depth-sol-motion`

### `getDepthSolUtilityClasses(model)`

Returns producer utility classes for a surface. The stable class families are:

- `z-depth-surface`
- `z-depth-layer-N`
- `is-depth-hovered`
- `is-depth-focused`
- `is-depth-selected`
- `is-depth-motion-{state}`

### `createDepthSolBridgeEvents(model)`

Returns deterministic event payload objects in this order:

- `depth-sol:layer`
- `depth-sol:hover`
- `depth-sol:focus`
- `depth-sol:selection`
- `depth-sol:motion`

Each payload includes `version`, `surfaceId`, `layer`, `zIndex`, `depthOffsetPx`, `depthOffsetM`, and `state`. These are data records suitable for DOM dispatch or framework event buses, but this repository does not prescribe either mechanism.

### `applyDepthSolCssVars(target, model)`

Applies the generated custom properties to any element with a `style.setProperty(...)` API.

### `formatSourceContract(model)`

Formats the source contract as a readable `<sol>` element plus `.surface` CSS block.

### `formatAframeBridge(model)`

Formats the runtime section as an A-Frame-shaped snippet with one light entity and one box.

The formatted output is documentation-oriented. It is not a complete scene, runtime package, or A-Frame component.

### `formatBridgeJson(model)`

Serializes the normalized source, browser fallback, and A-Frame-shaped runtime data for consumers that prefer data over markup.

## Sibling Consumer Contract

### A-Frame Bootstrap

Recommended stable path:

- import `bridge.js` as an optional companion module
- call `createBridgeModels(contract)`
- read `model.browser.interaction`, `model.runtime.interaction`, or `createDepthSolBridgeEvents(model)` for layering and state changes
- map `model.runtime.box.width`, `height`, `depth`, `position`, `material`, and `shadow` onto existing `a-ui-*` primitives or scene entities
- keep A-Frame itself loaded by the consuming page
- preserve the current A-Frame Bootstrap primitive API as the owner of scene-native interaction and theme behavior

### A-Frame Reader

Recommended stable path:

- preserve article panes as normal HTML with `data-depth-sol-surface`
- use `applyDepthSolCssVars(...)` for the flat reader page
- use `formatBridgeJson(...)` or the raw bridge model for any VR reader view
- avoid requiring the reader page to initialize WebGL or WebXR

## Non-Goals

- Defining a real CSS standard
- Replacing A-Frame layout or component primitives
- Shipping an A-Frame Bootstrap adapter from this repository
- Forcing flat browsers to draw visible 3D geometry
- Making `aframe-bootstrap` depend on this repository
