import { Mail, MapPin, Phone } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import {
  breadcrumbSchema,
  graph,
  musicSchoolSchema,
} from "@/lib/jsonld";
import { mailtoLink, pageMetadata, site, telLink } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | Kaushik Bhat, Tabla Artist Bangalore",
  description:
    "Contact tabla artist Kaushik Bhat in JP Nagar, Bangalore for class enrolment, concert bookings and accompaniment enquiries. WhatsApp, phone and email.",
  ogTitle: "Contact Kaushik Bhat — Tabla Artist, Bangalore",
  ogDescription:
    "Class enrolment, concert bookings and accompaniment enquiries — JP Nagar, Bangalore.",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          musicSchoolSchema(),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        )}
      />

      <PageHeader
        eyebrow="Get in touch"
        title="Say"
        highlight="Hello"
        intro="Class enrolment, concert bookings and accompaniment. WhatsApp gets the quickest reply."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.15fr]">
          <FadeIn>
            <h2 className="display text-3xl font-bold">Details</h2>
            <div className="rule mt-4 w-20" />

            <ul className="mt-8 space-y-6">
              <li>
                <a href={telLink()} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
                    <Phone size={17} aria-hidden />
                  </span>
                  <span>
                    <span className="eyebrow">Phone & WhatsApp</span>
                    <span className="mt-1 block text-lg font-medium text-foreground group-hover:text-primary">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={mailtoLink()}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
                    <Mail size={17} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow">Email</span>
                    <span className="mt-1 block break-all text-lg font-medium text-foreground group-hover:text-primary">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                  <MapPin size={17} aria-hidden />
                </span>
                <span>
                  <span className="eyebrow">Location</span>
                  <span className="mt-1 block text-lg font-medium text-foreground">
                    {site.address.locality}, {site.address.city}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {site.address.region} {site.address.postalCode}, India
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-10 border-t border-border pt-8">
              <h3 className="eyebrow">Follow</h3>
              <SocialLinks className="mt-4" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border-t-2 border-accent bg-surface-alt p-7 sm:p-9">
              <h2 className="display text-3xl font-bold">Send a message</h2>
              <p className="mt-3 text-muted-foreground">
                Fill this in and it opens WhatsApp with your enquiry ready to
                send.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
