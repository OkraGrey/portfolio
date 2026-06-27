import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { site } from "@/lib/site";
import { about } from "@/lib/about";

/** Top hairline accent per stat cell: emerald · indigo · pink · amber. */
const STAT_ACCENTS = ["#2fe0b0", "#7782ff", "#ff5c93", "#ffb74d"];

/**
 * Hero — the merged intro. Headshot + identity (badge, one-line name, role,
 * bio) sit in a two-column block; the connected stat grid and the two CTAs run
 * full width beneath it so everything clears the fold. The deeper About detail
 * (credentials, tech stack, why-work-with-me) lives in the section below.
 */
export function Hero() {
  const { hero } = site;
  const badge = `${hero.availability} · ${site.location}`.toUpperCase();

  return (
    <section
      id="top"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,72px)] pb-[clamp(40px,7vh,80px)] pt-[clamp(96px,12vh,130px)]"
    >
      <div className="grid items-center gap-[clamp(28px,5vw,56px)] lg:[grid-template-columns:minmax(0,320px)_1fr]">
        {/* Headshot */}
        <Reveal
          as="div"
          trigger="load"
          delay={0.15}
          className="mx-auto w-full max-w-[280px] lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[20px] border border-white/[0.12] bg-[linear-gradient(155deg,#11161f,#0a0d14)]">
            <Image
              src={about.photo}
              width={800}
              height={800}
              alt="Hasnain Sohail"
              priority
              className="block h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Identity */}
        <div className="flex flex-col gap-[clamp(14px,2.4vh,22px)]">
          <Reveal as="div" trigger="load" delay={0.1} className="self-start">
            <span className="inline-flex items-center gap-[9px] rounded-full border border-emerald/[0.32] bg-emerald/[0.07] px-[14px] py-[7px] font-mono text-[12px] tracking-[0.12em] text-[#7af0cf]">
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] rounded-full bg-emerald"
                style={{ animation: "pulseDot 2.4s infinite" }}
              />
              {badge}
            </span>
          </Reveal>

          <div className="flex flex-col gap-2.5">
            <Reveal
              as="h1"
              trigger="load"
              delay={0.2}
              blur={22}
              y={26}
              className="m-0 font-sans text-[clamp(32px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.03em] text-bright"
            >
              {hero.name}
            </Reveal>
            <Reveal
              as="p"
              trigger="load"
              delay={0.38}
              className="m-0 font-sans text-[clamp(17px,2vw,24px)] font-medium tracking-[-0.01em] text-primary-bright"
            >
              {about.title}
            </Reveal>
          </div>

          <Reveal
            as="p"
            trigger="load"
            delay={0.5}
            className="m-0 text-[clamp(14px,1.5vw,16px)] leading-[1.65] text-muted"
          >
            {about.bio}
          </Reveal>
        </div>
      </div>

      {/* Stats — full width so the values never wrap */}
      <Reveal
        as="div"
        trigger="load"
        delay={0.62}
        className="mt-[clamp(28px,4vh,44px)] grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]"
      >
        {hero.stats.map((stat, i) => (
          <Stat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            accentColor={STAT_ACCENTS[i % STAT_ACCENTS.length]}
          />
        ))}
      </Reveal>

      {/* CTAs */}
      <Reveal
        as="div"
        trigger="load"
        delay={0.78}
        className="mt-[clamp(20px,3vh,30px)] flex flex-wrap gap-3.5"
      >
        <Button href="#work" variant="primary">
          See my work →
        </Button>
        <Button href="#contact" variant="ghost">
          Let&apos;s talk
        </Button>
      </Reveal>
    </section>
  );
}
