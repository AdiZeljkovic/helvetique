# Helvetique architecture d.o.o. Sarajevo

Official website of Helvetique architecture d.o.o. Sarajevo, a studio for
interior design, custom doors, built-in furniture and wooden details, with
technical and workshop drawings for manufacturers in Bosnia and Herzegovina
and Switzerland. It does not design buildings; the copy must not suggest it.
The broader portfolio is on [PortMix.ch](https://portmix.ch). All public copy is in Bosnian
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

The production origin, `https://helvetique.ba`, is set in `.env.production`
(committed; it is public). `next build` reads it for canonical URLs, Open
Graph, `robots.txt` and `sitemap.xml`; a production build fails without it, so
a deploy can never publish canonical URLs pointing at localhost. Because the
origin is `https://`, the site also sends HSTS and upgrades insecure requests,
so the server must serve it over HTTPS. To use another domain (for example
`www.`), edit that file or set `NEXT_PUBLIC_SITE_URL` on the server, which
takes precedence. Local secrets, if any, go in `.env.local` (see `.env.example`).

Deploy: `npm ci && npm run build && npm run start` on Node 20 or later. The
site needs a Node.js server (or a host with Next.js support) for image
optimisation; a plain static host is not enough.

## Where things live

| Path                          | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `src/content/site.ts`         | All company facts, navigation and copy. Edit text here.        |
| `src/content/images.ts`       | Image registry (paths, alt text, dimensions).                  |
| `public/images/`              | Photography (Unsplash stock), see the README inside.           |
| `src/app/globals.css`         | Design tokens (palette, type, easing), utilities, reveal CSS.  |
| `src/app/layout.tsx`          | Font (Host Grotesk via `next/font`), metadata, theme colour.   |
| `src/app/page.tsx`            | Section order and JSON-LD structured data.                     |
| `src/app/not-found.tsx`       | 404 page in Bosnian.                                           |
| `src/app/*icon*`, `manifest.ts` | Tab icon (SVG), favicon, Apple icon, web app manifest.       |
| `next.config.ts`              | Security headers (CSP and others), image settings.             |
| `src/components/layout/`      | Header, mobile menu, wordmark, footer.                         |
| `src/components/home/`        | One component per section.                                     |
| `src/components/ui/`          | Button, SectionLabel, Reveal, icons.                           |
| `src/lib/contact.ts`          | Contact form submission boundary (see below).                  |
| `scripts/fetch-stock-photos.mjs` | Downloads and crops the selected stock photographs.         |
| `scripts/generate-brand-assets.mjs` | Renders favicon, Apple and manifest icons from `icon.svg`. |
| `scripts/generate-placeholders.mjs` | Renders abstract placeholders (no longer used by default). |

## Photography

The site currently uses stock photographs from Unsplash (Unsplash License, free
for commercial use), five chosen by the client and the rest matched to them.
Unsplash+ photos need a paid licence and are not used. To use the studio's own photography, drop the files into
`public/images/` under the existing names and similar aspect ratios, then update
the `alt` text in `src/content/images.ts`. Sources, sizes and swap instructions
are in `public/images/README.md`.

## Connecting the contact form

The form validates on the client and hands the payload to `submitInquiry()` in
`src/lib/contact.ts`. There is no mail backend yet, so the form currently tells
visitors the form is not connected and shows the office telephone number.

To connect it, either set `NEXT_PUBLIC_CONTACT_ENDPOINT` to an endpoint that
accepts a JSON POST of `{ name, email, phone?, subject, message }`, or replace
`submitInquiry()` with a Server Action or Route Handler that sends email. The
endpoint's origin is added to the CSP `connect-src` automatically. A server-side
handler should validate the payload again and rate-limit submissions; the
client checks and the honeypot only stop casual spam.

## Security and SEO

- `next.config.ts` sends a Content Security Policy and the usual hardening
  headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Cross-Origin-Opener-Policy`, `Permissions-Policy`, HSTS over HTTPS). The CSP
  has no nonces on purpose: nonces would force every request to render
  dynamically, and this page is prerendered. Inline scripts are therefore
  allowed; everything else is limited to this origin.
- Keep `next` and `sharp` current: `npm audit` should report nothing. Both had
  advisories that affected this site (image optimisation, `next/og`).
- The page and every metadata route are prerendered (`○` in `next build`).
  Metadata: title and description, canonical, Open Graph and Twitter card with
  a generated image, `robots.txt`, `sitemap.xml`, JSON-LD (`ProfessionalService`
  and `WebSite`), icons and a web app manifest. Unknown URLs get a Bosnian 404
  with the correct status and `noindex`.

## Design notes

- Direction: contemporary Swiss minimalism. White ground, one grotesk
  typeface, large photography, a 12-column grid. Sections open straight with
  a large headline from the left edge and the supporting text in the last four
  columns; there are no small section labels.
- Logo: the client's master PNG (`Helvetique-logo-vektorski.png`), cropped to
  the artwork as `public/brand/helvetique-logo.png`, with a reverse version
  (`helvetique-logo-reverse.png`) where only the black letters are white and the
  red bars are unchanged. Rendered by `src/components/brand/Logo.tsx` through
  `next/image` at its on-screen size, with quality 90 so the thin serifs stay
  crisp. Per the brand guidelines: never retype, stretch or recolour it,
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
