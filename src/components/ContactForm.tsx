"use client";

import { useActionState } from "react";
import { CircleCheck, Mail, MessageCircle, Phone, Send } from "lucide-react";

import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { pillClasses } from "./PillButton";

type Props = {
  /** Who the enquiry goes to — the artist's name from the profile. */
  recipient: string;
  /** The form's "Regarding" options, from the CMS. */
  enquiryTypes: string[];
  /** For the WhatsApp fallback when the API can't be reached. */
  whatsappBase?: string;
  domain: string;
  tel?: string;
  mailto?: string;
  phoneDisplay?: string;
  email?: string;
};

const initialState: EnquiryState = { status: "idle" };

/**
 * Enquiries are saved through the portfolio API (see ../app/contact/actions),
 * which emails the artist and returns a pre-filled WhatsApp link for a quicker
 * reply. If the API is unreachable the visitor is offered WhatsApp directly,
 * so an outage never costs a lead.
 */
export default function ContactForm({
  recipient,
  enquiryTypes,
  whatsappBase,
  domain,
  tel,
  mailto,
  phoneDisplay,
  email,
}: Props) {
  const [state, formAction, pending] = useActionState(
    sendEnquiry,
    initialState,
  );

  const fieldClass =
    "mt-2 w-full rounded-sm border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

  if (state.status === "sent") {
    return (
      <div role="status" className="space-y-6">
        <div className="flex gap-4 rounded-sm border border-accent/30 bg-surface px-5 py-5">
          <CircleCheck
            size={22}
            aria-hidden
            className="mt-0.5 shrink-0 text-primary"
          />
          <div>
            <p className="font-serif text-xl font-bold text-foreground">
              Thank you{state.name ? `, ${state.name}` : ""}.
            </p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              Your message has been sent — {recipient} will get back to you
              soon.
            </p>
          </div>
        </div>
        {state.whatsappUrl && (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={pillClasses({
              className: "w-full justify-center sm:w-auto",
            })}
          >
            <MessageCircle size={17} aria-hidden />
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const fields = state.status === "idle" ? undefined : state.fields;

  // The same message the form would have sent, handed to WhatsApp instead.
  const whatsappFallback =
    state.status === "failed" && whatsappBase
      ? `${whatsappBase}?text=${encodeURIComponent(
          [
            `*New enquiry from ${domain}*`,
            "",
            `*Name:* ${state.fields.name}`,
            `*Email:* ${state.fields.email}`,
            `*Regarding:* ${state.fields.subject}`,
            `*Message:* ${state.fields.message}`,
          ].join("\n"),
        )}`
      : undefined;

  return (
    // Keyed on the state so a failed attempt re-mounts with the visitor's
    // text restored, rather than the emptied form React leaves after an action.
    <form
      key={fields ? JSON.stringify(fields) : "empty"}
      action={formAction}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={160}
            autoComplete="name"
            defaultValue={fields?.name}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            defaultValue={fields?.email}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      {enquiryTypes.length > 0 && (
        <div>
          <label
            htmlFor="subject"
            className="text-sm font-medium text-foreground"
          >
            Regarding
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue={fields?.subject ?? enquiryTypes[0]}
            className={fieldClass}
          >
            {enquiryTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          defaultValue={fields?.message}
          placeholder="A little about your experience, and when you're usually free…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot — off-screen and out of the tab order; see actions.ts. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status !== "idle" && (
        <div
          role="alert"
          className="rounded-sm border border-primary/40 bg-surface px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          {state.message}
          {whatsappFallback && (
            <>
              {" "}
              <a
                href={whatsappFallback}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Send it on WhatsApp instead →
              </a>
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className={pillClasses({
          className:
            "w-full justify-center disabled:cursor-wait disabled:opacity-70 sm:w-auto",
        })}
      >
        <Send size={17} aria-hidden />
        {pending ? "Sending…" : "Send enquiry"}
      </button>

      {/* Phones: two thumb-sized buttons side by side (a phone number and
          an email address never wrap neatly in one sentence at 375px).
          From 640px: the usual one-line text links. */}
      {(tel || mailto) && (
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {tel && (
            <a
              href={tel}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-accent/40 text-sm font-semibold text-foreground transition-colors active:bg-accent/10"
            >
              <Phone size={16} aria-hidden className="text-primary" />
              Call
            </a>
          )}
          {mailto && (
            <a
              href={mailto}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-accent/40 text-sm font-semibold text-foreground transition-colors active:bg-accent/10"
            >
              <Mail size={16} aria-hidden className="text-primary" />
              Email
            </a>
          )}
        </div>
      )}
      {(tel || mailto) && (
        <p className="hidden text-sm text-muted-foreground sm:block">
          Or{" "}
          {tel && (
            <>
              call{" "}
              <a
                href={tel}
                className="font-semibold text-primary hover:underline"
              >
                {phoneDisplay}
              </a>
            </>
          )}
          {tel && mailto && " · "}
          {mailto && (
            <a
              href={mailto}
              className="font-semibold text-primary hover:underline"
            >
              {email}
            </a>
          )}
        </p>
      )}
    </form>
  );
}
