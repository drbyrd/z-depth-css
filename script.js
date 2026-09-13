import {
  applyDepthSolCssVars,
  createBridgeModel,
  formatAframeBridge,
  formatBridgeJson,
  formatCssFallback,
  formatSourceContract,
  getDepthSolUtilityClasses,
  parseDepthDeclaration,
} from "./bridge.js";

const root = document.documentElement;
const controls = document.getElementById("controls");
const preset = document.getElementById("preset");
const statusMessage = document.getElementById("status-message");
const authoringInput = document.getElementById("authoring-input");
const demoSol = document.getElementById("demo-sol");
const demoSurface = document.getElementById("demo-surface");
const emptyState = document.getElementById("empty-state");
const resetButton = document.getElementById("reset-button");
const clearButton = document.getElementById("clear-button");
const outputs = {
  source: document.getElementById("source-output"),
  css: document.getElementById("css-output"),
  json: document.getElementById("json-output"),
  aframe: document.getElementById("aframe-output"),
};

const fields = {
  size: {
    input: document.getElementById("size"),
    output: document.getElementById("size-value"),
    format: (value) => `${value}px`,
  },
  depth: {
    input: document.getElementById("depth"),
    output: document.getElementById("depth-value"),
    format: (value) => `${value}px`,
  },
  lightX: {
    input: document.getElementById("light-x"),
    output: document.getElementById("light-x-value"),
    format: (value) => `${value}`,
  },
  lightY: {
    input: document.getElementById("light-y"),
    output: document.getElementById("light-y-value"),
    format: (value) => `${value}`,
  },
  lightZ: {
    input: document.getElementById("light-z"),
    output: document.getElementById("light-z-value"),
    format: (value) => `${value}`,
  },
  lightSize: {
    input: document.getElementById("light-size"),
    output: document.getElementById("light-size-value"),
    format: (value) => `${value}px`,
  },
  hue: {
    input: document.getElementById("hue"),
    output: document.getElementById("hue-value"),
    format: (value) => `${value}`,
  },
};

const presets = {
  product: {
    label: "Product card",
    title: "Glass controller dock",
    copy:
      "A normal DOM card with depth-aware lighting. It remains readable, selectable, and touch friendly before any spatial runtime joins in.",
    values: { size: 304, depth: 76, lightX: 38, lightY: -42, lightZ: 128, lightSize: 64, hue: 196 },
    surface: { aspectRatio: 1.24, variant: "card", layer: 1 },
  },
  reader: {
    label: "Reader pane",
    title: "Long-form reader panel",
    copy:
      "A reading surface can use depth as quiet hierarchy in HTML and later become a comfortable panel in a VR reader.",
    values: { size: 360, depth: 44, lightX: -28, lightY: -64, lightZ: 148, lightSize: 72, hue: 48 },
    surface: { aspectRatio: 1.7, variant: "reader", layer: 0 },
  },
  dashboard: {
    label: "Dashboard tile",
    title: "Signal summary",
    copy:
      "Status tiles keep their normal scan pattern while the depth value gives the bridge a stable elevation cue.",
    values: { size: 276, depth: 116, lightX: 74, lightY: -28, lightZ: 104, lightSize: 54, hue: 154 },
    surface: { aspectRatio: 1.08, variant: "metric", layer: 2, selected: true, motion: "settled" },
  },
  control: {
    label: "A-Frame control",
    title: "Bootstrap action surface",
    copy:
      "A semantic control can pass normalized width, height, depth, variant, and light hints into existing A-Frame primitives.",
    values: { size: 252, depth: 92, lightX: -58, lightY: 32, lightZ: 118, lightSize: 48, hue: 278 },
    surface: { aspectRatio: 1.38, variant: "control", layer: 3, focused: true, motion: "active" },
  },
};

const DEFAULT_INTERACTION_STATE = Object.freeze({
  hovered: false,
  focused: false,
  selected: false,
  motion: "idle",
});

let demoInteractionState = { ...DEFAULT_INTERACTION_STATE };

function interactionStateFromPreset(surface = {}) {
  return {
    hovered: false,
    focused: Boolean(surface.focused),
    selected: Boolean(surface.selected),
    motion: surface.motion || DEFAULT_INTERACTION_STATE.motion,
  };
}

function resetDemoInteractionState(surface) {
  demoInteractionState = interactionStateFromPreset(surface);
}

function setDemoInteractionState(nextState) {
  const next = { ...demoInteractionState, ...nextState };
  const changed = Object.entries(next).some(([name, value]) => demoInteractionState[name] !== value);

  if (changed) {
    demoInteractionState = next;
    updatePlayground();
  }
}

function currentValues() {
  return Object.fromEntries(Object.entries(fields).map(([name, field]) => [name, Number(field.input.value)]));
}

function setValues(values) {
  Object.entries(values).forEach(([name, value]) => {
    if (fields[name]) {
      fields[name].input.value = value;
    }
  });
}

function syncOutputs(values) {
  Object.entries(fields).forEach(([name, field]) => {
    field.output.value = field.format(values[name]);
  });
}

function createCurrentModel() {
  const values = currentValues();
  const selectedPreset = presets[preset.value] || presets.product;

  return createBridgeModel({
    id: "demo-surface",
    label: selectedPreset.label,
    widthPx: values.size,
    aspectRatio: selectedPreset.surface.aspectRatio,
    depthPx: values.depth,
    hue: values.hue,
    variant: selectedPreset.surface.variant,
    layer: selectedPreset.surface.layer,
    hovered: demoInteractionState.hovered,
    focused: demoInteractionState.focused,
    selected: demoInteractionState.selected,
    motion: demoInteractionState.motion,
    sol: {
      x: values.lightX,
      y: values.lightY,
      z: values.lightZ,
      size: values.lightSize,
      color: `hsl(${values.hue} 90% 64%)`,
      axes: "xyz",
    },
  });
}

