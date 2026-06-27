"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route-transition wrapper. Keyed on the full pathname so the new screen
 * cross-fades in on EVERY page navigation — including within-section moves like
 * blog-list → post or project → project that a segment-level remount would miss.
 * Hash-only changes (e.g. /#work) keep the same pathname, so they don't fade —
 * they just smooth-scroll in place. Sits at z-[2] above the fixed generative
 * field; reduced-motion renders plainly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Initial/animate are kept identical on server and client (only the duration
  // reacts to reduced-motion) so the SSR'd opacity:0 always matches the client's
  // initial state — otherwise a reduced-motion hydration mismatch would leave
  // the whole page stuck hidden.
  return (
    <motion.div
      key={pathname}
      className="relative z-[2]"
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
