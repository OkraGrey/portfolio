import { hash2, valueNoise } from "@/lib/noise";

/**
 * GenerativeFieldEngine
 *
 * A self-contained particle field that visualises "denoising": particles
 * begin as pure noise and settle into an organic lattice over ~2.6s, kept
 * alive by a flow field, a breathing shimmer, and a re-diffusion wave that
 * sweeps across every ~9s. The cursor repels and re-noises nearby points.
 *
 * The class owns its own RAF loop and DOM listeners. Call `start()` after
 * construction and `destroy()` on teardown — both are idempotent-safe.
 */

interface Particle {
  /** Organic "home" position (warped lattice). */
  hx: number;
  hy: number;
  /** Live position + velocity. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Lattice indices, for neighbour filaments. */
  ci: number;
  ri: number;
  /** Shimmer phase + speed. */
  tw: number;
  tws: number;
  /** Derived per frame: speed + local settle amount. */
  spd: number;
  set: number;
}

export interface FieldOptions {
  /** When true, render a single static settled frame and skip interaction. */
  reducedMotion?: boolean;
}

const FLOW = 0.1;
const SETTLE_DELAY = 0.15; // seconds before denoise begins
const SETTLE_DURATION = 2.6; // seconds to fully settle
const WAVE_PERIOD = 9.0; // seconds between re-diffusion sweeps
const WAVE_WIDTH = 130; // px half-band of the sweep
const DOWN_MS = 650; // how long a click keeps the field agitated

