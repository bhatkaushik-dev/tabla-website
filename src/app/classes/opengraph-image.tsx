import { getContent, getPage } from "@/lib/content";
import { credentialLine, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const revalidate = 300;

const title = ({ heading, highlight }: { heading: string; highlight?: string }) =>
  [heading, highlight].filter(Boolean).join(" ");

/** The /classes social card: the page's own heading over the artist's tagline. */
export async function generateImageMetadata() {
  const [{ profile }, { header }] = await Promise.all([getContent(), getPage("classes")]);
  return [
    {
      id: "card",
      alt: `${title(header)} — ${profile.name}`,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image() {
  const [{ profile }, { header }] = await Promise.all([getContent(), getPage("classes")]);
  return renderOgImage({
    title: title(header),
    subtitle: profile.tagline ?? profile.role,
    name: profile.name,
    credential: credentialLine(profile),
  });
}
