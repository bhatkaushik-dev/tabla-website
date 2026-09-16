import FadeIn from "./FadeIn";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  /** Trailing words set in gold, e.g. title="Watch &" highlight="Experience". */
  highlight?: string;
  className?: string;
};

/** Centred eyebrow + two-tone serif headline that opens every section. */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  className,
}: Props) {
  return (
    <FadeIn className={cn("text-center", className)}>
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
    </FadeIn>
  );
}
