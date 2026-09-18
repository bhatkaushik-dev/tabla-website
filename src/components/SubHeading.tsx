import type { ReactNode } from "react";

/** Serif heading preceded by a short gold rule — used inside a page's body. */
export default function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 font-serif text-2xl font-bold md:text-3xl">
      <span aria-hidden className="h-px w-8 shrink-0 bg-accent" />
      {children}
    </h2>
  );
}
