// Packaging & Logistics Optimization Engine
// 1) 3D Bin Packing (greedy, multi-orientation) → minimize Void Ratio
// 2) Risk Prediction (baseline breakage × mitigation factor)
// 3) TCO / Labor cost calculator
// All data is mocked locally — no external dependencies.

export type Orientation = 'free' | 'upright';

export interface PackItem {
  id: string;
  name: string;
  // cm
  length: number;
  width: number;
  height: number;
  weight: number; // kg
  category: RiskCategory;
  orientation: Orientation;
  nestable: boolean;
  unitValue?: number; // €, optional, used for ROI on returns
  quantity: number;
}

export interface BoxSpec {
  id: string;
  name: string;
  // internal cm
  length: number;
  width: number;
  height: number;
  maxWeight: number; // kg
  price: number; // €
  assemblyTimeSeconds: number;
  selfLocking?: boolean; // automontante
  ecoFriendly: boolean;
}

export interface FillerSpec {
  id: string;
  name: string;
  density: 'low' | 'high'; // low = voluminous, high = high-density
  pricePerLiter: number;
  ecoFriendly: boolean;
  // Mitigation factor applied to baseline breakage probability for the category(ies)
  mitigation: number; // e.g. 0.20 means residual probability = baseline * 0.20
}

export type RiskCategory =
  | 'glass'
  | 'electronics'
  | 'liquids'
  | 'apparel'
  | 'food'
  | 'mechanical';

export const RISK_BASELINE: Record<RiskCategory, { label: string; baseline: number }> = {
  glass:       { label: 'Vetro / Ceramica',    baseline: 0.042 },
  electronics: { label: 'Elettronica',         baseline: 0.028 },
  liquids:     { label: 'Liquidi',             baseline: 0.031 },
  apparel:     { label: 'Abbigliamento',       baseline: 0.004 },
  food:        { label: 'Alimentare',          baseline: 0.018 },
  mechanical:  { label: 'Meccanica / Ricambi', baseline: 0.012 },
};

// ----- Catalog (mocked) ---------------------------------------------------

export const BOX_CATALOG: BoxSpec[] = [
  { id: 'BX-A-200', name: 'Americana 20×15×10', length: 20, width: 15, height: 10, maxWeight: 8,  price: 0.55, assemblyTimeSeconds: 38, ecoFriendly: true },
  { id: 'BX-A-300', name: 'Americana 30×20×15', length: 30, width: 20, height: 15, maxWeight: 15, price: 0.85, assemblyTimeSeconds: 42, ecoFriendly: true },
  { id: 'BX-A-400', name: 'Americana 40×30×30', length: 40, width: 30, height: 30, maxWeight: 30, price: 1.80, assemblyTimeSeconds: 45, ecoFriendly: true },
  { id: 'BX-A-600', name: 'Americana 60×40×40', length: 60, width: 40, height: 40, maxWeight: 40, price: 2.90, assemblyTimeSeconds: 52, ecoFriendly: true },
  { id: 'BX-S-300', name: 'Automontante 30×22×16', length: 30, width: 22, height: 16, maxWeight: 12, price: 1.15, assemblyTimeSeconds: 12, selfLocking: true, ecoFriendly: true },
  { id: 'BX-S-400', name: 'Automontante 40×30×25', length: 40, width: 30, height: 25, maxWeight: 18, price: 2.10, assemblyTimeSeconds: 14, selfLocking: true, ecoFriendly: true },
];

export const FILLER_CATALOG: FillerSpec[] = [
  { id: 'F-KRAFT', name: 'Carta Kraft accartocciata', density: 'low',  pricePerLiter: 0.04, ecoFriendly: true,  mitigation: 0.65 },
  { id: 'F-CHIPS', name: 'Patatine biodegradabili',   density: 'low',  pricePerLiter: 0.06, ecoFriendly: true,  mitigation: 0.45 },
  { id: 'F-AIR',   name: 'Cuscini d\'aria',           density: 'low',  pricePerLiter: 0.03, ecoFriendly: false, mitigation: 0.35 },
  { id: 'F-PE',    name: 'Schiuma PE espanso',        density: 'high', pricePerLiter: 0.18, ecoFriendly: false, mitigation: 0.18 },
  { id: 'F-FOAM',  name: 'Foam-in-place poliuretano', density: 'high', pricePerLiter: 0.32, ecoFriendly: false, mitigation: 0.10 },
];

const LOW_VOID_THRESHOLD = 0.18; // sotto questa soglia preferiamo filler ad alta densità

// ----- 3D Bin Packing ------------------------------------------------------

interface Placed {
  itemId: string;
  name: string;
  x: number; y: number; z: number; // origin (cm) bottom-left-back
  l: number; w: number; h: number; // chosen orientation dims
}

function orientations(item: PackItem): Array<[number, number, number]> {
  const { length: L, width: W, height: H } = item;
  if (item.orientation === 'upright') return [[L, W, H]];
  return [
    [L, W, H], [L, H, W],
    [W, L, H], [W, H, L],
    [H, L, W], [H, W, L],
  ];
}

