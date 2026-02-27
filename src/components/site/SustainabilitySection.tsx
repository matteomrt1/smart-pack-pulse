import sustainabilityEco from '@/assets/sustainability-eco.jpg';
import sustainabilityGommata from '@/assets/sustainability-gommata.jpg';

const cards = [
  {
    title: 'Nastro Eco Green – BioTape PLA',
    text: 'Compostabile e biodegradabile, realizzato in PLA (acido polilattico). Trasparente, resistente e cristallino: sembra plastica, ma è amido di mais. Programmato per tornare alla terra in condizioni di compostaggio industriale.',
    image: sustainabilityEco,
  },
  {
    title: 'Carta Gommata – Il Sigillo Definitivo',
    text: 'Si attiva con l\'acqua e si fonde con le fibre della scatola. Una volta applicato, nastro e cartone diventano un unico corpo. Impossibile da rimuovere senza lasciare traccia: perfetto per sicurezza e antieffrazione.',
    image: sustainabilityGommata,
  },
];

export function SustainabilitySection() {
  return (
    <section className="bg-white text-[#111] py-12 pb-14" id="sostenibilita">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <p className="text-[0.8rem] tracking-[0.16em] uppercase text-[#777] mb-2">Sostenibilità</p>
        <h2 className="text-[clamp(1.8rem,2.4vw,2.2rem)] font-semibold tracking-[0.12em] uppercase mb-7">
          Soluzioni Eco-Friendly
        </h2>

        <div className="flex flex-col md:flex-row gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative flex-1 min-h-[230px] md:min-h-[520px] rounded-3xl overflow-hidden cursor-pointer bg-black transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]"
            >
              {/* BG image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02] brightness-[0.8] transition-all duration-500 group-hover:scale-[1.06] group-hover:blur-[3px] group-hover:brightness-[0.6]"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85 z-[1] pointer-events-none opacity-90 transition-opacity duration-[450ms] group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-[2] h-full flex flex-col justify-end p-6 md:p-7">
                <h3 className="mb-3 text-[1.05rem] font-bold tracking-[0.08em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {card.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.5] text-[#f6f6f6] opacity-0 translate-y-3 transition-all duration-[450ms] group-hover:opacity-100 group-hover:translate-y-0 max-h-[60%] overflow-y-auto">
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
