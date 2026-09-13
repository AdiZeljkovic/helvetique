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

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the
production origin before deploying (it feeds canonical URLs, Open Graph,
`robots.txt` and `sitemap.xml`).

## Where things live

| Path                          | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `src/content/site.ts`         | All company facts, navigation and copy. Edit text here.        |
| `src/content/images.ts`       | Image registry (paths, alt text, dimensions).                  |
| `public/images/`              | Photography (Pexels stock), see the README inside.             |
| `src/app/globals.css`         | Design tokens (palette, type, easing), utilities, reveal CSS.  |
| `src/app/layout.tsx`          | Fonts (Cormorant Garamond + Inter via `next/font`), metadata.  |
| `src/app/page.tsx`            | Section order and JSON-LD structured data.                     |
| `src/components/layout/`      | Header, mobile menu, wordmark, footer.                         |
| `src/components/home/`        | One component per section.                                     |
| `src/components/ui/`          | Button, ArrowLink, SectionLabel, Reveal, icons.                |
| `src/lib/contact.ts`          | Contact form submission boundary (see below).                  |
| `scripts/fetch-stock-photos.mjs` | Downloads and crops the selected Pexels photographs.        |
| `scripts/generate-placeholders.mjs` | Renders abstract placeholders (no longer used by default). |

## Photography

The site currently uses stock photographs from Pexels (Pexels License, free for
commercial use). To use the studio's own photography, drop the files into
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

- Palette: ivory `#F3F0E9`, beige `#DED7CC`, stone `#C9C0B3`, warm white
  `#F8F6F1`, near black `#151515`, charcoal `#242321`, muted `#625E58` (darkened from #77736D for WCAG AA contrast on beige),
  accent red `#B7191D` (hairlines, active states, hover only).
- Type: Newsreader (light, true italic, optical sizes) for headlines, Inter for body and labels. Chosen over Cormorant Garamond because Cormorant draws Bosnian carons (š, ž, č) floating high above the letter.
- Grid: 12 columns on desktop, 1440px content width, gutters 20/24/48/80px.
- Motion: opt-in scroll reveals and a faint hero parallax, both disabled for
  `prefers-reduced-motion`.
- Only verified company information is published. No invented history,
  team, statistics or project names.
