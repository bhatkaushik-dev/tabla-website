import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Props = {
  photo: Photo;
  /** Which side of the section the photograph is pinned to from 1024px up. */
  side?: "left" | "right";
  /** object-position from 1024px up, e.g. "50% 20%". */
  position?: string;
  /** object-position on phones and tablets, where the frame is `mobileAspect`. */
  mobilePosition?: string;
  /** Aspect class for the stacked frame below 1024px. */
  mobileAspect?: string;
  /** Width of the photograph from 1024px up. */
  width?: string;
  /** Width of the text column from 1024px up. */
  contentWidth?: string;
  /**
   * From 1024px up, show the photograph as a crisp square frame, vertically
   * centred beside the text and aligned to the content column, instead of a
   * full-height background that dissolves into the page.
   */
  square?: boolean;
  /**
   * Below 1024px, put the text above the photo instead of rising over it —
   * for bands that follow another photograph, so two images never stack.
   */
  mobileTextFirst?: boolean;
  /** Above-the-fold use: load eagerly at high priority. */
  preload?: boolean;
  as?: "section" | "header";
  className?: string;
  children: ReactNode;
};

/**
 * A section whose photograph is its background rather than a framed picture —
 * the device the home hero uses, reusable for page headers and content bands.
 *
 *   - 1024px up: the photo fills one side at full section height, and its inner
 *     edge, top and bottom are masked away so it dissolves into the page. The
 *     text sits in the other side's dark.
 *   - Below that: the photo is a full-width frame and the text rises over its
 *     faded lower edge, so nothing ever covers the face.
 *
 * The studio sweep is light grey; `.photo-tone` pulls it down to charcoal.
 */
export default function PhotoSplit({
  photo,
  side = "right",
  position = "50% 30%",
  mobilePosition = "50% 20%",
  mobileAspect = "aspect-4/5 sm:aspect-[16/11]",
  width = "lg:w-[56%]",
  contentWidth = "lg:w-[44%]",
  square = false,
  mobileTextFirst = false,
  preload = false,
  as: Component = "section",
  className,
  children,
}: Props) {
  return (
    <Component
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-background lg:flex-row lg:items-center",
        className,
      )}
    >
      <div
        data-print="hide"
        className={cn(
          "relative -z-10 w-full overflow-hidden lg:absolute lg:inset-y-0 lg:aspect-auto lg:h-full",
          mobileAspect,
          square
            ? // Lines up with the 80rem content column (plus its 1.5rem
              // gutter) rather than the window edge.
              "lg:inset-y-auto lg:top-1/2 lg:h-auto lg:w-[min(36rem,42%)] lg:-translate-y-1/2 lg:aspect-square lg:rounded-sm"
            : width,
          Component === "header" && "mt-16 lg:mt-0",
          mobileTextFirst && "order-2 lg:order-none",
          side === "right"
            ? square
              ? "lg:right-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]"
              : "photo-fade-left lg:right-0"
            : square
              ? "lg:left-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]"
              : "photo-fade-right lg:left-0",
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : undefined}
          sizes="(min-width: 1024px) 56vw, 100vw"
          style={
            { "--pos": position, "--pos-sm": mobilePosition } as CSSProperties
          }
          className="photo-tone object-cover object-(--pos-sm) lg:object-(--pos)"
        />

        {/* Stacked frame: fade in from the page above, out into the text below. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background via-background/70 to-transparent lg:hidden" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-6 lg:mt-0 lg:py-28 print:mt-0 print:px-0 print:pb-4",
          mobileTextFirst
            ? "order-1 pb-4 pt-6 lg:order-none"
            : "-mt-16 pb-20 sm:-mt-28",
        )}
      >
        <div className={cn(contentWidth, side === "left" && "lg:ml-auto", "print:w-auto")}>
          {children}
        </div>
      </div>
    </Component>
  );
}
