import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import VideoCard from "@/components/VideoCard";
import PillButton from "@/components/PillButton";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import { videos } from "@/lib/videos";
import { aboutPhoto, galleryPhotos } from "@/lib/photos";
import { site } from "@/lib/site";

export default function Home() {
  const featuredVideos = videos.slice(0, 3);
  const stripPhotos = galleryPhotos.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Biography */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <div className="gold-border relative aspect-4/5 overflow-hidden rounded-[2.5rem]">
              <Image
                src={aboutPhoto.src}
                alt={aboutPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              Legacy &amp; lineage
            </p>
            <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">
              A Journey of <span className="text-gradient">Dedication</span>
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Kaushik Bhat began tabla at the age of {site.training.startAge}{" "}
                under his father,{" "}
                <strong className="font-semibold text-foreground">
                  {site.training.father}
                </strong>
                , and has since spent {site.training.years} years training under{" "}
                <strong className="font-semibold text-foreground">
                  {site.training.teacher}
                </strong>
                .
              </p>
            </div>
            <PillButton href="/about" variant="outline" className="mt-9">
              Biography
            </PillButton>
          </FadeIn>
        </div>
      </section>

      {/* Performances */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Artistry in motion"
            title="Watch &"
            highlight="Experience"
          />

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map((video, index) => (
              <FadeIn key={video.id} delay={index * 0.08}>
                <VideoCard video={video} />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 text-center">
            <PillButton href="/performances" variant="outline">
              Explore Full Catalog
            </PillButton>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="On stage"
            title="The"
            highlight="Gallery"
          />

          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stripPhotos.map((photo, index) => (
              <FadeIn key={photo.id} delay={index * 0.06}>
                <Link
                  href="/gallery"
                  className="gold-border group relative block aspect-4/5 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 text-center">
            <PillButton href="/gallery" variant="outline">
              View All Photos
            </PillButton>
          </FadeIn>
        </div>
      </section>

      <CTASection
        eyebrow="Learn tabla"
        title="Tabla Classes in"
        highlight="JP Nagar"
        body="Beginner to advanced, in person or online. Taught by a B-High graded All India Radio artist."
        primary={{ href: "/classes", label: "See Class Details" }}
        secondary={{ href: "/contact", label: "Get in Touch" }}
      />
    </>
  );
}