export class GenerativeFieldEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly reduced: boolean;

  private W = 0;
  private H = 0;
  private dpr = 1;
  private cols = 0;
  private rows = 0;
  private gap = 40;

  private particles: Particle[] = [];
  private sprites: HTMLCanvasElement[] = [];
  private readonly mouse = { x: -1e4, y: -1e4, down: 0 };

  private raf = 0;
  private startTime: number | null = null;
  private downTimer: ReturnType<typeof setTimeout> | null = null;

  // Bound handlers kept as fields so they can be removed on destroy.
  private readonly onResize = () => this.build();
  private readonly onMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };
  private readonly onDown = () => {
    this.mouse.down = 1;
    if (this.downTimer) clearTimeout(this.downTimer);
    this.downTimer = setTimeout(() => {
      this.mouse.down = 0;
    }, DOWN_MS);
  };

  constructor(canvas: HTMLCanvasElement, options: FieldOptions = {}) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");
    this.canvas = canvas;
    this.ctx = ctx;
    this.reduced = options.reducedMotion ?? false;

    this.sprites = [
      this.makeGlow("rgb(150,176,255)"), // cool / settled
      this.makeGlow("rgb(232,238,255)"), // bright / mid
      this.makeGlow("rgb(255,158,205)"), // warm / agitated
    ];
  }

  start(): void {
    this.build();
    window.addEventListener("resize", this.onResize);

    if (this.reduced) {
      // One static, fully-settled frame; no loop, no interaction.
      this.draw(performance.now());
      return;
    }

    window.addEventListener("mousemove", this.onMove, { passive: true });
    window.addEventListener("mousedown", this.onDown);

    // Paint one synchronous frame so there is never an empty canvas.
    try {
      this.draw(performance.now());
    } catch {
      /* noop — first frame is best-effort */
    }
    this.raf = requestAnimationFrame(this.loop);
  }

  destroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.downTimer) clearTimeout(this.downTimer);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mousedown", this.onDown);
  }

  // --- glow sprite (radial gradient baked once into an offscreen canvas) ---
  private makeGlow(color: string): HTMLCanvasElement {
    const s = 26;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grd.addColorStop(0, color);
    grd.addColorStop(0.4, color.replace("rgb", "rgba").replace(")", ",0.55)"));
    grd.addColorStop(1, color.replace("rgb", "rgba").replace(")", ",0)"));
    g.fillStyle = grd;
    g.fillRect(0, 0, s, s);
    return c;
  }

  private idx(c: number, r: number): number {
    return c >= 0 && c < this.cols && r >= 0 && r < this.rows
      ? r * this.cols + c
      : -1;
  }

  private build(): void {
    const { canvas, ctx } = this;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = canvas.clientWidth;
    this.H = canvas.clientHeight;
    canvas.width = Math.floor(this.W * this.dpr);
    canvas.height = Math.floor(this.H * this.dpr);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.gap = this.W < 640 ? 30 : 40;
    this.cols = Math.ceil(this.W / this.gap) + 2;
    this.rows = Math.ceil(this.H / this.gap) + 2;
    const offX = (this.W - (this.cols - 1) * this.gap) / 2;
    const offY = (this.H - (this.rows - 1) * this.gap) / 2;

    const particles: Particle[] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // Organic lattice: warp the grid home positions with low-freq noise.
        const hx =
          offX + c * this.gap + (valueNoise(c * 0.18, r * 0.18) - 0.5) * this.gap * 1.1;
        const hy =
          offY +
          r * this.gap +
          (valueNoise(c * 0.18 + 50, r * 0.18 + 50) - 0.5) * this.gap * 1.1;
        particles.push({
          hx,
          hy,
          // Reduced motion: start at home so a single frame reads as settled.
          x: this.reduced ? hx : Math.random() * this.W,
          y: this.reduced ? hy : Math.random() * this.H,
          vx: 0,
          vy: 0,
          ci: c,
          ri: r,
          tw: hash2(c, r) * Math.PI * 2,
          tws: 0.6 + hash2(r, c) * 0.9,
          spd: 0,
          set: this.reduced ? 1 : 0,
        });
      }
    }
    this.particles = particles;
  }

  private readonly loop = (now: number) => {
    this.draw(now);
    this.raf = requestAnimationFrame(this.loop);
  };

  private draw(now: number): void {
    const { ctx, particles, sprites } = this;

    if (this.startTime == null) this.startTime = now;
    const elapsed = (now - this.startTime) / 1000;

    // Global denoise 0 (pure noise) -> 1 (settled lattice), smoothstepped.
    const settle = this.reduced
      ? 1
      : Math.min(1, Math.max(0, (elapsed - SETTLE_DELAY) / SETTLE_DURATION));
    const settleE = settle * settle * (3 - 2 * settle);
    const t = elapsed;

    // Re-diffusion wave sweeping across x.
    const wavePhase = (t % WAVE_PERIOD) / WAVE_PERIOD;
    const waveX = wavePhase * (this.W + 300) - 150;

    ctx.clearRect(0, 0, this.W, this.H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1;

    // --- integrate particle motion ---
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Flow-field advection keeps the field alive even when settled.
      const ang = valueNoise(p.x * 0.0016, p.y * 0.0016 + t * 0.05) * Math.PI * 4;
      let ax = Math.cos(ang) * FLOW;
      let ay = Math.sin(ang) * FLOW;

      // Local re-diffusion from the sweeping wave.
      const wd = Math.abs(p.hx - waveX);
      const wave = wd < WAVE_WIDTH ? 1 - wd / WAVE_WIDTH : 0;
      const localSettle = this.reduced ? 1 : settleE * (1 - wave * 0.92);

      // Pull toward organic home, scaled by how settled we are.
      ax += (p.hx - p.x) * 0.012 * localSettle;
      ay += (p.hy - p.y) * 0.012 * localSettle;

      // Breathing shimmer around home.
      p.tw += 0.02 * p.tws;
      const br = 1 - localSettle * 0.7;
      ax += Math.cos(p.tw) * 0.18 * br;
      ay += Math.sin(p.tw * 1.1) * 0.18 * br;

      // Cursor turbulence — repel + scatter (re-noise).
      if (!this.reduced) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const d2 = dx * dx + dy * dy;
        const R = this.mouse.down ? 230 : 150;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = 1 - d / R;
          const push = (this.mouse.down ? 3.2 : 1.7) * f;
          ax += (dx / d) * push;
          ay += (dy / d) * push;
          p.tw += f * 0.5;
        }
      }

      p.vx = (p.vx + ax) * 0.86;
      p.vy = (p.vy + ay) * 0.86;
      p.x += p.vx;
      p.y += p.vy;

      p.spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      p.set = localSettle;
    }

    // --- filaments to right & down neighbours (settled lattice glows) ---
    ctx.strokeStyle = "rgba(120,140,235,0.5)";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.set < 0.25) continue;
      const nR = this.idx(p.ci + 1, p.ri);
      const nD = this.idx(p.ci, p.ri + 1);
      for (const ni of [nR, nD]) {
        if (ni < 0) continue;
        const q = particles[ni];
        const lx = p.x - q.x;
        const ly = p.y - q.y;
        const ld = Math.sqrt(lx * lx + ly * ly);
        const maxd = this.gap * 2.1;
        if (ld < maxd) {
          const a = (1 - ld / maxd) * Math.min(p.set, q.set) * 0.5;
          if (a > 0.015) {
            ctx.globalAlpha = a;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    }
    ctx.globalAlpha = 1;

    // --- glow points ---
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const agit = Math.min(1, p.spd / 3); // agitation 0..1
      const spr = agit > 0.5 ? sprites[2] : agit > 0.18 ? sprites[1] : sprites[0];
      const size = 5 + agit * 9 + p.set * 2;
      const a = 0.3 + agit * 0.5 + p.set * 0.35;
      ctx.globalAlpha = Math.min(1, a);
      ctx.drawImage(spr, p.x - size / 2, p.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
