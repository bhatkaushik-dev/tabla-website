import "server-only";

import { cache } from "react";
import { notFound } from "next/navigation";

import { fetchBootstrap } from "./cms/api";
import type { ApiPage, ApiPhoto, ApiSite, ApiVideo, Bootstrap } from "./cms/types";
import type {
  Chapter,
  Content,
  Heading,
  Link,
  PageHeaderCopy,
  PageSeo,
  Pages,
  Photo,
  Profile,
  Slug,
  Video,
} from "./types";
import { youtubeThumbnail } from "./youtube";

/**
 * The one place pages get their content from — and the CMS is the only
 * source. Nothing about the artist is written into this codebase.
 *
 * Content comes from the portfolio API's /bootstrap endpoint, fetched on the
 * server at build time and re-fetched in the background by ISR (see
 * src/lib/cms/api.ts). Every route is still served as static HTML, so the
 * API's latency never reaches a visitor or a crawler.
 *
 * If the API fails, this throws. During `next build` that fails the deploy
 * (the live site keeps running the previous one); at runtime ISR keeps
 * serving the last good page and retries on the next request.
 */
export const getContent = cache(async (): Promise<Content> => {
  return normalise(await fetchBootstrap());
});

/** A published page, or the route's 404 — unpublished pages are hidden. */
export async function getPage<S extends Slug>(slug: S): Promise<Pages[S]> {
  const page = (await getContent()).pages[slug];
  if (!page) notFound();
  return page;
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

type Json = Record<string, unknown>;

const text = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value : undefined;

const record = (value: unknown): Json | undefined =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Json) : undefined;

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const texts = (value: unknown): string[] =>
  list(value).map(text).filter((item): item is string => item !== undefined);

function toLink(value: unknown): Link | undefined {
  const link = record(value);
  const label = text(link?.label);
  const href = text(link?.href);
  return label && href ? { label, href } : undefined;
}

/** A section heading, or nothing when the block has no heading text. */
function toHeading(value: unknown): Heading | undefined {
  const block = record(value);
  const heading = text(block?.heading);
  if (!block || !heading) return undefined;
  return { eyebrow: text(block.eyebrow), heading, highlight: text(block.highlight) };
}

/**
 * Supabase serves `?download=<name>` with Content-Disposition: attachment.
 * The gallery needs that: the `download` attribute is ignored cross-origin.
 */
function downloadUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const name = parsed.pathname.split("/").pop();
    if (name) parsed.searchParams.set("download", name);
    return parsed.toString();
  } catch {
    return url;
  }
}

const toPhoto = (photo: ApiPhoto): Photo => ({
  id: photo.id,
  src: photo.src,
  download: downloadUrl(photo.download_url),
  width: photo.width,
  height: photo.height,
  alt: photo.alt,
  caption: text(photo.caption),
});

function toVideo(video: ApiVideo): Video {
  // next/image only accepts i.ytimg.com thumbnails (see next.config.ts).
  const thumbnail = video.thumbnail_url?.startsWith("https://i.ytimg.com/vi/")
    ? video.thumbnail_url
    : youtubeThumbnail(video.youtube_id);
  return {
    id: video.youtube_id,
    title: video.title,
    description: text(video.description),
    uploadDate: text(video.upload_date),
    duration: text(video.duration),
    thumbnail,
  };
}

function toProfile(site: ApiSite): Profile {
  const { address, training, school } = site;
  return {
    name: site.name,
    shortName: text(site.short_name) ?? site.name,
    role: site.role,
    tagline: text(site.tagline),
    locale: site.locale,

    email: text(site.email),
    phone: site.phone?.replace(/\D/g, "") || undefined,
    phoneDisplay: text(site.phone_display),

    address: {
      venue: text(address.venue),
      street: text(address.street_address),
      locality: text(address.locality),
      area: text(address.area),
      city: text(address.city),
      region: text(address.region),
      postalCode: text(address.postal_code),
      country: text(address.country),
    },
    geo:
      site.geo_lat != null && site.geo_lng != null
        ? { latitude: site.geo_lat, longitude: site.geo_lng }
        : undefined,
    areaServed: site.area_served,

    social: site.social_links
      .filter((link) => text(link.url))
      .map((link) => ({
        platform: link.platform,
        url: link.url,
        handle: text(link.handle),
      })),

    training: {
      startAge: training.start_age ?? undefined,
      years: training.years ?? undefined,
      teacher: text(training.teacher),
      father: text(training.father),
      grade: text(training.grade),
      gradingBody: text(training.grading_body),
    },

    alternateNames: site.alternate_names,
    knowsAbout: site.knows_about,
    knowsLanguage: site.knows_language,
    awards: site.awards.map((award) => ({
      title: award.title,
      awardedBy: text(award.awarded_by),
    })),

    openingHours: site.opening_hours,
    priceRange: text(site.price_range),
    currencies: site.currencies_accepted,

    school: {
      name: text(school.name),
      alternateName: text(school.alternate_name),
      description: text(school.description),
      image: text(school.image_url),
      catalogName: text(school.offer_catalog_name),
      offerings: texts(school.offerings),
    },

    // Credit and copyright default to the artist's own name — the same
    // defaults the admin panel describes for these fields.
    imageLicense: {
      creditText: text(site.image_credit_text) ?? site.name,
      copyrightNotice: text(site.image_copyright_notice) ?? `© ${site.name}`,
      licensePath: text(site.image_license_url),
      acquireLicensePath: text(site.image_acquire_license_url),
    },

    image: text(site.default_image_url),
    description: text(site.bio_summary),
  };
}

