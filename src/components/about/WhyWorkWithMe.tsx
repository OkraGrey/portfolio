import { Reveal } from "@/components/motion/Reveal";
import { about } from "@/lib/about";

/** Top hairline accent per card: emerald · indigo · pink · amber. */
const WHY_ACCENTS = ["#2fe0b0", "#7782ff", "#ff5c93", "#ffb74d"];

/**
 * "Why work with me" value props — a four-up grid of surface cards with a
 * colored top hairline, each revealed on a short stagger.
 */
export function WhyWorkWithMe() {
  return (
    <div className="grid gap-[clamp(14px,1.6vw,18px)] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
      {about.whyCards.map((card, i) => (
        <Reveal key={card.title} delay={(i % 4) * 0.06}>
          <div
            className="flex h-full flex-col gap-2.5 rounded-2xl border border-white/10 bg-surface p-6"
            style={{
              borderTop: `2px solid ${WHY_ACCENTS[i % WHY_ACCENTS.length]}`,
            }}
          >
            <h3 className="font-sans text-[17px] font-semibold text-[#f3f5fb]">
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#b6bdcc]">
              {card.copy}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
