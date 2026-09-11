# Z-Depth CSS Advisory Archive Manifest

Date: 2026-09-10
Status: **advisory only — stop before archival.**

## Scope and Non-Actions

This manifest inventories what a future authorized archive review must preserve. It does not archive tasks, sessions, branches, refs, stashes, worktrees, objects, or source. No history rewrite, push, deployment, hosting action, or product change is authorized or performed.

No Keychain, Chrome Safe Storage, saved browser profile, cookie, token, credential, external-auth, or hosting evidence is included or required.

## Retain

| Item | Identifier / location | Reason | Archive action now |
| --- | --- | --- | --- |
| Current verified baseline | `5220f853db61e336b4c8a0d8759cf9fe2a218347` | accepted Phase 02 product-verification baseline; later `920ba7c`/`4ec2752` on local `main` are documentation-only | retain; no action |
| Historical snapshot | `refs/codex/snapshots/588607635cbd771990948966721589d194ab7fb7` -> `8172ebf` | canonical historical product provenance | retain; no action |
| Current snapshot | `refs/codex/snapshots/78b3517ff28a7ce7c8afb5281414fdb77de9c297` -> `5220f85` | current checkpoint source evidence | retain; no action |
| Recovery line | `machi/z-depth-phase01-recovery` -> `5220f85` | recovery chronology and Phase 01/02 evidence | retain; no action |
| Onboarding line | `machi/z-depth-lifecycle-onboarding` -> `3b792c7` | original onboarding boundary | retain; no action |
| Safety branch | `safety/z-depth-saved-dirty-20260909` -> `5fe9cda` | partial saved-checkout provenance | retain; no action |
| Stash | `refs/stash` -> `16a3883` | safety checkpoint for the dirty saved checkout | retain; no action |
| Turn-diff refs | `refs/codex/turn-diffs/*` -> `817f024` | task checkpoint provenance | retain; no action |
| Archived task records | IDs in `session-ledger.md` | early project source context | retain; no action |
| Closeout and ratification context | earlier closeout task `01a08dac-3ae4-76a1-93e4-12e693f7beeb` (final report; `920ba7c`/`4ec2752`; no readable goal receipt), this separate ratification, and Portfolio Boss source context | current review lineage and retained evidence gap | retain; no action |
| Unreachable objects | reported by `git fsck --no-reflogs --unreachable` | possible recovery material | retain; do not prune or collect |

## Eligibility Gate

Archive execution is **not eligible** at this checkpoint. A separate GPT-6 Astra/high review must first resolve final archive eligibility, lifecycle consistency, provenance, and documentation. GPT-6 Astra/xhigh is allowed only if high cannot resolve conflicting lineages.

The review must preserve the explicit lifecycle result: Z-Depth CSS is through Phase 02, and Phase 03 stays gated on a real downstream consumer requirement. Do not invent a consumer fixture, treat A-Frame Bootstrap or A-Frame Reader as a dependency, or claim architecture completion.
