/**
 * "Selected Systems" — the curated front-page list.
 *
 * `slug` lets each entry grow into a detail page/case study later
 * (a full portfolio is on the roadmap), so the landing list and any
 * future routes share one data source.
 */
export interface System {
  num: string;
  title: string;
  tag: string;
  slug: string;
}

export const systems: System[] = [
  {
    num: "01",
    title: "Diffusion models",
    tag: "DDPM · DDIM · FROM SCRATCH",
    slug: "diffusion-models",
  },
  {
    num: "02",
    title: "LLM alignment",
    tag: "RLHF · DPO · GRPO · RLVR",
    slug: "llm-alignment",
  },
  {
    num: "03",
    title: "Vision-language",
    tag: "CLIP · VQ-VAE · MULTIMODAL",
    slug: "vision-language",
  },
  {
    num: "04",
    title: "Agentic systems",
    tag: "TOOLS · REFLECTION · DAGS",
    slug: "agentic-systems",
  },
];
