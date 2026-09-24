import Image from "next/image";
import Link from "next/link";

import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PillButton from "@/components/PillButton";
import PrintBioButton from "@/components/PrintBioButton";
import SubHeading from "@/components/SubHeading";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { playingPhoto, withTablaPhoto } from "@/lib/photos";
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

const facts = [
  { label: "Training", value: `${site.training.years}+ years` },
  { label: "AIR grading", value: site.training.grade },
  { label: "Guru", value: site.training.teacher },
  { label: "Based in", value: `${site.address.locality}, Bangalore` },
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
        photo={playingPhoto}
        photoOptions={{ position: "50% 16%", mobilePosition: "50% 0%" }}
      >
        <PrintBioButton />
        <PillButton href="/contact" variant="outline" size="default">
          Book a concert
        </PillButton>
      </PageHeader>

      {/* The biography scrolls over the standing portrait, which stays pinned
          to the viewport for the length of the section — sticky inside a
          clipped layer the size of the section, rather than
          background-attachment: fixed, which iOS ignores. clip-path rather
          than overflow:hidden, which would break the sticky. */}
      <section
        className="relative isolate border-t border-accent/15"
        data-print="page"
      >
        <div
          aria-hidden
          data-print="hide"
          className="absolute inset-0 -z-10 [clip-path:inset(0)]"
        >
          <div className="sticky top-0 h-svh">
            <div className="photo-fade-left absolute inset-y-0 right-0 w-full lg:w-[68%]">
              <Image
                src={playingPhoto.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                className="photo-tone object-cover object-[62%_12%] lg:object-[50%_14%]"
              />
            </div>
            {/* Phones: the text runs over the whole frame, so dim it evenly. */}
            <div className="absolute inset-0 bg-background/75 lg:hidden" />
            {/* Desktop: a wash behind the text column only. */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-background via-background/85 to-transparent lg:block lg:w-[62%]" />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 print:px-0 print:py-0">
          <div className="space-y-16 lg:w-[48%] print:w-auto" data-print="stack">
            {/* The screen photographs are decorative, so the printed bio
                carries its own portrait. */}
            <div
              data-print="photo"
              className="relative hidden aspect-4/5 print:block"
            >
              <Image
                src={withTablaPhoto.src}
                alt={withTablaPhoto.alt}
                fill
                sizes="42mm"
                className="object-cover object-top"
              />
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden border border-accent/20 bg-accent/20">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-background/80 px-5 py-4 backdrop-blur-sm">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

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
              <SubHeading>Repertoire</SubHeading>
              <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
                Equally at home accompanying a khayal recital, a Kathak
                performance or a devotional concert.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {repertoire.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-accent/30 px-4 py-2 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn as="section">
              <SubHeading>Teaching</SubHeading>
              <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
                He teaches{" "}
                <strong className="font-semibold text-foreground">
                  tabla classes in JP Nagar, Bangalore
                </strong>{" "}
                and online, from complete beginners to advanced students.{" "}
                <Link
                  href="/classes"
                  data-print="hide"
                  className="font-semibold text-primary hover:underline"
                >
                  Class details →
                </Link>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
