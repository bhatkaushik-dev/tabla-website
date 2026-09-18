import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  eyebrow?: string;
  /** Rendered as the page's single h1. */
  title: string;
  /** Trailing words set in gold. */
  highlight?: string;
  intro?: string;
  /** Breadcrumb trail after Home; the last item is the current page. */
  crumbs?: { label: string; href: string }[];
};

export default function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  crumbs,
}: Props) {
  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-36 text-center sm:pt-44 print:px-0 print:pb-4 print:pt-0 print:text-left">
      {/* Gold bloom, same device as the hero. */}
      <div
        aria-hidden
        data-print="hide"
        className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-3xl">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            data-print="hide"
            className="mb-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight size={13} aria-hidden className="text-accent" />
                  {isLast ? (
                    <span aria-current="page" className="text-foreground">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {eyebrow && (
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient">{highlight}</span>
            </>
          )}
        </h1>

        {intro && (
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
