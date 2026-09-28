import Image from "next/image";
import { Download } from "lucide-react";
import type { Photo } from "@/lib/photos";

/**
 * Gallery tile, at the photograph's own proportions (the gallery is a masonry
 * of columns, two even on phones). The download control is a plain
 * <a download> pointing at the full-resolution original — always visible
 * rather than hover-only, since a hover-revealed button is unreachable on
 * touch.
 */
export default function PhotoCard({
  photo,
  eager = false,
  sizes = "(max-width: 1024px) 50vw, 33vw",
}: {
  photo: Photo;
  /** Above the fold: load immediately rather than lazily. */
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="group relative overflow-hidden rounded-sm bg-surface ring-1 ring-foreground/5 transition-shadow duration-500 hover:ring-accent/50 hover:shadow-[0_24px_50px_-20px_color-mix(in_srgb,var(--accent)_35%,transparent)]">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        className="tile-tone h-auto w-full group-hover:scale-[1.03]"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 bg-linear-to-t from-ink/80 via-ink/30 to-transparent px-3 pb-3 pt-16 sm:flex-row sm:items-end sm:justify-between sm:px-4 sm:pb-4">
        <span aria-hidden />
        <a
          href={photo.download}
          download={`${photo.id}.jpg`}
          aria-label={`Download full resolution photo: ${photo.alt}`}
          // A 40px circle on phones (icon only), a labelled pill from 640px.
          className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-foreground/25 bg-ink/40 px-2.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:px-3"
        >
          <Download size={15} aria-hidden />
          <span aria-hidden className="hidden sm:inline">
            Download
          </span>
        </a>
      </figcaption>
    </figure>
  );
}
