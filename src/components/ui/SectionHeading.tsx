import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  kicker?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
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
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-[clamp(28px,5vh,56px)] flex flex-col gap-3",
        center ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow && (
        <Reveal
          as="div"
          delay={0}
          className="font-mono text-[clamp(10px,1.05vw,12.5px)] uppercase tracking-[0.22em] text-primary-bright"
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as={as}
        delay={0.08}
        className="font-sans text-[clamp(32px,6vw,64px)] font-semibold leading-[1.04] text-foreground"
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
