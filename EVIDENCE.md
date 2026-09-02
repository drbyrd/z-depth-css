# Verification Evidence

Date: 2026-09-02

## Scope Checked Before Product Edits

- Read the full local `depth-sol` source and documentation.
- Reviewed the uncommitted baseline diff and preserved it in commit `5fe9cda`.
- Loaded the baseline local demo at `http://127.0.0.1:4173/`.
- Inspected sibling repositories read-only:
  - `/Users/byrd/projects/AI Inbox/Projects/aframe-bootstrap`
  - `/Users/byrd/projects/AI Inbox/Projects/aframe-reader`

## Commit Boundaries

- `5fe9cda` - Document depth-sol baseline contract
- `0bf237e` - Add versioned depth-sol bridge API
- `a4a4235` - Build consumer depth-sol playground
- `8a9fa8b` - Document sibling bridge integration
- `38f9394` - Add depth-sol verification harness
- `3df84fb` - Fix responsive playground constraints

## Automated Verification

Command:

```sh
npm run verify
```

Result:

- 11 tests passed
- 0 failures
- bridge math, parser helpers, normalizers, CSS custom properties, JSON output, A-Frame-shaped output, static page structure, public copy guard, responsive hooks, accessibility hooks, and documentation alignment covered

Command:

```sh
gitleaks detect --redact --source .
```

Result:

- 6 commits scanned
- no leaks found

## Browser Smoke

Local URL:

```text
http://127.0.0.1:4173/
```

Checked in the local browser:

- page title: `depth-sol CSS Kit`
- primary nav: Contract, Playground, Examples, Bridge, Integrate
- output tabs: Source, CSS vars, JSON, A-Frame
- preset switch to Reader pane updates the surface title to `Archived chapter panel`
- Reader pane A-Frame output uses `a-ui-panel`
- A-Frame output includes `data-depth-sol-version="depth-sol/0.2"`
- clearing authoring text shows the empty state and hides the surface
- malformed authoring text shows the parse error
- reset restores the Product card preset and visible surface
- console warnings/errors: none

## Responsive and Input Checks

Browser viewport checks:

- `1280x900`: no horizontal overflow; surface visible at `304x245`
- `390x844`: no horizontal overflow; surface visible at `304x245`
- keyboard tabbing reaches the header navigation
- `:focus-visible` styles are present
- reduced-motion media query is present

## Network Hygiene

Final local server request check:

- `GET /` returned 200
- `GET /styles.css` returned 304
- `GET /script.js` returned 304
- `GET /bridge.js` returned 304
- `GET /social-preview.svg` returned 304
- favicon is declared as `social-preview.svg`
- no final 404 requests observed

## Static Validation Path

This project remains static and dependency-free. There is no bundler or deployment step. The production-like validation path is:

```sh
npm run verify
python3 -m http.server 4173
```

Then load:

```text
http://127.0.0.1:4173/
```
