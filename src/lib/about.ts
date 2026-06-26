/**
 * About / credentials data — bio, credentials, grouped tech stack, and the
 * "why work with me" value props. Pure content consumed by the About section.
 */
export const about = {
  name: "Hasnain Sohail",
  title: "AI Product Engineer",
  photo: "/images/profile/headshot.webp",
  bio: "I'm an AI Product Engineer with a Master's in AI from LUMS and 5+ years of experience building production AI systems. I've led LLM teams at Turing on projects for Meta and Apple, and I've shipped AI SaaS products from zero to production in under 30 days. I specialize in multi-agent systems, RAG pipelines, and full-stack AI applications. I build intelligence — and I ship it.",
  credentials: [
    "MS Artificial Intelligence — LUMS",
    "LLM Lead — Turing (Meta, Apple projects)",
    "AI Product Engineer — 5+ years",
  ],
  techStackGroups: [
    {
      label: "AI / LLM",
      items: ["Claude", "GPT-4", "Gemini", "LangChain", "LangGraph", "RAG", "Pinecone", "ChromaDB"],
    },
    {
      label: "Backend",
      items: ["FastAPI", "Python", "REST APIs", "WebSockets", "Redis", "SAQ"],
    },
    {
      label: "Frontend & DB",
      items: ["Next.js 14", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "pgvector"],
    },
    {
      label: "Infrastructure",
      items: ["Vercel", "Docker", "Prometheus", "Grafana"],
    },
  ],
  whyCards: [
    {
      title: "Ships Fast",
      copy: "AI products from zero to production in under 30 days. No endless back-and-forth — just results.",
    },
    {
      title: "Enterprise-Proven",
      copy: "Built AI systems for Fortune 500 companies. I know the difference between a demo and production code.",
    },
    {
      title: "Full Stack, Not Just AI",
      copy: "Frontend, backend, database, auth, deployment. The complete product, not just the AI layer.",
    },
    {
      title: "Clean Handoff",
      copy: "Every project: clean code, full documentation, walkthrough. You own it completely.",
    },
  ],
} as const;
