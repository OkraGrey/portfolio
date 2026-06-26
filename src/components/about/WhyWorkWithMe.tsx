import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { about } from "@/lib/about";

/**
 * "Why work with me" value props — a four-up grid of cards, each revealed on a
 * short stagger. Server component; pure content render.
 */
export function WhyWorkWithMe() {
  return (
    <div className="grid gap-[clamp(14px,2vw,22px)] sm:grid-cols-2 lg:grid-cols-4">
      {about.whyCards.map((card, i) => (
        <Reveal key={card.title} delay={i * 0.08}>
          <Card className="h-full">
            <h3 className="mb-2 font-sans text-[clamp(17px,1.8vw,20px)] font-medium text-foreground">
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-muted">{card.copy}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
