# Z-Depth CSS Lifecycle Library

This lifecycle is specific to Z-Depth CSS. It exists to keep future work honest about what the project is, what has been proved locally, and when work must stop for an owner decision.

## Product Intent

Z-Depth CSS is a framework-agnostic depth and reactivity CSS layer. Its bounded contract is to let ordinary HTML and CSS express spatial intent through browser-safe depth, light, elevation, shadow, and interaction cues.

The project may expose optional bridge data for A-Frame Bootstrap, but A-Frame Bootstrap owns scene-native primitives, interaction, theme systems, and runtime composition. Z-Depth CSS owns flat-web spatial semantics and graceful fallback behavior.

## Standing Constraints

- Preserve Z-Depth CSS branding and product language.
- Do not apply generic Machi styling or copy source from sibling projects.
- Do not make A-Frame Bootstrap a dependency.
- Do not require API, MCP, hosting, deployment, publishing, package registry, or browser credential work unless a phase explicitly proves applicability.
- Do not access Keychain, Chrome Safe Storage, saved browser profiles, cookies, tokens, or credentials.
- If browser automation is needed, use an isolated temporary profile.
- Public, hosted, and live external evidence is deferred and must not block truthful local completion.
- Final architecture, test-governance, provenance, and documentation review remains a separate GPT-6 Astra/high formal goal after preceding applicable phases.

## Evidence Rules

Every phase must record:

- exact Git commit or ref inputs used
- exact files changed
- exact verification commands and outcomes
- any skipped command and the concrete reason
- owner decisions needed before the next phase
- whether work was newly completed, recovered from prior local work, or only classified

Do not backdate phase completion. Prior commits may be cited as evidence, but phase status is assigned only when the current audit proves the gate and deliverables.

## Phase 00 - Lifecycle Onboarding and Classification

Purpose: establish the project-specific lifecycle, recover the actual product intent, classify prior work, and define safe next gates.

Entry gate:

- A formal goal is active for this onboarding.
- Work is confined to the Z-Depth CSS worktree.
- Git status, refs, reachable graph, current source, prior local snapshot refs, relevant Codex task context, and accessible archived sessions have been inspected.
- No owner decision is needed to document the lifecycle and evidence.

Deliverables:

- `docs/lifecycle/LIFECYCLE.md`
- `docs/lifecycle/ONBOARDING-EVIDENCE.md`
- candid classification of current checkout and prior local snapshot work
- first applicable next phase with gate, stop criteria, and verification commands

Success criteria:

- Z-Depth CSS is described as a framework-agnostic depth/reactivity CSS layer.
- A-Frame Bootstrap integration is bounded as optional consumer data, not a dependency.
- Prior local snapshot work is identified by commit/ref and not silently merged.
- Non-applicable work categories are explicitly treated as applicability decisions.
- Next phase can be executed or blocked from the evidence alone.

Acceptance criteria:

- Documentation is committed as its own logical boundary.
- `git status --short --branch` is recorded before and after.
- Current verification limits are recorded without pretending missing tests exist.

Stop, fail, or prevent-completion criteria:

- The repository cannot be read.
- Git refs cannot be inspected enough to identify current checkout and prior work.
- The lifecycle would require changing product code before evidence is recorded.
- An owner decision is needed to choose between conflicting product identities.

Negative cases:

- Do not merge the September 2 snapshot during onboarding.
- Do not present prior local validation as today's fresh validation.
- Do not rename the product to a generic Machi library.
- Do not import source or styling from sibling repositories.

Exact verification commands:

```sh
git status --short --branch
git log --graph --decorate --oneline --all --max-count=80
git show-ref --head
rg --files
npm test
```

Logical commit boundary:

- `docs/lifecycle/*` only, unless a small repository metadata correction is required and separately justified.

## Phase 01 - Snapshot Recovery Applicability

Purpose: decide whether the September 2 local snapshot line should become the working baseline, be partially cherry-picked, or remain only historical evidence.

Entry gate:

- Phase 00 is complete and committed.
- Current checkout is clean except for intentional Phase 01 work.
- Snapshot ref `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` is still reachable or an equivalent owner-approved source is provided.
- Owner has not forbidden recovery of prior local work.

Deliverables:

- comparison between current `main` and the snapshot
- recovery decision with rationale
- if recovery is chosen, logical commits preserving authorship/provenance where practical
- updated evidence documenting which previous validation remains stale and which checks were rerun fresh

Success criteria:

- The chosen recovery path preserves Z-Depth CSS's product intent.
- The result does not depend on sibling project code.
- Current tests and docs match the recovered source state.

Acceptance criteria:

- `npm test` and `npm run verify` pass if `package.json` is present.
- `git diff --stat` and commit list are recorded.
- Browser smoke is run only with an isolated local server/profile if needed.

Stop, fail, or prevent-completion criteria:

- Snapshot ref is unavailable.
- Snapshot content conflicts with owner direction.
- Recovery would require credentials, pushing, deployment, or sibling project writes.
- Tests fail in a way that cannot be fixed without changing phase scope.

Negative cases:

- Do not squash away the fact that work originated in prior local commits.
- Do not backdate evidence from September 2 as fresh September 10 evidence.
- Do not integrate into `main`, push, deploy, or publish.

Exact verification commands:

```sh
git status --short --branch
git diff --stat HEAD refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7
git log --format='%h %ad %s' --date=iso-strict HEAD..refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7
npm test
npm run verify
```

Logical commit boundary:

- one commit for recovery decision documentation if no source is changed
- otherwise one or more commits matching original logical product boundaries

## Phase 02 - Local Product Verification

Purpose: freshly verify the selected local baseline.

Entry gate:

- Phase 01 has selected the baseline.
- The repo has declared local verification commands.
- No external live evidence is required.

Deliverables:

- fresh automated test result
- fresh static smoke result
- local browser smoke notes if browser behavior changed
- updated evidence file

Success criteria:

- Existing automated checks pass or failures are documented with owner-visible risk.
- The flat browser demo remains usable without WebGL, WebXR, A-Frame, API services, or credentials.
- The bridge output remains optional and deterministic.

Acceptance criteria:

