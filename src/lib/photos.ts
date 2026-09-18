/**
 * The photo roster. `src` is the compressed WebP the page renders; `download`
 * is the full-resolution JPEG the download button hands the visitor. Both are
 * produced by scripts/optimize-images.mjs — re-run it after adding a source
 * file and add the entry here.
 *
 * `alt` is written for search as well as for screen readers: each one names
 * the artist, the instrument and the setting rather than "Studio Session".
 */

export type Photo = {
  id: string;
  src: string;
  download: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const photo = (
  id: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
): Photo => ({
  id,
  src: `/photos/${id}.webp`,
  download: `/photos/originals/${id}.jpg`,
  width,
  height,
  alt,
  caption,
});

/** The eight shown on /gallery, in display order. */
export const galleryPhotos: Photo[] = [
  photo(
    "kaushik-bhat-tabla-artist-concert-bangalore",
    1333,
    2000,
    "Kaushik Bhat playing tabla on stage at a classical music concert in Bangalore",
    "Concert stage, Bangalore",
  ),
  photo(
    "kaushik-bhat-tabla-recital",
    2000,
    1125,
    "Kaushik Bhat performing a tabla recital under stage lights",
    "Tabla recital",
  ),
  photo(
    "kaushik-bhat-tabla-portrait",
    1024,
    1280,
    "Portrait of tabla artist Kaushik Bhat resting on his tabla",
    "Portrait",
  ),
  photo(
    "kaushik-bhat-tabla-solo-performance",
    1333,
    2000,
    "Kaushik Bhat during a tabla solo performance at a classical concert",
    "Tabla solo",
  ),
  photo(
    "kaushik-bhat-tabla-outdoor-session",
    1280,
    1280,
    "Kaushik Bhat playing tabla outdoors on a rock amid trees",
    "Outdoor session",
  ),
  photo(
    "kaushik-bhat-tabla-classical-concert",
    1333,
    2000,
    "Close-up of Kaushik Bhat's hands on the tabla during a classical concert",
    "In concert",
  ),
  photo(
    "kaushik-bhat-tabla-teacher-jp-nagar",
    1066,
    1600,
    "Tabla teacher Kaushik Bhat holding a dayan tabla drum in Bangalore",
    "With the dayan",
  ),
  photo(
    "kaushik-bhat-tabla-accompaniment",
    2000,
    1518,
    "Kaushik Bhat accompanying a vocalist on tabla at a concert in Bangalore",
    "Accompaniment",
  ),
];

/**
 * Used outside the gallery grid — hero, about, classes.
 *
 * The warm studio portrait carries the hero because it sits inside a gold
 * frame; the cool stage lighting of the concert frame fights the accent
 * colour at that size, so it runs in the biography block instead.
 */
export const heroPhoto = photo(
  "kaushik-bhat-tabla-studio-portrait",
  1029,
  1280,
  "Kaushik Bhat, B-High graded tabla artist, seated at his tabla",
  "Studio portrait",
);

export const aboutPhoto = photo(
  "kaushik-bhat-tabla-artist-concert-bangalore",
  1333,
  2000,
  "Tabla artist Kaushik Bhat performing on stage at a concert in Bangalore",
  "Concert stage, Bangalore",
);

export const classesPhoto = photo(
  "kaushik-bhat-tabla-nature-riyaz",
  1280,
  1280,
  "Kaushik Bhat practising tabla riyaz outdoors near Bangalore",
  "Riyaz",
);

export const allPhotos = [
  ...galleryPhotos,
  aboutPhoto,
  classesPhoto,
].filter(
  (p, i, arr) => arr.findIndex((other) => other.id === p.id) === i,
);
