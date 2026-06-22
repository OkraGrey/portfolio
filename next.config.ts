import type { NextConfig } from "next";

/**
 * The site is fully static, so we export it to plain HTML for GitHub Pages.
 *
 * On GitHub Pages project sites the app is served from `/<repo>`, so the CI
 * build sets PAGES_BASE_PATH=/portfolio. Locally (and on a custom domain at
 * the root) it's empty, so dev and root-domain hosting need no path prefix.
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Static export has no Image Optimization server.
  images: { unoptimized: true },
  // Emit `route/index.html` so static hosts resolve clean URLs reliably.
  trailingSlash: true,
};

export default nextConfig;