- `npm test` passes when tests exist.
- `npm run verify` passes when declared.
- Manual checks cover controls, parser error states, copy states, responsive behavior, and reduced-motion behavior when those features exist.

Stop, fail, or prevent-completion criteria:

- Verification requires network credentials or saved browser state.
- The selected baseline has no coherent local run path.
- Product behavior depends on unavailable sibling repositories.

Negative cases:

- Do not treat deployed or public URLs as required evidence.
- Do not add package dependencies just to make verification look bigger.

Exact verification commands:

```sh
git status --short --branch
npm test
npm run verify
python3 -m http.server 4173
```

Logical commit boundary:

- evidence-only commit unless fixes are required, in which case fixes and evidence are separate commits.

## Phase 03 - Contract and API Applicability

Purpose: decide whether the project needs a formal API, MCP surface, package metadata, or only a browser module contract.

Entry gate:

- Local baseline has been verified.
- A concrete consumer need exists.

Deliverables:

- applicability decision for API, MCP, package, and hosting surfaces
- consumer-facing contract updates only where applicable
- negative cases for non-applicable surfaces

Success criteria:

- The project remains framework-agnostic.
- Optional consumers can use the documented contract without forcing runtime dependencies.
- Non-applicable surfaces are explicitly deferred.

Acceptance criteria:

- Documentation names stable inputs and outputs.
- Tests cover any public module behavior changed in this phase.

Stop, fail, or prevent-completion criteria:

- No consumer requirement exists.
- The work would turn Z-Depth CSS into a framework or hosted service.

Exact verification commands:

```sh
git status --short --branch
npm test
npm run verify
```

Logical commit boundary:

- one commit per public contract surface changed.

## Phase 04 - Documentation and Public Readiness Applicability

### Stored authoring definition and provenance

This phase was fully authored at
`d5462cff30df9dc1a6888c27f16914cb418f05cd` on 2026-09-12 by the separate
GPT-6 Astra/high definition task. That commit is retained at
`refs/codex/snapshots/f7277da1f348fa038ce1cb82e6939e50a8f02b95`; this section
brings its governing definition into the tracked seventh authority. It did not
execute Phase 04. The execution baseline was clean detached
`45b33aaacbd88367c458dc92dd14961f340b50e6`; local `main` still points there.

Exact execution objective:

> Decide what public-facing readiness means without requiring deployment. After
> explicit execution authorization and an owner-selected readiness posture,
> consolidate Z-Depth CSS's future-work context into the owner-requested original
> JavaScript Mastery six-file system, in the exact order below, followed by this
> existing lifecycle library as the seventh authority. Populate from direct
> repository evidence, wire the order through root `AGENTS.md`, classify
> supporting and historical documents without losing provenance, and make only
> applicable README, authoring, integration, security, evidence, public-copy,
> license and repository-hygiene documentation corrections. Preserve the accepted
> producer and real-consumer contract, standalone identity, and all existing
> evidence limits. Finish with local documentation verification, one bounded
> Astra/high review, logical documentation commits and a truthful completion
> record. No product, dependency, publishing, archival or recovery-state changes
> are authorized.

The current execution disposition is isolated local/private reference readiness:
public release, published-site readiness, hosting, DNS, credentials, real users,
and external evidence are deferred and non-blocking.

+### Complete authored definition retained verbatim

Status: **definition authored; execution not started** (2026-09-12, America/New_York).
Authoring route: **GPT-6 Astra / high**. This expands the existing Phase 04;
it does not renumber the library, complete Phase 04, or reopen Phase 03.

### Purpose and exact later execution objective

Decide what public-facing readiness means without requiring deployment. After
explicit execution authorization and an owner-selected readiness posture,
consolidate Z-Depth CSS's future-work context into the owner-requested original
JavaScript Mastery six-file system, in the exact order below, followed by this
existing lifecycle library as the seventh authority. Populate from direct
repository evidence, wire the order through root `AGENTS.md`, classify supporting
and historical documents without losing provenance, and make only applicable
README, authoring, integration, security, evidence, public-copy, license and
repository-hygiene documentation corrections. Preserve the accepted producer
and real-consumer contract, standalone identity, and all existing evidence limits.
Finish with local documentation verification, one bounded Astra/high review,
logical documentation commits and a truthful completion record. No product,
dependency, publishing, archival or recovery-state changes are authorized.

### Baseline, numbering and evidence

- Authoring entered clean and detached at
  `45b33aaacbd88367c458dc92dd14961f340b50e6`; local `main` agrees at entry.
  `origin/main` is `0669728123f60770f1383163d952984712da197f` locally; no remote
  query or synchronization is implied. No root or nested `AGENTS.md` exists in
  this tree; the applicable `/Users/byrd/.codex/AGENTS.md` is empty at inspection.
- This library and its complete path history define Phases 00–04.
  [Onboarding](ONBOARDING-EVIDENCE.md), [Phase 01](PHASE-01-RECOVERY-EVIDENCE.md)
  at `36581dae2fbe1be63e9f93133ee9f38eadc1bb5f`, and
  [Phase 02](PHASE-02-LOCAL-VERIFICATION-EVIDENCE.md) at
  `5220f853db61e336b4c8a0d8759cf9fe2a218347` establish recovery and local verification.
  [Phase 03](PHASE-03-CONTRACT-EVIDENCE.md) explicitly names Phase 04 as next,
  conditional on the owner's readiness posture. No Phase 04 completion record
  exists in the inspected tree/history. Closeout and archive records do not
  advance the lifecycle. Thus **04**, not a copied sibling stage number, is next.
- Accepted producer: `14e3b9274e14e5706016ac767efe13155b9aaa21`, evidence
  `2ee3a3064d26316cdf973ab51abcfd89a5d7db1a`, F5 fix
  `6bdbeb818bebf9b7d9f0b76c41cf05f193ffb414`, reconciliation
  `fcddb43f729d843c9afedc81868c3afcfa8c1d3e`. Read
  [current closeout](../../current-state-closeout.md),
  [history map](../../project-history-and-evidence-map.md),
  [session ledger](../../session-ledger.md) and
  [archive manifest](../../archive-manifest.md) together, with their dated limits.
