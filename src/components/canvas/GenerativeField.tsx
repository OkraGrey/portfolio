"use client";

import { useEffect, useRef } from "react";
import { GenerativeFieldEngine } from "./field-engine";

/**
 * Fixed, full-viewport generative background. Renders the particle canvas
 * plus two vignette layers that focus attention toward the centre and
 * darken the edges so foreground type stays legible.
 */
export function GenerativeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const engine = new GenerativeFieldEngine(canvas, { reducedMotion });
    engine.start();
    return () => engine.destroy();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 block h-full w-full"
      />
      {/* Radial focus + edge darkening, matched to the reference vignette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 42%, rgba(6,7,9,0.78) 0%, rgba(6,7,9,0.32) 46%, rgba(6,7,9,0) 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ boxShadow: "inset 0 0 240px 60px rgba(6,7,9,0.9)" }}
      />
    </>
  );
}
