import { useState } from 'react';
import { UtensilsCrossed, Wine, Candy, CakeSlice, Pill, Sparkles, Package, Cog, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sectors = [
  {
    title: 'Food',
    icon: UtensilsCrossed,
    tagline: 'Freschezza, sicurezza e innovazione per l\'industria alimentare',
    highlights: ['Confezionamento in atmosfera protettiva', 'Soluzioni skin pack e MAP', 'Tracciabilità e sicurezza alimentare', 'Packaging sostenibile e riciclabile'],
    content: 'L\'industria alimentare richiede soluzioni di confezionamento che garantiscano freschezza, sicurezza e sostenibilità lungo tutta la filiera. Offriamo tecnologie all\'avanguardia per il confezionamento primario e secondario, dalla lavorazione al punto vendita.',
  },
  {
    title: 'Bevande',
    icon: Wine,
    tagline: 'Tecnologie avanzate per ogni tipo di bevanda',
    highlights: ['Riempimento asettico e a caldo', 'Chiusure innovative e sicure', 'Etichettatura e codifica', 'Materiali barriera ad alte prestazioni'],
    content: 'Dal riempimento alla chiusura, dall\'etichettatura al confezionamento secondario: soluzioni complete per acqua, succhi, birra, vino e bevande funzionali con massima efficienza e sostenibilità.',
  },
  {
    title: 'Dolciumi',
    icon: Candy,
    tagline: 'Creatività e precisione per il mondo del dolce',
    highlights: ['Protezione aromi e freschezza', 'Packaging display-ready', 'Flowpack e incarto twist', 'Personalizzazione e limited edition'],
    content: 'Il packaging per dolciumi richiede creatività e precisione tecnica: dalla protezione degli aromi alla presentazione accattivante a scaffale, fino alle soluzioni per edizioni limitate e stagionali.',
  },
  {
    title: 'Panificazione',
    icon: CakeSlice,
    tagline: 'Innovazione dal forno allo scaffale',
    highlights: ['Cooling@Packing – confezionamento immediato', 'Estensione shelf life', 'Packaging anti-condensa', 'German Packaging Award 2024'],
    content: 'Di fronte alle crescenti richieste dei consumatori e ai trend in rapida evoluzione, il settore dipende da processi innovativi e packaging intelligente. Con Cooling@Packing, Multivac ha sviluppato un sistema che ridefinisce il tradizionale processo di raffreddamento, permettendo il confezionamento immediato dopo la cottura. Il processo aumenta la freschezza e prolunga la shelf life.',
  },
  {
    title: 'Farmaceutica',
    icon: Pill,
    tagline: 'Sicurezza, conformità e integrità del prodotto',
    highlights: ['Serializzazione e anticontraffazione', 'Blister e confezionamento sterile', 'Tracciabilità track & trace', 'Conformità normativa GMP/FDA'],
    content: 'Nel settore farmaceutico il packaging è sinonimo di sicurezza e conformità. Offriamo soluzioni anticontraffazione, tracciabilità completa e materiali che garantiscono l\'integrità del prodotto dalla produzione al paziente.',
  },
  {
    title: 'Cosmetica',
    icon: Sparkles,
    tagline: 'Design premium e sostenibilità per il beauty',
    highlights: ['Packaging premium e luxury', 'Materiali eco-friendly', 'Decorazione e nobilitazione', 'Dosatori e dispenser innovativi'],
    content: 'Il packaging cosmetico unisce estetica e funzionalità: design premium, materiali innovativi e soluzioni sostenibili per un settore dove l\'immagine è tutto e la responsabilità ambientale è sempre più centrale.',
  },
  {
    title: 'Non-Food',
    icon: Package,
    tagline: 'Versatilità per ogni prodotto non alimentare',
    highlights: ['Protezione durante il trasporto', 'Packaging e-commerce ottimizzato', 'Soluzioni display e retail-ready', 'Materiali adattabili e resistenti'],
    content: 'Soluzioni di confezionamento versatili per il settore non-food: dalla protezione durante il trasporto alla presentazione a scaffale, con materiali e processi adattabili a ogni tipo di prodotto.',
  },
  {
    title: 'Beni Industriali',
    icon: Cog,
    tagline: 'Protezione robusta per componenti e macchinari',
    highlights: ['Imballaggio anticorrosione VCI', 'Soluzioni per logistica e stoccaggio', 'Packaging su misura B2B', 'Automazione fine linea'],
    content: 'Packaging industriale robusto e affidabile per la protezione di componenti, macchinari e materiali. Soluzioni su misura per logistica, stoccaggio e spedizione in ambito B2B.',
  },
];

export function SectorsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-secondary/30 text-foreground" id="sectorsTrack">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light text-center">
          Settori
        </p>
        <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase mb-4 text-center">
          Le industrie che serviamo
        </h2>
        <p className="text-[15px] font-light text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Soluzioni di packaging su misura per ogni settore industriale. Scopri le nostre competenze specifiche e i vantaggi che possiamo offrirti.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((sector, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={sector.title}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                {/* Card */}
                <div
                  className={`relative flex flex-col items-center justify-center aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 border ${
                    isActive
                      ? 'bg-primary shadow-lg shadow-primary/20 border-primary -translate-y-1'
                      : 'bg-background border-border/50 hover:border-primary/30'
                  }`}
                >
                  <sector.icon
                    className={`w-10 h-10 md:w-12 md:h-12 stroke-[1] transition-colors duration-500 mb-3 ${
                      isActive ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  />

                  <span className={`text-[13px] md:text-[14px] font-medium tracking-[0.06em] uppercase transition-colors duration-500 ${
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {sector.title}
                  </span>

                  <span className={`text-[11px] font-light mt-1 transition-colors duration-500 text-center px-3 leading-snug ${
                    isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {sector.tagline}
                  </span>
                </div>

                {/* Expandable detail panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-5 rounded-2xl bg-background border border-border/50 shadow-sm">
                        <p className="text-[13px] leading-relaxed font-light text-foreground/80 mb-4">
                          {sector.content}
                        </p>

                        <div className="space-y-2">
                          <p className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium mb-2">
                            Le nostre competenze
                          </p>
                          {sector.highlights.map((h) => (
                            <div key={h} className="flex items-start gap-2">
                              <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                              <span className="text-[13px] font-light text-foreground/70">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
