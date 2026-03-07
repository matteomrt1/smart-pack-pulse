import { useState } from 'react';
import { UtensilsCrossed, Wine, Candy, CakeSlice, Pill, Sparkles, Package, Cog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sectors = [
  {
    title: 'Food',
    icon: UtensilsCrossed,
    content: 'Per nuove idee, nuovi gusti e consistenze, nuovi colori e forme – e per nuovi packaging deliziosi. L\'industria alimentare richiede soluzioni di confezionamento innovative che garantiscano freschezza, sicurezza e sostenibilità lungo tutta la filiera produttiva.',
  },
  {
    title: 'Bevande',
    icon: Wine,
    content: 'Soluzioni di packaging all\'avanguardia per il settore delle bevande: dalla protezione del prodotto alla sostenibilità dei materiali, fino alle tecnologie di riempimento e chiusura più innovative.',
  },
  {
    title: 'Dolciumi',
    icon: Candy,
    content: 'Il packaging per dolciumi richiede creatività e precisione: dalla protezione degli aromi alla presentazione accattivante, fino alle soluzioni sostenibili per un settore in continua evoluzione.',
  },
  {
    title: 'Panificazione',
    icon: CakeSlice,
    content: 'Per nuove idee, nuovi gusti e consistenze, nuovi colori e forme – e per nuovi packaging deliziosi. Di fronte alle crescenti richieste dei consumatori, ai trend in rapida evoluzione e alla crescente responsabilità, il settore dipende enormemente da processi innovativi e packaging intelligente. Con Cooling@Packing, Multivac ha sviluppato un sistema che ridefinisce il tradizionale processo di raffreddamento per i prodotti da forno, permettendo il confezionamento immediato dopo la cottura senza una lunga fase di raffreddamento.',
  },
  {
    title: 'Farmaceutica',
    icon: Pill,
    content: 'Nel settore farmaceutico, il packaging è sinonimo di sicurezza e conformità normativa. Soluzioni anticontraffazione, tracciabilità completa e materiali che garantiscono l\'integrità del prodotto dalla produzione al paziente.',
  },
  {
    title: 'Cosmetica',
    icon: Sparkles,
    content: 'Il packaging cosmetico unisce estetica e funzionalità: design premium, materiali innovativi e soluzioni sostenibili per un settore dove l\'immagine è tutto e la responsabilità ambientale è sempre più centrale.',
  },
  {
    title: 'Non-Food',
    icon: Package,
    content: 'Soluzioni di confezionamento versatili per il settore non-food: dalla protezione durante il trasporto alla presentazione a scaffale, con materiali e processi adattabili a ogni tipo di prodotto.',
  },
  {
    title: 'Beni Industriali',
    icon: Cog,
    content: 'Packaging industriale robusto e affidabile per la protezione di componenti, macchinari e materiali. Soluzioni su misura per logistica, stoccaggio e spedizione in ambito B2B.',
  },
];

export function SectorsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-background text-foreground" id="sectorsTrack">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light text-center">
          Settori
        </p>
        <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-14 text-center">
          Le industrie che serviamo
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sectors.map((sector, index) => (
            <div
              key={sector.title}
              className="relative"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Card */}
              <div
                className={`relative flex flex-col items-center justify-center aspect-square rounded-3xl bg-secondary/50 cursor-pointer overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? '-translate-y-1' : ''
                }`}
              >
                <div className={`absolute inset-0 transition-all duration-500 rounded-3xl ${
                  activeIndex === index ? 'bg-primary/80' : 'bg-primary/0'
                }`} />

                <sector.icon
                  className={`relative z-[2] w-14 h-14 stroke-[0.8] transition-colors duration-500 mb-4 ${
                    activeIndex === index ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                />

                <span className={`relative z-[2] text-[13px] font-light tracking-[0.12em] uppercase transition-colors duration-500 ${
                  activeIndex === index ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {sector.title}
                </span>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 px-1">
                      <p className="text-[13px] leading-relaxed font-light text-muted-foreground">
                        {sector.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
