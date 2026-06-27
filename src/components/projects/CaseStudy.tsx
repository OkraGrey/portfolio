/**
 * CaseStudy — the rigid case-study template every project shares: header,
 * Problem, Approach, Architecture slot, Key Results, grouped Tech Stack, and
 * prev/next + contact nav. Single-column, single <h1> (the title). Section
 * labels are mono uppercase <h2>s for a clear heading hierarchy.
 */

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureSlot } from "@/components/projects/ArchitectureSlot";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { chipStyle, projectAccent } from "@/lib/category";
import type { Project } from "@/lib/projects";

/** Mono uppercase section label, rendered as the section's <h2>. */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[12px] uppercase tracking-[0.22em] text-primary-bright">
      {children}
    </h2>
  );
}

interface CaseStudyProps {
  project: Project;
}

export function CaseStudy({ project }: CaseStudyProps) {
  return (
    <article>
      <Reveal as="div" className="mb-7">
        <Link
          href="/#work"
          className="inline-flex items-center gap-[7px] rounded-full border border-white/[0.22] px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#d2d8e4] no-underline transition-colors hover:border-white/40 hover:text-white"
        >
          ← Back to Projects
        </Link>
      </Reveal>

      <header className="flex flex-col gap-4">
        <Reveal
          as="h1"
          className="font-sans text-[clamp(32px,6vw,60px)] font-bold leading-[1.04] tracking-[-0.02em] text-bright"
        >
          {project.title}
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-muted"
        >
          {project.subtitle}
        </Reveal>
        <Reveal as="div" delay={0.16}>
          <span
            className="inline-flex self-start rounded-full px-[14px] py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"
            style={chipStyle(projectAccent(project.category))}
          >
            {project.category}
          </span>
        </Reveal>
      </header>

      <Reveal as="div" delay={0.2} className="mt-7">
        <Image
          src={project.image.hero ?? project.image.card}
          alt=""
          width={1280}
          height={720}
          sizes="(min-width:820px) 820px, 100vw"
          className="aspect-[16/9] w-full rounded-[18px] border border-white/[0.12] object-cover"
        />
      </Reveal>

      <hr className="my-[clamp(32px,6vh,56px)] border-t border-white/10" />

      {/* THE PROBLEM */}
      <Reveal as="section" className="flex flex-col gap-4">
        <SubHeading>The Problem</SubHeading>
        {project.problem.map((para, i) => (
          <p key={i} className="text-[17px] leading-[1.7] text-muted">
            {para}
          </p>
        ))}
      </Reveal>

      {/* THE APPROACH */}
      <Reveal
        as="section"
        delay={0.08}
        className="mt-[clamp(40px,7vh,64px)] flex flex-col gap-4"
      >
        <SubHeading>The Approach</SubHeading>
        {project.approach.map((para, i) => (
          <p key={i} className="text-[17px] leading-[1.7] text-muted">
            {para}
          </p>
        ))}
      </Reveal>

      {/* ARCHITECTURE */}
      <Reveal
        as="section"
        delay={0.08}
        className="mt-[clamp(40px,7vh,64px)] flex flex-col gap-4"
      >
        <SubHeading>Architecture</SubHeading>
        <ArchitectureSlot project={project} />
      </Reveal>

      {/* KEY RESULTS */}
      <Reveal
        as="section"
        delay={0.08}
        className="mt-[clamp(40px,7vh,64px)] flex flex-col gap-4"
      >
        <SubHeading>Key Results</SubHeading>
        <ul className="flex flex-col gap-3.5">
          {project.results.map((result, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] bg-emerald/[0.16] text-emerald">
                <Check className="h-[13px] w-[13px]" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-[17px] leading-[1.6] text-[#d2d8e4]">
                {result}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* TECH STACK */}
      <Reveal
        as="section"
        delay={0.08}
        className="mt-[clamp(40px,7vh,64px)] flex flex-col gap-5"
      >
        <SubHeading>Tech Stack</SubHeading>
        <div className="flex flex-col gap-5">
          {project.techStack.map((group) => {
            const items = group.items.filter((item) => item !== "—");
            if (items.length === 0) return null;
            return (
              <div key={group.label} className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] px-[13px] py-1.5 text-[13px] text-[#d2d8e4]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <ProjectNav slug={project.slug} />
    </article>
  );
}
