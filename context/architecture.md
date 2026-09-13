# Architecture context

The project is static HTML, CSS, and ES modules. `index.html` provides the demo;
`styles.css` renders its planar depth/light cues; `script.js` keeps controls,
authoring text, local error/copy/reset state, and output snippets synchronized;
and `bridge.js` normalizes the shared `depth-sol/0.3` model. Detailed ownership
and mapping rules remain in [ARCHITECTURE](../ARCHITECTURE.md),
[bridge specification](../bridge-spec.md), and [integration contract](../INTEGRATION.md).

The data path is:

`controls or authoring text -> normalized contract/model -> CSS fallback, utility classes, JSON, events, runtime-shaped output`

The visible flat effect and explanatory outputs derive from the same current
values. Generated snippets are display data, not persisted source. The browser
model is authoritative for the flat page; runtime data is an optional consumer
hint, not a dispatched event bus or an A-Frame adapter.

Keep the default conversion `1000px = 1m`, the plane/depth-offset distinction,
and the stable CSS variables, utility-class families, JSON keys, and event order
documented by INTEGRATION. Context may summarize this evidence but cannot redesign
the code or supersede the accepted F1–F6 consumer review.
