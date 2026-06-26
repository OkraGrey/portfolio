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
  "relative rounded-2xl border border-line bg-[#0b0d12]/60 backdrop-blur-sm p-[clamp(18px,2.4vw,28px)]";

const INTERACTIVE =
  "transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(110,123,255,0.45)]";

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