interface FreeSpace { x: number; y: number; z: number; l: number; w: number; h: number; }

// Guillotine-style greedy: keep a list of free cuboids; pick the first that fits.
function tryPackInto(box: BoxSpec, items: PackItem[]): { placements: Placed[]; ok: boolean } {
  const free: FreeSpace[] = [{ x: 0, y: 0, z: 0, l: box.length, w: box.width, h: box.height }];
  const placements: Placed[] = [];
  // expand quantities
  const expanded: PackItem[] = [];
  items.forEach(it => { for (let i = 0; i < it.quantity; i++) expanded.push({ ...it, quantity: 1, id: `${it.id}#${i}` }); });
  // largest first for stability at the bottom
  expanded.sort((a, b) => (b.length * b.width * b.height) - (a.length * a.width * a.height));

  for (const item of expanded) {
    let placed = false;
    const ors = orientations(item);
    // Choose the orientation with the largest base footprint that fits (better stacking)
    outer:
    for (let fi = 0; fi < free.length; fi++) {
      const fs = free[fi];
      for (const [l, w, h] of ors) {
        if (l <= fs.l && w <= fs.w && h <= fs.h) {
          placements.push({ itemId: item.id, name: item.name, x: fs.x, y: fs.y, z: fs.z, l, w, h });
          // split free space into 3 new cuboids (right, front, top)
          const right: FreeSpace = { x: fs.x + l, y: fs.y, z: fs.z, l: fs.l - l, w, h };
          const front: FreeSpace = { x: fs.x, y: fs.y + w, z: fs.z, l: fs.l, w: fs.w - w, h };
          const top:   FreeSpace = { x: fs.x, y: fs.y, z: fs.z + h, l, w, h: fs.h - h };
          free.splice(fi, 1, ...[right, front, top].filter(s => s.l > 0 && s.w > 0 && s.h > 0));
          placed = true;
          break outer;
        }
      }
    }
    if (!placed) return { placements, ok: false };
  }
  return { placements, ok: true };
}

export interface BoxResult {
  box: BoxSpec;
  placements: Placed[];
  voidRatio: number;
  voidVolumeLiters: number;
  totalWeight: number;
  fits: true;
}

export interface PackResult {
  candidates: BoxResult[];
  best: BoxResult | null;
  rejected: { box: BoxSpec; reason: string }[];
}

export function pack(items: PackItem[], catalog: BoxSpec[] = BOX_CATALOG): PackResult {
  const totalWeight = items.reduce((s, i) => s + i.weight * i.quantity, 0);
  const itemsVolumeCm3 = items.reduce((s, i) => s + i.length * i.width * i.height * i.quantity, 0);

  const candidates: BoxResult[] = [];
  const rejected: { box: BoxSpec; reason: string }[] = [];

  for (const box of catalog) {
    if (box.maxWeight < totalWeight) {
      rejected.push({ box, reason: `Portata insufficiente (${box.maxWeight}kg < ${totalWeight}kg)` });
      continue;
    }
    const boxVol = box.length * box.width * box.height;
    if (boxVol < itemsVolumeCm3) {
      rejected.push({ box, reason: 'Volume interno inferiore al volume articoli' });
      continue;
    }
    const { placements, ok } = tryPackInto(box, items);
    if (!ok) {
      rejected.push({ box, reason: 'Disposizione geometrica non valida' });
      continue;
    }
    const voidVolume = boxVol - itemsVolumeCm3;
    candidates.push({
      box,
      placements,
      voidRatio: voidVolume / boxVol,
      voidVolumeLiters: voidVolume / 1000,
      totalWeight,
      fits: true,
    });
  }

  candidates.sort((a, b) => a.voidRatio - b.voidRatio);
  return { candidates, best: candidates[0] ?? null, rejected };
}

// ----- Filler selection ----------------------------------------------------

export interface FillerChoice {
  filler: FillerSpec;
  volumeLiters: number;
  cost: number;
  reason: string;
}

export function selectFiller(result: BoxResult, prefersEco = true): FillerChoice {
  const lowVoid = result.voidRatio < LOW_VOID_THRESHOLD;
  // Below threshold → high density (no voluminous fillers)
  const pool = FILLER_CATALOG.filter(f => lowVoid ? f.density === 'high' : true);
  // Sort by mitigation (best first), then eco preference, then cost
  pool.sort((a, b) => {
    if (a.mitigation !== b.mitigation) return a.mitigation - b.mitigation;
    if (prefersEco && a.ecoFriendly !== b.ecoFriendly) return a.ecoFriendly ? -1 : 1;
    return a.pricePerLiter - b.pricePerLiter;
  });
  // Pick a sensible default: best mitigation if void is small, eco-low-density if void is large
  const filler = lowVoid ? pool[0] : (pool.find(f => f.ecoFriendly && f.density === 'low') ?? pool[0]);
  const volumeLiters = Math.max(0.1, +(result.voidVolumeLiters).toFixed(2));
  return {
    filler,
    volumeLiters,
    cost: +(volumeLiters * filler.pricePerLiter).toFixed(2),
    reason: lowVoid
      ? `Void ratio ${(result.voidRatio * 100).toFixed(1)}% < soglia ${LOW_VOID_THRESHOLD * 100}% → materiale ad alta densità`
      : `Void ratio ${(result.voidRatio * 100).toFixed(1)}% → riempimento standard a bassa densità`,
  };
}

