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
  tagline: "Tabla artist & teacher, Bangalore",
  locale: "en_IN",

  email: "kaushikgb99@gmail.com",
  /** E.164, no punctuation — used for wa.me and tel: links. */
  phone: "919110691605",
  phoneDisplay: "+91 91106 91605",

  address: {
    locality: "JP Nagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560078",
    country: "IN",
  },
  /** Approximate JP Nagar centre — used for LocalBusiness geo. */
  geo: { latitude: 12.9063, longitude: 77.5857 },
  areaServed: [
    "JP Nagar",
    "Jayanagar",
    "Bannerghatta Road",
    "Banashankari",
    "BTM Layout",
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
    years: 12,
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

/** Everything that proves this is the same person across the web. */
export const sameAs = [
  site.social.youtube,
  site.social.instagram,
  site.social.facebook,
];

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

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
