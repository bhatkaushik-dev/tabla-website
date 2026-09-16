import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { mailtoLink, nav, site, telLink } from "@/lib/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer
      data-print="hide"
      className="border-t border-border bg-surface-alt px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-bold text-foreground">
              {site.name}
            </p>
            <p className="eyebrow mt-2">{site.role}</p>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              {site.training.grade} graded tabla artist of{" "}
              {site.training.gradingBody}. Performing Hindustani classical
              music and teaching tabla in JP Nagar, Bangalore.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>
                <a
                  href={telLink()}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Phone size={15} aria-hidden className="text-accent" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink()}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-primary"
                >
                  <Mail size={15} aria-hidden className="shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} aria-hidden className="mt-1 shrink-0 text-accent" />
                <span>
                  {site.address.locality}, {site.address.city}
                  <br />
                  {site.address.region} {site.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Tabla classes in JP Nagar, Bangalore.</p>
        </div>
      </div>
    </footer>
  );
}
