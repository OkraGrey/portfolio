import { GenerativeField } from "@/components/canvas/GenerativeField";
import { Hero } from "@/components/sections/Hero";
import { ExpertiseCarousel } from "@/components/sections/ExpertiseCarousel";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative cursor-crosshair bg-ink text-foreground">
      {/* Generative denoising field — homepage background only */}
      <GenerativeField />
      <Hero />
      <ExpertiseCarousel />
      <FeaturedProjects />
      <ProjectGrid />
      <BlogPreview />
      <About />
      <Contact />
    </div>
  );
}
