import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
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
    <Section id="blog" className="pt-[clamp(96px,16vh,160px)]">
      <SectionHeading eyebrow="WRITING" title="Blog" />
      <div className="grid grid-cols-1 gap-[clamp(16px,2.4vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
