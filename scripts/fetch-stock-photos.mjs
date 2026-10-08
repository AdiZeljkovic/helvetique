/**
 * Stock photography fetcher
 * -------------------------
 * Downloads the selected Pexels photographs (Pexels License: free for
 * commercial use, no attribution required) and crops each one to the aspect
 * ratio its slot in the layout expects. Output goes to /public/images using
 * the file names referenced by src/content/images.ts.
 *
 * To swap a photo, change the `id` here (the number in the Pexels URL) or
 * simply replace the JPG in /public/images by hand.
 *
 * Usage:  node scripts/fetch-stock-photos.mjs            (all photos)
 *         node scripts/fetch-stock-photos.mjs hero.jpg   (only the named files)
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");

/**
 * file name → Pexels photo id, target size (px) and crop focus.
 * `top` (0–1) crops a band starting at that fraction of the source height,
 * for portrait sources that need a precise landscape slice.
 */
const photos = [
  { file: "hero.jpg", id: 133576, width: 2400, height: 1600, position: "centre" },
  { file: "feature-main.jpg", id: 3559252, width: 2000, height: 1333, position: "centre" },
  { file: "feature-detail.jpg", id: 5320146, width: 1200, height: 1600, position: "centre" },
  { file: "presence.jpg", id: 3581824, width: 2400, height: 1500, position: "centre" },
  { file: "expertise-architecture.jpg", id: 14172040, width: 1600, height: 2000, position: "centre" },
  { file: "expertise-interiors.jpg", id: 6615806, width: 1600, height: 2000, position: "centre" },
  { file: "expertise-bespoke.jpg", id: 7483040, width: 1600, height: 2000, position: "centre" },
  { file: "expertise-coordination.jpg", id: 6282080, width: 1600, height: 2000, position: "centre" },
  { file: "philosophy.jpg", id: 5015876, width: 2400, height: 1500, position: "centre", top: 0.33 },
  { file: "portfolio-architecture.jpg", id: 9458996, width: 1600, height: 1200, position: "centre" },
  { file: "portfolio-interiors.jpg", id: 7303782, width: 1200, height: 1600, position: "centre" },
  { file: "portfolio-bespoke.jpg", id: 9819644, width: 2000, height: 1250, position: "centre" },
  { file: "portfolio-details.jpg", id: 13041128, width: 1200, height: 1200, position: "centre" },
];

const only = new Set(process.argv.slice(2));
const selected = only.size ? photos.filter((p) => only.has(p.file)) : photos;

await mkdir(OUT, { recursive: true });

for (const photo of selected) {
  const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=2600`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed for ${photo.id}: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const meta = await sharp(source).metadata();

  let pipeline = sharp(source);
  if (typeof photo.top === "number" && meta.width && meta.height) {
    const bandHeight = Math.min(meta.height, Math.round((meta.width * photo.height) / photo.width));
    const top = Math.min(meta.height - bandHeight, Math.round(meta.height * photo.top));
    pipeline = pipeline.extract({ left: 0, top, width: meta.width, height: bandHeight });
  }
  await pipeline
    .resize(photo.width, photo.height, { fit: "cover", position: photo.position, withoutEnlargement: false })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(join(OUT, photo.file));

  console.log(`${photo.file}  ←  pexels #${photo.id}  (${meta.width}×${meta.height} → ${photo.width}×${photo.height})`);
}
