"use client";

import { Pill } from "@/components/ui/Pill";
import { categories, type ProjectCategory } from "@/lib/projects";

type Filter = "All" | ProjectCategory;

interface FilterTabsProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

/**
 * Category filter for the project grid: a tablist of pill buttons. The active
 * tab is reflected via aria-selected and the category pill's active styling.
 */
export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
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
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Pill variant="category" active={selected}>
              {category}
            </Pill>
          </button>
        );
      })}
    </div>
  );
}
