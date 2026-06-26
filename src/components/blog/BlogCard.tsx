import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { formatPostDate, type PostMeta } from "@/lib/blog";

/**
 * Blog listing/preview card — cover, category, title, date · readingTime, excerpt.
 * Whole card links to the post. Server component (no interactivity of its own).
 */
export function BlogCard({ post }: { post: PostMeta }) {
  const { slug, title, category, date, readingTime, description } = post;
  return (
    <Card interactive href={`/blog/${slug}`} className="flex flex-col gap-4">
      <Image
        src={`/images/blog/${slug}/cover.webp`}
        width={1200}
        height={630}
        alt={title}
        className="aspect-[1200/630] h-auto w-full rounded-xl object-cover"
      />
      <div className="flex flex-col gap-3">
        <Pill variant="solid">{category}</Pill>
        <h3 className="font-sans text-[clamp(18px,2vw,21px)] font-medium text-foreground">
          {title}
        </h3>
        <p className="font-mono text-[12px] text-subtle">
          {formatPostDate(date)} · {readingTime}
        </p>
        <p className="text-[15px] text-muted line-clamp-2">{description}</p>
      </div>
    </Card>
  );
}
