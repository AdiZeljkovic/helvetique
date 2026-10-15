/**
 * Stock photography fetcher
 * -------------------------
 * Downloads the selected photographs and crops each one to the aspect ratio
 * its slot in the layout expects. Output goes to /public/images using the file
 * names referenced by src/content/images.ts.
 *
 * Sources: Unsplash (Unsplash License: free for commercial use, no attribution
 * required) and, for the Sarajevo panorama, Pexels (Pexels License, same terms).
 * Never add Unsplash+ photos (served from plus.unsplash.com): they need a paid
 * licence.
 *
 * To swap a photo, change its `url` here or replace the JPG in /public/images
 * by hand. The `page` link is the photo's public page, kept for credits.
 *
 * Usage:  node scripts/fetch-stock-photos.mjs            (all photos)
 *         node scripts/fetch-stock-photos.mjs hero.jpg   (only the named files)
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");

const unsplash = (path) => `https://images.unsplash.com/${path}?fm=jpg&q=92&w=2600`;
const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2600`;

/**
 * file name → source, target size (px) and crop focus.
 * `top` (0–1) crops a band starting at that fraction of the source height,
 * for portrait sources that need a precise landscape slice.
 */
const photos = [
  // Selected by the client
  { file: "hero.jpg", page: "https://unsplash.com/photos/IE0m2PUI4Fg", url: unsplash("photo-1774199496664-a9690967be5a"), width: 1920, height: 1280, position: "centre" },
  { file: "feature-main.jpg", page: "https://unsplash.com/photos/NfyeP5Bcvd8", url: unsplash("photo-1771354959667-96360bf59eab"), width: 1920, height: 1280, position: "centre" },
  { file: "feature-detail.jpg", page: "https://unsplash.com/photos/FVaimgno3dw", url: unsplash("flagged/photo-1563901260730-6f3e028b2c68"), width: 1200, height: 1600, position: "centre" },
  { file: "expertise-interiors.jpg", page: "https://unsplash.com/photos/qBViGIC3oYs", url: unsplash("photo-1758975715211-3f56eb1056ab"), width: 1200, height: 1500, position: "centre" },
  { file: "expertise-bespoke.jpg", page: "https://unsplash.com/photos/RHARVor_ydc", url: unsplash("photo-1643949914877-b20f30792c1e"), width: 1200, height: 1500, position: "centre" },
  // Chosen to match the client's selection
  { file: "expertise-architecture.jpg", page: "https://unsplash.com/photos/6qYc5LF7jXk", url: unsplash("photo-1785943013946-2bf34e83fde9"), width: 1200, height: 1500, position: "centre" },
  { file: "expertise-coordination.jpg", page: "https://unsplash.com/photos/fNxmdlYHRm8", url: unsplash("photo-1762146828422-50a8bd416d3c"), width: 1200, height: 1500, position: "centre" },
  { file: "philosophy.jpg", page: "https://unsplash.com/photos/bE1NBPm_cNk", url: unsplash("photo-1778034506255-ad33053cbbdd"), width: 1920, height: 1200, position: "centre", top: 0.36 },
  { file: "portfolio-architecture.jpg", page: "https://unsplash.com/photos/5yo3y7mUbVw", url: unsplash("photo-1760622728626-fdd0e7559cce"), width: 1200, height: 1500, position: "centre" },
  { file: "portfolio-interiors.jpg", page: "https://unsplash.com/photos/aX1TTOuq83M", url: unsplash("photo-1585128792020-803d29415281"), width: 1200, height: 1500, position: "centre" },
  { file: "portfolio-details.jpg", page: "https://unsplash.com/photos/0B7ijYKaKcE", url: unsplash("photo-1601993957728-1e56ab70c5a8"), width: 1200, height: 1500, position: "centre" },
  { file: "portfolio-bespoke.jpg", page: "https://unsplash.com/photos/mFH9FNydifw", url: unsplash("photo-1647481045013-8efc5594369d"), width: 1200, height: 1500, position: "centre" },
  // Sarajevo panorama
  { file: "presence.jpg", page: "https://www.pexels.com/photo/3581824/", url: pexels(3581824), width: 1920, height: 1200, position: "centre" },
];

const only = new Set(process.argv.slice(2));
const selected = only.size ? photos.filter((p) => only.has(p.file)) : photos;

await mkdir(OUT, { recursive: true });

for (const photo of selected) {
  const response = await fetch(photo.url);
  if (!response.ok) throw new Error(`Download failed for ${photo.file}: ${response.status}`);
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
    // Sized to the largest width Next.js serves (deviceSizes tops out at 1920);
    // Next re-encodes to AVIF/WebP, so these masters only need to be clean, not lossless.
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OUT, photo.file));

  console.log(`${photo.file}  ←  ${photo.page}  (${meta.width}×${meta.height} → ${photo.width}×${photo.height})`);
}
