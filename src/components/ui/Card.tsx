import Link from "next/link";
import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  /** If set, the whole card is an internal link. */
  href?: string;
  /** Enable hover lift + indigo glow. */
  interactive?: boolean;
  className?: string;
}

const BASE =
  "relative rounded-[18px] border border-line bg-surface p-[clamp(18px,2.4vw,28px)]";

const INTERACTIVE =
  "transition-transform transition-shadow duration-[250ms] hover:-translate-y-1 hover:border-white/[0.22] hover:shadow-[0_28px_55px_-28px_rgba(0,0,0,0.9)]";

/** Surface shell used by project, expertise, blog, and value-prop cards. */
export function Card({ children, href, interactive, className }: CardProps) {
  const classes = cn(BASE, interactive && INTERACTIVE, className);
  if (href) {
    return (
      <Link href={href} className={cn(classes, "block")}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
