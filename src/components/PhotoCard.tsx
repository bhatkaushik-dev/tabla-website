import Image from "next/image";
import { Download } from "lucide-react";
import type { Photo } from "@/lib/photos";

/**
 * Gallery tile. The download control is a plain <a download> pointing at the
 * full-resolution original — always visible rather than hover-only, since a
 * hover-revealed button is unreachable on touch.
 */
export default function PhotoCard({
  photo,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  photo: Photo;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="gold-border group relative overflow-hidden rounded-2xl bg-surface">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/65 to-transparent"
        />
      </div>

      <figcaption className="flex items-center justify-between gap-3 border-t border-accent/15 px-4 py-3">
        <span className="text-sm font-medium text-foreground">
          {photo.caption}
        </span>
        <a
          href={photo.download}
          download={`${photo.id}.jpg`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/50 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Download size={13} aria-hidden />
          Download
          <span className="sr-only">
            {" "}
            full resolution photo: {photo.alt}
          </span>
        </a>
      </figcaption>
    </figure>
  );
}
