/**
 * Photoshoot pipeline — the high-res studio set.
 *
 *   node scripts/optimize-photoshoot.mjs
 *
 * Reads camera originals from photoshoot-src/ (kept out of public/ so the
 * 8 MB raws are never deployed, and gitignored) and writes, per frame:
 *
 *   public/photos/<name>.webp            display copy, long edge 2560px — these
 *                                        run full-bleed, so larger than the
 *                                        gallery set's 2000px
 *   public/photos/originals/<name>.jpg   download copy, long edge 3200px
 *
 * `crop` trims the studio clutter (light stands at the frame edges) and is in
 * fractions of the upright frame. Anything without a mapping (including the
 * frames parked in photoshoot-src/unused/) is skipped.
 *
 * Prints the output dimensions — copy them into src/lib/photos.ts.
 */

import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const SRC = "photoshoot-src";
const OUT = "public/photos";

/** source file -> { name: SEO filename without extension, crop? } */
const FRAMES = {
  "1F3A8861.JPG": { name: "kaushik-bhat-tabla-hero-wide" },
  "1F3A8714.JPG": { name: "kaushik-bhat-tabla-hero-portrait" },
  "1F3A8741.JPG": { name: "kaushik-bhat-tabla-cream-kurta-playing" },
  "1F3A8745.JPG": { name: "kaushik-bhat-tabla-studio-cream-kurta" },
  "1F3A8777.JPG": { name: "kaushik-bhat-tabla-full-set" },
  "1F3A8789.JPG": {
    name: "kaushik-bhat-tabla-playing-studio",
    crop: { left: 0.045, top: 0, width: 0.93, height: 1 },
  },
  "1F3A8888.JPG": {
    name: "kaushik-bhat-tabla-tuning",
    crop: { left: 0.13, top: 0, width: 0.855, height: 1 },
  },
  "1F3A8922.JPG": { name: "kaushik-bhat-tabla-teacher-jp-nagar-studio" },
  "1F3A8933.JPG": { name: "kaushik-bhat-standing-portrait" },
  "1F3A8979.JPG": { name: "kaushik-bhat-with-tabla-portrait" },
};

const DISPLAY_MAX = 2560;
const DOWNLOAD_MAX = 3200;

const kb = (bytes) => (bytes / 1024).toFixed(0) + " KB";

async function upright(file, crop) {
  // Rotate to a buffer first: an extract chained before rotate() would be
  // measured against the sideways sensor frame.
  const { data, info } = await sharp(path.join(SRC, file))
    .rotate()
    .toBuffer({ resolveWithObject: true });

  let image = sharp(data);
  if (crop) {
    image = image.extract({
      left: Math.round(crop.left * info.width),
      top: Math.round(crop.top * info.height),
      width: Math.round(crop.width * info.width),
      height: Math.round(crop.height * info.height),
    });
  }
  return image.toBuffer();
}

async function main() {
  const files = (await readdir(SRC, { withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  for (const file of files) {
    const frame = FRAMES[file];
    if (!frame) {
      console.warn(`- ${file} not mapped — skipped.`);
      continue;
    }

    const source = await upright(file, frame.crop);

    const display = path.join(OUT, `${frame.name}.webp`);
    const { width, height } = await sharp(source)
      .resize(DISPLAY_MAX, DISPLAY_MAX, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(display);

    const download = path.join(OUT, "originals", `${frame.name}.jpg`);
    await sharp(source)
      .resize(DOWNLOAD_MAX, DOWNLOAD_MAX, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(download);

    console.log(
      `${file.padEnd(14)} -> ${frame.name}  ${width}x${height}  ` +
        `webp ${kb(statSync(display).size)}  jpg ${kb(statSync(download).size)}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
