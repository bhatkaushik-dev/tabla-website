import type { CSSProperties } from "react";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import PhotoCard from "@/components/PhotoCard";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import Waveform, { HeaderBackdrop, WaveDivider } from "@/components/Waveform";
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

      <header className="relative isolate overflow-hidden px-6 pb-14 pt-32 text-center sm:pt-40 print:px-0 print:pb-4 print:pt-0">
        <div className="relative mx-auto max-w-3xl">
          <HeaderBackdrop className="-inset-x-6 -inset-y-12 lg:-inset-x-48" />
          <Eyebrow className="hero-rise justify-center">Gallery</Eyebrow>
          <h1
            className="hero-rise mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl"
            style={{ "--rise-delay": "0.1s" } as CSSProperties}
          >
            Moments in
            <Highlight>Rhythm</Highlight>
          </h1>
          <div
            className="hero-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
            style={{ "--rise-delay": "0.25s" } as CSSProperties}
          >
            <span>{galleryPhotos.length} photographs</span>
            <Waveform animate="always" className="h-4 w-16 text-accent/70" />
            <span>Free to download</span>
          </div>
        </div>
      </header>

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
          <WaveDivider className="px-0 pb-6 pt-16" />
          <p
            id="licence"
            className="mx-auto max-w-xl scroll-mt-28 text-center text-sm leading-relaxed text-muted-foreground"
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
