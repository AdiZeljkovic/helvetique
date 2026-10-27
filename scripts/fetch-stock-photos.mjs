/**
 * Photography fetcher
 * -------------------
 * Downloads (or reads) the selected photographs and crops each one to the
 * aspect ratio its slot in the layout expects. Output goes to /public/images
 * using the file names referenced by src/content/images.ts.
 *
 * Sources:
 *  - the client's own project photographs (`local`), read from the folder in
 *    CLIENT_PHOTOS_DIR. The originals are large and are not kept in the
 *    repository; without that variable these entries are skipped.
 *  - Unsplash (Unsplash License: free for commercial use, no attribution
 *    required). Never add Unsplash+ photos (served from plus.unsplash.com) or
 *    watermarked previews from iStock and similar: they need a paid licence.
 *
 * To swap a photo, change its `url` here or replace the JPG in /public/images
 * by hand. The `page` link is the photo's public page, kept for credits.
 *
 * Usage:  node scripts/fetch-stock-photos.mjs            (all photos)
 *         node scripts/fetch-stock-photos.mjs hero.jpg   (only the named files)
 *         CLIENT_PHOTOS_DIR=/path/to/originals node scripts/fetch-stock-photos.mjs
 */
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const CLIENT_DIR = process.env.CLIENT_PHOTOS_DIR;

const unsplash = (path) => `https://images.unsplash.com/${path}?fm=jpg&q=92&w=2600`;

/**
 * file name → source, target size (px) and crop focus.
 * `top` (0–1) crops a band starting at that fraction of the source height,
 * for portrait sources that need a precise landscape slice.
 */
const photos = [
  // The client's own projects
  { file: "expertise-doors.jpg", page: "Client project photograph (vrata.jpg)", local: "vrata.jpg", width: 1200, height: 1500, position: "centre" },
  { file: "expertise-details.jpg", page: "Client project photograph (detalji.jpg)", local: "detalji.jpg", width: 1200, height: 1500, position: "centre" },
  // Selected by the client
  { file: "hero.jpg", page: "https://unsplash.com/photos/IE0m2PUI4Fg", url: unsplash("photo-1774199496664-a9690967be5a"), width: 1920, height: 1280, position: "centre" },
  { file: "feature-main.jpg", page: "https://unsplash.com/photos/NfyeP5Bcvd8", url: unsplash("photo-1771354959667-96360bf59eab"), width: 1920, height: 1280, position: "centre" },
  { file: "feature-detail.jpg", page: "https://unsplash.com/photos/FVaimgno3dw", url: unsplash("flagged/photo-1563901260730-6f3e028b2c68"), width: 1200, height: 1600, position: "centre" },
  { file: "expertise-bespoke.jpg", page: "https://unsplash.com/photos/RHARVor_ydc", url: unsplash("photo-1643949914877-b20f30792c1e"), width: 1200, height: 1500, position: "centre" },
  // Chosen to match the client's selection and references
  { file: "expertise-interiors.jpg", page: "https://unsplash.com/photos/wH7J4LAkQ7M", url: unsplash("photo-1752407828551-a5c11b213472"), width: 1200, height: 1500, position: "centre" },
  { file: "philosophy.jpg", page: "https://unsplash.com/photos/bE1NBPm_cNk", url: unsplash("photo-1778034506255-ad33053cbbdd"), width: 1920, height: 1200, position: "centre", top: 0.36 },
  { file: "portfolio-interiors.jpg", page: "https://unsplash.com/photos/ehxwis6Ltxg", url: unsplash("photo-1583329550487-0fa300a4cd1a"), width: 1200, height: 1500, position: "bottom" },
  { file: "portfolio-doors.jpg", page: "https://unsplash.com/photos/ZdBTkh7jHmg", url: unsplash("photo-1561111283-8eff0e921cf6"), width: 1200, height: 1500, position: "centre" },
  { file: "portfolio-details.jpg", page: "https://unsplash.com/photos/WQNH3LhQIsE", url: unsplash("photo-1788042282155-67efd082be53"), width: 1200, height: 1500, position: "centre" },
  { file: "portfolio-bespoke.jpg", page: "https://unsplash.com/photos/mFH9FNydifw", url: unsplash("photo-1647481045013-8efc5594369d"), width: 1200, height: 1500, position: "centre" },
];

const only = new Set(process.argv.slice(2));
const selected = only.size ? photos.filter((p) => only.has(p.file)) : photos;

async function loadSource(photo) {
  if (photo.local) {
    if (!CLIENT_DIR) return null;
    return readFile(join(CLIENT_DIR, photo.local));
  }
  const response = await fetch(photo.url);
  if (!response.ok) throw new Error(`Download failed for ${photo.file}: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

await mkdir(OUT, { recursive: true });

for (const photo of selected) {
  const raw = await loadSource(photo);
  if (!raw) {
    console.warn(`${photo.file}  skipped: set CLIENT_PHOTOS_DIR to the folder with ${photo.local}`);
    continue;
  }
  // Apply EXIF orientation first, so phone and camera originals crop the right way up.
  const source = await sharp(raw).rotate().toBuffer();
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
