/**
 * ProjectNav — bottom-of-case-study navigation: prev/next project links (hidden
 * when there's no neighbour) plus a contact CTA. Cross-route anchors use the
 * "/#contact" form so they resolve from this sub-page back to the homepage.
 */

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getAdjacent } from "@/lib/projects";

interface ProjectNavProps {
  slug: string;
}

export function ProjectNav({ slug }: ProjectNavProps) {
  const { prev, next } = getAdjacent(slug);

  return (
    <nav
      aria-label="Project navigation"
      className="mt-[clamp(48px,8vh,88px)] flex flex-col gap-8 border-t border-line pt-[clamp(28px,5vh,48px)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {prev ? (
          <Button
            variant="ghost"
            href={`/projects/${prev.slug}`}
            ariaLabel={`Previous project: ${prev.title}`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {prev.title}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button
            variant="ghost"
            href={`/projects/${next.slug}`}
            ariaLabel={`Next project: ${next.title}`}
          >
            {next.title}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <span />
        )}
      </div>

      <Button variant="primary" href="/#contact" className="self-start">
        Have a similar project? Let&apos;s talk →
      </Button>
    </nav>
  );
}
