const DEFAULT_SCALE_PX_PER_METER = 1000;
const DEFAULT_SCENE_ORIGIN = Object.freeze({ x: 0, y: 1.6, z: -2.5 });
const CONTRACT_VERSION = "depth-sol/0.2";

const DEFAULT_SOL = Object.freeze({
  x: 44,
  y: -36,
  z: 116,
  size: 58,
  color: "hsl(196 90% 64%)",
  axes: "xyz",
});

const DEFAULT_SURFACE = Object.freeze({
  id: "surface",
  label: "Depth surface",
  widthPx: 252,
  aspectRatio: 1,
  depthPx: 88,
  hue: 196,
  variant: "card",
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function finiteNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function round(value, decimals = 3) {
  return Number(value.toFixed(decimals));
}

function parseHue(color, fallback = 196) {
  const match = String(color ?? "").match(/hsla?\(\s*(-?\d+(?:\.\d+)?)/i);
  return match ? finiteNumber(match[1], fallback) : fallback;
}

function normalizeAxes(value) {
  const axes = String(value || "xyz").toLowerCase().replace(/[^xyz]/g, "");
  return axes || "xyz";
}

export function pxToMeters(value, scale = DEFAULT_SCALE_PX_PER_METER) {
  return round(finiteNumber(value) / finiteNumber(scale, DEFAULT_SCALE_PX_PER_METER), 3);
}

export function parseCssLength(value, fallback = 0) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  const match = String(value ?? "").trim().match(/^(-?\d+(?:\.\d+)?)px$/i);
  return match ? finiteNumber(match[1], fallback) : fallback;
}

export function parseAspectRatio(value, fallback = 1) {
  if (typeof value === "number") {
    return value > 0 ? value : fallback;
  }

  const raw = String(value ?? "").trim();
  const slash = raw.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);

  if (slash) {
    const width = finiteNumber(slash[1], fallback);
    const height = finiteNumber(slash[2], 1);
    return height > 0 ? round(width / height, 4) : fallback;
  }

  const numeric = finiteNumber(raw, Number.NaN);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
}

export function normalizeSol(sol = {}) {
  return Object.freeze({
    x: finiteNumber(sol.x, DEFAULT_SOL.x),
    y: finiteNumber(sol.y, DEFAULT_SOL.y),
    z: finiteNumber(sol.z, DEFAULT_SOL.z),
    size: finiteNumber(sol.size, DEFAULT_SOL.size),
    color: String(sol.color || DEFAULT_SOL.color),
    axes: normalizeAxes(sol.axes),
  });
}

export function normalizeSurface(surface = {}) {
  const widthPx = finiteNumber(surface.widthPx ?? surface.width, DEFAULT_SURFACE.widthPx);
  const aspectRatio = parseAspectRatio(surface.aspectRatio, DEFAULT_SURFACE.aspectRatio);
  const depthPx = finiteNumber(surface.depthPx ?? surface.depth, DEFAULT_SURFACE.depthPx);
  const hue = finiteNumber(surface.hue, parseHue(surface.color, DEFAULT_SURFACE.hue));

  return Object.freeze({
    id: String(surface.id || DEFAULT_SURFACE.id),
    label: String(surface.label || DEFAULT_SURFACE.label),
    widthPx,
    aspectRatio,
    depthPx,
    hue,
    variant: String(surface.variant || DEFAULT_SURFACE.variant),
  });
}

export function createDepthSolContract({ version = CONTRACT_VERSION, sol = DEFAULT_SOL, surfaces = [DEFAULT_SURFACE] } = {}) {
  return Object.freeze({
    version,
    sol: normalizeSol(sol),
    surfaces: Object.freeze(surfaces.map((surface) => normalizeSurface(surface))),
  });
}

export function parseSolElement(element) {
  if (!element || typeof element.getAttribute !== "function") {
    return normalizeSol();
  }

  return normalizeSol({
    x: element.getAttribute("x"),
    y: element.getAttribute("y"),
    z: element.getAttribute("z"),
    size: element.getAttribute("size"),
    color: element.getAttribute("color"),
    axes: element.getAttribute("axes"),
  });
}

export function parseDepthDeclaration(cssText = "") {
  const getDeclaration = (name) => {
    const match = String(cssText).match(new RegExp(`${name}\\s*:\\s*([^;]+)`, "i"));
    return match ? match[1].trim() : "";
  };

  return {
    widthPx: parseCssLength(getDeclaration("width"), DEFAULT_SURFACE.widthPx),
    aspectRatio: parseAspectRatio(getDeclaration("aspect-ratio"), DEFAULT_SURFACE.aspectRatio),
    depthPx: parseCssLength(getDeclaration("depth"), DEFAULT_SURFACE.depthPx),
  };
}

export function parseDepthSolDocument(root = globalThis.document) {
  const scope = root?.querySelector ? root : globalThis.document;
  const sol = parseSolElement(scope?.querySelector?.("sol"));
  const surfaces = Array.from(scope?.querySelectorAll?.("[data-depth-sol-surface]") ?? []).map((element, index) => {
    const computedStyle = globalThis.getComputedStyle?.(element);
    const inlineDepth = element.getAttribute("depth") || element.dataset.depth || element.style?.getPropertyValue("depth");
    const widthValue = element.getAttribute("width") || element.dataset.width || element.style?.width || computedStyle?.width;
    const ratioValue =
      element.getAttribute("aspect-ratio") ||
      element.dataset.aspectRatio ||
      element.style?.aspectRatio ||
      computedStyle?.aspectRatio;

    return normalizeSurface({
      id: element.id || `surface-${index + 1}`,
      label: element.getAttribute("aria-label") || element.dataset.label || `Surface ${index + 1}`,
      widthPx: parseCssLength(widthValue, DEFAULT_SURFACE.widthPx),
      aspectRatio: parseAspectRatio(ratioValue, DEFAULT_SURFACE.aspectRatio),
      depthPx: parseCssLength(inlineDepth, parseCssLength(element.dataset.depthPx, DEFAULT_SURFACE.depthPx)),
      hue: parseHue(sol.color, DEFAULT_SURFACE.hue),
      variant: element.dataset.variant || DEFAULT_SURFACE.variant,
    });
  });

  return createDepthSolContract({
    sol,
    surfaces: surfaces.length ? surfaces : [DEFAULT_SURFACE],
  });
}

export function createBridgeModel({
  widthPx,
  aspectRatio = 1,
  depthPx,
  hue,
  sol,
  scale = DEFAULT_SCALE_PX_PER_METER,
  sceneOrigin = DEFAULT_SCENE_ORIGIN,
  id,
  label,
  variant,
}) {
  const contract = createDepthSolContract({
    sol: { ...sol, color: sol?.color || `hsl(${hue} 90% 64%)` },
    surfaces: [{ id, label, widthPx, aspectRatio, depthPx, hue, variant }],
  });

  return createBridgeModels(contract, { scale, sceneOrigin })[0];
}

export function createBridgeModels(contract, { scale = DEFAULT_SCALE_PX_PER_METER, sceneOrigin = DEFAULT_SCENE_ORIGIN } = {}) {
  const normalizedContract = createDepthSolContract(contract);

  return normalizedContract.surfaces.map((surface) => {
    const heightPx = surface.widthPx / surface.aspectRatio;
    const widthM = pxToMeters(surface.widthPx, scale);
    const heightM = pxToMeters(heightPx, scale);
    const depthM = pxToMeters(surface.depthPx, scale);
    const halfDepthM = round(depthM / 2, 3);
    const sol = normalizedContract.sol;
    const hue = surface.hue || parseHue(sol.color);

    const lightDistance = round(Math.max(sol.size / 10, 0.1), 1);
    const lightIntensity = round(clamp(0.7 + sol.z / 240, 0.7, 1.8), 2);
    const lightPosition = {
      x: round(sol.x / 100, 2),
      y: round(sol.y / 100, 2),
      z: round(sol.z / 100, 2),
    };

    return Object.freeze({
      version: normalizedContract.version,
      source: {
        sol,
        surface,
      },
      browser: {
        castX: Math.round((-sol.x * surface.depthPx) / 160),
        castY: Math.round((-sol.y * surface.depthPx) / 160),
        castBlur: Math.round(surface.depthPx * 0.42 + sol.z * 0.34),
        castSpread: Math.round(surface.depthPx * -0.16),
        ambientBlur: Math.round(surface.depthPx * 0.24 + sol.size * 0.18),
        shadowAlpha: round(clamp(0.22 + surface.depthPx / 280, 0.22, 0.7), 2),
        highlightAlpha: round(clamp(0.16 + sol.z / 420, 0.16, 0.48), 2),
      },
      runtime: {
        scale,
        sceneOrigin,
        entityName: surface.variant === "reader" ? "a-ui-panel" : surface.variant === "control" ? "a-ui-card" : "a-box",
        light: {
          type: "point",
          color: sol.color,
          intensity: lightIntensity,
          distance: lightDistance,
          decay: 1.4,
          axes: sol.axes,
          position: lightPosition,
        },
        box: {
          width: widthM,
          height: heightM,
          depth: depthM,
          position: {
            x: 0,
            y: 0,
            z: halfDepthM,
          },
          material: {
            color: `hsl(${hue} 62% 55%)`,
            roughness: 0.45,
            metalness: 0.05,
          },
          shadow: {
            cast: true,
            receive: true,
          },
        },
      },
    });
  });
}

export function getCssCustomProperties(model) {
  const { sol, surface } = model.source;
  const browser = model.browser;

  return {
    "--depth-sol-width": `${surface.widthPx}px`,
    "--depth-sol-height": `${Math.round(surface.widthPx / surface.aspectRatio)}px`,
    "--depth-sol-depth": `${surface.depthPx}px`,
    "--depth-sol-hue": `${surface.hue}`,
    "--depth-sol-light-x": `${sol.x}`,
    "--depth-sol-light-y": `${sol.y}`,
    "--depth-sol-light-z": `${sol.z}`,
    "--depth-sol-light-size": `${sol.size}px`,
    "--depth-sol-light-color": sol.color,
    "--depth-sol-cast-x": `${browser.castX}px`,
    "--depth-sol-cast-y": `${browser.castY}px`,
    "--depth-sol-cast-blur": `${browser.castBlur}px`,
    "--depth-sol-cast-spread": `${browser.castSpread}px`,
    "--depth-sol-ambient-blur": `${browser.ambientBlur}px`,
    "--depth-sol-shadow-color": `hsla(${Math.round(surface.hue * 0.18 + 220)} 72% 3% / ${browser.shadowAlpha})`,
    "--depth-sol-highlight-alpha": `${browser.highlightAlpha}`,
  };
}

export function applyDepthSolCssVars(target, model) {
  if (!target?.style) {
    return {};
  }

  const properties = getCssCustomProperties(model);
  Object.entries(properties).forEach(([name, value]) => target.style.setProperty(name, value));
  return properties;
}

export function formatSourceContract(model) {
  const { sol, surface } = model.source;
  return (
    `<sol x="${sol.x}" y="${sol.y}" z="${sol.z}" size="${sol.size}" color="${sol.color}" axes="${sol.axes}"></sol>\n\n` +
    `.surface[data-depth-sol-surface] {\n` +
    `  width: ${surface.widthPx}px;\n` +
    `  aspect-ratio: ${surface.aspectRatio};\n` +
    `  depth: ${surface.depthPx}px;\n` +
    `}`
  );
}

export function formatCssFallback(model) {
  const properties = getCssCustomProperties(model);
  return `.surface[data-depth-sol-surface] {\n${Object.entries(properties)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n")}\n}`;
}

export function formatAframeBridge(model) {
  const { sceneOrigin, light, box, entityName } = model.runtime;
  const geometryName = entityName === "a-box" ? "a-box" : entityName;

  return (
    `<a-entity position="${sceneOrigin.x} ${sceneOrigin.y} ${sceneOrigin.z}" data-depth-sol-version="${model.version}">\n` +
    `  <a-entity\n` +
    `    light="type: ${light.type}; color: ${light.color}; intensity: ${light.intensity}; distance: ${light.distance}; decay: ${light.decay}"\n` +
    `    position="${light.position.x} ${light.position.y} ${light.position.z}">\n` +
    `  </a-entity>\n\n` +
    `  <${geometryName}\n` +
    `    width="${box.width}"\n` +
    `    height="${box.height}"\n` +
    `    depth="${box.depth}"\n` +
    `    position="${box.position.x} ${box.position.y} ${box.position.z}"\n` +
    `    material="color: ${box.material.color}; roughness: ${box.material.roughness}; metalness: ${box.material.metalness}"\n` +
    `    shadow="cast: ${box.shadow.cast}; receive: ${box.shadow.receive}">\n` +
    `  </${geometryName}>\n` +
    `</a-entity>`
  );
}

export function formatBridgeJson(model) {
  return JSON.stringify(
    {
      version: model.version,
      source: model.source,
      browser: model.browser,
      aframe: model.runtime,
    },
    null,
    2,
  );
}

export {
  CONTRACT_VERSION,
  DEFAULT_SCALE_PX_PER_METER,
  DEFAULT_SCENE_ORIGIN,
  DEFAULT_SOL,
  DEFAULT_SURFACE,
};
