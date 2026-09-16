import Image from "next/image";
import { Check, MapPin, Monitor, Users } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import FAQ from "@/components/FAQ";
import AccentCard from "@/components/AccentCard";
import PillButton from "@/components/PillButton";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { classesPhoto } from "@/lib/photos";
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
    "tabla class near me Bangalore",
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
    points: [
      "Posture, hand position, tuning and the basic bols",
      "Theka in teentaal, dadra and keherwa",
    ],
  },
  {
    name: "Intermediate",
    summary: "Building repertoire",
    points: [
      "Kaida, peshkar, rela, tukda and chakradhar",
      "Accompanying vocal and instrumental music",
    ],
  },
  {
    name: "Advanced",
    summary: "Solo and stage",
    points: [
      "Full solo repertoire, laykari and improvisation",
      "Kathak accompaniment, exams and stage performance",
    ],
  },
];

const formats = [
  {
    Icon: MapPin,
    title: "In person, JP Nagar",
    body: "At the JP Nagar studio — close to Jayanagar, Banashankari and BTM Layout.",
  },
  {
    Icon: Monitor,
    title: "Online, anywhere",
    body: "Live video lessons following the same syllabus, from home.",
  },
  {
    Icon: Users,
    title: "One-to-one or small batch",
    body: "Weekday evenings and weekend mornings, about an hour a class.",
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
        highlight="JP Nagar"
        intro={`Learn from Kaushik Bhat, a ${site.training.grade} graded artist of ${site.training.gradingBody} — in person in Bangalore, or online. Complete beginners welcome.`}
        crumbs={[{ label: "Tabla Classes", href: "/classes" }]}
      />

      {/* Formats */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {formats.map(({ Icon, title, body }, index) => (
              <FadeIn key={title} delay={index * 0.08}>
                <AccentCard className="h-full px-6 py-7">
                  <Icon size={22} aria-hidden className="text-primary" />
                  <h2 className="mt-4 font-serif text-xl font-bold">{title}</h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </AccentCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="border-y border-border bg-surface-alt px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Syllabus"
            title="Level by"
            highlight="Level"
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {levels.map((level, index) => (
              <FadeIn key={level.name} delay={index * 0.08}>
                <div className="gold-border h-full rounded-2xl bg-secondary p-8">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    {level.name}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    {level.summary}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {level.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-muted-foreground">
                        <Check
                          size={16}
                          aria-hidden
                          className="mt-1 shrink-0 text-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher + location */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <div className="gold-border relative aspect-4/5 overflow-hidden rounded-[2.5rem]">
              <Image
                src={classesPhoto.src}
                alt={classesPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              Your teacher
            </p>
            <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">
              A Performing <span className="text-gradient">Artist</span>
            </h2>
            <p className="mt-8 leading-relaxed text-muted-foreground md:text-lg">
              Kaushik Bhat is a {site.training.grade} graded tabla artist of{" "}
              {site.training.gradingBody}, trained for over{" "}
              {site.training.years} years under {site.training.teacher}. What
              students learn is the repertoire as it is actually played on
              stage.
            </p>

            <AccentCard className="mt-9 px-7 py-7">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
                Where
              </h3>
              <p className="mt-4 text-lg font-medium text-foreground">
                {site.address.locality}, {site.address.city} —{" "}
                {site.address.postalCode}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PillButton
                  href={whatsappLink(
                    "Hi Kaushik, I'd like to know more about your tabla classes in JP Nagar.",
                  )}
                  size="default"
                  newTab
                >
                  Ask on WhatsApp
                </PillButton>
                <PillButton href={telLink()} variant="outline" size="default">
                  {site.phoneDisplay}
                </PillButton>
              </div>
            </AccentCard>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently"
            highlight="Asked"
          />
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Enrolment"
        title="Start Learning"
        highlight="This Month"
        body="Tell Kaushik about your experience and when you're free, and he'll suggest a batch or one-to-one slot."
        primary={{ href: "/contact", label: "Enquire About Classes" }}
        secondary={{ href: "/performances", label: "Hear Him Play" }}
      />
    </>
  );
}
