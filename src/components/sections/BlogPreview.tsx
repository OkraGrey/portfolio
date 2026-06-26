import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getLatestPosts } from "@/lib/blog";

/**
 * Homepage blog preview — latest 3 posts + "Read the Blog →". Renders nothing
 * when there are no posts. Async server component (reads content at build time).
 */
export async function BlogPreview() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionHeading eyebrow="WRITING" title="From the Blog" />
      <div className="grid grid-cols-1 gap-[clamp(16px,2.4vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
      <div className="mt-[clamp(28px,5vh,48px)]">
        <Button variant="ghost" href="/blog">
          Read the Blog →
        </Button>
      </div>
    </Section>
  );
}
