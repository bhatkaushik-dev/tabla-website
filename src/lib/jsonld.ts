/**
 * Structured data builders. Each page renders the result through <JsonLd />,
 * which escapes `<` per the guidance in
 * node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 *
 * The @id values matter: they let the Person node on every page and the
 * MusicSchool node on /classes resolve to the same two entities rather than
 * six unrelated ones, which is what makes an entity-style query like
 * "kaushik bhat tabla" resolve to this site.
 */

import { imageLicense, sameAs, site } from "./site";
import { videos, thumbnailUrl, watchUrl, embedUrl } from "./videos";
import { galleryPhotos, heroPortraitPhoto, teachingPhoto } from "./photos";
import { faqs } from "./faqs";

const abs = (path: string) => new URL(path, site.url).toString();

export const PERSON_ID = `${site.url}/#person`;
export const SCHOOL_ID = `${site.url}/#tabla-classes`;
export const WEBSITE_ID = `${site.url}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.locality,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export const personSchema = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  alternateName: ["Kaushik Bhat Tabla", "Kaushik G Bhat"],
  url: site.url,
  image: abs(heroPortraitPhoto.src),
  jobTitle: site.role,
  description:
    "B-High graded tabla artist of All India Radio, performing Hindustani classical music and teaching tabla in JP Nagar, Bangalore.",
  address: postalAddress,
  sameAs,
  knowsAbout: [
    "Tabla",
    "Hindustani classical music",
    "Indian classical percussion",
    "Kathak accompaniment",
    "Bhajan and Abhang accompaniment",
    "Taal and laya",
  ],
  knowsLanguage: ["Kannada", "Hindi", "English"],
  email: `mailto:${site.email}`,
  telephone: `+${site.phone}`,
  award: "B-High Graded Artist, All India Radio",
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: `${site.name} — ${site.role}`,
  inLanguage: "en-IN",
  publisher: { "@id": PERSON_ID },
});

/** The teaching practice. Carries the local-search signals for JP Nagar. */
export const musicSchoolSchema = () => ({
  "@type": ["MusicSchool", "LocalBusiness"],
  "@id": SCHOOL_ID,
  name: "Kaushik Bhat Tabla Classes",
  url: abs("/classes"),
  image: abs(teachingPhoto.src),
  description:
    "Tabla classes in JP Nagar, Bangalore for beginners to advanced students, taught by B-High graded All India Radio artist Kaushik Bhat. In-person and online lessons.",
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  address: postalAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  telephone: `+${site.phone}`,
  email: `mailto:${site.email}`,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tabla courses",
    itemListElement: [
      "Beginner tabla course",
      "Intermediate tabla course",
      "Advanced tabla and solo repertoire",
      "Online tabla classes",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, serviceType: "Tabla lessons" },
    })),
  },
});

export const faqSchema = () => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const videoSchemas = () =>
  videos.map((video) => ({
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: thumbnailUrl(video.id),
    uploadDate: video.uploadDate,
    contentUrl: watchUrl(video.id),
    embedUrl: embedUrl(video.id),
    creator: { "@id": PERSON_ID },
    inLanguage: "hi",
  }));

export const gallerySchema = () => ({
  "@type": "ImageGallery",
  name: `${site.name} — tabla performance photographs`,
  url: abs("/gallery"),
  associatedMedia: galleryPhotos.map((photo) => ({
    "@type": "ImageObject",
    contentUrl: abs(photo.src),
    caption: photo.alt,
    width: photo.width,
    height: photo.height,
    creator: { "@id": PERSON_ID },
    // The four fields Search Console reports as missing. They are what makes
    // an image eligible for the licence badge in Google Images.
    creditText: imageLicense.creditText,
    copyrightNotice: imageLicense.copyrightNotice,
    license: abs(imageLicense.licensePath),
    acquireLicensePage: abs(imageLicense.acquireLicensePath),
  })),
});

export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
    (item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    }),
  ),
});

/** Wraps nodes into one @graph so a page emits a single script tag. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
