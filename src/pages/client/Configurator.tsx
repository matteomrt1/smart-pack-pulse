import { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Package, Brain, ClipboardList, Calculator, Download, Sparkles, TrendingDown, AlertTriangle } from 'lucide-react';
import {
  BOX_CATALOG, FILLER_CATALOG, RISK_BASELINE,
  pack, selectFiller, assessRisk, compareTCO, buildSopSteps,
  type PackItem, type RiskCategory,
} from '@/lib/packEngine';
import { SopStepViewer } from '@/components/configurator/SopStepViewer';

type DraftItem = Omit<PackItem, 'id'> & { id: string };

const blank = (): DraftItem => ({
  id: crypto.randomUUID(),
  name: 'Articolo',
  length: 20, width: 15, height: 10,
  weight: 1,
  category: 'electronics',
  orientation: 'free',
  nestable: false,
  quantity: 1,
  unitValue: 100,
});

export default function Configurator() {
  const [items, setItems] = useState<DraftItem[]>([blank()]);
  const [prefersEco, setPrefersEco] = useState(true);
  const [tcoEnabled, setTcoEnabled] = useState(false);
  const [hourlyLaborCost, setHourlyLaborCost] = useState(15);
  const [tapeCostPerPack, setTapeCostPerPack] = useState(0.18);

  const update = (id: string, patch: Partial<DraftItem>) =>
    setItems(items.map(i => i.id === id ? { ...i, ...patch } : i));
  const remove = (id: string) => setItems(items.filter(i => i.id !== id));

  const result = useMemo(() => pack(items as PackItem[]), [items]);
  const best = result.best;
  const filler = useMemo(() => best ? selectFiller(best, prefersEco) : null, [best, prefersEco]);
  const primaryCategory: RiskCategory = items[0]?.category ?? 'electronics';
  const avgOrderValue = items.reduce((s, i) => s + (i.unitValue ?? 0) * i.quantity, 0) || 100;
  const risk = useMemo(() => filler ? assessRisk(primaryCategory, filler.filler, avgOrderValue) : null, [filler, primaryCategory, avgOrderValue]);
  const tco = useMemo(() => (tcoEnabled && best) ? compareTCO(best.box, BOX_CATALOG, { hourlyLaborCost, tapeCostPerPack }) : null, [tcoEnabled, best, hourlyLaborCost, tapeCostPerPack]);
  const sopSteps = useMemo(() => (best && filler) ? buildSopSteps(best, filler) : [], [best, filler]);

  const exportSopPdf = () => {
    if (!best || !filler) return;
    const doc = new jsPDF();
    const orderId = `PB-${Date.now().toString(36).toUpperCase()}`;
    doc.setFontSize(18);
    doc.text('Packing SOP', 14, 18);
    doc.setFontSize(10);
    doc.text(`Ordine: ${orderId}`, 14, 26);
    doc.text(`Scatola: ${best.box.name} (${best.box.id})`, 14, 32);
    doc.text(`Void ratio: ${(best.voidRatio * 100).toFixed(1)}% — Peso: ${best.totalWeight.toFixed(2)}kg`, 14, 38);
    doc.text(`Filler: ${filler.filler.name} — ${filler.volumeLiters}L`, 14, 44);

    doc.setFontSize(12); doc.text('Materiali da prelevare', 14, 56);
    doc.setFontSize(10);
    let y = 62;
    [`• Scatola ${best.box.name} ×1`, `• ${filler.filler.name} ~${filler.volumeLiters}L`, '• Nastro PP / etichette FRAGILE'].forEach(line => {
      doc.text(line, 14, y); y += 6;
    });

    y += 4;
    doc.setFontSize(12); doc.text('Sequenza di assemblaggio', 14, y); y += 8;
    doc.setFontSize(10);
    sopSteps.forEach(s => {
      const lines = doc.splitTextToSize(`${s.index}. ${s.title} — ${s.description}`, 180);
      if (y + lines.length * 5 > 280) { doc.addPage(); y = 18; }
      doc.text(lines, 14, y); y += lines.length * 5 + 2;
    });

    y += 4;
    doc.setFontSize(12); doc.text('Avvertenze', 14, y); y += 6;
    doc.setFontSize(10);
    doc.text('Applicare nastro FRAGILE sui lati corti. Non impilare oltre 2 livelli.', 14, y);

    // simple barcode-like footer
    doc.setFillColor(0, 0, 0);
    for (let i = 0; i < 60; i++) {
      const w = (i % 3 === 0) ? 1.4 : 0.6;
      doc.rect(14 + i * 2, 285, w, 8, 'F');
    }
    doc.setFontSize(8); doc.text(orderId, 14, 298);

    doc.save(`packing-sop-${orderId}.pdf`);
  };

  return (
    <div className="px-6 md:px-12 py-10 md:py-14 max-w-6xl mx-auto space-y-10">
      <header className="space-y-3 max-w-3xl">
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground font-light">
          Area Cliente · PackConfig Engine
        </span>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">
          Packaging & Logistics Optimization
        </h1>
        <p className="text-sm text-muted-foreground font-light leading-relaxed">
          Inserisci uno o più articoli: l&apos;engine esegue un <strong className="font-medium text-foreground">3D Bin Packing</strong> sul catalogo scatole,
          minimizza il <strong className="font-medium text-foreground">Void Ratio</strong>, predice il rischio di rottura e genera una
          <strong className="font-medium text-foreground"> SOP operativa</strong> per il magazzino.
        </p>
      </header>

      {/* ─── INPUT ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead icon={<Package className="w-4 h-4" />} label="01 · Articoli dell'ordine"
          title="Data model degli articoli"
          subtitle="Dimensioni, peso, vincoli di orientamento e nidificabilità." />

        <div className="space-y-3">
          {items.map((it, idx) => (
            <Card key={it.id}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <Input value={it.name} onChange={e => update(it.id, { name: e.target.value })}
                    className="max-w-xs font-medium" />
                  <Button variant="ghost" size="icon" onClick={() => remove(it.id)} disabled={items.length === 1}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {(['length','width','height'] as const).map(k => (
                    <Field key={k} label={`${k === 'length' ? 'L' : k === 'width' ? 'P' : 'H'} (cm)`}>
                      <Input type="number" value={it[k]} onChange={e => update(it.id, { [k]: +e.target.value } as any)} />
                    </Field>
                  ))}
                  <Field label="Peso (kg)">
                    <Input type="number" step="0.1" value={it.weight} onChange={e => update(it.id, { weight: +e.target.value })} />
                  </Field>
                  <Field label="Quantità">
                    <Input type="number" min={1} value={it.quantity} onChange={e => update(it.id, { quantity: Math.max(1, +e.target.value) })} />
                  </Field>
                  <Field label="Valore medio (€)">
                    <Input type="number" value={it.unitValue} onChange={e => update(it.id, { unitValue: +e.target.value })} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Categoria merceologica">
                    <Select value={it.category} onValueChange={(v) => update(it.id, { category: v as RiskCategory })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(RISK_BASELINE).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v.label} · baseline {(v.baseline * 100).toFixed(1)}%</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Orientamento">
                    <Select value={it.orientation} onValueChange={(v) => update(it.id, { orientation: v as 'free' | 'upright' })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Libero (6 permutazioni)</SelectItem>
                        <SelectItem value="upright">Solo verticale (liquidi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Nidificabile">
                    <div className="flex items-center h-10 gap-2">
                      <Switch checked={it.nestable} onCheckedChange={c => update(it.id, { nestable: c })} />
                      <span className="text-xs text-muted-foreground">{it.nestable ? 'Sì' : 'No'}</span>
                    </div>
                  </Field>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={() => setItems([...items, blank()])} className="gap-2">
            <Plus className="w-4 h-4" /> Aggiungi articolo
          </Button>
        </div>
      </section>

      {/* ─── BIN PACKING ──────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead icon={<Sparkles className="w-4 h-4" />} label="02 · Core Engine"
          title="3D Bin Packing & Void Ratio"
          subtitle="L'algoritmo testa permutazioni di orientamento e ordina le scatole idonee per Void Ratio crescente." />

        {!best && (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">
            Nessuna scatola del catalogo riesce a contenere il set di articoli. Riduci le dimensioni o aggiungi una scatola al database.
          </CardContent></Card>
        )}

        {best && (
          <div className="grid md:grid-cols-3 gap-4">
            <MetricCard label="Scatola ottimale" value={best.box.name} accent />
            <MetricCard label="Void Ratio" value={`${(best.voidRatio * 100).toFixed(1)}%`} />
            <MetricCard label="Volume vuoto" value={`${best.voidVolumeLiters.toFixed(2)} L`} />
          </div>
        )}

        {result.candidates.length > 1 && (
          <Card>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light mb-3">Ranking candidati</p>
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-muted-foreground border-b">
                  <th className="py-2 font-medium">Scatola</th>
                  <th className="font-medium">Dim. interne</th>
                  <th className="font-medium">Void</th>
                  <th className="font-medium text-right">Prezzo</th>
                </tr></thead>
                <tbody>
                  {result.candidates.slice(0, 5).map((c, i) => (
                    <tr key={c.box.id} className={`border-b last:border-0 ${i === 0 ? 'bg-primary/5' : ''}`}>
                      <td className="py-2">{c.box.name} {i === 0 && <Badge variant="outline" className="ml-2 text-[10px]">best</Badge>}</td>
                      <td className="text-muted-foreground text-xs">{c.box.length}×{c.box.width}×{c.box.height}cm</td>
                      <td>{(c.voidRatio * 100).toFixed(1)}%</td>
                      <td className="text-right">€{c.box.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.rejected.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  {result.rejected.length} scatole scartate (portata o volume insufficienti).
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {filler && (
          <Card>
            <CardContent className="p-5 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">Materiale protettivo</p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="text-lg font-light tracking-tight">{filler.filler.name}</h4>
                  <p className="text-xs text-muted-foreground">{filler.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={prefersEco} onCheckedChange={setPrefersEco} />
                  <span className="text-xs text-muted-foreground">Preferisci eco</span>
                </div>
              </div>
              <div className="flex gap-6 pt-2 text-sm">
                <span><strong>{filler.volumeLiters}L</strong> richiesti</span>
                <span>Costo materiale: <strong>€{filler.cost.toFixed(2)}</strong></span>
                <Badge variant={filler.filler.density === 'high' ? 'default' : 'outline'} className="text-[10px]">
                  {filler.filler.density === 'high' ? 'alta densità' : 'bassa densità'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ─── RISK ─────────────────────────────────────────────── */}
      {risk && (
        <section className="space-y-4">
          <SectionHead icon={<Brain className="w-4 h-4" />} label="03 · Risk Prediction"
            title="AI-driven damage control"
            subtitle="Baseline statistica della categoria × mitigation factor del materiale protettivo selezionato." />
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">Probabilità di rottura</p>
                <RiskBar label="Carta Kraft (baseline)" value={risk.baselineProbability} tone="danger" />
                <RiskBar label={`${filler!.filler.name} (selezionato)`} value={risk.mitigatedProbability} tone="ok" />
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light flex items-center gap-2">
                  <TrendingDown className="w-3 h-3" /> Financial delta per pacco
                </p>
                <p className="text-3xl font-light tracking-tight">€{risk.savingsPerPackage.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  Perdita attesa con baseline: €{risk.expectedLossBaseline.toFixed(2)} → con upgrade: €{risk.expectedLossMitigated.toFixed(2)}.
                  Valore medio carrello: €{avgOrderValue.toFixed(2)}.
                </p>
                <Separator className="my-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Su <strong>1.000 spedizioni/mese</strong>: ROI stimato sui resi evitati ≈
                  <strong className="text-foreground"> €{(risk.savingsPerPackage * 1000).toFixed(0)}</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* ─── SOP ──────────────────────────────────────────────── */}
      {best && filler && (
        <section className="space-y-4">
          <SectionHead icon={<ClipboardList className="w-4 h-4" />} label="04 · SOP Generator"
            title="Sequenza operativa di Pick & Pack"
            subtitle="Coordinate spaziali (X, Y, Z) generate dal bin packing, rese in vista dall'alto layer-by-layer." />
          <SopStepViewer result={best} steps={sopSteps} />
          <Button onClick={exportSopPdf} className="gap-2">
            <Download className="w-4 h-4" /> Esporta Packing SOP (PDF)
          </Button>
        </section>
      )}

      {/* ─── TCO ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead icon={<Calculator className="w-4 h-4" />} label="05 · TCO & Labor Cost"
          title="Confronto Total Cost of Ownership"
          subtitle="Confronto tra scatola americana e automontante a parità di volume utile." />
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Switch checked={tcoEnabled} onCheckedChange={setTcoEnabled} />
              <span className="text-sm">Abilita modulo TCO</span>
            </div>
            {tcoEnabled && (
              <>
                <div className="grid md:grid-cols-2 gap-3">
                  <Field label="Costo orario manodopera (€/h)">
                    <Input type="number" value={hourlyLaborCost} onChange={e => setHourlyLaborCost(+e.target.value)} />
                  </Field>
                  <Field label="Costo nastro PP per pacco (€)">
                    <Input type="number" step="0.01" value={tapeCostPerPack} onChange={e => setTapeCostPerPack(+e.target.value)} />
                  </Field>
                </div>
                {tco ? (
                  <div className="rounded-2xl bg-muted/40 p-4 text-sm space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Confronto: <strong>{tco.americana.name}</strong> vs <strong>{tco.selfLocking.name}</strong> (automontante)
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>Δ materiale: <strong>{tco.materialDelta >= 0 ? '+' : ''}€{tco.materialDelta.toFixed(2)}</strong></li>
                      <li>Δ tempo assemblaggio: <strong>−{tco.laborDeltaSeconds}s</strong> → risparmio manodopera <strong>€{tco.laborSavings.toFixed(2)}</strong></li>
                      <li>Azzeramento nastro PP: <strong>€{tco.tapeSavings.toFixed(2)}</strong></li>
                    </ul>
                    <Separator />
                    <p className={tco.netSavings >= 0 ? 'text-emerald-600' : 'text-destructive'}>
                      Risparmio netto per pacco: <strong>€{tco.netSavings.toFixed(2)}</strong>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Nessun confronto disponibile per la scatola selezionata.
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground font-light">{label}</Label>
      {children}
    </div>
  );
}

function SectionHead({ icon, label, title, subtitle }: { icon: React.ReactNode; label: string; title: string; subtitle: string }) {
  return (
    <div className="space-y-2 max-w-3xl">
      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground font-light">
        <span className="inline-flex w-6 h-6 rounded-full bg-primary/10 text-primary items-center justify-center">{icon}</span>
        {label}
      </div>
      <h2 className="text-xl md:text-2xl font-light tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground font-light">{subtitle}</p>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card className={accent ? 'bg-primary/5 border-primary/20' : ''}>
      <CardContent className="p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground font-light">{label}</p>
        <p className="text-xl font-light tracking-tight mt-2">{value}</p>
      </CardContent>
    </Card>
  );
}

function RiskBar({ label, value, tone }: { label: string; value: number; tone: 'danger' | 'ok' }) {
  const pct = Math.min(100, value * 100 * 6); // visual scaling
  const color = tone === 'danger' ? 'bg-destructive' : 'bg-emerald-500';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{(value * 100).toFixed(2)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
