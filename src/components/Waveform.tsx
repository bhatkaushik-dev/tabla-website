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
}: {
  animate?: "none" | "always" | "hover";
  className?: string;
}) {
  const width = BARS.length * GAP;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} 24`}
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
