"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

/**
 * RotatingTagline — cycles the hero taglines every 3.2s with a fade + slight
 * lift. Under prefers-reduced-motion it renders the first tagline only, with no
 * interval. The container is an aria-live region so screen readers announce the
 * change politely.
 */
export function RotatingTagline() {
  const reduce = useReducedMotion();
  const taglines = site.hero.taglines;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % taglines.length),
      3200,
    );
    return () => clearInterval(id);
  }, [reduce, taglines.length]);

  const current = reduce ? taglines[0] : taglines[index];

  return (
    <div
      aria-live="polite"
      className="font-mono text-[clamp(13px,1.6vw,18px)] text-primary-bright"
    >
      {reduce ? (
        <span>{current}</span>
      ) : (
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
}
