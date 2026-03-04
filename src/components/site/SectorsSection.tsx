import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sectorLogistica from '@/assets/sector-logistica.jpg';
import sectorAutomotive from '@/assets/sector-automotive.jpg';
import sectorAlimentare from '@/assets/sector-alimentare.jpg';

const sectors = [
  {
    title: 'Industria della Logistica',
    description: 'Soluzioni di imballaggio su misura per centri logistici, corrieri e magazzini.',
    image: sectorLogistica,
  },
  {
    title: 'Industria Automobilistica',
    description: 'Protezione professionale per componenti auto: nastri di mascheratura, film protettivi e imballaggi antigraffio.',
    image: sectorAutomotive,
  },
  {
    title: 'Industria Alimentare e Beverage',
    description: 'Materiali certificati per il contatto alimentare, nastri e film conformi alle normative HACCP.',
    image: sectorAlimentare,
  },
  {
    title: 'Industria delle Costruzioni',
    description: 'Nastri di mascheratura resistenti al calore, protezioni per superfici, film per cantieri.',
    image: sectorLogistica,
  },
  {
    title: 'Allestimento Fiere e Negozi',
    description: 'Nastri biadesivi, adesivi per allestimenti temporanei, materiali per retail e visual merchandising.',
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
    <section className="py-28 bg-secondary/30 text-foreground text-center" id="sectorsTrack">
      <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Settori</p>
      <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-10">
        Le industrie che serviamo
      </h2>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
        <div ref={trackRef} className="flex gap-8 overflow-hidden scroll-smooth py-4">
          {sectors.map((sector, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-[0_0_70vw] max-w-[960px] h-[min(55vh,500px)] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${
                i === current
                  ? 'scale-100 opacity-100 z-[2]'
                  : 'scale-[0.88] opacity-40'
              }`}
            >
              <img
                src={sector.image}
                alt={sector.title}
                className={`absolute inset-0 w-full h-full object-cover scale-100 transition-all duration-700 ${
                  i !== current ? 'blur-[1px] brightness-[0.65]' : ''
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none z-[1]`} />

              <h3 className="absolute top-6 left-7 right-7 z-[2] text-left text-[13px] font-normal tracking-[0.15em] uppercase text-white/90">
                {sector.title}
              </h3>

              <p className={`absolute left-7 right-7 bottom-7 text-[14px] leading-relaxed text-left text-white/70 font-light z-[2] transition-all duration-500 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                {sector.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-foreground flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105 z-[5]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-foreground flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105 z-[5]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
