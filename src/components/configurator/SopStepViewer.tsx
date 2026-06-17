import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BoxResult, SopStep } from '@/lib/packEngine';

interface Props {
  result: BoxResult;
  steps: SopStep[];
}

// Renders an orthographic top-view of the box with placements up to the current step's Z layer.
export function SopStepViewer({ result, steps }: Props) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const visibleZ = step ? Math.max(...result.placements.map(p => p.z).filter(z => true), 0) : 0;

  // determine which layers are visible
  const visibleLayers = (() => {
    if (idx < 2) return [];
    const layerZs = Array.from(new Set(result.placements.map(p => p.z))).sort((a, b) => a - b);
    const layerIdx = idx - 2; // step 1 assemble, step 2 base, then layers
    return layerZs.slice(0, layerIdx + 1);
  })();

  const placements = result.placements.filter(p => visibleLayers.includes(p.z));

  const PAD = 16;
  const SCALE = 6;
  const W = result.box.length * SCALE + PAD * 2;
  const H = result.box.width * SCALE + PAD * 2;

  // colour by Z layer for visual depth
  const layerColor = (z: number) => {
    const layers = Array.from(new Set(result.placements.map(p => p.z))).sort((a, b) => a - b);
    const i = layers.indexOf(z);
    const palette = ['hsl(220 90% 60%)', 'hsl(195 75% 55%)', 'hsl(160 65% 50%)', 'hsl(35 90% 60%)', 'hsl(280 60% 60%)'];
    return palette[i % palette.length];
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border/60 bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground font-light">Step {step?.index} di {steps.length}</p>
            <h4 className="text-lg font-light tracking-tight mt-1">{step?.title}</h4>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIdx(i => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-light leading-relaxed">{step?.description}</p>

        <div className="mt-6 flex justify-center bg-muted/30 rounded-2xl p-4">
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 520 }}>
            {/* Box outline (top view) */}
            <rect x={PAD} y={PAD} width={result.box.length * SCALE} height={result.box.width * SCALE}
              fill="none" stroke="hsl(var(--border))" strokeWidth={1.5} rx={6} />
            <text x={PAD} y={PAD - 4} fontSize={9} fill="hsl(var(--muted-foreground))">
              {result.box.name} — vista dall&apos;alto
            </text>
            {placements.map(p => (
              <g key={p.itemId}>
                <rect
                  x={PAD + p.x * SCALE}
                  y={PAD + p.y * SCALE}
                  width={p.l * SCALE}
                  height={p.w * SCALE}
                  fill={layerColor(p.z)}
                  opacity={0.78}
                  stroke="hsl(var(--card))"
                  strokeWidth={1.5}
                  rx={3}
                />
                <text
                  x={PAD + p.x * SCALE + (p.l * SCALE) / 2}
                  y={PAD + p.y * SCALE + (p.w * SCALE) / 2 + 3}
                  fontSize={9}
                  textAnchor="middle"
                  fill="white"
                >
                  {p.name.split(' ')[0]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <button
            key={s.index}
            onClick={() => setIdx(i)}
            className={`h-1.5 flex-1 min-w-[20px] rounded-full transition-colors ${i <= idx ? 'bg-primary' : 'bg-border'}`}
            aria-label={`Step ${s.index}`}
          />
        ))}
      </div>
    </div>
  );
}
