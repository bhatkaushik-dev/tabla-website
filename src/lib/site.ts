/**
 * Single source of truth for everything that describes the site or the artist.
 * Imported by metadata, JSON-LD, the sitemap, the navbar, the footer and the
 * contact page — change a phone number or a social URL here and nowhere else.
 */

import type { Metadata } from "next";

export const site = {
  url: "https://kaushikbhat.in",
  name: "Kaushik Bhat",
  shortName: "Kaushik Bhat Tabla",
  role: "Tabla Artist & Teacher",
  tagline: "Tabla instructor, JP Nagar, Bengaluru",
  locale: "en_IN",

  email: "kaushikgb99@gmail.com",
  /** E.164, no punctuation — used for wa.me and tel: links. */
  phone: "919110691605",
  phoneDisplay: "+91 91106 91605",

  /**
   * Classes are held inside Swara Hindustani Classical Music School, so this is
   * the school's address, exactly as it publishes it on its own website. Keep
   * every copy of it (site, JSON-LD, directory listings) character-for-
   * character identical — consistency is the local-ranking signal.
   */
  address: {
    venue: "Swara Hindustani Classical Music School",
    street: "#38, 3rd Main, Sarakki",
    locality: "JP Nagar 1st Phase",
    /** Short form for running copy ("tabla classes in JP Nagar"). */
    area: "JP Nagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560078",
    country: "IN",
  },
  /**
   * TODO: still the approximate JP Nagar centre, not the building. Replace
   * with the school's exact pin (Google Maps → long-press the building →
   * copy the "12.9…, 77.5…" pair).
   */
  geo: { latitude: 12.9063, longitude: 77.5857 },
  areaServed: [
    "JP Nagar",
    "Jayanagar",
    "Banashankari",
    "BTM Layout",
    "Bannerghatta Road",
    "South Bengaluru",
    "Bengaluru",
  ],

  social: {
    youtube: "https://www.youtube.com/@KaushikBhatTabla",
    instagram: "https://www.instagram.com/kaushik_bhat",
    facebook: "https://www.facebook.com/kaushik.bhat.94/",
  },

  /** Repeated across the home, about and classes bios — change once here. */
  training: {
    startAge: 10,
    years: 14,
    teacher: "Pt Gurumurthy Vaidya",
    father: "Shri Ganesh Bhat",
    grade: "B-High",
    gradingBody: "All India Radio",
  },
} as const;

/**
 * Bare host, for the places that show the domain as text rather than link to
 * it (the OG card footer, the WhatsApp enquiry header). Derived so a domain
 * change only ever needs editing `url` above.
 */
export const domain = new URL(site.url).host;

/**
 * Image rights, attached to every ImageObject in the gallery schema. Search
 * Console reports all four as missing without them.
 *
 * `licensePath` points at the terms already printed at the foot of /gallery
 * rather than at a page invented to satisfy the validator, and
 * `acquireLicensePath` at the place someone actually asks. Change `creditText`
 * if a photographer other than Kaushik shot the gallery set.
 */
export const imageLicense = {
  creditText: site.name,
  copyrightNotice: `© ${site.name}`,
  licensePath: "/gallery#licence",
  acquireLicensePath: "/contact",
} as const;

/** Everything that proves this is the same person across the web. */
export const sameAs = [
  site.social.youtube,
  site.social.instagram,
  site.social.facebook,
];

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/** The postal address on one line, as shown on the contact page and footer. */
export const fullAddress = [
  site.address.venue,
  site.address.street,
  site.address.locality,
  `${site.address.city} ${site.address.postalCode}`,
].join(", ");

export const telLink = () => `tel:+${site.phone}`;
export const mailtoLink = () => `mailto:${site.email}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/performances", label: "Performances" },
  { href: "/gallery", label: "Gallery" },
  { href: "/classes", label: "Tabla Classes" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Every page's metadata repeats the same shape: an absolute title, a
 * canonical pointing at itself, and an openGraph block that mirrors the
 * title/description. This fills that boilerplate in from the primary fields
 * so each page only states what's actually different about it.
 */
export function pageMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    ...(keywords ? { keywords } : {}),
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: path,
    },
  };
}
