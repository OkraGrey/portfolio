import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { InstantMotion } from "@/components/motion/InstantMotion";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPostMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on AI strategy and building AI products — shipping MVPs, multi-agent architecture, and the gap between a demo and production.",
  alternates: { canonical: `${SITE_URL}/blog/` },
};

/** Blog listing — responsive grid of all posts, newest first. */
export default function BlogPage() {
  const posts = getAllPostMeta();
  return (
    <InstantMotion>
      <Section id="blog" className="pt-[clamp(96px,16vh,160px)]">
        <div className="mb-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.22] px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[#d2d8e4] no-underline transition-colors hover:border-white/40 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
        <SectionHeading
          as="h1"
          eyebrow="/ Writing"
          eyebrowColor="#ffc879"
          title="Blog"
          titleClassName="text-[clamp(36px,6vw,64px)]"
        />
        <div className="grid gap-[clamp(16px,2vw,26px)] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </InstantMotion>
  );
}
