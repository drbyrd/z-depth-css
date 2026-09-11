# Z-Depth CSS Advisory Archive Manifest

Date: 2026-09-11
Status: **task-archive execution authorized for the documented inactive exact-basename population.**

## Scope and Non-Actions

This manifest inventories what task archival preserves. It authorizes archival only of the 12 inactive, Z-Depth-owned records named in `session-ledger.md`; it does not authorize deletion or mutation of branches, refs, stashes, worktrees, objects, source, credentials, hosting, or product behavior.

No Keychain, Chrome Safe Storage, saved browser profile, cookie, token, credential, external-auth, or hosting evidence is included or required.

## Retain

| Item | Identifier / location | Reason | Archive action now |
| --- | --- | --- | --- |
| Phase 02 verified baseline | `5220f853db61e336b4c8a0d8759cf9fe2a218347` | accepted Phase 02 product-verification baseline | retain; no action |
| Phase 03 producer contract | `14e3b9274e14e5706016ac767efe13155b9aaa21` | `depth-sol/0.3` producer contract for CSS variables, utility classes, JSON, and deterministic layer/hover/focus/selection/motion bridge events | retain; no action |
| Phase 03 producer evidence | `2ee3a3064d26316cdf973ab51abcfd89a5d7db1a` | lifecycle/evidence closeout for completed task `01a0905b-5123-7a91-9334-4788a1d02670` | retain; no action |
| F5 producer remediation | `6bdbeb818bebf9b7d9f0b76c41cf05f193ffb414` | fixes stale demo interaction state and adds focused maintained coverage for hover/focus/preset/reset transitions | retain; no action |
| Historical snapshot | `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` -> `8172ebf` | canonical historical product provenance | retain; no action |
| Current snapshot | `refs/codex/snapshots/78b3517ff28a7ce7c8afb5281414fdb77de9c297` -> `5220f85` | current checkpoint source evidence | retain; no action |
| Recovery line | `machi/z-depth-phase01-recovery` -> `5220f85` | recovery chronology and Phase 01/02 evidence | retain; no action |
| Phase 03 producer line | `machi/z-depth-phase03-producer` -> `2ee3a30` | Phase 03 producer contract and evidence lineage | retain; no action |
| Onboarding line | `machi/z-depth-lifecycle-onboarding` -> `3b792c7` | original onboarding boundary | retain; no action |
| Safety branch | `safety/z-depth-saved-dirty-20260909` -> `5fe9cda` | partial saved-checkout provenance | retain; no action |
| Stash | `refs/stash` -> `16a3883` | safety checkpoint for the dirty saved checkout | retain; no action |
| Turn-diff refs | `refs/codex/turn-diffs/*` -> `817f024` | task checkpoint provenance | retain; no action |
| Archived task records | IDs in `session-ledger.md` | early project source context | retain; no action |
| Unarchived task exceptions | this archive task `01a09262-348c-7030-a525-c0385ce54fb6`; exact named active writer `01a0907a-6611-72f2-b9f4-156cc1ddf03e` | active task execution and active writer exception | retain and leave unarchived |
| A-Frame Bootstrap adoption and frozen review | adoption task `01a09064-9539-74c0-b30e-db4a23ae5bad` at `ffa255d`, `2cc9673`, and `58f9a6a`; review task `01a09073-eb3a-7013-8f53-603a5ca752a4` | separate ownership; GPT-6 Astra/high accepted frozen F1-F6 PASS | not in Z-Depth archive population |
| Unreachable objects | reported by `git fsck --no-reflogs --unreachable` | possible recovery material | retain; do not prune or collect |

## Eligibility Gate

The authoritative read-only exact-basename inventory starts at 17 records: 14 unarchived and 3 archived. Archive the 12 inactive, Z-Depth-owned unarchived records listed in `session-ledger.md`. After execution, expected exact-basename counts are 2 unarchived and 15 archived. Re-query the same inventory before completion.

The lifecycle result remains a verified Phase 03 producer contract with accepted A-Frame Bootstrap consumption. Do not invent a consumer fixture, treat A-Frame Bootstrap or A-Frame Reader as a dependency, or change anything beyond task archive state.
