import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { routes, SITE_URL } from "@/lib/site";
import type { Slug } from "@/lib/types";

// Regenerated with the pages it lists (see the root layout).
export const revalidate = 300;

const SETTINGS: Record<
  Slug,
  Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">
> = {
  home: { changeFrequency: "monthly", priority: 1 },
  classes: { changeFrequency: "monthly", priority: 0.9 },
  about: { changeFrequency: "yearly", priority: 0.8 },
  performances: { changeFrequency: "monthly", priority: 0.8 },
  gallery: { changeFrequency: "monthly", priority: 0.7 },
  contact: { changeFrequency: "yearly", priority: 0.6 },
};

/**
 * Real routes only, with each page's own last edit from the CMS, so Google
 * can tell which ones actually changed. Unpublished pages (which 404) and
 * pages marked noindex in the admin panel are left out.
 *
 * /gallery carries an `images` list so the photographs are eligible for image
 * search in their own right.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, gallery, updatedAt } = await getContent();
  const url = (path: string) => new URL(path, SITE_URL).toString();

  return routes.flatMap(({ slug, href }) => {
    const page = pages[slug];
    if (!page || page.seo.noindex) return [];
    const modified = page.updatedAt ?? updatedAt;
    return [
      {
        url: url(href),
        ...(modified ? { lastModified: new Date(modified) } : {}),
        ...SETTINGS[slug],
        ...(slug === "gallery" ? { images: gallery.map((photo) => url(photo.src)) } : {}),
      },
    ];
  });
}
