"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FilterTabs } from "@/components/projects/FilterTabs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, type ProjectCategory } from "@/lib/projects";

type Filter = "All" | ProjectCategory;

/**
 * Project Grid — the canonical #work section. Holds the active category filter
 * (default "All") and renders a responsive grid of project cards filtered by
 * category. Server primitives (Section/SectionHeading) render fine inside this
 * client component.
 */
export function ProjectGrid() {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <Section id="work">
      <SectionHeading eyebrow="ALL PROJECTS" title="Project Grid" />

      <div className="mb-[clamp(24px,4vh,40px)]">
        <FilterTabs active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-1 gap-[clamp(16px,2.4vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
