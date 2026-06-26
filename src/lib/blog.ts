import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog data layer (server-only — uses node:fs).
 *
 * Posts are MDX files in content/blog/. Frontmatter is read with gray-matter
 * at build time; bodies are compiled by next-mdx-remote/rsc inside the post
 * Server Component during `next build`, producing fully static HTML.
 */

export type BlogCategory = "AI Strategy" | "Building AI Products" | "Case Studies";

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  category: BlogCategory;
  readingTime: string; // e.g. "6 min"
  description: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readDirSafe(): string[] {
  try {
    return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

/** All post frontmatter, newest first. */
export function getAllPostMeta(): PostMeta[] {
  return readDirSafe()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Latest N posts (for the homepage preview). */
export function getLatestPosts(n: number): PostMeta[] {
  return getAllPostMeta().slice(0, n);
}

/** Frontmatter + raw MDX body for a single post. */
export function getPostSource(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<PostMeta, "slug">) }, content };
}

/** Other posts (for the "More Posts" footer), newest first, excluding `slug`. */
export function getOtherPosts(slug: string, n: number): PostMeta[] {
  return getAllPostMeta()
    .filter((p) => p.slug !== slug)
    .slice(0, n);
}

/** Human-friendly date, e.g. "Jun 1, 2026". */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[(m ?? 1) - 1]} ${d}, ${y}`;
}
