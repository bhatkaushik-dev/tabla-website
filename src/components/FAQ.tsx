import type { Faq } from "@/lib/types";

/**
 * Native <details> accordion — no JS, and the answer text is present in the
 * HTML even when collapsed, which is what FAQPage structured data requires.
 */
export default function FAQ({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        // The padding lives on the summary, so the whole row is the tap
        // target rather than just the line of text.
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-serif text-lg font-semibold text-foreground marker:hidden hover:text-primary">
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <span
              aria-hidden
              className="mt-1 shrink-0 text-2xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="-mt-2 max-w-3xl pb-5 pr-10 leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
