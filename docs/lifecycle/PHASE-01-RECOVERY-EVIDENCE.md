# Phase 01 Recovery Evidence

Date: 2026-09-10

Goal: recover legitimate Z-Depth CSS work without loss inside the isolated task worktree, preserve provenance for the partial saved checkout, recover the complete historical line through `8172ebf`, replay onboarding docs on top, and verify fresh.

## Scope Boundary

Worktree used:

```text
/Users/byrd/.codex/worktrees/b78f/z-depth-css
```

Branch used:

```text
machi/z-depth-phase01-recovery
```

Explicitly not modified:

```text
/Users/byrd/projects/AI Inbox/Projects/z-depth-css
```

No push, deploy, publish, credential access, Keychain access, saved browser profile use, stash, reset, clean, or history rewrite was performed.

## Inputs

Clean main:

```text
0669728123f60770f1383163d952984712da197f Initial safe backup
```

Fuller historical snapshot:

```text
8172ebfb9821cb8efd27ba1f5f321f5fcaed0dc6 refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7
```

Docs-only onboarding commit:

```text
3b792c74b3651abac4d5a1a2b59d01d616eff4dc Add Z-Depth CSS lifecycle onboarding
```

Relevant checkpoint tree:

```text
bd868c98cdaf682f7d168ea035284074597c8ac7
```

This checkpoint tree was byte-equivalent to `8172ebf`.

## Saved Main Checkout Provenance

The saved main checkout was inspected read-only before recovery. It remained dirty after recovery with this status:

```text
## main...origin/main
 M .gitignore
 M index.html
 M script.js
 M styles.css
?? ARCHITECTURE.md
?? AUTHORING.md
?? CHANGELOG.md
?? CONTRIBUTING.md
?? LICENSE
?? README.md
?? SECURITY.md
?? bridge-spec.md
?? bridge.js
?? social-preview.svg
```

Byte-for-byte comparison showed every present saved-checkout worktree file matched historical commit `5fe9cda`. That makes `5fe9cda` the provable provenance checkpoint for the partial saved checkout.

Files present in the saved checkout and matching `5fe9cda`:

```text
.gitignore
ARCHITECTURE.md
AUTHORING.md
CHANGELOG.md
CONTRIBUTING.md
LICENSE
README.md
SECURITY.md
bridge-spec.md
bridge.js
index.html
script.js
social-preview.svg
styles.css
```

Files present in `8172ebf` but absent from the saved dirty checkout:

```text
EVIDENCE.md
INTEGRATION.md
package.json
tests/bridge.test.mjs
tests/static-smoke.test.mjs
```

Interpretation:

- The saved main checkout is a partial unstaged reconstruction of the `5fe9cda` baseline contract commit.
- The complete preserved line continues from `5fe9cda` through `8172ebf`.
- The reason the saved checkout stopped at that partial state is not proven by available evidence.

## Recovery Commit Mapping

Historical commits were replayed from clean `main` in original logical order:

```text
5fe9cda -> 9735ceb Document depth-sol baseline contract
0bf237e -> fd16e27 Add versioned depth-sol bridge API
a4a4235 -> b9060b5 Build consumer depth-sol playground
8a9fa8b -> c5c5706 Document sibling bridge integration
38f9394 -> fedd758 Add depth-sol verification harness
3df84fb -> 36ec4fb Fix responsive playground constraints
7208f95 -> 3b19c3b Record depth-sol validation evidence
beb2128 -> 283ad72 Polish local browser asset hygiene
8172ebf -> 29f3853 Update validation evidence commit list
```

Then the docs-only onboarding commit was replayed on top:

```text
3b792c7 -> d617a96 Add Z-Depth CSS lifecycle onboarding
```

Recovered branch after replay:

```text
* d617a96 Add Z-Depth CSS lifecycle onboarding
* 29f3853 Update validation evidence commit list
* 283ad72 Polish local browser asset hygiene
* 3b19c3b Record depth-sol validation evidence
* 36ec4fb Fix responsive playground constraints
* fedd758 Add depth-sol verification harness
* c5c5706 Document sibling bridge integration
* b9060b5 Build consumer depth-sol playground
* fd16e27 Add versioned depth-sol bridge API
* 9735ceb Document depth-sol baseline contract
* 0669728 Initial safe backup
```

## Tree Equivalence

Command:

```sh
git diff --name-status 8172ebfb9821cb8efd27ba1f5f321f5fcaed0dc6 HEAD
```

Result before adding this Phase 01 evidence record:

```text
A  docs/lifecycle/LIFECYCLE.md
A  docs/lifecycle/ONBOARDING-EVIDENCE.md
```

Command:

```sh
git diff --quiet 8172ebfb9821cb8efd27ba1f5f321f5fcaed0dc6 HEAD -- . ':(exclude)docs/lifecycle'
```

Result:

```text
0
```

Interpretation:

- Recovered product files are byte-equivalent to `8172ebf`.
- At the recovery checkpoint, only lifecycle documentation differed on top.
- The final Phase 01 evidence commit additionally updates `EVIDENCE.md` with a pointer to this fresh record and adds this file.

## Fresh Verification

Command:

```sh
npm test
```

Result:

```text
11 tests passed
0 failures
```

Command:

```sh
npm run verify
```

Result:

```text
11 tests passed
0 failures
```

Command:

```sh
npm run validate
```

Result:

```text
5 tests passed
0 failures
```

Command:

```sh
gitleaks detect --redact --source .
```

Result:

```text
21 commits scanned
no leaks found
```

Local server smoke:

```sh
python3 -m http.server 4173
```

Loopback HEAD requests:

```text
http://127.0.0.1:4173/                  200 OK
http://127.0.0.1:4173/styles.css         200 OK
http://127.0.0.1:4173/script.js          200 OK
http://127.0.0.1:4173/bridge.js          200 OK
http://127.0.0.1:4173/social-preview.svg 200 OK
```

The temporary local server was stopped after the smoke check.

## Product Boundary Check

Recovered content preserves the Z-Depth CSS / `depth-sol` identity:

- framework-agnostic flat-web depth semantics
- browser-safe `depth` and `<sol>` authoring contract
- dependency-free static browser kit
- optional A-Frame-shaped bridge output

A-Frame Bootstrap remains a bounded optional consumer:

- no dependency on A-Frame Bootstrap was added
- no sibling source was copied
- integration is documented as a consumer contract only

## Phase 01 Result

Phase 01 recovery is complete on branch `machi/z-depth-phase01-recovery`.

The historical product line has been recovered through `8172ebf`, onboarding docs have been replayed on top, and fresh local verification has passed.

This branch is ready for independent review. Root integration into `main` remains outside this task.

## Next Gate

Proceed to Phase 02 local product verification only after owner/root review accepts this recovery branch as the candidate baseline.

Required owner/root decision:

- accept `machi/z-depth-phase01-recovery` as the recovered candidate baseline for the next lifecycle phase, or
- request a different preservation strategy before Phase 02.
