import type { ComponentProps, CSSProperties, ReactNode } from "react";

import PhotoSplit from "./PhotoSplit";
import { Eyebrow, Highlight } from "./SectionHeading";
import type { Photo } from "@/lib/photos";

const rise = (delay: number) =>
  ({ "--rise-delay": `${delay}s` }) as CSSProperties;

type Props = {
  eyebrow?: string;
  /** Rendered as the page's single h1. */
  title: string;
  /** Trailing words set in gold. */
  highlight?: string;
  intro?: string;
  /**
   * With a photo the header becomes a near-full-height split: the photograph
   * pinned to the right, the title over the dark on the left.
   */
  photo?: Photo;
  photoOptions?: Omit<
    ComponentProps<typeof PhotoSplit>,
    "photo" | "children" | "as" | "preload"
  >;
  /** Actions under the intro (photo headers only). */
  children?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  photo,
  photoOptions,
  children,
}: Props) {
  if (photo) {
    return (
      <PhotoSplit
        as="header"
        photo={photo}
        preload
        className="lg:min-h-[max(40rem,88svh)]"
        {...photoOptions}
      >
        {eyebrow && <Eyebrow className="hero-rise">{eyebrow}</Eyebrow>}
        <h1
          className="hero-rise mt-5 font-serif text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl"
          style={rise(0.1)}
        >
          {title}
          {highlight && <Highlight>{highlight}</Highlight>}
        </h1>
        {intro && (
          <p
            className="hero-rise mt-7 max-w-md leading-relaxed text-muted-foreground md:text-lg"
            style={rise(0.25)}
          >
            {intro}
          </p>
        )}
        {children && (
          <div
            className="hero-rise mt-9 flex flex-wrap gap-3"
            style={rise(0.4)}
            data-print="hide"
          >
            {children}
          </div>
        )}
      </PhotoSplit>
    );
  }

  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-36 text-center sm:pt-44 print:px-0 print:pb-4 print:pt-0 print:text-left">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}

        <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          {title}
          {highlight && <Highlight>{highlight}</Highlight>}
        </h1>

        {intro && (
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
