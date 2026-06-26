interface StatProps {
  value: string;
  label: string;
}

/** A single hero stat — large value over a mono label. Static (no count-up). */
export function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-[clamp(22px,3vw,34px)] font-semibold text-foreground">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
        {label}
      </span>
    </div>
  );
}
