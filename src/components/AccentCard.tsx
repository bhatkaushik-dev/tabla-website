import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Panel with a rounded gold hairline — the card motif used site-wide. */
export default function AccentCard({ children, className }: Props) {
  return (
    <div className={cn("gold-border rounded-2xl bg-secondary", className)}>
      {children}
    </div>
  );
}
