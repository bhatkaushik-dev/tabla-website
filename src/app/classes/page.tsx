import { MapPin, Monitor, Users } from "lucide-react";

import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PhotoSplit from "@/components/PhotoSplit";
import PillButton from "@/components/PillButton";
import SectionHeading, {
  Eyebrow,
  Highlight,
} from "@/components/SectionHeading";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { gesturePhoto, tuningPhoto } from "@/lib/photos";
import { pageMetadata, site, telLink, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/classes",
  title: "Tabla Classes in JP Nagar, Bangalore | Kaushik Bhat",
  description:
    "Learn tabla in JP Nagar, Bangalore with Kaushik Bhat, a B-High graded artist of All India Radio. Beginner to advanced, in-person and online classes, weekday evening and weekend slots.",
  keywords: [
    "tabla classes in JP Nagar",
    "tabla classes in Bangalore",
    "tabla teacher JP Nagar",
    "tabla lessons Bangalore",
    "learn tabla in Bangalore",
    "online tabla classes",
    "tabla classes Jayanagar",
    "tabla classes Bannerghatta Road",
  ],
  ogTitle: "Tabla Classes in JP Nagar, Bangalore | Kaushik Bhat",
  ogDescription:
    "Beginner to advanced tabla classes in JP Nagar, Bangalore — in person and online — with All India Radio B-High graded artist Kaushik Bhat.",
});

const levels = [
  {
    name: "Beginner",
    summary: "No background needed",
    body: "Posture, hand position, tuning and the basic bols; theka in teentaal, dadra and keherwa.",
  },
  {
    name: "Intermediate",
    summary: "Building repertoire",
    body: "Kaida, peshkar, rela, tukda and chakradhar; accompanying vocal and instrumental music.",
  },
  {
    name: "Advanced",
    summary: "Solo and stage",
    body: "Full solo repertoire, laykari and improvisation; Kathak accompaniment, exams and the stage.",
  },
];

const formats = [
  {
    Icon: MapPin,
    title: "In person, JP Nagar",
    body: "Close to Jayanagar, Banashankari and BTM Layout.",
  },
  {
    Icon: Monitor,
    title: "Online, anywhere",
    body: "Live video lessons on the same syllabus.",
  },
  {
    Icon: Users,
    title: "One-to-one or small batch",
    body: "Weekday evenings and weekend mornings.",
  },
];

const enquiry =
  "Hi Kaushik, I'd like to know more about your tabla classes in JP Nagar.";

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
        title="Tabla Classes"
        intro={`Learn from a ${site.training.grade} graded artist of ${site.training.gradingBody} — in person in Bangalore, or online. Complete beginners welcome.`}
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

      {/* Syllabus */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            align="left"
            eyebrow="Syllabus"
            title="Level by"
            highlight="level"
          />

          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {levels.map((level, index) => (
              <FadeIn as="li" key={level.name} delay={index * 0.08}>
                <div className="border-t border-primary/50 pt-6">
                  <span className="font-serif text-sm italic text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl font-bold">
                    {level.name}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    {level.summary}
                  </p>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    {level.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </ol>
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

      {/* FAQ */}
      <section className="px-6 py-20 sm:py-28">
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
