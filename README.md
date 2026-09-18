# Kaushik Bhat — Tabla Portfolio

Portfolio site for Kaushik Bhat, a B-High graded tabla artist of All India Radio
who performs Hindustani classical music and teaches in JP Nagar, Bangalore.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Routes

| Route           | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `/`             | Hero, bio teaser, featured videos, gallery strip      |
| `/about`        | Full biography, collaborations, **Download bio**      |
| `/performances` | YouTube performances (click-to-load facades)          |
| `/gallery`      | 8 photographs, each downloadable at full resolution   |
| `/classes`      | Tabla classes in JP Nagar — the local-search landing  |
| `/contact`      | Contact details, socials, WhatsApp enquiry form       |

Every page is statically prerendered.

## Where things live

- `src/lib/site.ts` — name, phone, email, address, social URLs, nav. **Change
  contact details here only**; metadata, JSON-LD, footer and the contact form
  all read from it.
- `src/lib/photos.ts` — the photo roster (display WebP + full-res download).
- `src/lib/videos.ts` — the YouTube performances.
- `src/lib/faqs.ts` — `/classes` FAQ; rendered on the page *and* emitted as
  `FAQPage` structured data, so the two can't drift.
- `src/lib/jsonld.ts` — every structured-data node.
- `src/lib/og.tsx` — the shared Open Graph card design.

## Regenerating assets

```bash
npm run images   # public/my-tabla-photos/ -> public/photos/
npm run icons    # src/app/icon.svg -> favicon.ico, apple-icon, PWA icons
```

`optimize-images.mjs` writes a ~2000px WebP for display and a ~3000px JPEG for
the download buttons, under SEO-friendly filenames. It calls sharp's `.rotate()`
first — three of the camera originals are portraits stored sideways with EXIF
orientation 8, and WebP output drops the EXIF tag.

`assets/*.ttf` are vendored purely so the Open Graph images render Playfair and
Inter without a network fetch at build time.

## Theme

Dark and gold, defined once as CSS custom properties at the top of
`src/app/globals.css` and mapped into Tailwind through `@theme inline`.

Four stacked grounds, because on a dark theme a section band only separates
from the page if it is measurably lighter:

| Token           | Value     | Used for                       |
| --------------- | --------- | ------------------------------ |
| `--ink`         | `#000000` | full-bleed CTA bands           |
| `--background`  | `#0b0908` | the page                       |
| `--surface-alt` | `#141110` | alternating section bands      |
| `--surface`     | `#1f1a16` | cards and panels               |
| `--primary`     | `#d4af37` | gold — CTAs, links, accents    |

Two things that are easy to break:

- **Print.** `@media print` re-declares *every* surface token as white, not just
  `--background`. Miss one and the bio PDF prints a black slab (or, with
  background graphics off, white-on-white text). Check `/about` → Download bio
  after touching the palette.
- **Contrast.** Gold sits at 9.2:1 on the page ground and body copy at 7.4:1, so
  there is headroom — but measure rather than assume:

  ```bash
  npm run build && npm start          # one terminal
  npm run check:contrast -- --url=http://localhost:3000
  ```

  It drives headless Chrome over all six routes and compares every text node's
  **computed** colour against its effective background, so it catches what token
  arithmetic misses. Colours are resolved through a canvas because Tailwind v4
  compiles an opacity modifier like `text-foreground/75` to `oklab(… / 0.75)`,
  and alpha is composited before measuring. Exits non-zero on failure.

## SEO notes

- Targets: **"kaushik bhat tabla"** → `/`, **"tabla classes in JP Nagar"** →
  `/classes` (matching `<h1>`, `MusicSchool` + `LocalBusiness` + `FAQPage`
  schema, `areaServed` across south Bangalore).
- Structured data is server-rendered into the initial HTML. `Person` and
  `WebSite` come from the root layout; each page adds its own nodes, linked by
  `@id` so they resolve to one entity.
- Scroll reveals are CSS scroll-driven animations with a **non-zero** starting
  opacity — a crawler that snapshots the full page height without scrolling
  would otherwise see every below-the-fold section at `opacity: 0`.
- After deploying, submit `/sitemap.xml` in Search Console and request indexing
  for `/` and `/classes`.
- **Not in this repo:** ranking for "tabla classes in JP Nagar" also depends on
  a [Google Business Profile](https://business.google.com/) for the classes,
  with the same name, address and phone number as `src/lib/site.ts`. That is
  usually the single biggest remaining lever for local search.

## Unused originals

`public/my-tabla-photos/` holds the ~34 MB of camera originals that
`optimize-images.mjs` reads. Nothing on the site references it, but it is
currently inside `public/` and therefore deployed. Move it out of `public/`
(or delete it and keep the originals elsewhere) to drop the deploy size.
