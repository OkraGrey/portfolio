import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedSlide } from "@/components/projects/FeaturedSlide";
import { featuredProjects } from "@/lib/projects";

/**
 * Featured Projects — a stacked column of the three featured case studies, each
 * a full-width split card (cover + copy via FeaturedSlide).
 */
export function FeaturedProjects() {
  return (
    <Section id="featured" padY="py-[clamp(40px,7vh,80px)]">
      <SectionHeading
        eyebrow="/ Featured Work"
        eyebrowColor="#a3aaff"
        title="Selected Projects"
      />
      <div className="flex flex-col gap-[clamp(16px,2vw,24px)]">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <FeaturedSlide project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
