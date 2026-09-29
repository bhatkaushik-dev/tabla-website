import Image from "next/image";

import RichText from "./RichText";
import SubHeading from "./SubHeading";
import FadeIn from "./FadeIn";
import type { Chapter } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The /about biography in plain reading order. A chapter with a photograph is
 * a two-column row, the photo alternating sides from 1024px up and stacked
 * above the text below that; a chapter without one is a single text column.
 *
 * The family-album photos are small scans, so each is capped near its own
 * pixel width instead of stretched to fill the column.
 */
export default function BioStory({ chapters }: { chapters: Chapter[] }) {
  let photoRow = 0;

  return (
    <div className="space-y-24 lg:space-y-32">
      {chapters.map((chapter) => {
        const { photo } = chapter;
        const body = (
          <div>
            {chapter.title && <SubHeading>{chapter.title}</SubHeading>}
            <div
              className={cn(
                "space-y-5 leading-relaxed text-muted-foreground md:text-lg",
                chapter.title && "mt-6",
              )}
            >
              {chapter.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        );

        if (!photo) {
          return (
            <FadeIn as="section" key={chapter.id} className="mx-auto max-w-3xl">
              <div id={chapter.id}>{body}</div>
            </FadeIn>
          );
        }

        const flip = photoRow++ % 2 === 1;
        return (
          <FadeIn
            as="section"
            key={chapter.id}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <figure
              id={chapter.id}
              data-print="hide"
              className={cn("mx-auto w-full", flip && "lg:order-2")}
              // Never more than a touch past the scan's own width, and portraits
              // narrower so they don't tower over their text.
              style={{
                maxWidth: `min(${Math.round(photo.width * 1.1)}px, ${photo.height > photo.width ? "26rem" : "36rem"})`,
              }}
            >
              <div className="gold-border gold-glow overflow-hidden rounded-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 36rem, 92vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-muted-foreground lg:text-[11px] lg:tracking-[0.22em]">
                {chapter.caption ?? photo.caption}
              </figcaption>
            </figure>
            {body}
          </FadeIn>
        );
      })}
    </div>
  );
}