function normalise(data: Bootstrap): Content {
  const profile = toProfile(data.site);
  const photosById = new Map(data.photos.map((photo) => [photo.id, toPhoto(photo)]));
  // A missing id means "no photo" — it was deleted, or deactivated.
  const photo = (id: unknown) => (typeof id === "string" ? photosById.get(id) : undefined);

  function base(api: ApiPage) {
    const header: PageHeaderCopy = {
      title: api.title,
      eyebrow: text(api.eyebrow),
      // An empty heading falls back to the page's own name, never to copy.
      heading: text(api.heading) ?? api.title,
      highlight: text(api.highlight),
      intro: text(api.intro),
      photo: photo(api.header_photo_id),
    };
    const seo: PageSeo = {
      title: text(api.seo_title) ?? `${api.title} | ${profile.name}`,
      description: text(api.seo_description) ?? profile.description,
      ogTitle: text(api.og_title),
      ogDescription: text(api.og_description),
      keywords: api.seo_keywords.length ? api.seo_keywords : undefined,
      canonical: text(api.canonical_path) ?? (api.slug === "home" ? "/" : `/${api.slug}`),
      ogImage: text(api.og_image_url),
      noindex: api.noindex,
    };
    return { header, seo, updatedAt: api.updated_at };
  }

  /** Unpublished pages aren't in the payload, so they stay undefined. */
  function page<S extends Slug>(slug: S, build: (api: ApiPage, blocks: Json) => Pages[S]) {
    const api = data.pages[slug];
    return api ? build(api, api.blocks ?? {}) : undefined;
  }

  const pages: Content["pages"] = {
    home: page("home", (api, blocks) => {
      const band = record(blocks.about_band);
      const bandHeading = toHeading(band);
      return {
        ...base(api),
        tagline: text(record(blocks.hero)?.tagline),
        aboutBand:
          band && bandHeading
            ? {
                ...bandHeading,
                body: text(band.body),
                link: toLink(band.link),
                photo: photo(band.photo_id),
              }
            : undefined,
      };
    }),

    about: page("about", (api, blocks) => ({
      ...base(api),
      chapters: list(blocks.chapters).flatMap((item): Chapter[] => {
        const chapter = record(item);
        const id = text(chapter?.id);
        const paragraphs = texts(chapter?.paragraphs);
        if (!chapter || !id || paragraphs.length === 0) return [];
        return [
          {
            id,
            title: text(chapter.title),
            photo: photo(chapter.photo_id),
            caption: text(chapter.caption),
            paragraphs,
          },
        ];
      }),
      printPhoto: photo(blocks.print_photo_id),
    })),

    performances: page("performances", (api, blocks) => {
      const closing = record(blocks.closing);
      const heading = text(closing?.heading);
      const buttonLabel = text(closing?.button_label);
      return {
        ...base(api),
        channelButtonLabel: text(blocks.channel_button_label),
        closing: heading && buttonLabel ? { heading, buttonLabel } : undefined,
      };
    }),

    gallery: page("gallery", (api, blocks) => ({
      ...base(api),
      countNote: text(blocks.count_note),
      licenceNote: text(blocks.licence_note),
    })),

    classes: page("classes", (api, blocks) => {
      const cta = record(blocks.cta);
      const ctaHeading = toHeading(cta);
      const ctaBody = text(cta?.body);
      const primary = toLink(cta?.primary);
      return {
        ...base(api),
        formats: list(blocks.formats).flatMap((item) => {
          const format = record(item);
          const title = text(format?.title);
          const body = text(format?.body);
          return title && body ? [{ icon: text(format?.icon), title, body }] : [];
        }),
        faqHeading: toHeading(blocks.faq_heading),
        cta:
          cta && ctaHeading && ctaBody && primary
            ? {
                ...ctaHeading,
                body: ctaBody,
                primary,
                secondary: toLink(cta.secondary),
                photo: photo(cta.photo_id),
              }
            : undefined,
      };
    }),

    contact: page("contact", (api, blocks) => {
      const location = record(blocks.location);
      const heading = text(location?.heading);
      return {
        ...base(api),
        enquiryTypes: texts(blocks.enquiry_types),
        location: heading ? { heading, note: text(location?.note) } : undefined,
      };
    }),
  };

  return {
    profile,
    pages,
    gallery: (data.photos_by_role.gallery ?? []).map(toPhoto),
    videos: data.videos.map(toVideo),
    faqs: data.faqs
      .filter((faq) => faq.page_slug === null || faq.page_slug === "classes")
      .map(({ question, answer }) => ({ question, answer })),
    updatedAt: data.content_version ?? undefined,
  };
}
