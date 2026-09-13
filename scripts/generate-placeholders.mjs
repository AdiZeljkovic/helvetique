/**
 * Placeholder photography generator
 * ----------------------------------
 * The studio does not yet have project photography in this repository.
 * This script renders quiet, abstract "architectural studies" in the brand
 * palette (plaster, stone, shadow, light) so that layout, cropping and
 * responsive behaviour can be judged with realistic proportions.
 *
 * To replace them with real photography, drop files with the SAME names
 * into /public/images. Nothing else needs to change (see /public/images/README.md
 * and /src/content/images.ts).
 *
 * Usage:  node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");

const T = {
  light: "#F6F1E6",
  ivory: "#F3F0E9",
  plaster: "#E6E0D4",
  beige: "#DED7CC",
  stone: "#C9C0B3",
  stoneDeep: "#B3A99A",
  shade: "#8E877C",
  umber: "#5F5A53",
  timber: "#A38B70",
  timberDeep: "#7E6A53",
  charcoal: "#2A2825",
  black: "#1B1A18",
};

const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>`;

const grainRect = (w, h, o = 0.07) =>
  `<rect width="${w}" height="${h}" filter="url(#grain)" opacity="${o}" style="mix-blend-mode:multiply"/>`;

const lin = (id, x1, y1, x2, y2, stops) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("")}</linearGradient>`;

const svg = (w, h, defs, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${grain}${defs}</defs>${body}${grainRect(
    w,
    h,
  )}</svg>`;

/* ---------- compositions ---------- */

// Tall interior wall with a single opening and cast light. (Hero)
function hero(w = 1600, h = 2000) {
  const defs =
    lin("wall", 0, 0, 1, 1, [
      [0, T.plaster],
      [0.55, T.beige],
      [1, T.stone],
    ]) +
    lin("floor", 0, 0, 0, 1, [
      [0, T.stoneDeep],
      [1, T.shade],
    ]) +
    lin("light", 0, 0, 1, 1, [
      [0, T.light, 0.9],
      [1, T.light, 0.0],
    ]) +
    lin("view", 0, 0, 0, 1, [
      [0, T.beige],
      [1, T.stone],
    ]);
  const floorY = h * 0.72;
  const ox = w * 0.58,
    oy = h * 0.12,
    ow = w * 0.22,
    oh = h * 0.6;
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#wall)"/>
     <rect y="${floorY}" width="${w}" height="${h - floorY}" fill="url(#floor)"/>
     <rect x="${ox - 22}" y="${oy - 22}" width="${ow + 44}" height="${oh + 44}" fill="${T.charcoal}"/>
     <rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="url(#view)"/>
     <rect x="${ox + ow / 2 - 4}" y="${oy}" width="8" height="${oh}" fill="${T.black}"/>
     <polygon points="${ox - 40},${floorY} ${ox + ow + 60},${floorY} ${ox + ow - w * 0.05},${h} ${ox - w * 0.28},${h}" fill="url(#light)"/>
     <rect x="${w * 0.12}" y="${h * 0.12}" width="2" height="${h * 0.6}" fill="${T.stoneDeep}" opacity="0.6"/>
     <rect y="${floorY}" width="${w}" height="3" fill="${T.umber}" opacity="0.5"/>`,
  );
}

// Horizontal concrete bands with a deep shadow line. (Feature, main)
function featureMain(w = 2000, h = 1333) {
  const defs =
    lin("sky", 0, 0, 0, 1, [
      [0, T.light],
      [1, T.plaster],
    ]) +
    lin("band", 0, 0, 1, 0, [
      [0, T.stone],
      [1, T.beige],
    ]) +
    lin("shadow", 0, 0, 0, 1, [
      [0, T.umber],
      [1, T.shade],
    ]);
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#sky)"/>
     <rect y="${h * 0.34}" width="${w}" height="${h * 0.66}" fill="url(#band)"/>
     <rect y="${h * 0.34}" width="${w}" height="${h * 0.06}" fill="url(#shadow)"/>
     <rect y="${h * 0.56}" width="${w}" height="${h * 0.05}" fill="url(#shadow)" opacity="0.8"/>
     <rect y="${h * 0.61}" width="${w}" height="${h * 0.39}" fill="${T.stoneDeep}"/>
     <rect y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="${T.shade}"/>
     <rect x="${w * 0.66}" y="${h * 0.34}" width="${w * 0.012}" height="${h * 0.66}" fill="${T.charcoal}"/>
     <rect x="${w * 0.18}" y="0" width="${w * 0.006}" height="${h * 0.34}" fill="${T.stone}" opacity="0.7"/>`,
  );
}

// Two planes meeting in a corner, diagonal daylight. (Feature, detail)
function featureDetail(w = 1200, h = 1600) {
  const defs =
    lin("lp", 0, 0, 1, 0, [
      [0, T.light],
      [1, T.plaster],
    ]) +
    lin("rp", 0, 0, 1, 1, [
      [0, T.shade],
      [1, T.umber],
    ]) +
    lin("beam", 0, 0, 0, 1, [
      [0, T.light, 0.85],
      [1, T.light, 0.05],
    ]);
  const cx = w * 0.46;
  return svg(
    w,
    h,
    defs,
    `<rect width="${cx}" height="${h}" fill="url(#lp)"/>
     <rect x="${cx}" width="${w - cx}" height="${h}" fill="url(#rp)"/>
     <polygon points="${cx},${h * 0.18} ${w},${h * 0.02} ${w},${h * 0.42} ${cx},${h * 0.66}" fill="url(#beam)"/>
     <rect x="${cx - 3}" width="6" height="${h}" fill="${T.charcoal}" opacity="0.55"/>
     <rect y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="${T.stoneDeep}"/>`,
  );
}

