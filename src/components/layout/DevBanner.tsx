"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

/**
 * Temporary "under development" notice. Floats just below the navbar as a
 * dismissible toast so visitors understand the placeholder visuals are
 * intentional and the site is actively being built. Shown on every visit
 * (dismissal is per-view), so anyone landing sees it.
 *
 * Remove this component (and its render in layout.tsx) at launch.
 */
export function DevBanner() {
  const [show, setShow] = useState(true);
  const dismiss = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 top-[64px] z-40 -translate-x-1/2 px-4"
        >
          <div className="flex items-center gap-3 rounded-full border border-primary/30 bg-[rgba(8,9,14,0.82)] px-4 py-2 shadow-[0_8px_30px_-12px_rgba(110,123,255,0.6)] backdrop-blur-md">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.04em] text-muted sm:text-[12px]">
              <span className="text-foreground">Under active development</span>
              <span className="hidden sm:inline">
                {" "}
                — visuals are placeholders, actively shipping.
              </span>
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss development notice"
              className="ml-1 text-subtle transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
