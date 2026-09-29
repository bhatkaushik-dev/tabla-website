import type { CSSProperties } from "react";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import PhotoCard from "@/components/PhotoCard";
import RichText from "@/components/RichText";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import Waveform, { HeaderBackdrop, WaveDivider } from "@/components/Waveform";
import { getContent, getPage } from "@/lib/content";
import { breadcrumbSchema, gallerySchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([getPage("gallery"), getContent()]);
  return pageMetadata(page.seo, profile);
}

export default async function GalleryPage() {
  const { profile, gallery } = await getContent();
  const { header, seo, countNote, licenceNote } = await getPage("gallery");

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: header.title, path: "/gallery" }]),
          gallerySchema(profile, gallery, seo.title),
        )}
      />

      <header className="relative isolate overflow-hidden px-6 pb-14 pt-32 text-center sm:pt-40 print:px-0 print:pb-4 print:pt-0">
        <div className="relative mx-auto max-w-3xl">
          <HeaderBackdrop className="-inset-x-6 -inset-y-12 lg:-inset-x-48" />
          {header.eyebrow && (
            <Eyebrow className="hero-rise justify-center">{header.eyebrow}</Eyebrow>
          )}
          <h1
            className="hero-rise mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl"
            style={{ "--rise-delay": "0.1s" } as CSSProperties}
          >
            {header.heading}
            {header.highlight && <Highlight>{header.highlight}</Highlight>}
          </h1>
          <div
            className="hero-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
            style={{ "--rise-delay": "0.25s" } as CSSProperties}
          >
            <span>{gallery.length} photographs</span>
            <Waveform animate="always" className="h-4 w-16 text-accent/70" />
            {countNote && <span>{countNote}</span>}
          </div>
          {header.intro && (
            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              {header.intro}
            </p>
          )}
        </div>
      </header>

      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          {/* Two columns from the smallest width up — a single column of
              near-identical portrait crops reads as one endless photo on a
              phone, so pairs sit side by side even there. */}
          <div className="columns-2 gap-3 lg:columns-3 lg:gap-4">
            {gallery.map((photo, index) => (
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
          {licenceNote && (
            <>
              <WaveDivider className="px-0 pb-6 pt-16" />
              <p
                id="licence"
                className="mx-auto max-w-xl scroll-mt-28 text-center text-sm leading-relaxed text-muted-foreground"
              >
                <RichText text={licenceNote} />
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
