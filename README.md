# depth-sol

An experimental flat-web depth semantic: `depth` and `<sol>` as browser-safe spatial metadata with an A-Frame bridge.

## What This Is

`depth-sol` is a small concept project exploring what a spatially aware authoring contract might look like on the flat web.

The idea is simple:

- `depth` expresses an element's height into space
- `<sol>` expresses a document-level light source with `x`, `y`, `z`, `size`, `color`, and `axes`
- in a normal browser, those semantics stay browser-safe and primarily affect shadow, lift, occlusion, and light color
- in a spatial runtime, the same authored values can be mapped into real geometry and light placement

This is not a standards proposal, a production library, or a framework. It is a compact spec-style experiment with a live demo and a bridge model.

## Relationship to aframe-bootstrap

This repo is deliberately complementary to `aframe-bootstrap`.

- `aframe-bootstrap` focuses on native spatial UI: scene primitives, layout, tokens, interaction, and composition inside A-Frame
- `depth-sol` focuses on document-level semantics that can degrade gracefully in flat browsers and later translate into spatial runtimes

In other words:

- `aframe-bootstrap` owns scene-native UI
- `depth-sol` owns browser-safe spatial intent

## Core Contract

### Document light

```html
<sol x="44" y="-36" z="116" size="58" color="hsl(196 90% 64%)" axes="xyz"></sol>
```

### Depth-aware surface

```css
.surface {
  width: 252px;
  aspect-ratio: 1;
  depth: 88px;
}
```

Interpretation:

- `width` and `aspect-ratio` describe the planar surface
- `depth` describes semantic height into space
- `<sol>` describes the document light that influences how that depth reads

## Flat-Browser Fallback

In a normal browser, the element remains flat.

Instead of visibly extruding geometry, the demo uses `depth` and `<sol>` to influence:

- cast-shadow direction
- shadow softness and spread
- ambient lift
- light tint and highlight behavior
- a stronger sense of spatial layering without forcing visible 3D

That makes the concept readable on ordinary pages without requiring WebXR, WebGL scene authoring, or a browser-specific rendering path.

## Runtime Bridge

The bridge idea is that the same authored contract can be interpreted by a spatial runtime.

This repo includes:

- [`bridge-spec.md`](./bridge-spec.md): the written bridge spec
- [`bridge.js`](./bridge.js): a small proof-of-concept translator
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): internal structure and data flow
- [`AUTHORING.md`](./AUTHORING.md): the authoring model in plain language
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): contribution boundaries and working style

The translator converts the authored contract into normalized runtime data and emits A-Frame-shaped output. The demo uses that bridge code directly, so the runtime snippet shown on the page is generated from the same values that drive the flat-browser shadow model.

Recommended default bridge scale:

- `1000px = 1m`

That lets a runtime map:

- `width` -> planar geometry size
- `depth` -> actual box depth
- `<sol>` -> scene light position and color

## Current Implementation

The demo is dependency-free and intentionally has no build step.

- The page is authored as static HTML and loaded from `index.html`.
- CSS custom properties hold the live contract values and flat-browser rendering outputs.
- `script.js` reads the controls, updates the CSS variables, and asks `bridge.js` to regenerate the source and runtime snippets.
- `bridge.js` is a browser ES module. Serve the project locally so module imports work consistently across browsers.
- `social-preview.svg` is a hand-authored social preview asset referenced by the page metadata.

The current proof of concept models one surface, one document light, one fixed scale, and one A-Frame-shaped runtime target.

## Files

- [`index.html`](./index.html): primary static demo
- [`styles.css`](./styles.css): visual system and flat-browser fallback rendering
- [`script.js`](./script.js): live controls and bridge output wiring
- [`bridge.js`](./bridge.js): proof-of-concept translator
- [`bridge-spec.md`](./bridge-spec.md): deeper bridge notes and mapping rules
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): structure, responsibilities, and data flow
- [`AUTHORING.md`](./AUTHORING.md): authoring contract explained without implementation detail
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): project boundaries and contribution style
- [`social-preview.svg`](./social-preview.svg): Open Graph / social preview artwork
- [`.gitignore`](./.gitignore): local-only, cache, and temporary-file exclusions
- [`LICENSE`](./LICENSE): MIT license

## Documentation Map

- Start with [`README.md`](./README.md) for the project overview
- Read [`AUTHORING.md`](./AUTHORING.md) for the semantic contract
- Read [`bridge-spec.md`](./bridge-spec.md) for the runtime mapping details
- Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) for file responsibilities and data flow
- Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for scope boundaries if you want to extend the project
- Read [`SECURITY.md`](./SECURITY.md) for secret-handling and repository hygiene notes

## Running It Locally

Because the project uses browser ES modules, serve it with a tiny local server.

From the repo root:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

Some browsers block module imports from `file://`, so opening `index.html` directly is not the recommended path.

## Verification

There is no package manager, dependency install, or automated test runner yet.

Useful checks:

```sh
git status --short --branch
```

```sh
gitleaks detect --redact --source .
```

Manual browser checks:

- the page loads without console errors from the local server
- each range control updates its output value
- the browser surface changes shadow, glow, size, and color as controls move
- the authoring snippet and A-Frame snippet update from the same values
- the layout remains readable on desktop and mobile widths

## Public Positioning

Recommended GitHub description:

> An experimental flat-web depth semantic: depth and `<sol>` as browser-safe spatial metadata with an A-Frame bridge.

Recommended GitHub topics:

- `css`
- `html`
- `webxr`
- `a-frame`
- `3d`
- `speculative-design`
- `spatial-ui`
- `creative-coding`
- `experimental`
- `web-design`

Recommended social preview summary:

> A small concept project exploring what a flat-web depth semantic could look like: use `depth` and a document light source (`<sol>`) for browser-safe spatial cues today, with a path to real 3D interpretation in XR runtimes.

## Modest Roadmap

- Try a second surface type beyond a single card
- Add a tiny parser prototype for reading `depth` and `<sol>` from authored markup
- Experiment with an A-Frame-side consumer that reads the bridge model directly
- Explore how multiple surfaces and multiple light sources should behave

## Non-Goals

- becoming a framework
- replacing `aframe-bootstrap`
- proposing a real browser standard
- adding build tooling or package boilerplate
- making spatial runtimes a dependency for understanding the project

## License

MIT. See [`LICENSE`](./LICENSE).
