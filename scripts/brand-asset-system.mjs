/**
 * @deprecated Superseded by scripts/brand-import-source.mjs and Stitch transparent packages.
 * Generates the Aredir Labs brand mark system from the tiled source.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const BRAND_DIR = join(ROOT, "public/brand");
const INPUT = join(BRAND_DIR, "aredir-labs-mark.png");
const BG = { r: 19, g: 19, b: 19 };

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min;
}

function clearPixel(data, i) {
  data[i] = 0;
  data[i + 1] = 0;
  data[i + 2] = 0;
  data[i + 3] = 0;
}

function backgroundAlpha(r, g, b, x, y, width, height) {
  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);
  const dist = Math.hypot(r - BG.r, g - BG.g, b - BG.b);

  if (lum > 235 && sat < 18) return 0;
  if (dist <= 34) return 0;
  if (dist <= 64) return Math.round(((dist - 34) / 30) * 255);

  if (lum < 58 && sat < 40) {
    const fringe = (lum - 14) / 44;
    return Math.round(Math.max(0, Math.min(1, fringe)) * 255);
  }

  const edge = x < 6 || y < 6 || x >= width - 6 || y >= height - 6;
  if (edge && lum < 78 && sat < 44) {
    return Math.round(Math.max(0, (lum - 18) / 60) * 180);
  }

  return 255;
}

function isMarkFeature(r, g, b) {
  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);
  const isBlueFeature = b > r + 10 && b > g + 6 && sat > 16;
  const isBrightFeature = lum > 128 || (lum > 88 && sat > 32);
  return isBlueFeature || isBrightFeature;
}

/** Hard-cut hero extraction — avoids semi-transparent dark fringe rectangles. */
function backgroundAlphaHero(r, g, b) {
  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);
  const dist = Math.hypot(r - BG.r, g - BG.g, b - BG.b);

  if (lum > 240 && sat < 20) return 0;

  if (isMarkFeature(r, g, b)) {
    if (dist <= 38) return 0;
    return 255;
  }

  if (dist <= 42) return 0;
  if (dist <= 72 && lum < 100 && sat < 48) return 0;
  if (lum < 82 && sat < 42) return 0;

  return 0;
}

function extractTransparent(inputBuffer, mode = "default") {
  return sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { width, height } = info;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const alpha =
            mode === "hero"
              ? backgroundAlphaHero(data[i], data[i + 1], data[i + 2])
              : backgroundAlpha(
                  data[i],
                  data[i + 1],
                  data[i + 2],
                  x,
                  y,
                  width,
                  height,
                );
          data[i + 3] = alpha;
          if (alpha === 0) clearPixel(data, i);
        }
      }

      return { data, width, height };
    });
}

/** Remove semi-transparent dark pixels that read as a rectangular slab in UI. */
function purgeDarkFringe(buffer) {
  const { data } = buffer;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = luminance(r, g, b);
    const sat = saturation(r, g, b);

    if (isMarkFeature(r, g, b)) continue;

    if (alpha < 220 && lum < 110 && sat < 50) {
      clearPixel(data, i);
      continue;
    }

    if (alpha < 160 && lum < 140) {
      clearPixel(data, i);
    }
  }
}

function cropToContent(buffer, padding = 28, alphaThreshold = 72) {
  const { data, width, height } = buffer;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha >= alphaThreshold) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX <= minX || maxY <= minY) return buffer;

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(width - 1, maxX + padding);
  maxY = Math.min(height - 1, maxY + padding);

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  const cropped = Buffer.alloc(cropWidth * cropHeight * 4);

  for (let y = 0; y < cropHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      const source = ((minY + y) * width + (minX + x)) * 4;
      const target = (y * cropWidth + x) * 4;
      cropped[target] = data[source];
      cropped[target + 1] = data[source + 1];
      cropped[target + 2] = data[source + 2];
      cropped[target + 3] = data[source + 3];
    }
  }

  return { data: cropped, width: cropWidth, height: cropHeight };
}

function cloneBuffer({ data, width, height }) {
  return { data: Buffer.from(data), width, height };
}

