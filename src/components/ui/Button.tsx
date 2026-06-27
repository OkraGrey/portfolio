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
  md: "px-[26px] py-[13px] text-[15px]",
  sm: "px-[18px] py-[9px] text-[14px]",
} as const;

const VARIANTS = {
  primary:
    "text-ink bg-[linear-gradient(135deg,#8b94ff,#7782ff)] shadow-[0_0_0_1px_rgba(119,130,255,0.5),0_14px_40px_-16px_rgba(119,130,255,0.8)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(119,130,255,0.7),0_20px_50px_-16px_rgba(119,130,255,0.95)]",
  ghost:
    "border border-white/25 font-medium text-foreground hover:border-primary/70 hover:bg-primary/[0.06] hover:text-primary-bright",
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
