"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/site";
import PillButton from "./PillButton";

export default function Navbar({
  name,
  nav,
  socialLinks,
}: {
  name: string;
  nav: NavItem[];
  /** Shown at the foot of the phone drawer. */
  socialLinks: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the drawer is open: the page behind it can't scroll, and Escape
  // closes it — the two things a phone menu most often gets wrong.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    {/* Dims the page under the open drawer; a tap anywhere on it closes. */}
    <div
      aria-hidden
      data-print="hide"
      onClick={() => setIsOpen(false)}
      className={cn(
        "fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    />
    <header
      data-print="hide"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        // Solid while the drawer is open, so nothing shows through the bar.
        isOpen
          ? "border-b border-border bg-background py-3"
          : scrolled
            ? "glass py-3"
            : "bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="-my-2 py-2 font-serif text-xl font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80"
          aria-label={`${name} — home`}
        >
          {name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-foreground/80",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                )}
              </Link>
            ))}
        </div>

        <button
          type="button"
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Collapsible drawer done with a 0fr -> 1fr grid row, which animates to
          the content's natural height in plain CSS. `hidden` when closed keeps
          the links out of the tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-background transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Closing on click rather than in an effect on `pathname`: tapping a
            link to the current route should still dismiss the drawer, and it
            avoids a cascading render after every navigation. */}
        <div className="min-h-0" onClick={() => setIsOpen(false)}>
          {/* Scrolls on its own if a short landscape screen can't fit it. */}
          <div className="flex max-h-[calc(100svh-4.5rem)] flex-col overflow-y-auto px-6 pb-8 pt-4">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                // Links settle in one after another as the drawer opens.
                style={{ transitionDelay: isOpen ? `${60 + i * 40}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-border/60 py-4 font-serif text-2xl transition-[opacity,transform,color] duration-500",
                  isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  isActive(item.href) ? "text-primary" : "text-foreground active:text-primary",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
            {/* Only while the contact page is published (it's in the nav). */}
            {nav.some((item) => item.href === "/contact") && (
              <PillButton
                href="/contact"
                className="mt-8 justify-center text-center"
              >
                Get in touch
              </PillButton>
            )}
            {socialLinks}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
