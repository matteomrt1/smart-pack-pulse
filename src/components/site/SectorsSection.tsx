import { UtensilsCrossed, Wine, Candy, CakeSlice, Pill, Sparkles, Package, Cog } from 'lucide-react';

const sectors = [
  { title: 'Food', icon: UtensilsCrossed },
  { title: 'Bevande', icon: Wine },
  { title: 'Dolciumi', icon: Candy },
  { title: 'Panificazione', icon: CakeSlice },
  { title: 'Farmaceutica', icon: Pill },
  { title: 'Cosmetica', icon: Sparkles },
  { title: 'Non-Food', icon: Package },
  { title: 'Beni Industriali', icon: Cog },
];

export function SectorsSection() {
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
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="group relative flex flex-col items-center justify-center aspect-square rounded-3xl bg-secondary/50 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-all duration-500 rounded-3xl" />

              {/* Icon */}
              <sector.icon
                className="relative z-[2] w-14 h-14 stroke-[0.8] text-muted-foreground group-hover:text-primary-foreground transition-colors duration-500 mb-4"
              />

              {/* Title */}
              <span className="relative z-[2] text-[13px] font-light tracking-[0.12em] uppercase text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                {sector.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
