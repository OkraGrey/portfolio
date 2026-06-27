/**
 * Prefix a /public asset path (e.g. "/images/...") with the deployment base
 * path so it resolves on a GitHub Pages project site (served from /portfolio).
 *
 * `next/image` with `unoptimized: true` does NOT apply the configured basePath
 * to the emitted <img> src, so image srcs must be wrapped with this. Call it
 * only from Server Components: it reads the build-time PAGES_BASE_PATH and the
 * resulting absolute string is baked into the static HTML (so the client never
 * has to recompute it). Absolute URLs and empty values pass through unchanged;
 * locally (no PAGES_BASE_PATH) it's a no-op.
 */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  const base = process.env.PAGES_BASE_PATH || "";
  return `${base}${path}`;
}
