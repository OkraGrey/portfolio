import type { ComponentPropsWithoutRef } from "react";

/**
 * Styled element map for MDX post bodies (passed to <MDXRemote components={...}>).
 * Plain module — no client boundary; these render inside the build-time RSC pass.
 * Uses only existing design tokens; mirrors the blog typographic scale in spec §E5.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 font-sans text-[clamp(22px,3vw,30px)] font-semibold text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-9 mb-3 font-sans text-[clamp(18px,2.2vw,22px)] font-medium text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 text-[17px] leading-[1.7] text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-[17px] leading-[1.7]" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-primary-bright underline underline-offset-4 hover:text-accent"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-primary/50 pl-5 italic text-bright"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[14px] text-primary-bright"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};
