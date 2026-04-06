import { ScrollReveal } from './ScrollReveal';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'La qualità del nastro e la consulenza ricevuta hanno ridotto i resi per danni del 40%. Un partner affidabile che capisce le esigenze dell\'industria.',
    name: 'Marco Ferri',
    role: 'Responsabile Logistica',
    company: 'Alimentari del Nord Srl',
    sector: 'Food',
  },
  {
    quote: 'Con il Configuratore AI abbiamo ottimizzato i costi di imballaggio del 25%. Un approccio innovativo che non avevamo mai trovato in altri fornitori.',
    name: 'Laura Bianchi',
    role: 'Direttore Acquisti',
    company: 'PharmaPack Italia',
    sector: 'Farmaceutica',
  },
  {
    quote: 'Le soluzioni eco-friendly ci hanno permesso di raggiungere gli obiettivi di sostenibilità aziendale senza compromettere la protezione dei prodotti.',
    name: 'Giovanni Rossi',
    role: 'CEO',
    company: 'Cosmesi Naturale SpA',
    sector: 'Cosmetica',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background text-foreground py-28" id="testimonianze">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Testimonianze</p>
            <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase">
              La voce dei nostri clienti
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-secondary/20 h-full flex flex-col">
                <Quote className="w-8 h-8 text-primary/20 mb-4 shrink-0" />
                <p className="text-[14px] leading-relaxed font-light text-foreground/80 mb-6 flex-1">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-[14px] font-medium text-foreground">{t.name}</p>
                  <p className="text-[12px] text-muted-foreground font-light">{t.role} · {t.company}</p>
                  <span className="inline-block mt-2 text-[10px] tracking-[0.15em] uppercase text-primary font-medium bg-primary/8 px-2.5 py-1 rounded-full">
                    {t.sector}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
