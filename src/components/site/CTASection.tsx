import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight, MessageSquare } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-28 bg-primary/5" id="cta">
      <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3 font-light">Inizia ora</p>
          <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[0.06em] mb-4 text-foreground">
            Pronto a ottimizzare il tuo imballaggio?
          </h2>
          <p className="text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
            Parlaci del tuo progetto o prova il nostro configuratore AI per trovare subito la soluzione perfetta.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contatti"
              className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-7 py-3.5 rounded-full hover:bg-primary transition-colors text-[11px] font-normal tracking-[0.18em] uppercase"
            >
              <MessageSquare className="w-4 h-4" />
              Richiedi un preventivo
            </a>
            <Link
              to="/configurator"
              className="inline-flex items-center justify-center gap-2.5 border border-foreground/20 text-foreground px-7 py-3.5 rounded-full hover:bg-foreground hover:text-background transition-colors text-[11px] font-normal tracking-[0.18em] uppercase"
            >
              Prova il Configuratore AI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
