import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt =
  "Kaushik Bhat — tabla artist and teacher, JP Nagar, Bangalore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "Kaushik Bhat",
    subtitle: "Tabla artist & teacher · JP Nagar, Bangalore",
  });
}
