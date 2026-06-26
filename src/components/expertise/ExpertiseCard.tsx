import { Card } from "@/components/ui/Card";
import type { ExpertiseCard as ExpertiseCardData } from "@/lib/expertise";

/**
 * ExpertiseCard — an abstract icon, capability title, and one-liner. The whole
 * card links to a representative case study; its accessible name is the title.
 */
export function ExpertiseCard({ title, oneLiner, icon: Icon, projectSlug }: ExpertiseCardData) {
  return (
    <Card
      interactive
      href={`/projects/${projectSlug}`}
      className="flex h-full flex-col gap-3 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(110,123,255,0.10),transparent_60%)]" />
      <Icon
        className="relative h-7 w-7 text-primary-bright"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="relative font-sans text-[clamp(18px,2vw,22px)] font-medium text-foreground">
        {title}
      </h3>
      <p className="relative text-[15px] leading-snug text-muted">{oneLiner}</p>
    </Card>
  );
}
