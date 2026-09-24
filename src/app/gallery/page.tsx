import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import { breadcrumbSchema, gallerySchema, graph } from "@/lib/jsonld";
import { galleryPhotos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "Photo Gallery | Kaushik Bhat, Tabla Artist",
  description:
    "Studio photographs of tabla artist Kaushik Bhat, free to download in full resolution for press, posters and event listings.",
  ogTitle: "Photo Gallery — Kaushik Bhat, Tabla Artist",
  ogDescription:
    "Studio photographs of Kaushik Bhat, downloadable in full resolution.",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: "Gallery", path: "/gallery" }]),
          gallerySchema(),
        )}
      />

      <PageHeader
        eyebrow=""
        title=""
        highlight=""
        intro=""
      />

      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          {/* Two columns from the smallest width up — a single column of
              near-identical portrait crops reads as one endless photo on a
              phone, so pairs sit side by side even there. */}
          <div className="columns-2 gap-3 lg:columns-3 lg:gap-4">
            {galleryPhotos.map((photo, index) => (
              <FadeIn
                key={photo.id}
                delay={(index % 3) * 0.08}
                className="mb-3 break-inside-avoid lg:mb-4"
              >
                <PhotoCard photo={photo} eager={index < 3} />
              </FadeIn>
            ))}
          </div>

          {/* The id is the target of `license` in the gallery's ImageObject
              nodes — the terms have to live at a real URL, and they already
              live here. */}
          <p
            id="licence"
            className="mt-12 scroll-mt-28 text-center text-sm text-muted-foreground"
          >
            Photographs may be used for event promotion with credit to Kaushik
            Bhat. For other uses, please{" "}
            <a
              href="/contact"
              className="font-semibold text-primary hover:underline"
            >
              get in touch
            </a>
            .
          </p>
        </div>
      </section>

    </>
  );
}