// Dark room, one vertical slit of light. (Philosophy)
function philosophy(w = 1600, h = 2000) {
  const defs =
    lin("room", 0, 0, 1, 1, [
      [0, T.charcoal],
      [1, T.black],
    ]) +
    lin("slit", 0, 0, 0, 1, [
      [0, T.light],
      [0.7, T.stone],
      [1, T.shade],
    ]) +
    lin("spill", 0, 0, 1, 0, [
      [0, T.stone, 0.55],
      [1, T.stone, 0],
    ]) +
    lin("floorR", 0, 0, 0, 1, [
      [0, T.umber, 0.6],
      [1, T.black, 0],
    ]);
  const sx = w * 0.4;
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#room)"/>
     <rect x="${sx}" y="0" width="${w * 0.085}" height="${h * 0.76}" fill="url(#slit)"/>
     <rect x="${sx + w * 0.085}" y="0" width="${w * 0.4}" height="${h * 0.76}" fill="url(#spill)"/>
     <rect y="${h * 0.76}" width="${w}" height="${h * 0.24}" fill="url(#floorR)"/>
     <rect x="${sx}" y="${h * 0.76}" width="${w * 0.085}" height="${h * 0.24}" fill="${T.stoneDeep}" opacity="0.35"/>`,
  );
}

// Facade grid, steel and light panels. (Portfolio: Architecture)
function architecture(w = 1600, h = 1200) {
  const defs = lin("panel", 0, 0, 0, 1, [
    [0, T.plaster],
    [1, T.stone],
  ]);
  const cols = 5,
    rows = 3;
  const cw = w / cols,
    rh = h / rows;
  let cells = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dark = (r + c) % 4 === 0;
      cells += `<rect x="${c * cw + 10}" y="${r * rh + 10}" width="${cw - 20}" height="${rh - 20}" fill="${
        dark ? T.umber : "url(#panel)"
      }"/>`;
    }
  }
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="${T.charcoal}"/>${cells}
     <rect y="${h * 0.66}" width="${w}" height="${h * 0.34}" fill="${T.black}" opacity="0.35"/>`,
  );
}

// Warm timber wall and linen light. (Portfolio: Interiors)
function interiors(w = 1200, h = 1600) {
  const defs =
    lin("wood", 0, 0, 1, 0, [
      [0, T.timberDeep],
      [1, T.timber],
    ]) +
    lin("linen", 0, 0, 0, 1, [
      [0, T.light],
      [1, T.beige],
    ]);
  let slats = "";
  for (let i = 0; i < 18; i++) {
    slats += `<rect x="0" y="${(h / 18) * i}" width="${w * 0.55}" height="2" fill="${T.black}" opacity="0.25"/>`;
  }
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#linen)"/>
     <rect width="${w * 0.55}" height="${h}" fill="url(#wood)"/>${slats}
     <rect x="${w * 0.55}" width="${w * 0.45}" height="${h * 0.62}" fill="${T.plaster}"/>
     <rect x="${w * 0.55}" y="${h * 0.62}" width="${w * 0.45}" height="${h * 0.38}" fill="${T.stone}"/>
     <rect x="${w * 0.55 - 3}" width="6" height="${h}" fill="${T.charcoal}" opacity="0.6"/>`,
  );
}

// Low plinth in a wide field of light. (Portfolio: Bespoke Spaces)
function bespoke(w = 2000, h = 1000) {
  const defs =
    lin("field", 0, 0, 0, 1, [
      [0, T.light],
      [0.6, T.plaster],
      [1, T.beige],
    ]) +
    lin("plinth", 0, 0, 1, 0, [
      [0, T.umber],
      [1, T.shade],
    ]);
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#field)"/>
     <rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="${T.stone}"/>
     <rect x="${w * 0.28}" y="${h * 0.52}" width="${w * 0.44}" height="${h * 0.18}" fill="url(#plinth)"/>
     <rect x="${w * 0.28}" y="${h * 0.7}" width="${w * 0.44}" height="${h * 0.03}" fill="${T.black}" opacity="0.35"/>
     <rect x="${w * 0.72}" y="${h * 0.14}" width="2" height="${h * 0.38}" fill="${T.stoneDeep}" opacity="0.6"/>`,
  );
}

// Close joint between two materials. (Portfolio: Details)
function details(w = 1200, h = 1200) {
  const defs =
    lin("a", 0, 0, 1, 0, [
      [0, T.plaster],
      [1, T.beige],
    ]) +
    lin("b", 0, 0, 0, 1, [
      [0, T.stoneDeep],
      [1, T.shade],
    ]);
  return svg(
    w,
    h,
    defs,
    `<rect width="${w}" height="${h}" fill="url(#a)"/>
     <rect y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="url(#b)"/>
     <rect y="${h * 0.58 - 5}" width="${w}" height="10" fill="${T.black}" opacity="0.7"/>
     <rect x="${w * 0.62}" width="${w * 0.38}" height="${h * 0.58}" fill="${T.light}" opacity="0.6"/>`,
  );
}

const jobs = [
  ["hero.jpg", hero()],
  ["feature-main.jpg", featureMain()],
  ["feature-detail.jpg", featureDetail()],
  ["philosophy.jpg", philosophy()],
  ["portfolio-architecture.jpg", architecture()],
  ["portfolio-interiors.jpg", interiors()],
  ["portfolio-bespoke.jpg", bespoke()],
  ["portfolio-details.jpg", details()],
];

await mkdir(OUT, { recursive: true });
for (const [name, markup] of jobs) {
  await sharp(Buffer.from(markup))
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(join(OUT, name));
  console.log("wrote", name);
}
