import { site } from "@/lib/site";

/** Global footer: minimal mono signature, matched to the design. */
export function Footer() {
  return (
    <footer className="relative z-[2]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-[clamp(20px,5vw,72px)] py-8">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-fainter">
          © {site.year} {site.name}
        </span>
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-fainter">
          Built with Intelligence
        </span>
      </div>
    </footer>
  );
}
