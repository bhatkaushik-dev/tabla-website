import Image from "next/image";
import PillButton from "./PillButton";
import { heroPhoto } from "@/lib/photos";

/**
 * Split hero: type left, framed portrait right. Server component — no
 * interactivity, so the LCP image and the h1 are in the first HTML response
 * with no client JS gating them.
 *
 * The entrance motion is deliberately dropped rather than reproduced with
 * framer-motion: that version server-rendered the section at opacity 0 and
 * only revealed it once JS had hydrated, so a crawler (or a failed script
 * load) saw an empty page.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-background pt-28 md:pt-20">
      {/* Decorative gold bloom behind the composition. */}
      <div
        aria-hidden
        className="absolute left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 md:flex-row md:gap-20">
        {/* Portrait — second in the source, first on a phone. */}
        <div className="relative order-1 w-full max-w-[320px] shrink-0 md:order-2 md:max-w-[420px]">
          <div className="gold-border relative aspect-4/5 w-full overflow-hidden rounded-[3rem] bg-black shadow-2xl md:rounded-[4rem]">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 320px, 420px"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden
            className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-24 w-24 rounded-full border border-primary/20"
          />
        </div>

        <div className="order-2 flex-1 text-center md:order-1 md:text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-primary md:text-xs">
            B-High Graded Artist · AIR
          </p>

          {/* The name stays the visual anchor, but the h1 also has to carry
              the words people actually search for — "kaushik bhat tabla"
              matched nothing in the heading before. */}
          <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            Kaushik <br />
            <span className="text-gradient">Bhat</span>
            <span className="mt-5 block font-sans text-base font-medium tracking-normal text-primary md:text-lg lg:text-xl">
              Tabla Artist &amp; Teacher, Bangalore
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
            A distinguished tabla artist dedicated to the percussive excellence
            of Indian classical music — performing across India, and teaching
            in JP Nagar, Bangalore.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row md:justify-start">
            <PillButton href="/performances" className="w-full sm:w-auto">
              View Performances
            </PillButton>
            <PillButton
              href="/about"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Biography
            </PillButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <div className="h-12 w-px bg-linear-to-b from-primary/50 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Scroll
        </span>
      </div>
    </section>
  );
}
