# Z-Depth CSS Project History and Evidence Map

Date: 2026-09-11
Scope: current-approved-checkpoint documentation, provenance, and exact-basename session archival. This does not alter product behavior or Git/recovery state.

## Current Truth

Z-Depth CSS is a framework-agnostic, browser-safe depth and document-light CSS layer. Its `depth-sol` vocabulary is native product vocabulary within Z-Depth CSS. It is not a renamed sibling project and it does not depend on A-Frame Bootstrap or A-Frame Reader.

Lifecycle status: **Phase 03 producer contract accepted.** On 2026-09-11, the owner identified A-Frame Bootstrap as the real downstream consumer requirement. The resulting `depth-sol/0.3` contract covers CSS variables, utility classes, JSON output, and deterministic bridge event payloads for 2D layering, hover, focus, selection, and motion state. A-Frame Bootstrap consumed it at `ffa255d`, `2cc9673`, and `58f9a6a`; the GPT-6 Astra/high frozen review accepted F1-F6 as **PASS**. This is consumer-contract acceptance, not a change in Z-Depth ownership or a dependency on either A-Frame repository.

Confidence: **high** for current Git/source/test state; **medium** for historical-session outcome classification where only repository evidence survives; **low/not asserted** for any uninspected external, credential, hosted, or remote state.

## Provenance Timeline

| Date | Evidence | Classification | Confidence |
| --- | --- | --- | --- |
| 2026-08-11 | `0669728` / initial safe backup | original reachable baseline; still `origin/main` | high |
| 2026-08-15 | archived task records “Add CSS depth property” and “Prepare z-depth-css for GitHub” | early project/session context; task outcomes are not asserted from listing metadata | medium |
| 2026-09-02 | `5fe9cda` through `8172ebf`, retained by `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` | historical product/verification line | high |
| 2026-09-09 | `3b792c7` lifecycle onboarding; replay `d617a96` | lifecycle classification and recovery preparation | high |
| 2026-09-09 | `9735ceb` through `29f3853`, then `36581dae` | recovery replay and Phase 01 evidence | high |
| 2026-09-09 | `5220f85` | Phase 02 fresh local-verification evidence | high |
| 2026-09-10 | `920ba7c`, `4ec2752`, and earlier closeout task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` | documentation/provenance/session closeout artifacts; readable formal-goal receipt absent | high for commit/report facts; medium for closeout-process classification |
| 2026-09-10 | current non-backdating ratification | formal goal activated before documentation edits; evidence-gap and formatting correction only | high |
| 2026-09-11 | completed task `01a0905b-5123-7a91-9334-4788a1d02670`, `14e3b92`, and `2ee3a30` | verified Phase 03 producer contract and its evidence record for A-Frame Bootstrap consumption requirements; adoption not yet claimed at this producer checkpoint | high |
| 2026-09-11 | A-Frame Bootstrap adoption commits `ffa255d`, `2cc9673`, and `58f9a6a`; frozen review task `01a09073-eb3a-7013-8f53-603a5ca752a4` | downstream consumer adoption completed in the owning repository; GPT-6 Astra/high accepted frozen findings F1-F6 as PASS | high |
| 2026-09-11 | F5 remediation commit `6bdbeb818bebf9b7d9f0b76c41cf05f193ffb414` | producer demo keeps preset/interaction state authoritative and refreshes model, JSON, events, and inline variables on hover/focus/preset/reset transitions; this is accepted within frozen F1-F6 PASS | high |

The recovery evidence establishes that, at the 2026-09-09 recovery checkpoint, the replayed product line was byte-equivalent to the preserved `8172ebf` snapshot before lifecycle documentation was added. That historical equivalence is not a current product/test diff claim; later Phase 03 and F5 remediation commits intentionally changed bridge, demo, package, and test surfaces. The safety branch `safety/z-depth-saved-dirty-20260909` and stash `16a3883` preserve the partial saved-checkout provenance; neither is a disposal candidate in this closeout.

## Current Source and Verification Evidence

At Phase 03 start, `HEAD` was `1365a7848d1a911a2f2ce2861859678f03cf04eb` (“Ratify Z-Depth closeout evidence limits”), also reachable from local `main`; the checkout was detached in this worktree and clean before Phase 03 branching. `origin/main` remains `0669728`; this observation does not authorize a push or imply a remote decision.

The later closeout commits `920ba7c` and `4ec2752` are retained documentation evidence. Their associated task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` has a final report, but no readable goal-tool activation/completion receipt; no formal-goal completion is asserted retroactively. The current ratification is a separate formal-goal record and cannot repair the historical absence.

Phase 02 fresh local commands on 2026-09-10:

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

Phase 03 fresh local commands recorded by completed task `01a0905b-5123-7a91-9334-4788a1d02670`:

```text
npm test       -> 13 passed, 0 failed
npm run verify -> 13 passed, 0 failed
npm run validate -> 6 passed, 0 failed
git diff --check -> 0 whitespace errors
gitleaks detect --redact --source . -> no leaks found
```

The product boundary is `14e3b9274e14e5706016ac767efe13155b9aaa21` (`depth-sol/0.3` producer contract); `2ee3a3064d26316cdf973ab51abcfd89a5d7db1a` records its lifecycle/evidence closeout. The Phase 03 task reports its formal goal completed. Those facts do not substitute for the earlier closeout task's missing readable goal-tool receipt.

F5 remediation fresh local commands recorded by this task after `6bdbeb818bebf9b7d9f0b76c41cf05f193ffb414`:

```text
npm test       -> 14 passed, 0 failed
npm run verify -> 14 passed, 0 failed
npm run validate -> 7 passed, 0 failed
git diff --check -> 0 whitespace errors
gitleaks detect --redact --source . -> no leaks found
local static HTTP smoke -> HTTP/1.0 200 OK
```

## Phase 03 Boundary

Applicable Phase 03 surfaces:

- browser module contract
- CSS custom properties
- producer utility classes
- JSON bridge output
- deterministic bridge event payloads

Non-applicable or deferred Phase 03 surfaces:

- API service
- MCP surface
- package-registry publication
- hosting or deployment
- credentials or production infrastructure
- A-Frame Bootstrap adapter implementation

## Boundary and Review Routing

The lifecycle library routes evidence/drafting to GPT-5.6 Terra/medium. Disputed provenance, lifecycle contradictions, and final archive eligibility require GPT-6 Astra/high; xhigh is reserved only when high cannot resolve a genuine lineage conflict. No conflict requiring Astra was identified in this checkpoint.

The project retains its own brand. A-Frame Bootstrap and A-Frame Reader are documented downstream-consumer contexts, not code sources, dependencies, or project identities. This audit did not read or modify their worktrees.

The separate A-Frame Bootstrap adoption task `01a09064-9539-74c0-b30e-db4a23ae5bad` completed downstream consumption in its owning repository at `ffa255d`, `2cc9673`, and `58f9a6a`. The GPT-6 Astra/high frozen review in task `01a09073-eb3a-7013-8f53-603a5ca752a4` accepted F1-F6 as PASS. This evidence records the accepted consumer contract without importing A-Frame Bootstrap sessions into the Z-Depth-owned archival population.
