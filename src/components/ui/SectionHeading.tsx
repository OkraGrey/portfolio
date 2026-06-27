import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  kicker?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  /** Eyebrow color (CSS color). Defaults to the indigo bright token. */
  eyebrowColor?: string;
  /** Bottom-margin utility (literal class). */
  mb?: string;
  /** Title size utility (literal class), overriding the default scale. */
  titleClassName?: string;
}

/**
 * Eyebrow + heading (+ optional kicker), each line revealed on a short stagger.
 * Used at the top of every homepage section for consistent typographic rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  kicker,
  align = "left",
  as = "h2",
  eyebrowColor = "var(--color-primary-bright)",
  mb = "mb-[clamp(34px,5vh,56px)]",
  titleClassName = "text-[clamp(32px,5.5vw,60px)]",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5",
        mb,
        center ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow && (
        <Reveal
          as="div"
          delay={0}
          style={{ color: eyebrowColor }}
          className="font-mono text-[12px] uppercase tracking-[0.22em]"
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as={as}
        delay={0.08}
        className={cn(
          "font-sans font-bold leading-[1.03] tracking-[-0.02em] text-bright",
          titleClassName,
        )}
      >
        {title}
      </Reveal>
      {kicker && (
        <Reveal
          as="p"
          delay={0.16}
          className={cn(
            "text-[clamp(14px,1.4vw,17px)] text-muted",
            center ? "mx-auto max-w-[60ch]" : "max-w-[60ch]",
          )}
        >
          {kicker}
        </Reveal>
      )}
    </div>
  );
}
