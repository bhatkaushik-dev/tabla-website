"use client";

import { Download } from "lucide-react";

/**
 * "Download bio" = browser print-to-PDF against the @media print rules in
 * globals.css. Keeps the PDF in sync with the page automatically, with no
 * static file to regenerate whenever the biography changes.
 */
export default function PrintBioButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-print="hide"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <Download size={16} aria-hidden />
      Download bio (PDF)
    </button>
  );
}
