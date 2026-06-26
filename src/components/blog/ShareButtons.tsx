"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedinIcon, XBrandIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";

interface ShareButtonsProps {
  /** Absolute, base-path-correct canonical URL of the post. */
  url: string;
  title: string;
}

const ICON_BTN =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary/50 hover:text-primary-bright";

/**
 * Share row for a blog post: X (Twitter) intent, LinkedIn share, and copy-link
 * with a transient "Copied" state. Icon-only buttons carry aria-labels.
 */
export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={ICON_BTN}
      >
        <XBrandIcon className="h-4 w-4" />
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={ICON_BTN}
      >
        <LinkedinIcon className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(ICON_BTN, copied && "border-primary/50 text-primary-bright")}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
