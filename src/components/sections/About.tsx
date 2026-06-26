import Image from "next/image";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { TechStackGroups } from "@/components/about/TechStackGroups";
import { WhyWorkWithMe } from "@/components/about/WhyWorkWithMe";
import { about } from "@/lib/about";

/** Icon per credential line, in authored order: degree, role, experience. */
const CREDENTIAL_ICONS = [GraduationCap, Briefcase, Sparkles];

/**
 * About — bio + headshot on the left, credentials + grouped tech stack on the
 * right, with the "why work with me" value props spanning below both columns.
 */
export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="ABOUT" title="AI Product Engineer" />

      <div className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: photo + name + title + bio */}
        <Reveal className="flex flex-col gap-5">
          <Image
            src={about.photo}
            width={800}
            height={800}
            alt="Hasnain Sohail"
            className="h-auto w-full rounded-2xl border border-line"
          />
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-[clamp(22px,3vw,30px)] font-semibold text-foreground">
              {about.name}
            </h3>
            <div>
              <Pill variant="solid">{about.title}</Pill>
            </div>
            <p className="text-[17px] leading-[1.7] text-muted">{about.bio}</p>
          </div>
        </Reveal>

        {/* Right: credentials + tech stack */}
        <Reveal delay={0.08} className="flex flex-col gap-[clamp(24px,4vw,40px)]">
          <ul className="flex flex-col gap-3">
            {about.credentials.map((credential, i) => {
              const Icon = CREDENTIAL_ICONS[i % CREDENTIAL_ICONS.length];
              return (
                <li key={credential} className="flex items-center gap-3">
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="h-5 w-5 shrink-0 text-primary-bright"
                  />
                  <span className="text-[16px] text-foreground">
                    {credential}
                  </span>
                </li>
              );
            })}
          </ul>

          <TechStackGroups />
        </Reveal>
      </div>

      <div className="mt-[clamp(36px,6vw,72px)]">
        <WhyWorkWithMe />
      </div>
    </Section>
  );
}
