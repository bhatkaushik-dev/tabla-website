import PillButton from "./PillButton";

type Props = {
  eyebrow?: string;
  title: string;
  /** Trailing words set in gold. */
  highlight?: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

/** Centred band used to close a page. */
export default function CTASection({
  eyebrow,
  title,
  highlight,
  body,
  primary,
  secondary,
}: Props) {
  return (
    <section
      data-print="hide"
      className="relative overflow-hidden border-t border-accent/15 px-6 py-24 text-center"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient">{highlight}</span>
            </>
          )}
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
          {body}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <PillButton href={primary.href} className="w-full sm:w-auto">
            {primary.label}
          </PillButton>
          {secondary && (
            <PillButton
              href={secondary.href}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {secondary.label}
            </PillButton>
          )}
        </div>
      </div>
    </section>
  );
}