function isGlowPixel(r, g, b, alpha) {
  if (alpha < 8 || alpha > 245) return false;
  const sat = saturation(r, g, b);
  const lum = luminance(r, g, b);
  return b >= r && b >= g && sat > 12 && lum < 215;
}

function isSparklePixel(r, g, b, alpha) {
  if (alpha < 40) return false;
  const lum = luminance(r, g, b);
  const sat = saturation(r, g, b);
  return lum > 175 && sat < 55 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
}

function reduceGlow(buffer, strength) {
  const { data } = buffer;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3];
    if (!isGlowPixel(r, g, b, alpha)) continue;
    const nextAlpha = Math.round(alpha * strength);
    data[i + 3] = nextAlpha;
    if (nextAlpha === 0) clearPixel(data, i);
  }
}

/** Remove baked tile floor shadow and bottom horizontal slab. */
function removeBottomSlab(buffer) {
  const { data, width, height } = buffer;
  const slabStart = Math.floor(height * 0.72);

  for (let y = slabStart; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha === 0) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = luminance(r, g, b);
      const sat = saturation(r, g, b);

      const lowerBand = y >= height * 0.8;
      const midBand = y >= height * 0.72 && y < height * 0.8;

      if (lowerBand && lum < 145 && sat < 62) {
        clearPixel(data, i);
        continue;
      }

      if (midBand && lum < 105 && sat < 52) {
        clearPixel(data, i);
        continue;
      }

      if (midBand && lum < 130 && sat < 40) {
        data[i + 3] = Math.round(alpha * 0.25);
        if (data[i + 3] === 0) clearPixel(data, i);
      }
    }
  }
}

/** Extra hero pass: strip any remaining low, wide shadow mass near the base. */
function cleanHeroBase(buffer) {
  const { data, width, height } = buffer;
  let lastStrongRow = 0;

  for (let y = 0; y < height; y++) {
    let strongPixels = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 90) strongPixels++;
    }
    if (strongPixels > width * 0.02) lastStrongRow = y;
  }

  const trimBelow = Math.min(height - 1, lastStrongRow + Math.floor(height * 0.02));
  for (let y = trimBelow; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const lum = luminance(data[i], data[i + 1], data[i + 2]);
      if (data[i + 3] > 0 && lum < 170) clearPixel(data, i);
    }
  }
}

function removeSparkles(buffer, minNeighbors = 3) {
  const { data, width, height } = buffer;
  const toClear = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha === 0) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (!isSparklePixel(r, g, b, alpha)) continue;

      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ni = ((y + dy) * width + (x + dx)) * 4;
          if (data[ni + 3] > 80) neighbors++;
        }
      }

      if (neighbors < minNeighbors) toClear.push(i);
    }
  }

  for (const i of toClear) clearPixel(data, i);
}

function boostCoreContrast(buffer, strength = 1) {
  const { data } = buffer;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 70) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = luminance(r, g, b);
    const sat = saturation(r, g, b);

    if (isGlowPixel(r, g, b, alpha) || isSparklePixel(r, g, b, alpha)) continue;

    const contrast = 1 + 0.22 * strength;
    const midpoint = 118;
    let nr = (r - midpoint) * contrast + midpoint;
    let ng = (g - midpoint) * contrast + midpoint;
    let nb = (b - midpoint) * contrast + midpoint;

    if (sat > 24 && b >= r) {
      nb = Math.min(255, nb * (1 + 0.08 * strength));
      nr = Math.max(0, nr * (1 - 0.04 * strength));
    }

    if (lum < 95) {
      nr *= 1 - 0.12 * strength;
      ng *= 1 - 0.12 * strength;
      nb *= 1 - 0.08 * strength;
    }

    data[i] = Math.round(Math.max(0, Math.min(255, nr)));
    data[i + 1] = Math.round(Math.max(0, Math.min(255, ng)));
    data[i + 2] = Math.round(Math.max(0, Math.min(255, nb)));
    data[i + 3] = Math.min(255, Math.round(alpha * (1 + 0.06 * strength)));
  }
}

