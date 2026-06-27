import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { InstantMotion } from "@/components/motion/InstantMotion";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { blogAccent, chipStyle } from "@/lib/category";
import {
  getAllPostMeta,
  getOtherPosts,
  getPostSource,
  formatPostDate,
} from "@/lib/blog";
import { SITE_URL, ogImageUrl } from "@/lib/seo";

/** Enumerate every post at build time; reject unknown slugs (static export). */
export function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostSource(slug);
  const canonical = `${SITE_URL}/blog/${slug}/`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [ogImageUrl()],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl()],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: ReturnType<typeof getPostSource>;
  try {
    post = getPostSource(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;
  const shareUrl = `${SITE_URL}/blog/${slug}/`;
  const more = getOtherPosts(slug, 2);

  return (
    <InstantMotion>
      <Section className="pt-[clamp(96px,16vh,160px)]">
        <div className="mx-auto w-full max-w-[760px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.22] px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[#d2d8e4] no-underline transition-colors hover:border-white/40 hover:text-white"
        >
          ← All Posts
        </Link>

        <header className="mt-8 flex flex-col gap-5">
          <Reveal as="div" delay={0}>
            <span
              className="inline-flex self-start rounded-full px-[14px] py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"
              style={chipStyle(blogAccent(meta.category))}
            >
              {meta.category}
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={0.08}
            className="font-sans text-[clamp(30px,5.5vw,52px)] font-bold leading-[1.07] tracking-[-0.02em] text-bright"
          >
            {meta.title}
          </Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[12px] text-subtle">
              {formatPostDate(meta.date)} · {meta.readingTime}
            </p>
            <ShareButtons url={shareUrl} title={meta.title} />
          </div>
        </header>

        <div className="my-10 border-t border-line" />

        <article>
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {more.length > 0 && (
          <div className="mt-[clamp(48px,9vh,96px)]">
            <h2 className="mb-6 font-sans text-[clamp(20px,2.6vw,26px)] font-semibold text-foreground">
              More Posts
            </h2>
            <div className="grid grid-cols-1 gap-[clamp(16px,2.4vw,28px)] sm:grid-cols-2">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <BlogCard post={p} compact />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-[clamp(40px,7vh,72px)]">
          <Button variant="primary" href="/#contact">
            Want to build something like this? Let&apos;s talk →
          </Button>
        </div>
      </div>
      </Section>
    </InstantMotion>
  );
}
