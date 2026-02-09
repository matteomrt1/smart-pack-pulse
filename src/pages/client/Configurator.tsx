import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PackagingInput, MaterialSuggestion } from '@/types';
import { mockProducts } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Package, Leaf, Check, Box, Shield, Tape } from 'lucide-react';
import { PackagingSchema2D } from '@/components/configurator/PackagingSchema2D';

const steps = [
  { id: 1, title: 'Prodotto', description: 'Inserisci i dati del prodotto' },
  { id: 2, title: 'Suggerimenti AI', description: 'Mix ottimale di materiali' },
  { id: 3, title: 'Schema 2D', description: 'Visualizzazione del pacco' },
  { id: 4, title: 'Riepilogo', description: 'Costi e impatto ambientale' },
];

function generateMockSuggestions(input: PackagingInput): MaterialSuggestion[] {
  const suggestions: MaterialSuggestion[] = [];

  // Box suggestion based on size
  if (input.length <= 40 && input.width <= 30 && input.height <= 30) {
    suggestions.push({ productId: 'b1', productName: 'Scatola Americana 40×30×30', category: 'boxes', quantity: 1, unit: 'pz', reason: 'Dimensione ottimale con margine protettivo', ecoFriendly: true });
  } else {
    suggestions.push({ productId: 'b2', productName: 'Scatola Americana 60×40×40', category: 'boxes', quantity: 1, unit: 'pz', reason: 'Scatola grande adeguata alle dimensioni', ecoFriendly: true });
  }

  // Protection based on fragility
  if (input.fragility >= 4) {
    suggestions.push({ productId: 'p3', productName: 'Schiuma PE Espanso', category: 'protective', quantity: Math.round((input.length * input.width * 2 + input.length * input.height * 2) / 10000 * 10) / 10, unit: 'm²', reason: `Protezione alta per fragilità ${input.fragility}/5`, ecoFriendly: false });
    suggestions.push({ productId: 'p4', productName: 'Patatine Biodegradabili', category: 'protective', quantity: Math.round(input.length * input.width * input.height / 5000), unit: 'L', reason: 'Riempimento vuoti interni', ecoFriendly: true });
  } else if (input.fragility >= 2) {
    suggestions.push({ productId: 'p1', productName: 'Pluriball Standard', category: 'protective', quantity: Math.round((input.length * input.width * 2) / 10000 * 10) / 10, unit: 'm²', reason: `Protezione media per fragilità ${input.fragility}/5`, ecoFriendly: false, ecoAlternative: { productName: 'Carta Kraft Imbottitura', co2Saved: 120 } });
  } else {
    suggestions.push({ productId: 'p2', productName: 'Carta Kraft Imbottitura', category: 'protective', quantity: Math.round((input.length * input.width) / 10000 * 10) / 10, unit: 'm²', reason: 'Protezione leggera sufficiente', ecoFriendly: true });
  }

  // Tape based on weight
  if (input.weight > 10) {
    suggestions.push({ productId: 't3', productName: 'Reggetta PP', category: 'tapes', quantity: 1, unit: 'rotolo', reason: `Reggettatura necessaria per peso ${input.weight}kg`, ecoFriendly: false });
  }
  suggestions.push({ productId: 't1', productName: 'Nastro Adesivo PP', category: 'tapes', quantity: 1, unit: 'rotolo', reason: 'Chiusura standard del pacco', ecoFriendly: false, ecoAlternative: { productName: 'Nastro Carta Kraft', co2Saved: 45 } });

  return suggestions;
}

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<PackagingInput>({
    length: 30, width: 20, height: 15, weight: 2.5, fragility: 3, productType: 'Elettronica'
  });
  const [suggestions, setSuggestions] = useState<MaterialSuggestion[]>([]);

  const handleNext = () => {
    if (step === 1) {
      setSuggestions(generateMockSuggestions(input));
    }
    setStep(s => Math.min(s + 1, 4));
  };

  const totalCost = suggestions.reduce((sum, s) => {
    const product = mockProducts.find(p => p.id === s.productId);
    return sum + (product ? product.price * s.quantity : 0);
  }, 0);

  const totalCo2 = suggestions.reduce((sum, s) => sum + (s.ecoAlternative?.co2Saved || 0), 0);

  const catIcon = (cat: string) => {
    if (cat === 'boxes') return <Box className="w-4 h-4" />;
    if (cat === 'protective') return <Shield className="w-4 h-4" />;
    return <Tape className="w-4 h-4" />;
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuratore Imballaggio</h1>
        <p className="text-muted-foreground mt-1">Trova il mix perfetto di materiali per il tuo prodotto</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors',
              step > s.id ? 'bg-accent text-accent-foreground' :
              step === s.id ? 'bg-primary text-primary-foreground' :
              'bg-secondary text-muted-foreground'
            )}>
              {step > s.id ? <Check className="w-4 h-4" /> : s.id}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium">{s.title}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('h-px flex-1', step > s.id ? 'bg-accent' : 'bg-border')} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Dati del prodotto</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Lunghezza (cm)</Label>
                  <Input type="number" value={input.length} onChange={e => setInput({ ...input, length: +e.target.value })} />
                </div>
                <div>
                  <Label>Profondità (cm)</Label>
                  <Input type="number" value={input.width} onChange={e => setInput({ ...input, width: +e.target.value })} />
                </div>
                <div>
                  <Label>Altezza (cm)</Label>
                  <Input type="number" value={input.height} onChange={e => setInput({ ...input, height: +e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Peso (kg)</Label>
                  <Input type="number" step="0.1" value={input.weight} onChange={e => setInput({ ...input, weight: +e.target.value })} />
                </div>
                <div>
                  <Label>Tipo di prodotto</Label>
                  <Input value={input.productType} onChange={e => setInput({ ...input, productType: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Fragilità: {input.fragility}/5</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => setInput({ ...input, fragility: level })}
                      className={cn(
                        'w-10 h-10 rounded-md text-sm font-semibold transition-colors',
                        input.fragility >= level
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Suggerimenti AI</h2>
              <p className="text-sm text-muted-foreground">
                In base a {input.length}×{input.width}×{input.height}cm, {input.weight}kg, fragilità {input.fragility}/5
              </p>
              <div className="space-y-3">
                {suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                      {catIcon(s.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{s.productName}</span>
                        {s.ecoFriendly && (
                          <Badge className="bg-accent/10 text-accent border-0 text-xs">
                            <Leaf className="w-3 h-3 mr-1" /> Eco
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{s.reason}</p>
                      <p className="text-sm font-semibold mt-1">{s.quantity} {s.unit}</p>
                      {s.ecoAlternative && (
                        <div className="mt-2 p-2 bg-accent/5 rounded border border-accent/20 text-xs">
                          <Leaf className="w-3 h-3 inline mr-1 text-accent" />
                          Alternativa eco: <strong>{s.ecoAlternative.productName}</strong> — risparmi {s.ecoAlternative.co2Saved}g CO₂
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Schema 2D del Pacco</h2>
              <PackagingSchema2D input={input} suggestions={suggestions} />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-lg">Riepilogo Configurazione</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Costo Stimato</p>
                    <p className="text-3xl font-bold mt-1">€{totalCost.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">CO₂ Risparmiabile</p>
                    <p className="text-3xl font-bold mt-1 text-accent">{totalCo2}g</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-3">Lista Materiali</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-3 font-medium">Materiale</th>
                        <th className="text-left p-3 font-medium">Quantità</th>
                        <th className="text-right p-3 font-medium">Prezzo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suggestions.map((s, i) => {
                        const product = mockProducts.find(p => p.id === s.productId);
                        return (
                          <tr key={i} className="border-t">
                            <td className="p-3 flex items-center gap-2">
                              {s.productName}
                              {s.ecoFriendly && <Leaf className="w-3 h-3 text-accent" />}
                            </td>
                            <td className="p-3">{s.quantity} {s.unit}</td>
                            <td className="p-3 text-right">€{product ? (product.price * s.quantity).toFixed(2) : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex gap-3">
                <Button>Salva Configurazione</Button>
                <Button variant="outline">Richiedi Preventivo</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => Math.max(s - 1, 1))} disabled={step === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Indietro
        </Button>
        {step < 4 && (
          <Button onClick={handleNext}>
            Avanti <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
