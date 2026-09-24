import type { ComponentProps } from "react";
import PillButton from "./PillButton";
import PhotoSplit from "./PhotoSplit";
import { Eyebrow, Highlight } from "./SectionHeading";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  /** Trailing words set in gold. */
  highlight?: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** With a photo the band becomes a PhotoSplit, text on the left. */
  photo?: Photo;
  photoOptions?: Omit<
    ComponentProps<typeof PhotoSplit>,
    "photo" | "children" | "as"
  >;
};

/** The band that closes a page. */
export default function CTASection({
  eyebrow,
  title,
  highlight,
  body,
  primary,
  secondary,
  photo,
  photoOptions,
}: Props) {
  const centered = !photo;

  const content = (
    <>
      {eyebrow && (
        <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
      )}

      <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        {title}
        {highlight && <Highlight>{highlight}</Highlight>}
      </h2>

      <p
        className={cn(
          "mt-6 max-w-md leading-relaxed text-muted-foreground md:text-lg",
          centered && "mx-auto",
        )}
      >
        {body}
      </p>

      <div
        className={cn(
          "mt-10 flex flex-col gap-4 sm:flex-row",
          centered && "items-center justify-center",
        )}
      >
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
    </>
  );

  if (photo) {
    return (
      <div data-print="hide" className="border-t border-accent/15">
        <PhotoSplit
          photo={photo}
          className="lg:min-h-176"
          {...photoOptions}
        >
          {content}
        </PhotoSplit>
      </div>
    );
  }

  return (
    <section
      data-print="hide"
      className="relative overflow-hidden border-t border-accent/15 px-6 py-24 text-center sm:py-32"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="mx-auto max-w-2xl">{content}</div>
    </section>
  );
}
