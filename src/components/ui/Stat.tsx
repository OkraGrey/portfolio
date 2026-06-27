interface StatProps {
  value: string;
  label: string;
  /** Top hairline accent color (CSS color). */
  accentColor: string;
}

/**
 * A single hero stat cell — large value over a mono label, with a colored top
 * hairline. Rendered inside the connected stat grid (1px gaps form the inner
 * borders), so the cell itself carries the surface background.
 */
export function Stat({ value, label, accentColor }: StatProps) {
  return (
    <div
      className="flex flex-col gap-1.5 bg-surface-2 px-5 py-[18px]"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      <span className="font-sans text-[clamp(22px,2.6vw,32px)] font-bold leading-[1.1] tracking-[-0.02em] text-bright">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        {label}
      </span>
    </div>
  );
}
