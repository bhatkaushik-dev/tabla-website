/**
 * Builds every app icon from assets/icon-source.png (the framed tabla pair).
 *
 *   node scripts/generate-icons.mjs
 *
 * Outputs:
 *   src/app/icon.png       512x512, the <link rel="icon"> browsers and Google prefer
 *   src/app/favicon.ico    16 + 32 + 48px, PNG-compressed ICO
 *   src/app/apple-icon.png 180x180 for iOS home screens
 *   public/icon-192.png    PWA manifest icons
 *   public/icon-512.png
 *
 * Two crops, not one. The source is a photograph inside a navy ring, and a
 * photograph does not survive being shrunk to 16px — at that size the drums
 * collapse into a brown smudge. So the small ICO entry is cropped inside the
 * ring and pushed for contrast, which keeps two distinguishable drum heads,
 * while every larger size keeps the ring because at 32px and up it reads as a
 * logo rather than a snapshot. An ICO can carry different artwork per size,
 * which is exactly the escape hatch this needs.
 *
 * Generated as static files rather than through ImageResponse so they cost
 * nothing at build time and never depend on a font fetch.
 */

import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SOURCE = "assets/icon-source.png";

/** Size at or below which the zoomed crop wins over the ringed one. */
const SMALL_ICON_MAX = 16;

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
  // The source sits on a white page margin. Trim it off so the ring reaches
  // the edge of the icon instead of floating in a box, then square it up —
  // trim leaves 751x763, and a favicon that is not square gets stretched.
  const trimmed = await sharp(SOURCE).trim({ threshold: 10 }).toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  const side = Math.max(width, height);

  const ringed = await sharp(trimmed)
    .resize(side, side, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .png()
    .toBuffer();

  // Drop the ring and the surrounding white, so the drums themselves fill the
  // frame. 13% off each edge is where the ring ends on this source.
  const inset = Math.round(side * 0.13);
  const zoomed = await sharp(ringed)
    .extract({
      left: inset,
      top: inset,
      width: side - inset * 2,
      height: side - inset * 2,
    })
    // Downscaling to 16px washes the photo out; this buys back the separation
    // between the two drum heads that makes the shape readable at all.
    .modulate({ saturation: 1.45, brightness: 1.06 })
    .linear(1.25, -22)
    .png()
    .toBuffer();

  const scaled = (size) =>
    sharp(size <= SMALL_ICON_MAX ? zoomed : ringed).resize(size, size);

  // Two encoders, because the two containers disagree. A PNG inside an ICO
  // must be RGBA — a paletted one fails to decode, and Turbopack rejects the
  // whole build over it. Standalone PNGs have no such rule, so those get
  // quantised to 256 colours, which takes the 512px icon from ~520KB to
  // ~130KB; it is a photograph at icon size, so nobody inspects the gradients.
  const renderIco = (size) =>
    scaled(size).ensureAlpha().png({ compressionLevel: 9 });
  const renderPng = (size) =>
    scaled(size).png({
      compressionLevel: 9,
      palette: true,
      quality: 90,
      effort: 10,
    });

  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      data: await renderIco(size).toBuffer(),
    })),
  );
  await writeFile("src/app/favicon.ico", buildIco(icoImages));
  console.log(`src/app/favicon.ico    ${icoSizes.join(", ")}px`);

  for (const [path, size] of [
    ["src/app/icon.png", 512],
    ["src/app/apple-icon.png", 180],
    ["public/icon-192.png", 192],
    ["public/icon-512.png", 512],
  ]) {
    await renderPng(size).toFile(path);
    console.log(`${path.padEnd(22)} ${size}px`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
