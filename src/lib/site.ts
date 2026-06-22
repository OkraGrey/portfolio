/**
 * Central site configuration — single source of truth for identity,
 * contact channels, and the hero eyebrow. Keeps copy out of components.
 */
export const site = {
  name: "Hasnain Sohail",
  eyebrow: ["GENERATIVE", "MULTIMODAL", "AGENTIC"] as const,
  location: "LAHORE, PK",
  org: "nutsandbolts.ai",
  year: "2026",
  tagline: {
    lead: "I build intelligence from",
    emphasis1: "first principles",
    mid: "— diffusion, alignment, multimodal — and ship it to",
    emphasis2: "production",
    trail: ".",
  },
  links: {
    email: "hasnainsohail15@gmail.com",
    github: "https://github.com/OkraGrey",
    githubLabel: "github.com/OkraGrey",
    fiverr: "https://www.fiverr.com/s/38Dk78k",
  },
} as const;
