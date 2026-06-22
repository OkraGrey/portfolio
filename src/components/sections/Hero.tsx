import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

/**
 * Hero — full-viewport, centred. Type "denoises" in on load with a staggered
 * cadence; a fixed bottom rail carries location, prompt, and availability.
 */
export function Hero() {
  const { tagline } = site;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center"
    >
      <Reveal
        as="div"
        trigger="load"
        delay={0.6}
        className="mb-[clamp(18px,3vh,30px)] font-mono text-[clamp(10px,1.05vw,12.5px)] tracking-[0.34em] text-primary-bright"
      >
        {site.eyebrow.join("  ·  ")}
      </Reveal>

      <Reveal
        as="h1"
        trigger="load"
        delay={0.2}
        blur={22}
        y={26}
        className="m-0 text-[clamp(46px,10vw,158px)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] whitespace-nowrap"
      >
        {site.name}
      </Reveal>

      <Reveal
        as="p"
        trigger="load"
        delay={1.05}
        className="mt-[clamp(20px,3.4vh,34px)] max-w-[600px] text-[clamp(14px,1.5vw,19px)] font-light leading-[1.5] text-muted"
      >
        {tagline.lead}{" "}
        <span className="font-normal text-foreground">{tagline.emphasis1}</span>{" "}
        {tagline.mid}{" "}
        <span className="font-normal text-foreground">{tagline.emphasis2}</span>
        {tagline.trail}
      </Reveal>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-[clamp(20px,4vw,52px)] py-6 font-mono text-[11px] tracking-[0.06em] text-faint">
        <Reveal as="div" trigger="load" delay={1.9} className="leading-[1.9]">
          <div>{site.location}</div>
          <div>{site.org}</div>
        </Reveal>

        <Reveal
          as="div"
          trigger="load"
          delay={2.05}
          className="text-center"
        >
          <div className="mb-2 text-fainter">MOVE TO DISTURB THE FIELD</div>
          <div className="mx-auto h-[26px] w-px bg-gradient-to-b from-primary to-transparent" />
        </Reveal>

        <Reveal
          as="div"
          trigger="load"
          delay={1.9}
          className="text-right leading-[1.9]"
        >
          <div className="text-primary-bright">● AVAILABLE</div>
          <div>{site.year}</div>
        </Reveal>
      </div>
    </section>
  );
}
