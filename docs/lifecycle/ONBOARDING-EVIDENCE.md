# Lifecycle Onboarding Evidence

Date: 2026-09-10

Formal goal: perform a fresh evidence-based lifecycle onboarding for Z-Depth CSS, build or reconcile a project-specific lifecycle library, and advance only the first authorized phase whose entry gate is satisfied.

## Repository State

Working directory:

```text
/Users/byrd/.codex/worktrees/b78f/z-depth-css
```

Initial status:

```text
## HEAD (no branch)
```

Current checkout:

```text
0669728123f60770f1383163d952984712da197f HEAD
0669728123f60770f1383163d952984712da197f refs/heads/main
0669728123f60770f1383163d952984712da197f refs/remotes/origin/main
```

Remote:

```text
origin git@github-drbyrd:drbyrd/z-depth-css.git
```

Current tracked files at `HEAD`:

```text
.gitignore
index.html
script.js
styles.css
```

Current source classification:

- `index.html`, `styles.css`, and `script.js` implement a static concept demo titled `Depth, Simulated`.
- `.gitignore` is tracked and covers secrets, dependency folders, generated output, caches, logs, OS/editor files, and local archives.
- The visible concept treats `depth` as a missing sibling to width and aspect-ratio and fakes depth with transforms, gradients, shadows, and range controls.
- The current checkout has no `package.json`, no automated test files, and no lifecycle documentation before this phase.

## Prior Local Snapshot

Reachable prior-work ref:

```text
refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7
8172ebfb9821cb8efd27ba1f5f321f5fcaed0dc6
```

Snapshot commit line from current `HEAD`:

```text
5fe9cda 2026-09-02T12:38:25-04:00 Document depth-sol baseline contract
0bf237e 2026-09-02T12:40:15-04:00 Add versioned depth-sol bridge API
a4a4235 2026-09-02T12:43:08-04:00 Build consumer depth-sol playground
8a9fa8b 2026-09-02T12:45:16-04:00 Document sibling bridge integration
38f9394 2026-09-02T12:45:21-04:00 Add depth-sol verification harness
3df84fb 2026-09-02T12:47:21-04:00 Fix responsive playground constraints
7208f95 2026-09-02T12:48:01-04:00 Record depth-sol validation evidence
beb2128 2026-09-02T12:48:39-04:00 Polish local browser asset hygiene
8172ebf 2026-09-02T12:48:47-04:00 Update validation evidence commit list
```

Snapshot files not present in current `HEAD`:

```text
ARCHITECTURE.md
AUTHORING.md
CHANGELOG.md
CONTRIBUTING.md
EVIDENCE.md
INTEGRATION.md
LICENSE
README.md
SECURITY.md
bridge-spec.md
bridge.js
package.json
social-preview.svg
tests/bridge.test.mjs
tests/static-smoke.test.mjs
```

Snapshot file changed from current `HEAD`:

```text
.gitignore
```

Snapshot classification:

- The snapshot appears to contain a fuller local package and documentation line for `depth-sol`, including a browser ES module bridge, static playground, tests, and evidence.
- The snapshot records prior local validation dated 2026-09-02.
- That validation is useful provenance but is not fresh evidence for 2026-09-10.
- The snapshot has not been merged into `main` or the current detached checkout.
- Recovery or cherry-pick of the snapshot is Phase 01 work, not Phase 00 onboarding work.

## Product Intent Recovered

The current checkout proves the seed concept: simulate a CSS `depth` property visually in flat browsers.

The September 2 snapshot clarifies the intended product direction:

- Z-Depth CSS explores a framework-agnostic flat-web spatial semantic.
- `depth` expresses semantic height or elevation into space.
- `<sol>` expresses a document-level light source.
- Flat browsers should degrade to normal HTML/CSS with shadows, lift, occlusion, glow, and light color.
- Spatial runtimes may consume normalized bridge data.
- A-Frame Bootstrap is a bounded optional consumer, not a dependency or source of copied implementation.

Branding note:

- This lifecycle uses `Z-Depth CSS` as the project name.
- The snapshot's `depth-sol` contract name is treated as product vocabulary inside Z-Depth CSS, not as generic Machi styling or sibling-project branding.

## Source Documents and References

Current `index.html` links to external reference material about CSS depth, shadows, 3D transforms, WebGL depth effects, and spatial design systems. These links are public reference material in page copy, not authoritative lifecycle gates.

