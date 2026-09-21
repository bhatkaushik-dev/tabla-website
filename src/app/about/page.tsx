import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";
import PrintBioButton from "@/components/PrintBioButton";
import AccentCard from "@/components/AccentCard";
import SubHeading from "@/components/SubHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { aboutPhoto } from "@/lib/photos";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/about",
  // Absolute title, so the layout template doesn't append a second
  // "Kaushik Bhat" and push it past the ~60 characters Google renders.
  title: "About Kaushik Bhat — Tabla Artist, Bangalore",
  description:
    "The biography of Kaushik Bhat: fourteen years of tabla under Pt Gurumurthy Vaidya, a B-High grading from All India Radio, and performances with Pt Parameshwar Hegde, Ustaad Shafique Khan and Padmashri Kanyakumari Avasarala.",
  ogTitle: "About Kaushik Bhat — Tabla Artist",
  ogDescription:
    "Fourteen years under Pt Gurumurthy Vaidya, B-High graded artist of All India Radio, performing Hindustani classical music across India.",
});

const collaborators = [
  "Pt Parameshwar Hegde",
  "Ustaad Shafique Khan",
  "Dr Ravindra Katoti",
  "Vid Poornima Bhat Kulkarni",
  "Padmashri Kanyakumari Avasarala",
  "Pt Dhananjay Hegde",
  "Pt Himanshu Nanda",
  "Shri Koushik Aithal",
];

const repertoire = [
  "Hindustani classical",
  "Tabla solo",
  "Kathak",
  "Bhajans",
  "Abhangs",
  "Devotional",
  "Film scores",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: "About", path: "/about" }]),
        )}
      />

      <PageHeader
        eyebrow="Biography"
        title="A Journey of"
        highlight="Dedication"
        intro="A tabla artist from Bangalore whose training began at home and has carried him to concert stages across India."
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="px-6 py-20 print:px-0 print:py-0" data-print="page">
        <div
          className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"
          data-print="stack"
        >
          <div>
            <div className="sticky top-28 print:static">
              <div
                data-print="photo"
                className="gold-border relative aspect-4/5 overflow-hidden rounded-[2.5rem]"
              >
                <Image
                  src={aboutPhoto.src}
                  alt={aboutPhoto.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4">
                <AccentCard className="px-4 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Training
                  </dt>
                  <dd className="mt-1 font-serif text-2xl font-bold text-primary">
                    {site.training.years}+ years
                  </dd>
                </AccentCard>
                <AccentCard className="px-4 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    AIR grading
                  </dt>
                  <dd className="mt-1 font-serif text-2xl font-bold text-primary">
                    {site.training.grade}
                  </dd>
                </AccentCard>
              </dl>

              <div className="mt-6" data-print="hide">
                <PrintBioButton />
                <p className="mt-3 text-xs text-muted-foreground">
                  Opens your browser&rsquo;s print dialog — choose
                  &ldquo;Save as PDF&rdquo; for a one-page press bio.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-14">
            <FadeIn as="section">
              <SubHeading>Musical Roots</SubHeading>
              <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Kaushik Bhat&rsquo;s journey into the world of tabla began at
                  the age of {site.training.startAge}. His initial foundation
                  was laid by his father,{" "}
                  <strong className="font-semibold text-foreground">
                    {site.training.father}
                  </strong>
                  , an international artist, who taught him that every stroke is
                  a sculpture in time.
                </p>
                <p>
                  Today, after {site.training.years} years of immersive study,
                  he continues to evolve under the guidance of the legendary{" "}
                  <strong className="font-semibold text-foreground">
                    {site.training.teacher}
                  </strong>
                  . He is a {site.training.grade} graded tabla artist of{" "}
                  {site.training.gradingBody}.
                </p>
              </div>
            </FadeIn>

            <FadeIn as="section">
              <SubHeading>Collaborations</SubHeading>
              <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
                Kaushik has shared the stage with masters of the craft:
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {collaborators.map((artist) => (
                  <li
                    key={artist}
                    className="flex items-center gap-2.5 border-b border-accent/15 pb-3 text-foreground"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {artist}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn as="section">
              <SubHeading>Repertoire</SubHeading>
              <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
                Equally at home accompanying a khayal recital, a Kathak
                performance or a devotional concert:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {repertoire.map((item) => (
                  <li
                    key={item}
                    className="gold-border rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn as="section">
              <SubHeading>Teaching</SubHeading>
              <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Beyond performance, Kaushik is passionate about passing on the
                  tradition. He conducts{" "}
                  <strong className="font-semibold text-foreground">
                    tabla classes in JP Nagar, Bangalore
                  </strong>
                  , for students from complete beginner to advanced, blending
                  traditional training with a modern understanding of rhythm.
                </p>
                <p data-print="hide">
                  <Link
                    href="/classes"
                    className="font-semibold text-primary hover:underline"
                  >
                    See class details, timings and fees →
                  </Link>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Bookings"
        title="Available for concerts and accompaniment"
        body="Solo tabla, classical accompaniment, Kathak, devotional and studio sessions — in Bangalore and beyond."
        primary={{ href: "/contact", label: "Enquire about a booking" }}
        secondary={{ href: "/performances", label: "Watch performances" }}
      />
    </>
  );
}
