import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ALL_AKKHA_GLYPHS } from '../data/scriptData';
import { AkkhaGlyph } from '../types';
import {
  SandTracingCanvasProps,
  SandTracingTab,
} from '../types/sandTracing';
import { createStrokeBuffer, pushStrokePoint, resetStrokeBuffer, StrokeBuffer } from '../utils/stroke-buffer';
import { glyphById } from '../utils/script-index';
import { buildGuideSamples, scoreTrace, TRACE_PASS_SCORE } from '../utils/trace-score';
import {
  DEFAULT_SAND_GLYPH_ID,
  SAND_TRACING_TABS,
  SAND_CANVAS_PALETTES,
} from '../constants/sandTracing';
import { useTheme } from '../context/ThemeContext';
import { RotateCcw, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';

export const SandTracingCanvas: React.FC<SandTracingCanvasProps> = ({
  selectedGlyphId = DEFAULT_SAND_GLYPH_ID,
  onTraceComplete,
  className = '',
}) => {
  const { isBright } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentGlyph, setCurrentGlyph] = useState<AkkhaGlyph>(
    () => glyphById(selectedGlyphId) || ALL_AKKHA_GLYPHS[0]
  );
  const [isDrawing, setIsDrawing] = useState(false);
  // SoA stroke storage lives outside React state: pointer moves write in place without re-rendering
  const strokeBufferRef = useRef<StrokeBuffer | null>(null);
  if (strokeBufferRef.current === null) {
    strokeBufferRef.current = createStrokeBuffer();
  }
  const [hasStrokes, setHasStrokes] = useState(false);
  // Densified guide samples, rebuilt only when the glyph changes
  const guideSamples = useMemo(() => buildGuideSamples(currentGlyph.strokes), [currentGlyph]);
  const [showGuide, setShowGuide] = useState(true);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<SandTracingTab>('vowels');

  // Update when prop changes
  useEffect(() => {
    const found = glyphById(selectedGlyphId);
    if (found) {
      setCurrentGlyph(found);
      clearCanvas();
      setAccuracyScore(null);
    }
  }, [selectedGlyphId]);

  // Redraw sand background and guide
  const drawBackground = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const palette = isBright ? SAND_CANVAS_PALETTES.light : SAND_CANVAS_PALETTES.dark;

      // Base canvas background
      ctx.fillStyle = palette.canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Subtle traditional sand granulations
      ctx.fillStyle = palette.granuleColor;
      for (let i = 0; i < 300; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 77) * 0.5 + 0.5) * height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Outer border inlay
      ctx.strokeStyle = palette.borderColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(12, 12, width - 24, height - 24);

      // Corner traditional geometric Dhaka marks
      const corners = [
        { x: 18, y: 18 },
        { x: width - 18, y: 18 },
        { x: 18, y: height - 18 },
        { x: width - 18, y: height - 18 },
      ];
      ctx.fillStyle = palette.cornerMarkColor;
      corners.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Guide Path (Dashed Outline)
      if (showGuide) {
        ctx.save();
        ctx.strokeStyle = palette.guideColor;
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([8, 10]);

        // Transform 100x100 SVG path to canvas scale
        const scaleX = (width - 80) / 100;
        const scaleY = (height - 80) / 100;
        ctx.translate(40, 40);
        ctx.scale(scaleX, scaleY);

        const path = new Path2D(currentGlyph.svgPath);
        ctx.stroke(path);

        // Draw start guide points and numbers
        ctx.restore();
        if (currentGlyph.strokes) {
          currentGlyph.strokes.forEach((st) => {
            if (st.points.length > 0) {
              const startPt = st.points[0];
              const cx = 40 + startPt.x * scaleX;
              const cy = 40 + startPt.y * scaleY;

              ctx.fillStyle = palette.guidePointBg;
              ctx.beginPath();
              ctx.arc(cx, cy, 10, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = palette.guidePointText;
              ctx.font = 'bold 11px Outfit, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(st.id.toString(), cx, cy);
            }
          });
        }
      }
    },
    [currentGlyph, showGuide, isBright]
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (strokeBufferRef.current) resetStrokeBuffer(strokeBufferRef.current);
    setHasStrokes(false);
    setAccuracyScore(null);
    drawBackground(ctx, canvas.width, canvas.height);
  }, [drawBackground]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI crispness
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 380;
    canvas.height = rect.height || 380;

    drawBackground(ctx, canvas.width, canvas.height);
  }, [currentGlyph, showGuide, drawBackground]);

  // Drawing event handlers for Mouse and Touch.
  // Coordinates are written into one reused scratch point (no per-event object allocation).
  const scratchPointRef = useRef({ x: 0, y: 0 });
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const pt = scratchPointRef.current;
    pt.x = 0;
    pt.y = 0;
    const canvas = canvasRef.current;
    if (!canvas) return pt;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      pt.x = e.touches[0].clientX - rect.left;
      pt.y = e.touches[0].clientY - rect.top;
    } else if ('clientX' in e) {
      pt.x = (e as React.MouseEvent).clientX - rect.left;
      pt.y = (e as React.MouseEvent).clientY - rect.top;
    }
    return pt;
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const pt = getCoordinates(e);
    if (strokeBufferRef.current) pushStrokePoint(strokeBufferRef.current, pt.x, pt.y);
    if (!hasStrokes) setHasStrokes(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pt = getCoordinates(e);
    if (strokeBufferRef.current) pushStrokePoint(strokeBufferRef.current, pt.x, pt.y);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = isBright ? SAND_CANVAS_PALETTES.light : SAND_CANVAS_PALETTES.dark;

    // Clean, high-contrast sand stroke
    ctx.lineWidth = palette.tracedStrokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = palette.tracedStrokeColor;
    ctx.shadowColor = palette.tracedStrokeColor;
    ctx.shadowBlur = isBright ? 2 : 6;

    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();

    // Subtle natural sand particle feedback
    if (Math.random() < 0.25) {
      ctx.fillStyle = isBright ? 'rgba(180, 83, 9, 0.4)' : '#FDE68A';
      ctx.beginPath();
      ctx.arc(
        pt.x + (Math.random() - 0.5) * 10,
        pt.y + (Math.random() - 0.5) * 10,
        Math.random() * 1.8 + 0.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  // Evaluate user tracing accuracy
  const handleCheckAccuracy = () => {
    if ((strokeBufferRef.current?.count ?? 0) < 15) {
      alert('Please trace more strokes along the Akkha character guide!');
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas || !strokeBufferRef.current) return;

    // Same 0–100 glyph-space placement the guide is drawn with (40px margin)
    const { score } = scoreTrace(guideSamples, strokeBufferRef.current, {
      originX: 40,
      originY: 40,
      scaleX: (canvas.width - 80) / 100,
      scaleY: (canvas.height - 80) / 100,
    });
    setAccuracyScore(score);
    // Rewards and lesson progress only for a passing trace
    if (score >= TRACE_PASS_SCORE) onTraceComplete?.(currentGlyph.id, score);
  };

  const filteredGlyphs = ALL_AKKHA_GLYPHS.filter((g) => {
    if (activeTab === 'vowels') return g.category === 'vowel';
    if (activeTab === 'consonants') return g.category === 'consonant';
    return g.category === 'number';
  });

  return (
    <div
      id="sand-tracing-lab"
      className={`rounded-2xl p-4 md:p-6 shadow-xl space-y-6 transition-all border ${
        isBright
          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
          : 'bg-stone-900 border-stone-800 text-white shadow-2xl'
      } ${className}`}
    >
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
        isBright ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div>
          <span className={`text-xs uppercase tracking-wider font-bold ${
            isBright ? 'text-amber-700' : 'text-amber-400'
          }`}>
            Calligraphy Studio • अक्खा रिका
          </span>
          <h3 className={`text-xl md:text-2xl font-heading font-black ${
            isBright ? 'text-slate-900' : 'text-white'
          }`}>
            Akkha Script Sand-Box Tracing
          </h3>
          <p className={`text-xs mt-0.5 ${
            isBright ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Select an ancient glyph and trace the stroke path upon the sand canvas.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-11 rounded-lg text-xs font-semibold border transition-colors ${
              showGuide
                ? isBright
                  ? 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-400/40 font-bold'
                  : 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : isBright
                ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showGuide ? 'Guide On' : 'Guide Off'}</span>
          </button>

          <button
            onClick={clearCanvas}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-11 rounded-lg text-xs font-semibold border transition-colors active:scale-95 ${
              isBright
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Clear sand canvas"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Category & Glyph Selector Grid */}
        <div className="lg:col-span-5 space-y-4">
          {/* Neutral & Clean Tab Selector */}
          <div className={`grid grid-cols-3 gap-1 p-1 rounded-xl border text-xs font-medium ${
            isBright ? 'bg-slate-100/80 border-slate-200' : 'bg-white/5 border-white/10'
          }`}>
            {SAND_TRACING_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const labelParts = tab.label.split(' ');
              const primaryLabel = labelParts[0];
              const secondaryScript = labelParts.slice(1).join(' ');

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-w-0 min-h-11 py-1.5 rounded-lg transition-colors flex flex-col sm:flex-row items-center justify-center gap-x-1 leading-tight ${
                    isActive
                      ? isBright
                        ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                        : 'bg-slate-800 text-white font-bold shadow-xs border border-slate-700'
                      : isBright
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{primaryLabel}</span>
                  {secondaryScript && (
                    <span className={`text-[10px] font-devanagari ${
                      isActive
                        ? isBright ? 'text-slate-600' : 'text-slate-300'
                        : isBright ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {secondaryScript}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Glyph Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto p-1 pr-2">
            {filteredGlyphs.map((glyph) => {
              const isSelected = glyph.id === currentGlyph.id;

              return (
                <div
                  key={glyph.id}
                  id={`select-glyph-${glyph.id}`}
                  onClick={() => {
                    setCurrentGlyph(glyph);
                    clearCanvas();
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isSelected
                      ? isBright
                        ? 'bg-amber-50 border-amber-500 shadow-sm ring-1 ring-amber-400'
                        : 'bg-amber-950/40 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                      : isBright
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className={`text-2xl font-heading font-akkha ${
                    isBright ? 'text-amber-700' : 'text-amber-400'
                  }`}>
                    {glyph.glyph}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`font-devanagari text-xs font-bold ${
                      isBright ? 'text-slate-700' : 'text-slate-200'
                    }`}>
                      {glyph.devalipi}
                    </span>
                    <span className={`text-[10px] ${
                      isBright ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {glyph.romanized}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Glyph Details Card */}
          <div className={`border rounded-xl p-4 space-y-2 ${
            isBright ? 'bg-slate-50 border-slate-200' : 'bg-stone-900 border-stone-800'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                  isBright ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Target Glyph
                </span>
                <h4 className={`text-lg font-heading font-black ${
                  isBright ? 'text-slate-900' : 'text-white'
                }`}>
                  <span className={`font-akkha mr-1 ${isBright ? 'text-amber-700' : 'text-amber-400'}`}>
                    {currentGlyph.glyph}
                  </span> • {currentGlyph.devalipi} ({currentGlyph.romanized})
                </h4>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-mono border ${
                isBright
                  ? 'bg-slate-200/70 text-slate-800 border-slate-300'
                  : 'bg-white/10 text-slate-300 border-white/10'
              }`}>
                {currentGlyph.ipa}
              </span>
            </div>

            <div className={`pt-2 border-t text-xs space-y-1 ${
              isBright ? 'border-slate-200 text-slate-700' : 'border-white/5 text-slate-300'
            }`}>
              <p>
                <strong className={isBright ? 'text-slate-600' : 'text-slate-400'}>Sample:</strong>{' '}
                <span className={`font-bold ${isBright ? 'text-amber-700' : 'text-amber-400'}`}>
                  {currentGlyph.sampleWord.akkha}
                </span>{' '}
                ({currentGlyph.sampleWord.roman} / {currentGlyph.sampleWord.deva})
              </p>
              <p className={`italic ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                "{currentGlyph.sampleWord.meaning}"
              </p>
            </div>
          </div>
        </div>

        {/* Right: The HTML5 Canvas Tracing Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className={`relative w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden shadow-lg border touch-none ${
            isBright ? 'border-slate-300 shadow-slate-200/60 ring-1 ring-slate-200' : 'border-white/15 shadow-xl'
          }`}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair select-none"
            />

            {/* In-canvas watermark instructions */}
            {!hasStrokes && (
              <div className={`absolute inset-x-0 bottom-4 text-center pointer-events-none text-xs font-medium ${
                isBright ? 'text-slate-600' : 'text-amber-300/90'
              }`}>
                ✍️ Trace along the dashed guide lines
              </div>
            )}
          </div>

          {/* Evaluation & Completion Score */}
          <div className="w-full max-w-[380px] mt-4 flex items-center justify-between gap-3">
            {accuracyScore !== null ? (
              <div
                className={`flex-1 border rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200 ${
                  accuracyScore >= TRACE_PASS_SCORE
                    ? 'bg-amber-50 border-amber-300 dark:bg-amber-500/10 dark:border-amber-500/30'
                    : 'bg-stone-50 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {accuracyScore >= TRACE_PASS_SCORE ? (
                    <CheckCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  ) : (
                    <RotateCcw className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  )}
                  <div>
                    <div className="text-xs font-medium text-stone-600 dark:text-stone-400">
                      {accuracyScore >= TRACE_PASS_SCORE ? 'Stroke Matched · +2 Mundri' : `Keep practising · ${TRACE_PASS_SCORE}% to pass`}
                    </div>
                    <div className="text-sm font-bold tabular-nums text-stone-900 dark:text-white">
                      {accuracyScore}% Accuracy
                    </div>
                  </div>
                </div>
                {accuracyScore < TRACE_PASS_SCORE && (
                  <button
                    onClick={clearCanvas}
                    className="min-h-11 px-3 rounded-lg text-xs font-semibold cursor-pointer text-amber-800 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Try again
                  </button>
                )}
              </div>
            ) : (
              <button
                id="evaluate-trace-btn"
                onClick={handleCheckAccuracy}
                className={`flex-1 py-2.5 min-h-11 rounded-xl font-bold text-xs shadow-md border flex items-center justify-center gap-2 transition-colors active:scale-95 ${
                  isBright
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600 shadow-md'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Check Accuracy</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

