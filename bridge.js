const DEFAULT_SCALE_PX_PER_METER = 1000;
const DEFAULT_SCENE_ORIGIN = Object.freeze({ x: 0, y: 1.6, z: -2.5 });

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function round(value, decimals = 3) {
  return Number(value.toFixed(decimals));
}

export function pxToMeters(value, scale = DEFAULT_SCALE_PX_PER_METER) {
  return round(value / scale, 3);
}

/**
 * Builds the shared representation for the current flat-web contract.
 *
 * The returned model keeps the authored source values, browser fallback hints,
 * and spatial-runtime interpretation together so every displayed snippet stays
 * derived from the same inputs.
 */
export function createBridgeModel({
  widthPx,
  aspectRatio = 1,
  depthPx,
  hue,
  sol,
  scale = DEFAULT_SCALE_PX_PER_METER,
  sceneOrigin = DEFAULT_SCENE_ORIGIN,
}) {
  // The flat-web contract is authored in CSS-like pixel space, but the
  // runtime bridge needs stable scene units for geometry and lights.
  const heightPx = widthPx / aspectRatio;
  const widthM = pxToMeters(widthPx, scale);
  const heightM = pxToMeters(heightPx, scale);
  const depthM = pxToMeters(depthPx, scale);
  const halfDepthM = round(depthM / 2, 3);

  const lightDistance = round(sol.size / 10, 1);
  const lightIntensity = round(clamp(0.7 + sol.z / 240, 0.7, 1.8), 2);
  const lightPosition = {
    x: round(sol.x / 100, 2),
    y: round(sol.y / 100, 2),
    z: round(sol.z / 100, 2),
  };

  return {
    source: {
      sol: {
        ...sol,
        color: `hsl(${hue} 90% 64%)`,
      },
      surface: {
        widthPx,
        aspectRatio,
        depthPx,
      },
    },
    browser: {
      // These values describe how a normal browser should imply depth
      // without drawing literal 3D geometry.
      castX: Math.round((-sol.x * depthPx) / 160),
      castY: Math.round((-sol.y * depthPx) / 160),
      castBlur: Math.round(depthPx * 0.42 + sol.z * 0.34),
      ambientBlur: Math.round(depthPx * 0.24 + sol.size * 0.18),
      shadowAlpha: round(clamp(0.22 + depthPx / 280, 0.22, 0.7), 2),
    },
    runtime: {
      // These values describe how the same contract could map into a
      // scene-native spatial representation such as A-Frame.
      scale,
      sceneOrigin,
      light: {
        type: "point",
        color: `hsl(${hue} 90% 64%)`,
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
  };
}

/**
 * Formats the semantic source contract as the author would write it.
 */
export function formatSourceContract(model) {
  const { sol, surface } = model.source;
  return (
    `<sol x="${sol.x}" y="${sol.y}" z="${sol.z}" size="${sol.size}" color="${sol.color}" axes="${sol.axes}"></sol>\n\n` +
    `.surface {\n` +
    `  width: ${surface.widthPx}px;\n` +
    `  aspect-ratio: ${surface.aspectRatio};\n` +
    `  depth: ${surface.depthPx}px;\n` +
    `}`
  );
}

/**
 * Formats the runtime interpretation as an A-Frame-shaped example.
 */
export function formatAframeBridge(model) {
  const { sceneOrigin, light, box } = model.runtime;
  return (
    `<a-entity position="${sceneOrigin.x} ${sceneOrigin.y} ${sceneOrigin.z}">\n` +
    `  <a-entity\n` +
    `    light="type: ${light.type}; color: ${light.color}; intensity: ${light.intensity}; distance: ${light.distance}; decay: ${light.decay}"\n` +
    `    position="${light.position.x} ${light.position.y} ${light.position.z}">\n` +
    `  </a-entity>\n\n` +
    `  <a-box\n` +
    `    width="${box.width}"\n` +
    `    height="${box.height}"\n` +
    `    depth="${box.depth}"\n` +
    `    position="${box.position.x} ${box.position.y} ${box.position.z}"\n` +
    `    material="color: ${box.material.color}; roughness: ${box.material.roughness}; metalness: ${box.material.metalness}"\n` +
    `    shadow="cast: ${box.shadow.cast}; receive: ${box.shadow.receive}">\n` +
    `  </a-box>\n` +
    `</a-entity>`
  );
}

export { DEFAULT_SCALE_PX_PER_METER, DEFAULT_SCENE_ORIGIN };
