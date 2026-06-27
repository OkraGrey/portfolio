import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechStackGroups } from "@/components/about/TechStackGroups";
import { WhyWorkWithMe } from "@/components/about/WhyWorkWithMe";
import { ACCENT_HEX, ACCENT_TEXT, hexA, type Accent } from "@/lib/category";
import { about } from "@/lib/about";

/** Icon + accent per credential line, in authored order: degree, role, experience. */
const CREDENTIALS: { icon: typeof GraduationCap; accent: Accent }[] = [
  { icon: GraduationCap, accent: "emerald" },
  { icon: Briefcase, accent: "indigo" },
  { icon: Sparkles, accent: "amber" },
];

/**
 * About — supporting detail beneath the merged intro hero: credentials and the
 * grouped tech stack side by side, with the "why work with me" value props
 * spanning below. (Headshot, name, role, and bio live in the hero up top.)
 */
export function About() {
  return (
    <Section id="about" padY="py-[clamp(60px,9vh,110px)]">
      <SectionHeading
        eyebrow="/ About"
        eyebrowColor="#a3aaff"
        title="Background & Stack"
      />

      <div className="grid items-start gap-[clamp(28px,5vw,56px)] lg:grid-cols-2">
        <Reveal as="ul" className="flex flex-col gap-3.5">
          {about.credentials.map((credential, i) => {
            const { icon: Icon, accent } = CREDENTIALS[i % CREDENTIALS.length];
            return (
              <li
                key={credential}
                className="flex items-center gap-3.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/[0.08] [&:not(:last-child)]:pb-3.5"
              >
                <span
                  className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px]"
                  style={{
                    background: hexA(ACCENT_HEX[accent], 0.14),
                    color: ACCENT_TEXT[accent],
                  }}
                >
                  <Icon
                    aria-hidden
                    strokeWidth={1.6}
                    className="h-[19px] w-[19px]"
                  />
                </span>
                <span className="text-[16px] font-medium text-[#e6e9f2]">
                  {credential}
                </span>
              </li>
            );
          })}
        </Reveal>

        <Reveal delay={0.08}>
          <TechStackGroups />
        </Reveal>
      </div>

      <div className="mt-[clamp(40px,6vw,72px)]">
        <WhyWorkWithMe />
      </div>
    </Section>
  );
}
