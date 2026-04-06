import { useCountUp } from '@/hooks/useCountUp';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  { value: 47, suffix: '', label: 'Anni di esperienza', prefix: '' },
  { value: 500, suffix: '+', label: 'Clienti attivi', prefix: '' },
  { value: 3000, suffix: '+', label: 'Prodotti a catalogo', prefix: '' },
  { value: 1200, suffix: 't', label: 'Tonnellate/anno', prefix: '' },
];

function StatCounter({ value, suffix, label, prefix, delay }: { value: number; suffix: string; label: string; prefix: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2200);
  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="text-center">
        <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-extralight text-foreground tracking-tight leading-none mb-2">
          {prefix}{count.toLocaleString('it-IT')}{suffix}
        </div>
        <p className="text-[12px] tracking-[0.2em] uppercase text-muted-foreground font-light">{label}</p>
      </div>
    </ScrollReveal>
  );
}

export function AboutSection() {
  return (
    <section className="bg-background text-foreground py-28" id="chi-siamo">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Chi siamo</p>
            <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-5">
              Dal 1977 al fianco dell'industria italiana
            </h2>
            <p className="text-[15px] font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Quasi cinquant'anni di esperienza nel packaging ci hanno insegnato che ogni prodotto merita la protezione giusta. Lavoriamo ogni giorno per offrire soluzioni affidabili, sostenibili e su misura.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
