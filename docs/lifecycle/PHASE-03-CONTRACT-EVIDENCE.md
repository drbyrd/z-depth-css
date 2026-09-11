# Phase 03 Contract and API Applicability Evidence

Date: 2026-09-11

Exact lifecycle objective: Phase 03 - Contract and API Applicability: decide whether the project needs a formal API, MCP surface, package metadata, or only a browser module contract.

## Entry Gate

Baseline commit:

```text
1365a7848d1a911a2f2ce2861859678f03cf04eb
```

Entry gate status:

- Phase 02 local product verification was complete and recorded in `docs/lifecycle/PHASE-02-LOCAL-VERIFICATION-EVIDENCE.md`.
- A concrete downstream consumer requirement was supplied on 2026-09-11: A-Frame Bootstrap needs a stable, framework-agnostic Z-Depth producer contract covering CSS variables, utility classes, and deterministic bridge events for 2D layering, hover, focus, selection, and motion states.
- The requirement is producer-side only. A-Frame Bootstrap adoption remains unproven until a separate A-Frame Bootstrap task consumes this contract.

Phase 03 was authorized and its entry gate was satisfied.

## Scope Boundary

Worktree used:

```text
/Users/byrd/.codex/worktrees/9b49/z-depth-css
```

Branch used:

```text
machi/z-depth-phase03-producer
```

Initial status:

```text
## HEAD (no branch)
```

Branch status before product edits:

```text
## machi/z-depth-phase03-producer
```

No push, deploy, publish, API service, MCP server, package-registry publication, credential access, Keychain access, saved browser profile use, sibling-project source access, sibling-project writes, safety ref/stash mutation, or history rewrite was performed.

## Product Contract Commit

Product commit:

```text
14e3b9274e14e5706016ac767efe13155b9aaa21 Add depth-sol producer contract
```

Files changed:

```text
ARCHITECTURE.md
AUTHORING.md
CHANGELOG.md
INTEGRATION.md
README.md
bridge-spec.md
bridge.js
index.html
package.json
script.js
styles.css
tests/bridge.test.mjs
tests/static-smoke.test.mjs
```

Contract result:

- Contract version advanced to `depth-sol/0.3`.
- Surface normalization now includes `layer`, `hovered`, `focused`, `selected`, and `motion`.
- Browser and runtime bridge models now expose framework-agnostic `interaction` data.
- `getCssCustomProperties(model)` emits producer variables for layer, z-index, depth offset, hover, focus, selection, and motion.
- `getDepthSolUtilityClasses(model)` emits stable producer utility class families.
- `createDepthSolBridgeEvents(model)` emits deterministic event records in this order: `depth-sol:layer`, `depth-sol:hover`, `depth-sol:focus`, `depth-sol:selection`, `depth-sol:motion`.
- JSON bridge output includes utility classes and event payloads.
- The static demo uses the producer classes and data attributes without importing A-Frame Bootstrap.

## Applicability Decisions

Browser module contract:

- Applicable.
- Implemented in `bridge.js` and covered by local contract tests.

CSS variable and utility-class contract:

- Applicable.
- Implemented in `styles.css`, `script.js`, and `bridge.js`.

Deterministic bridge events:

- Applicable as data payloads from `createDepthSolBridgeEvents(model)`.
- This repository does not prescribe DOM dispatch, A-Frame component events, or a framework event bus.

API service:

- Not applicable for Phase 03.
- No HTTP, server, hosted API, credential, or persistence surface is introduced.

MCP surface:

- Not applicable for Phase 03.
- No connector, tool server, or MCP contract is introduced.

Package registry publication:

- Deferred.
- `package.json` remains `private: true`; version metadata was bumped to `0.3.0` only to reflect the local contract version.

Hosting:

- Not applicable for Phase 03.
- Static loopback verification is sufficient for the producer checkpoint.

## Fresh Verification

Command:

```sh
npm test
```

Result:

```text
13 tests passed
0 failures
```

Command:

```sh
npm run verify
```

Result:

```text
13 tests passed
0 failures
```

Command:

```sh
npm run validate
```

Result:

```text
6 tests passed
0 failures
```

Command:

```sh
git diff --check
```

Result:

```text
0 whitespace errors
```

Command:

```sh
gitleaks detect --redact --source .
```

Result:

```text
27 commits scanned
no leaks found
```

Local server smoke:

```sh
npm run serve
```

Loopback HEAD requests:

```text
http://127.0.0.1:4173/                  200 OK
http://127.0.0.1:4173/styles.css         200 OK
http://127.0.0.1:4173/script.js          200 OK
http://127.0.0.1:4173/bridge.js          200 OK
http://127.0.0.1:4173/social-preview.svg 200 OK
```

The temporary local server was stopped after verification.

## Product Boundary Check

The Phase 03 checkpoint preserves Z-Depth CSS / `depth-sol` as a framework-agnostic flat-web producer:

- no A-Frame Bootstrap dependency was added
- no A-Frame Bootstrap source was copied or read
- no downstream adoption is claimed
- A-Frame Bootstrap remains responsible for A-Frame loading, primitive registration, interaction systems, theme tokens, and scene composition

## Phase 03 Result

Phase 03 Contract and API Applicability is complete as a verified producer checkpoint.

The applicable surface is a browser module contract plus CSS variable, utility-class, JSON, and deterministic event payload outputs. API, MCP, hosting, package-registry publication, credentials, and production infrastructure remain non-applicable or deferred unless a later lifecycle phase proves otherwise.

## Next Gate

Proceed to Phase 04 - Documentation and Public Readiness Applicability only after the owner identifies the intended public posture: private archive, public GitHub readiness, published site readiness, or another explicit target.
