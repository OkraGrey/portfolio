import Link from "next/link";
import type { CSSProperties } from "react";
import { ACCENT_HEX, ACCENT_TEXT, hexA } from "@/lib/category";
import type { ExpertiseCard as ExpertiseCardData } from "@/lib/expertise";

/**
 * ExpertiseCard — an accent icon tile, capability title, and one-liner, on a
 * surface card with a corner glow and an accent-tinted hover lift. The whole
 * card links to a representative case study; its accessible name is the title.
 */
export function ExpertiseCard({
  title,
  oneLiner,
  icon: Icon,
  projectSlug,
  accent,
}: ExpertiseCardData) {
  const base = ACCENT_HEX[accent];
  const style = {
    "--ac-border": hexA(base, 0.4),
    "--ac-shadow": hexA(base, accent === "indigo" ? 0.5 : 0.4),
  } as CSSProperties;

  return (
    <Link
      href={`/projects/${projectSlug}`}
      style={style}
      className="group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[18px] border border-white/10 bg-surface p-[26px] no-underline transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:[border-color:var(--ac-border)] hover:[box-shadow:0_24px_50px_-28px_var(--ac-shadow)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, ${hexA(base, 0.12)}, transparent 55%)`,
        }}
      />
      <span
        className="relative grid h-[46px] w-[46px] place-items-center rounded-xl"
        style={{ background: hexA(base, 0.14), color: ACCENT_TEXT[accent] }}
      >
        <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <h3 className="relative m-0 font-sans text-[21px] font-semibold tracking-[-0.01em] text-[#f3f5fb]">
        {title}
      </h3>
      <p className="relative m-0 text-[15px] leading-[1.55] text-[#c0c7d6]">
        {oneLiner}
      </p>
    </Link>
  );
}
