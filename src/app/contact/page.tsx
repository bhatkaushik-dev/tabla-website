import Image from "next/image";
import { MapPin } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { Eyebrow, Highlight } from "@/components/SectionHeading";
import Waveform, { HeaderBackdrop } from "@/components/Waveform";
import {
  breadcrumbSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { getContent, getPage } from "@/lib/content";
import {
  domain,
  fullAddress,
  mailtoLink,
  pageMetadata,
  telLink,
  whatsappLink,
} from "@/lib/site";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([getPage("contact"), getContent()]);
  return pageMetadata(page.seo, profile);
}

/** Fades all four edges of the photo into the page, keeping the frame whole. */
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent), linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)";

/**
 * One screen: the photograph whole on the left, the form on the right. The
 * form itself carries the number and email in its footnote, so there is no
 * separate details list. On phones the photo is dropped — the form is the
 * page.
 */
export default async function ContactPage() {
  const { profile } = await getContent();
  const { header, enquiryTypes, location } = await getPage("contact");
  const { address } = profile;
  const photo = header.photo;
  const directions = fullAddress(profile);
  const cityLine = [address.city, address.postalCode].filter(Boolean).join(" ");

  return (
    <>
      <JsonLd
        data={graph(
          musicSchoolSchema(profile),
          breadcrumbSchema([{ name: header.title, path: "/contact" }]),
        )}
      />

      <section className="px-6 pb-20 pt-32 sm:pt-36 lg:flex lg:min-h-svh lg:items-center lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* The full frame at its own proportions — nothing is cropped;
              the edges fade into the page instead of ending in a hard line.
              Sits in the right-hand column, with the form on the left. */}
          {photo && (
            <div
              className="relative mx-auto hidden w-full max-w-md lg:order-2 lg:block"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
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
          )}

          <div className={photo ? undefined : "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-2xl"}>
            <div className="relative isolate">
              <HeaderBackdrop className="-inset-x-6 -inset-y-10 lg:-inset-x-24" />
              {header.eyebrow && <Eyebrow>{header.eyebrow}</Eyebrow>}
              <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl">
                {header.heading}
                {header.highlight && <Highlight>{header.highlight}</Highlight>}
              </h1>
              <Waveform animate="always" className="mt-6 block h-6 w-32 text-accent/80" />
              {header.intro && (
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  {header.intro}
                </p>
              )}
            </div>
            <div className="mt-8">
              <ContactForm
                recipient={profile.name}
                enquiryTypes={enquiryTypes}
                whatsappBase={whatsappLink(profile)}
                domain={domain}
                tel={telLink(profile)}
                mailto={mailtoLink(profile)}
                phoneDisplay={profile.phoneDisplay ?? (profile.phone && `+${profile.phone}`)}
                email={profile.email}
              />
            </div>

            {/* Location. The address is written exactly as the host school
                publishes it — the same string as the footer and JSON-LD. */}
            {directions && location && (
              <div className="mt-12 border-t border-accent/20 pt-8">
                <h2 className="eyebrow">{location.heading}</h2>
                <div className="mt-4 flex gap-3">
                  <MapPin size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
                  <div>
                    <address className="not-italic leading-relaxed text-foreground">
                      {address.venue && (
                        <>
                          {address.venue}
                          <br />
                        </>
                      )}
                      {[address.street, address.locality].filter(Boolean).join(", ")}
                      <br />
                      {[cityLine, address.region].filter(Boolean).join(", ")}
                    </address>
                    {location.note && (
                      <p className="mt-2 text-sm text-muted-foreground">{location.note}</p>
                    )}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directions)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block py-2.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Get directions →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
