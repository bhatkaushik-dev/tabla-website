import {
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  House,
  Laptop,
  MapPin,
  Monitor,
  Music,
  Star,
  User,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { WaveDivider } from "@/components/Waveform";
import { getContent, getPage } from "@/lib/content";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([getPage("classes"), getContent()]);
  return pageMetadata(page.seo, profile, "/classes/opengraph-image/card");
}

/**
 * The format icons the admin can name (lucide names, kebab-case). Listed
 * explicitly rather than looked up dynamically, so only these are bundled.
 */
const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  calendar: CalendarDays,
  clock: Clock,
  "graduation-cap": GraduationCap,
  home: House,
  house: House,
  laptop: Laptop,
  "map-pin": MapPin,
  monitor: Monitor,
  music: Music,
  star: Star,
  user: User,
  users: Users,
  video: Video,
};

export default async function ClassesPage() {
  const { profile, faqs } = await getContent();
  const { header, formats, faqHeading, cta } = await getPage("classes");

  return (
    <>
      <JsonLd
        data={graph(
          musicSchoolSchema(profile),
          breadcrumbSchema([{ name: header.title, path: "/classes" }]),
          // FAQPage markup only alongside the visible accordion it mirrors.
          ...(faqs.length ? [faqSchema(faqs)] : []),
        )}
      />

      <PageHeader
        eyebrow={header.eyebrow}
        title={header.heading}
        highlight={header.highlight}
        intro={header.intro}
        photo={header.photo}
        photoOptions={{
          side: "left",
          square: true,
          position: "50% 58%",
          mobilePosition: "50% 30%",
        }}
      />

      {/* Formats */}
      {formats.length > 0 && (
        <section className="border-y border-accent/15 bg-surface-alt px-6">
          <div className="mx-auto grid max-w-6xl md:grid-cols-3">
            {formats.map(({ icon, title, body }, index) => {
              const Icon = icon ? ICONS[icon] : undefined;
              return (
                <FadeIn
                  key={title}
                  delay={index * 0.08}
                  className="flex gap-4 border-accent/15 py-8 not-first:border-t md:px-8 md:not-first:border-l md:not-first:border-t-0 md:first:pl-0"
                >
                  {Icon && (
                    <Icon size={20} aria-hidden className="mt-1 shrink-0 text-primary" />
                  )}
                  <div>
                    <h2 className="font-serif text-lg font-bold">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <>
          <WaveDivider className="pb-0 pt-16 sm:pt-20" />
          <section className="px-6 pb-20 pt-10 sm:pb-28 sm:pt-14">
            <div className="mx-auto max-w-3xl">
              {faqHeading && (
                <SectionHeading
                  eyebrow={faqHeading.eyebrow}
                  title={faqHeading.heading}
                  highlight={faqHeading.highlight}
                  className="mb-12"
                />
              )}
              <div>
                <FAQ faqs={faqs} />
              </div>
            </div>
          </section>
        </>
      )}

      {cta && (
        <CTASection
          eyebrow={cta.eyebrow}
          title={cta.heading}
          highlight={cta.highlight}
          body={cta.body}
          primary={cta.primary}
          secondary={cta.secondary}
          photo={cta.photo}
        />
      )}
    </>
  );
}
