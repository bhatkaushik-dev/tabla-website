import Image from "next/image";
import { MapPin } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import {
  breadcrumbSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { withTablaPhoto } from "@/lib/photos";
import { fullAddress, pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | Tabla Classes in JP Nagar, Bengaluru — Kaushik Bhat",
  description:
    "Enquire about tabla classes in JP Nagar, South Bengaluru. Classes are held inside Swara Hindustani Classical Music School, JP Nagar 1st Phase. WhatsApp, phone or email.",
  ogTitle: "Contact Kaushik Bhat — Tabla Classes in JP Nagar, Bengaluru",
  ogDescription:
    "Class enrolment, concert bookings and accompaniment — Swara Hindustani Classical Music School, JP Nagar 1st Phase, Bengaluru.",
});

/** Fades all four edges of the photo into the page, keeping the frame whole. */
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent), linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)";

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

            {/* Location. The address is written exactly as the host school
                publishes it — the same string as the footer and JSON-LD. */}
            <div className="mt-12 border-t border-accent/20 pt-8">
              <h2 className="eyebrow">Where classes are held</h2>
              <div className="mt-4 flex gap-3">
                <MapPin size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
                <div>
                  <address className="not-italic leading-relaxed text-foreground">
                    {site.address.venue}
                    <br />
                    {site.address.street}, {site.address.locality}
                    <br />
                    {site.address.city} {site.address.postalCode},{" "}
                    {site.address.region}
                  </address>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Classes are held inside the {site.address.venue}.
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
