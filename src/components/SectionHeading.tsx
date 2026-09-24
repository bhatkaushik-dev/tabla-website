import type { ReactNode } from "react";
import FadeIn from "./FadeIn";
import { cn } from "@/lib/utils";

/** Small ruled label above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-primary",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-primary/60" />
      {children}
    </p>
  );
}

/** The emphasis words of a two-tone headline — set in gold italic. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <>
      {" "}
      <em className="font-normal italic text-primary">{children}</em>
    </>
  );
}

type Props = {
  eyebrow: string;
  title: string;
  /** Trailing words set in gold, e.g. title="Watch &" highlight="Experience". */
  highlight?: string;
  align?: "center" | "left";
  className?: string;
};

/** Eyebrow + two-tone serif headline that opens every section. */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = "center",
  className,
}: Props) {
  return (
    <FadeIn className={cn(align === "center" && "text-center", className)}>
      <Eyebrow className={cn(align === "center" && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        {title}
        {highlight && <Highlight>{highlight}</Highlight>}
      </h2>
    </FadeIn>
  );
}
