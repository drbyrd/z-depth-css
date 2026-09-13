# UI context

The demo uses a restrained, inspectable flat-web visual language: planar surfaces
receive shadow, lift, occlusion, glow, and light-tint cues rather than actual
extrusion. Controls expose width, depth, light coordinates, size, hue, presets,
and editable authoring text. Source, CSS-variable, JSON, and A-Frame-shaped
outputs let readers inspect one shared contract.

Maintain the existing controls and states documented in [AUTHORING](../AUTHORING.md)
and implemented in `index.html`, `styles.css`, and `script.js`: hover, focus,
selection, motion, presets, reset, empty input, parse error, copy feedback,
responsive layout, keyboard-visible focus, and reduced motion. F5's accepted
behavior keeps preset and interaction state authoritative and refreshes every
derived output across hover, focus, preset, and reset transitions.

This is a visual/context summary, not a new design system or evidence of browser
DOM, WebGL, ray/focus, headset, accessibility, or device acceptance. Do not import
sibling styling or let UI aspirations override the producer data contract.
