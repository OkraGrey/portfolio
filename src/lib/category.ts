/**
 * Categorical accent system — the heart of the revamp. Each project / blog
 * category maps to one of four accents (indigo · emerald · pink · amber),
 * which drive category chips, project numbers, cover glows, and eyebrows.
 *
 * Hex values mirror the Claude Design source exactly so chips, borders, and
 * gradients composite identically.
 */
import type { CSSProperties } from "react";
import type { ProjectCategory } from "@/lib/projects";
import type { BlogCategory } from "@/lib/blog";

export type Accent = "indigo" | "emerald" | "pink" | "amber";

/** Base category hue (used for chip text + as the alpha-composite base). */
export const ACCENT_HEX: Record<Accent, string> = {
  indigo: "#7c8bff",
  emerald: "#2fe0b0",
  pink: "#ff5c93",
  amber: "#ffb74d",
};

/** Brighter shade for icons, links, and eyebrows. */
export const ACCENT_TEXT: Record<Accent, string> = {
  indigo: "#a3aaff",
  emerald: "#5fe9c6",
  pink: "#ff86b0",
  amber: "#ffc879",
};

export const PROJECT_ACCENT: Record<ProjectCategory, Accent> = {
  "AI Agents": "indigo",
  Generation: "pink",
  Scaling: "emerald",
  Education: "amber",
};

export const BLOG_ACCENT: Record<BlogCategory, Accent> = {
  "AI Strategy": "indigo",
  "Building AI Products": "emerald",
  "Case Studies": "amber",
};

/** Add an alpha channel to a `#rrggbb` hex. */
export function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

/** Category chip styling: translucent fill, accent border, accent text. */
export function chipStyle(accent: Accent): CSSProperties {
  const base = ACCENT_HEX[accent];
  return {
    background: hexA(base, 0.18),
    border: `1px solid ${hexA(base, 0.42)}`,
    color: base,
  };
}

export const projectAccent = (c: ProjectCategory): Accent => PROJECT_ACCENT[c];
export const blogAccent = (c: BlogCategory): Accent => BLOG_ACCENT[c];
