/**
 * Cheap, dependency-free 2D value noise.
 *
 * Used by the generative field to warp the lattice home positions and to
 * drive the flow-field advection. Deterministic given the same inputs.
 */

/** Hash a 2D coordinate into a pseudo-random value in [0, 1). */
export function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/** Smooth (bilinearly interpolated, smoothstepped) value noise. */
export function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  return a + (b - a) * u + (c - a) * v + (a - b + d - c) * u * v;
}
