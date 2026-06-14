import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { ArrowRight, RotateCcw, Package, Layers, TrendingDown, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Category = 'tape' | 'film';

type TapeType = 'acrilico' | 'gomma' | 'hotmelt' | 'carta' | 'altro';
type FilmType = 'standard' | 'prestirato' | 'macchinabile' | 'altro';

interface TapeState {
  type: TapeType;
  boxesPerMonth: number;
  wraps: number;
  pricePerRoll: number;
  damageRate: number; // %
}

interface FilmState {
  type: FilmType;
  palletsPerMonth: number;
  pricePerRoll: number;
  damageRate: number; // %
}

// Constants
const TAPE_METERS_PER_ROLL = 66;
const TAPE_METERS_PER_WRAP = 0.8;
const TAPE_SECONDS_PER_WRAP = 2;
const TAPE_DAMAGE_COST = 20; // € per damaged box
const FILM_STANDARD_G_PER_PALLET = 400;
const FILM_PRESTRETCHED_G_PER_PALLET = 150;
const FILM_DAMAGE_COST = 200; // € per damaged pallet
const LABOR_COST_PER_HOUR = 15;
const FILM_SECONDS_PER_PALLET = 45; // baseline manual wrap time
const FILM_PRESTRETCHED_SECONDS = 30;

const eur = (n: number) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

type Scenario = 'A' | 'B' | 'C';

interface Result {
  scenario: Scenario;
  title: string;
  message: string;
  recommendation: string;
  current: { material: number; labor: number; damage: number; total: number };
  optimized: { material: number; labor: number; damage: number; total: number };
  yearlySaving: number;
}

function computeTape(s: TapeState): Result {
  const months = 12;
  // Current
  const wrapsPerBox = s.wraps;
  const metersPerBox = wrapsPerBox * TAPE_METERS_PER_WRAP;
  const rollsPerMonth = (s.boxesPerMonth * metersPerBox) / TAPE_METERS_PER_ROLL;
  const materialMonthly = rollsPerMonth * s.pricePerRoll;
  const laborMonthly = (s.boxesPerMonth * wrapsPerBox * TAPE_SECONDS_PER_WRAP / 3600) * LABOR_COST_PER_HOUR;
  const damagedBoxes = s.boxesPerMonth * (s.damageRate / 100);
  const damageMonthly = damagedBoxes * TAPE_DAMAGE_COST;

  const current = {
    material: materialMonthly * months,
    labor: laborMonthly * months,
    damage: damageMonthly * months,
    total: 0,
  };
  current.total = current.material + current.labor + current.damage;

  // Scenario detection
  let scenario: Scenario = 'B';
  if (s.damageRate > 2) scenario = 'C';
  else if (s.wraps > 1 || (s.type === 'acrilico' && s.damageRate > 1)) scenario = 'A';
  else if (s.wraps === 1 && s.damageRate < 1 && (s.type === 'gomma' || s.type === 'hotmelt')) scenario = 'B';
  else scenario = 'A';

  let optMaterial = current.material;
  let optLabor = current.labor;
  let optDamage = current.damage;
  let title = '';
  let message = '';
  let recommendation = '';

  if (scenario === 'A') {
    // Drop wraps to 1, damages to 0.2%, price +20%
    const newWraps = 1;
    const newMetersPerBox = newWraps * TAPE_METERS_PER_WRAP;
    const newRollsPerMonth = (s.boxesPerMonth * newMetersPerBox) / TAPE_METERS_PER_ROLL;
    const newPrice = s.pricePerRoll * 1.2;
    optMaterial = newRollsPerMonth * newPrice * months;
    optLabor = (s.boxesPerMonth * newWraps * TAPE_SECONDS_PER_WRAP / 3600) * LABOR_COST_PER_HOUR * months;
    optDamage = s.boxesPerMonth * 0.002 * TAPE_DAMAGE_COST * months;
    title = 'Upgrade tecnico consigliato';
    message = 'Passando a un nastro tecnico riduci manodopera e resi: un solo giro tiene quello che oggi ne richiede due o tre.';
    recommendation = 'Nastro Gomma Naturale alta tenacità';
  } else if (scenario === 'B') {
    // Price -12%, keep labor and damages constant
    optMaterial = current.material * 0.88;
    title = 'Setup tecnicamente corretto';
    message = 'Il tuo processo è tecnicamente corretto. Possiamo ottimizzare il costo di fornitura mantenendo lo stesso livello di prestazione.';
    recommendation = 'Stessa specifica, prezzo benchmark di mercato (-12%)';
  } else {
    // C: High risk – premium product +25%, damages → 0.3%, wraps to 1
    const newWraps = 1;
    const newMetersPerBox = newWraps * TAPE_METERS_PER_WRAP;
    const newRollsPerMonth = (s.boxesPerMonth * newMetersPerBox) / TAPE_METERS_PER_ROLL;
    const newPrice = s.pricePerRoll * 1.25;
    optMaterial = newRollsPerMonth * newPrice * months;
    optLabor = (s.boxesPerMonth * newWraps * TAPE_SECONDS_PER_WRAP / 3600) * LABOR_COST_PER_HOUR * months;
    optDamage = s.boxesPerMonth * 0.003 * TAPE_DAMAGE_COST * months;
    title = 'Configurazione ad alto rischio';
    message = 'Il tasso di danni attuale è un\'emorragia finanziaria: un nastro high-tack elimina la causa, non il sintomo.';
    recommendation = 'Nastro Hot Melt high-tack premium';
  }

  const optimized = { material: optMaterial, labor: optLabor, damage: optDamage, total: optMaterial + optLabor + optDamage };
  return {
    scenario, title, message, recommendation,
    current, optimized,
    yearlySaving: current.total - optimized.total,
  };
}

function computeFilm(s: FilmState): Result {
  const months = 12;
  const isPrestretched = s.type === 'prestirato';
  const gPerPallet = isPrestretched ? FILM_PRESTRETCHED_G_PER_PALLET : FILM_STANDARD_G_PER_PALLET;
  // Assume 1 bobina = 15kg di film netto
  const KG_PER_ROLL = 15;
  const kgPerMonth = (s.palletsPerMonth * gPerPallet) / 1000;
  const rollsPerMonth = kgPerMonth / KG_PER_ROLL;
  const materialMonthly = rollsPerMonth * s.pricePerRoll;
  const secondsPerPallet = isPrestretched ? FILM_PRESTRETCHED_SECONDS : FILM_SECONDS_PER_PALLET;
  const laborMonthly = (s.palletsPerMonth * secondsPerPallet / 3600) * LABOR_COST_PER_HOUR;
  const damageMonthly = s.palletsPerMonth * (s.damageRate / 100) * FILM_DAMAGE_COST;

  const current = {
    material: materialMonthly * months,
    labor: laborMonthly * months,
    damage: damageMonthly * months,
    total: 0,
  };
  current.total = current.material + current.labor + current.damage;

  let scenario: Scenario = 'B';
  if (s.damageRate > 2) scenario = 'C';
  else if (s.type === 'standard') scenario = 'A';
  else if (s.type === 'prestirato' && s.damageRate < 1) scenario = 'B';
  else scenario = 'A';

  let optMaterial = current.material;
  let optLabor = current.labor;
  let optDamage = current.damage;
  let title = '';
  let message = '';
  let recommendation = '';

  if (scenario === 'A') {
    // Switch to pre-stretched: -60% film weight, damages → 0.2%, price +20%
    const newKgPerMonth = (s.palletsPerMonth * FILM_PRESTRETCHED_G_PER_PALLET) / 1000;
    const newRolls = newKgPerMonth / KG_PER_ROLL;
    const newPrice = s.pricePerRoll * 1.2;
    optMaterial = newRolls * newPrice * months;
    optLabor = (s.palletsPerMonth * FILM_PRESTRETCHED_SECONDS / 3600) * LABOR_COST_PER_HOUR * months;
    optDamage = s.palletsPerMonth * 0.002 * FILM_DAMAGE_COST * months;
    title = 'Upgrade a film pre-stirato';
    message = 'Il film standard richiede ~400g a pallet: con un pre-stirato scendi a ~150g a parità di tenuta. Meno peso, meno fatica, meno danni.';
    recommendation = 'Film Pre-stirato Manuale 17 µm';
  } else if (scenario === 'B') {
    optMaterial = current.material * 0.88;
    title = 'Setup tecnicamente corretto';
    message = 'Il tuo processo è tecnicamente corretto. Possiamo ottimizzare il costo di fornitura mantenendo lo stesso livello di prestazione.';
    recommendation = 'Stessa specifica, prezzo benchmark di mercato (-12%)';
  } else {
    const newKgPerMonth = (s.palletsPerMonth * FILM_PRESTRETCHED_G_PER_PALLET) / 1000;
    const newRolls = newKgPerMonth / KG_PER_ROLL;
    const newPrice = s.pricePerRoll * 1.25;
    optMaterial = newRolls * newPrice * months;
    optLabor = (s.palletsPerMonth * FILM_PRESTRETCHED_SECONDS / 3600) * LABOR_COST_PER_HOUR * months;
    optDamage = s.palletsPerMonth * 0.003 * FILM_DAMAGE_COST * months;
    title = 'Configurazione ad alto rischio';
    message = 'Il tasso di ribaltamenti è critico: un film tecnico ad alta memoria elastica stabilizza il carico ed elimina i resi.';
    recommendation = 'Film Pre-stirato Performance + collante adesivo';
  }

  const optimized = { material: optMaterial, labor: optLabor, damage: optDamage, total: optMaterial + optLabor + optDamage };
  return {
    scenario, title, message, recommendation,
    current, optimized,
    yearlySaving: current.total - optimized.total,
  };
}

export default function TcoCalculator() {
  const [category, setCategory] = useState<Category | null>(null);

  const [tape, setTape] = useState<TapeState>({
    type: 'acrilico',
    boxesPerMonth: 5000,
    wraps: 2,
    pricePerRoll: 1.5,
    damageRate: 1.5,
  });

  const [film, setFilm] = useState<FilmState>({
    type: 'standard',
    palletsPerMonth: 500,
    pricePerRoll: 45,
    damageRate: 1.5,
  });

  const result = useMemo<Result | null>(() => {
    if (category === 'tape') return computeTape(tape);
    if (category === 'film') return computeFilm(film);
    return null;
  }, [category, tape, film]);

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: 'Costo Attuale',
        Materiale: Math.round(result.current.material),
        Manodopera: Math.round(result.current.labor),
        Danni: Math.round(result.current.damage),
      },
      {
        name: 'Costo Ottimizzato',
        Materiale: Math.round(result.optimized.material),
        Manodopera: Math.round(result.optimized.labor),
        Danni: Math.round(result.optimized.damage),
      },
    ];
  }, [result]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24 px-5">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-light mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#servizi" className="hover:text-primary transition-colors">Servizi</Link>
            <span>/</span>
            <span className="text-foreground">Calcolatore TCO</span>
          </nav>

          <div className="mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Calcolatore TCO</p>
            <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[0.04em] mb-4 leading-tight">
              Quanto ti costa davvero il tuo imballaggio?
            </h1>
            <p className="text-muted-foreground text-[15px] font-light leading-relaxed max-w-2xl">
              Total Cost of Ownership: calcoliamo materiale, manodopera e danni nascosti.
              Poi mostriamo, con i numeri, dove puoi ottimizzare — con un upgrade tecnico o con un prezzo migliore.
            </p>
          </div>

          {/* Step 1: Category */}
          {!category && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {[
                { key: 'tape' as const, title: 'Nastro Adesivo', desc: 'Sigillatura scatole, ecommerce, magazzino.', icon: Package },
                { key: 'film' as const, title: 'Film Estensibile', desc: 'Stabilizzazione pallet e carichi.', icon: Layers },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className="group text-left bg-white border border-border/40 rounded-3xl p-8 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.25)]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[16px] font-normal mb-2">{c.title}</h3>
                    <p className="text-[13px] text-muted-foreground font-light leading-relaxed mb-5">{c.desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase font-light text-foreground/60 group-hover:text-primary transition-colors">
                      Calcola TCO <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2 */}
          {category && result && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left: inputs */}
              <div className="lg:col-span-2 bg-white border border-border/40 rounded-3xl p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[14px] tracking-[0.14em] uppercase font-light">
                    {category === 'tape' ? 'Nastro Adesivo' : 'Film Estensibile'}
                  </h2>
                  <button
                    onClick={() => setCategory(null)}
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase font-light text-muted-foreground hover:text-primary transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Categoria
                  </button>
                </div>

                {category === 'tape' ? (
                  <div className="space-y-7">
                    <Field label="Tipologia attuale">
                      <Select value={tape.type} onValueChange={(v) => setTape({ ...tape, type: v as TapeType })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acrilico">Acrilico</SelectItem>
                          <SelectItem value="gomma">Gomma Naturale</SelectItem>
                          <SelectItem value="hotmelt">Hot Melt</SelectItem>
                          <SelectItem value="carta">Carta</SelectItem>
                          <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <SliderField
                      label="Scatole spedite al mese"
                      value={tape.boxesPerMonth}
                      min={100} max={50000} step={100}
                      format={(v) => v.toLocaleString('it-IT')}
                      onChange={(v) => setTape({ ...tape, boxesPerMonth: v })}
                    />

                    <SliderField
                      label="Giri di nastro per scatola"
                      value={tape.wraps}
                      min={1} max={3} step={1}
                      format={(v) => `${v}${v === 3 ? '+' : ''}`}
                      onChange={(v) => setTape({ ...tape, wraps: v })}
                    />

                    <Field label="Prezzo a rotolo (€)">
                      <Input
                        type="number" min={0} step={0.1}
                        value={tape.pricePerRoll}
                        onChange={(e) => setTape({ ...tape, pricePerRoll: Number(e.target.value) || 0 })}
                      />
                    </Field>

                    <SliderField
                      label="Scatole danneggiate / aperte"
                      value={tape.damageRate}
                      min={0} max={5} step={0.1}
                      format={(v) => `${v.toFixed(1)} %`}
                      onChange={(v) => setTape({ ...tape, damageRate: v })}
                    />
                  </div>
                ) : (
                  <div className="space-y-7">
                    <Field label="Tipologia attuale">
                      <Select value={film.type} onValueChange={(v) => setFilm({ ...film, type: v as FilmType })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Manuale</SelectItem>
                          <SelectItem value="prestirato">Pre-stirato Manuale</SelectItem>
                          <SelectItem value="macchinabile">Macchinabile</SelectItem>
                          <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <SliderField
                      label="Pallet spediti al mese"
                      value={film.palletsPerMonth}
                      min={50} max={10000} step={50}
                      format={(v) => v.toLocaleString('it-IT')}
                      onChange={(v) => setFilm({ ...film, palletsPerMonth: v })}
                    />

                    <Field label="Prezzo a bobina (€)">
                      <Input
                        type="number" min={0} step={0.5}
                        value={film.pricePerRoll}
                        onChange={(e) => setFilm({ ...film, pricePerRoll: Number(e.target.value) || 0 })}
                      />
                    </Field>

                    <SliderField
                      label="Pallet danneggiati / ribaltati"
                      value={film.damageRate}
                      min={0} max={5} step={0.1}
                      format={(v) => `${v.toFixed(1)} %`}
                      onChange={(v) => setFilm({ ...film, damageRate: v })}
                    />
                  </div>
                )}
              </div>

              {/* Right: results */}
              <div className="lg:col-span-3 space-y-5">
                <div className={`rounded-3xl p-7 border ${
                  result.scenario === 'C'
                    ? 'bg-red-50/60 border-red-200/60'
                    : result.scenario === 'A'
                      ? 'bg-emerald-50/60 border-emerald-200/60'
                      : 'bg-primary/5 border-primary/20'
                }`}>
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-light text-muted-foreground mb-3">
                    {result.scenario === 'C' ? <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> :
                      result.scenario === 'B' ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> :
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                    {result.title}
                  </div>

                  <p className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground font-light mb-1">
                    Risparmio Potenziale Annuo
                  </p>
                  <p className={`text-[clamp(2.2rem,4.5vw,3.4rem)] font-light tracking-tight leading-none mb-4 ${
                    result.yearlySaving > 0 ? 'text-emerald-700' : 'text-foreground'
                  }`}>
                    {eur(result.yearlySaving)}
                  </p>
                  <p className="text-[14px] font-light leading-relaxed text-foreground/80 max-w-xl">
                    {result.message}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-light bg-white/70 rounded-full px-3 py-1.5 border border-border/40">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    Soluzione: {result.recommendation}
                  </div>
                </div>

                <div className="bg-white border border-border/40 rounded-3xl p-7">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[13px] tracking-[0.14em] uppercase font-light">Costo Annuo: scomposizione</h3>
                    <div className="flex items-center gap-3 text-[11px] font-light text-muted-foreground">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />Materiale</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />Manodopera</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500" />Danni</span>
                    </div>
                  </div>

                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} />
                        <Tooltip
                          formatter={(v: number) => eur(v)}
                          contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 12 }}
                        />
                        <Legend wrapperStyle={{ display: 'none' }} />
                        <Bar dataKey="Materiale" stackId="a" fill="#94a3b8" radius={[0,0,0,0]} />
                        <Bar dataKey="Manodopera" stackId="a" fill="#fbbf24" radius={[0,0,0,0]} />
                        <Bar dataKey="Danni" stackId="a" radius={[8,8,0,0]}>
                          {chartData.map((_, i) => (
                            <Cell key={i} fill="#ef4444" />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 text-center">
                    <div className="rounded-2xl bg-red-50/60 border border-red-200/40 p-4">
                      <p className="text-[10px] tracking-[0.18em] uppercase font-light text-muted-foreground mb-1">Costo Attuale</p>
                      <p className="text-[18px] font-light text-red-700">{eur(result.current.total)}</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/40 p-4">
                      <p className="text-[10px] tracking-[0.18em] uppercase font-light text-muted-foreground mb-1">Costo Ottimizzato</p>
                      <p className="text-[18px] font-light text-emerald-700">{eur(result.optimized.total)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-foreground text-background rounded-3xl p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-[15px] font-normal mb-1">Vuoi una verifica reale sui tuoi consumi?</h3>
                    <p className="text-[13px] font-light opacity-80">Ti inviamo un campione e un'analisi TCO sui tuoi dati di spedizione.</p>
                  </div>
                  <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                    <Link to="/#contatti">Richiedi Analisi e Campionatura</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-light mb-2">{label}</label>
      {children}
    </div>
  );
}

function SliderField({
  label, value, min, max, step, format, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-light">{label}</label>
        <span className="text-[13px] font-normal tabular-nums">{format(value)}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}
