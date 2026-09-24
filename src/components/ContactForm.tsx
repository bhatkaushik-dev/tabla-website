"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { domain, mailtoLink, site, telLink, whatsappLink } from "@/lib/site";
import { pillClasses } from "./PillButton";

const enquiries = [
  "Tabla classes (in person, JP Nagar)",
  "Tabla classes (online)",
  "Concert booking",
  "Accompaniment / studio session",
  "Something else",
];

/**
 * The form hands off to WhatsApp rather than posting anywhere — there's no
 * backend, and WhatsApp is how enquiries actually arrive. Kept from the
 * original implementation; the number now comes from src/lib/site.ts.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: enquiries[0],
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const message = [
      `*New enquiry from ${domain}*`,
      "",
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Regarding:* ${formData.subject}`,
      `*Message:* ${formData.message}`,
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "mt-2 w-full rounded-sm border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Regarding
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className={fieldClass}
        >
          {enquiries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="A little about your experience, and when you're usually free…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className={pillClasses({ className: "w-full justify-center sm:w-auto" })}
      >
        <MessageCircle size={17} aria-hidden />
        Send via WhatsApp
      </button>

      <p className="text-sm text-muted-foreground">
        Or call{" "}
        <a href={telLink()} className="font-semibold text-primary hover:underline">
          {site.phoneDisplay}
        </a>{" "}
        ·{" "}
        <a
          href={mailtoLink()}
          className="font-semibold text-primary hover:underline"
        >
          {site.email}
        </a>
      </p>
    </form>
  );
}
