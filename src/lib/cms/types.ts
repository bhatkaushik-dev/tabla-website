/**
 * The wire contract of the portfolio API (../backend), as served by
 * GET /api/bootstrap. Mirrors app/schemas/*.py there — only the fields this
 * site reads are declared. Nothing outside src/lib/cms sees these shapes;
 * src/lib/content.ts normalises them into the site's own types.
 */

export type ApiPhoto = {
  id: string;
  /** WebP display asset. */
  src: string;
  /** Full-resolution JPEG. */
  download_url: string;
  thumb_url: string;
  width: number;
  height: number;
  alt: string;
  caption: string | null;
  credit: string | null;
  order: number;
  role: "gallery" | "hero" | "about" | "classes";
};

export type ApiVideo = {
  id: string;
  youtube_id: string;
  title: string;
  description: string | null;
  upload_date: string | null;
  duration: string | null;
  thumbnail_url: string | null;
  featured: boolean;
};

export type ApiFaq = {
  id: string;
  question: string;
  answer: string;
  page_slug: string | null;
};

export type ApiAddress = {
  venue?: string | null;
  street_address?: string | null;
  locality?: string | null;
  area?: string | null;
  city?: string | null;
  region?: string | null;
  postal_code?: string | null;
  country?: string;
};

export type ApiSite = {
  name: string;
  short_name: string | null;
  role: string;
  tagline: string | null;
  locale: string;
  email: string | null;
  /** E.164, with the leading "+". */
  phone: string | null;
  phone_display: string | null;
  address: ApiAddress;
  geo_lat: number | null;
  geo_lng: number | null;
  area_served: string[];
  social_links: { platform: string; url: string; handle?: string | null }[];
  training: {
    start_age?: number | null;
    years?: number | null;
    teacher?: string | null;
    father?: string | null;
    grade?: string | null;
    grading_body?: string | null;
  };
  alternate_names: string[];
  knows_about: string[];
  knows_language: string[];
  awards: { title: string; awarded_by?: string | null; year?: number | null }[];
  opening_hours: { days: string[]; opens: string; closes: string }[];
  price_range: string | null;
  currencies_accepted: string[];
  school: {
    name?: string | null;
    alternate_name?: string | null;
    description?: string | null;
    image_url?: string | null;
    offer_catalog_name?: string | null;
    offerings?: string[];
  };
  image_credit_text: string | null;
  image_copyright_notice: string | null;
  image_license_url: string | null;
  image_acquire_license_url: string | null;
  default_image_url: string | null;
  bio_summary: string | null;
  updated_at: string;
};

export type ApiPage = {
  slug: string;
  title: string;
  eyebrow: string | null;
  heading: string | null;
  highlight: string | null;
  intro: string | null;
  header_photo_id: string | null;
  /** Per-slug shapes are in ../backend/app/schemas/page_blocks.py. */
  blocks: Record<string, unknown>;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  seo_keywords: string[];
  canonical_path: string | null;
  og_image_url: string | null;
  noindex: boolean;
};

export type Bootstrap = {
  generated_at: string;
  content_version: string | null;
  site: ApiSite;
  /** Published pages only, keyed by slug. */
  pages: Record<string, ApiPage>;
  /** Active photos of every role. */
  photos: ApiPhoto[];
  photos_by_role: Partial<Record<ApiPhoto["role"], ApiPhoto[]>>;
  videos: ApiVideo[];
  faqs: ApiFaq[];
};

export type EnquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: string;
};

export type EnquiryResponse = {
  id: string;
  status: "persisted";
  whatsapp_url: string;
  notification_queued: boolean;
};
