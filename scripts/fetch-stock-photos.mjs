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

/** file name → Pexels photo id, target size (px) and crop focus */
const photos = [
  { file: "hero.jpg", id: 8751643, width: 1600, height: 2000, position: "centre" },
  { file: "feature-main.jpg", id: 12953661, width: 2000, height: 1333, position: "centre" },
  { file: "feature-detail.jpg", id: 5320146, width: 1200, height: 1600, position: "centre" },
  { file: "philosophy.jpg", id: 5015876, width: 1600, height: 2000, position: "centre" },
  { file: "portfolio-architecture.jpg", id: 9458996, width: 1600, height: 1200, position: "centre" },
  { file: "portfolio-interiors.jpg", id: 7303782, width: 1200, height: 1600, position: "centre" },
  { file: "portfolio-bespoke.jpg", id: 5579239, width: 2000, height: 1000, position: "centre" },
  { file: "portfolio-details.jpg", id: 13041128, width: 1200, height: 1200, position: "centre" },
  { file: "connection.jpg", id: 9683985, width: 1400, height: 1750, position: "centre" },
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

  await sharp(source)
    .resize(photo.width, photo.height, { fit: "cover", position: photo.position, withoutEnlargement: false })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(join(OUT, photo.file));

  console.log(`${photo.file}  ←  pexels #${photo.id}  (${meta.width}×${meta.height} → ${photo.width}×${photo.height})`);
}
