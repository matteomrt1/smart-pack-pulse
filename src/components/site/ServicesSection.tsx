import { Link } from 'react-router-dom';
import serviceAssistenza from '@/assets/service-assistenza.jpg';
import serviceCustom from '@/assets/service-custom.jpg';
import serviceValore from '@/assets/service-valore.jpg';
import serviceQualita from '@/assets/service-qualita.jpg';

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
    <section className="bg-white text-foreground py-28" id="servizi">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Servizi</p>
          <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase">
            Cosa facciamo per te
          </h2>
        </div>

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

        {/* Configuratore CTA */}
        <div className="mt-24 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Servizio esclusivo</p>
          <h3 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-light tracking-[0.06em] mb-3">Configuratore Imballaggio AI</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-[14px] font-light leading-relaxed">
            Inserisci dimensioni, peso e fragilità del tuo prodotto: il nostro motore AI ti suggerisce
            la combinazione ottimale di materiali.
          </p>
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2.5 bg-foreground text-white px-7 py-3 rounded-full hover:bg-primary transition-colors text-[11px] font-normal tracking-[0.18em] uppercase"
          >
            Prova il Configuratore
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
