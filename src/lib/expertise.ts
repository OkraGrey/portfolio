import type { LucideIcon } from "lucide-react";
import { Workflow, Database, Rocket, Server, Plug, Layers } from "lucide-react";
import type { Accent } from "@/lib/category";

/**
 * Expertise grid cards — "What I Build". Each links to a representative case
 * study so the framing connects straight to proof. Accents cycle through the
 * four-accent system, matching the design.
 */
export interface ExpertiseCard {
  title: string;
  oneLiner: string;
  icon: LucideIcon; // abstract icon, never an emoji
  projectSlug: string;
  accent: Accent;
}

export const expertise: ExpertiseCard[] = [
  {
    title: "Multi-Agent Systems",
    oneLiner: "Orchestrating AI agents that reason, decide, and act together.",
    icon: Workflow,
    projectSlug: "creator-recommender",
    accent: "indigo",
  },
  {
    title: "RAG Pipelines",
    oneLiner: "Knowledge retrieval systems that give AI real context.",
    icon: Database,
    projectSlug: "primepal",
    accent: "emerald",
  },
  {
    title: "AI SaaS MVPs",
    oneLiner: "Zero to production AI products in under 30 days.",
    icon: Rocket,
    projectSlug: "ai-creation-studio",
    accent: "pink",
  },
  {
    title: "Scalable Architecture",
    oneLiner: "Backends that hold 1000+ concurrent users.",
    icon: Server,
    projectSlug: "scale-architecture",
    accent: "amber",
  },
  {
    title: "LLM Integration",
    oneLiner: "Connecting GPT-4, Claude, and Gemini to production apps.",
    icon: Plug,
    projectSlug: "enterprise-ai",
    accent: "indigo",
  },
  {
    title: "Multimodal AI",
    oneLiner: "Vision, language, and generation in one pipeline.",
    icon: Layers,
    projectSlug: "moments-engine",
    accent: "emerald",
  },
];
