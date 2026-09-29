/**
 * Structured data builders. Each page renders the result through <JsonLd />,
 * which escapes `<` per the guidance in
 * node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 *
 * They read the same content the visible components render, so the markup
 * can't drift from the page — Google penalises structured data that isn't on
 * the page.
 *
 * The @id values matter: they let the Person node on every page and the
 * MusicSchool node on /classes resolve to the same two entities rather than
 * six unrelated ones, which is what makes an entity-style query like
 * "kaushik bhat tabla" resolve to this site.
 */

import { languageTag, SITE_URL } from "./site";
import type { Faq, Photo, Profile, Video } from "./types";
import { embedUrl, watchUrl } from "./youtube";

/** Site paths become absolute; CDN URLs pass through unchanged. */
const abs = (path: string) => new URL(path, SITE_URL).toString();

export const PERSON_ID = `${SITE_URL}/#person`;
export const SCHOOL_ID = `${SITE_URL}/#tabla-classes`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = ({ address }: Profile) => ({
  "@type": "PostalAddress",
  streetAddress: [address.street, address.locality].filter(Boolean).join(", ") || undefined,
  addressLocality: address.city,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: address.country,
});

const geoCoordinates = ({ geo }: Profile) =>
  geo && { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude };

const contactPoints = (profile: Profile) => ({
  email: profile.email && `mailto:${profile.email}`,
  telephone: profile.phone && `+${profile.phone}`,
});

export const personSchema = (profile: Profile) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  alternateName: profile.alternateNames,
  url: SITE_URL,
  image: profile.image && abs(profile.image),
  jobTitle: profile.role,
  description: profile.description,
  address: postalAddress(profile),
  sameAs: profile.social.map((link) => link.url),
  knowsAbout: profile.knowsAbout,
  knowsLanguage: profile.knowsLanguage,
  ...contactPoints(profile),
  award: profile.awards.map((award) =>
    award.awardedBy ? `${award.title}, ${award.awardedBy}` : award.title,
  ),
});

export const websiteSchema = (profile: Profile) => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: `${profile.name} — ${profile.role}`,
  inLanguage: languageTag(profile.locale),
  publisher: { "@id": PERSON_ID },
});

/**
 * The teaching practice — the local-search entity for JP Nagar.
 *
 * There is deliberately no Google Business Profile behind this (classes run
 * inside another school's premises), so it carries NO `hasMap` and NO
 * `sameAs` pointing at a Maps listing: the address, the geo pin and the
 * venue are the whole geographic signal. `MusicSchool` for the category;
 * `LocalBusiness` alongside it because opening hours, price range and geo
 * are LocalBusiness properties that MusicSchool alone doesn't carry.
 */
export const musicSchoolSchema = (profile: Profile) => {
  const { school } = profile;
  return {
    "@type": ["MusicSchool", "LocalBusiness"],
    "@id": SCHOOL_ID,
    name: school.name ?? profile.name,
    alternateName: school.alternateName,
    url: abs("/classes"),
    image: school.image && abs(school.image),
    description: school.description,
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    address: postalAddress(profile),
    geo: geoCoordinates(profile),
    // Where the lessons physically happen: the host school's premises.
    location: profile.address.venue && {
      "@type": "Place",
      name: profile.address.venue,
      address: postalAddress(profile),
      geo: geoCoordinates(profile),
    },
    areaServed: profile.areaServed.map((name) => ({ "@type": "Place", name })),
    ...contactPoints(profile),
    priceRange: profile.priceRange,
    currenciesAccepted: profile.currencies.join(", ") || undefined,
    openingHoursSpecification: profile.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    hasOfferCatalog: school.offerings.length
      ? {
          "@type": "OfferCatalog",
          name: school.catalogName,
          itemListElement: school.offerings.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, serviceType: school.catalogName },
          })),
        }
      : undefined,
  };
};

export const faqSchema = (faqs: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const videoSchemas = (videos: Video[]) =>
  videos.map((video) => ({
    "@type": "VideoObject",
    name: video.title,
    description: video.description ?? video.title,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: watchUrl(video.id),
    embedUrl: embedUrl(video.id),
    creator: { "@id": PERSON_ID },
  }));

/** `name` is the gallery page's own title, as the CMS sets it. */
export const gallerySchema = (profile: Profile, photos: Photo[], name: string) => ({
  "@type": "ImageGallery",
  name,
  url: abs("/gallery"),
  associatedMedia: photos.map((photo) => ({
    "@type": "ImageObject",
    contentUrl: abs(photo.src),
    caption: photo.alt,
    width: photo.width,
    height: photo.height,
    creator: { "@id": PERSON_ID },
    // The four fields Search Console reports as missing. They are what makes
    // an image eligible for the licence badge in Google Images.
    creditText: profile.imageLicense.creditText,
    copyrightNotice: profile.imageLicense.copyrightNotice,
    license: profile.imageLicense.licensePath && abs(profile.imageLicense.licensePath),
    acquireLicensePage:
      profile.imageLicense.acquireLicensePath && abs(profile.imageLicense.acquireLicensePath),
  })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/** Wraps nodes into one @graph so a page emits a single script tag. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
