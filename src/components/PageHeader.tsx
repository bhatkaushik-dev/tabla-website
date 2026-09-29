import Image from "next/image";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import PhotoSplit from "./PhotoSplit";
import { Eyebrow, Highlight } from "./SectionHeading";
import Waveform, { HeaderBackdrop } from "./Waveform";
import type { Photo } from "@/lib/types";
import { cn } from "@/lib/utils";

const rise = (delay: number) =>
  ({ "--rise-delay": `${delay}s` }) as CSSProperties;

/** The gold words stay together ("JP Nagar" never splits across lines). */
const keepTogether = (text: string) => text.replace(/ /g, " ");

/** A word joiner after in-word hyphens, so "B-High" never splits either. */
const joinHyphens = (text: string) => text.replace(/(\w)-(\w)/g, "$1-⁠$2");

/** Spreads the title backdrop past the text column, as on the home hero. */
const BACKDROP_INSET = "-inset-x-6 -inset-y-10 lg:-inset-x-24 lg:-inset-y-16";

/** The small live waveform under every page title, as on the home hero. */
const TitleWave = ({ className }: { className?: string }) => (
  <Waveform
    animate="always"
    className={cn("hero-rise mt-6 block h-6 w-32 text-accent/80", className)}
    style={rise(0.2)}
  />
);

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
  /**
   * A small framed photograph beside the title instead of a full-bleed one —
   * for a low-resolution picture that must stay near its own pixel size.
   */
  inset?: { photo: Photo; caption?: string };
  /** Short label/value pairs under the actions (inset headers only). */
  facts?: { label: string; value: string }[];
  /** Actions under the intro (photo and inset headers only). */
  children?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  photo,
  photoOptions,
  inset,
  facts,
  children,
}: Props) {
  highlight = highlight && keepTogether(highlight);
  intro = intro && joinHyphens(intro);

  if (inset) {
    const { photo } = inset;
    return (
      <header className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 print:pb-4 print:pt-0">
        {/* A warm glow behind the print and a faint one behind the name, so
            the dark ground has some depth instead of reading as flat black. */}
        <div
          aria-hidden
          data-print="hide"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_55%_at_80%_45%,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_70%),radial-gradient(ellipse_35%_45%_at_12%_40%,color-mix(in_srgb,var(--accent)_6%,transparent),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-20 print:px-0">
          <div className="relative lg:max-w-2xl">
            <HeaderBackdrop className={BACKDROP_INSET} />
            {eyebrow && <Eyebrow className="hero-rise">{eyebrow}</Eyebrow>}
            <h1
              className="hero-rise mt-5 font-serif text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl"
              style={rise(0.1)}
            >
              {title}
              {highlight && <Highlight>{highlight}</Highlight>}
            </h1>
            <TitleWave />
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
            {facts && facts.length > 0 && (
              <dl
                className="hero-rise mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-accent/20 pt-8 sm:grid-cols-4"
                style={rise(0.5)}
              >
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg leading-snug text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* An album print: cream border, a slight tilt, and a gold frame
              set askew behind it. The photo is capped at the scan's own
              width so it never softens. */}
          <figure
            data-print="hide"
            className="hero-rise relative mx-auto w-[82%] shrink-0 sm:w-full lg:mx-0 lg:mr-6"
            style={{ ...rise(0.3), maxWidth: `${photo.width + 32}px` }}
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-sm border border-accent/50"
            />
            <div className="relative -rotate-2 bg-[#efe7d6] p-3 pb-0 shadow-[0_30px_60px_-12px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:rotate-0 sm:p-4 sm:pb-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes={`${photo.width}px`}
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full"
              />
              {inset.caption && (
                <figcaption className="py-3 text-center font-serif text-base italic text-[#3a2f24] sm:py-4">
                  {inset.caption}
                </figcaption>
              )}
            </div>
          </figure>
        </div>
      </header>
    );
  }

  if (photo) {
    return (
      <PhotoSplit
        as="header"
        photo={photo}
        preload
        className="lg:min-h-[max(40rem,88svh)]"
        {...photoOptions}
      >
        <HeaderBackdrop className={BACKDROP_INSET} />
        {eyebrow && <Eyebrow className="hero-rise">{eyebrow}</Eyebrow>}
        <h1
          className="hero-rise mt-5 font-serif text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl"
          style={rise(0.1)}
        >
          {title}
          {highlight && <Highlight>{highlight}</Highlight>}
        </h1>
        <TitleWave />
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
    <header className="relative isolate overflow-hidden px-6 pb-16 pt-36 text-center sm:pt-44 print:px-0 print:pb-4 print:pt-0 print:text-left">
      <div className="relative mx-auto max-w-3xl">
        <HeaderBackdrop className="-inset-x-6 -inset-y-12 lg:-inset-x-48" />
        {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}

        <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          {title}
          {highlight && <Highlight>{highlight}</Highlight>}
        </h1>
        <TitleWave className="mx-auto" />

        {intro && (
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
