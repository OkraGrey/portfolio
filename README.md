# Hasnain Sohail — Portfolio

A dark, generative-AI–themed portfolio. The signature element is a canvas
"denoising field" — particles begin as noise and settle into an organic
lattice, react to the cursor, and are swept by a periodic re-diffusion wave.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
[`motion`](https://motion.dev) for entrance/scroll animation.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Architecture

```
src/
├─ app/
│  ├─ layout.tsx          # fonts (Sora + JetBrains Mono), metadata, html shell
│  ├─ page.tsx            # composes the landing page
│  └─ globals.css         # Tailwind v4 @theme design tokens + base styles
├─ lib/
│  ├─ site.ts             # identity, contact links, hero copy (single source)
│  ├─ projects.ts         # "Selected Systems" data (slugged for future detail pages)
│  └─ noise.ts            # pure 2D value-noise helpers
└─ components/
   ├─ canvas/
   │  ├─ field-engine.ts      # framework-agnostic particle-field engine (RAF + input)
   │  └─ GenerativeField.tsx  # client wrapper: mounts the engine + vignette layers
   ├─ motion/
   │  └─ Reveal.tsx           # the "denoise" entrance primitive (blur + lift + fade)
   ├─ layout/
   │  └─ Navbar.tsx           # fixed nav, frosts on scroll
   └─ sections/
      ├─ Hero.tsx
      ├─ SelectedSystems.tsx
      └─ Contact.tsx
```

### Conventions

- **Content lives in `lib/`, not components.** Copy and data are centralised so
  sections stay presentational and the site is easy to extend.
- **Animation is declarative** via the `Reveal` primitive; the one piece of
  imperative animation (the canvas) is isolated in `field-engine.ts` as a plain
  class with `start()` / `destroy()`, independent of React.
- **Accessibility:** every animation honours `prefers-reduced-motion` — the
  field renders a single static settled frame and entrances resolve instantly.
- **Design tokens** (colours, fonts) are defined once in `globals.css` under
  `@theme` and consumed as Tailwind utilities (`text-primary`, `bg-ink`, …).
