"use client";

import { categories, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/cn";

type Filter = "All" | ProjectCategory;

interface FilterTabsProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

/**
 * Category filter for the project grid: a tablist of pill buttons. The active
 * tab is a solid white pill; the rest are outlined. Reflected via aria-selected.
 */
export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2.5"
    >
      {categories.map((category) => {
        const selected = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(category)}
            className={cn(
              "rounded-full border px-[18px] py-[9px] font-mono text-[12px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              selected
                ? "border-[#f4f7fd] bg-[#f4f7fd] font-semibold text-[#07080c]"
                : "border-white/[0.14] text-faint hover:text-foreground",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
