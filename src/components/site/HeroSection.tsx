import { motion } from 'framer-motion';
import heroPoster from '@/assets/hero-poster.jpg';

export function HeroSection() {
  return (
    <section className="relative w-screen h-screen overflow-hidden" id="hero">
      {/* Background Image (since we don't have video, use image with subtle animation) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={heroPoster}
          alt="Imballaggi Bustesi - magazzino"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/70 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end pb-28 text-center text-white px-6">
        <motion.span
          className="text-xs tracking-[0.18em] uppercase mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Since 1977
        </motion.span>

        <motion.h1
          className="text-[clamp(1.9rem,2.8vw,2.6rem)] tracking-[0.12em] uppercase font-medium mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1 }}
        >
          Confezioniamo idee, proteggiamo risultati
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          {['ALTA QUALITÀ', 'ALTA SOSTENIBILITÀ'].map(text => (
            <a
              key={text}
              href={`#${text === 'ALTA QUALITÀ' ? 'productCategories' : 'sostenibilita'}`}
              className="relative text-[0.9rem] tracking-[0.18em] uppercase after:content-[''] after:absolute after:left-0 after:bottom-[-0.25rem] after:w-full after:h-px after:bg-current after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              onClick={e => {
                e.preventDefault();
                const id = text === 'ALTA QUALITÀ' ? 'productCategories' : 'sostenibilita';
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {text}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
