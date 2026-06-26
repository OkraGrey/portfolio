import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { RotatingTagline } from "@/components/sections/RotatingTagline";
import { site } from "@/lib/site";

/**
 * Hero — full-viewport opener. The name "denoises" in on load, followed by a
 * rotating tagline, a stats row, and two CTAs. A mono meta rail carries
 * location + availability. The GenerativeField background is mounted by
 * page.tsx behind <main>, so this section only renders foreground content.
 */
export function Hero() {
  const { hero } = site;

  return (
    <section
      id="top"
      className="relative z-[2] flex min-h-[100svh] flex-col justify-center px-[clamp(20px,6vw,90px)] py-[clamp(56px,9vh,120px)]"
    >
      <div className="flex flex-col gap-[clamp(24px,4vh,44px)]">
        <Reveal
          as="h1"
          trigger="load"
          delay={0.2}
          blur={22}
          y={26}
          className="m-0 font-sans text-[clamp(46px,10vw,140px)] font-semibold leading-[0.95] tracking-tight text-foreground"
        >
          {hero.name}
        </Reveal>

        <Reveal as="div" trigger="load" delay={0.7}>
          <RotatingTagline />
        </Reveal>

        <div className="flex flex-wrap gap-[clamp(20px,4vw,56px)]">
          {hero.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              as="div"
              trigger="load"
              delay={0.9 + i * 0.08}
            >
              <Stat value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>

        <Reveal as="div" trigger="load" delay={1.3} className="flex flex-wrap gap-4">
          <Button href="#work" variant="primary">
            See My Work
          </Button>
          <Button href="#contact" variant="ghost">
            Let&apos;s Talk
          </Button>
        </Reveal>
      </div>

      <Reveal
        as="div"
        trigger="load"
        delay={1.6}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-[clamp(20px,6vw,90px)] py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle"
      >
        <span>{site.location}</span>
        <span>{hero.availability}</span>
      </Reveal>
    </section>
  );
}
