# Photography

The photographs in this folder are stock images from [Pexels](https://www.pexels.com),
published under the [Pexels License](https://www.pexels.com/license/): free for
commercial use, no attribution required, but they must not be sold unaltered or
used to imply endorsement. They were fetched and cropped by
`scripts/fetch-stock-photos.mjs`.

| File                         | Used in                   | Aspect | Source                                                                                  |
| ---------------------------- | ------------------------- | ------ | --------------------------------------------------------------------------------------- |
| `hero.jpg`                   | Hero, full screen         | 3:2    | https://www.pexels.com/photo/133576/                                                    |
| `feature-main.jpg`           | Image break, main         | 3:2    | https://www.pexels.com/photo/3559252/                                                   |
| `feature-detail.jpg`         | Image break, detail       | 3:4    | https://www.pexels.com/photo/a-concrete-wall-5320146/                                   |
| `presence.jpg`               | Presence in BiH           | 16:10  | https://www.pexels.com/photo/3581824/                                                   |
| `expertise-architecture.jpg` | Expertise panel           | 4:5    | https://www.pexels.com/photo/14172040/                                                  |
| `expertise-interiors.jpg`    | Expertise panel           | 4:5    | https://www.pexels.com/photo/6615806/                                                   |
| `expertise-bespoke.jpg`      | Expertise panel           | 4:5    | https://www.pexels.com/photo/7483040/                                                   |
| `expertise-coordination.jpg` | Expertise panel           | 4:5    | https://www.pexels.com/photo/6282080/                                                   |
| `philosophy.jpg`             | Approach, full-bleed      | 16:10  | https://www.pexels.com/photo/sunlight-on-floor-5015876/                                 |
| `portfolio-architecture.jpg` | Portfolio grid            | 4:3    | https://www.pexels.com/photo/black-and-white-photo-of-a-modern-building-9458996/        |
| `portfolio-interiors.jpg`    | Portfolio grid            | 3:4    | https://www.pexels.com/photo/a-minimalist-wooden-chair-7303782/                         |
| `portfolio-bespoke.jpg`      | Portfolio grid            | 16:10  | https://www.pexels.com/photo/9819644/                                                   |
| `portfolio-details.jpg`      | Portfolio grid            | 1:1    | https://www.pexels.com/photo/wooden-bench-on-concrete-wall-13041128/                    |

## Replacing them with the studio's own photography

1. Export the photograph as a JPG (sRGB, quality 80–85), roughly the sizes above
   (1600 × 2000 for 4:5, 2000 × 1333 for 3:2, and so on).
2. Save it here under the **same file name**.
3. Update the `alt` text in `src/content/images.ts`.

Next.js optimises, resizes and converts these to AVIF/WebP at request time,
so supplying full-resolution originals is fine.

To swap a single stock photo for a different Pexels one, change its `id` in
`scripts/fetch-stock-photos.mjs` and run `node scripts/fetch-stock-photos.mjs`.
The older `scripts/generate-placeholders.mjs` still produces abstract
placeholders if ever needed.
