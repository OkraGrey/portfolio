/**
 * Central site configuration — identity, hero, contact, and links.
 * Presentational components read from here so copy stays in one place.
 */
export const site = {
  name: "Hasnain Sohail",
  year: "2026",
  /** Short form for the hero meta rail. */
  location: "Lahore, PK",

  hero: {
    name: "HASNAIN SOHAIL",
    /** Rendered two-up in the hero (one word per line). */
    nameLines: ["HASNAIN", "SOHAIL"],
    taglines: [
      "I build AI products that ship.",
      "From zero to production in 30 days.",
      "Generative. Agentic. Multimodal.",
    ],
    description:
      "AI Product Engineer shipping production agentic, generative, and multimodal systems — from zero to live in under 30 days.",
    stats: [
      { value: "5+ Years", label: "Experience" },
      { value: "Fortune 500", label: "Clients" },
      { value: "30-Day", label: "MVPs" },
      { value: "Full Stack", label: "AI Delivery" },
    ],
    availability: "Available 2026",
  },

  contact: {
    headline: "Have an AI project? Let's talk.",
    subtext:
      "I respond within 24 hours. Tell me what you're building and I'll give you an honest assessment.",
    budgets: ["<$500", "$500-$2K", "$2K-$5K", "$5K+"],
  },

  links: {
    email: "hasnainsohail15@gmail.com",
    github: "https://github.com/OkraGrey",
    githubLabel: "github.com/OkraGrey",
    // TODO: confirm exact LinkedIn vanity URL.
    linkedin: "https://www.linkedin.com/in/hasnainsohail/",
    location: "Lahore, Pakistan",
  },
} as const;
