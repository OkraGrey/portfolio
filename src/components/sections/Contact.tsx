import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const CHANNELS = [
  { label: `${site.links.email} ↗`, href: `mailto:${site.links.email}` },
  { label: `${site.links.githubLabel} ↗`, href: site.links.github },
  { label: "fiverr ↗", href: site.links.fiverr },
];

/**
 * Contact — closing call to action with the available channels and footer.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center px-[clamp(20px,6vw,90px)] pb-[60px] pt-[110px]"
    >
      <Reveal
        as="h2"
        y={20}
        className="mb-10 text-[clamp(32px,6vw,86px)] font-semibold leading-[0.96] tracking-[-0.03em]"
      >
        Let&rsquo;s build something
        <br />
        from first principles.
      </Reveal>

      <Reveal
        as="div"
        delay={0.1}
        className="flex flex-wrap gap-x-10 gap-y-3.5 font-mono text-[13px] tracking-[0.04em]"
      >
        {CHANNELS.map((c) => {
          const external = c.href.startsWith("http");
          return (
            <a
              key={c.href}
              href={c.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[#cfd4e4] no-underline transition-colors hover:text-primary-bright"
            >
              {c.label}
            </a>
          );
        })}
      </Reveal>

      <div className="mt-[70px] border-t border-white/8 pt-6 font-mono text-[11px] text-fainter">
        © {site.year} {site.name.toUpperCase()} — designed from noise.
      </div>
    </section>
  );
}
