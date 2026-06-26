"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

// TODO: set NEXT_PUBLIC_WEB3FORMS_KEY
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const INPUT_CLASS =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-foreground placeholder:text-subtle focus:border-primary/50 focus:outline-none";

/**
 * Contact form — posts to Web3Forms when an access key is configured, and
 * always offers a mailto fallback prefilled with the current field values.
 * No backend; safe under static export.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [showFallback, setShowFallback] = useState(false);

  // Mirrored field state so the mailto fallback stays reactive.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  // Build the mailto fallback href from the current field values.
  const mailtoBody = [
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    budget && `Budget: ${budget}`,
    description && `\nProject:\n${description}`,
  ]
    .filter(Boolean)
    .join("\n");
  const mailtoHref = `mailto:${site.links.email}?subject=${encodeURIComponent(
    "AI Project Inquiry",
  )}&body=${encodeURIComponent(mailtoBody)}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // No access key configured → reveal the mailto fallback, skip the fetch.
    if (!ACCESS_KEY) {
      setShowFallback(true);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setShowFallback(false);
      } else {
        setStatus("error");
        setShowFallback(true);
      }
    } catch {
      setStatus("error");
      setShowFallback(true);
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Web3Forms control fields */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New portfolio inquiry" />

      {/* Honeypot — visually hidden, ignored by humans, caught from bots. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-[14px] text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          aria-required="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-[14px] text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          aria-required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-description" className="text-[14px] text-muted">
          Project Description
        </label>
        <textarea
          id="contact-description"
          name="message"
          required
          aria-required="true"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell me what you're building."
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-budget" className="text-[14px] text-muted">
          Budget Range
        </label>
        <select
          id="contact-budget"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Budget range (optional)</option>
          {site.contact.budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting && (
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
          )}
          Send Message
        </Button>

        {/* Always-available mailto fallback. */}
        <a
          href={mailtoHref}
          className="text-[14px] text-muted underline underline-offset-4 transition-colors hover:text-primary-bright"
        >
          or email me directly
        </a>
      </div>

      {/* Status region — announced politely. */}
      <div aria-live="polite" className="min-h-[1.5rem] text-[14px]">
        {status === "success" && (
          <p className="text-primary-bright">
            Thanks — I&rsquo;ll reply within 24 hours.
          </p>
        )}
        {status === "error" && showFallback && (
          <p className="text-muted">
            Something went wrong. Please{" "}
            <a
              href={mailtoHref}
              className="text-primary-bright underline underline-offset-4 hover:text-accent"
            >
              email me directly
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
