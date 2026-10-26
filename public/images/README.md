# Photography

The photographs in this folder are stock images from [Unsplash](https://unsplash.com),
fetched and cropped by `scripts/fetch-stock-photos.mjs`. They are published under
the [Unsplash License](https://unsplash.com/license): free for commercial use, no
attribution required, but they must not be sold unaltered or used to build a
competing image service. **Unsplash+ photos (served from `plus.unsplash.com`)
need a paid licence and are not used.**

Five photographs were selected by the client; the rest were chosen to match them.

| File                         | Used in                   | Aspect | Source                                    | Picked by |
| ---------------------------- | ------------------------- | ------ | ----------------------------------------- | --------- |
| `hero.jpg`                   | Hero, full screen         | 3:2    | https://unsplash.com/photos/IE0m2PUI4Fg   | Client    |
| `feature-main.jpg`           | Studio, wide image        | 3:2    | https://unsplash.com/photos/NfyeP5Bcvd8   | Client    |
| `feature-detail.jpg`         | Studio, detail            | 3:4    | https://unsplash.com/photos/FVaimgno3dw   | Client    |
| `expertise-interiors.jpg`    | Expertise panel           | 4:5    | https://unsplash.com/photos/qBViGIC3oYs   | Client    |
| `expertise-bespoke.jpg`      | Expertise panel           | 4:5    | https://unsplash.com/photos/RHARVor_ydc (CGI render) | Client |
| `expertise-architecture.jpg` | Expertise panel           | 4:5    | https://unsplash.com/photos/6qYc5LF7jXk   | Studio    |
| `expertise-coordination.jpg` | Expertise panel           | 4:5    | https://unsplash.com/photos/fNxmdlYHRm8   | Studio    |
| `philosophy.jpg`             | Approach, full-bleed      | 16:10  | https://unsplash.com/photos/bE1NBPm_cNk   | Studio    |
| `portfolio-architecture.jpg` | Portfolio tile            | 4:5    | https://unsplash.com/photos/5yo3y7mUbVw   | Studio    |
| `portfolio-interiors.jpg`    | Portfolio tile            | 4:5    | https://unsplash.com/photos/aX1TTOuq83M   | Studio    |
| `portfolio-details.jpg`      | Portfolio tile            | 4:5    | https://unsplash.com/photos/0B7ijYKaKcE   | Studio    |
| `portfolio-bespoke.jpg`      | Portfolio tile            | 4:5    | https://unsplash.com/photos/mFH9FNydifw   | Studio    |
| `contact.jpg`                | Contact, office panel     | 16:10  | https://unsplash.com/photos/KlQXHZHVKWo   | Studio    |

## Replacing them with the studio's own photography

1. Export the photograph as a JPG (sRGB, quality about 80) at the aspect above:
   1920 px wide for full-width images (3:2, 16:10), 1200 px wide for portrait
   ones (4:5, 3:4). Next.js never serves wider than 1920 px, so larger files
   only add weight to the repository.
2. Save it here under the **same file name**.
3. Update the `alt` text in `src/content/images.ts`.

Next.js resizes and converts these to AVIF/WebP at request time, so visitors
receive much smaller files than the masters here.

To swap a single stock photo, change its `url` in
`scripts/fetch-stock-photos.mjs` and run it for that file. `sharp` is only
installed in the Docker image, so run it there:

```powershell
docker run --rm -v "${PWD}\scripts:/app/scripts:ro" -v "${PWD}\public\images:/app/public/images" helvetique-dev node scripts/fetch-stock-photos.mjs hero.jpg
```

The older `scripts/generate-placeholders.mjs` still produces abstract
placeholders if ever needed.
