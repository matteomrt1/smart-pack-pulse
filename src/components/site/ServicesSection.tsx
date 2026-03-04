import { Link } from 'react-router-dom';
import serviceAssistenza from '@/assets/service-assistenza.jpg';
import serviceCustom from '@/assets/service-custom.jpg';
import serviceValore from '@/assets/service-valore.jpg';
import serviceQualita from '@/assets/service-qualita.jpg';

const services = [
  {
    title: 'Assistenza Integrata',
    desc: 'Supporto completo nella scelta dei materiali, analisi delle esigenze di imballaggio e consulenza tecnica dedicata. Il nostro team ti affianca dalla selezione alla consegna.',
    image: serviceAssistenza,
  },
  {
    title: 'Custom Design',
    desc: 'Studi di imballo personalizzati, branding su nastri e scatole, soluzioni su misura per valorizzare il tuo prodotto e comunicare la tua identità.',
    image: serviceCustom,
  },
  {
    title: 'Valore al Prodotto',
    desc: 'L\'imballaggio giusto non protegge solo: comunica qualità. Ottimizziamo materiali e design per aggiungere valore percepito a ogni spedizione.',
    image: serviceValore,
  },
  {
    title: 'Qualità e Sostenibilità',
    desc: 'Materiali certificati, processi controllati e alternative eco-friendly. Ogni scelta è orientata a ridurre l\'impatto ambientale senza compromessi sulla qualità.',
    image: serviceQualita,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-card text-foreground py-24" id="servizi">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <h2 className="text-center text-[clamp(26px,3vw,34px)] font-bold tracking-[0.06em] uppercase mb-8 text-primary">
          I Nostri Servizi
        </h2>

        {/* Service Cards row */}
        <div className="flex flex-col md:flex-row gap-6 group/row">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative flex-1 h-[360px] md:h-[550px] rounded-2xl overflow-hidden cursor-pointer bg-muted transition-all duration-[600ms] md:group-hover/row:[flex:0.8_1_0] md:hover:!flex-[2.2_1_0] md:hover:-translate-y-2 md:hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)]"
            >
              {/* BG */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02] brightness-75 transition-all duration-[450ms] z-[1] group-hover/row:[&]:brightness-[0.6] hover:!scale-[1.06]"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 z-[2] pointer-events-none" />

              {/* Content */}
              <div className="relative z-[3] h-full flex flex-col justify-between p-[22px] pb-6">
                <h3 className="text-[1.2rem] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {service.title}
                </h3>
                <p className="mt-auto text-[0.95rem] leading-[1.4] text-[#f6f6f6] opacity-0 translate-y-3.5 transition-all duration-[450ms] group-hover/row:peer-hover:opacity-100 max-h-[60%] overflow-y-auto [.relative:hover_&]:opacity-100 [.relative:hover_&]:translate-y-0">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Configuratore CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4 tracking-[0.12em] uppercase">Servizio esclusivo</p>
          <h3 className="text-2xl font-bold mb-3 text-foreground">Configuratore Imballaggio AI</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Inserisci dimensioni, peso e fragilità del tuo prodotto: il nostro motore AI ti suggerisce
            la combinazione ottimale di materiali, con schema 2D e calcolo dei costi.
          </p>
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg text-sm font-medium tracking-[0.08em] uppercase"
          >
            Prova il Configuratore
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
