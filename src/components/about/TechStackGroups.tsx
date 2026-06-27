import { ACCENT_TEXT, type Accent } from "@/lib/category";
import { about } from "@/lib/about";

/** Accent per stack group, matched to the design. */
const GROUP_ACCENT: Record<string, Accent> = {
  "AI / LLM": "emerald",
  Backend: "indigo",
  "Frontend & DB": "pink",
  Infrastructure: "amber",
};

/**
 * Grouped tech-stack pills — one labelled row per group, the label tinted with
 * the group's accent. Pills are soft rounded chips. Pure content render.
 */
export function TechStackGroups() {
  return (
    <div className="flex flex-col gap-[18px]">
      {about.techStackGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2.5">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.14em]"
            style={{ color: ACCENT_TEXT[GROUP_ACCENT[group.label] ?? "indigo"] }}
          >
            {group.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] px-[13px] py-1.5 text-[13px] text-[#d2d8e4]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
