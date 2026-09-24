import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import PhotoSplit from "@/components/PhotoSplit";
import Waveform, { WaveDivider } from "@/components/Waveform";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import {
  creamKurtaPhoto,
  playingPhoto,
  teachingPhoto,
  withTablaPhoto,
} from "@/lib/photos";
import { site } from "@/lib/site";

/**
 * The landing page is deliberately short — hero, one biography band, and an
 * index into the pages that hold the detail. Videos, the gallery and the class
 * syllabus live on their own routes rather than being previewed here.
 */
const sections = [
  {
    href: "/performances",
    title: "Performances",
    body: "Tabla solo and classical accompaniment, recorded live.",
    photo: playingPhoto,
    position: "object-center",
  },
  {
    href: "/gallery",
    title: "Gallery",
    body: "Studio photographs, free to download for press.",
    photo: withTablaPhoto,
    position: "object-[50%_20%]",
  },
  {
    href: "/classes",
    title: "Tabla Classes",
    body: "Beginner to advanced — JP Nagar, or online.",
    photo: teachingPhoto,
    position: "object-[50%_40%]",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <WaveDivider />

      {/* Biography. On phones the text leads, so the hero photograph above
          and this one are never stacked back to back. */}
      <PhotoSplit
        photo={creamKurtaPhoto}
        side="left"
        position="50% 30%"
        mobilePosition="50% 12%"
        width="lg:w-[52%]"
        contentWidth="lg:w-[46%]"
        mobileTextFirst
        className="lg:min-h-192"
      >
        <FadeIn>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Learning, performing,
            <br />
            <Highlight>teaching.</Highlight>
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground md:text-lg">
            He started learning tabla at {site.training.startAge} from his
            father,{" "}
            <span className="text-foreground">{site.training.father}</span>,
            and now trains under{" "}
            <span className="text-foreground">{site.training.teacher}</span>.
          </p>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {site.training.grade} graded · {site.training.gradingBody}
          </p>
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground"
          >
            Read the biography
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </FadeIn>
      </PhotoSplit>

      <WaveDivider />

      {/* Three doors into the rest of the site. Photo cards from 640px up;
          on phones each becomes a compact row with a small thumbnail, so
          large photographs never stack one after another. */}
      <nav aria-label="Explore" className="px-6 pb-20 pt-4 sm:pb-28">
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:gap-6">
          {sections.map((section, index) => (
            <FadeIn as="li" key={section.href} delay={index * 0.06}>
              <Link
                href={section.href}
                className="group flex items-center gap-5 rounded-sm border border-accent/15 p-3 transition-colors hover:border-accent/40 sm:block sm:border-0 sm:p-0"
              >
                <span className="relative block h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-surface sm:aspect-4/5 sm:h-auto sm:w-full">
                  <Image
                    src={section.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 5rem"
                    className={`tile-tone object-cover group-hover:scale-[1.04] ${section.position}`}
                  />
                  {/* Hover: a waveform plays over the photo. */}
                  <span className="absolute inset-x-0 bottom-0 hidden h-1/3 items-end bg-linear-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex">
                    <Waveform animate="hover" className="text-primary" />
                  </span>
                </span>

                <span className="min-w-0 flex-1 sm:mt-5 sm:flex sm:items-start sm:justify-between sm:gap-4">
                  <span className="block">
                    <span className="block font-serif text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {section.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {section.body}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="mt-1.5 hidden shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                  />
                </span>
              </Link>
            </FadeIn>
          ))}
        </ul>
      </nav>
    </>
  );
}