Current local sources inspected:

- `index.html`
- `styles.css`
- `script.js`
- `.gitignore`

Snapshot sources inspected by ref:

- `README.md`
- `ARCHITECTURE.md`
- `AUTHORING.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `EVIDENCE.md`
- `INTEGRATION.md`
- `bridge-spec.md`
- `package.json`
- `tests/bridge.test.mjs`
- `tests/static-smoke.test.mjs`

## Codex Task Context

Accessible active task list showed this task as:

```text
Z-Depth CSS Fresh Lifecycle
```

The launching boss task was:

```text
Portfolio Boss
```

The delegated instruction authorized a fresh lifecycle onboarding and only the first safely executable lifecycle phase if its entry gate was satisfied.

Archived Codex sessions:

- Accessible archived task listings were checked through the recent archived pages available from the app.
- No Z-Depth CSS-specific archived task was found in those checked archived pages.
- This is recorded as a negative evidence result, not proof that no older inaccessible session exists.

Sibling context:

- Active A-Frame Bootstrap phase tasks exist separately in the app.
- This onboarding did not read, modify, or depend on sibling project worktrees.

## Applicability Decisions

API:

- Not mandatory for Phase 00.
- Future applicability depends on a concrete consumer contract beyond the browser module.

MCP:

- Not applicable for Phase 00.
- No evidence currently requires an MCP server or connector.

Collaboration:

- Applicable only as lifecycle documentation and Codex task coordination.
- No multi-user app or external collaboration system is required.

Packaging:

- Not applicable to the current `HEAD`, which has no `package.json`.
- The snapshot contains package metadata and tests; recovery is Phase 01.

Hosting:

- Not applicable for Phase 00.
- Public or hosted evidence is deferred and must not block local truth.

## Verification Performed

Command:

```sh
git status --short --branch
```

Observed before edits:

```text
## HEAD (no branch)
```

Command:

```sh
git log --graph --decorate --oneline --all --max-count=80
```

Observed:

```text
* 8172ebf Update validation evidence commit list
* beb2128 Polish local browser asset hygiene
* 7208f95 Record depth-sol validation evidence
* 3df84fb Fix responsive playground constraints
* 38f9394 Add depth-sol verification harness
* 8a9fa8b Document sibling bridge integration
* a4a4235 Build consumer depth-sol playground
* 0bf237e Add versioned depth-sol bridge API
* 5fe9cda Document depth-sol baseline contract
* 0669728 (HEAD, origin/main, main) Initial safe backup
```

Command:

```sh
git show-ref --head
```

Observed:

```text
0669728123f60770f1383163d952984712da197f HEAD
8172ebfb9821cb8efd27ba1f5f321f5fcaed0dc6 refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7
0669728123f60770f1383163d952984712da197f refs/heads/main
0669728123f60770f1383163d952984712da197f refs/remotes/origin/main
```

Command:

```sh
rg --files
```

Observed before edits, excluding hidden files by default:

```text
script.js
styles.css
index.html
```

Command:

```sh
git ls-tree -r --name-only HEAD
```

Observed before edits:

```text
.gitignore
index.html
script.js
styles.css
```

Command:

```sh
npm test
```

Observed before edits:

```text
npm error code ENOENT
npm error syscall open
npm error path /Users/byrd/.codex/worktrees/b78f/z-depth-css/package.json
npm error enoent Could not read package.json
```

Interpretation:

- This is an expected current-checkout limitation, not a failing product test suite.
- Automated tests exist only in the unmerged September 2 snapshot.

## Phase 00 Gate Decision

Phase 00 entry gate is satisfied:

- Formal goal is active.
- Work is confined to this project worktree.
- Current Git state, refs, source files, snapshot history, task context, and accessible archived session listings were inspected.
- No owner decision is required to document lifecycle gates and evidence.

Phase 00 is the first safely executable lifecycle phase.

Phase 01 is not executed in this onboarding commit because it would require a deliberate recovery decision about the September 2 snapshot.

## Next Required Owner Decision

Before Phase 01, decide one of:

- recover the full September 2 snapshot line as the candidate baseline
- selectively cherry-pick only specific snapshot commits
- leave the snapshot as historical evidence and continue from current `main`

Recommended default for Phase 01: recover the snapshot in its existing logical commit order into this worktree, rerun verification fresh, and record which September 2 evidence has been superseded.
