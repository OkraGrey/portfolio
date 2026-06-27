import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getLatestPosts } from "@/lib/blog";

/**
 * Homepage blog preview — latest posts + "Read the Blog →". Renders nothing
 * when there are no posts. Async server component (reads content at build time).
 */
export async function BlogPreview() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <Section id="blog" padY="py-[clamp(40px,7vh,80px)]">
      <SectionHeading
        eyebrow="/ Writing"
        eyebrowColor="#ffc879"
        title="From the Blog"
      />
      <div className="grid gap-[clamp(16px,2vw,26px)] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
      <div className="mt-[clamp(28px,5vh,44px)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-[9px] rounded-full border border-white/25 px-6 py-3 text-[14px] font-semibold text-foreground no-underline transition-colors hover:border-amber/70 hover:bg-amber/[0.06] hover:text-amber-bright"
        >
          Read the Blog →
        </Link>
      </div>
    </Section>
  );
}
