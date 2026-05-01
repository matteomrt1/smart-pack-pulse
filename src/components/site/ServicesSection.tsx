import { Link } from 'react-router-dom';
import { Sparkles, Gauge, Calculator, FlaskConical, ScanLine } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import serviceAssistenza from '@/assets/service-assistenza.jpg';
import serviceCustom from '@/assets/service-custom.jpg';
import serviceValore from '@/assets/service-valore.jpg';
import serviceQualita from '@/assets/service-qualita.jpg';

const b2bTools = [
  {
    title: 'Smart Tape Advisor',
    desc: 'Wizard in 4 step: rispondi a 4 domande e ottieni il nastro tecnicamente corretto per il tuo caso.',
    icon: Sparkles,
    route: '/tools/smart-tape-advisor',
    available: true,
  },
  {
    title: 'Configuratore di Performance',
    desc: 'Algoritmo che incrocia peso, cartone, ambiente e applicazione per generare un Report di Affidabilità.',
    icon: Gauge,
    route: '/tools/performance-configurator',
    available: false,
  },
  {
    title: 'Calcolatore TCO',
    desc: 'Total Cost of Ownership: dimostriamo con i numeri quanto risparmi passando a un nastro premium.',
    icon: Calculator,
    route: '/tools/tco-calculator',
    available: false,
  },
  {
    title: 'Test di Stress',
    desc: 'Video comparativi: tenuta al peso, comportamento a -20°C, rumore allo srotolamento.',
    icon: FlaskConical,
    route: '/tools/stress-test',
    available: false,
  },
  {
    title: 'Analisi Cartone via Foto',
    desc: 'Carica una macro del tuo cartone: l\'AI suggerisce il tipo di adesivo ideale per quella superficie.',
    icon: ScanLine,
    route: '/tools/carton-analysis',
    available: false,
  },
];

const services = [
  {
    title: 'Assistenza Integrata',
    desc: 'Supporto completo nella scelta dei materiali, analisi delle esigenze di imballaggio e consulenza tecnica dedicata.',
    image: serviceAssistenza,
  },
  {
    title: 'Custom Design',
    desc: 'Studi di imballo personalizzati, branding su nastri e scatole, soluzioni su misura per valorizzare il tuo prodotto.',
    image: serviceCustom,
  },
  {
    title: 'Valore al Prodotto',
    desc: 'L\'imballaggio giusto non protegge solo: comunica qualità. Ottimizziamo materiali e design per ogni spedizione.',
    image: serviceValore,
  },
  {
    title: 'Qualità e Sostenibilità',
    desc: 'Materiali certificati, processi controllati e alternative eco-friendly. Ogni scelta riduce l\'impatto ambientale.',
    image: serviceQualita,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-background text-foreground py-28" id="servizi">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Servizi</p>
            <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase">
              Cosa facciamo per te
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 group/row">
            {services.map((service, i) => (
              <div
                key={i}
                className="relative flex-1 h-[320px] md:h-[520px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 md:group-hover/row:[flex:0.8_1_0] md:hover:!flex-[2.2_1_0]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 transition-all duration-700 z-[1] [.relative:hover_&]:scale-105"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 z-[2] pointer-events-none" />

                <div className="relative z-[3] h-full flex flex-col justify-between p-6 md:p-7">
                  <h3 className="text-[13px] font-normal tracking-[0.15em] uppercase text-white/90">
                    {service.title}
                  </h3>
                  <p className="mt-auto text-[14px] leading-relaxed text-white/70 font-light opacity-0 translate-y-2 transition-all duration-500 [.relative:hover_&]:opacity-100 [.relative:hover_&]:translate-y-0 max-w-sm">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Servizi esclusivi B2B */}
        <ScrollReveal delay={0.2}>
          <div className="mt-28 text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Servizi esclusivi</p>
            <h3 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-4">
              Strumenti tecnici per professionisti
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-[14px] font-light leading-relaxed">
              Non vendiamo nastri: vendiamo affidabilità. Strumenti pensati per chi imballa migliaia di pacchi al mese
              e vuole decidere con i dati, non con il prezzo al rotolo.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {b2bTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.route}
                  to={tool.route}
                  className="group relative bg-white border border-border/40 rounded-3xl p-7 text-left transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.25)]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className={`text-[10px] tracking-[0.18em] uppercase font-light px-2.5 py-1 rounded-full ${
                      tool.available
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tool.available ? 'Disponibile' : 'In arrivo'}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-normal tracking-[0.02em] mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-[13px] text-muted-foreground font-light leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase font-light text-foreground/60 group-hover:text-primary transition-colors">
                    {tool.available ? 'Provalo ora' : 'Scopri di più'}
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              to="/configurator"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-light text-muted-foreground hover:text-primary transition-colors"
            >
              Cerchi il configuratore di imballaggio completo?
              <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
