# Authoring Model

This document explains the small semantic contract explored by `depth-sol`.

## Overview

The contract has two main parts:

- `depth` on a surface-like element
- a document-level `<sol>` light source

Together they express spatial intent without requiring a flat browser to render real 3D geometry.

## `depth`

`depth` is treated as semantic height into space.

Example:

```css
.surface {
  width: 252px;
  aspect-ratio: 1;
  depth: 88px;
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

These are not meant to be the final or only possible authoring API. They are an interactive way to inspect how the contract behaves.

## Current Assumptions

- one surface
- one light source
- one fixed bridge scale
- one primary spatial runtime target shape: an A-Frame box plus a point light

## Units and Defaults

The current demo uses CSS-like pixel values for authoring and display.

- `width`, `depth`, and `sol size` are shown in pixels
- `sol x`, `sol y`, and `sol z` are numeric document-space coordinates
- `sol color` is represented as an HSL color derived from the hue control
- `axes` currently defaults to `xyz`

For bridge output, the default normalization is `1000px = 1m`.

## Authoring Pattern

A future parser would likely read two things:

1. A document-level light declaration.
2. One or more surface declarations that opt into semantic depth.

The current demo does not implement parsing. The controls stand in for authored values so the mapping can be inspected interactively.

## Compatibility Principle

Flat browsers should never be required to draw real extrusion for this contract to be useful.

If a browser or runtime does not support spatial interpretation, the safe fallback is:

- keep the surface planar
- use `depth` as an elevation hint
- use `<sol>` as a light and shadow hint
- avoid breaking layout or interaction

## Non-Goals

This contract is not currently trying to define:

- a browser-implementable CSS proposal
- parsing precedence rules
- a full markup grammar
- multiple light composition rules
- accessibility or serialization standards

Those would belong to a more mature proposal. This project is intentionally earlier and smaller than that.
