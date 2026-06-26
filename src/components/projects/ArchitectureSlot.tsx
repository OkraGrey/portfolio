/**
 * ArchitectureSlot — the case-study architecture section. Real diagrams don't
 * exist yet (no `architecture` field on a project's image set), so this always
 * renders a placeholder frame: an NDA notice for withheld projects, otherwise a
 * dashed "coming soon" frame.
 */

import { hasNdaArchitecture, type Project } from "@/lib/projects";

interface ArchitectureSlotProps {
  project: Project;
}

export function ArchitectureSlot({ project }: ArchitectureSlotProps) {
  const message = hasNdaArchitecture(project.slug)
    ? "Architecture withheld — under NDA"
    : "Architecture diagram coming soon";

  return (
    <div className="grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-line font-mono text-[12px] text-subtle">
      {message}
    </div>
  );
}
