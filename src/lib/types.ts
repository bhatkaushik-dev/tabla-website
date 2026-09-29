/**
 * The site's own content model — the CMS payload normalised by
 * src/lib/content.ts. The CMS is the only source: anything it may leave empty
 * is optional here, and components render nothing for it rather than
 * inventing copy.
 */

export type Photo = {
  id: string;
  /** WebP display asset — a site path or an absolute CDN URL. */
  src: string;
  /** Full-resolution JPEG the gallery's download button hands out. */
  download: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Video = {
  /** The YouTube id. */
  id: string;
  title: string;
  description?: string;
  /** ISO 8601. */
  uploadDate?: string;
  /** ISO 8601 duration, e.g. PT12M31S. */
  duration?: string;
  thumbnail: string;
};

export type Faq = { question: string; answer: string };

export type SocialLink = { platform: string; url: string; handle?: string };

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  tagline?: string;
  locale: string;

  email?: string;
  /** Digits only, country code first — the wa.me and tel: form. */
  phone?: string;
  phoneDisplay?: string;

  /**
   * Written exactly as the host school publishes it. Keep every copy (site,
   * JSON-LD, directory listings) character-for-character identical —
   * consistency is the local-ranking signal.
   */
  address: {
    venue?: string;
    street?: string;
    locality?: string;
    /** Short form for running copy ("tabla classes in JP Nagar"). */
    area?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    /** ISO 3166-1 alpha-2. */
    country?: string;
  };
  geo?: { latitude: number; longitude: number };
  areaServed: string[];

  social: SocialLink[];

  /** The credential line repeated across the home, about and classes pages. */
  training: {
    startAge?: number;
    years?: number;
    teacher?: string;
    father?: string;
    grade?: string;
    gradingBody?: string;
  };

  alternateNames: string[];
  knowsAbout: string[];
  knowsLanguage: string[];
  awards: { title: string; awardedBy?: string }[];

  openingHours: { days: string[]; opens: string; closes: string }[];
  priceRange?: string;
  currencies: string[];

  /** The teaching practice — the MusicSchool entity on /classes. */
  school: {
    name?: string;
    alternateName?: string;
    description?: string;
    image?: string;
    catalogName?: string;
    offerings: string[];
  };

  /**
   * Image rights, attached to every ImageObject in the gallery schema. The
   * paths may be site-relative; JSON-LD resolves them against the origin.
   */
  imageLicense: {
    creditText: string;
    copyrightNotice: string;
    licensePath?: string;
    acquireLicensePath?: string;
  };

  /** The Person entity's image. */
  image?: string;
  description?: string;
};

export type Link = { label: string; href: string };

/** Eyebrow over a heading whose trailing words (`highlight`) are set in gold. */
export type Heading = { eyebrow?: string; heading: string; highlight?: string };

export type PageHeaderCopy = Heading & {
  /** The page's name, for the nav and breadcrumbs — not its on-page heading. */
  title: string;
  intro?: string;
  photo?: Photo;
};

export type PageSeo = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
  canonical: string;
  ogImage?: string;
  noindex: boolean;
};

type PageBase = { header: PageHeaderCopy; seo: PageSeo; updatedAt?: string };

export type Chapter = {
  id: string;
  /** Omitted for a closing passage that simply continues the story. */
  title?: string;
  photo?: Photo;
  /** Caption under the photo. Defaults to the photo's own. */
  caption?: string;
  /** Rich text — `**bold**` and `[label](/path)` only. */
  paragraphs: string[];
};

export type Pages = {
  home: PageBase & {
    tagline?: string;
    aboutBand?: Heading & { body?: string; link?: Link; photo?: Photo };
  };
  about: PageBase & { chapters: Chapter[]; printPhoto?: Photo };
  performances: PageBase & {
    channelButtonLabel?: string;
    closing?: { heading: string; buttonLabel: string };
  };
  gallery: PageBase & { countNote?: string; licenceNote?: string };
  classes: PageBase & {
    formats: { icon?: string; title: string; body: string }[];
    faqHeading?: Heading;
    cta?: Heading & { body: string; primary: Link; secondary?: Link; photo?: Photo };
  };
  contact: PageBase & {
    enquiryTypes: string[];
    location?: { heading: string; note?: string };
  };
};

export type Slug = keyof Pages;

export type Content = {
  profile: Profile;
  /** Published pages only — an unpublished page's route 404s. */
  pages: Partial<Pages>;
  gallery: Photo[];
  videos: Video[];
  /** The /classes FAQ — rendered as the accordion and as FAQPage JSON-LD. */
  faqs: Faq[];
  /** Latest edit across all content, when known. */
  updatedAt?: string;
};
