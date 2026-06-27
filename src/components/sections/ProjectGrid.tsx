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
    <Section id="work" padY="py-[clamp(40px,7vh,80px)]">
      <SectionHeading
        eyebrow="/ All Projects"
        eyebrowColor="#2fe0b0"
        title="Project Grid"
        mb="mb-[clamp(24px,3.5vh,40px)]"
      />

      <div className="mb-[clamp(24px,4vh,40px)]">
        <FilterTabs active={active} onChange={setActive} />
      </div>

      <div className="grid gap-[clamp(16px,2vw,26px)] [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
