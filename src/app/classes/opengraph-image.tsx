import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Tabla classes in JP Nagar, Bangalore with Kaushik Bhat";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "Tabla Classes in JP Nagar",
    subtitle: "Beginner to advanced · In-person & online · Bangalore",
  });
}
