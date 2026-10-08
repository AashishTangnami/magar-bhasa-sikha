/**
 * Structure-of-Arrays particle field for the Lali Gurans celebration.
 * Every per-particle attribute lives in its own typed array; stepping and drawing are plain
 * indexed loops with no per-frame allocation.
 */
export const PARTICLE_GRAVITY = 0.35;
export const PARTICLE_DRAG = 0.98;
export const PARTICLE_FADE = 0.008;

export const PARTICLE_KIND_PETAL = 0;
export const PARTICLE_KIND_LEAF = 1;
export const PARTICLE_KIND_SPARKLE = 2;

export interface ParticleField {
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  size: Float32Array;
  rot: Float32Array;
  rotSpeed: Float32Array;
  alpha: Float32Array;
  kind: Uint8Array;
  color: Uint8Array;
  count: number;
}

export function createParticleField(capacity: number): ParticleField {
  return {
    x: new Float32Array(capacity),
    y: new Float32Array(capacity),
    vx: new Float32Array(capacity),
    vy: new Float32Array(capacity),
    size: new Float32Array(capacity),
    rot: new Float32Array(capacity),
    rotSpeed: new Float32Array(capacity),
    alpha: new Float32Array(capacity),
    kind: new Uint8Array(capacity),
    color: new Uint8Array(capacity),
    count: 0,
  };
}

/**
 * Fills the field with `count` particles bursting from (cx, cy).
 * Random draws happen in the same order as the original object-based spawner.
 */
export function spawnParticles(
  field: ParticleField,
  count: number,
  cx: number,
  cy: number,
  colorCount: number,
  rng: () => number
): void {
  const n = Math.min(count, field.x.length);
  for (let i = 0; i < n; i++) {
    const isSparkle = rng() < 0.25;
    const isLeaf = rng() < 0.25;
    field.x[i] = cx + (rng() - 0.5) * 160;
    field.y[i] = cy + (rng() - 0.5) * 80;
    field.vx[i] = (rng() - 0.5) * 12;
    field.vy[i] = -rng() * 14 - 4;
    field.size[i] = rng() * 14 + 8;
    field.color[i] = Math.floor(rng() * colorCount);
    field.rot[i] = rng() * Math.PI * 2;
    field.rotSpeed[i] = (rng() - 0.5) * 0.15;
    field.kind[i] = isSparkle ? PARTICLE_KIND_SPARKLE : isLeaf ? PARTICLE_KIND_LEAF : PARTICLE_KIND_PETAL;
    field.alpha[i] = 1;
  }
  field.count = n;
}

/** Advances every particle one frame; returns how many are still visible. */
export function stepParticles(field: ParticleField): number {
  const { x, y, vx, vy, rot, rotSpeed, alpha } = field;
  let live = 0;
  for (let i = 0; i < field.count; i++) {
    x[i] += vx[i];
    y[i] += vy[i];
    vy[i] += PARTICLE_GRAVITY;
    vx[i] *= PARTICLE_DRAG;
    rot[i] += rotSpeed[i];
    alpha[i] -= PARTICLE_FADE;
    if (alpha[i] > 0) live++;
  }
  return live;
}
