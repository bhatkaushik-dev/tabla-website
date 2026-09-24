import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import PillButton from "./PillButton";
import { heroPortraitPhoto, heroWidePhoto } from "@/lib/photos";

const rise = (delay: number) =>
  ({ "--rise-delay": `${delay}s` }) as CSSProperties;

/**
 * Photographic hero. Server component — the LCP image and the h1 are in the
 * first HTML response with no client JS gating them.
 *
 * Deliberately sparse: the name, one line of what he does, two actions. The
 * photograph does the rest.
 *
 * Art-directed with <picture>, and the browser only downloads the source that
 * matches:
 *   - 1024px up: the landscape frame is shown whole at full section height,
 *     pinned right and faded out on its left edge, so it is never zoomed in
 *     however wide the window; the name sits over the dark on the left.
 *   - Below that: the name sits above the portrait frame, over its empty
 *     studio sweep, so nothing covers the artist or the tabla. The bottom of
 *     that frame is cropped away (tuning hammer, powder tin, tape on the floor).
 */
export default function Hero() {
  const common = { alt: heroWidePhoto.alt, sizes: "100vw", fetchPriority: "high" } as const;

  const {
    props: { srcSet: wide },
  } = getImageProps({
    ...common,
    src: heroWidePhoto.src,
    width: heroWidePhoto.width,
    height: heroWidePhoto.height,
  });

  const {
    props: { srcSet: portrait, ...img },
  } = getImageProps({
    ...common,
    src: heroPortraitPhoto.src,
    width: heroPortraitPhoto.width,
    height: heroPortraitPhoto.height,
  });

  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden bg-background lg:min-h-svh lg:flex-row lg:items-center">
      {/* Type. Centred above the photo on phones and tablets; left column over
          the dark side of the photo from 1024px up. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 text-center sm:pt-32 lg:py-32 lg:text-left">
        {/* The h1 carries the words people search for ("tabla artist
            Bangalore") as well as the name. */}
        <h1 className="font-display text-foreground">
          <span
            className="hero-rise block text-4xl font-bold leading-[1.08] sm:text-5xl xl:text-6xl"
            style={rise(0.1)}
          >
            Kaushik
            <br />
            {/* Padding so the gradient fill reaches the B's swash. */}
            <span className="text-gradient -mx-[0.1em] px-[0.1em]">Bhat</span>
          </span>
          <span
            className="hero-rise mt-5 flex items-center justify-center gap-4 whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-primary sm:text-xs sm:tracking-[0.4em] lg:tracking-[0.3em] xl:tracking-[0.4em] lg:mt-7 lg:justify-start"
            style={rise(0.35)}
          >
            <span aria-hidden className="hidden h-px w-8 bg-primary/60 sm:block lg:w-12" />
            Tabla Artist &amp; Teacher · Bangalore
            <span aria-hidden className="hidden h-px w-8 bg-primary/60 sm:block lg:hidden" />
          </span>
        </h1>

        <div
          className="hero-rise mt-7 flex items-center justify-center gap-3 sm:gap-4 lg:mt-9 lg:justify-start"
          style={rise(0.5)}
        >
          <PillButton
            href="/performances"
            className="whitespace-nowrap px-5 py-3 text-xs tracking-[0.12em] sm:px-10 sm:py-4 lg:px-8 xl:px-10 sm:text-sm sm:tracking-[0.15em]"
          >
            View Performances
          </PillButton>
          <PillButton
            href="/about"
            variant="outline"
            className="whitespace-nowrap px-5 py-3 text-xs tracking-[0.12em] sm:px-10 sm:py-4 lg:px-8 xl:px-10 sm:text-sm sm:tracking-[0.15em]"
          >
            Biography
          </PillButton>
        </div>
      </div>

      {/* Photo. On phones it flows under the type, its grey sweep sliding up
          behind the buttons; the box is shorter than the frame so the cluttered
          floor is cropped off. From 1024px up it is the whole 3:2 frame at
          section height, pinned right and nudged slightly past the edge so the
          raised arm clears the tagline (capped at 90% width so a squarer
          window still keeps a dark band on the left for the name). */}
      <div className="hero-wide-mask relative -z-10 -mt-16 aspect-[1707/2200] w-full overflow-hidden sm:-mt-10 sm:aspect-auto sm:h-[76svh] lg:absolute lg:inset-y-0 lg:-right-[16%] lg:mt-0 xl:-right-[6%] lg:aspect-[3/2] lg:h-full lg:w-auto lg:max-w-[90%]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={wide} />
          <source srcSet={portrait} />
          <img
            {...img}
            alt={heroWidePhoto.alt}
            className="hero-tone hero-zoom h-full w-full object-cover object-top sm:object-[50%_59%] lg:object-[65%_50%]"
          />
        </picture>

        {/* Phones: fade the sweep in from the page above and out into it below. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 sm:h-1/5 bg-linear-to-b from-background via-background/60 to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[12%] bg-linear-to-t from-background to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,var(--background)_100%)] opacity-60 lg:hidden" />

        {/* 1024px up: the frame's left and bottom edges are faded by the
            .hero-wide-mask; these add a navbar band and a vignette. */}
        <div aria-hidden className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_40%,transparent_35%,var(--background)_100%)] opacity-70" />
        </div>
      </div>

    </section>
  );
}
