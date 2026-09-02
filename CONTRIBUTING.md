# Contributing

This is a small concept project, so contributions should keep the repo easy to understand.

## What Fits Well

- clearer wording
- tighter documentation
- better visual tuning
- safer or cleaner bridge calculations
- additional examples that strengthen the same core idea
- small runtime experiments that stay aligned with the current scope

## What Does Not Fit Well

- turning the repo into a framework
- adding a build tool without a strong reason
- adding package boilerplate for its own sake
- making `aframe-bootstrap` a dependency
- presenting the current semantics as a production-ready standard

## Working Style

Prefer:

- flat files
- direct explanations
- modest scope
- readable code over clever abstractions

## Local Checks

Before proposing a change, verify the static demo still behaves as expected.

Recommended checks:

- serve the repo with `python3 -m http.server 4173`
- load `http://127.0.0.1:4173/`
- move every control and confirm the visible surface and snippets update
- run `gitleaks detect --redact --source .` if gitleaks is available
- run `npm test`
- run `npm run verify` before committing behavior changes
- confirm `git status --short --branch` contains only intentional changes

## Documentation Expectations

When changing behavior, update the docs that explain it.

- Update `README.md` for project-level changes.
- Update `AUTHORING.md` for semantic contract changes.
- Update `bridge-spec.md` for bridge mapping or API changes.
- Update `ARCHITECTURE.md` for data flow or file responsibility changes.
- Update `SECURITY.md` if repository hygiene expectations change.

## Before Changing Direction

If a change would alter the project’s role, preserve this boundary:

- `depth-sol` explores browser-safe spatial semantics
- `aframe-bootstrap` explores scene-native spatial UI

That distinction is core to the project.
