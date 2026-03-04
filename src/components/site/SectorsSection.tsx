import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sectorLogistica from '@/assets/sector-logistica.jpg';
import sectorAutomotive from '@/assets/sector-automotive.jpg';
import sectorAlimentare from '@/assets/sector-alimentare.jpg';

const sectors = [
  {
    title: 'Industria della Logistica',
    description: 'Soluzioni di imballaggio su misura per centri logistici, corrieri e magazzini. Nastri ad alte prestazioni, film estensibili e reggette per volumi elevati e velocità operative.',
    image: sectorLogistica,
  },
  {
    title: 'Industria Automobilistica',
    description: 'Protezione professionale per componenti auto: nastri di mascheratura, film protettivi e imballaggi antigraffio per linee di produzione e aftermarket.',
    image: sectorAutomotive,
  },
  {
    title: 'Industria Alimentare e Beverage',
    description: 'Materiali certificati per il contatto alimentare, nastri e film conformi alle normative HACCP. Soluzioni igieniche e sostenibili per il settore food & beverage.',
    image: sectorAlimentare,
  },
  {
    title: 'Industria delle Costruzioni',
    description: 'Nastri di mascheratura resistenti al calore, protezioni per superfici, film per cantieri. Soluzioni robuste per ambienti gravosi.',
    image: sectorLogistica,
  },
  {
    title: 'Allestimento Fiere e Negozi',
    description: 'Nastri biadesivi, adesivi per allestimenti temporanei, materiali di confezionamento per retail e visual merchandising.',
    image: sectorAutomotive,
  },
];

export function SectorsSection() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.children;
    if (slides[current]) {
      (slides[current] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [current]);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(sectors.length - 1, c + 1));

  return (
    <section className="py-24 bg-card text-foreground text-center" id="sectorsTrack">
      <h2 className="text-[clamp(26px,3vw,34px)] font-bold tracking-[0.06em] uppercase mb-2 text-primary">
        Settori che Serviamo
      </h2>
      <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-6">
        Soluzioni dedicate per ogni industria
      </p>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Track */}
        <div ref={trackRef} className="flex gap-10 overflow-hidden scroll-smooth py-5 pb-2.5">
          {sectors.map((sector, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-[0_0_70vw] max-w-[960px] h-[min(60vh,550px)] rounded-2xl overflow-hidden cursor-pointer transition-all duration-[600ms] ${
                i === current
                  ? 'scale-100 opacity-100 shadow-[0_32px_80px_rgba(0,0,0,0.2)] z-[2]'
                  : 'scale-[0.85] opacity-45'
              }`}
            >
              <img
                src={sector.image}
                alt={sector.title}
                className={`absolute inset-0 w-full h-full object-cover scale-[1.05] transition-all duration-[600ms] ${
                  i !== current ? 'blur-[2px] brightness-[0.6] scale-[1.03]' : ''
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none transition-opacity duration-[600ms] z-[1] ${i === current ? 'opacity-70' : 'opacity-90'}`} />

              <h3 className="absolute top-[22px] left-[26px] right-[26px] z-[2] text-left text-[clamp(18px,2.1vw,22px)] font-semibold tracking-[0.04em] text-white">
                {sector.title}
              </h3>

              <p className={`absolute left-[26px] right-[26px] bottom-6 text-[13px] leading-[1.5] text-left text-white z-[2] transition-all duration-500 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}>
                {sector.description}
              </p>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-[18px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border bg-card/95 text-foreground flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary/5 hover:border-primary hover:shadow-md hover:scale-105 z-[5]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-[18px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border bg-card/95 text-foreground flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary/5 hover:border-primary hover:shadow-md hover:scale-105 z-[5]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
