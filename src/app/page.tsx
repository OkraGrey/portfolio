import { GenerativeField } from "@/components/canvas/GenerativeField";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SelectedSystems } from "@/components/sections/SelectedSystems";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen cursor-crosshair bg-ink text-foreground">
      <GenerativeField />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <SelectedSystems />
        <Contact />
      </main>
    </div>
  );
}
