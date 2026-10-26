/**
 * Brand asset generator
 * ---------------------
 * Renders the derived icon files from the monogram in src/app/icon.svg
 * (the browser tab icon). The logo itself needs no derived files: the site
 * serves the master PNG through next/image at the size it is shown.
 *
 * Output:
 *   src/app/apple-icon.png                180 × 180, iOS home screen
 *   src/app/favicon.ico                   16/32/48, legacy browsers and /favicon.ico
 *   public/brand/icon-192.png, -512.png   web app manifest
 *
 * Usage: node scripts/generate-brand-assets.mjs
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const appDir = join(root, "src", "app");
const brandDir = join(root, "public", "brand");

const iconSvg = await readFile(join(appDir, "icon.svg"));
const renderIcon = (size) => sharp(iconSvg, { density: 72 * (size / 64) }).resize(size, size).png().toBuffer();

/** Packs PNG images into an .ico container (PNG entries are valid in every current browser). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

await writeFile(join(appDir, "apple-icon.png"), await renderIcon(180));
await writeFile(join(brandDir, "icon-192.png"), await renderIcon(192));
await writeFile(join(brandDir, "icon-512.png"), await renderIcon(512));

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await renderIcon(size) })));
await writeFile(join(appDir, "favicon.ico"), toIco(icoImages));

console.log("apple-icon.png, favicon.ico, icon-192.png, icon-512.png written");
