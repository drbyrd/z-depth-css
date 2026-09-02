import { createBridgeModel, formatAframeBridge, formatSourceContract } from "./bridge.js";

const root = document.documentElement;
const controls = document.getElementById("controls");
const snippet = document.getElementById("code-snippet");
const bridgeSourceSnippet = document.getElementById("bridge-source-snippet");
const bridgeRuntimeSnippet = document.getElementById("bridge-runtime-snippet");

const fieldMap = {
  size: {
    cssVar: "--surface-size",
    output: document.getElementById("size-value"),
    format: (value) => `${value}px`,
  },
  depth: {
    cssVar: "--surface-depth",
    output: document.getElementById("depth-value"),
    format: (value) => `${value}px`,
  },
  lightX: {
    cssVar: "--light-x",
    output: document.getElementById("light-x-value"),
    format: (value) => `${value}`,
  },
  lightY: {
    cssVar: "--light-y",
    output: document.getElementById("light-y-value"),
    format: (value) => `${value}`,
  },
  lightZ: {
    cssVar: "--light-z",
    output: document.getElementById("light-z-value"),
    format: (value) => `${value}`,
  },
  lightSize: {
    cssVar: "--light-size",
    output: document.getElementById("light-size-value"),
    format: (value) => `${value}px`,
  },
  hue: {
    cssVar: "--accent-hue",
    output: document.getElementById("hue-value"),
    format: (value) => `${value}\u00b0`,
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateDemo() {
  const formData = new FormData(controls);
  const size = Number(formData.get("size"));
  const depth = Number(formData.get("depth"));
  const lightX = Number(formData.get("lightX"));
  const lightY = Number(formData.get("lightY"));
  const lightZ = Number(formData.get("lightZ"));
  const lightSize = Number(formData.get("lightSize"));
  const hue = Number(formData.get("hue"));

  Object.entries(fieldMap).forEach(([name, config]) => {
    const rawValue = Number(formData.get(name));
    config.output.value = config.format(rawValue);
    root.style.setProperty(config.cssVar, config.format(rawValue));
  });

  // Browser mode stays planar, so the controls first drive a set of
  // shadow and glow hints rather than visible extrusion.
  const castX = `${Math.round((-lightX * depth) / 160)}px`;
  const castY = `${Math.round((-lightY * depth) / 160)}px`;
  const castBlur = `${Math.round(depth * 0.42 + lightZ * 0.34)}px`;
  const castSpread = `${Math.round(depth * -0.16)}px`;
  const ambientBlur = `${Math.round(depth * 0.24 + lightSize * 0.18)}px`;
  const surfaceHeight = `${Math.round(size * 0.72)}px`;
  const glowAlpha = clamp(0.16 + lightZ / 420, 0.16, 0.48);
  const shadowAlpha = clamp(0.22 + depth / 280, 0.22, 0.7);

  root.style.setProperty("--cast-x", castX);
  root.style.setProperty("--cast-y", castY);
  root.style.setProperty("--cast-blur", castBlur);
  root.style.setProperty("--cast-spread", castSpread);
  root.style.setProperty("--ambient-blur", ambientBlur);
  root.style.setProperty("--surface-height", surfaceHeight);
  root.style.setProperty("--surface-hue", `${hue}`);
  root.style.setProperty("--light-color", `hsla(${hue} 94% 70% / ${glowAlpha})`);
  root.style.setProperty("--shadow-color", `hsla(${Math.round(hue * 0.18 + 220)} 72% 3% / ${shadowAlpha})`);
  root.style.setProperty("--page-glow", `hsla(${hue} 82% 68% / ${clamp(glowAlpha * 0.42, 0.08, 0.18)})`);
  root.style.setProperty("--accent-soft", `hsl(${hue} 70% 78%)`);
  root.style.setProperty("--accent-line", `hsla(${hue} 82% 72% / 0.52)`);

  // The same input values are then handed to the bridge utility so the
  // runtime example always reflects the exact same authored contract.
  const bridgeModel = createBridgeModel({
    widthPx: size,
    aspectRatio: 1,
    depthPx: depth,
    hue,
    sol: {
      x: lightX,
      y: lightY,
      z: lightZ,
      size: lightSize,
      axes: "xyz",
    },
  });

  const sourceContract = formatSourceContract(bridgeModel);
  const runtimeBridge = formatAframeBridge(bridgeModel);

  snippet.textContent = sourceContract;
  bridgeSourceSnippet.textContent = sourceContract;
  bridgeRuntimeSnippet.textContent = runtimeBridge;
}

controls.addEventListener("input", updateDemo);

updateDemo();
