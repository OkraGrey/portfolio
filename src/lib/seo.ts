import type { Metadata } from "next";

/**
 * SEO single source of truth.
 *
 * The site is served from a GitHub Pages project path, so the public origin
 * INCLUDES the `/portfolio` base path. `SITE_URL` therefore carries it, and
 * every absolute URL (OG image, sitemap, canonical, share links) is built
 * from `SITE_URL`. Internal navigation uses next/link / next/image, which
 * apply the base path automatically — do not hand-prefix those.
 */
export const SITE_URL = "https://okragrey.github.io/portfolio";

/** Absolute URL to the static social-share image (1200×630). */
export const ogImageUrl = () => `${SITE_URL}/images/profile/og-default.png`;

/**
 * Prefix a /public asset path with the deployment base path. Only needed for
 * raw <a>/<img> usage at build time — prefer next/link & next/image, which
 * already handle this. Returns the input unchanged in local dev.
 */
export const withBasePath = (path: string) =>
  `${process.env.PAGES_BASE_PATH || ""}${path}`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hasnain Sohail — AI Product Engineer",
    template: "%s — Hasnain Sohail",
  },
  description:
    "AI Product Engineer. I build AI products that ship — multi-agent systems, RAG pipelines, and full-stack AI applications, from zero to production in under 30 days.",
  keywords: [
    "AI Product Engineer",
    "Multi-Agent Systems",
    "RAG",
    "LLM",
    "Next.js",
    "FastAPI",
    "Hasnain Sohail",
  ],
  authors: [{ name: "Hasnain Sohail" }],
  openGraph: {
    type: "website",
    siteName: "Hasnain Sohail",
    title: "Hasnain Sohail — AI Product Engineer",
    description:
      "I build AI products that ship. Multi-agent systems, RAG pipelines, and full-stack AI — from zero to production in under 30 days.",
    url: SITE_URL,
    images: [{ url: ogImageUrl(), width: 1200, height: 630, alt: "Hasnain Sohail — AI Product Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasnain Sohail — AI Product Engineer",
    description:
      "I build AI products that ship. Multi-agent systems, RAG pipelines, and full-stack AI.",
    images: [ogImageUrl()],
  },
  robots: { index: true, follow: true },
};
