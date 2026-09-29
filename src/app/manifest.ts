import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { languageTag } from "@/lib/site";

export const revalidate = 300;

/**
 * Replaces the hand-written public/manifest.json, which carried a theme colour
 * that disagreed with both the CSS and the metadata, and pointed at an 8MB
 * JPEG as its icon.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { profile } = await getContent();
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.shortName,
    description: profile.description ?? profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0908",
    theme_color: "#0b0908",
    lang: languageTag(profile.locale),
    categories: ["music", "education"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
