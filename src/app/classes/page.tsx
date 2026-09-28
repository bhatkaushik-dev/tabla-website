import { MapPin, Monitor, Users } from "lucide-react";

import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { WaveDivider } from "@/components/Waveform";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { gesturePhoto } from "@/lib/photos";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/classes",
  title: "Tabla Classes in JP Nagar, South Bengaluru | Kaushik Bhat",
  description:
    "Tabla classes in JP Nagar with Kaushik Bhat, a B-High graded All India Radio artist. Learn tabla in South Bengaluru, beginner to advanced, in person or online.",
  keywords: [
    "tabla classes in JP Nagar",
    "tabla classes near me",
    "learn tabla in South Bengaluru",
    "expert tabla instructor in Bangalore",
    "tabla teacher JP Nagar",
    "tabla classes JP Nagar 1st Phase",
    "tabla classes in Bangalore",
    "online tabla classes",
    "tabla classes Jayanagar",
    "tabla classes Banashankari",
  ],
  ogTitle: "Tabla Classes in JP Nagar, South Bengaluru | Kaushik Bhat",
  ogDescription:
    "Learn tabla in South Bengaluru — beginner to advanced tabla classes in JP Nagar, in person or online, with B-High graded All India Radio artist Kaushik Bhat.",
});

const formats = [
  {
    Icon: MapPin,
    title: "In person, JP Nagar 1st Phase",
    body: "Inside Swara Hindustani Classical Music School — near Jayanagar, Banashankari and BTM Layout.",
  },
  {
    Icon: Monitor,
    title: "Online, anywhere",
    body: "Live video lessons on the same syllabus.",
  },
  {
    Icon: Users,
    title: "One-to-one or small batch",
    body: "Weekday evenings and weekend slots available.",
  },
];

export default function ClassesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          musicSchoolSchema(),
          breadcrumbSchema([{ name: "Tabla Classes", path: "/classes" }]),
          faqSchema(),
        )}
      />

      <PageHeader
        eyebrow="Learn tabla"
        title="Tabla Classes in"
        highlight={"JP\u00a0Nagar"}
        // Word joiner after the hyphen, so "B-High" never splits across lines.
        intro={`Learn tabla in South Bengaluru from a ${site.training.grade.replace("-", "-\u2060")} graded ${site.training.gradingBody} artist — in person in JP Nagar 1st Phase, or online. Complete beginners welcome.`}
        photo={gesturePhoto}
        photoOptions={{
          side: "left",
          square: true,
          position: "50% 58%",
          mobilePosition: "50% 30%",
        }}
      >
      </PageHeader>

      {/* Formats */}
      <section className="border-y border-accent/15 bg-surface-alt px-6">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {formats.map(({ Icon, title, body }, index) => (
            <FadeIn
              key={title}
              delay={index * 0.08}
              className="flex gap-4 border-accent/15 py-8 not-first:border-t md:px-8 md:not-first:border-l md:not-first:border-t-0 md:first:pl-0"
            >
              <Icon
                size={20}
                aria-hidden
                className="mt-1 shrink-0 text-primary"
              />
              <div>
                <h2 className="font-serif text-lg font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Teacher */}
      {/* <PhotoSplit
        photo={tuningPhoto}
        side="left"
        position="50% 40%"
        mobilePosition="50% 40%"
        mobileAspect="aspect-[5/4]"
        className="border-y border-accent/15 lg:min-h-160"
      >
        <FadeIn>
          <Eyebrow>Your teacher</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Taught by a
            <Highlight>performing artist</Highlight>
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground md:text-lg">
            {site.training.years} years under {site.training.teacher}, and still
            on stage. What students learn is the repertoire as it is actually
            played — tuning included.
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="eyebrow mr-3">Where</span>
            {site.address.locality}, {site.address.city} —{" "}
            {site.address.postalCode}
          </p>
        </FadeIn>
      </PhotoSplit> */}

      <WaveDivider className="pb-0 pt-16 sm:pt-20" />

      {/* FAQ */}
      <section className="px-6 pb-20 pt-10 sm:pb-28 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently"
            highlight="asked"
          />
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Enrolment"
        title="Start learning"
        highlight="this month"
        body="Tell Kaushik about your experience and when you're free, and he'll suggest a batch or one-to-one slot."
        primary={{ href: "/contact", label: "Enquire about classes" }}
        secondary={{ href: "/performances", label: "Hear him play" }}
      />
    </>
  );
}
