/**
 * Imports transparent brand assets from the Stitch source package.
 * Detects true alpha transparency and copies cleanly when possible;
 * otherwise strips embedded checkerboard backgrounds and edge artifacts.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const BRAND_DIR = join(ROOT, "public/brand");
const SOURCE = join(ROOT, ".tmp-brand-import/stitch_aredir_labs_innovation_hub");

const SOURCES = {
  logoDark:
    "aredir_labs_horizontal_brand_logo_for_dark_mode._on_the_left_an_elegant_glowing/screen.png",
  logoLight:
    "aredir_labs_horizontal_brand_logo_for_light_mode._on_the_left_an_elegant/screen.png",
  markDark:
    "aredir_labs_brand_mark_icon_for_dark_mode._an_elegant_glowing_electric_blue_and/screen.png",
  markLight:
    "aredir_labs_brand_mark_icon_for_light_mode._an_elegant_scripted_elvish_a_with_a/screen.png",
};

const OUTPUTS = {
  logoDark: "aredir-logo-dark.png",
  logoLight: "aredir-logo-light.png",
  markDark: "aredir-mark-dark.png",
  markLight: "aredir-mark-light.png",
  faviconDark: "aredir-favicon-dark.png",
  faviconLight: "aredir-favicon-light.png",
};

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function saturation(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function clearPixel(data, i) {
  data[i] = 0;
  data[i + 1] = 0;
  data[i + 2] = 0;
  data[i + 3] = 0;
}

function isMarkContent(r, g, b, alpha) {
  if (alpha < 36) return false;
  if (isDesaturatedNeutral(r, g, b, alpha)) return false;

  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);

  if (b > r + 18 && b > g + 14 && sat > 54) return true;
  if (sat > 58) return true;
  if (alpha > 170 && lum < 88 && sat > 28) return true;

  return false;
}

function isDesaturatedNeutral(r, g, b, alpha) {
  if (alpha < 8) return false;
  const sat = saturation(r, g, b);
  if (sat >= 58) return false;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return spread < 58;
}

function isCoreMarkPixel(r, g, b, alpha) {
  if (alpha < 20) return false;
  if (isDesaturatedNeutral(r, g, b, alpha)) return false;

  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);

  if (b > r + 18 && b > g + 14 && sat > 50) return true;
  if (sat > 58) return true;
  if (alpha > 140 && lum < 72 && sat > 22) return true;

  return false;
}

function isGlowEdgePixel(r, g, b, alpha) {
  if (alpha < 16) return false;
  if (isDesaturatedNeutral(r, g, b, alpha)) return false;

  const sat = saturation(r, g, b);
  return b >= r && b >= g && sat > 10;
}

function isNeutralArtifact(r, g, b, alpha) {
  if (alpha < 8) return false;
  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);
  if (sat >= 32) return false;
  if (lum > 210) return true;
  if (lum >= 85 && lum <= 155) return true;
  if (lum <= 84 && sat < 32) return true;
  return false;
}

function isCheckerboardBackground(r, g, b) {
  return isNeutralArtifact(r, g, b, 255);
}

function sampleCheckerColors(data, width, height) {
  const counts = new Map();
  const sampleAt = (x, y) => {
    const i = (y * width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (!isCheckerboardBackground(r, g, b)) return;
    const key = `${r},${g},${b}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  };

  for (let x = 0; x < width; x++) {
    sampleAt(x, 0);
    sampleAt(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    sampleAt(0, y);
    sampleAt(width - 1, y);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key]) => key.split(",").map(Number));
}

function matchesCheckerColor(r, g, b, checkerColors, tolerance = 14) {
  for (const [cr, cg, cb] of checkerColors) {
    if (Math.hypot(r - cr, g - cg, b - cb) <= tolerance) return true;
  }
  return false;
}

function stripCheckerboardFlood({ data, width, height }) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const tryEnqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isCheckerboardBackground(data[i], data[i + 1], data[i + 2])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    tryEnqueue(x, 0);
    tryEnqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryEnqueue(0, y);
    tryEnqueue(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const i = idx * 4;
    clearPixel(data, i);
    const x = idx % width;
    const y = (idx - x) / width;
    tryEnqueue(x - 1, y);
    tryEnqueue(x + 1, y);
    tryEnqueue(x, y - 1);
    tryEnqueue(x, y + 1);
  }
}

function removeCheckerRemnants(buffer, checkerColors) {
  const { data } = buffer;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isMarkContent(r, g, b, alpha)) continue;

    const sat = saturation(r, g, b);
    const lum = luminance(r, g, b);

    if (matchesCheckerColor(r, g, b, checkerColors)) {
      clearPixel(data, i);
      continue;
    }

    if (alpha < 210 && sat < 34) {
      clearPixel(data, i);
      continue;
    }

    if (sat < 30 && lum > 20 && lum < 250) {
      clearPixel(data, i);
    }
  }
}

function removeOpaqueNeutralArtifacts(buffer) {
  const { data } = buffer;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 8) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isMarkContent(r, g, b, alpha)) continue;
    if (isNeutralArtifact(r, g, b, alpha)) clearPixel(data, i);
  }
}

function removeNeutralHalos(buffer) {
  const { data } = buffer;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0 || alpha === 255) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isMarkContent(r, g, b, alpha)) continue;

    const sat = saturation(r, g, b);
    if (sat < 36) clearPixel(data, i);
  }
}

function removeIsolatedSpeckles(buffer, minNeighbors = 2) {
  const { data, width, height } = buffer;
  const toClear = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < 18) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isMarkContent(r, g, b, alpha)) continue;

      let strongNeighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ni = ((y + dy) * width + (x + dx)) * 4;
          if (
            data[ni + 3] > 90 &&
            isMarkContent(data[ni], data[ni + 1], data[ni + 2], data[ni + 3])
          ) {
            strongNeighbors++;
          }
        }
      }

      if (strongNeighbors < minNeighbors) toClear.push(i);
    }
  }

  for (const i of toClear) clearPixel(data, i);
}

function stripNeutralIslands(buffer) {
  const { data, width, height } = buffer;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const tryEnqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    const alpha = data[i + 3];
    if (alpha > 8 && !isNeutralArtifact(data[i], data[i + 1], data[i + 2], alpha)) {
      return;
    }
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (data[idx * 4 + 3] < 8) tryEnqueue(x, y);
    }
  }

  for (let x = 0; x < width; x++) {
    tryEnqueue(x, 0);
    tryEnqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryEnqueue(0, y);
    tryEnqueue(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const i = idx * 4;
    if (data[i + 3] > 8) clearPixel(data, i);
    const x = idx % width;
    const y = (idx - x) / width;
    tryEnqueue(x - 1, y);
    tryEnqueue(x + 1, y);
    tryEnqueue(x, y - 1);
    tryEnqueue(x, y + 1);
  }
}

function removeCheckerboardPattern(buffer) {
  const { data, width, height } = buffer;
  const toClear = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const i = idx * 4;
      const alpha = data[i + 3];
      if (alpha < 20) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isMarkContent(r, g, b, alpha) && saturation(r, g, b) > 62) continue;

      const lum = luminance(r, g, b);
      const sat = saturation(r, g, b);
      if (sat >= 62) continue;

      let alternatingNeighbors = 0;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        const ni = (ny * width + nx) * 4;
        if (data[ni + 3] < 20) continue;
        const nl = luminance(data[ni], data[ni + 1], data[ni + 2]);
        const ns = saturation(data[ni], data[ni + 1], data[ni + 2]);
        if (ns >= 62) continue;
        if (Math.abs(lum - nl) >= 14 && Math.abs(lum - nl) <= 70) {
          alternatingNeighbors++;
        }
      }

      if (alternatingNeighbors >= 2 || isDesaturatedNeutral(r, g, b, alpha)) {
        toClear.push(i);
      }
    }
  }

  for (const i of toClear) clearPixel(data, i);
}

function removeGlowCheckerTexture(buffer) {
  const { data, width, height } = buffer;
  const toClear = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < 40) continue;

      const lums = [];
      let satSum = 0;
      let count = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ni = ((y + dy) * width + (x + dx)) * 4;
          if (data[ni + 3] < 40) continue;
          lums.push(luminance(data[ni], data[ni + 1], data[ni + 2]));
          satSum += saturation(data[ni], data[ni + 1], data[ni + 2]);
          count++;
        }
      }

      if (count < 5) continue;

      const mean = lums.reduce((sum, value) => sum + value, 0) / count;
      const variance =
        lums.reduce((sum, value) => sum + (value - mean) ** 2, 0) / count;
      const avgSat = satSum / count;

      if (variance > 110 && avgSat >= 50 && avgSat <= 74) {
        toClear.push(i);
      }
    }
  }

  for (const i of toClear) clearPixel(data, i);
}

function applyStrictMarkOnly(buffer) {
  const { data, width, height } = buffer;
  const keep = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * 4;
      const alpha = data[i + 3];
      if (alpha < 20) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const sat = saturation(r, g, b);
      const lum = luminance(r, g, b);
      if (sat >= 66 || lum >= 190) keep[idx] = 1;
    }
  }

  for (let pass = 0; pass < 1; pass++) {
    const next = Uint8Array.from(keep);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (keep[idx]) continue;

        let touchesKeep = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (keep[(y + dy) * width + (x + dx)]) touchesKeep = true;
          }
        }
        if (!touchesKeep) continue;

        const i = idx * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        if (alpha < 20 || isDesaturatedNeutral(r, g, b, alpha)) continue;
        if (saturation(r, g, b) >= 60) next[idx] = 1;
      }
    }
    for (let idx = 0; idx < keep.length; idx++) {
      if (next[idx]) keep[idx] = 1;
    }
  }

  for (let idx = 0; idx < width * height; idx++) {
    if (!keep[idx]) clearPixel(data, idx * 4);
  }

  for (let i = 0; i < data.length; i += 4) {
    if (isDesaturatedNeutral(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      clearPixel(data, i);
    }
  }
}

function applyMarkMask(buffer, { strict = false } = {}) {
  if (strict) {
    applyStrictMarkOnly(buffer);
    return;
  }

  const { data, width, height } = buffer;
  const mask = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const i = idx * 4;
      if (isCoreMarkPixel(data[i], data[i + 1], data[i + 2], data[i + 3])) {
        mask[idx] = 2;
      }
    }
  }

  for (let pass = 0; pass < (strict ? 2 : 5); pass++) {
    const next = Uint8Array.from(mask);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (mask[idx]) continue;

        let touchesCore = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (mask[(y + dy) * width + (x + dx)] >= 2) touchesCore = true;
          }
        }
        if (!touchesCore) continue;

        const i = idx * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        if (isDesaturatedNeutral(r, g, b, alpha)) continue;
        const sat = saturation(r, g, b);
        if (strict) {
          if (sat > 62 || luminance(r, g, b) > 185) next[idx] = 1;
          continue;
        }
        if (isGlowEdgePixel(r, g, b, alpha) || sat > 32) {
          next[idx] = 1;
        }
      }
    }

    for (let idx = 0; idx < mask.length; idx++) {
      if (next[idx] && !mask[idx]) mask[idx] = next[idx];
    }
  }

  for (let idx = 0; idx < width * height; idx++) {
    if (!mask[idx]) clearPixel(data, idx * 4);
  }

  for (let i = 0; i < data.length; i += 4) {
    if (isDesaturatedNeutral(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      clearPixel(data, i);
    }
  }
}

function finalizeBuffer(buffer, { strictMark = false } = {}) {
  removeNeutralHalos(buffer);
  removeIsolatedSpeckles(buffer, 1);
  removeOpaqueNeutralArtifacts(buffer);
  stripNeutralIslands(buffer);
  removeCheckerboardPattern(buffer);
  applyMarkMask(buffer, { strict: strictMark });
  removeGlowCheckerTexture(buffer);
  removeCheckerboardPattern(buffer);
}

function cleanBuffer(buffer, { strictMark = false } = {}) {
  const checkerColors = sampleCheckerColors(
    buffer.data,
    buffer.width,
    buffer.height,
  );

  stripCheckerboardFlood(buffer);
  stripNeutralIslands(buffer);
  removeCheckerRemnants(buffer, checkerColors);
  finalizeBuffer(buffer, { strictMark });
}

function hasTrueAlphaTransparency(buffer) {
  const { data, width, height } = buffer;
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  for (const [x, y] of corners) {
    const alpha = data[(y * width + x) * 4 + 3];
    if (alpha > 12) return false;
  }

  let edgeSamples = 0;
  let transparentEdge = 0;
  let checkerEdge = 0;

  const sampleEdge = (x, y) => {
    edgeSamples++;
    const i = (y * width + x) * 4;
    const alpha = data[i + 3];
    if (alpha < 12) {
      transparentEdge++;
      return;
    }
    if (isCheckerboardBackground(data[i], data[i + 1], data[i + 2])) {
      checkerEdge++;
    }
  };

  for (let x = 0; x < width; x++) {
    sampleEdge(x, 0);
    sampleEdge(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    sampleEdge(0, y);
    sampleEdge(width - 1, y);
  }

  if (checkerEdge > 0) return false;
  return transparentEdge / edgeSamples >= 0.85;
}

async function loadSource(relativePath, { strictMark = false } = {}) {
  const input = await readFile(join(SOURCE, relativePath));
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buffer = {
    data: Buffer.from(data),
    width: info.width,
    height: info.height,
  };

  const trueAlpha = hasTrueAlphaTransparency(buffer);
  console.log(
    `  ${relativePath.split("/")[0].slice(0, 50)}: ${trueAlpha ? "true alpha — copy only" : "embedded background — cleanup"}`,
  );

  if (!trueAlpha) cleanBuffer(buffer, { strictMark });
  return buffer;
}

async function savePng(buffer, outputPath, resize) {
  let pipeline = sharp(buffer.data, {
    raw: {
      width: buffer.width,
      height: buffer.height,
      channels: 4,
    },
  }).trim();

  if (resize) {
    const { data, info } = await pipeline
      .resize(resize, resize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel: sharp.kernel.lanczos3,
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const resized = {
      data: Buffer.from(data),
      width: info.width,
      height: info.height,
    };
    finalizeBuffer(resized, { strictMark: Boolean(resize) });

    await sharp(resized.data, {
      raw: {
        width: resized.width,
        height: resized.height,
        channels: 4,
      },
    })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    return;
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
}

async function saveResizedFromFile(inputPath, outputPath, size) {
  const { data, info } = await sharp(inputPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buffer = {
    data: Buffer.from(data),
    width: info.width,
    height: info.height,
  };
  finalizeBuffer(buffer, { strictMark: true });

  await sharp(buffer.data, {
    raw: {
      width: buffer.width,
      height: buffer.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function verifyCleanAsset(label, filePath) {
  const { data, info } = await sharp(filePath)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  let desaturatedNeutral = 0;
  let checkerish = 0;
  let lowAlphaNeutral = 0;
  let visible = 0;
  let opaqueNeutralEdge = 0;

  for (const [x, y] of corners) {
    const alpha = data[(y * width + x) * 4 + 3];
    if (alpha > 12) {
      throw new Error(
        `${label}: corner (${x},${y}) is not transparent (alpha=${alpha})`,
      );
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      const onEdge =
        x === 0 || y === 0 || x === width - 1 || y === height - 1;

      if (onEdge) {
        if (alpha > 40) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const sat = saturation(r, g, b);
          const lum = luminance(r, g, b);
          if (
            sat < 30 &&
            !isMarkContent(r, g, b, alpha) &&
            ((lum >= 85 && lum <= 155) || (lum > 180 && sat < 25))
          ) {
            opaqueNeutralEdge++;
          }
        }
      }

      if (alpha < 8) continue;
      visible++;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (isDesaturatedNeutral(r, g, b, alpha)) {
        desaturatedNeutral++;
        continue;
      }

      const sat = saturation(r, g, b);
      const lum = luminance(r, g, b);
      if (isMarkContent(r, g, b, alpha)) continue;
      if (alpha < 210 && sat < 34) lowAlphaNeutral++;
      if (sat < 30 && lum > 20 && lum < 250) checkerish++;
    }
  }

  if (opaqueNeutralEdge > 4) {
    throw new Error(
      `${label}: ${opaqueNeutralEdge} opaque neutral edge pixels (dark rectangle/slab)`,
    );
  }

  console.log(
    `  ${label}: visible=${visible} desaturatedNeutral=${desaturatedNeutral} noise=${checkerish} lowAlphaNeutral=${lowAlphaNeutral} edgeNeutral=${opaqueNeutralEdge}`,
  );

  if (desaturatedNeutral > 0 || checkerish > 0 || lowAlphaNeutral > 0) {
    throw new Error(
      `${label}: too many artifact pixels (desaturatedNeutral=${desaturatedNeutral}, noise=${checkerish}, lowAlphaNeutral=${lowAlphaNeutral})`,
    );
  }
}

async function main() {
  console.log("Loading source assets from:", SOURCE);
  const logoDark = await loadSource(SOURCES.logoDark);
  const logoLight = await loadSource(SOURCES.logoLight);
  const markDark = await loadSource(SOURCES.markDark, { strictMark: true });
  const markLight = await loadSource(SOURCES.markLight, { strictMark: true });

  await savePng(logoDark, join(BRAND_DIR, OUTPUTS.logoDark));
  await savePng(logoLight, join(BRAND_DIR, OUTPUTS.logoLight));
  await savePng(markDark, join(BRAND_DIR, OUTPUTS.markDark));
  await savePng(markLight, join(BRAND_DIR, OUTPUTS.markLight));
  await savePng(markDark, join(BRAND_DIR, OUTPUTS.faviconDark), 512);
  await savePng(markLight, join(BRAND_DIR, OUTPUTS.faviconLight), 512);

  await saveResizedFromFile(
    join(BRAND_DIR, OUTPUTS.faviconDark),
    join(ROOT, "src/app/icon.png"),
    64,
  );

  await saveResizedFromFile(
    join(BRAND_DIR, OUTPUTS.faviconDark),
    join(ROOT, "src/app/apple-icon.png"),
    180,
  );

  for (const size of [32, 64, 180]) {
    await saveResizedFromFile(
      join(BRAND_DIR, OUTPUTS.faviconDark),
      join(BRAND_DIR, `favicon-${size}.png`),
      size,
    );
  }

  console.log("\nImported source transparent brand assets:");
  for (const file of Object.values(OUTPUTS)) {
    console.log(" -", join(BRAND_DIR, file));
  }

  console.log("\nVerification:");
  await verifyCleanAsset("mark-dark", join(BRAND_DIR, OUTPUTS.markDark));
  await verifyCleanAsset("mark-light", join(BRAND_DIR, OUTPUTS.markLight));
  await verifyCleanAsset("logo-dark", join(BRAND_DIR, OUTPUTS.logoDark));
  await verifyCleanAsset("logo-light", join(BRAND_DIR, OUTPUTS.logoLight));
  await verifyCleanAsset("favicon-dark", join(BRAND_DIR, OUTPUTS.faviconDark));
  await verifyCleanAsset("favicon-light", join(BRAND_DIR, OUTPUTS.faviconLight));
  await verifyCleanAsset("icon", join(ROOT, "src/app/icon.png"));
  await verifyCleanAsset("apple-icon", join(ROOT, "src/app/apple-icon.png"));

  console.log(" - favicon-32.png, favicon-64.png, favicon-180.png");
  console.log(" - src/app/icon.png, src/app/apple-icon.png");
  console.log("\nAll assets passed verification.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
