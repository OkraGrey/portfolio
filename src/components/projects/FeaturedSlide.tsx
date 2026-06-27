import Link from "next/link";
import { ProjectCover } from "@/components/projects/ProjectCover";
import type { Project } from "@/lib/projects";

/**
 * One featured project card: cover on the left, copy on the right (stacked on
 * mobile). The whole card links to the case study; its accessible name is the
 * headline.
 */
export function FeaturedSlide({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-[20px] border border-white/10 bg-[#0c1018] no-underline transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:border-white/20 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] lg:[grid-template-columns:1.1fr_1fr]"
    >
      <ProjectCover project={p} big sizes="(min-width:1024px) 600px, 100vw" />

      <div className="flex flex-col justify-center gap-4 p-[clamp(24px,3vw,44px)]">
        <h3 className="m-0 font-sans text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.12] tracking-[-0.01em] text-[#f5f7fc]">
          {p.headline}
        </h3>
        <p className="m-0 text-[16px] leading-[1.6] text-muted">
          {p.featuredOneLiner}
        </p>
        <div className="flex flex-wrap gap-2">
          {p.cardTags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-white/[0.14] px-3 py-[5px] font-mono text-[11px] tracking-[0.06em] text-[#aeb6c8]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-0.5 inline-flex items-center gap-[7px] text-[14px] font-semibold text-primary-bright">
          View case study →
        </span>
      </div>
    </Link>
  );
}
