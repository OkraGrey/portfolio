import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { ExpertiseCard } from "@/components/expertise/ExpertiseCard";
import { expertise } from "@/lib/expertise";

/**
 * Expertise — "What I Build". A single-row, 3-up (peek on mobile) autoplaying
 * carousel of capability cards, each with an accent icon tile and a link to a
 * representative case study.
 */
export function ExpertiseCarousel() {
  return (
    <Section id="expertise" padY="py-[clamp(60px,9vh,110px)]">
      <SectionHeading
        eyebrow="/ Expertise"
        eyebrowColor="#2fe0b0"
        title="What I Build"
      />
      <Carousel
        autoplayDelay={2000}
        showArrows
        showDots
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
