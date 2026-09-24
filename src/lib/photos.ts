/**
 * The photo roster — every frame is from the studio photoshoot. `src` is the
 * WebP the page renders; `download` is the full-resolution JPEG the gallery's
 * download button hands the visitor. Both are produced by
 * scripts/optimize-photoshoot.mjs — re-run it after adding a source file and
 * add the entry here.
 *
 * `alt` is written for search as well as for screen readers: each one names
 * the artist, the instrument and the setting rather than "Studio Session".
 *
 * The shoot has two looks — a cream kurta with a red shawl, and a maroon
 * kurta — against a grey studio sweep. Pages pull the sweep down to charcoal
 * (`.photo-tone`) so it melts into the dark ground.
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

/**
 * The home hero is art-directed: the landscape frame (8861, maroon kurta) on
 * tablet and up, the portrait frame (8714, cream kurta) on phones.
 */
export const heroWidePhoto = photo(
  "kaushik-bhat-tabla-hero-wide",
  2560,
  1707,
  "Kaushik Bhat, B-High graded tabla artist, smiling among his tabla set in the studio",
  "Among the drums",
);

export const heroPortraitPhoto = photo(
  "kaushik-bhat-tabla-hero-portrait",
  1707,
  2560,
  "Kaushik Bhat, tabla artist and teacher in Bangalore, seated with his tabla",
  "With the dayan",
);

/** Standing with the dayan, maroon kurta — the pinned backdrop behind the /about biography. */
export const standingPhoto = photo(
  "kaushik-bhat-standing-portrait",
  1707,
  2560,
  "Portrait of tabla artist Kaushik Bhat standing in a maroon kurta, holding a dayan",
  "Portrait",
);

/** Standing, holding the dayan and bayan — the /about header. */
export const withTablaPhoto = photo(
  "kaushik-bhat-with-tabla-portrait",
  1707,
  2560,
  "Kaushik Bhat standing with his tabla pair, in a cream kurta and red shawl",
  "With the tabla pair",
);

/** Mid-stroke, eyes on the drums, the full set laid out — /performances. */
export const playingPhoto = photo(
  "kaushik-bhat-tabla-playing-studio",
  2560,
  1835,
  "Kaushik Bhat playing tabla, surrounded by a set of tuned dayans",
  "Mid-stroke",
);

/** Maroon kurta, smiling at the drums — the /classes header. */
export const teachingPhoto = photo(
  "kaushik-bhat-tabla-teacher-jp-nagar-studio",
  1707,
  2560,
  "Tabla teacher Kaushik Bhat smiling as he plays, JP Nagar, Bangalore",
  "At the tabla",
);

/** Cream kurta and shawl, playing — the home biography band. */
export const creamKurtaPhoto = photo(
  "kaushik-bhat-tabla-studio-cream-kurta",
  1707,
  2560,
  "Kaushik Bhat playing tabla in a cream kurta and red shawl",
  "In the studio",
);

/** Cream kurta, mid-phrase, one hand raised — the /contact header. */
export const gesturePhoto = photo(
  "kaushik-bhat-tabla-cream-kurta-playing",
  1707,
  2560,
  "Kaushik Bhat playing tabla and gesturing mid-phrase, in a cream kurta and red shawl",
  "Mid-phrase",
);

/** Behind the full set of four drums — gallery only. */
export const fullSetPhoto = photo(
  "kaushik-bhat-tabla-full-set",
  1707,
  2560,
  "Kaushik Bhat seated behind a set of four tabla drums in the studio",
  "The full set",
);

/** Tuning with the hammer — quiet, careful; the teacher block on /classes. */
export const tuningPhoto = photo(
  "kaushik-bhat-tabla-tuning",
  2560,
  1996,
  "Kaushik Bhat tuning his tabla with a hammer before playing",
  "Tuning",
);

/** Shown on /gallery, in display order; every one is downloadable. */
export const galleryPhotos: Photo[] = [
  heroWidePhoto,
  withTablaPhoto,
  teachingPhoto,
  playingPhoto,
  standingPhoto,
  creamKurtaPhoto,
  tuningPhoto,
  gesturePhoto,
  fullSetPhoto,
  heroPortraitPhoto,
];
