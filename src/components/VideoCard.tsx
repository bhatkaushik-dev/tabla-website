"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { embedUrl, thumbnailUrl, watchUrl, type Video } from "@/lib/videos";

/**
 * YouTube facade: shows the thumbnail and only mounts the iframe once the
 * visitor presses play. Loading three real embeds up front would pull in
 * roughly a megabyte of player JavaScript per card and wreck LCP/INP, which
 * feed ranking.
 *
 * Before activation the control is a real link to youtube.com, so it still
 * works without JS and gives crawlers an outbound signal.
 */
export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group">
      <div className="gold-border relative aspect-video overflow-hidden rounded-2xl bg-ink">
        {playing ? (
          <iframe
            src={embedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <a
            href={watchUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              // Let modified clicks (new tab, middle-click) reach YouTube.
              if (event.metaKey || event.ctrlKey || event.shiftKey) return;
              event.preventDefault();
              setPlaying(true);
            }}
            className="absolute inset-0"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={thumbnailUrl(video.id)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110"
            >
              <Play size={22} className="ml-1 fill-current" />
            </span>
          </a>
        )}
      </div>

      <h3 className="mt-5 font-serif text-xl font-bold leading-snug text-foreground">
        {video.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {video.description}
      </p>
    </article>
  );
}