function applyModel(model, { updateAuthoring = true } = {}) {
  const values = currentValues();
  const selectedPreset = presets[preset.value] || presets.product;

  syncOutputs(values);
  applyDepthSolCssVars(root, model);
  applyDepthSolCssVars(demoSurface, model);
  demoSurface.className = `depth-surface ${getDepthSolUtilityClasses(model).join(" ")}`;

  demoSol.setAttribute("x", values.lightX);
  demoSol.setAttribute("y", values.lightY);
  demoSol.setAttribute("z", values.lightZ);
  demoSol.setAttribute("size", values.lightSize);
  demoSol.setAttribute("color", `hsl(${values.hue} 90% 64%)`);
  demoSurface.setAttribute("depth", `${values.depth}px`);
  demoSurface.style.width = `${values.size}px`;
  demoSurface.style.aspectRatio = `${selectedPreset.surface.aspectRatio}`;
  demoSurface.dataset.variant = selectedPreset.surface.variant;
  demoSurface.dataset.depthSolLayer = `${model.source.surface.layer}`;
  demoSurface.dataset.depthSolMotion = model.source.surface.motion;
  demoSurface.dataset.depthSolSelected = model.source.surface.selected ? "true" : "false";
  demoSurface.setAttribute("aria-selected", model.source.surface.selected ? "true" : "false");

  document.getElementById("surface-label").textContent = selectedPreset.label;
  document.getElementById("surface-title").textContent = selectedPreset.title;
  document.getElementById("surface-copy").textContent = selectedPreset.copy;

  outputs.source.textContent = formatSourceContract(model);
  outputs.css.textContent = formatCssFallback(model);
  outputs.json.textContent = formatBridgeJson(model);
  outputs.aframe.textContent = formatAframeBridge(model);

  if (updateAuthoring) {
    authoringInput.value = formatSourceContract(model);
  }

  emptyState.hidden = true;
  demoSurface.hidden = false;
  statusMessage.textContent = "Ready.";
  statusMessage.classList.remove("is-error");
}

function updatePlayground(options) {
  applyModel(createCurrentModel(), options);
}

function loadPreset(name) {
  const nextPreset = presets[name] || presets.product;
  preset.value = name in presets ? name : "product";
  setValues(nextPreset.values);
  resetDemoInteractionState(nextPreset.surface);
  updatePlayground();
}

function clearAuthoring() {
  authoringInput.value = "";
  demoSurface.hidden = true;
  emptyState.hidden = false;
  statusMessage.textContent = "No contract loaded. Pick an example or reset to continue.";
  statusMessage.classList.remove("is-error");
}

function applyAuthoringText() {
  const value = authoringInput.value.trim();

  if (!value) {
    clearAuthoring();
    return;
  }

  const solMatch = value.match(/<sol\s+([^>]+)>/i);
  const cssMatch = value.match(/\{([^}]+)\}/);

  if (!solMatch || !cssMatch) {
    statusMessage.textContent = "The authoring text needs one <sol> element and one surface rule.";
    statusMessage.classList.add("is-error");
    return;
  }

  const attrs = Object.fromEntries(
    Array.from(solMatch[1].matchAll(/([a-z-]+)="([^"]*)"/gi)).map(([, name, attrValue]) => [name, attrValue]),
  );
  const declaration = parseDepthDeclaration(cssMatch[1]);
  const hue = Number((attrs.color || "").match(/hsl\((\d+)/i)?.[1] || fields.hue.input.value);

  setValues({
    size: declaration.widthPx,
    depth: declaration.depthPx,
    lightX: Number(attrs.x || fields.lightX.input.value),
    lightY: Number(attrs.y || fields.lightY.input.value),
    lightZ: Number(attrs.z || fields.lightZ.input.value),
    lightSize: Number(attrs.size || fields.lightSize.input.value),
    hue,
  });

  updatePlayground({ updateAuthoring: false });
}

controls.addEventListener("input", (event) => {
  if (event.target === authoringInput) {
    applyAuthoringText();
    return;
  }

  updatePlayground();
});

preset.addEventListener("change", () => loadPreset(preset.value));
resetButton.addEventListener("click", () => loadPreset("product"));
clearButton.addEventListener("click", clearAuthoring);

demoSurface.addEventListener("pointerenter", () => setDemoInteractionState({ hovered: true }));
demoSurface.addEventListener("pointerleave", () => setDemoInteractionState({ hovered: false }));
demoSurface.addEventListener("mouseenter", () => setDemoInteractionState({ hovered: true }));
demoSurface.addEventListener("mouseleave", () => setDemoInteractionState({ hovered: false }));
demoSurface.addEventListener("focusin", () => setDemoInteractionState({ focused: true }));
demoSurface.addEventListener("focusout", () => setDemoInteractionState({ focused: false }));

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => loadPreset(button.dataset.preset));
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;

    document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      const isActive = panel.dataset.panel === tab;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    const text = target?.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      statusMessage.textContent = `Copied ${button.dataset.copy.replace("-output", "")}.`;
      statusMessage.classList.remove("is-error");
    } catch {
      statusMessage.textContent = "Copy failed. Select the snippet text and copy it manually.";
      statusMessage.classList.add("is-error");
    }
  });
});

loadPreset("product");
