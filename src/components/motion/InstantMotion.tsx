"use client";

import { InstantReveal } from "@/components/motion/Reveal";

/**
 * Opts a subtree out of Reveal scroll/entrance animations. Used on sub-pages so
 * their content presents as one cohesive screen — the route transition handles
 * the entrance — instead of re-running the homepage's scroll reveals. Renders
 * no DOM of its own (context provider only).
 */
export function InstantMotion({ children }: { children: React.ReactNode }) {
  return <InstantReveal.Provider value>{children}</InstantReveal.Provider>;
}