- Real consumer A-Frame Bootstrap's separately owned adoption chain is
  `ffa255d96dad0d23e0e13e20c2e1c42239e53126` →
  `2cc967359fa1bf5d91411e1d7811fbda969cfc8e` →
  `58f9a6a6b4edf45ca903a3d6d17a76d649d1a6e9`; remediation is
  `f09ca4814b6846366554845d1cfd8789f0ccd0ec` →
  `be3330803776370c5142520be993fddd68349652` →
  `67141532648e7891f665a12e6311d5516c79e98b`. Commit identities and its
  `58f9a6a:docs/lifecycle/current-state-closeout.md` were inspected read-only.
- Frozen Astra/high review task `01a09073-eb3a-7013-8f53-603a5ca752a4` and its
  retained `outputs/post-remediation-rereview.md` under
  `/Users/byrd/Documents/Codex/2026-09-11/zdepth-aframe-final-architecture-review`
  directly establish **F1–F6 PASS**, at producer `fcddb43` and consumer `6714153`.
  F1 preserves interaction classes; F2 accepts equivalent depth encodings;
  F3 accepts local event/snapshot state and depth; F4 accepts normalized primitive
  state; F5 accepts local producer live/reset state; F6 accepts temporal closeout
  reconciliation. The F6-only final check carried F1–F5 forward without reruns.
  Earlier HOLD wording is historical, not an unresolved current gate.
- Retain the review's exact limits: 14 producer tests / 7 static checks and
  57 consumer tests / 46 routes are carried-forward results, not authoring-time
  runs. Mock/static evidence is not browser DOM, WebGL, ray/focus, headset,
  accessibility, public-release, external-security or Reader-adoption proof.
  Utility classes are preserved metadata, not certified independent class-only
  semantic input. Deferred proof is not a new Phase 04 blocker.
- Product source inputs: [README](../../README.md), [architecture](../../ARCHITECTURE.md),
  [authoring](../../AUTHORING.md), [integration](../../INTEGRATION.md),
  [bridge specification](../../bridge-spec.md), [contribution rules](../../CONTRIBUTING.md),
  [security](../../SECURITY.md), [historical evidence](../../EVIDENCE.md),
  [package scripts](../../package.json), `index.html`, `styles.css`, `script.js`,
  `bridge.js`, existing tests, `LICENSE`, `.gitignore` and `CHANGELOG.md`.
- Machi Cal's `docs/lifecycle-goals/10-context-system-consolidation-goal.md`
  and `docs/CONTEXT_SYSTEM_REFERENCE_NOTE.md` at
  `2e49b489cd81d193c18ba0548f33f864f2c4202c` are structural references only:
  objective, gates, responsibilities, preservation, routing, commit plan and
  completion fields. Its stage number, branding, source and harness commands
  confer no authority or applicability here.

### Original six files and seventh authority

