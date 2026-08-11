const root = document.documentElement;
const controls = document.getElementById("controls");
const snippet = document.getElementById("code-snippet");

const fieldMap = {
  size: {
    cssVar: "--shape-size",
    output: document.getElementById("size-value"),
    format: (value) => `${value}px`,
  },
  depth: {
    cssVar: "--shape-depth",
    output: document.getElementById("depth-value"),
    format: (value) => `${value}px`,
  },
  tilt: {
    cssVar: "--shape-tilt",
    output: document.getElementById("tilt-value"),
    format: (value) => `${value}deg`,
  },
  perspective: {
    cssVar: "--scene-perspective",
    output: document.getElementById("perspective-value"),
    format: (value) => `${value}px`,
  },
  hue: {
    cssVar: "--accent-hue",
    output: document.getElementById("hue-value"),
    format: (value) => `${value}\u00b0`,
  },
};

function updateDemo() {
  const formData = new FormData(controls);
  const size = Number(formData.get("size"));
  const depth = Number(formData.get("depth"));
  const tilt = Number(formData.get("tilt"));
  const perspective = Number(formData.get("perspective"));
  const hue = Number(formData.get("hue"));

  Object.entries(fieldMap).forEach(([name, config]) => {
    const rawValue = Number(formData.get(name));
    config.output.value = config.format(rawValue);
    root.style.setProperty(config.cssVar, config.format(rawValue));
  });

  snippet.textContent = `.scene {\n  perspective: ${perspective}px;\n}\n\n.shape {\n  width: ${size}px;\n  aspect-ratio: 1;\n  depth: ${depth}px;\n  /* viewing tilt: ${tilt}deg */\n  /* hue: ${hue}\u00b0 */\n}`;

  root.style.setProperty("--bg-top", `hsl(${Math.round(hue * 0.55 + 108)} 39% 11%)`);
  root.style.setProperty("--bg-bottom", `hsl(${Math.round(hue * 0.42 + 228)} 32% 7%)`);
}

controls.addEventListener("input", updateDemo);

updateDemo();
