import Link from "next/link";
import { fullAddress, nav, site } from "@/lib/site";
import SocialLinks from "./SocialLinks";

/**
 * Deliberately minimal: the navbar already carries the name and the contact
 * page carries the details, so the footer is just the page links, socials and
 * the copyright — a single compact band, even on phones.
 */
export default function Footer() {
  return (
    <footer
      data-print="hide"
      className="border-t border-border bg-surface-alt px-6 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
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

        <SocialLinks />
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 text-center text-xs text-muted-foreground md:flex-row md:justify-between md:text-left">
        {/* The same address string as the contact page and the JSON-LD. */}
        <address className="not-italic">Tabla classes at {fullAddress}</address>
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
