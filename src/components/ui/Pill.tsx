import { cn } from "@/lib/cn";

interface PillProps {
  children: React.ReactNode;
  variant?: "outline" | "solid" | "category";
  /** For category/filter use — drives the active styling. */
  active?: boolean;
  className?: string;
}

const BASE =
  "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] leading-none";

/**
 * Small label/tag. `category` is used inside filter-tab buttons; `solid` for
 * emphasis (e.g. blog category); `outline` for tech tags.
 */
export function Pill({
  children,
  variant = "outline",
  active = false,
  className,
}: PillProps) {
  const variants: Record<NonNullable<PillProps["variant"]>, string> = {
    outline: "border border-line text-muted",
    solid: "border border-primary/30 bg-primary/12 text-primary-bright",
    category: active
      ? "border border-primary bg-primary text-ink"
      : "border border-line text-subtle transition-colors hover:text-foreground",
  };
  return (
    <span className={cn(BASE, variants[variant], className)}>{children}</span>
  );
}
