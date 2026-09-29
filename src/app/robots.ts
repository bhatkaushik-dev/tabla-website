import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ holds only the revalidation webhook — nothing to index.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
