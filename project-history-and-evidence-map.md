# Z-Depth CSS Project History and Evidence Map

Date: 2026-09-10
Scope: current-approved-checkpoint documentation, provenance, and session-archive closeout. This is a documentation audit, not a Phase 03 implementation or an archive operation.

## Current Truth

Z-Depth CSS is a framework-agnostic, browser-safe depth and document-light CSS layer. Its `depth-sol` vocabulary is native product vocabulary within Z-Depth CSS. It is not a renamed sibling project and it does not depend on A-Frame Bootstrap or A-Frame Reader.

Lifecycle status: **Phase 02 complete; Phase 03 not started and gated.** A concrete downstream consumer requirement is required before Phase 03 can decide a formal API, MCP surface, package surface, hosting surface, or browser-module-only contract. The optional deterministic A-Frame-shaped bridge is downstream integration evidence only; it does not itself open the Phase 03 gate.

Confidence: **high** for current Git/source/test state; **medium** for historical-session outcome classification where only repository evidence survives; **low/not asserted** for any uninspected external, credential, hosted, or remote state.

## Provenance Timeline

| Date | Evidence | Classification | Confidence |
| --- | --- | --- | --- |
| 2026-08-11 | `0669728` / initial safe backup | original reachable baseline; still `origin/main` | high |
| 2026-08-15 | archived task records “Add CSS depth property” and “Prepare z-depth-css for GitHub” | early project/session context; task outcomes are not asserted from listing metadata | medium |
| 2026-09-02 | `5fe9cda` through `8172ebf`, retained by `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` | historical product/verification line | high |
| 2026-09-09 | `3b792c7` lifecycle onboarding; replay `d617a96` | lifecycle classification and recovery preparation | high |
| 2026-09-09 | `9735ceb` through `29f3853`, then `36581dae` | recovery replay and Phase 01 evidence | high |
| 2026-09-09 | `5220f85` | Phase 02 fresh local-verification evidence; current `main` tip | high |
| 2026-09-10 | `920ba7c`, `4ec2752`, and earlier closeout task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` | documentation/provenance/session closeout artifacts; readable formal-goal receipt absent | high for commit/report facts; medium for closeout-process classification |
| 2026-09-10 | current non-backdating ratification | formal goal activated before documentation edits; evidence-gap and formatting correction only | high |

The recovery evidence establishes that the replayed product line was byte-equivalent to the preserved `8172ebf` snapshot before lifecycle documentation was added. A current comparison has no non-lifecycle product-source or test differences against that snapshot. The safety branch `safety/z-depth-saved-dirty-20260909` and stash `16a3883` preserve the partial saved-checkout provenance; neither is a disposal candidate in this closeout.

## Current Source and Verification Evidence

At audit time, `HEAD` was `5220f853db61e336b4c8a0d8759cf9fe2a218347` (“Record Phase 02 local verification evidence”), reachable from local `main`; the checkout was detached in this worktree and clean before documentation edits. `origin/main` remains `0669728`; this observation does not authorize a push or imply a remote decision.

The later closeout commits `920ba7c` and `4ec2752` are retained documentation evidence. Their associated task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` has a final report, but no readable goal-tool activation/completion receipt; no formal-goal completion is asserted retroactively. The current ratification is a separate formal-goal record and cannot repair the historical absence.

Fresh local commands on 2026-09-10:

```text
npm test       -> 11 passed, 0 failed
npm run verify -> 11 passed, 0 failed
npm run validate -> 5 passed, 0 failed
```

The retained source/test fingerprints were:

```text
index.html                  93c723fe9f1aa44eb27b5dd2162b22476b3817786bcde768114bc6698695a4b9
styles.css                  49ecc1b9fd49d8937b21fc73f879501201a89c8ba55a445c5b796e690d289a42
script.js                   b417abba6761886d6aee0cd6538552aee8fc9ad1df54c703d01c600dfdb73ad8
bridge.js                   8831befc01d119c59c65e54e233fd8fd9be1534fd755429b3ca0248bbe675a5b
package.json                850b580d55d8f0aad2886730b882d2eb2ddec27ac876b4602c00d64587420959
tests/bridge.test.mjs       08f9de6c4725df50c3be93d7fff4bc922279845e7a8d2731ae145be18e55da20
tests/static-smoke.test.mjs 917c561f7a168a1c7a286ab794ac71c4a02dd53f2c27d08d1f7de3d3cba90b6f
```

`git fsck --no-reflogs --unreachable` reported loose unreachable objects. They were inventoried as preservation signals only; no prune, garbage collection, reset, clean, rewrite, or object deletion was performed.

## Boundary and Review Routing

The lifecycle library routes evidence/drafting to GPT-5.6 Terra/medium. Disputed provenance, lifecycle contradictions, and final archive eligibility require GPT-6 Astra/high; xhigh is reserved only when high cannot resolve a genuine lineage conflict. No conflict requiring Astra was identified in this checkpoint.

The project retains its own brand. A-Frame Bootstrap and A-Frame Reader are documented downstream-consumer contexts, not code sources, dependencies, or project identities. This audit did not read or modify their worktrees.
