/**
 * CaseStudy — the rigid case-study template every project shares: header,
 * Problem, Approach, Architecture slot, Key Results, grouped Tech Stack, and
 * prev/next + contact nav. Single-column, single <h1> (the title). Section
 * labels are mono uppercase <h2>s for a clear heading hierarchy.
 */

import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureSlot } from "@/components/projects/ArchitectureSlot";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
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
      <Reveal as="div" className="mb-8">
        <Button variant="ghost" size="sm" href="/#work">
          ← Back to Projects
        </Button>
      </Reveal>

      <header className="flex flex-col gap-4">
        <Reveal
          as="h1"
          className="font-sans text-[clamp(32px,6vw,64px)] font-semibold leading-[1.04] text-foreground"
        >
          {project.title}
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="text-[clamp(15px,1.8vw,20px)] text-muted"
        >
          {project.subtitle}
        </Reveal>
        <Reveal as="div" delay={0.16}>
          <Pill variant="solid">{project.category}</Pill>
        </Reveal>
      </header>

      <hr className="my-[clamp(32px,6vh,64px)] border-t border-line" />

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
        className="mt-[clamp(40px,7vh,72px)] flex flex-col gap-4"
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
        className="mt-[clamp(40px,7vh,72px)] flex flex-col gap-4"
      >
        <SubHeading>Architecture</SubHeading>
        <ArchitectureSlot project={project} />
      </Reveal>

      {/* KEY RESULTS */}
      <Reveal
        as="section"
        delay={0.08}
        className="mt-[clamp(40px,7vh,72px)] flex flex-col gap-4"
      >
        <SubHeading>Key Results</SubHeading>
        <ul className="flex flex-col gap-3">
          {project.results.map((result, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="text-[17px] leading-[1.6] text-muted">
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
        className="mt-[clamp(40px,7vh,72px)] flex flex-col gap-6"
      >
        <SubHeading>Tech Stack</SubHeading>
        <div className="flex flex-col gap-5">
          {project.techStack.map((group) => {
            const items = group.items.filter((item) => item !== "—");
            if (items.length === 0) return null;
            return (
              <div key={group.label} className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Pill key={item} variant="outline">
                      {item}
                    </Pill>
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
