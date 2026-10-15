# Helvetique architecture d.o.o. Sarajevo

Official website of Helvetique architecture d.o.o. Sarajevo: the local
architectural presence in Bosnia and Herzegovina, connected to the broader
portfolio on [PortMix.ch](https://portmix.ch). All public copy is in Bosnian
and lives in `src/content/site.ts` (content) and its `ui` object (microcopy).

One-page site built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

### With Docker

Dependencies are installed inside the container (Node 22), nothing is needed
on the host except Docker.

```bash
docker compose up -d --build   # build the image and start the dev server
docker compose watch --no-up   # keep running: syncs edits into the container
```

The site runs on http://localhost:3010 (set `HOST_PORT` to change it). Source
is synced by Compose Watch rather than bind-mounted, because Windows bind
mounts deliver no file events and Turbopack would not reload. A change to
`package.json` or `package-lock.json` rebuilds the image; a change to
`next.config.ts` restarts the server. Stop with `docker compose down`.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the
production origin before deploying (it feeds canonical URLs, Open Graph,
`robots.txt` and `sitemap.xml`).

## Where things live

| Path                          | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `src/content/site.ts`         | All company facts, navigation and copy. Edit text here.        |
| `src/content/images.ts`       | Image registry (paths, alt text, dimensions).                  |
| `public/images/`              | Photography (Unsplash/Pexels stock), see the README inside.    |
| `src/app/globals.css`         | Design tokens (palette, type, easing), utilities, reveal CSS.  |
| `src/app/layout.tsx`          | Font (Host Grotesk via `next/font`), metadata.                 |
| `src/app/page.tsx`            | Section order and JSON-LD structured data.                     |
| `src/components/layout/`      | Header, mobile menu, wordmark, footer.                         |
| `src/components/home/`        | One component per section.                                     |
| `src/components/ui/`          | Button, SectionLabel, Reveal, icons.                           |
| `src/lib/contact.ts`          | Contact form submission boundary (see below).                  |
| `scripts/fetch-stock-photos.mjs` | Downloads and crops the selected stock photographs.         |
| `scripts/generate-placeholders.mjs` | Renders abstract placeholders (no longer used by default). |

## Photography

The site currently uses stock photographs, five chosen by the client and the
rest matched to them: Unsplash (Unsplash License) and one Pexels photograph of
Sarajevo (Pexels License), both free for commercial use. Unsplash+ photos need
a paid licence and are not used. To use the studio's own photography, drop the files into
`public/images/` under the existing names and similar aspect ratios, then update
the `alt` text in `src/content/images.ts`. Sources, sizes and swap instructions
are in `public/images/README.md`.

## Connecting the contact form

The form validates on the client and hands the payload to `submitInquiry()` in
`src/lib/contact.ts`. There is no mail backend yet, so the form currently tells
visitors the form is not connected and shows the office telephone number.

To connect it, either set `NEXT_PUBLIC_CONTACT_ENDPOINT` to an endpoint that
accepts a JSON POST of `{ name, email, phone?, subject, message }`, or replace
`submitInquiry()` with a Server Action or Route Handler that sends email.

## Design notes

- Direction: contemporary Swiss minimalism. White ground, one grotesk
  typeface, large photography, a 12-column grid with section names in the
  left three columns and content on the right.
- Logo: the client's master PNG (`Helvetique-logo-vektorski.png`), cropped to
  the artwork as `public/brand/helvetique-logo.png`, with a reverse version
  (`helvetique-logo-reverse.png`) where only the black letters are white and the
  red bars are unchanged. Rendered by `src/components/brand/Logo.tsx`, unoptimised
  for sharpness. Per the brand guidelines: never retype, stretch or recolour it,
  keep at least 220 px width on screen and clear space of one ARCHITECTURE cap
  height around it.
- Palette (from the brand guidelines): Architectural Black `#090909`,
  Signature Red `#C10000`, Paper White `#F7F6F2` (alternate sections),
  Structural Grey `#6C6C6C`, plus white `#FFFFFF`, graphite `#3D3D3D` and
  lines `#E3E3E0`. Red is an accent only: logo bars, buttons, small markers.
- Type: Host Grotesk throughout, regular weight with tight tracking on
  large sizes. Checked for correct rendering of č, ć, š, ž, đ.
- Grid: 12 columns on desktop, 1600px max width, gutters 20/32/48/64px.
- Motion: slow scroll reveals and a faint hero parallax, both disabled for
  `prefers-reduced-motion`.
- Only verified company information is published. No invented history,
  team, statistics or project names.
