import Link from "next/link";
import { fullAddress, type NavItem } from "@/lib/site";
import type { Profile } from "@/lib/types";
import SocialLinks from "./SocialLinks";
import Waveform from "./Waveform";

/**
 * Deliberately minimal: the navbar already carries the name and the contact
 * page carries the details, so the footer is just the page links, socials and
 * the copyright — a single compact band, even on phones.
 */
export default function Footer({ profile, nav }: { profile: Profile; nav: NavItem[] }) {
  const address = fullAddress(profile);
  return (
    <footer
      data-print="hide"
      className="relative border-t border-border bg-surface-alt py-10"
    >
      {/* A small waveform set into the top rule. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-surface-alt px-4"
      >
        <Waveform animate="always" className="h-5 w-24 text-accent/60" />
      </div>
      {/* Gutter inside the max-width, as in the page sections, so the footer
          lines up with the content column above it. */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <nav aria-label="Footer">
          {/* The only way on from the (short) home page besides the navbar,
              so the links read at a glance: bright, spaced caps with a gold
              underline that draws in on hover. */}
          <ul className="flex flex-wrap justify-center gap-x-7 text-xs font-semibold uppercase tracking-[0.2em] sm:gap-x-8">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // py-3.5 makes a full-size tap target on phones.
                    className="relative inline-block py-3.5 text-foreground transition-colors after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <SocialLinks profile={profile} />
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 px-6 text-center text-xs text-muted-foreground md:flex-row md:justify-between md:text-left">
        {/* The same address string as the contact page and the JSON-LD. */}
        {address && (
          <address className="not-italic">
            {profile.school.name ? `${profile.school.name} — ${address}` : address}
          </address>
        )}
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
