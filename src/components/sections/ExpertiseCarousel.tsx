import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { ExpertiseCard } from "@/components/expertise/ExpertiseCard";
import { expertise } from "@/lib/expertise";

/**
 * ExpertiseCarousel — "What I Build". A 3-up (peek on mobile) autoplaying
 * carousel of capability cards, each linking to a representative case study.
 */
export function ExpertiseCarousel() {
  return (
    <Section id="expertise">
      <SectionHeading eyebrow="EXPERTISE" title="What I Build" />
      <Carousel
        autoplayDelay={5000}
        ariaLabel="Expertise areas"
        slideClassName="basis-[85%] sm:basis-[55%] lg:basis-[33.333%] pr-4"
      >
        {expertise.map((item) => (
          <ExpertiseCard key={item.title} {...item} />
        ))}
      </Carousel>
    </Section>
  );
}
