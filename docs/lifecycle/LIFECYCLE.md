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
npm run verify
```

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
Phase 04 creation commit `e7cbbe1` (2026-09-13). “Link PASS” means local file
targets were resolved by the Phase 04 documentation check on 2026-09-13; neither
that result nor this table claims external-link verification.

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
| `EVIDENCE.md` / `45b33aa`, 2026-09-11 | September 2 checks and limits | Mixed: introductory current pointers, historical body; retain sections in place; Link PASS. |
| `docs/lifecycle/ONBOARDING-EVIDENCE.md` / `d617a96`, 2026-09-09 | Phase 00 classification and baseline | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-01-RECOVERY-EVIDENCE.md` / `36581da`, 2026-09-09 | Snapshot recovery decision and provenance | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-02-LOCAL-VERIFICATION-EVIDENCE.md` / `5220f85`, 2026-09-09 | Fresh Phase 02 commands and results | Historical phase evidence; retain; Link PASS. |
| `docs/lifecycle/PHASE-03-CONTRACT-EVIDENCE.md` / `2ee3a30`, 2026-09-11 | Producer contract and conditional next phase | Historical/current contract evidence; retain; Link PASS. |
| `current-state-closeout.md` / `45b33aa`, 2026-09-11 | Current Phase 03/F1–F6 summary and external limits | Mixed closeout; retain dated scope; Link PASS. |
| `project-history-and-evidence-map.md` / `45b33aa`, 2026-09-11 | Lineage, confidence, retained evidence | Mixed provenance map; retain; Link PASS. |
| `session-ledger.md` / `45b33aa`, 2026-09-11 | Task/session classifications and exceptions | Historical task evidence; retain; Link PASS. |
| `archive-manifest.md` / `45b33aa`, 2026-09-11 | Advisory retention and archive classifications | Historical/archive evidence; retain; Link PASS. |

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

The documentation checks run at `c639ed4` were:

```sh
git diff --check                                  # PASS, no whitespace errors
git diff --exit-code 45b33aa -- <protected paths> # PASS, no product-path diff
python3 <seven-authority/file-link check>         # PASS
node --test --test-name-pattern='keeps private process language out of visible page copy' tests/static-smoke.test.mjs
                                                    # PASS, 1/1
git show-ref --head; git stash list                # PASS, entry refs/stash retained
git status --short --branch --untracked-files=all  # PASS, clean detached tree
```

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
