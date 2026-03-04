import sustainabilityEco from '@/assets/sustainability-eco.jpg';
import sustainabilityGommata from '@/assets/sustainability-gommata.jpg';

const cards = [
  {
    title: 'Nastro Eco Green – BioTape PLA',
    text: 'Compostabile e biodegradabile, realizzato in PLA (acido polilattico). Trasparente, resistente e cristallino: sembra plastica, ma è amido di mais.',
    image: sustainabilityEco,
  },
  {
    title: 'Carta Gommata – Il Sigillo Definitivo',
    text: 'Si attiva con l\'acqua e si fonde con le fibre della scatola. Una volta applicato, nastro e cartone diventano un unico corpo.',
    image: sustainabilityGommata,
  },
];

export function SustainabilitySection() {
  return (
    <section className="bg-secondary/30 text-foreground py-28" id="sostenibilita">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Sostenibilità</p>
        <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-10">
          Soluzioni Eco-Friendly
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative flex-1 min-h-[240px] md:min-h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 transition-all duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70 z-[1] pointer-events-none transition-opacity duration-500 group-hover:from-black/60 group-hover:to-black/80" />

              <div className="relative z-[2] h-full flex flex-col justify-end p-7 md:p-9">
                <h3 className="mb-3 text-[13px] font-normal tracking-[0.15em] uppercase text-white/90">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/70 font-light opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 max-w-md">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
