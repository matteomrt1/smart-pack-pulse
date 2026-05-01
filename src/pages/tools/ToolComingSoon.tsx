import { Link } from 'react-router-dom';
import { Gauge, Calculator, FlaskConical, ScanLine, Clock, ArrowRight, type LucideIcon } from 'lucide-react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

type Variant = 'performance' | 'tco' | 'stress' | 'carton';

const CONFIG: Record<Variant, {
  title: string;
  eyebrow: string;
  intro: string;
  icon: LucideIcon;
  features: string[];
}> = {
  performance: {
    eyebrow: 'In sviluppo',
    title: 'Configuratore di Performance',
    icon: Gauge,
    intro: 'Un algoritmo che analizza le variabili critiche che la maggior parte dei clienti ignora — peso, tipologia di cartone, ambiente di stoccaggio, metodo di applicazione e obiettivo secondario — per produrre un Report di Affidabilità con il nastro dal miglior rapporto tenuta/prezzo per il tuo caso specifico.',
    features: [
      'Input su 5 variabili tecniche, non solo peso e dimensioni',
      'Logica adesivi per cartoni riciclati (Hot Melt / Gomma Naturale)',
      'Regole specifiche per celle frigorifere e spedizioni transoceaniche',
      'Output: Report di Affidabilità tecnico, non un suggerimento commerciale',
    ],
  },
  tco: {
    eyebrow: 'In sviluppo',
    title: 'Calcolatore TCO (Total Cost of Ownership)',
    icon: Calculator,
    intro: 'Smetti di guardare il prezzo del rotolo: guarda quanto ti costa davvero. Inserisci prezzo nastro, giri necessari per chiudere un pacco e percentuale di pacchi danneggiati. Il tool dimostra matematicamente che un nastro premium può ridurre il consumo materiale del 50% e i costi di contestazione del 90%.',
    features: [
      'Confronto diretto tra nastro attuale e nastro premium',
      'Calcolo dei giri risparmiati per pacco',
      'Stima dei costi di contestazione evitati',
      'Report scaricabile in PDF per la direzione acquisti',
    ],
  },
  stress: {
    eyebrow: 'In sviluppo',
    title: 'Test di Stress (video dinamici)',
    icon: FlaskConical,
    intro: 'Niente foto patinate: video reali del comportamento dei nostri nastri in condizioni estreme. Vedi quanti kg regge una scatola prima di cedere, cosa succede a -20°C e il confronto acustico tra un nastro standard e un Low-Noise.',
    features: [
      'Test del peso fino a cedimento, registrato in slow-motion',
      'Test del freddo a -20°C in cella frigorifera reale',
      'Test del rumore: comparativo dB tra nastro standard e silenzioso',
      'Filtri per applicazione (logistica, alimentare, e-commerce)',
    ],
  },
  carton: {
    eyebrow: 'In sviluppo',
    title: 'Analisi Cartone via Foto (AI Light)',
    icon: ScanLine,
    intro: 'Carica una foto macro della superficie del cartone che usi. Il sistema analizza la trama e suggerisce se serve un nastro acrilico (per superfici lisce) o un nastro in gomma naturale (per superfici polverose o irregolari). Niente più test fisici inutili.',
    features: [
      'Upload da smartphone, analisi in pochi secondi',
      'Rilevamento porosità e grado di pulizia della superficie',
      'Raccomandazione tecnica del tipo di adesivo corretto',
      'Storico delle analisi per i tuoi clienti finali',
    ],
  },
};

export default function ToolComingSoon({ variant }: { variant: Variant }) {
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;

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
            <span className="text-foreground">{cfg.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                {cfg.eyebrow}
              </span>
            </div>
            <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[0.02em] mb-5 leading-tight">
              {cfg.title}
            </h1>
            <p className="text-muted-foreground text-[15px] font-light leading-relaxed">
              {cfg.intro}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white border border-border/40 rounded-3xl p-8 md:p-10 mb-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6 font-light">Cosa potrai fare</p>
            <ul className="space-y-4">
              {cfg.features.map((f, i) => (
                <li key={i} className="flex gap-4 text-[14px] font-light leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-normal">
                    {i + 1}
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-light tracking-[0.02em] mb-3">
              Sei interessato a questo strumento?
            </h2>
            <p className="text-muted-foreground text-[14px] font-light mb-6 max-w-md mx-auto">
              Contattaci: i clienti che ci scrivono ora avranno accesso prioritario in beta privata.
            </p>
            <a
              href="/#contatti"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors text-[12px] font-normal tracking-[0.16em] uppercase"
            >
              Contattaci per un'offerta dedicata
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Back */}
          <div className="mt-10 text-center">
            <Link
              to="/#servizi"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-light text-muted-foreground hover:text-primary transition-colors"
            >
              ← Torna ai servizi
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
