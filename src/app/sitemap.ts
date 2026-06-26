import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { getAllPostMeta } from "@/lib/blog";

// Emitted as a static sitemap.xml at build time (output: 'export'). URLs carry
// the /portfolio base path because it lives in SITE_URL.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/blog",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...getAllPostMeta().map((p) => `/blog/${p.slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
