/**
 * Builds the raster icons from src/app/icon.svg (the KB monogram).
 *
 *   node scripts/generate-icons.mjs
 *
 * Outputs:
 *   src/app/favicon.ico    16 + 32 + 48px, PNG-compressed ICO
 *   src/app/apple-icon.png 180x180 for iOS home screens
 *   public/icon-192.png    PWA manifest icons
 *   public/icon-512.png
 *
 * Generated as static files rather than through ImageResponse so they cost
 * nothing at build time and never depend on a font fetch.
 */

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const SVG = "src/app/icon.svg";

/** Packs PNG buffers into an ICO container. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colours
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((image) => image.data),
  ]);
}

async function main() {
  const svg = await readFile(SVG);
  // High density so librsvg rasterises the strokes cleanly before downscaling.
  const render = (size) =>
    sharp(svg, { density: 600 }).resize(size, size).png({ compressionLevel: 9 });

  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      data: await render(size).toBuffer(),
    })),
  );
  await writeFile("src/app/favicon.ico", buildIco(icoImages));
  console.log(`src/app/favicon.ico    ${icoSizes.join(", ")}px`);

  for (const [path, size] of [
    ["src/app/apple-icon.png", 180],
    ["public/icon-192.png", 192],
    ["public/icon-512.png", 512],
  ]) {
    await render(size).toFile(path);
    console.log(`${path.padEnd(22)} ${size}px`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
