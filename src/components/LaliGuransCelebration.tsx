import React, { useEffect, useRef } from 'react';
import {
  createParticleField,
  spawnParticles,
  stepParticles,
  ParticleField,
  PARTICLE_KIND_PETAL,
  PARTICLE_KIND_LEAF,
} from '../utils/particle-field';

interface LaliGuransCelebrationProps {
  active: boolean;
  onComplete?: () => void;
}

const PARTICLE_COUNT = 70;
const CELEBRATION_MS = 3500;
const PARTICLE_COLORS = [
  '#BC002D', // Crimson Red Rhododendron
  '#E60039', // Bright Red petal
  '#FF4D6D', // Soft Rhododendron petal
  '#046307', // Emerald Green mountain leaf
  '#10B981', // Fresh hill leaf
  '#FFCC00', // Sun Yellow pollen sparkle
  '#FDE047', // Golden sparkle
] as const;

export const LaliGuransCelebration: React.FC<LaliGuransCelebrationProps> = ({
  active,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Latest callback held in a ref so a parent re-render (new inline function)
  // does not tear down and respawn the particle animation
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  // SoA particle storage, allocated once per component instance and reused across celebrations
  const fieldRef = useRef<ParticleField | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (fieldRef.current === null) fieldRef.current = createParticleField(PARTICLE_COUNT);
    const field = fieldRef.current;
    spawnParticles(field, PARTICLE_COUNT, canvas.width / 2, canvas.height / 2, PARTICLE_COLORS.length, Math.random);

    let animationFrameId = 0;
    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const liveCount = stepParticles(field);
      const { x, y, size, rot, alpha, kind, color } = field;

      for (let i = 0; i < field.count; i++) {
        if (alpha[i] <= 0) continue;
        const s = size[i];

        ctx.save();
        ctx.translate(x[i], y[i]);
        ctx.rotate(rot[i]);
        ctx.globalAlpha = alpha[i];
        ctx.fillStyle = PARTICLE_COLORS[color[i]];
        ctx.beginPath();

        if (kind[i] === PARTICLE_KIND_PETAL) {
          // Rhododendron (Lali Gurans) curved petal with a delicate central vein
          ctx.ellipse(0, 0, s, s * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-s * 0.8, 0);
          ctx.lineTo(s * 0.8, 0);
          ctx.stroke();
        } else if (kind[i] === PARTICLE_KIND_LEAF) {
          // Green hill leaf
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(s * 0.6, 0, 0, s);
          ctx.quadraticCurveTo(-s * 0.6, 0, 0, -s);
          ctx.fill();
        } else {
          // Sun-yellow sparkle
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (liveCount > 0 && elapsed < CELEBRATION_MS) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        onCompleteRef.current?.();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
