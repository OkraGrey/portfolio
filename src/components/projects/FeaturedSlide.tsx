import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import type { Project } from "@/lib/projects";

/**
 * One featured-carousel slide: image left, copy right (stacked on mobile with
 * the image first). Drives the case-study link for a single featured project.
 */
export function FeaturedSlide({ project: p }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 items-center gap-[clamp(20px,4vw,56px)] lg:grid-cols-2">
      <Image
        src={p.image.hero ?? p.image.card}
        width={1200}
        height={700}
        alt={`${p.title} — ${p.headline}`}
        className="h-auto w-full rounded-2xl border border-line"
      />

      <div className="flex flex-col items-start gap-5">
        <Reveal as="div" delay={0}>
          <Pill variant="category">{p.category}</Pill>
        </Reveal>
        <Reveal
          as="h3"
          delay={0.08}
          className="font-sans text-[clamp(24px,3.5vw,40px)] font-semibold leading-[1.08] text-foreground"
        >
          {p.headline}
        </Reveal>
        <Reveal
          as="p"
          delay={0.16}
          className="max-w-[52ch] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-muted"
        >
          {p.featuredOneLiner}
        </Reveal>
        <Reveal as="div" delay={0.24} className="flex flex-wrap gap-2">
          {p.cardTags.slice(0, 4).map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </Reveal>
        <Reveal as="div" delay={0.32}>
          <Button
            href={`/projects/${p.slug}`}
            ariaLabel={`View the ${p.title} case study`}
          >
            View Case Study →
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
