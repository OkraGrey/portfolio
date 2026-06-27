import { Hero } from "@/components/sections/Hero";
import { ExpertiseCarousel } from "@/components/sections/ExpertiseCarousel";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative cursor-crosshair text-foreground">
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
