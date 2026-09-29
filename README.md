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
| `/gallery`      | Photographs, each downloadable at full resolution     |
| `/classes`      | Tabla classes in JP Nagar — the local-search landing  |
| `/contact`      | Contact details, socials, WhatsApp enquiry form       |

Every page is statically prerendered and refreshed by ISR.

## Content (the CMS)

Content is edited in the admin panel (`../admin-panel`) and served by the
portfolio API (`../backend`). The site fetches `GET /api/bootstrap` — the whole
site in one payload — **on the server only**, at build time and then in the
background at most every 5 minutes. Visitors and crawlers always get static
HTML, so the API's cold starts never reach them. The admin panel also calls
`POST /api/revalidate` after each save, so edits show within seconds (the visit
right after a save still gets the cached page while the fresh one renders).

The contact form saves enquiries through a Server Action → `POST
/api/enquiries`, then offers the visitor a pre-filled WhatsApp link. If the API
is down, it offers WhatsApp directly instead.

Copy `.env.example` to `.env.local` and fill it in (Vercel: Project → Settings →
Environment Variables):

| Variable            | What it is                                                     |
| ------------------- | -------------------------------------------------------------- |
| `API_BASE_URL`      | The API, including `/api`                                      |
| `API_SITE_KEY`      | This site's public site key (tenant `kaushik-bhat`)            |
| `REVALIDATE_SECRET` | Guards `/api/revalidate`; same value as the admin panel's `PUBLIC_SITE_REVALIDATE_SECRET` |

**The CMS is the only source of content.** Nothing about the artist — copy,
photos, videos, FAQs, contact details — is written into this repo. Photos are
uploaded in the admin panel and served from its storage bucket.

- A page that isn't **published** in the admin panel returns 404 and drops out
  of the nav and the sitemap.
- If the API can't be reached during `next build`, the build fails (the
  previous deploy stays live) — just redeploy once the backend is up. At
  runtime a failed refresh keeps serving the last good page.

## Where things live

- `src/lib/content.ts` — `getContent()`: fetches and normalises the CMS
  payload; `getPage(slug)` 404s an unpublished page. Every page reads from it.
- `src/lib/cms/` — the API client and its wire types.
- `src/lib/types.ts` — the site's own content types.
- `src/lib/site.ts` — the origin (`SITE_URL`), routes, link helpers and the
  metadata builder.
- `src/lib/jsonld.ts` — every structured-data node, built from the same
  content the pages render, so the two can't drift.
- `src/lib/og.tsx` — the shared Open Graph card design.

## Regenerating assets

```bash
npm run icons    # src/app/icon.svg -> favicon.ico, apple-icon, PWA icons
```

Photos are no longer processed here: the backend's upload pipeline derives
their dimensions and writes the WebP, JPEG and thumbnail copies.

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
  with the same name, address and phone number as the admin panel's Profile. That is
  usually the single biggest remaining lever for local search.

