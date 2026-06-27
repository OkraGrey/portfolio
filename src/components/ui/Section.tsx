import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Skip the max-width clamp (for full-bleed carousels). */
  bleed?: boolean;
  /** Vertical padding utility (literal class so Tailwind can scan it). */
  padY?: string;
}

/**
 * Standard page section: consistent horizontal/vertical rhythm, sits above the
 * generative background (z-2), and centres content to a 1200px column.
 */
export function Section({
  id,
  children,
  className,
  bleed,
  padY = "py-[clamp(56px,9vh,120px)]",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[2] w-full px-[clamp(20px,5vw,72px)]",
        padY,
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-[1180px]">{children}</div>
      )}
    </section>
  );
}
