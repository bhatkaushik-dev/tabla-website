"use server";

import { headers } from "next/headers";

import { createEnquiry } from "@/lib/cms/api";

export type EnquiryFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent"; name: string; whatsappUrl?: string }
  | { status: "invalid" | "failed"; message: string; fields: EnquiryFields };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Saves a contact-form enquiry through the portfolio API. A Server Action
 * rather than a browser fetch: no API origin, CORS or key in the client
 * bundle, and the form still submits with JavaScript disabled.
 *
 * The API commits the lead before anything else and hands back a wa.me link
 * with the enquiry pre-filled, so the visitor can follow up on WhatsApp.
 */
export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();
  const fields: EnquiryFields = {
    name: field("name"),
    email: field("email"),
    subject: field("subject"),
    message: field("message"),
  };

  // Honeypot: hidden from people, filled in by form-spamming bots. Pretend
  // it worked so the bot has nothing to learn from.
  if (field("website")) return { status: "sent", name: fields.name };

  const problem =
    !fields.name || fields.name.length > 160
      ? "Please enter your name."
      : !EMAIL.test(fields.email) || fields.email.length > 254
        ? "Please enter a valid email address."
        : !fields.message
          ? "Please write a message."
          : fields.message.length > 5000
            ? "Please keep the message under 5,000 characters."
            : null;
  if (problem) return { status: "invalid", message: problem, fields };

  // Provenance for the lead record: the visitor's, not this server's.
  const incoming = await headers();
  const forwarded: Record<string, string> = {};
  for (const name of ["x-forwarded-for", "user-agent", "referer"]) {
    const value = incoming.get(name);
    if (value) forwarded[name] = value;
  }

  try {
    const result = await createEnquiry(
      {
        name: fields.name,
        email: fields.email,
        subject: fields.subject.slice(0, 240) || undefined,
        message: fields.message,
        source: "contact_page",
      },
      forwarded,
    );
    return { status: "sent", name: fields.name, whatsappUrl: result.whatsapp_url };
  } catch (error) {
    console.error("[enquiry]", error);
    return {
      status: "failed",
      message: "Your message couldn't be sent just now.",
      fields,
    };
  }
}
