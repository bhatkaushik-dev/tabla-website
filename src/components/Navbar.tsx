"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";
import PillButton from "./PillButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-print="hide"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-serif text-xl font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80"
          aria-label={`${site.name} — home`}
        >
          {site.name}
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
          <PillButton href="/classes" size="sm">
            Book a class
          </PillButton>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-foreground lg:hidden"
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
          "glass grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
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
          <div className="flex flex-col gap-1 px-6 py-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-border/60 py-3 font-serif text-xl",
                  isActive(item.href) ? "text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <PillButton
              href="/contact"
              size="sm"
              className="mt-4 justify-center py-3 text-center"
            >
              Get in touch
            </PillButton>
          </div>
        </div>
      </div>
    </header>
  );
}
