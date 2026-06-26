import type { LucideIcon } from "lucide-react";
import { Workflow, Database, Rocket, Server, Plug, Layers } from "lucide-react";

/**
 * Expertise carousel cards. Each links to a representative case study so the
 * "what I do" framing connects straight to proof.
 */
export interface ExpertiseCard {
  title: string;
  oneLiner: string;
  icon: LucideIcon; // abstract icon, never an emoji
  projectSlug: string;
}

export const expertise: ExpertiseCard[] = [
  {
    title: "Multi-Agent Systems",
    oneLiner: "Orchestrating AI agents that reason, decide, and act together",
    icon: Workflow,
    projectSlug: "creator-recommender",
  },
  {
    title: "RAG Pipelines",
    oneLiner: "Knowledge retrieval systems that give AI real context",
    icon: Database,
    projectSlug: "primepal",
  },
  {
    title: "AI SaaS MVPs",
    oneLiner: "Zero to production AI products in under 30 days",
    icon: Rocket,
    projectSlug: "ai-creation-studio",
  },
  {
    title: "Scalable Architecture",
    oneLiner: "Building backends that hold 1000+ concurrent users",
    icon: Server,
    projectSlug: "scale-architecture",
  },
  {
    title: "LLM Integration",
    oneLiner: "Connecting GPT-4, Claude, Gemini to production applications",
    icon: Plug,
    projectSlug: "enterprise-ai",
  },
  {
    title: "Multimodal AI",
    oneLiner: "Vision, language, and generation in one pipeline",
    icon: Layers,
    projectSlug: "moments-engine",
  },
];
