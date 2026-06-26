import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { FeaturedSlide } from "@/components/projects/FeaturedSlide";
import { featuredProjects } from "@/lib/projects";

/**
 * Featured Projects — autoplaying carousel over the three featured case
 * studies, one full-width slide each (image + copy via FeaturedSlide).
 */
export function FeaturedProjects() {
  return (
    <Section id="featured">
      <SectionHeading eyebrow="FEATURED WORK" title="Selected Projects" />
      <Carousel
        autoplayDelay={6000}
        ariaLabel="Featured projects"
        slideClassName="basis-full"
      >
        {featuredProjects.map((p) => (
          <FeaturedSlide key={p.slug} project={p} />
        ))}
      </Carousel>
    </Section>
  );
}
