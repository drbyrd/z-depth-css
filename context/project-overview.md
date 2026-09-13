# Project overview

Z-Depth CSS (`depth-sol`) is a small, dependency-free static browser kit that
explores spatial intent on the flat web. `depth` expresses semantic height and a
document-level `<sol>` expresses light; ordinary HTML and CSS remain usable when
no spatial runtime exists. See [README](../README.md) and
[AUTHORING](../AUTHORING.md) for the detailed contract.

Its current producer contract is `depth-sol/0.3`: surfaces may carry layer,
hover, focus, selection, and motion metadata, which the bridge exposes as CSS
variables, utility classes, JSON, and deterministic event records. The named
real consumer is A-Frame Bootstrap, but it owns its adapter, primitives, themes,
interaction, and scene composition. This repository neither imports it nor claims
to provide scene-native behavior.

## Scope

- Browser-safe depth, light, elevation, shadow, and interaction cues.
- A deterministic, optional data bridge for a consumer-owned spatial runtime.
- A readable static demo and direct ES-module implementation.

## Non-goals

- A browser standard, production framework, server/API/MCP surface, or package
  publication.
- A WebGL, WebXR, A-Frame, or A-Frame Bootstrap dependency.
- Rendered-device, public-release, Reader-adoption, or external-security proof.

When implementation and a summary disagree, report the discrepancy and retain
the source-backed contract; do not import sibling branding or invent new intent.
