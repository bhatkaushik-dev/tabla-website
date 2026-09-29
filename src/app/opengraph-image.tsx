import { getContent } from "@/lib/content";
import { credentialLine, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const revalidate = 300;

/** The site-wide social card. Metadata is generated so the alt text is the CMS's too. */
export async function generateImageMetadata() {
  const { profile } = await getContent();
  return [
    {
      id: "card",
      alt: [profile.name, profile.tagline ?? profile.role].join(" — "),
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image() {
  const { profile } = await getContent();
  return renderOgImage({
    title: profile.name,
    subtitle: profile.tagline ?? profile.role,
    name: profile.name,
    credential: credentialLine(profile),
  });
}
