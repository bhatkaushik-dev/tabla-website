import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import PillButton from "./PillButton";
import { heroPortraitPhoto } from "@/lib/photos";

const rise = (delay: number) =>
  ({ "--rise-delay": `${delay}s` }) as CSSProperties;

/**
 * Photographic hero. Server component — the LCP image and the h1 are in the
 * first HTML response with no client JS gating them.
 *
 * Deliberately sparse: the name, one line of what he does, two actions. The
 * photograph does the rest.
 *
 * The same portrait frame at every width, cropped to him, the drums and the
 * rings they sit on:
 *   - 1024px up: at full section height, pinned right; the name sits over the
 *     dark on the left.
 *   - Below that: the name and buttons sit above the frame, so nothing covers
 *     the artist or the tabla.
 */
export default function Hero() {
  const { props: img } = getImageProps({
    alt: heroPortraitPhoto.alt,
    sizes: "(min-width: 1024px) 60vw, 100vw",
    fetchPriority: "high",
    src: heroPortraitPhoto.src,
    width: heroPortraitPhoto.width,
    height: heroPortraitPhoto.height,
  });

  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden bg-background lg:min-h-svh lg:flex-row lg:items-center">
      {/* Type. Centred above the photo on phones and tablets; left column over
          the dark side of the photo from 1024px up. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 text-center sm:pt-32 lg:py-32 lg:text-left">
        {/* The h1 carries the words people search for ("tabla instructor",
            "JP Nagar") as well as the name. */}
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
            Tabla Instructor · JP Nagar, Bengaluru
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

      {/* Photo. The box is cropped to the band from just above his head to
          just below the tabla rings, so only empty backdrop and floor are
          lost, at every width. Fades are kept to thin edge bands over the
          backdrop — never over him or the drums. On phones it flows under the
          buttons; from 1024px up it is pinned right at section height. */}
      <div className="hero-wide-mask relative -z-10 -mt-16 aspect-[1707/2200] w-full overflow-hidden sm:-mt-10 sm:aspect-auto sm:h-[76svh] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-square lg:h-full lg:w-auto lg:max-w-[58%]">
        <img
          {...img}
          alt={heroPortraitPhoto.alt}
          className="hero-tone hero-zoom h-full w-full object-cover object-top sm:object-[50%_59%] lg:object-[58%_60%]"
        />

        {/* Phones: fade the sweep in from the page above and out into it below. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 sm:h-1/5 bg-linear-to-b from-background via-background/60 to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[12%] bg-linear-to-t from-background to-transparent lg:hidden" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,var(--background)_100%)] opacity-60 lg:hidden" />

        {/* 1024px up: left and bottom edges are faded by .hero-wide-mask;
            these add a short band behind the navbar and darken the backdrop
            corners (the clear centre of the vignette covers him and the drums). */}
        <div aria-hidden className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-x-0 top-0 h-[8%] bg-linear-to-b from-background/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_55%,transparent_62%,var(--background)_100%)] opacity-35" />
        </div>
      </div>

    </section>
  );
}
