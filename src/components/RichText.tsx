import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders the CMS's inline marks — `**bold**` and `[label](/path)`, the only
 * two the backend allows in body copy — as real elements. Anything else is
 * plain text, so admin copy can never inject markup.
 */
const MARK = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export default function RichText({
  text,
  strongClassName = "font-semibold text-foreground",
  linkClassName = "font-semibold text-primary hover:underline",
}: {
  text: string;
  strongClassName?: string;
  linkClassName?: string;
}) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(MARK)) {
    const [whole, bold, label, href] = match;
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    if (bold !== undefined) {
      nodes.push(
        <strong key={match.index} className={strongClassName}>
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={match.index} href={href} className={linkClassName}>
          {label}
        </Link>,
      );
    } else if (/^(https?:|mailto:|tel:)/.test(href)) {
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={match.index}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={linkClassName}
        >
          {label}
        </a>,
      );
    } else {
      // Anything else (javascript:, data:, …) is shown, not linked.
      nodes.push(label);
    }
    cursor = match.index + whole.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
