/**
 * YouTube URLs for the video facades. Thumbnails come straight from
 * i.ytimg.com through next/image — see the remotePatterns entry in
 * next.config.ts. The iframe is only mounted on click (see VideoCard), which
 * keeps ~1MB of YouTube player JS off the initial load.
 */

export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