The six filenames/order are the owner's explicit original JavaScript Mastery
request. They are not inferred from the current public template. The
[public JavaScript Mastery repository](https://github.com/jsmastery-pro/context-driven-dev)
was inspected during authoring and describes nine files: overview, architecture,
build plan, code standards, library docs, UI tokens, UI rules, UI registry and
progress tracker. That newer variant does not establish the original six-file
history or override this request. Do not substitute its files or install its tools.

Required future read order and responsibilities (all paths relative to the root):

| Order / authority | Responsibility and source | Conflict boundary |
| --- | --- | --- |
| 1. `context/project-overview.md` | Z-Depth CSS identity, `depth-sol` vocabulary, audience, flat-web intent, named real consumer, scope and non-goals; derive from README, authoring and accepted closeout. | Product intent cannot be replaced by sibling branding or a template; observed implementation discrepancies must be reported, not turned into new intent. |
| 2. `context/architecture.md` | Static HTML/CSS/ES-module ownership, control → normalized model → fallback/JSON/events/runtime output, stable contracts and runtime boundaries; cite root architecture, bridge spec, integration and source. | Context summarizes technical evidence; it cannot silently redesign source or supersede the accepted F1–F6 review. Keep root architecture as detailed support. |
| 3. `context/ui-context.md` | Existing visual language, depth/light cues, controls, presets, hover/focus/selection/motion, responsive/reduced-motion hooks, empty/error/reset/copy states and proof limits; cite HTML/CSS/script and authoring. | UI aspirations cannot override the data contract or promote mock/static checks to browser/XR acceptance. No imported design system. |
| 4. `context/code-standards.md` | Dependency-free ES modules, direct functions/flat files, existing Node/static checks, docs/security hygiene, test scope and exact commands; cite CONTRIBUTING, SECURITY, package and maintained tests. | Standards must match this repo; no invented build, install, lint, architecture harness, dependencies or retroactive acceptance tests. |
| 5. `context/ai-workflow-rules.md` | Formal goals before edits, read order, evidence freshness, authorization scope, model routing, logical commits, stop rules and Git/recovery/credential boundaries. | Workflow cannot grant execution/publication/archival authority or relax owner direction, accepted evidence limits or lifecycle gates. |
| 6. `context/progress-tracker.md` | Completed Phases 00–03, accepted consumer/remediation checkpoints, Phase 04 status, dated evidence, pending public-posture decision, deferred proof and next valid work. | A status summary cannot complete a phase, repair a missing goal receipt, or overrule this library and its completion evidence. |
| 7. `docs/lifecycle/LIFECYCLE.md` | Sole phase authority: numbering, objectives, applicability, gates, success/acceptance, verification, routing and execution/completion records. | This library governs lifecycle status; direct dated acceptance supersedes stale status summaries without rewriting old evidence or extending the acceptance scope. |

Root `AGENTS.md` will wire these seven paths in this exact order before work,
then direct task-specific supporting reads. It is routing, not an eighth
canonical content source. Keep existing applicable instructions when later
adding wiring. Do not create a parallel phase library or duplicate the full
library in context files.

Read order is not permission to let the last file overwrite facts. Owner
instructions govern scope; the library governs phase gates; source and maintained
tests establish implementation; dated acceptance establishes what passed at its
specific SHA; context files are bounded summaries. On disagreement, cite both
paths/SHAs and label fact, retained evidence or inference. Correct only current
summaries when the lineage is clear; preserve historical text. Stop the affected
decision for Astra/high if unresolved. Never repair a conflict by changing code,
inventing completion or rerunning accepted work.

### Entry gate for later execution

- Explicit authorization to **execute** this full objective and a fresh formal
  goal activated before edits, with route recorded. This authoring goal is not
  execution authorization.
- Owner identifies private archive readiness, public GitHub readiness, published
  site readiness or another explicit target. This existing gate remains pending:
  neither MIT licensing, private package metadata nor backup history chooses it.
  Even published-site readiness here means local documentation only.
- Verified local baseline and accepted contract posture remain evidenced by the
  above records. Inspect current HEAD, full relevant history, status, instructions,
  refs, stash and recovery state; account for intervening documentation commits.
  Stop on unrelated dirty files rather than reset, stash, clean or absorb them.
- Read this complete library, completion/closeout records and source inputs;
  establish which documents are current, historical or mixed before writing.
  Missing optional external proof remains deferred; missing indispensable
  provenance is an explicit gap, not permission to invent it.

### Z-Depth invariants and negative cases

- Preserve standalone Z-Depth CSS and native `depth-sol/0.3` identity, version,
  exports, normalizers, units/defaults and dependency-free static browser path.
  `depth` and `<sol>` are experimental spatial semantics, not browser standards.
  A flat page remains usable without A-Frame, WebGL or WebXR.
- Preserve all `getCssCustomProperties` outputs, including width/height/depth,
  hue/light/fallback variables and `--depth-sol-layer`, `--depth-sol-z-index`,
  `--depth-sol-depth-offset`, `--depth-sol-hover`, `--depth-sol-focus`,
  `--depth-sol-selected`, `--depth-sol-motion`. No renames or unit changes.
- Preserve `z-depth-surface`, `z-depth-layer-N`, `is-depth-hovered`,
  `is-depth-focused`, `is-depth-selected`, `is-depth-motion-{state}` and caller
  class ownership. Preserve layer normalization (-20 through 20), boolean state,
  and motion vocabulary `idle`, `enter`, `exit`, `active`, `settled`.
- Preserve model `source`, `browser`, `runtime`, interaction fields and JSON
  keys `version`, `source`, `browser`, `aframe`, `utilityClasses`, `events`.
  Event order remains `depth-sol:layer`, `depth-sol:hover`, `depth-sol:focus`,
  `depth-sol:selection`, `depth-sol:motion`; each data record retains `type`,
  `version`, `surfaceId`, `layer`, `zIndex`, `depthOffsetPx`, `depthOffsetM`, `state`.
  Records do not mandate DOM dispatch or an event bus.
- Preserve `1000px = 1m` default mapping and the accepted plane/depth-offset
  distinction. Keep 2D layering, hover, focus, selection and motion connected
  to spatial 3D/XR depth intent without claiming rendered/device proof.
  A-Frame Bootstrap is the named real consumer and owns its adapter, primitives,
  themes, interactions and scene composition; no sibling dependency, source copy,
  framework merger, Machi branding or Reader-adoption assertion.
- Preserve F5's authoritative preset/interaction state and synchronized outputs;
  never describe rendered ARIA as input authority or stale reset state as accepted.
  Carry F1–F6 PASS and their exact limits forward. No new fixtures, criteria,
  tests or re-review of Phase 03/architecture to make documentation look complete.

### Deliverables, document classification and preservation

Later execution creates exactly the six populated context files and root wiring,
updates this library with one execution record, and adds a documentation
classification table within that record. No extra receipt/index file is needed.
Inventory every tracked Markdown document and `LICENSE`; record path, role,
evidence SHA/date, unique facts, current destination/pointer, disposition and
reason. Classifications are future work, not completed by this definition:

- **Canonical context:** the six new files plus this existing library only.
- **Current supporting documentation:** assess README, AUTHORING, ARCHITECTURE,
  INTEGRATION, bridge-spec, CONTRIBUTING, SECURITY and LICENSE individually;
  keep detailed contracts and public guidance accessible. Apply the original
  Phase 04 public-copy, license and hygiene review for the chosen posture.
- **Historical or mixed evidence:** retain CHANGELOG, EVIDENCE, onboarding and
  Phase 01–03 records, history map, closeout, ledger and archive manifest with
  dated scope. Split classifications by section where a file combines current
  pointers and historical records. Missing earlier formal-goal receipts remain
  missing; archive eligibility wording is not proof of execution or new permission.
- **Superseded/deprecated:** assign only when direct evidence identifies the
  replacement and every unique fact has a retained source. Mark sections with
  dated replacement links and rationale; never deprecate merely for age or naming.
  Prefer in-place preservation. Moves require demonstrated link safety and
  provenance retention; default to no moves. No deletion, wholesale historical
  rewrite, recovery cleanup or automatic chat archival belongs to this phase.

### Success, acceptance and exit gate

- All six files are grounded in named sources, with the seven responsibilities
  and conflict rules intact; root wiring enforces the exact read order and
  this remains the sole phase library. Tracked files explain the project alone.
- Every inventoried document has a traceable, link-safe classification; unique
  facts, history, accepted outcomes and explicit limits remain retrievable.
- Applicable public copy avoids private process language; security/local-only
  exclusions and license statements match the actual repository and chosen
  posture. Existing static smoke or equivalent copy guard passes. This preserves
  Phase 04's original acceptance, without extending prior product acceptance.
- Documentation-only diff, exact command outcomes/skips and tested SHA/tree,
  logical commits, preserved pre-existing refs/stash/recovery state, one bounded
  Astra/high documentation review and clean final status are recorded.
- Mark Phase 04 complete only after these gates pass and the execution goal
  completes. A review HOLD remains a recorded incomplete execution. No later
  phase, fresh architecture review, release or archive action follows automatically.

### Exact verification commands for later execution

Run from this repository root. Capture these entry values before any edit:

```sh
git status --short --branch --untracked-files=all
git rev-parse HEAD
git log --graph --decorate --oneline --all --max-count=80
git show-ref --head
git stash list --format='%H %gd %s'
git ls-files
```

Set the entry SHA from that result, then check the final documentation tree:

```sh
ZDEPTH_PHASE04_BASE=$(git rev-parse HEAD) # capture once at entry, not after commits
git diff --check
git diff --cached --check
git diff --name-status "$ZDEPTH_PHASE04_BASE"
git diff --exit-code "$ZDEPTH_PHASE04_BASE" -- index.html styles.css script.js bridge.js package.json tests social-preview.svg .gitignore LICENSE
python3 - <<'PY'
from pathlib import Path
import re
order = ['context/project-overview.md', 'context/architecture.md',
         'context/ui-context.md', 'context/code-standards.md',
         'context/ai-workflow-rules.md', 'context/progress-tracker.md',
         'docs/lifecycle/LIFECYCLE.md']
assert sorted(str(p) for p in Path('context').glob('*.md')) == sorted(order[:6])
assert all(Path(p).is_file() and Path(p).read_text().strip() for p in order)
wiring = Path('AGENTS.md').read_text()
positions = [wiring.index(p) for p in order]
assert positions == sorted(positions), 'Wrong AGENTS read order'
for name in [*order, 'AGENTS.md']:
    for link in re.findall(r'\[[^\]]*\]\(([^)]+)\)', Path(name).read_text()):
        target = link.split('#', 1)[0]
        if target and not re.match(r'[a-z]+://', target):
            assert (Path(name).parent / target).exists(), (name, target)
print('Seven authorities, wiring order and local file links: PASS')
PY
node --test --test-name-pattern='keeps private process language out of visible page copy' tests/static-smoke.test.mjs
git log --format='%H %s' "$ZDEPTH_PHASE04_BASE"..HEAD
git show-ref --head
git stash list --format='%H %gd %s'
git status --short --branch --untracked-files=all
```

The existing named copy guard is the permitted equivalent to static smoke.
`npm run verify` aliases `npm test` and reruns accepted producer contracts;
`npm run validate` also includes F5 runtime/mock coverage. Record both as skipped
for this documentation-only phase under the owner's no-rerun constraint; do not
expand or replace the maintained test universe. No dependency install, browser,
HTTP server, hardware, hosting or architecture harness is needed. Inspect local
link anchors and any changed supporting-document links during the bounded review;
the script checks file targets only. Record exact additional documentation-only
commands if needed, including failures and omissions. Compare pre-existing refs
and stash entries against entry evidence; detached HEAD may advance with commits,
but existing refs must not be moved or deleted. Preserve app-created recovery refs.

### Later routing, commits and stop conditions

Use **GPT-5.6 Terra / medium** (`gpt-5.6-terra`, `medium`) for bounded inventory,
context drafting, wiring and documentation verification. Use **GPT-6 Astra / high**
(`gpt-6-astra`, `high`) for disputed provenance and one bounded final review of
the new documentation delta against this stored objective. Do not reopen accepted
Phase 03, architecture or frozen F1–F6. **Astra / xhigh** is permitted only if
high cannot resolve irreconcilable lineage affecting canonical authority; record
the exact conflicting sources and attempted resolution. Routing grants no broader
scope and does not authorize spawning tasks or archiving them.

Logical later execution commits, only after the entry gate:

1. Six populated context files plus minimal `AGENTS.md` wiring as one coherent
   documentation boundary.
2. Applicable supporting-doc corrections, classification table and the single
   lifecycle execution/completion record as the second boundary. Combine only
   if inseparable; do not create empty commits or duplicate completion receipts.

Stop the affected work for missing execution/public-posture authorization,
unrelated dirty changes, inaccessible indispensable evidence, stronger evidence
contradicting numbering, unresolved authority/lineage conflict, failed required
documentation checks, provenance loss or broken links. Record an inherited issue
with its scope; do not loop on old acceptance. Any need for product/dependency
changes, new acceptance criteria, public/hardware proof, credentials, saved browser
profiles, sibling writes, ref/stash changes, push, deploy, publish, history rewrite,
merge or task archival exceeds this objective. Preserve completed independent
documentation work and report the exact blocker without widening scope.

### Later completion-record template (unfilled; not a completion claim)

```text
Phase 04 execution status: <not started / incomplete / complete>
Objective: <this stored Phase 04 objective and definition commit>
Authorization and owner-selected posture: <receipt/date; explicit target>
Formal goal: <task ID, activation before edits, route, completion receipt>
Entry: <SHA/ref/worktree, clean status, applicable instructions>
Evidence: <paths/SHAs; accepted Phase 03 and F1–F6; direct/retained/inferred>
Authority/conflict audit: <six paths/order, seventh library, wiring, resolutions>
Files created/updated: <exact paths; documentation-only scope>
Classification: <path/section | role | SHA/date | unique facts | retained
                 destination/replacement | disposition/reason | link result>
Public-copy/license/hygiene applicability: <posture-specific outcome/limits>
Verification: <exact command | exit/result | tested SHA/tree | fresh or retained>
Skipped checks: <exact command | concrete reason; no accepted-phase reruns>
Review: <one Astra/high delta review, PASS/HOLD, disputed provenance if any>
Commits: <logical boundaries and SHAs; resolve final record with git log>
Preservation: <pre-existing refs/stash/recovery comparison; no lost history>
Exit: <clean status, success/gates, goal receipt; no backdated completion>
Remaining limits/next work: <deferred evidence and owner decisions; no auto-start>
Non-actions: <no product/dependency, public/hardware, credential/profile,
              sibling, push/deploy, history/ref/stash or archive changes>
```

### Subsequent acceptance and Phase 04 authoring record

The preceding paragraph is retained as the `fcddb43` historical HOLD checkpoint.
The later frozen Astra/high F6-only acceptance at consumer `6714153`, retained
in review task `01a09073-eb3a-7013-8f53-603a5ca752a4` and corroborated by the
four current closeout documents at `45b33aa`, establishes **F1–F6 PASS**.
It supersedes that HOLD for the frozen scope without backdating the paragraph.
The separate final-review requirement above is already satisfied for this
accepted Phase 03/consumer scope; Phase 04 authoring does not reopen it.

Authoring task: `01a09869-d80a-7402-8c75-378a30ee4e70`, 2026-09-12 local date,
**GPT-6 Astra / high**. The formal goal was created and returned `active` before
the first repository edit. Exact goal-tool objective:

> Using GPT-6 Astra / high, author and complete the formal definition of Z-Depth CSS’s next valid lifecycle phase from direct lifecycle, Git, completion, accepted Phase 3 producer/consumer and frozen F1–F6 PASS, architecture/closeout, source-document and project-instruction evidence. Define later adoption of the owner-requested original JavaScript Mastery six-file context system in the exact requested order, with the existing phase library as seventh authority and future AGENTS.md wiring. Preserve standalone Z-Depth CSS identity, stable variables, utility classes, JSON state and bridge-event contract, and A-Frame Bootstrap as its named real consumer. Include purpose, baseline/evidence, entry/exit gates, seven responsibilities/conflict rules, invariants/negative cases, success criteria, non-goals, document classification/preservation/deprecation, Terra/medium execution and bounded Astra/high review routing (xhigh only for irreconcilable lineage), exact verification commands, logical execution commit plan, stop conditions and completion-record template. Use Machi Cal Stage 10 only as structural reference; distinguish the original six-file owner request from the newer public nine-file template. Make one minimal documentation-only commit and leave the worktree clean. Do not execute the authored phase, create context files or AGENTS wiring, reopen Phase 3 or architecture, invent acceptance criteria for accepted work, alter product behavior/dependencies, require public hosting/hardware, push/deploy/rewrite history/archive tasks, disturb refs/stashes/recovery state, or touch credentials/browser profiles.

Result scope: Phase 04 definition only, confined to `docs/lifecycle/LIFECYCLE.md`.
Baseline: `45b33aaacbd88367c458dc92dd14961f340b50e6`, initial status
`## HEAD (no branch)` with no changes. Evidence inputs and the numbering decision
are recorded in Phase 04 above. The earlier closeout's missing readable goal
receipt remains an historical limit; this goal does not repair it.

Authoring verification (documentation delta only):

```sh
git diff --check
git diff --stat
git diff --exit-code 45b33aa -- . ':(exclude)docs/lifecycle/LIFECYCLE.md'
test ! -e context
test ! -e AGENTS.md
```

These checks passed before commit: only the lifecycle definition changed,
with no whitespace errors, context files or wiring. A bounded manual review
checked all seven responsibilities, links, historical/current status, invariants,
gates, command applicability and the future completion template. Product suites,
architecture review, browser/HTTP, hardware and security scans were not rerun:
this authoring delta changes no product or public page and accepted Phase 03
evidence is carried forward with its original limits.

One documentation-only commit is the authoring boundary; resolve its exact SHA
without a self-referential receipt commit using:

```sh
git log -1 --format='%H %s' -- docs/lifecycle/LIFECYCLE.md
git show --format=fuller --stat HEAD
git status --short --branch --untracked-files=all
```

After committing, compare pre-existing refs and stash to the entry inventory,
confirm unchanged product/supporting records and a clean detached worktree,
then complete only the authoring goal in this task. That post-commit goal receipt
and final SHA belong to the task report; this is not a Phase 04 execution receipt.
No branch creation, main integration, push, deployment, history rewrite, ref/stash
cleanup, credential/profile access or task archival is part of this boundary.

### Authorities, invariants, and execution controls

The required authorities are, in order: `context/project-overview.md` (identity,
scope, named consumer); `context/architecture.md` (static ownership and data
flow); `context/ui-context.md` (existing visual/state behavior and proof limits);
`context/code-standards.md` (dependency-free implementation and hygiene);
`context/ai-workflow-rules.md` (goals, evidence, routing and stop rules);
`context/progress-tracker.md` (dated phase state and deferred proof); and this
library (sole numbering, gates, acceptance, verification and completion
authority). `AGENTS.md` routes that order and is not an eighth content source.

Preserve standalone `depth-sol/0.3`, the static browser path, `1000px = 1m`,
stable variables, class families, model/JSON fields, deterministic event order,
layer range, state vocabulary, F5 authoritative interaction state, and the
plane/depth-offset distinction. Preserve A-Frame Bootstrap as the named,
separately owned real consumer. Frozen F1–F6 PASS remains acceptance evidence at
its recorded producer/consumer SHAs; it is neither reopened nor expanded. Do not
claim browser DOM, WebGL, ray/focus, headset, accessibility, public-release,
external-security, or Reader-adoption proof.

Classify every tracked Markdown file and `LICENSE` by path, role, evidence
SHA/date, unique facts, current destination or pointer, disposition and reason,
with link results. Keep historical and mixed documents in place unless direct
evidence proves a lossless replacement. Record exact command outcomes and skips,
logical commits, ref/stash comparison, and the formal-goal state. Stop for missing
authorization, unrelated dirt, missing indispensable provenance, broken links, or
any need to change product scope, dependencies, refs/stash, history, deployment,
credentials, sibling state, or task archives.

The documentation procedure is `git diff --check`; a source-file exclusion diff
against the entry SHA; the seven-authority/file-link check; the named visible-copy
guard; commit/ref/stash/status inspection; and bounded Astra/high delta review.
`npm test`, `npm run verify`, and `npm run validate` are maintained product checks;
they are not required fresh evidence for a documentation-only delta. The completion
record must state authorization/posture, formal-goal state, entry, evidence,
authority/conflict audit, created/updated files, per-file classification,
posture-specific copy/license/hygiene result, commands and skips, review, commits,
preservation, exit status, remaining limits, and non-actions.

Purpose: decide what public-facing readiness means without requiring deployment.

Entry gate:

- Local product baseline and contract posture are verified.
- Owner has identified whether this is private archive, public GitHub, or published site readiness.

Deliverables:

- README, authoring, integration, security, and evidence updates as applicable
- public copy review
- license and repository hygiene review

Success criteria:

- Public copy does not expose private process language.
- The project is understandable from tracked files alone.
- Security and local-only exclusions match the actual repository.

Acceptance criteria:

- Static smoke or equivalent copy guard passes when available.
- `git status --short --branch` shows only intentional changes.

Stop, fail, or prevent-completion criteria:

- Owner has not chosen public posture where required.
- Readiness would require pushing, deploying, or publishing.

Exact verification commands:

```sh
git status --short --branch
git diff --check
node --test --test-name-pattern='keeps private process language out of visible page copy' tests/static-smoke.test.mjs
```

For the complete Phase 04 documentation procedure, source exclusions, authority
and link verification, preservation inspection, commands intentionally not rerun,
and command outcomes, use the retained authored definition and current execution
record below. `npm run verify` is a maintained product-contract suite and is not a
required rerun for this documentation-only phase.

Logical commit boundary:

- documentation readiness changes only.

## Final Separate Review Goal

After all preceding applicable phases are complete, open a separate formal goal using GPT-6 Astra/high for final architecture, test governance, provenance, and documentation review. That review must not be collapsed into ordinary implementation phases.

## Evidence and Archive Closeout Routing

This routing governs evidence-led documentation and archive-readiness work. It does not authorize a lifecycle advance, product change, integration, deployment, push, or task archival.

- Use **GPT-5.6 Terra / medium** for repository evidence collection, chronology drafting, provenance maps, session-ledger drafting, and advisory archive manifests.
- Escalate disputed provenance, lifecycle contradictions, and final archive eligibility to **GPT-6 Astra / high**. Astra/high is a review gate, not an automatic approval to archive.
- Use **GPT-6 Astra / xhigh** only when Astra/high cannot resolve genuinely conflicting lineages from the available evidence.

The current lifecycle is verified through **Phase 03** as of 2026-09-11. Phase 03 was opened only after the owner identified A-Frame Bootstrap as the real downstream consumer requirement, and it completed as a producer-side contract checkpoint. The separate A-Frame Bootstrap task later consumed and proved the `depth-sol/0.3` contract at `ffa255d`, `2cc9673`, and `58f9a6a`, but final architecture acceptance remains **HOLD** pending bounded remediation and GPT-6 Astra/high re-review.

## Phase 04 execution record — context and local/private readiness

Status: **REVIEW_READY**. Execution authorization and the owner-selected posture
were recorded on 2026-09-13: isolated local/private reference readiness only. No
public release, published site, hosting, DNS, credentials, real users, or external
evidence is required or claimed. This resolves Phase 04's posture gate without
changing product scope.

### Authority and preservation

The six context files are the canonical future-work summaries, in this exact
order: `context/project-overview.md`, `context/architecture.md`,
`context/ui-context.md`, `context/code-standards.md`,
`context/ai-workflow-rules.md`, and `context/progress-tracker.md`. This library is
the seventh and sole phase authority. Root `AGENTS.md` wires that order; it is
routing, not an eighth content authority.

The execution baseline was clean detached `45b33aaacbd88367c458dc92dd14961f340b50e6`.
The accepted producer chain remains `14e3b92` / `2ee3a30` / `6bdbeb8` / `fcddb43`.
The separately owned A-Frame Bootstrap adoption and frozen Astra/high F1–F6 PASS
remain dated consumer evidence, not a dependency or a new acceptance universe.
Historic HOLD language above is preserved as its dated checkpoint; the closeout,
history map, ledger, and archive manifest record the later PASS and its limits.

### Documentation classification

Each row was checked against the entry tree `45b33aa` (2026-09-11) or the
Phase 04 creation commit `e7cbbe1` (2026-09-13). “Link PASS” means every local
Markdown file target in every tracked Markdown document was resolved by the final
Phase 04 documentation check on 2026-09-13; external URLs and Markdown fragments
were not fetched or anchor-validated.

| Path / evidence SHA-date | Role and unique facts | Current destination, disposition, reason, link result |
| --- | --- | --- |
| `AGENTS.md` / `e7cbbe1`, 2026-09-13 | Exact seven-authority read order | Canonical routing; retain; Link PASS. |
| `context/project-overview.md` / `e7cbbe1`, 2026-09-13 | Identity, scope, non-goals, named consumer | Canonical context; retain; Link PASS. |
| `context/architecture.md` / `e7cbbe1`, 2026-09-13 | Static ownership, data flow, runtime boundary | Canonical context; retain; Link PASS. |
| `context/ui-context.md` / `e7cbbe1`, 2026-09-13 | Visual language, UI states, proof limits | Canonical context; retain; Link PASS. |
| `context/code-standards.md` / `e7cbbe1`, 2026-09-13 | Direct ES modules, commands, hygiene | Canonical context; retain; Link PASS. |
| `context/ai-workflow-rules.md` / `e7cbbe1`, 2026-09-13 | Goal, evidence, route, stop controls | Canonical context; retain; Link PASS. |
| `context/progress-tracker.md` / `e7cbbe1`, 2026-09-13 | Accepted phases, local/private posture, next review | Canonical context; retain; Link PASS. |
| `docs/lifecycle/LIFECYCLE.md` / `d5462cf`, 2026-09-12; current record `c639ed4` | Sole phase gates, stored definition, execution record | Seventh authority; retain; Link PASS. |
| `README.md` / `45b33aa`, 2026-09-11; update `c639ed4` | Public product explanation, running, API map | Current support; retain detailed guidance; Link PASS. |
| `AUTHORING.md` / `45b33aa`, 2026-09-11 | `depth-sol/0.3` semantics, inputs, defaults | Current support; retain; Link PASS. |
| `ARCHITECTURE.md` / `45b33aa`, 2026-09-11 | File ownership, data flow, extension boundary | Current support; retain; Link PASS. |
| `INTEGRATION.md` / `45b33aa`, 2026-09-11 | Stable producer/consumer handoff | Current support; retain; Link PASS. |
| `bridge-spec.md` / `45b33aa`, 2026-09-11 | Detailed normalization and mapping rules | Current support; retain; Link PASS. |
| `CONTRIBUTING.md` / `45b33aa`, 2026-09-11 | Contribution scope and local checks | Current support; retain; Link PASS. |
| `SECURITY.md` / `45b33aa`, 2026-09-11; update `c639ed4` | Secrets, ignored local state, local/private posture | Current support; retain; Link PASS. |
| `LICENSE` / `45b33aa`, 2026-09-11 | MIT permission and warranty terms | Current legal text; retain unchanged; no links. |
| `CHANGELOG.md` / `45b33aa`, 2026-09-11 | Historical product change chronology | Historical; retain dated record; Link PASS. |
| `EVIDENCE.md` / `45b33aa`, 2026-09-11 | Intro: current lifecycle pointers; body: September 2 checks and limits | Mixed by section; retain intro as pointers and body as historical evidence; Link PASS. |
| `docs/lifecycle/ONBOARDING-EVIDENCE.md` / `d617a96`, 2026-09-09 | Phase 00 classification and baseline | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-01-RECOVERY-EVIDENCE.md` / `36581da`, 2026-09-09 | Snapshot recovery decision and provenance | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-02-LOCAL-VERIFICATION-EVIDENCE.md` / `5220f85`, 2026-09-09 | Fresh Phase 02 commands and results | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-03-CONTRACT-EVIDENCE.md` / `2ee3a30`, 2026-09-11 | Producer contract and conditional next phase | Historical/current contract evidence; retain; Link PASS. |
| `current-state-closeout.md` / `45b33aa`, 2026-09-11 | State: accepted Phase 03/F1–F6 and limits; Archive Eligibility: dated disposition | Mixed by section; retain State as checkpoint and Eligibility as non-executing historical scope; Link PASS. |
| `project-history-and-evidence-map.md` / `45b33aa`, 2026-09-11 | Current Truth: present identity; Provenance/Source: dated lineage and checks; Boundary: routing | Mixed by section; retain current summary and historical sections with dates; Link PASS. |
| `session-ledger.md` / `45b33aa`, 2026-09-11 | Chronological Ledger: task evidence; Negative Findings: dated classifications; Retention: preservation list | Historical task evidence by section; retain without changing outcome claims; Link PASS. |
| `archive-manifest.md` / `45b33aa`, 2026-09-11 | Scope: non-actions; Retain: preservation; Eligibility: advisory classification | Historical/archive evidence by section; retain, with no new archive authority; Link PASS. |

No tracked Markdown document or `LICENSE` is deprecated or moved: direct evidence
does not establish a lossless replacement for its unique facts. Missing earlier
formal-goal receipts remain missing; no historical evidence was rewritten as fresh
proof.

### Execution evidence and exit gate

Documentation-only work created the six files and wiring in
`e7cbbe135369508598d663c0210d10698de459f6`, then added the applicable
README/security corrections and first execution record in
`c639ed490c2952386c3a16fc6f3003c952026478`. This remediation records the
definition and provenance gaps found by Astra/high review turn 1; its commit is
resolved after the final checks below. The tested documentation tree before this
remediation was clean `c639ed4`; protected product paths remained byte-identical
to entry `45b33aa`.

Formal-goal chronology: task `01a09acf-f3a8-7a60-804c-84f85baf7c76` created the
execution goal and returned `active` before the first Phase 04 edit. It was later
recorded `blocked` when the posture gate was missing. The owner then supplied the
local/private disposition and explicitly resumed execution. The available goal
record still reports `blocked`; this is retained as a process-state limit, not
silently rewritten as a completion receipt. Phase 04 remains incomplete pending
the bounded review result and a truthful goal completion record.

The documentation checks run at `c639ed4` and repeated at `9ade7ba` were:

```sh
git diff --check                                  # PASS, no whitespace errors
git diff --exit-code 45b33aa -- index.html styles.css script.js bridge.js package.json tests social-preview.svg .gitignore LICENSE
                                                    # PASS, no protected-path diff
python3 - <<'PY'                                   # PASS, all authorities and tracked Markdown local targets
from pathlib import Path
import re
order = ['context/project-overview.md', 'context/architecture.md', 'context/ui-context.md', 'context/code-standards.md', 'context/ai-workflow-rules.md', 'context/progress-tracker.md', 'docs/lifecycle/LIFECYCLE.md']
assert sorted(str(p) for p in Path('context').glob('*.md')) == sorted(order[:6])
assert all(Path(p).is_file() and Path(p).read_text().strip() for p in order)
wiring = Path('AGENTS.md').read_text()
assert [wiring.index(p) for p in order] == sorted(wiring.index(p) for p in order)
for name in [*Path('.').glob('*.md'), *Path('context').glob('*.md'), *Path('docs/lifecycle').glob('*.md')]:
    for link in re.findall(r'\[[^\]]*\]\(([^)]+)\)', name.read_text()):
        target = link.split('#', 1)[0]
        if target and not re.match(r'[a-z]+://', target): assert (name.parent / target).exists(), (name, target)
print('Authority order and tracked-Markdown local targets: PASS')
PY
node --test --test-name-pattern='keeps private process language out of visible page copy' tests/static-smoke.test.mjs
                                                    # PASS, 1/1
git show-ref --head; git stash list                # PASS, entry refs/stash retained
git status --short --branch --untracked-files=all  # PASS, clean detached tree
```

The recorded candidates are `e7cbbe1` (context and wiring), `c639ed4`
(readiness evidence), and `9ade7ba` (turn-1 remediation). This turn-2 remediation
is checked against that clean candidate immediately before its documentation-only
commit; `git log --format='%H %s' 45b33aa..HEAD` resolves the complete commit set
without a self-referential receipt. The post-commit frozen-check result and clean
tree are reported with that resolved SHA in the task review record.

Before the posture was supplied, initial local diagnostics at entry `45b33aa`
did run `npm test` (14 passing), `npm run verify` (14 passing), and `npm run
validate` (7 passing). They are fresh diagnostic results from that earlier turn,
not required Phase 04 acceptance and not a reopened product-review universe. They
were not rerun after context edits. Browser, HTTP, hardware, hosting, credential,
and external checks remain deferred by the selected posture.

The entry and final preservation comparison found the same retained local main,
recovery, producer, safety, snapshot, remote-tracking, and stash records; only
detached HEAD advanced through the three documentation commits. No product,
dependency, recovery state, deployment, publication, history, existing ref, stash,
or task archive action occurred.

Review turn 1 returned HOLD with finite documentation findings D1–D3. After this
remediation passes the frozen checks and is committed, the candidate is
**RECHECK_READY** for review turn 2/3. That review is limited to this
documentation delta and must not reopen accepted Phase 03, architecture, or frozen
F1–F6. Phase 04 becomes complete only after a PASS, final verification, logical
commit evidence, clean status, and a truthful formal-goal completion receipt.
