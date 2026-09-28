import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's one musical motif: thin bars swelling towards the middle, like
 * the envelope of a tabla phrase. Pure SVG, so it never shifts layout.
 *
 *   animate="always" — a slow idle pulse (section dividers)
 *   animate="hover"  — still until an ancestor `.group` is hovered (cards)
 *
 * Both are skipped under prefers-reduced-motion (see globals.css).
 */
const BARS = [3, 5, 8, 6, 11, 15, 10, 18, 22, 16, 24, 19, 24, 16, 22, 18, 10, 15, 11, 6, 8, 5, 3];
const GAP = 5;

export default function Waveform({
  animate = "none",
  className,
  style,
}: {
  animate?: "none" | "always" | "hover";
  className?: string;
  style?: CSSProperties;
}) {
  const width = BARS.length * GAP;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} 24`}
      style={style}
      className={cn(
        "h-6 w-28",
        animate === "always" && "wave-always",
        animate === "hover" && "wave-hover",
        className,
      )}
    >
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={i * GAP + 1.5}
          y={(24 - h) / 2}
          width="2"
          height={h}
          rx="1"
          fill="currentColor"
          style={{ "--bar-delay": `${(i % 7) * 0.12}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/**
 * A long, faint waveform that spans its container — the backdrop behind a
 * page title. Heights come from layered sines rather than Math.random, so the
 * server and client draw the same shape.
 */
const WIDE_COUNT = 96;
const WIDE_BARS = Array.from({ length: WIDE_COUNT }, (_, i) => {
  const t = i / (WIDE_COUNT - 1);
  const envelope = Math.sin(Math.PI * t) ** 1.4;
  const texture =
    0.55 +
    0.25 * Math.sin(i * 1.7) +
    0.2 * Math.sin(i * 0.63 + 1.1);
  return Math.round(Math.max(4, 100 * envelope * texture) * 10) / 10;
});

export function WaveBackdrop({ className }: { className?: string }) {
  const width = WIDE_COUNT * GAP;
  return (
    <svg
      aria-hidden
      data-print="hide"
      viewBox={`0 0 ${width} 100`}
      preserveAspectRatio="none"
      className={cn("wave-always pointer-events-none", className)}
    >
      {WIDE_BARS.map((h, i) => (
        <rect
          key={i}
          x={i * GAP + 1.5}
          y={(100 - h) / 2}
          width="2"
          height={h}
          rx="1"
          fill="currentColor"
          style={{ "--bar-delay": `${(i % 11) * 0.14}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/**
 * The shared page-title backdrop: a warm gold glow with a faint waveform
 * across it. Fills its nearest positioned ancestor, behind the text, so every
 * page heading carries the same light as the home hero.
 */
export function HeaderBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-print="hide"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_70%)]" />
      <WaveBackdrop className="absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 text-accent/12 sm:h-56" />
    </div>
  );
}

/** A waveform between two gold hairlines — the divider between bands. */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-print="hide"
      className={cn("mx-auto flex max-w-6xl items-center gap-5 px-6 py-10", className)}
    >
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-accent/40" />
      <Waveform animate="always" className="text-accent/80" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-accent/40" />
    </div>
  );
}
