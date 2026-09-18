import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Replaces the hand-written public/manifest.json, which carried a theme colour
 * that disagreed with both the CSS and the metadata, and pointed at an 8MB
 * JPEG as its icon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description:
      "Portfolio of Kaushik Bhat, B-High graded tabla artist of All India Radio. Performances and tabla classes in JP Nagar, Bangalore.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0908",
    theme_color: "#0b0908",
    lang: "en-IN",
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
