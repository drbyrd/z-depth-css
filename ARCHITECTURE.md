# Architecture Notes

This project is intentionally small. The architecture is not about scaling a framework; it is about keeping a concept project legible while proving one core idea:

- a flat-web authoring contract can describe spatial intent
- that contract can render safely in a normal browser
- the same contract can be bridged into a spatial runtime

## High-Level Model

The repo has three layers:

1. **Authoring contract**
   - `depth` describes semantic height into space
   - `<sol>` describes a document-level light source

2. **Flat-browser presentation**
   - the page stays planar
   - the contract is interpreted as shadow, lift, occlusion, glow, and color cues

3. **Spatial bridge**
   - the same input values can be normalized into scene units
   - the output can be emitted as A-Frame-style geometry and light data

## File Responsibilities

### `index.html`

The static demo surface.

Responsibilities:

- present the concept in public-facing language
- expose the controls for `depth` and `sol`
- show the authored contract snippet
- show the generated A-Frame bridge output
- provide the documentation-like sections that explain intent

### `styles.css`

The flat-browser rendering layer.

Responsibilities:

- define the page’s design tokens and visual language
- render the depth-aware surface as a flat object
- convert bridge-related values into browser-safe visual cues
- maintain readable, stable page chrome while the demo surface changes color

### `script.js`

The interaction and synchronization layer.

Responsibilities:

- read current control values
- update CSS custom properties for the live demo
- derive browser-facing shadow and light values
- build the current bridge model
- keep the source contract snippet and runtime snippet in sync

### `bridge.js`

The proof-of-concept translator.

Responsibilities:

- normalize authoring values into a structured bridge model
- convert pixel values into scene units
- calculate runtime light and box properties
- emit formatted contract and runtime snippet strings

### `bridge-spec.md`

The written semantic bridge note.

Responsibilities:

- explain the conceptual mapping
- define normalization assumptions
- define runtime interpretation rules
- preserve the distinction between concept and implementation

## Data Flow

The current demo follows this sequence:

1. User adjusts a control in the browser
2. `script.js` reads the current values
3. CSS custom properties are updated for the flat-browser rendering
4. `bridge.js` builds a normalized bridge model from the same values
5. The authored contract snippet is regenerated
6. The A-Frame runtime snippet is regenerated

That means the visible 2D effect and the example 3D output are always derived from the same source values.

## Runtime Requirements

The project has no build system and no package dependencies.

Runtime expectations:

- serve the directory over HTTP for browser ES module support
- load `index.html`
- let `script.js` import `bridge.js`
- keep all generated display snippets in browser memory rather than writing files

There is no server-side code, persistence layer, package install, or deploy-specific configuration in the current repo.

## Source of Truth

The live control values are the source of truth while the page is running.

From those values, the demo derives:

- CSS custom properties for the browser rendering
- a source contract string for `depth` and `<sol>`
- a normalized bridge model
- an A-Frame-shaped runtime snippet

The generated snippets are explanatory output. They are not saved back into source files.

## Why This Is Not a Framework

This repo intentionally avoids:

- package structure
- reusable public API design
- runtime plugin architecture
- parser completeness
- scene graph abstractions

Those concerns belong elsewhere if the idea matures. Right now the project’s job is to make the semantics easy to understand and easy to discuss.

## Design Constraints

- stay static and dependency-free
- keep the file structure flat and obvious
- prefer explanation over abstraction
- use real code where it proves the idea
- stop short of pretending this is a standard or library

## Extension Points

If the project grows, the cleanest next steps are:

- parse authored markup instead of using only live controls
- support multiple surfaces in one scene
- support multiple document lights
- let an A-Frame consumer read the bridge model directly
- test whether the same contract can map into WebXR or WebGL scene data beyond A-Frame

## File Hygiene

Keep canonical source and documentation tracked. Keep generated output, local caches, dependency folders, secrets, and machine-specific files ignored.
