import Image from "next/image";
import { ACCENT_HEX, PROJECT_ACCENT, chipStyle, hexA } from "@/lib/category";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

/**
 * The shared project "cover" — a background image under a darkening gradient
 * plus a corner accent radial, with the project number (top-right) and an
 * accent category chip (bottom-left). `big` is the featured/case-study size.
 */
export function ProjectCover({
  project: p,
  big = false,
  sizes,
}: {
  project: Project;
  big?: boolean;
  sizes?: string;
}) {
  const accent = PROJECT_ACCENT[p.category];
  const base = ACCENT_HEX[accent];
  const overlay = `linear-gradient(to top, rgba(6,7,9,0.92) 0%, rgba(6,7,9,0.32) 48%, rgba(6,7,9,0.05) 100%), radial-gradient(120% 115% at 100% 0%, ${hexA(base, 0.4)}, transparent 56%)`;

  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden bg-surface-3",
        big ? "min-h-[260px] p-[18px]" : "h-[182px] border-b border-white/[0.06] p-4",
      )}
    >
      <Image
        src={asset(p.image.hero ?? p.image.card)}
        alt=""
        fill
        sizes={sizes ?? "(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: overlay }}
      />
      <span
        className="absolute right-4 top-3.5 font-mono font-bold tracking-[0.04em]"
        style={{
          color: hexA(base, 0.95),
          fontSize: big ? "22px" : "16px",
          textShadow: "0 1px 10px rgba(0,0,0,0.7)",
        }}
      >
        {p.num}
      </span>
      <span
        className="relative inline-flex self-start rounded-full font-mono uppercase"
        style={{
          ...chipStyle(accent),
          padding: big ? "6px 13px" : "5px 12px",
          fontSize: big ? "11px" : "10.5px",
          letterSpacing: big ? "0.12em" : "0.1em",
        }}
      >
        {p.category}
      </span>
    </div>
  );
}
