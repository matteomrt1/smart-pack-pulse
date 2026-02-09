import { PackagingInput, MaterialSuggestion } from '@/types';
import { cn } from '@/lib/utils';

interface PackagingSchema2DProps {
  input: PackagingInput;
  suggestions: MaterialSuggestion[];
}

export function PackagingSchema2D({ input, suggestions }: PackagingSchema2DProps) {
  const scale = 3;
  const padding = 60;
  const boxW = input.length * scale;
  const boxH = input.height * scale;
  const boxD = input.width * scale * 0.4;

  const svgW = boxW + boxD + padding * 2 + 120;
  const svgH = boxH + boxD + padding * 2 + 80;

  const ox = padding + 60;
  const oy = padding + boxD + 10;

  // Isometric-like front + top + side
  const protectionLayer = suggestions.find(s => s.category === 'protective');
  const boxSuggestion = suggestions.find(s => s.category === 'boxes');
  const tapeSuggestion = suggestions.find(s => s.category === 'tapes');

  const colors = {
    box: '#D4A574',
    boxStroke: '#B8926A',
    protection: '#A8D8EA',
    protectionStroke: '#7BB8CC',
    product: '#E8E8E8',
    productStroke: '#CCCCCC',
    tape: '#F5A623',
    dimension: 'hsl(220, 25%, 10%)',
  };

  return (
    <div className="bg-secondary/30 rounded-lg p-4 overflow-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg mx-auto" style={{ maxHeight: 400 }}>
        {/* Box - front face */}
        <rect x={ox} y={oy} width={boxW} height={boxH} fill={colors.box} stroke={colors.boxStroke} strokeWidth="2" rx="2" />
        {/* Box - top face */}
        <polygon
          points={`${ox},${oy} ${ox + boxD},${oy - boxD} ${ox + boxW + boxD},${oy - boxD} ${ox + boxW},${oy}`}
          fill={colors.box} stroke={colors.boxStroke} strokeWidth="2" opacity="0.85"
        />
        {/* Box - side face */}
        <polygon
          points={`${ox + boxW},${oy} ${ox + boxW + boxD},${oy - boxD} ${ox + boxW + boxD},${oy + boxH - boxD} ${ox + boxW},${oy + boxH}`}
          fill={colors.box} stroke={colors.boxStroke} strokeWidth="2" opacity="0.7"
        />

        {/* Protection layer inside */}
        {protectionLayer && (
          <rect
            x={ox + 8} y={oy + 8} width={boxW - 16} height={boxH - 16}
            fill={colors.protection} stroke={colors.protectionStroke} strokeWidth="1.5" rx="2"
            strokeDasharray="6 3" opacity="0.7"
          />
        )}

        {/* Product inside */}
        <rect
          x={ox + boxW * 0.2} y={oy + boxH * 0.25}
          width={boxW * 0.6} height={boxH * 0.5}
          fill={colors.product} stroke={colors.productStroke} strokeWidth="1.5" rx="3"
        />
        <text x={ox + boxW * 0.5} y={oy + boxH * 0.52} textAnchor="middle" className="text-[10px]" fill={colors.dimension}>
          {input.productType}
        </text>

        {/* Tape strips */}
        {tapeSuggestion && (
          <>
            <rect x={ox + boxW * 0.4} y={oy - 2} width={boxW * 0.2} height={4} fill={colors.tape} rx="1" />
            <rect x={ox + boxW * 0.4} y={oy + boxH - 2} width={boxW * 0.2} height={4} fill={colors.tape} rx="1" />
          </>
        )}

        {/* Dimension lines */}
        {/* Width */}
        <line x1={ox} y1={oy + boxH + 20} x2={ox + boxW} y2={oy + boxH + 20} stroke={colors.dimension} strokeWidth="1" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
        <text x={ox + boxW / 2} y={oy + boxH + 36} textAnchor="middle" className="text-[11px] font-medium" fill={colors.dimension}>{input.length}cm</text>

        {/* Height */}
        <line x1={ox - 20} y1={oy} x2={ox - 20} y2={oy + boxH} stroke={colors.dimension} strokeWidth="1" markerStart="url(#arrowU)" markerEnd="url(#arrowD)" />
        <text x={ox - 32} y={oy + boxH / 2} textAnchor="middle" className="text-[11px] font-medium" fill={colors.dimension} transform={`rotate(-90, ${ox - 32}, ${oy + boxH / 2})`}>{input.height}cm</text>

        {/* Depth */}
        <line x1={ox + boxW + 10} y1={oy - 5} x2={ox + boxW + boxD + 10} y2={oy - boxD - 5} stroke={colors.dimension} strokeWidth="1" />
        <text x={ox + boxW + boxD / 2 + 18} y={oy - boxD / 2 - 10} textAnchor="middle" className="text-[11px] font-medium" fill={colors.dimension}>{input.width}cm</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill={colors.dimension} /></marker>
          <marker id="arrowL" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" fill={colors.dimension} /></marker>
          <marker id="arrowD" markerWidth="6" markerHeight="8" refX="3" refY="8" orient="auto"><path d="M0,0 L3,8 L6,0" fill={colors.dimension} /></marker>
          <marker id="arrowU" markerWidth="6" markerHeight="8" refX="3" refY="0" orient="auto"><path d="M0,8 L3,0 L6,8" fill={colors.dimension} /></marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded" style={{ background: colors.box }} /> Scatola
        </div>
        {protectionLayer && (
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded border-2 border-dashed" style={{ background: colors.protection, borderColor: colors.protectionStroke }} /> {protectionLayer.productName}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded" style={{ background: colors.product }} /> Prodotto
        </div>
        {tapeSuggestion && (
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded" style={{ background: colors.tape }} /> Nastro
          </div>
        )}
      </div>
    </div>
  );
}
