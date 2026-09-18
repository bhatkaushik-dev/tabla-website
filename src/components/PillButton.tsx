import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";
type Size = "sm" | "default" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "px-6 py-2.5 text-xs",
  default: "px-8 py-3.5 text-sm",
  lg: "px-10 py-4 text-sm",
};

const variantClasses: Record<Variant, string> = {
  primary: "gold-glow bg-primary text-primary-foreground hover:scale-105",
  outline:
    "border border-white/10 bg-white/5 text-foreground backdrop-blur-sm hover:bg-white/10",
};

/** Class string for the pill shape, shared with non-link uses (e.g. a <button>). */
export function pillClasses({
  variant = "primary",
  size = "lg",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-[0.15em] transition-all",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with rel="noopener noreferrer" — for external links only. */
  newTab?: boolean;
  className?: string;
};

/** The solid/outline pill link reused for every primary and secondary CTA. */
export default function PillButton({
  href,
  children,
  variant,
  size,
  newTab = false,
  className,
}: Props) {
  const classes = pillClasses({ variant, size, className });

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {children}
    </a>
  );
}
