import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Feather, Package, PackageOpen,
  Square, Recycle, Layers,
  Warehouse, Snowflake, Droplets,
  Volume2, ShieldCheck, Wallet,
  ArrowLeft, RotateCcw, Check,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import tapeImg from '@/assets/p-p1.jpg';

type Answers = {
  weight?: 'leggero' | 'medio' | 'pesante';
  surface?: 'standard' | 'riciclato' | 'plastica';
  environment?: 'standard' | 'cella-frigo' | 'umidita';
  goal?: 'silenziosita' | 'antimanomissione' | 'costo';
};

type StepConfig = {
  key: keyof Answers;
  question: string;
  hint: string;
  options: { value: string; label: string; desc: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[];
};

const STEPS: StepConfig[] = [
  {
    key: 'weight',
    question: 'Quanto pesa il tuo pacco tipo?',
    hint: 'Determina la resistenza meccanica richiesta al nastro.',
    options: [
      { value: 'leggero', label: 'Leggero', desc: '0 – 5 kg', icon: Feather },
      { value: 'medio', label: 'Medio', desc: '5 – 15 kg', icon: Package },
      { value: 'pesante', label: 'Pesante', desc: 'oltre 15 kg', icon: PackageOpen },
    ],
  },
  {
    key: 'surface',
    question: 'Che tipo di superficie devi sigillare?',
    hint: 'Cartoni riciclati hanno fibre più corte: serve un adesivo specifico.',
    options: [
      { value: 'standard', label: 'Cartone standard', desc: 'Onda B/C nuova', icon: Square },
      { value: 'riciclato', label: 'Cartone riciclato', desc: 'Eco / fibre corte', icon: Recycle },
      { value: 'plastica', label: 'Plastica / liscia', desc: 'PE, PP, polietilene', icon: Layers },
    ],
  },
  {
    key: 'environment',
    question: 'In quale ambiente viaggia il pacco?',
    hint: 'Temperatura e umidità degradano gli adesivi acrilici standard.',
    options: [
      { value: 'standard', label: 'Standard', desc: 'Magazzino a temperatura ambiente', icon: Warehouse },
      { value: 'cella-frigo', label: 'Cella frigorifera', desc: 'Da 0°C fino a -20°C', icon: Snowflake },
      { value: 'umidita', label: 'Umidità elevata', desc: 'Spedizioni transoceaniche', icon: Droplets },
    ],
  },
  {
    key: 'goal',
    question: 'Qual è la tua priorità principale?',
    hint: 'Definisce il trade-off finale tra prestazione, sicurezza e costo.',
    options: [
      { value: 'silenziosita', label: 'Massima silenziosità', desc: 'Comfort acustico in magazzino', icon: Volume2 },
      { value: 'antimanomissione', label: 'Antimanomissione', desc: 'Sicurezza e tracciabilità', icon: ShieldCheck },
      { value: 'costo', label: 'Costo minimo', desc: 'Massima efficienza economica', icon: Wallet },
    ],
  },
];

type Recommendation = {
  name: string;
  tagline: string;
  image: string;
};

const PRODUCTS: Record<string, Recommendation> = {
  filament: { name: 'Nastro Rinforzato Filament', tagline: 'Filo di vetro longitudinale, tenuta industriale.', image: tapeImg },
  solvente: { name: 'Nastro in Gomma Naturale (Solvente)', tagline: 'Adesivo aggressivo per superfici critiche e basse temperature.', image: tapeImg },
  lownoise: { name: 'Nastro Acrilico Low-Noise', tagline: 'Srotolamento silenzioso, ideale in magazzini con personale.', image: tapeImg },
  void: { name: 'Nastro Antimanomissione VOID', tagline: 'Lascia traccia visibile in caso di apertura non autorizzata.', image: tapeImg },
  acrilico: { name: 'Nastro Acrilico Universale', tagline: 'Soluzione versatile, eccellente rapporto qualità/prezzo.', image: tapeImg },
};

function recommend(a: Answers): { product: Recommendation; whyKey: keyof typeof PRODUCTS } {
  if (a.weight === 'pesante') return { product: PRODUCTS.filament, whyKey: 'filament' };
  if (a.surface === 'riciclato' || a.environment === 'cella-frigo') return { product: PRODUCTS.solvente, whyKey: 'solvente' };
  if (a.goal === 'silenziosita') return { product: PRODUCTS.lownoise, whyKey: 'lownoise' };
  if (a.goal === 'antimanomissione') return { product: PRODUCTS.void, whyKey: 'void' };
  return { product: PRODUCTS.acrilico, whyKey: 'acrilico' };
}

function buildWhy(a: Answers, key: keyof typeof PRODUCTS): string[] {
  const bullets: string[] = [];
  if (key === 'filament') {
    bullets.push('Il filo di vetro distribuisce la tensione e regge oltre 15 kg senza cedere ai bordi.');
  }
  if (key === 'solvente') {
    if (a.environment === 'cella-frigo') bullets.push('Adesivo a base solvente che resta attivo fino a -20°C in cella frigorifera.');
    if (a.surface === 'riciclato') bullets.push('La gomma naturale penetra nelle fibre corte del cartone riciclato e crea presa immediata.');
  }
  if (key === 'lownoise') {
    bullets.push('Formulazione acrilica low-noise: srotolamento silenzioso anche in turni continui.');
  }
  if (key === 'void') {
    bullets.push('Pellicola tamper-evident: ogni tentativo di apertura lascia la scritta VOID indelebile.');
  }
  if (key === 'acrilico') {
    bullets.push('Acrilico universale ad alta adesività: copre il 90% degli scenari logistici standard.');
  }

  if (a.environment === 'umidita' && key !== 'solvente') {
    bullets.push('Resistenza all\'umidità prolungata: ideale per spedizioni transoceaniche.');
  }
  if (a.surface === 'plastica') {
    bullets.push('Eccellente adesione su superfici lisce in PE/PP grazie al primer integrato.');
  }
  if (a.goal === 'costo' && key === 'acrilico') {
    bullets.push('Miglior rapporto tenuta/prezzo del catalogo: riduzione consumo materiale fino al 30%.');
  }

  // garantiamo 3 bullet
  const fallbacks = [
    'Certificato per la chiusura di pacchi destinati a corriere espresso.',
    'Compatibile con applicazione manuale e nastratrice automatica.',
    'Disponibile in formati standard 50mm × 66m e personalizzati.',
  ];
  while (bullets.length < 3) {
    const f = fallbacks.shift();
    if (!f) break;
    bullets.push(f);
  }
  return bullets.slice(0, 3);
}

const ANSWER_LABELS: Record<string, string> = {
  leggero: 'Leggero (0–5 kg)', medio: 'Medio (5–15 kg)', pesante: 'Pesante (>15 kg)',
  standard: 'Standard', riciclato: 'Riciclato (Eco)', plastica: 'Plastica',
  'cella-frigo': 'Cella frigorifera', umidita: 'Umidità elevata',
  silenziosita: 'Silenziosità', antimanomissione: 'Antimanomissione', costo: 'Costo minimo',
};

export default function SmartTapeAdvisor() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const totalSteps = STEPS.length;
  const progress = done ? 100 : Math.round((stepIndex / totalSteps) * 100);

  function selectOption(value: string) {
    const step = STEPS[stepIndex];
    const next = { ...answers, [step.key]: value as never };
    setAnswers(next);
    if (stepIndex === totalSteps - 1) {
      setDone(true);
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function reset() {
    setAnswers({});
    setStepIndex(0);
    setDone(false);
  }

  const currentStep = STEPS[stepIndex];
  const result = done ? recommend(answers) : null;
  const why = result ? buildWhy(answers, result.whyKey) : [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24 px-5">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-light mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#servizi" className="hover:text-primary transition-colors">Servizi</Link>
            <span>/</span>
            <span className="text-foreground">Smart Tape Advisor</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Smart Tape Advisor</p>
            <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[0.04em] mb-4 leading-tight">
              Trova il nastro perfetto in 4 step
            </h1>
            <p className="text-muted-foreground text-[15px] font-light leading-relaxed max-w-xl">
              Rispondi a 4 domande tecniche. Il nostro algoritmo incrocia peso, superficie, ambiente e priorità
              per suggerirti il nastro adatto al tuo caso reale.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-light mb-3">
              <span>{done ? 'Completato' : `Step ${stepIndex + 1} di ${totalSteps}`}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {/* Card content */}
          <div className="bg-white border border-border/40 rounded-3xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={`step-${stepIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-light tracking-[0.02em] mb-2">
                    {currentStep.question}
                  </h2>
                  <p className="text-[13px] text-muted-foreground font-light mb-8">{currentStep.hint}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentStep.options.map((opt) => {
                      const Icon = opt.icon;
                      const selected = answers[currentStep.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => selectOption(opt.value)}
                          className={`group text-left p-6 rounded-2xl border transition-all duration-200 hover:border-primary hover:-translate-y-0.5 ${
                            selected ? 'border-primary bg-primary/5' : 'border-border/60 bg-white'
                          }`}
                          aria-label={opt.label}
                        >
                          <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-[14px] font-normal mb-1">{opt.label}</h3>
                          <p className="text-[12px] text-muted-foreground font-light">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3 font-light">Il tuo nastro ideale</p>
                  <h2 className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-light tracking-[0.02em] mb-2">
                    {result.product.name}
                  </h2>
                  <p className="text-muted-foreground text-[14px] font-light mb-8">{result.product.tagline}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <img src={result.product.image} alt={result.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-4 font-light">Scelto perché</h3>
                      <ul className="space-y-3">
                        {why.map((b, i) => (
                          <li key={i} className="flex gap-3 text-[14px] font-light leading-relaxed">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Riepilogo risposte */}
                  <div className="bg-muted/30 rounded-2xl p-5 mb-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3 font-light">Le tue risposte</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                      {STEPS.map((s) => (
                        <div key={s.key}>
                          <div className="text-muted-foreground capitalize mb-0.5">{s.key === 'environment' ? 'Ambiente' : s.key === 'surface' ? 'Superficie' : s.key === 'weight' ? 'Peso' : 'Priorità'}</div>
                          <div className="font-normal">{ANSWER_LABELS[String(answers[s.key])] ?? '—'}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/#contatti"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors text-[12px] font-normal tracking-[0.16em] uppercase flex-1"
                    >
                      Richiedi un campione gratuito
                    </a>
                    <a
                      href="/catalog"
                      className="inline-flex items-center justify-center gap-2 border border-border bg-white text-foreground px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors text-[12px] font-normal tracking-[0.16em] uppercase flex-1"
                    >
                      Vedi scheda tecnica
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-between mt-8">
            {(stepIndex > 0 || done) ? (
              <button
                onClick={back}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-light text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                Indietro
              </button>
            ) : <span />}
            {done && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-light text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Ricomincia il test
              </button>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
