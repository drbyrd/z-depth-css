# depth-sol Integration Contract

Current contract version: `depth-sol/0.2`

This file is the concise handoff contract for consumers that want the depth and `sol` model without making this repository a hard dependency.

## Stable Inputs

Document light:

```html
<sol x="38" y="-42" z="128" size="64" color="hsl(196 90% 64%)" axes="xyz"></sol>
```

Depth surface:

```html
<article data-depth-sol-surface depth="76px" style="width:304px; aspect-ratio:1.24"></article>
```

## Stable Module Surface

```js
import {
  applyDepthSolCssVars,
  createBridgeModel,
  createBridgeModels,
  createDepthSolContract,
  formatAframeBridge,
  formatBridgeJson,
  getCssCustomProperties,
  parseDepthDeclaration,
  parseDepthSolDocument,
} from "./bridge.js";
```

## Flat Browser Path

Use `applyDepthSolCssVars(target, model)` and keep the page planar.

Required behavior:

- do not require WebGL, WebXR, or A-Frame to read the page
- keep layout governed by normal HTML and CSS sizing
- treat `depth` as an elevation and lighting hint
- preserve keyboard, touch, selection, and screen-reader behavior

## A-Frame Bootstrap Path

Use `createBridgeModels(contract)` as an optional preprocessing step.

Recommended mapping:

- `model.runtime.box.width` -> primitive width
- `model.runtime.box.height` -> primitive height
- `model.runtime.box.depth` -> primitive depth or elevation token
- `model.runtime.box.position` -> local placement
- `model.runtime.box.material` -> primitive material hints
- `model.runtime.light` -> scene or local light hints

The consuming A-Frame Bootstrap app continues to own A-Frame loading, primitive registration, theme tokens, interaction states, and scene composition.

## A-Frame Reader Path

Use normal HTML for archived reading surfaces and attach `data-depth-sol-surface`.

Recommended mapping:

- use generated CSS variables for the static archive page
- serialize `formatBridgeJson(model)` into a reader manifest when a VR view needs it
- keep original article text and media available without any spatial runtime
- use the bridge model only as progressive enhancement

## Compatibility Rules

- The default bridge scale is `1000px = 1m`.
- Consumers may override scale per scene, but should not mix scales inside one scene.
- The authored plane is the readable face; spatial geometry is offset by half depth on local z.
- Unknown or unsupported values should fall back to documented defaults.
- Missing spatial support should never break the flat page.
