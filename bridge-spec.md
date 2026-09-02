# Depth and `sol` Bridge Spec

## Purpose

This project defines a browser-safe authoring contract that can later be interpreted by a spatial runtime without changing the authored intent.

- In flat browsers, `depth` changes shadow, lift, occlusion, and lighting cues.
- In spatial runtimes, the same `depth` value may become real geometry depth.
- `aframe-bootstrap` remains responsible for scene-native UI primitives and interaction, while this contract remains document-level and declarative.

## Authoring Contract

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
}
```

Authoring meaning:

- `width`: planar size
- `aspect-ratio`: planar proportion
- `depth`: semantic height into space

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

This repository now includes a small bridge utility in [`bridge.js`](./bridge.js).

- `createBridgeModel(...)` converts `depth` and `sol` values into normalized browser and runtime data.
- `formatSourceContract(...)` emits the authored contract string.
- `formatAframeBridge(...)` emits an A-Frame-shaped runtime snippet from that model.

The demo uses that utility directly, so the spatial output shown on the page is generated from the same inputs as the flat-browser shadow model.

## Bridge Module API

### `pxToMeters(value, scale)`

Converts CSS-like pixel values into scene units.

- `value`: pixel-space number
- `scale`: pixels per meter, default `1000`
- returns: rounded meter value

### `createBridgeModel(options)`

Builds the shared model used by both formatted snippets.

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
- `runtime`: normalized light, geometry, material, and shadow data

### `formatSourceContract(model)`

Formats the source contract as a readable `<sol>` element plus `.surface` CSS block.

### `formatAframeBridge(model)`

Formats the runtime section as an A-Frame-shaped snippet with one light entity and one box.

The formatted output is documentation-oriented. It is not a complete scene, parser, runtime package, or A-Frame component.

## Non-Goals

- Defining a real CSS standard
- Replacing A-Frame layout or component primitives
- Forcing flat browsers to draw visible 3D geometry
- Making `aframe-bootstrap` depend on this repository