// ----- Risk / Financial delta ---------------------------------------------

export interface RiskAssessment {
  category: RiskCategory;
  baselineProbability: number;
  mitigatedProbability: number;
  averageOrderValue: number;
  expectedLossBaseline: number;   // € per pacco
  expectedLossMitigated: number;  // € per pacco
  savingsPerPackage: number;
}

export function assessRisk(
  primary: RiskCategory,
  filler: FillerSpec,
  averageOrderValue: number,
  baselineFiller: FillerSpec = FILLER_CATALOG[0],
): RiskAssessment {
  const baseline = RISK_BASELINE[primary].baseline;
  const baselineProb = baseline * baselineFiller.mitigation;
  const mitigatedProb = baseline * filler.mitigation;
  return {
    category: primary,
    baselineProbability: baselineProb,
    mitigatedProbability: mitigatedProb,
    averageOrderValue,
    expectedLossBaseline: +(baselineProb * averageOrderValue).toFixed(2),
    expectedLossMitigated: +(mitigatedProb * averageOrderValue).toFixed(2),
    savingsPerPackage: +((baselineProb - mitigatedProb) * averageOrderValue).toFixed(2),
  };
}

// ----- TCO Calculator ------------------------------------------------------

export interface TCOInputs {
  hourlyLaborCost: number;
  tapeCostPerPack: number; // € spent on PP tape per pack (americana)
}

export interface TCOComparison {
  selfLocking: BoxSpec;
  americana: BoxSpec;
  materialDelta: number;
  laborDeltaSeconds: number;
  laborSavings: number;
  tapeSavings: number;
  netSavings: number;
}

export function compareTCO(best: BoxSpec, catalog: BoxSpec[], inputs: TCOInputs): TCOComparison | null {
  if (best.selfLocking) {
    // already self-locking — compare with the equivalent americana
    const americana = catalog.find(b => !b.selfLocking && b.length >= best.length && b.width >= best.width && b.height >= best.height);
    if (!americana) return null;
    return buildTCO(best, americana, inputs);
  }
  // find a self-locking that can host the same volume
  const sl = catalog.find(b => b.selfLocking && b.length >= best.length && b.width >= best.width && b.height >= best.height);
  if (!sl) return null;
  return buildTCO(sl, best, inputs);
}

function buildTCO(sl: BoxSpec, am: BoxSpec, inputs: TCOInputs): TCOComparison {
  const costPerSecond = inputs.hourlyLaborCost / 3600;
  const laborDeltaSeconds = am.assemblyTimeSeconds - sl.assemblyTimeSeconds;
  const laborSavings = +(laborDeltaSeconds * costPerSecond).toFixed(2);
  const materialDelta = +(sl.price - am.price).toFixed(2);
  const tapeSavings = +inputs.tapeCostPerPack.toFixed(2);
  const netSavings = +(laborSavings + tapeSavings - materialDelta).toFixed(2);
  return { selfLocking: sl, americana: am, materialDelta, laborDeltaSeconds, laborSavings, tapeSavings, netSavings };
}

// ----- SOP Steps -----------------------------------------------------------

export interface SopStep {
  index: number;
  title: string;
  description: string;
  itemIds: string[];
}

export function buildSopSteps(result: BoxResult, filler: FillerChoice): SopStep[] {
  const sorted = [...result.placements].sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);
  // Group by Z layer
  const layers = new Map<number, Placed[]>();
  for (const p of sorted) {
    const key = Math.round(p.z);
    if (!layers.has(key)) layers.set(key, []);
    layers.get(key)!.push(p);
  }
  const steps: SopStep[] = [];
  let i = 1;
  steps.push({ index: i++, title: 'Assembla la scatola', description: `Monta ${result.box.name}. ${result.box.assemblyTimeSeconds}s previsti.`, itemIds: [] });
  steps.push({ index: i++, title: 'Base protettiva', description: `Stendi uno strato di ${filler.filler.name} sul fondo.`, itemIds: [] });
  Array.from(layers.entries()).sort((a, b) => a[0] - b[0]).forEach(([z, items]) => {
    steps.push({
      index: i++,
      title: `Layer a ${z}cm`,
      description: items.map(it => `Posiziona ${it.name} a (X:${it.x}, Y:${it.y}) — ${it.l}×${it.w}×${it.h}cm`).join(' · '),
      itemIds: items.map(it => it.itemId),
    });
  });
  steps.push({ index: i++, title: 'Riempi i vuoti', description: `~${filler.volumeLiters}L di ${filler.filler.name} per stabilizzare il carico.`, itemIds: [] });
  steps.push({ index: i++, title: 'Chiusura', description: 'Sigilla con nastro e applica etichetta FRAGILE sui lati corti.', itemIds: [] });
  return steps;
}
