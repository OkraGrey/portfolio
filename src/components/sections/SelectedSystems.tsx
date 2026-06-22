import { Reveal } from "@/components/motion/Reveal";
import { systems } from "@/lib/projects";

/**
 * Selected Systems — a typographic index of core work. Each row reveals on
 * scroll and lifts toward the indigo primary on hover.
 */
export function SelectedSystems() {
  return (
    <section
      id="work"
      className="relative flex min-h-screen flex-col justify-center px-[clamp(20px,6vw,90px)] py-[120px]"
    >
      <Reveal
        as="div"
        className="mb-[42px] font-mono text-[12px] tracking-[0.18em] text-primary-bright"
      >
        SELECTED SYSTEMS
      </Reveal>

      <ul className="m-0 list-none p-0">
        {systems.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={i * 0.08} y={20}>
            <a
              href={`#${s.slug}`}
              className="group grid grid-cols-[64px_1fr_auto] items-center gap-[clamp(14px,3vw,40px)] border-t border-line py-[clamp(22px,3.2vh,34px)] no-underline"
            >
              <span className="font-mono text-[13px] text-primary-bright">
                {s.num}
              </span>
              <span className="text-[clamp(24px,4vw,52px)] font-medium tracking-[-0.02em] text-bright transition-colors duration-300 group-hover:text-primary-bright">
                {s.title}
              </span>
              <span className="text-right font-mono text-[11.5px] tracking-[0.06em] text-subtle">
                {s.tag}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <div className="border-t border-line" />
    </section>
  );
}
