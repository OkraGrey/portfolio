import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import type { Project } from "@/lib/projects";

/**
 * Project grid card: thumbnail, title, description, and tag pills. The whole
 * card is a link to the case study (accessible name = title); hover lift+glow
 * comes from the interactive Card shell.
 */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Card interactive href={`/projects/${p.slug}`} className="flex flex-col gap-4">
      <Image
        src={p.image.card}
        width={600}
        height={400}
        alt={p.cardDescription}
        className="aspect-[3/2] h-auto w-full rounded-xl object-cover"
      />
      <h3 className="font-sans text-[clamp(18px,2vw,21px)] font-medium text-foreground">
        {p.title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-muted line-clamp-3">
        {p.cardDescription}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {p.cardTags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>
    </Card>
  );
}
