import { StrokeGuide } from '../types';
import { StrokeBuffer } from './stroke-buffer';

/**
 * Geometric tracing score.
 * Guides are densified once into SoA typed arrays (glyph units, 0–100); traced canvas pixels are
 * mapped back into glyph units and compared by nearest-sample distance. No allocation in the loops.
 */

export interface GuideSamples {
  gx: Float32Array;
  gy: Float32Array;
  count: number;
}

/** Canvas placement of the 0–100 glyph space (same mapping the canvas uses to draw the guide). */
export interface CanvasMapping {
  originX: number;
  originY: number;
  scaleX: number;
  scaleY: number;
}

export interface TraceScore {
  score: number;
  coverage: number;
  precision: number;
}

/** Spacing between densified guide samples, in glyph units. */
export const GUIDE_SAMPLE_SPACING = 3;
/** A traced point "hits" a guide sample within this distance, in glyph units. */
export const TRACE_TOLERANCE = 8;
/** Minimum score that counts as a completed trace (rewards, lesson progress). */
export const TRACE_PASS_SCORE = 60;

const COVERAGE_WEIGHT = 0.6;
const PRECISION_WEIGHT = 0.4;

/** Flattens every stroke's polyline into evenly spaced samples (endpoints included). */
export function buildGuideSamples(strokes: readonly StrokeGuide[], spacing = GUIDE_SAMPLE_SPACING): GuideSamples {
  let total = 0;
  for (const stroke of strokes) {
    const pts = stroke.points;
    if (pts.length === 1) total += 1;
    for (let i = 1; i < pts.length; i++) {
      const len = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      total += Math.max(1, Math.ceil(len / spacing)) + (i === 1 ? 1 : 0);
    }
  }

  const gx = new Float32Array(total);
  const gy = new Float32Array(total);
  let n = 0;
  for (const stroke of strokes) {
    const pts = stroke.points;
    if (pts.length === 1) {
      gx[n] = pts[0].x;
      gy[n] = pts[0].y;
      n++;
    }
    for (let i = 1; i < pts.length; i++) {
      const ax = pts[i - 1].x;
      const ay = pts[i - 1].y;
      const bx = pts[i].x;
      const by = pts[i].y;
      const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / spacing));
      for (let s = i === 1 ? 0 : 1; s <= steps; s++) {
        const t = s / steps;
        gx[n] = ax + (bx - ax) * t;
        gy[n] = ay + (by - ay) * t;
        n++;
      }
    }
  }
  return { gx, gy, count: n };
}

/**
 * coverage  = share of guide samples with a traced point within tolerance (did the learner follow the whole shape?)
 * precision = share of traced points within tolerance of the guide (did they stay on it?)
 * score     = round(100 × (0.6·coverage + 0.4·precision))
 */
export function scoreTrace(
  guide: GuideSamples,
  trace: StrokeBuffer,
  mapping: CanvasMapping,
  tolerance = TRACE_TOLERANCE
): TraceScore {
  if (trace.count === 0 || guide.count === 0) return { score: 0, coverage: 0, precision: 0 };

  const tol2 = tolerance * tolerance;
  const { gx, gy } = guide;
  const { xs, ys } = trace;
  const invX = 1 / mapping.scaleX;
  const invY = 1 / mapping.scaleY;

  let covered = 0;
  for (let g = 0; g < guide.count; g++) {
    for (let t = 0; t < trace.count; t++) {
      const dx = (xs[t] - mapping.originX) * invX - gx[g];
      const dy = (ys[t] - mapping.originY) * invY - gy[g];
      if (dx * dx + dy * dy <= tol2) {
        covered++;
        break;
      }
    }
  }

  let precise = 0;
  for (let t = 0; t < trace.count; t++) {
    const ux = (xs[t] - mapping.originX) * invX;
    const uy = (ys[t] - mapping.originY) * invY;
    for (let g = 0; g < guide.count; g++) {
      const dx = ux - gx[g];
      const dy = uy - gy[g];
      if (dx * dx + dy * dy <= tol2) {
        precise++;
        break;
      }
    }
  }

  const coverage = covered / guide.count;
  const precision = precise / trace.count;
  const score = Math.max(0, Math.min(100, Math.round(100 * (COVERAGE_WEIGHT * coverage + PRECISION_WEIGHT * precision))));
  return { score, coverage, precision };
}
