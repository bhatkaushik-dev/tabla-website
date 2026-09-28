import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import BioStory, { type Chapter } from "@/components/BioStory";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import PillButton from "@/components/PillButton";
import PrintBioButton from "@/components/PrintBioButton";
import SubHeading from "@/components/SubHeading";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import {
  childhoodPhoto,
  guruPhoto,
  parentsPhoto,
  withTablaPhoto,
} from "@/lib/photos";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/about",
  // Absolute title, so the layout template doesn't append a second
  // "Kaushik Bhat" and push it past the ~60 characters Google renders.
  title: "About Kaushik Bhat — Tabla Artist, Bangalore",
  description:
    "The biography of Kaushik Bhat: fourteen years of tabla under Pt Gurumurthy Vaidya, a B-High grading from All India Radio, a CCRT scholarship, and performances with Pt Vinayak Torvi, Pt Parameshwar Hegde and Ustad Shafique Khan.",
  ogTitle: "About Kaushik Bhat — Tabla Artist",
  ogDescription:
    "Fourteen years under Pt Gurumurthy Vaidya, B-High graded artist of All India Radio, performing Hindustani classical music across India.",
});

const facts = [
  { label: "Training", value: `${site.training.years}+ years` },
  { label: "AIR grading", value: site.training.grade },
  { label: "Guru", value: site.training.teacher },
  { label: "Based in", value: `${site.address.area}, Bengaluru` },
];

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-foreground">{children}</strong>
);

/**
 * Kaushik's own biography, word for word and in his order — do not reword it.
 * Split into chapters, one per family-album photograph.
 */
const chapters: Chapter[] = [
  {
    id: "early-years",
    title: "Early Years",
    photo: parentsPhoto,
    caption: "With his parents, Smt. Sunanda Bhat & Shri Ganesh Bhat",
    children: (
      <>
        <p>
          Kaushik Bhat is an accomplished tabla player and a{" "}
          <Strong>B-High graded artist with All India Radio</Strong>.
        </p>
        <p>
          Hailing from a traditional priest family rooted in the village of{" "}
          <Strong>Idagunji in Uttara Kannada</Strong>, Kaushik was born to{" "}
          <Strong>Smt. Sunanda Bhat</Strong> and the renowned stone sculptor{" "}
          <Strong>Shri Ganesh Bhat</Strong>. His musical journey began at age
          10 under his father&rsquo;s initial guidance.
        </p>
      </>
    ),
  },
  {
    id: "training",
    title: "Training",
    photo: guruPhoto,
    caption: "With his guru, Pt. Gurumurthy Vaidya",
    children: (
      <>
        <p>
          For the past 14 years, he has rigorously honed his craft under the
          esteemed tutelage of <Strong>Pt. Gurumurthy Vaidya</Strong>. An
          outstanding academic musician, Kaushik is a recipient of the
          prestigious <Strong>CCRT Scholarship</Strong>, has completed his{" "}
          <Strong>Visharada and Vidwath</Strong> exams with distinction, and
          has won numerous state and national-level competitions. He has also
          been awarded dedicated scholarships by Sapthak Bengaluru and Shree
          Rama Kalavedike.
        </p>
        <p>
          Known for his versatility, Kaushik excels in{" "}
          <Strong>tabla solo recitals</Strong> as well as accompaniment for
          Hindustani classical vocals, instrumental performances, and Kathak
          dance. His rhythmic expertise extends into the studio, where he
          regularly records for devotional albums, Abhangs, Bhajans, and
          feature film soundtracks.
        </p>
      </>
    ),
  },
  {
    id: "career",
    children: (
      <>
        <p>
          Throughout his career, Kaushik has had the privilege of accompanying
          eminent artists, including <Strong>Pt. Vinayak Torvi</Strong>,{" "}
          <Strong>Pt. Parameshwar Hegde</Strong>,{" "}
          <Strong>Ustad Shafique Khan</Strong>,{" "}
          <Strong>Dr. Ashok Hugganavar</Strong>,{" "}
          <Strong>Vidushi Poornima Bhat Kulkarni</Strong>, and{" "}
          <Strong>Ustad Shakir Khan</Strong>. He has showcased his art at major
          cultural organizations and prestigious venues across the country,
          with notable performances at the Bengaluru Ganesh Utsava, SPIC
          MACAY, Shri Rama Kalavedike, Sapthak Bengaluru, and the Bijapure
          Harmonium Foundation.
        </p>
        <p>
          Alongside his deep commitment to Hindustani classical music, Kaushik
          successfully balances his passion for the tabla with a career as a{" "}
          <Strong>Software Engineer</Strong>. With the continued blessings of
          his gurus and elders, a bright and promising career awaits this
          talented musician.
        </p>
      </>
    ),
  },
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
        eyebrow="About"
        title="Kaushik"
        highlight="Bhat"
        // The childhood scan is only 325px wide, so it is shown framed at
        // about its own size rather than as a full-bleed header photo.
        inset={{ photo: childhoodPhoto, caption: "An early concert" }}
        facts={facts}
      >
        <PrintBioButton />
        <PillButton href="/contact" variant="outline" size="default">
          Book a concert
        </PillButton>
      </PageHeader>

      <section
        className="relative border-t border-accent/15"
        data-print="page"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 print:px-0 print:py-0">
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

          <div className="print:mt-8">
            <BioStory chapters={chapters} />
          </div>

          <FadeIn as="section" className="mx-auto mt-24 max-w-3xl border-t border-accent/15 pt-16">
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
      </section>
    </>
  );
}
