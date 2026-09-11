import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTRACT_VERSION,
  applyDepthSolCssVars,
  createDepthSolBridgeEvents,
  createBridgeModel,
  createBridgeModels,
  createDepthSolContract,
  formatAframeBridge,
  formatBridgeJson,
  formatCssFallback,
  formatSourceContract,
  getDepthSolUtilityClasses,
  parseAspectRatio,
  parseCssLength,
  parseDepthDeclaration,
  parseSolElement,
  pxToMeters,
} from "../bridge.js";

test("converts CSS pixels to A-Frame-friendly meters", () => {
  assert.equal(pxToMeters(304), 0.304);
  assert.equal(pxToMeters(76), 0.076);
  assert.equal(pxToMeters("bad", 1000), 0);
});

test("parses supported CSS authoring declarations", () => {
  assert.equal(parseCssLength("304px"), 304);
  assert.equal(parseCssLength("2rem", 12), 12);
  assert.equal(parseAspectRatio("16 / 9"), 1.7778);
  assert.equal(parseAspectRatio("1.24"), 1.24);

  assert.deepEqual(parseDepthDeclaration("width: 360px; aspect-ratio: 1.7; depth: 44px;"), {
    widthPx: 360,
    aspectRatio: 1.7,
    depthPx: 44,
  });
});

test("normalizes a versioned contract with multiple surfaces", () => {
  const contract = createDepthSolContract({
    sol: { x: "12", y: "-8", z: "140", size: "72", color: "hsl(48 90% 64%)", axes: "xz!" },
    surfaces: [
      { id: "reader", label: "Reader pane", widthPx: 360, aspectRatio: 1.7, depthPx: 44, hue: 48, variant: "reader" },
      {
        id: "metric",
        label: "Metric",
        widthPx: 276,
        aspectRatio: 1.08,
        depthPx: 116,
        hue: 154,
        variant: "metric",
        layer: 2,
        selected: true,
        motion: "settled",
      },
    ],
  });
  const models = createBridgeModels(contract);

  assert.equal(contract.version, CONTRACT_VERSION);
  assert.equal(contract.sol.axes, "xz");
  assert.equal(models.length, 2);
  assert.equal(models[0].runtime.entityName, "a-ui-panel");
  assert.equal(models[1].runtime.box.depth, 0.116);
  assert.equal(models[1].runtime.interaction.layer, 2);
  assert.equal(models[1].browser.interaction.selected, true);
});

test("creates deterministic browser and A-Frame bridge output", () => {
  const model = createBridgeModel({
    id: "demo-surface",
    label: "Product card",
    widthPx: 304,
    aspectRatio: 1.24,
    depthPx: 76,
    hue: 196,
    sol: { x: 38, y: -42, z: 128, size: 64, color: "hsl(196 90% 64%)", axes: "xyz" },
  });

  assert.equal(model.browser.castX, -18);
  assert.equal(model.browser.castY, 20);
  assert.equal(model.runtime.box.width, 0.304);
  assert.equal(model.runtime.box.position.z, 0.038);
  assert.match(formatSourceContract(model), /data-depth-sol-surface/);
  assert.match(formatCssFallback(model), /--depth-sol-depth: 76px/);
  assert.match(formatAframeBridge(model), /data-depth-sol-version="depth-sol\/0.3"/);
  assert.match(formatBridgeJson(model), /"version": "depth-sol\/0.3"/);
});

test("parses sol-like elements without depending on the DOM implementation", () => {
  const element = {
    getAttribute(name) {
      return {
        x: "8",
        y: "-10",
        z: "90",
        size: "48",
        color: "hsl(278 90% 64%)",
        axes: "xy",
      }[name];
    },
  };

  assert.deepEqual(parseSolElement(element), {
    x: 8,
    y: -10,
    z: 90,
    size: 48,
    color: "hsl(278 90% 64%)",
    axes: "xy",
  });
});

test("applies CSS custom properties to any style-bearing target", () => {
  const properties = {};
  const target = {
    style: {
      setProperty(name, value) {
        properties[name] = value;
      },
    },
  };
  const model = createBridgeModel({
    widthPx: 252,
    aspectRatio: 1.38,
    depthPx: 92,
    hue: 278,
    sol: { x: -58, y: 32, z: 118, size: 48, color: "hsl(278 90% 64%)", axes: "xyz" },
  });

  assert.equal(applyDepthSolCssVars(target, model)["--depth-sol-width"], "252px");
  assert.equal(properties["--depth-sol-depth"], "92px");
  assert.equal(properties["--depth-sol-layer"], "0");
  assert.equal(properties["--depth-sol-motion"], "idle");
});

test("emits a deterministic producer contract for layer and interaction state", () => {
  const model = createBridgeModel({
    id: "cta",
    label: "CTA",
    widthPx: 240,
    aspectRatio: 1.5,
    depthPx: 60,
    hue: 154,
    layer: 3,
    hovered: true,
    focused: true,
    selected: true,
    motion: "active",
    sol: { x: 20, y: -12, z: 100, size: 56, color: "hsl(154 90% 64%)", axes: "xyz" },
  });

  assert.equal(model.source.surface.layer, 3);
  assert.deepEqual(getDepthSolUtilityClasses(model), [
    "z-depth-surface",
    "z-depth-layer-3",
    "is-depth-hovered",
    "is-depth-focused",
    "is-depth-selected",
    "is-depth-motion-active",
  ]);
  assert.deepEqual(
    createDepthSolBridgeEvents(model).map((event) => event.type),
    ["depth-sol:layer", "depth-sol:hover", "depth-sol:focus", "depth-sol:selection", "depth-sol:motion"],
  );
  assert.equal(createDepthSolBridgeEvents(model)[4].state, "active");
  assert.equal(model.runtime.interaction.zIndex, 103);
  assert.equal(model.runtime.interaction.depthOffsetPx, 134);
  assert.match(formatBridgeJson(model), /"utilityClasses"/);
  assert.match(formatBridgeJson(model), /"events"/);
});
