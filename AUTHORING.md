# Authoring Model

This document explains the versioned semantic contract explored by `depth-sol`.

## Overview

The current contract version is `depth-sol/0.3`. It has three main parts:

- `depth` on a surface-like element
- a document-level `<sol>` light source
- producer state for layer, hover, focus, selection, and motion

Together they express spatial intent without requiring a flat browser to render real 3D geometry.

## `depth`

`depth` is treated as semantic height into space.

Example:

```css
.surface {
  width: 304px;
  aspect-ratio: 1.24;
  depth: 76px;
}
```

### Intended meaning

- `width` defines planar size
- `aspect-ratio` defines planar proportion
- `depth` defines how tall the object would be if interpreted spatially

### In a normal browser

The surface stays flat. `depth` affects:

- shadow offset
- shadow blur
- ambient lift
- perceived elevation

### In a spatial runtime

The same value can become:

- box depth
- z-offset of geometry
- a source for occlusion and light interaction

## Producer State

State extends the surface contract without turning this project into a UI framework.

Example:

```html
<article
  data-depth-sol-surface
  data-depth-sol-layer="2"
  data-depth-sol-selected="true"
  data-depth-sol-motion="settled"
></article>
```

Meaning:

- `layer`: 2D stacking intent for z-index and scene ordering
- `hovered`: hover state hint
- `focused`: focus or focus-within state hint
- `selected`: selection state hint
- `motion`: `idle`, `enter`, `exit`, `active`, or `settled`

The module exposes these values as CSS variables, utility classes, bridge JSON, and deterministic `depth-sol:*` event payloads. A consumer may map those outputs into its own event system or scene primitives, but this repository does not prescribe or ship that consumer behavior.

## `<sol>`

`<sol>` is a proposed document-level light source.

Example:

```html
<sol x="44" y="-36" z="116" size="58" color="hsl(196 90% 64%)" axes="xyz"></sol>
```

### Attributes

- `x`: horizontal light position
- `y`: vertical light position
- `z`: distance from the page plane
- `size`: area-light softness hint
- `color`: emitted light color
- `axes`: which axes the light is considered to influence

### In a normal browser

`<sol>` affects:

- shadow direction
- softness
- glow
- highlight tint

### In a spatial runtime

`<sol>` can become:

- a point or area-like light position
- a light color
- distance and intensity hints

## Current Demo Controls

The live demo currently exposes:

- surface width
- depth metadata
- `sol x`
- `sol y`
- `sol z`
- `sol size`
- `sol hue`
- editable authoring text
- source, CSS custom-property, JSON, and A-Frame output tabs
- reset, empty, parse-error, and copy-feedback states

These are not meant to be the final or only possible authoring API. They are an interactive way to inspect how the contract behaves.

## Current Assumptions

- one active playground surface at a time
- one light source
- one fixed bridge scale
- one primary spatial runtime target shape at a time: an A-Frame box or an A-Frame Bootstrap-style primitive plus a point light

## Units and Defaults

The current demo uses CSS-like pixel values for authoring and display.

- `width`, `depth`, and `sol size` are shown in pixels
- `sol x`, `sol y`, and `sol z` are numeric document-space coordinates
- `sol color` is represented as an HSL color derived from the hue control
- `axes` currently defaults to `xyz`

For bridge output, the default normalization is `1000px = 1m`.

## Authoring Pattern

The current parser prototype reads two things:

1. A document-level light declaration.
2. One or more surface declarations that opt into semantic depth.

The parser is deliberately conservative. It supports simple pixel lengths, numeric or slash-based aspect ratios, and one `<sol>` declaration. Unsupported values fall back instead of breaking layout.

## Compatibility Principle

Flat browsers should never be required to draw real extrusion for this contract to be useful.

If a browser or runtime does not support spatial interpretation, the safe fallback is:

- keep the surface planar
- use `depth` as an elevation hint
- use `<sol>` as a light and shadow hint
- avoid breaking layout or interaction

## CSS Custom Properties

`bridge.js` can generate and apply fallback variables with `applyDepthSolCssVars(target, model)`.

Current fallback variables include:

- `--depth-sol-width`
- `--depth-sol-height`
- `--depth-sol-depth`
- `--depth-sol-hue`
- `--depth-sol-light-color`
- `--depth-sol-cast-x`
- `--depth-sol-cast-y`
- `--depth-sol-cast-blur`
- `--depth-sol-cast-spread`
- `--depth-sol-ambient-blur`
- `--depth-sol-shadow-color`
- `--depth-sol-highlight-alpha`
- `--depth-sol-layer`
- `--depth-sol-z-index`
- `--depth-sol-depth-offset`
- `--depth-sol-hover`
- `--depth-sol-focus`
- `--depth-sol-selected`
- `--depth-sol-motion`

## Non-Goals

This contract is not currently trying to define:

- a browser-implementable CSS proposal
- parsing precedence rules
- a full markup grammar
- multiple light composition rules
- accessibility or serialization standards

Those would belong to a more mature proposal. This project is intentionally earlier and smaller than that.
