import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import RichText from "@/components/RichText";
import { WaveDivider } from "@/components/Waveform";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import { getContent, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
import type { Pages } from "@/lib/types";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([
    getPage("home"),
    getContent(),
  ]);
  return pageMetadata(page.seo, profile);
}

/**
 * The landing page is deliberately short — the hero and one biography band.
 * Videos, the gallery and the class syllabus live on their own routes, reached
 * from the navbar and footer rather than previewed here.
 */

export default async function Home() {
  const { profile } = await getContent();
  const { header, tagline, aboutBand } = await getPage("home");

  return (
    <>
      <Hero
        photo={header.photo}
        heading={header.heading}
        highlight={header.highlight}
        tagline={tagline}
        profile={profile}
      />

      {aboutBand && (
        <>
          <WaveDivider />
          <AboutBand band={aboutBand} />
        </>
      )}
    </>
  );
}

/**
 * Biography. From 1024px up the photograph is pinned to the right edge, its
 * left edge dissolving into the page, and the text sits in the dark on the
 * left, aligned to the content column. On phones the text leads, so the hero
 * photograph above and this one are never stacked back to back.
 */
function AboutBand({
  band: aboutBand,
}: {
  band: NonNullable<Pages["home"]["aboutBand"]>;
}) {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-background">
      <div
        className={cn(
          "relative z-10 px-6 pb-4 pt-6",
          aboutBand.photo
            ? "lg:absolute lg:inset-y-0 lg:left-[max(1.5rem,calc((100%-80rem)/2+1.5rem))] lg:flex lg:w-[min(24rem,30%)] lg:items-center lg:px-0 lg:py-0"
            : "mx-auto w-full max-w-7xl pb-20",
        )}
      >
        <FadeIn>
          {aboutBand.eyebrow && <Eyebrow>{aboutBand.eyebrow}</Eyebrow>}
          <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {/* Line breaks in the heading are the admin's, kept as typed. */}
            {aboutBand.heading.split("\n").map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
            {aboutBand.highlight && (
              <>
                <br />
                <Highlight>{aboutBand.highlight}</Highlight>
              </>
            )}
          </h2>
          {aboutBand.body && (
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground md:text-lg lg:mt-6 lg:text-base xl:text-lg">
              <RichText
                text={aboutBand.body}
                strongClassName="font-normal text-foreground"
              />
            </p>
          )}
          {aboutBand.link && (
            <Link
              href={aboutBand.link.href}
              className="group mt-7 inline-flex items-center gap-2 py-3 text-xs lg:mt-5 font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground"
            >
              {aboutBand.link.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </FadeIn>
      </div>

      {/* The whole frame, only the empty sweep above his head trimmed on
            wide screens. Thin fades over the backdrop only. */}
      {aboutBand.photo && (
        <div className="photo-fade-left relative -z-10 aspect-4/3 w-full overflow-hidden sm:aspect-3/2 lg:ml-auto lg:w-[66%] lg:aspect-17/10">
          <Image
            src={aboutBand.photo.src}
            alt={aboutBand.photo.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="photo-tone object-cover object-bottom"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[12%] bg-linear-to-t from-background to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,var(--background)_100%)] opacity-60 lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_50%_55%,transparent_62%,var(--background)_100%)] opacity-60 lg:block"
          />
        </div>
      )}
    </section>
  );
}
