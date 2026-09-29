import Image from "next/image";

import BioStory from "@/components/BioStory";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { WaveDivider } from "@/components/Waveform";
import { getContent, getPage } from "@/lib/content";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/site";
import type { Profile } from "@/lib/types";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([getPage("about"), getContent()]);
  return pageMetadata(page.seo, profile);
}

function facts({ training, address }: Profile) {
  const facts: { label: string; value: string }[] = [];
  if (training.years) facts.push({ label: "Training", value: `${training.years}+ years` });
  if (training.grade)
    facts.push({
      label: training.gradingBody ? `${training.gradingBody} grading` : "Grading",
      value: training.grade,
    });
  if (training.teacher) facts.push({ label: "Guru", value: training.teacher });
  const based = [address.area, address.city].filter(Boolean).join(", ");
  if (based) facts.push({ label: "Based in", value: based });
  return facts;
}

/**
 * The biography, split into chapters — one per photograph. The words are
 * edited in the admin panel (Pages → About); only the layout lives here.
 */
export default async function AboutPage() {
  const { profile } = await getContent();
  const { header, chapters, printPhoto } = await getPage("about");

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema([{ name: header.title, path: "/about" }]))}
      />

      <PageHeader
        eyebrow={header.eyebrow}
        title={header.heading}
        highlight={header.highlight}
        intro={header.intro}
        // The childhood scan is only 325px wide, so it is shown framed at
        // about its own size rather than as a full-bleed header photo.
        inset={header.photo && { photo: header.photo, caption: header.photo.caption }}
        facts={facts(profile)}
      />

      <WaveDivider className="py-0" />

      <section className="relative" data-print="page">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 print:px-0 print:py-0">
          {/* The screen photographs are decorative, so the printed bio
              carries its own portrait. */}
          {printPhoto && (
            <div data-print="photo" className="relative hidden aspect-4/5 print:block">
              <Image
                src={printPhoto.src}
                alt={printPhoto.alt}
                fill
                sizes="42mm"
                className="object-cover object-top"
              />
            </div>
          )}

          <div className="print:mt-8">
            <BioStory chapters={chapters} />
          </div>
        </div>
      </section>
    </>
  );
}
