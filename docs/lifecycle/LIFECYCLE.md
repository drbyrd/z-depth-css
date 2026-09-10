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

The current lifecycle remains through **Phase 02**. Phase 03 remains gated: a real downstream consumer requirement must be supplied and recorded before contract/API applicability work begins. Do not manufacture a fixture or infer that the optional A-Frame Bootstrap or A-Frame Reader relationship satisfies this gate.