function simplifyForFavicon(buffer) {
  const { data, width, height } = buffer;
  reduceGlow(buffer, 0.18);
  removeSparkles(buffer, 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha === 0) continue;

      const lum = luminance(data[i], data[i + 1], data[i + 2]);
      if (alpha < 72) {
        clearPixel(data, i);
        continue;
      }
      if (alpha < 130 && lum > 185) {
        data[i + 3] = Math.round(alpha * 0.3);
      }
    }
  }
}

function prepareUiMark(buffer, { glow, sparkleNeighbors, contrast }) {
  reduceGlow(buffer, glow);
  removeBottomSlab(buffer);
  removeSparkles(buffer, sparkleNeighbors);
  boostCoreContrast(buffer, contrast);
}

async function saveHeroPng(buffer, outputPath) {
  await sharp(buffer.data, {
    raw: {
      width: buffer.width,
      height: buffer.height,
      channels: 4,
    },
  })
    .extend({
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(1024, 1024, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function saveTrimmedPng(buffer, outputPath, size, sharpen = false) {
  let pipeline = sharp(buffer.data, {
    raw: {
      width: buffer.width,
      height: buffer.height,
      channels: 4,
    },
  })
    .trim()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    });

  if (sharpen) {
    pipeline = pipeline.sharpen({ sigma: 0.85, m1: 0.65, m2: 0.3 });
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
}

async function writeResizedVariant(sourcePath, outputPath, size) {
  await sharp(sourcePath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function main() {
  const input = await readFile(INPUT);
  const extracted = await extractTransparent(input);
  const heroExtracted = await extractTransparent(input, "hero");

  let heroBuffer = cloneBuffer(heroExtracted);
  removeBottomSlab(heroBuffer);
  purgeDarkFringe(heroBuffer);
  cleanHeroBase(heroBuffer);
  purgeDarkFringe(heroBuffer);
  heroBuffer = cropToContent(heroBuffer, 32, 80);

  const uiBuffer = cloneBuffer(extracted);
  prepareUiMark(uiBuffer, {
    glow: 0.32,
    sparkleNeighbors: 4,
    contrast: 1,
  });

  const headerBuffer = cloneBuffer(extracted);
  prepareUiMark(headerBuffer, {
    glow: 0.15,
    sparkleNeighbors: 5,
    contrast: 1.35,
  });

  const faviconBuffer = cloneBuffer(extracted);
  simplifyForFavicon(faviconBuffer);
  removeBottomSlab(faviconBuffer);

  const heroPath = join(BRAND_DIR, "aredir-labs-mark-hero-v2.png");
  const uiPath = join(BRAND_DIR, "aredir-labs-mark-ui.png");
  const headerPath = join(BRAND_DIR, "aredir-labs-mark-header.png");
  const faviconPath = join(BRAND_DIR, "aredir-labs-mark-favicon.png");

  await saveHeroPng(heroBuffer, heroPath);
  await saveTrimmedPng(uiBuffer, uiPath, 512, true);
  await saveTrimmedPng(headerBuffer, headerPath, 512, true);
  await saveTrimmedPng(faviconBuffer, faviconPath, 512, true);

  const sizeVariants = [
    { size: 32, name: "favicon-32.png" },
    { size: 64, name: "favicon-64.png" },
    { size: 180, name: "favicon-180.png" },
    { size: 512, name: "favicon-512.png" },
  ];

  for (const variant of sizeVariants) {
    await writeResizedVariant(
      faviconPath,
      join(BRAND_DIR, variant.name),
      variant.size,
    );
  }

  await writeFile(
    join(ROOT, "src/app/icon.png"),
    await readFile(join(BRAND_DIR, "favicon-64.png")),
  );
  await writeFile(
    join(ROOT, "src/app/apple-icon.png"),
    await readFile(join(BRAND_DIR, "favicon-180.png")),
  );

  console.log("Brand asset system generated:");
  console.log(" -", heroPath);
  console.log(" -", uiPath);
  console.log(" -", headerPath);
  console.log(" -", faviconPath);
  for (const variant of sizeVariants) {
    console.log(" -", join(BRAND_DIR, variant.name));
  }
  console.log(" - src/app/icon.png (64)");
  console.log(" - src/app/apple-icon.png (180)");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
