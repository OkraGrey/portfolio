/**
 * Generates on-brand placeholder images (SVG → webp/png via sharp) so every
 * image slot renders intentionally until real assets are dropped in. Re-run
 * with `node scripts/gen-placeholders.mjs`. Replace the output files with real
 * photography/screenshots (keep the same paths) and delete this script.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PANEL = "#0b0d12";
const INDIGO = "#6e7bff";
const INDIGO2 = "#7c84ff";
const PINK = "#ff9ecd";
const FG = "#f4f6fb";
const MUTED = "#aeb4c6";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function defs() {
  return `<defs>
    <radialGradient id="glow" cx="50%" cy="38%" r="70%">
      <stop offset="0%" stop-color="${INDIGO}" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="${INDIGO}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${INDIGO}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fill-opacity="0.05"/>
    </pattern>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${INDIGO}"/>
      <stop offset="100%" stop-color="${PINK}"/>
    </linearGradient>
  </defs>`;
}

function frame(w, h) {
  return `<rect width="${w}" height="${h}" fill="${PANEL}"/>
    <rect width="${w}" height="${h}" fill="url(#dots)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>`;
}

function titleCard(w, h, { title, kicker, corner }) {
  const max = w < 700 ? 16 : 22;
  const fs = w < 700 ? 34 : 62;
  const lines = wrap(title, max);
  const startY = h / 2 - ((lines.length - 1) * fs * 1.1) / 2;
  const tspans = lines
    .map((l, i) => `<tspan x="${w / 2}" dy="${i === 0 ? 0 : fs * 1.1}">${esc(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${defs()}${frame(w, h)}
    <rect x="${w / 2 - 24}" y="${startY - fs - 30}" width="48" height="3" rx="1.5" fill="url(#accent)"/>
    <text x="${w / 2}" y="${startY}" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-weight="700" font-size="${fs}" fill="${FG}">${tspans}</text>
    ${kicker ? `<text x="${w / 2}" y="${startY + lines.length * fs * 1.1 + 14}" text-anchor="middle" font-family="monospace" font-size="${w < 700 ? 12 : 16}" letter-spacing="3" fill="${INDIGO2}">${esc(kicker.toUpperCase())}</text>` : ""}
    ${corner ? `<text x="20" y="${h - 18}" font-family="monospace" font-size="12" letter-spacing="2" fill="${MUTED}" fill-opacity="0.7">${esc(corner)}</text>` : ""}
  </svg>`;
}

function monogram(w, h, { initials, sub }) {
  const r = Math.min(w, h) * 0.26;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${defs()}${frame(w, h)}
    <circle cx="${w / 2}" cy="${h / 2 - 24}" r="${r}" fill="none" stroke="url(#accent)" stroke-width="2"/>
    <text x="${w / 2}" y="${h / 2 - 24 + r * 0.34}" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-weight="700" font-size="${r}" fill="${FG}">${esc(initials)}</text>
    <text x="${w / 2}" y="${h / 2 + r + 30}" text-anchor="middle" font-family="monospace" font-size="16" letter-spacing="3" fill="${MUTED}">${esc(sub.toUpperCase())}</text>
  </svg>`;
}

function ogCard(w, h, { name, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${defs()}${frame(w, h)}
    <text x="80" y="${h / 2 - 10}" font-family="Inter, Segoe UI, sans-serif" font-weight="700" font-size="92" fill="${FG}">${esc(name)}</text>
    <rect x="84" y="${h / 2 + 24}" width="56" height="4" rx="2" fill="url(#accent)"/>
    <text x="160" y="${h / 2 + 38}" font-family="monospace" font-size="30" letter-spacing="4" fill="${INDIGO2}">${esc(title.toUpperCase())}</text>
    <text x="80" y="${h - 56}" font-family="monospace" font-size="22" letter-spacing="3" fill="${MUTED}" fill-opacity="0.8">GENERATIVE · MULTIMODAL · AGENTIC</text>
  </svg>`;
}

const projects = [
  { slug: "ai-creation-studio", title: "AI Creation Studio", category: "Generation", featured: true },
  { slug: "moments-engine", title: "Moments Engine", category: "Generation", featured: false },
  { slug: "creator-recommender", title: "Creator Recommender", category: "AI Agents", featured: true },
  { slug: "audience-insights", title: "Audience Insights", category: "AI Agents", featured: false },
  { slug: "scale-architecture", title: "Scale Architecture", category: "Scaling", featured: false },
  { slug: "primepal", title: "PrimePal", category: "Education", featured: true },
  { slug: "enterprise-ai", title: "Enterprise AI", category: "AI Agents", featured: false },
];

const blogPosts = [
  { slug: "why-most-ai-mvps-fail", title: "Why Most AI MVPs Fail", category: "AI Strategy" },
  { slug: "multi-agent-vs-single-agent", title: "Multi-Agent vs Single Agent", category: "Building AI Products" },
];

async function emit(svg, outRel, kind) {
  const out = path.join(ROOT, "public", outRel);
  await mkdir(path.dirname(out), { recursive: true });
  const img = sharp(Buffer.from(svg));
  await (kind === "png" ? img.png() : img.webp({ quality: 82 })).toFile(out);
  console.log("✓", outRel);
}

async function main() {
  for (const p of projects) {
    await emit(
      titleCard(600, 400, { title: p.title, kicker: p.category, corner: "600×400 · placeholder" }),
      `images/projects/${p.slug}/card.webp`,
    );
    if (p.featured) {
      await emit(
        titleCard(1200, 700, { title: p.title, kicker: p.category, corner: "1200×700 · placeholder" }),
        `images/projects/${p.slug}/hero.webp`,
      );
    }
  }
  for (const b of blogPosts) {
    await emit(
      titleCard(1200, 630, { title: b.title, kicker: b.category, corner: "ARTICLE · placeholder" }),
      `images/blog/${b.slug}/cover.webp`,
    );
  }
  await emit(monogram(800, 800, { initials: "HS", sub: "Hasnain Sohail" }), "images/profile/headshot.webp");
  await emit(ogCard(1200, 630, { name: "HASNAIN SOHAIL", title: "AI Product Engineer" }), "images/profile/og-default.png", "png");
  console.log("\nAll placeholders generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
