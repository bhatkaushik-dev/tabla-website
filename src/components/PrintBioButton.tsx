"use client";

import { Download } from "lucide-react";
import { pillClasses } from "./PillButton";

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
      className={pillClasses({ size: "default" })}
    >
      <Download size={16} aria-hidden />
      Download bio
    </button>
  );
}
