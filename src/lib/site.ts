/**
 * What stays in code: the origin, the routes, and helpers over the profile.
 * Everything that describes the artist — name, contact details, address,
 * socials, training — is edited in the admin panel and arrives through
 * getContent() (src/lib/content.ts).
 */

import type { Metadata } from "next";
import type { PageSeo, Profile, Slug } from "./types";

/**
 * The canonical origin. Kept in code rather than the CMS: every canonical
 * URL, JSON-LD @id and sitemap entry hangs off it, so it must never change by
 * accident.
 */
export const SITE_URL = "https://kaushikbhat.in";

/**
 * Bare host, for the places that show the domain as text rather than link to
 * it (the OG card footer, the WhatsApp enquiry header).
 */
export const domain = new URL(SITE_URL).host;

/** Routes in nav order. Labels are each page's title from the CMS. */
export const routes: { slug: Slug; href: string }[] = [
  { slug: "home", href: "/" },
  { slug: "about", href: "/about" },
  { slug: "performances", href: "/performances" },
  { slug: "gallery", href: "/gallery" },
  { slug: "classes", href: "/classes" },
  { slug: "contact", href: "/contact" },
];

/** The site-wide social card, from app/opengraph-image.tsx. */
const DEFAULT_OG_IMAGE = "/opengraph-image/card";

export type NavItem = { href: string; label: string };

/** The profile's locale ("en_IN") as a BCP 47 tag ("en-IN") for lang attributes. */
export const languageTag = (locale: string) => locale.replace("_", "-");

export const whatsappLink = (profile: Profile, message?: string) =>
  profile.phone
    ? `https://wa.me/${profile.phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : undefined;

export const telLink = (profile: Profile) =>
  profile.phone ? `tel:+${profile.phone}` : undefined;

export const mailtoLink = (profile: Profile) =>
  profile.email ? `mailto:${profile.email}` : undefined;

/** The postal address on one line, as shown on the contact page and footer. */
export function fullAddress({ address }: Profile) {
  const cityLine = [address.city, address.postalCode].filter(Boolean).join(" ");
  return [address.venue, address.street, address.locality, cityLine]
    .filter(Boolean)
    .join(", ");
}

/** A profile's link on one platform, matched case-insensitively. */
export const socialUrl = (profile: Profile, platform: string) =>
  profile.social.find((link) => link.platform.toLowerCase() === platform.toLowerCase())
    ?.url;

/**
 * Every page's metadata repeats the same shape: an absolute title, a
 * canonical pointing at itself, and openGraph/twitter blocks that mirror the
 * title/description. This fills that boilerplate in from the page's SEO copy.
 *
 * Metadata merges shallowly, so a page's `openGraph` and `twitter` replace
 * the layout's wholesale — the site-wide fields are repeated here for that.
 */
export function pageMetadata(
  seo: PageSeo,
  profile: Profile,
  /** The route's own opengraph-image, when it has one. */
  card = DEFAULT_OG_IMAGE,
): Metadata {
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;
  // A page's own openGraph replaces the layout's — including the generated
  // card — so the card is named explicitly. An image set in the CMS wins.
  const images = [seo.ogImage ?? card];
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: seo.canonical },
    ...(seo.keywords ? { keywords: seo.keywords } : {}),
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: `${profile.name} — ${profile.role}`,
      locale: profile.locale,
      title: ogTitle,
      description: ogDescription,
      url: seo.canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images,
    },
  };
}
