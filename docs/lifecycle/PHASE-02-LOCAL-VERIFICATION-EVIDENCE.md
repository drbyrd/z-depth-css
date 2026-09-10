# Phase 02 Local Product Verification Evidence

Date: 2026-09-10

Exact lifecycle objective: Phase 02 - Local Product Verification: freshly verify the selected local baseline.

## Entry Gate

Baseline commit:

```text
36581dae2fbe1be63e9f93133ee9f38eadc1bb5f
```

Entry gate status:

- Phase 01 selected the recovered baseline and recorded it in `docs/lifecycle/PHASE-01-RECOVERY-EVIDENCE.md`.
- The repository declares local verification commands in `package.json`.
- No external live evidence is required for this phase.

Phase 02 was authorized and its entry gate was satisfied.

## Scope Boundary

Worktree used:

```text
/Users/byrd/.codex/worktrees/b78f/z-depth-css
```

Branch checked:

```text
machi/z-depth-phase01-recovery
```

Commit checked:

```text
36581dae2fbe1be63e9f93133ee9f38eadc1bb5f
```

No push, deploy, publish, credential access, Keychain access, saved browser profile use, safety ref/stash mutation, saved checkout mutation, or history rewrite was performed.

## Initial Status

Command:

```sh
git status --short --branch --untracked-files=all
```

Result:

```text
## machi/z-depth-phase01-recovery
```

Command:

```sh
git rev-parse HEAD
```

Result:

```text
36581dae2fbe1be63e9f93133ee9f38eadc1bb5f
```

## Automated Verification

Command:

```sh
npm test
```

Result:

```text
11 tests passed
0 failures
```

Coverage exercised by the test names:

- CSS pixel to meter conversion
- supported CSS authoring declaration parsing
- versioned multi-surface contract normalization
- deterministic browser and A-Frame bridge output
- DOM-independent `<sol>`-like element parsing
- CSS custom property application
- expected consumer documentation surface
- visible copy guard against private process language
- accessible and responsive interaction affordances
- playground state and bridge-module wiring
- versioned contract and sibling consumption documentation

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
23 commits scanned
no leaks found
```

## Local HTTP Smoke

Command:

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

The temporary local server was stopped after verification.

## Isolated Browser Smoke

Browser automation used a temporary profile under:

```text
/var/folders/2j/hhhm966n3h53nqsyxxy0bb8m0000gn/T/z-depth-phase02-profile-*
/var/folders/2j/hhhm966n3h53nqsyxxy0bb8m0000gn/T/z-depth-phase02-copy-profile-*
```

No saved browser profile, cookies, Keychain, or credential store was used.

Desktop viewport:

```text
1280x900
```

Observed:

- page title: `depth-sol CSS Kit`
- no horizontal overflow
- initial status: `Ready.`
- initial source output includes `<sol x="38" y="-42" z="128" size="64" color="hsl(196 90% 64%)" axes="xyz"></sol>`
- initial A-Frame output includes `data-depth-sol-version="depth-sol/0.2"`
- no console warnings or errors
- no page errors

Control checks:

- setting `depth` to `120` updates `#depth-value` to `120px`
- setting `hue` to `154` updates `#hue-value` to `154`
- generated CSS custom property `--depth-sol-depth` becomes `120px`
- generated source output updates to `depth: 120px` and `hsl(154 90% 64%)`

Preset checks:

- selecting `Reader pane` updates the surface label to `Reader pane`
- surface title becomes `Archived chapter panel`
- A-Frame output uses `a-ui-panel`

Output tab checks:

- selecting the JSON tab unhides the JSON panel
- JSON output begins with version `depth-sol/0.2`

Empty and malformed authoring checks:

- Clear hides the surface and shows the empty state
- Clear status: `No contract loaded. Pick an example or reset to continue.`
- malformed authoring text reports: `The authoring text needs one <sol> element and one surface rule.`
- malformed authoring text marks the status as an error
- Reset restores the Product card surface and status `Ready.`

Copy check:

- source copy button reports `Copied source.`
- clipboard text begins with `<sol x="38" y="-42" z="128" size`

Mobile viewport:

```text
390x844
```

Observed:

- no horizontal overflow
- surface remains visible
- `:focus-visible` selector support is available
- a `prefers-reduced-motion` CSS rule is present

## Product Boundary Check

The verified baseline preserves the Z-Depth CSS / `depth-sol` identity:

- framework-agnostic flat-web depth semantics
- browser-safe `depth` and `<sol>` authoring contract
- dependency-free static browser kit
- optional deterministic A-Frame-shaped bridge output

A-Frame Bootstrap remains interface-only:

- no dependency on A-Frame Bootstrap is introduced
- no sibling source is copied
- integration remains a documented consumer contract

## Phase 02 Result

Phase 02 local product verification passed.

No product source fixes were required. The only Phase 02 repository changes are this fresh evidence record and the top-level evidence pointer.

## Next Gate

Proceed to Phase 03 - Contract and API Applicability only if the owner/root accepts this Phase 02 evidence and confirms a concrete consumer need exists.
