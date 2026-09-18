import { YoutubeIcon } from "@/components/BrandIcons";
import PageHeader from "@/components/PageHeader";
import VideoCard from "@/components/VideoCard";
import PillButton from "@/components/PillButton";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import { breadcrumbSchema, graph, videoSchemas } from "@/lib/jsonld";
import { videos } from "@/lib/videos";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/performances",
  title: "Tabla Performances & Videos | Kaushik Bhat",
  description:
    "Watch Kaushik Bhat perform tabla: a solo in drut teentaal, Raag Multani with Shri Aniruddh Aithal and Raag Hamsadhwani with Samarth Hegde.",
  ogTitle: "Tabla Performances & Videos — Kaushik Bhat",
  ogDescription:
    "Tabla solo in drut teentaal, Raag Multani and Raag Hamsadhwani — Hindustani classical performances by Kaushik Bhat.",
});

export default function PerformancesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Performances", path: "/performances" },
          ]),
          ...videoSchemas(),
        )}
      />

      <PageHeader
        eyebrow="Artistry in motion"
        title="Watch &"
        highlight="Experience"
        intro="Tabla solo and classical accompaniment, recorded live."
        crumbs={[{ label: "Performances", href: "/performances" }]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            {videos.map((video, index) => (
              <FadeIn key={video.id} delay={index * 0.08}>
                <VideoCard video={video} />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-16 flex flex-col items-center gap-5 border-t border-border pt-12 text-center">
            <h2 className="display text-2xl font-bold">
              More on the YouTube channel
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Concert recordings, solo compositions and accompaniment sets are
              posted regularly.
            </p>
            <PillButton href={site.social.youtube} newTab>
              <YoutubeIcon size={18} />
              Visit @KaushikBhatTabla
            </PillButton>
          </FadeIn>
        </div>
      </section>

      <CTASection
        eyebrow="Bookings"
        title="Invite Kaushik to your concert"
        body="Available for solo tabla, classical and devotional accompaniment, Kathak recitals and studio recording."
        primary={{ href: "/contact", label: "Enquire now" }}
        secondary={{ href: "/gallery", label: "See the gallery" }}
      />
    </>
  );
}
