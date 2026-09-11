import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
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
    "getDepthSolUtilityClasses",
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

  assert.match(files.html, /depth-sol\/0\.3/);
  assert.match(files.bridgeSpec, /1000px = 1m/);
  assert.match(files.bridgeSpec, /createBridgeModels/);
  assert.match(files.bridgeSpec, /createDepthSolBridgeEvents/);
  assert.match(files.bridgeSpec, /A-Frame Reader/);
  assert.match(files.architecture, /package.json/);
});

test("ships the producer state contract without downstream dependencies", () => {
  for (const cssToken of [
    "--depth-sol-layer",
    "--depth-sol-z-index",
    "--depth-sol-depth-offset",
    "--depth-sol-hover",
    "--depth-sol-focus",
    "--depth-sol-selected",
    "--depth-sol-motion",
  ]) {
    assert.match(files.css, new RegExp(cssToken));
    assert.match(files.bridgeSpec, new RegExp(cssToken));
  }

  for (const className of ["z-depth-surface", "z-depth-layer-1", "is-depth-focused", "is-depth-selected"]) {
    assert.match(files.css, new RegExp(className));
  }

  assert.match(files.html, /data-depth-sol-layer/);
  assert.match(files.script, /depthSolLayer/);
  assert.match(files.bridgeSpec, /depth-sol:selection/);
  assert.match(files.bridgeSpec, /Shipping an A-Frame Bootstrap adapter/);
});

function createElement({ id = "", value = "", dataset = {} } = {}) {
  const listeners = new Map();
  const attributes = new Map();
  const styleProperties = {};
  const classes = new Set();

  return {
    id,
    value,
    dataset: { ...dataset },
    hidden: false,
    className: "",
    textContent: "",
    classList: {
      add(name) {
        classes.add(name);
      },
      remove(name) {
        classes.delete(name);
      },
      toggle(name, force) {
        const shouldAdd = force ?? !classes.has(name);
        if (shouldAdd) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
        return shouldAdd;
      },
      contains(name) {
        return classes.has(name);
      },
    },
    style: {
      width: "",
      aspectRatio: "",
      setProperty(name, propertyValue) {
        styleProperties[name] = propertyValue;
      },
      getPropertyValue(name) {
        return styleProperties[name] || "";
      },
    },
    addEventListener(type, handler) {
      const handlers = listeners.get(type) || [];
      handlers.push(handler);
      listeners.set(type, handlers);
    },
    dispatch(type, event = {}) {
      for (const handler of listeners.get(type) || []) {
        handler({ target: this, ...event });
      }
    },
    setAttribute(name, attributeValue) {
      attributes.set(name, String(attributeValue));
    },
    getAttribute(name) {
      return attributes.get(name) || null;
    },
    matches() {
      return false;
    },
    styleProperties,
  };
}

function createPlaygroundDocument() {
  const ids = new Map();
  const add = (id, element = createElement({ id })) => {
    ids.set(id, element);
    return element;
  };

  add("controls");
  add("preset", createElement({ id: "preset", value: "product" }));
  add("status-message");
  add("authoring-input");
  add("demo-sol");
  add("demo-surface");
  add("empty-state");
  add("reset-button");
  add("clear-button");
  add("source-output");
  add("css-output");
  add("json-output");
  add("aframe-output");
  add("surface-label");
  add("surface-title");
  add("surface-copy");

  for (const id of ["size", "depth", "light-x", "light-y", "light-z", "light-size", "hue"]) {
    add(id);
  }

  ids.get("size").value = "304";
  ids.get("depth").value = "76";
  ids.get("light-x").value = "38";
  ids.get("light-y").value = "-42";
  ids.get("light-z").value = "128";
  ids.get("light-size").value = "64";
  ids.get("hue").value = "196";

  for (const id of ["size-value", "depth-value", "light-x-value", "light-y-value", "light-z-value", "light-size-value", "hue-value"]) {
    add(id);
  }

  return {
    documentElement: createElement({ id: "root" }),
    getElementById(id) {
      return ids.get(id) || null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-preset]") {
        return [
          createElement({ dataset: { preset: "product" } }),
          createElement({ dataset: { preset: "dashboard" } }),
        ];
      }

      if (selector === "[data-tab]" || selector === "[data-panel]" || selector === "[data-copy]") {
        return [];
      }

      return [];
    },
    ids,
  };
}

test("keeps demo interaction state authoritative across preset, reset, hover, and focus transitions", async () => {
  const priorDocument = globalThis.document;
  const document = createPlaygroundDocument();
  globalThis.document = document;

  try {
    const moduleUrl = `${pathToFileURL("script.js").href}?static-smoke=${Date.now()}`;
    await import(moduleUrl);

    const preset = document.ids.get("preset");
    const surface = document.ids.get("demo-surface");
    const reset = document.ids.get("reset-button");
    const json = document.ids.get("json-output");

    preset.value = "dashboard";
    preset.dispatch("change");
    assert.equal(surface.getAttribute("aria-selected"), "true");
    assert.equal(surface.style.getPropertyValue("--depth-sol-selected"), "1");
    assert.match(json.textContent, /"selected": true/);

    reset.dispatch("click");
    assert.equal(preset.value, "product");
    assert.equal(surface.getAttribute("aria-selected"), "false");
    assert.equal(surface.style.getPropertyValue("--depth-sol-selected"), "0");
    assert.doesNotMatch(surface.className, /is-depth-selected/);
    assert.match(json.textContent, /"selected": false/);

    surface.dispatch("pointerenter");
    assert.equal(surface.style.getPropertyValue("--depth-sol-hover"), "1");
    assert.match(json.textContent, /"hovered": true/);

    surface.dispatch("focusin");
    assert.equal(surface.style.getPropertyValue("--depth-sol-focus"), "1");
    assert.match(json.textContent, /"focused": true/);

    surface.dispatch("pointerleave");
    surface.dispatch("focusout");
    assert.equal(surface.style.getPropertyValue("--depth-sol-hover"), "0");
    assert.equal(surface.style.getPropertyValue("--depth-sol-focus"), "0");
    assert.match(json.textContent, /"hovered": false/);
    assert.match(json.textContent, /"focused": false/);
  } finally {
    globalThis.document = priorDocument;
  }
});
