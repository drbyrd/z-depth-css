import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = {
  html: await readFile("index.html", "utf8"),
  css: await readFile("styles.css", "utf8"),
  script: await readFile("script.js", "utf8"),
  readme: await readFile("README.md", "utf8"),
  authoring: await readFile("AUTHORING.md", "utf8"),
  bridgeSpec: await readFile("bridge-spec.md", "utf8"),
  architecture: await readFile("ARCHITECTURE.md", "utf8"),
};

test("ships the expected consumer documentation surface", () => {
  for (const href of ["#contract", "#playground", "#examples", "#bridge", "#integrate"]) {
    assert.match(files.html, new RegExp(`href="${href}"`));
  }

  for (const label of ["Product card", "Reader pane", "Dashboard tile", "A-Frame control"]) {
    assert.match(files.html, new RegExp(label));
  }

  assert.match(files.html, /id="authoring-input"/);
  assert.match(files.html, /id="empty-state"/);
  assert.match(files.html, /id="status-message" role="status"/);
  assert.match(files.html, /data-copy="source-output"/);
  assert.match(files.html, /data-tab="aframe"/);
});

test("keeps private process language out of visible page copy", () => {
  const visibleCopy = files.html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  const blocked = ["GPT", "Codex", "system prompt", "goal", "task instructions", "internal implementation chatter"];

  for (const word of blocked) {
    assert.doesNotMatch(visibleCopy, new RegExp(word, "i"));
  }
});

test("includes accessible and responsive interaction affordances", () => {
  assert.match(files.html, /class="skip-link"/);
  assert.match(files.html, /aria-label="Primary"/);
  assert.match(files.html, /aria-label="Depth and sol controls"/);
  assert.match(files.html, /aria-live="polite"/);
  assert.match(files.css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(files.css, /@media \(max-width: 980px\)/);
  assert.match(files.css, /@media \(max-width: 640px\)/);
  assert.match(files.css, /:focus-visible/);
});

test("wires playground states and outputs to the bridge module", () => {
  for (const exportName of [
    "applyDepthSolCssVars",
    "createBridgeModel",
    "formatAframeBridge",
    "formatBridgeJson",
    "formatCssFallback",
    "formatSourceContract",
    "parseDepthDeclaration",
  ]) {
    assert.match(files.script, new RegExp(exportName));
  }

  assert.match(files.script, /clearAuthoring/);
  assert.match(files.script, /Copy failed/);
  assert.match(files.script, /The authoring text needs one <sol> element/);
});

test("documents the versioned contract and sibling consumption path", () => {
  for (const content of [files.readme, files.authoring, files.bridgeSpec]) {
    assert.match(content, /depth-sol/);
    assert.match(content, /A-Frame/);
  }

  assert.match(files.bridgeSpec, /1000px = 1m/);
  assert.match(files.bridgeSpec, /createBridgeModels/);
  assert.match(files.bridgeSpec, /A-Frame Reader/);
  assert.match(files.architecture, /package.json/);
});
