import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { galleryPhotos } from "@/lib/photos";

/**
 * Real routes only. The previous version listed hash fragments (/#gallery),
 * which Google discards — it was effectively a one-URL sitemap.
 *
 * /gallery carries an `images` list so the photographs are eligible for image
 * search in their own right.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  return [
    {
      url: url("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/classes"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: url("/performances"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/gallery"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: galleryPhotos.map((photo) => url(photo.src)),
    },
    {
      url: url("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
