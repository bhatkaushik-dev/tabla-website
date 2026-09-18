import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import {
  breadcrumbSchema,
  gallerySchema,
  graph,
} from "@/lib/jsonld";
import { galleryPhotos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/gallery",
  title: "Photo Gallery | Kaushik Bhat, Tabla Artist",
  description:
    "Concert and studio photographs of tabla artist Kaushik Bhat, free to download in full resolution for press, posters and event listings.",
  ogTitle: "Photo Gallery — Kaushik Bhat, Tabla Artist",
  ogDescription:
    "Concert and studio photographs of Kaushik Bhat, downloadable in full resolution.",
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
        eyebrow="Photographs"
        title="The"
        highlight="Gallery"
        intro="Concert and studio photographs, free to download in full resolution."
        crumbs={[{ label: "Gallery", href: "/gallery" }]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo, index) => (
              <FadeIn key={photo.id} delay={(index % 3) * 0.08}>
                <PhotoCard photo={photo} priority={index < 3} />
              </FadeIn>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            Photographs may be used for event promotion with credit to Kaushik
            Bhat. For other uses, please{" "}
            <a href="/contact" className="font-semibold text-primary hover:underline">
              get in touch
            </a>
            .
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Learn tabla"
        title="Study with Kaushik in JP Nagar"
        body="Tabla classes for all levels, in person in JP Nagar, Bangalore or online from anywhere."
        primary={{ href: "/classes", label: "See class details" }}
        secondary={{ href: "/performances", label: "Watch performances" }}
      />
    </>
  );
}
