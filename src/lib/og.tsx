import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared Open Graph card renderer, so every route's social preview is the same
 * design with different copy.
 *
 * Fonts are read from assets/ on disk rather than fetched from Google at build
 * time — an OG image that depends on the network is an OG image that
 * intermittently fails the build.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#17110F";
const IVORY = "#FBF7F0";
const BRASS = "#D9A441";
const MAROON = "#C4707E";

export async function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const [playfair, inter] = await Promise.all([
    readFile(join(process.cwd(), "assets/PlayfairDisplay-Bold.ttf")),
    readFile(join(process.cwd(), "assets/Inter-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "Inter",
          color: IVORY,
        }}
      >
        {/* Monogram + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: `3px solid ${BRASS}`,
              color: BRASS,
              fontFamily: "Playfair",
              fontSize: 30,
            }}
          >
            KB
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: BRASS,
            }}
          >
            Kaushik Bhat
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Playfair",
              fontSize: title.length > 34 ? 76 : 92,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", width: 140, height: 4, background: BRASS, marginTop: 32 }} />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "rgba(251,247,240,0.7)",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: MAROON,
          }}
        >
          <div style={{ display: "flex" }}>B-High Graded · All India Radio</div>
          <div style={{ display: "flex", color: "rgba(251,247,240,0.45)" }}>
            tabla.kaushikbhat.in
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Playfair", data: playfair, style: "normal", weight: 700 },
        { name: "Inter", data: inter, style: "normal", weight: 500 },
      ],
    },
  );
}
