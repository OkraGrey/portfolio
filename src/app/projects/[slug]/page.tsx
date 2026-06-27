/**
 * Case study route — one statically-exported page per project. All slugs are
 * enumerated at build time; unknown slugs 404 (`dynamicParams = false`). The
 * generative background lives on the homepage only; sub-pages render on the
 * plain ink background, so this route just sits content at z-[2].
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/CaseStudy";
import { InstantMotion } from "@/components/motion/InstantMotion";
import { getProject, projects } from "@/lib/projects";
import { SITE_URL, ogImageUrl } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.cardDescription,
    openGraph: {
      title: project.title,
      description: project.cardDescription,
      images: [ogImageUrl()],
    },
    alternates: { canonical: `${SITE_URL}/projects/${slug}/` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <InstantMotion>
      <main className="relative z-[2] px-[clamp(20px,5vw,40px)] pb-[80px] pt-[clamp(96px,13vh,120px)]">
        <div className="mx-auto w-full max-w-[820px]">
          <CaseStudy project={project} />
        </div>
      </main>
    </InstantMotion>
  );
}
