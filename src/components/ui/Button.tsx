"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  /** Internal route ("/..."), same-page anchor ("#..."), or external URL. */
  href?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-4 py-2 text-[13px]",
} as const;

const VARIANTS = {
  primary:
    "bg-primary text-ink shadow-[0_0_0_1px_rgba(110,123,255,0.4)] hover:bg-primary-bright hover:shadow-[0_8px_30px_-8px_rgba(124,132,255,0.6)]",
  ghost:
    "border border-line text-foreground hover:border-primary/50 hover:text-primary-bright",
} as const;

/**
 * CTA button. Renders next/link for internal routes (base path auto-applied),
 * a bare anchor for same-page hashes and external URLs, or a <button>.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className,
  ariaLabel,
  target,
  rel,
  disabled,
}: ButtonProps) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);

  if (href) {
    const isInternalRoute = href.startsWith("/");
    if (isInternalRoute) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
