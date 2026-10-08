/**
 * Structure-of-Arrays stroke buffer for the sand tracing hot path.
 * Points are written in place; storage only reallocates when full (capacity doubles),
 * so pointer-move handlers perform no per-event heap allocation.
 */
export const STROKE_BUFFER_INITIAL_CAPACITY = 256;

export interface StrokeBuffer {
  xs: Float32Array;
  ys: Float32Array;
  count: number;
}

export function createStrokeBuffer(capacity = STROKE_BUFFER_INITIAL_CAPACITY): StrokeBuffer {
  return {
    xs: new Float32Array(capacity),
    ys: new Float32Array(capacity),
    count: 0,
  };
}

export function pushStrokePoint(buf: StrokeBuffer, x: number, y: number): void {
  if (buf.count === buf.xs.length) {
    const nextCapacity = buf.xs.length * 2;
    const xs = new Float32Array(nextCapacity);
    const ys = new Float32Array(nextCapacity);
    xs.set(buf.xs);
    ys.set(buf.ys);
    buf.xs = xs;
    buf.ys = ys;
  }
  buf.xs[buf.count] = x;
  buf.ys[buf.count] = y;
  buf.count++;
}

export function resetStrokeBuffer(buf: StrokeBuffer): void {
  buf.count = 0;
}
