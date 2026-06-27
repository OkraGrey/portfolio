import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { blogAccent, chipStyle } from "@/lib/category";
import { cn } from "@/lib/cn";
import { formatPostDate, type PostMeta } from "@/lib/blog";

/**
 * Blog listing/preview card — cover, accent category chip, title,
 * date · readingTime, excerpt. The whole card links to the post. `compact`
 * is the smaller "More Posts" variant (tighter padding, no date/meta line).
 */
export function BlogCard({
  post,
  compact = false,
}: {
  post: PostMeta;
  compact?: boolean;
}) {
  const { slug, title, category, date, readingTime, description } = post;
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-surface no-underline transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-[5px] hover:border-white/[0.22] hover:shadow-[0_28px_55px_-28px_rgba(0,0,0,0.9)]"
    >
      <Image
        src={asset(`/images/blog/${slug}/cover.webp`)}
        width={1200}
        height={630}
        alt=""
        className="aspect-[1200/630] h-auto w-full border-b border-white/[0.06] object-cover"
      />
      <div
        className={cn(
          "flex flex-1 flex-col",
          compact ? "gap-2.5 p-5" : "gap-[11px] p-[22px]",
        )}
      >
        <span
          className="inline-flex self-start rounded-full px-3 py-[5px] font-mono text-[10.5px] uppercase tracking-[0.1em]"
          style={chipStyle(blogAccent(category))}
        >
          {category}
        </span>
        <h3
          className={cn(
            "m-0 font-sans font-semibold tracking-[-0.01em] text-[#f3f5fb]",
            compact ? "text-[18px]" : "text-[19px]",
          )}
        >
          {title}
        </h3>
        {!compact && (
          <p className="m-0 font-mono text-[12px] text-subtle">
            {formatPostDate(date)} · {readingTime}
          </p>
        )}
        <p
          className={cn(
            "m-0 leading-[1.55] text-muted-2",
            compact ? "text-[14px]" : "text-[14.5px]",
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
