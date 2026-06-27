"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

// TODO: set NEXT_PUBLIC_WEB3FORMS_KEY
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const INPUT_CLASS =
  "w-full rounded-[12px] border border-white/[0.12] bg-surface px-4 py-3.5 text-[15px] text-foreground placeholder:text-subtle outline-none transition-colors focus:border-primary";

/**
 * Contact form — posts to Web3Forms when an access key is configured, and
 * always offers a mailto fallback prefilled with the current field values.
 * No backend; safe under static export. Restyled to the design (placeholder
 * fields, a pill budget selector, gradient submit) with labels kept for a11y.
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Web3Forms control fields */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New portfolio inquiry" />
      <input type="hidden" name="budget" value={budget} />

      {/* Honeypot — visually hidden, ignored by humans, caught from bots. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
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
        <div>
          <label htmlFor="contact-email" className="sr-only">
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
            placeholder="Email"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
          Budget
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {site.contact.budgets.map((b) => {
            const selected = budget === b;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={selected}
                onClick={() => setBudget(selected ? "" : b)}
                className={cn(
                  "rounded-full border px-4 py-[9px] text-[13.5px] transition-colors",
                  selected
                    ? "border-primary bg-primary/10 text-primary-bright"
                    : "border-white/[0.14] text-muted hover:border-primary hover:text-primary-bright",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-description" className="sr-only">
          Project description
        </label>
        <textarea
          id="contact-description"
          name="message"
          required
          aria-required="true"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What are you building?"
          className={cn(INPUT_CLASS, "resize-y")}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-[9px] rounded-[12px] bg-[linear-gradient(135deg,#8b94ff,#7782ff)] px-[26px] py-[15px] text-[15px] font-semibold text-[#07080c] shadow-[0_14px_40px_-16px_rgba(119,130,255,0.8)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
        Send message →
      </button>

      <div className="flex flex-wrap items-center gap-4">
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
