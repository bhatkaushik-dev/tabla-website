import Image from "next/image";

import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import {
  breadcrumbSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { withTablaPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | Kaushik Bhat, Tabla Artist Bangalore",
  description:
    "Contact tabla artist Kaushik Bhat in JP Nagar, Bangalore for class enrolment, concert bookings and accompaniment enquiries. WhatsApp, phone and email.",
  ogTitle: "Contact Kaushik Bhat — Tabla Artist, Bangalore",
  ogDescription:
    "Class enrolment, concert bookings and accompaniment enquiries — JP Nagar, Bangalore.",
});

/** Fades all four edges of the photo into the page, keeping the frame whole. */
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)";

/**
 * One screen: the photograph whole on the left, the form on the right. The
 * form itself carries the number and email in its footnote, so there is no
 * separate details list. On phones the photo is dropped — the form is the
 * page.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          musicSchoolSchema(),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        )}
      />

      <section className="px-6 pb-20 pt-32 sm:pt-36 lg:flex lg:min-h-svh lg:items-center lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* The full frame at its own 2:3 proportions — nothing is cropped;
              the edges fade into the page instead of ending in a hard line. */}
          <div className="relative mx-auto hidden aspect-1707/2560 w-full max-w-md lg:block">
            <Image
              src={withTablaPhoto.src}
              alt={withTablaPhoto.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="28rem"
              className="photo-tone object-cover"
              style={{
                maskImage: EDGE_FADE,
                WebkitMaskImage: EDGE_FADE,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </div>

          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl">
              Say
              <Highlight>Hello</Highlight>
            </h1>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
