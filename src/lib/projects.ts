/**
 * Projects — the single source of truth for the case-study template, the
 * filterable grid, the featured carousel, the expertise-card links, and the
 * sitemap. The case study layout is rigid, so projects are structured data
 * (not MDX). Add a project by appending an object; everything else updates.
 */

export type ProjectCategory =
  | "AI Agents"
  | "Generation"
  | "Scaling"
  | "Education";

export interface TechGroup {
  label: "AI / LLM" | "Backend" | "Frontend & DB" | "Infrastructure";
  items: string[];
}

export interface Project {
  slug: string;
  num: string; // "01".."07" — ordering + prev/next
  title: string;
  subtitle: string; // one line under the title on the case study
  category: ProjectCategory;
  featured: boolean; // the 3 featured projects
  cardDescription: string; // grid card one-liner
  cardTags: string[];
  headline: string; // featured carousel headline
  featuredOneLiner: string; // featured carousel sub copy
  problem: string[];
  approach: string[];
  results: string[];
  techStack: TechGroup[];
  /**
   * Public image paths (passed to next/image, which applies the base path).
   * `architecture` is intentionally omitted until real diagrams exist — the
   * case study renders a placeholder slot in the meantime.
   */
  image: { card: string; hero?: string };
}

export const projects: Project[] = [
  {
    slug: "ai-creation-studio",
    num: "01",
    title: "AI Creation Studio",
    subtitle:
      "Multi-modal AI generation pipeline — style to production imagery across every format.",
    category: "Generation",
    featured: true,
    cardDescription:
      "Built a multi-modal AI generation pipeline handling 473+ generations across flat, on-model, 3D, and video formats.",
    cardTags: ["Gemini", "Async", "FastAPI", "Next.js"],
    headline: "Multi-Modal AI Generation at Scale",
    featuredOneLiner:
      "Style selection → AI generation → editing → try-on → 3D/video. 473+ generations, 248 styles, 118 models.",
    problem: [
      "Creators and brands need a constant stream of product imagery, but most can't design — and the manual process is slow, expensive, and inconsistent across formats.",
      "Producing the same product as a flat image, an on-model shot, a 3D view, and a short video traditionally means four different tools, four workflows, and a lot of waiting.",
    ],
    approach: [
      "I built the engine that turns a style and a prompt into production-ready product imagery across every format. Users pick from 248 curated styles, the system generates with Gemini, then layers on editing, virtual try-on, 3D views, and video.",
      "To make it scale, generation runs as async batch jobs behind a thread-safe Gemini singleton, with chunked uploads so large assets never block the request path.",
    ],
    results: [
      "473+ generations served across flat, on-model, 3D, and video formats",
      "248 selectable styles and 118 models in the catalog",
      "1,695 images in the asset library",
      "Thread-safe Gemini singleton + chunked uploads for reliable scale",
    ],
    techStack: [
      { label: "AI / LLM", items: ["Gemini", "Multimodal Generation"] },
      { label: "Backend", items: ["FastAPI", "Python", "Async Batch"] },
      { label: "Frontend & DB", items: ["Next.js 14", "React"] },
      { label: "Infrastructure", items: ["Object Storage", "Chunked Uploads"] },
    ],
    image: {
      card: "/images/projects/ai-creation-studio/card.webp",
      hero: "/images/projects/ai-creation-studio/hero.webp",
    },
  },
  {
    slug: "moments-engine",
    num: "02",
    title: "Moments Engine",
    subtitle:
      "Turn YouTube and Instagram content into product ideas — automatically.",
    category: "Generation",
    featured: false,
    cardDescription:
      "Turn YouTube and Instagram content into product ideas — content analysis, engagement heatmaps, AI-powered ideation.",
    cardTags: ["YouTube API", "Whisper", "Apify", "Redis"],
    headline: "From Content to Product Ideas",
    featuredOneLiner:
      "Watches what audiences love and turns it into merch ideas automatically.",
    problem: [
      "Creators don't actually know which moments in their content resonate enough to become merchandise. Manual review is guesswork, and guesswork doesn't scale.",
      "The signal — what made an audience lean in — is buried in hours of video and thousands of engagement data points.",
    ],
    approach: [
      "I built a system that watches what audiences love and turns it into product ideas automatically. It ingests YouTube and Instagram content, transcribes it (with a Whisper fallback), and builds engagement heatmaps to surface the top moments.",
      "Those moments flow into AI-powered merch ideation and hand off cleanly to the Creation Studio. The pipeline is cache-first with TTLs and multi-source fallback chains so a single flaky API never breaks a run.",
    ],
    results: [
      "45 videos processed, 115 moments extracted",
      "45 generated idea sets handed to the Creation Studio",
      "Cache-first architecture with TTL cleanup",
      "Multi-source fallback chains for resilient ingestion",
    ],
    techStack: [
      { label: "AI / LLM", items: ["Whisper", "LLM Ideation"] },
      { label: "Backend", items: ["YouTube API", "Apify", "Python"] },
      { label: "Frontend & DB", items: ["Next.js", "React"] },
      { label: "Infrastructure", items: ["Redis", "TTL Caching"] },
    ],
    image: { card: "/images/projects/moments-engine/card.webp" },
  },
  {
    slug: "creator-recommender",
    num: "03",
    title: "Creator Recommender",
    subtitle:
      "Give it a social handle — it understands a creator's brand in minutes.",
    category: "AI Agents",
    featured: true,
    cardDescription:
      "LangGraph agent that scrapes a creator's social presence, analyzes their brand, and recommends matching styles.",
    cardTags: ["LangGraph", "LLM Agents", "Taxonomy"],
    headline: "AI That Understands Your Brand",
    featuredOneLiner:
      "Give it a social handle — it analyzes the brand and recommends matching styles in minutes.",
    problem: [
      "New creators face a cold-start problem: they don't know which visual styles match their brand, so they freeze at exactly the moment they should be creating.",
      "Matching a brand to a style catalog by hand is subjective, slow, and doesn't scale across thousands of creators.",
    ],
    approach: [
      "I built a LangGraph agent that does it in minutes. Give it a social handle and it scrapes the creator's presence, derives a brand identity, and maps that onto a 91-style taxonomy.",
      "The output is a ranked set of recommendations — each with reasoning, so the creator understands why a style fits, not just that it does. The agent is configurable and ships with a testing harness.",
    ],
    results: [
      "10 ranked recommendations per creator, each with reasoning",
      "91-style taxonomy for precise brand-to-style mapping",
      "Configurable agent graph",
      "Dedicated testing harness for evaluation",
    ],
    techStack: [
      { label: "AI / LLM", items: ["LangGraph", "LLM Agents", "RAG"] },
      { label: "Backend", items: ["Python", "Web Scraping"] },
      { label: "Frontend & DB", items: ["Next.js", "React"] },
      { label: "Infrastructure", items: ["Testing Harness"] },
    ],
    image: {
      card: "/images/projects/creator-recommender/card.webp",
      hero: "/images/projects/creator-recommender/hero.webp",
    },
  },
  {
    slug: "audience-insights",
    num: "04",
    title: "Audience Insights",
    subtitle:
      "Real-time audience intelligence, streamed to your screen — at $0.10 per post.",
    category: "AI Agents",
    featured: false,
    cardDescription:
      "Real-time comment analysis for YouTube and Instagram with streaming results — at $0.10 per post.",
    cardTags: ["SSE", "Streaming", "Apify", "Bento UI"],
    headline: "Real-Time Audience Intelligence",
    featuredOneLiner:
      "Streamed to your screen as the AI reads thousands of comments.",
    problem: [
      "Understanding what an audience is actually saying — at the scale of thousands of comments — is expensive and slow with traditional analysis.",
      "By the time a manual report lands, the moment has passed and the insight is stale.",
    ],
    approach: [
      "I built real-time audience intelligence that streams to your screen as the AI reads. It fetches YouTube and Instagram comments, extracts themes, sentiment, and buying signals, then streams results live to the UI over SSE.",
      "The 'Mission Control' bento grid renders progressively, so users watch insight accumulate instead of staring at a spinner — and it runs at a fraction of the cost of manual analysis.",
    ],
    results: [
      "Live for both YouTube and Instagram",
      "$0.10–$0.38 per post analyzed",
      "Progressive SSE rendering — insight appears as it's found",
      "'Mission Control' bento-grid interface",
    ],
    techStack: [
      { label: "AI / LLM", items: ["LLM Analysis", "Sentiment & Themes"] },
      { label: "Backend", items: ["SSE Streaming", "Apify", "Python"] },
      { label: "Frontend & DB", items: ["Next.js", "Bento UI"] },
      { label: "Infrastructure", items: ["Cost Metering"] },
    ],
    image: { card: "/images/projects/audience-insights/card.webp" },
  },
  {
    slug: "scale-architecture",
    num: "05",
    title: "Scale Architecture",
    subtitle:
      "I took a demo and turned it into infrastructure that holds 1000+ users.",
    category: "Scaling",
    featured: false,
    cardDescription:
      "Took a feature-rich demo to 1000+ concurrent users — async everywhere, job queues, cost metering, 14 security audits.",
    cardTags: ["SAQ", "Redis", "Prometheus", "k6"],
    headline: "From Demo to 1000+ Concurrent Users",
    featuredOneLiner:
      "Async everywhere, job queues, cost metering, and observability.",
    problem: [
      "The platform was feature-rich but built like a demo. Under real load it timed out, blocked the event loop, and gave zero visibility into what was failing.",
      "There was no path from 'it works when I click it' to 'it works for a thousand people at once.'",
    ],
    approach: [
      "I scaled it in four phases. First, I unblocked the event loop — moving 172 blocking calls onto asyncio.to_thread. Second, I introduced a SAQ + Redis job queue. Third, I made generation fully async across 7 endpoints and 12 routes. Fourth, I added Prometheus and Grafana observability.",
      "Cost metering and 14 security audits made it safe to run, and k6 load testing proved it held.",
    ],
    results: [
      "1000+ concurrent users supported",
      "24 worker tasks across 23 job types",
      "172 blocking calls moved off the event loop",
      "14 security audits; k6 load tested end-to-end",
    ],
    techStack: [
      { label: "AI / LLM", items: ["Async Generation"] },
      { label: "Backend", items: ["FastAPI", "SAQ", "asyncio", "Python"] },
      { label: "Frontend & DB", items: ["Next.js"] },
      { label: "Infrastructure", items: ["Redis", "Prometheus", "Grafana", "k6"] },
    ],
    image: { card: "/images/projects/scale-architecture/card.webp" },
  },
  {
    slug: "primepal",
    num: "06",
    title: "PrimePal",
    subtitle:
      "AI tutoring that works in a real classroom — tested with students in rural Pakistan.",
    category: "Education",
    featured: true,
    cardDescription:
      "3-agent AI tutor (Curriculum Guardrail + Tutor + Evaluator) deployed for 50+ students at a Pakistani primary school.",
    cardTags: ["Multi-Agent", "RAG", "Supabase", "pgvector"],
    headline: "AI Tutor for 50+ Pakistani Students",
    featuredOneLiner:
      "Three-agent architecture teaching English to primary school students in rural Pakistan.",
    problem: [
      "Primary school students in rural Pakistan lack access to quality English tutoring. The gap isn't motivation — it's that one teacher can't give fifty children individual attention.",
      "Generic chatbots fail here: they go off-curriculum, give age-inappropriate answers, and can't tell whether a child actually learned anything.",
    ],
    approach: [
      "I built AI tutoring that actually works in a classroom, using three coordinated agents. A Curriculum Guardrail keeps every interaction on-syllabus and age-appropriate, a Tutor agent teaches, and an Evaluator measures whether the student understood.",
      "It runs on Next.js 14, FastAPI, and Supabase with pgvector for curriculum-aware retrieval — and it was tested in a real two-week field study, not just a lab.",
    ],
    results: [
      "Deployed for 50+ students at The Savior School, Pattoki",
      "Two-week in-classroom field study",
      "Three-agent design: Curriculum Guardrail + Tutor + Evaluator",
      "Curriculum-aware RAG over pgvector",
    ],
    techStack: [
      { label: "AI / LLM", items: ["Multi-Agent", "RAG", "LLMs"] },
      { label: "Backend", items: ["FastAPI", "Python"] },
      { label: "Frontend & DB", items: ["Next.js 14", "Supabase", "pgvector"] },
      { label: "Infrastructure", items: ["Field Deployment"] },
    ],
    image: {
      card: "/images/projects/primepal/card.webp",
      hero: "/images/projects/primepal/hero.webp",
    },
  },
  {
    slug: "enterprise-ai",
    num: "07",
    title: "Enterprise AI",
    subtitle:
      "Led AI teams building production systems for the biggest names in tech.",
    category: "AI Agents",
    featured: false,
    cardDescription:
      "Led LLM teams at Turing on Meta and Apple projects — enterprise-grade AI systems for Fortune 500 clients.",
    cardTags: ["LLMs", "Team Lead", "Enterprise"],
    headline: "Enterprise-Grade AI for Fortune 500",
    featuredOneLiner: "Led LLM teams at Turing on Meta and Apple projects.",
    problem: [
      "Fortune 500 companies don't need a clever demo — they need production-grade LLM systems that meet enterprise bars for quality, security, and process.",
      "At that scale the hard part isn't the model; it's the rigor around it.",
    ],
    approach: [
      "I led LLM teams at Turing on projects for Meta and Apple, holding the work to enterprise-level quality and process from data to delivery.",
      "Specifics are under NDA — but the credibility comes from the names and the standard the work was held to.",
    ],
    results: [
      "Led LLM teams on Meta and Apple projects",
      "Delivered enterprise-grade systems for Fortune 500 clients",
      "Production-level quality, security, and process",
      "Team leadership across the LLM lifecycle",
    ],
    techStack: [
      { label: "AI / LLM", items: ["LLMs", "Production AI"] },
      { label: "Backend", items: ["Enterprise Pipelines"] },
      { label: "Infrastructure", items: ["Enterprise Process"] },
    ],
    image: { card: "/images/projects/enterprise-ai/card.webp" },
  },
];

/** True when a project's architecture diagram is withheld (NDA). */
export const hasNdaArchitecture = (slug: string) => slug === "enterprise-ai";

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getAdjacent = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
};

export const featuredProjects = projects.filter((p) => p.featured);

export const categories: ("All" | ProjectCategory)[] = [
  "All",
  "AI Agents",
  "Generation",
  "Scaling",
  "Education",
];
