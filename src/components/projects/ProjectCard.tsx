import Link from "next/link";
import { ProjectCover } from "@/components/projects/ProjectCover";
import type { Project } from "@/lib/projects";

/**
 * Project grid card: accent cover (image + number + category chip), then title,
 * description, and tag pills. The whole card links to the case study; its
 * accessible name is the title.
 */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-surface no-underline transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-[5px] hover:border-white/[0.22] hover:shadow-[0_28px_55px_-28px_rgba(0,0,0,0.9)]"
    >
      <ProjectCover project={p} />

      <div className="flex flex-1 flex-col gap-[11px] p-[22px]">
        <h3 className="m-0 font-sans text-[19px] font-semibold tracking-[-0.01em] text-[#f3f5fb]">
          {p.title}
        </h3>
        <p className="m-0 text-[14.5px] leading-[1.55] text-muted-2">
          {p.cardDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-[7px] pt-1.5">
          {p.cardTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-white/[0.12] px-[10px] py-1 font-mono text-[10.5px] tracking-[0.05em] text-faint"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
