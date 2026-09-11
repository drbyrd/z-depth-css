# Z-Depth CSS Advisory Archive Manifest

Date: 2026-09-11
Status: **advisory only — stop before archival.**

## Scope and Non-Actions

This manifest inventories what a future authorized archive review must preserve. It does not archive tasks, sessions, branches, refs, stashes, worktrees, objects, or source. No history rewrite, push, deployment, hosting action, or product change is authorized or performed.

No Keychain, Chrome Safe Storage, saved browser profile, cookie, token, credential, external-auth, or hosting evidence is included or required.

## Retain

| Item | Identifier / location | Reason | Archive action now |
| --- | --- | --- | --- |
| Phase 02 verified baseline | `5220f853db61e336b4c8a0d8759cf9fe2a218347` | accepted Phase 02 product-verification baseline | retain; no action |
| Phase 03 producer contract | `14e3b9274e14e5706016ac767efe13155b9aaa21` | `depth-sol/0.3` producer contract for CSS variables, utility classes, JSON, and deterministic layer/hover/focus/selection/motion bridge events | retain; no action |
| Phase 03 producer evidence | `2ee3a3064d26316cdf973ab51abcfd89a5d7db1a` | lifecycle/evidence closeout for completed task `01a0905b-5123-7a91-9334-4788a1d02670` | retain; no action |
| Historical snapshot | `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` -> `8172ebf` | canonical historical product provenance | retain; no action |
| Current snapshot | `refs/codex/snapshots/78b3517ff28a7ce7c8afb5281414fdb77de9c297` -> `5220f85` | current checkpoint source evidence | retain; no action |
| Recovery line | `machi/z-depth-phase01-recovery` -> `5220f85` | recovery chronology and Phase 01/02 evidence | retain; no action |
| Phase 03 producer line | `machi/z-depth-phase03-producer` -> `2ee3a30` | Phase 03 producer contract and evidence lineage | retain; no action |
| Onboarding line | `machi/z-depth-lifecycle-onboarding` -> `3b792c7` | original onboarding boundary | retain; no action |
| Safety branch | `safety/z-depth-saved-dirty-20260909` -> `5fe9cda` | partial saved-checkout provenance | retain; no action |
| Stash | `refs/stash` -> `16a3883` | safety checkpoint for the dirty saved checkout | retain; no action |
| Turn-diff refs | `refs/codex/turn-diffs/*` -> `817f024` | task checkpoint provenance | retain; no action |
| Archived task records | IDs in `session-ledger.md` | early project source context | retain; no action |
| Closeout, architecture, and controller context | earlier closeout task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` (final report; `920ba7c`/`4ec2752`; no readable goal receipt), Z-Depth Closeout Ratification `01a08dc9-debb-7831-bb74-6269518a0d8b`, this documentation closeout `01a0906c-b85e-7981-ae9c-db8759361f01`, Portfolio Final Archive Eligibility review `01a08db2-671f-7791-9b79-3a65de99b507`, and Portfolio Boss controller `01a0579d-11ee-7881-b448-5436668e007e` | current review lineage and retained earlier goal-receipt qualification | retain; no action |
| Phase 03 and downstream-consumer tasks | completed Phase 03 task `01a0905b-5123-7a91-9334-4788a1d02670`; active A-Frame Bootstrap adoption task `01a09064-9539-74c0-b30e-db4a23ae5bad` | producer evidence is complete; consumer adoption remains separately active and unproven here | retain and leave unarchived; no action |
| Unreachable objects | reported by `git fsck --no-reflogs --unreachable` | possible recovery material | retain; do not prune or collect |

## Eligibility Gate

Archive execution is **not eligible** at this checkpoint. A separate GPT-6 Astra/high review must first resolve final archive eligibility, lifecycle consistency, provenance, and documentation. GPT-6 Astra/xhigh is allowed only if high cannot resolve conflicting lineages.

The review must preserve the explicit lifecycle result: Z-Depth CSS is through Phase 03 as a verified producer checkpoint. The real downstream consumer is A-Frame Bootstrap, but consumption proof is still being performed in a separate active task. Do not invent a consumer fixture, treat A-Frame Bootstrap or A-Frame Reader as a dependency, claim downstream adoption, or claim architecture completion before the separate GPT-6 Astra/high architecture delta.
