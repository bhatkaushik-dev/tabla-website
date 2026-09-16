import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger position among siblings, in seconds-ish units (0–0.3). */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll reveal implemented as a CSS scroll-driven animation (see `.reveal` in
 * globals.css) rather than framer-motion's whileInView.
 *
 * The motion version server-rendered every section at opacity:0 and only
 * revealed it once React had hydrated and an IntersectionObserver had fired —
 * so a slow or failed JS load left the page blank. Here the element's resting
 * state is visible, the animation is layered on only where the browser
 * supports it, and this stays a server component with no client JS at all.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  as: Component = "div",
}: Props) {
  return (
    <Component
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${Math.round(delay * 100)}%` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
