/**
 * Featured YouTube performances. Titles are the real titles as published on
 * the channel (fetched via YouTube's oEmbed endpoint) so the page text matches
 * what Google already has indexed for the videos themselves.
 *
 * Thumbnails come straight from i.ytimg.com through next/image — see the
 * remotePatterns entry in next.config.ts. The iframe is only mounted on click
 * (see VideoCard), which keeps ~1MB of YouTube player JS off the initial load.
 */

export type Video = {
  id: string;
  title: string;
  description: string;
  /** ISO 8601 date the video was published. */
  uploadDate: string;
};

export const videos: Video[] = [
  {
    id: "4MCrgpkslww",
    title: "Tabla Solo in Drut Teentaal",
    description:
      "A tabla solo in drut teentaal by Kaushik Bhat, accompanied on harmonium by Hari Krishna Purohit — traditional compositions of the Benares and Farukhabad gharanas played at speed.",
    uploadDate: "2023-01-01",
  },
  {
    id: "5086-Z-tDx0",
    title: "Raag Multani — with Shri Aniruddh Aithal",
    description:
      "Kaushik Bhat accompanies vocalist Shri Aniruddh Aithal on tabla in a Hindustani classical rendition of Raag Multani.",
    uploadDate: "2023-01-01",
  },
  {
    id: "D9hymyGA8ng",
    title: "Raag Hamsadhwani — with Samarth Hegde",
    description:
      "Raag Hamsadhwani performed by Samarth Hegde with Kaushik Bhat on tabla, blending Hindustani classical melody with intricate rhythmic accompaniment.",
    uploadDate: "2023-01-01",
  },
];

export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
