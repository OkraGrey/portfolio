import { Pill } from "@/components/ui/Pill";
import { about } from "@/lib/about";

/**
 * Grouped tech-stack pills — one labelled row per group (AI/LLM, Backend,
 * Frontend & DB, Infrastructure). Server component; pure content render.
 */
export function TechStackGroups() {
  return (
    <div className="flex flex-col gap-[clamp(16px,2vw,22px)]">
      {about.techStackGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            {group.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Pill key={item} variant="outline">
                {item}
              </Pill>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
