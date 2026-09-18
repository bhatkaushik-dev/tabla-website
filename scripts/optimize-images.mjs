/**
 * One-off image pipeline.
 *
 *   node scripts/optimize-images.mjs
 *
 * Reads the camera originals from public/my-tabla-photos/ and writes two sets
 * into public/photos/:
 *
 *   <seo-name>.webp            display copy, max 2000px long edge  -> <img>
 *   originals/<seo-name>.jpg   full-res copy, max 3000px long edge -> download button
 *
 * Three of the source files (the 2W4A* stage shots) are portraits stored
 * sideways with EXIF orientation 8, so every pipeline starts with .rotate()
 * to bake the orientation in — WebP output would otherwise drop the EXIF tag
 * and the photo would render on its side.
 */

import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const SRC = "public/my-tabla-photos";
const OUT = "public/photos";
const OUT_ORIGINALS = path.join(OUT, "originals");

/** source file -> SEO filename (without extension) */
const RENAMES = {
  "2W4A4238.jpeg": "kaushik-bhat-tabla-artist-concert-bangalore",
  "2W4A4394.jpeg": "kaushik-bhat-tabla-solo-performance",
  "2W4A4260.jpeg": "kaushik-bhat-tabla-classical-concert",
  "IMG_7679.png": "kaushik-bhat-tabla-recital",
  "IMG_8769.jpeg": "kaushik-bhat-tabla-accompaniment",
  "IMG_8770.jpeg": "kaushik-bhat-tabla-outdoor-session",
  "IMG_8771.jpeg": "kaushik-bhat-tabla-portrait",
  "IMG_8772.jpeg": "kaushik-bhat-tabla-studio-portrait",
  "IMG_8773.jpeg": "kaushik-bhat-tabla-nature-riyaz",
  "a6a15c19-bbd1-497d-83c0-429cd50675fe.jpeg":
    "kaushik-bhat-tabla-teacher-jp-nagar",
  "b8be32dc-6fba-4246-8471-17c258808488.jpeg":
    "kaushik-bhat-tabla-stage-performance",
};

const DISPLAY_MAX = 2000;
const ORIGINAL_MAX = 3000;

const mb = (bytes) => (bytes / 1048576).toFixed(2) + " MB";

async function main() {
  await mkdir(OUT_ORIGINALS, { recursive: true });

  const files = await readdir(SRC);
  const missing = files.filter((f) => !RENAMES[f]);
  if (missing.length) {
    console.warn(`! No rename mapped for: ${missing.join(", ")} — skipped.`);
  }

  const manifest = [];
  let srcBytes = 0;
  let outBytes = 0;

  for (const file of files) {
    const name = RENAMES[file];
    if (!name) continue;

    const src = path.join(SRC, file);
    srcBytes += statSync(src).size;

    // .rotate() with no argument applies the EXIF orientation and clears the tag.
    const display = path.join(OUT, `${name}.webp`);
    const { width, height } = await sharp(src)
      .rotate()
      .resize(DISPLAY_MAX, DISPLAY_MAX, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(display);

    const original = path.join(OUT_ORIGINALS, `${name}.jpg`);
    await sharp(src)
      .rotate()
      .resize(ORIGINAL_MAX, ORIGINAL_MAX, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(original);

    outBytes += statSync(display).size + statSync(original).size;
    manifest.push({ name, width, height, src: file });

    console.log(
      `${file.padEnd(46)} -> ${name}.webp  ${width}x${height}  ${mb(
        statSync(display).size,
      )}`,
    );
  }

  // Intrinsic dimensions are needed by next/image at build time; dumping them
  // here keeps src/lib/photos.ts honest if the sources are ever re-exported.
  await writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(`\nsource: ${mb(srcBytes)}  ->  output: ${mb(outBytes)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
