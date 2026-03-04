import { motion } from 'framer-motion';
import heroVideo from '@/assets/hero-video.mp4';
import heroPoster from '@/assets/hero-poster.jpg';

export function HeroSection() {
  return (
    <section className="relative w-screen h-screen overflow-hidden" id="hero">
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none" />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end pb-32 text-center text-white px-6">
        <motion.span
          className="text-[11px] tracking-[0.3em] uppercase mb-4 font-light opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          Since 1977
        </motion.span>

        <motion.h1
          className="text-[clamp(1.6rem,3vw,2.8rem)] tracking-[0.18em] uppercase font-extralight mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Confezioniamo idee, proteggiamo risultati
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-8 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {['ALTA QUALITÀ', 'ALTA SOSTENIBILITÀ'].map(text => (
            <a
              key={text}
              href={`#${text === 'ALTA QUALITÀ' ? 'productCategories' : 'sostenibilita'}`}
              className="relative text-[0.78rem] tracking-[0.28em] uppercase font-light after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[0.5px] after:bg-white/60 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500"
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
