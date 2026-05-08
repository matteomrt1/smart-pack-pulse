import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ProductDetailDialog } from './ProductDetailDialog';
import imgNastri from '@/assets/cat-nastri.jpg';
import imgScatole from '@/assets/cat-scatole.jpg';
import imgProtezione from '@/assets/cat-protezione.jpg';
import imgFilm from '@/assets/cat-film.jpg';
import imgSacchetti from '@/assets/cat-sacchetti.jpg';
import imgSostenibilita from '@/assets/cat-sostenibilita.jpg';
import imgP1 from '@/assets/p-p1.jpg';
import imgP2 from '@/assets/p-p2.jpg';
import imgP3 from '@/assets/p-p3.jpg';
import imgP4 from '@/assets/p-p4.jpg';
import imgP5 from '@/assets/p-p5.jpg';
import imgP6 from '@/assets/p-p6.jpg';
import imgP7 from '@/assets/p-p7.jpg';
import imgP8 from '@/assets/p-p8.jpg';
import imgS1 from '@/assets/p-s1.jpg';
import imgS2 from '@/assets/p-s2.jpg';
import imgS3 from '@/assets/p-s3.jpg';
import imgPr1 from '@/assets/p-pr1.jpg';
import imgPr2 from '@/assets/p-pr2.jpg';
import imgPr3 from '@/assets/p-pr3.jpg';
import imgF1 from '@/assets/p-f1.jpg';
import imgF2 from '@/assets/p-f2.jpg';
import imgSb1 from '@/assets/p-sb1.jpg';
import imgSb2 from '@/assets/p-sb2.jpg';
import imgE1 from '@/assets/p-e1.jpg';
import imgE2 from '@/assets/p-e2.jpg';

const categoryImages: Record<string, string> = {
  'nastri-adesivi': imgNastri,
  'scatole-cartone': imgScatole,
  'protezione-riempimento': imgProtezione,
  'film-regge': imgFilm,
  'sacchetti-buste': imgSacchetti,
  'sostenibilita': imgSostenibilita,
};

const productImages: Record<string, string> = {
  p1: imgP1, p2: imgP2, p3: imgP3, p4: imgP4, p5: imgP5, p6: imgP6, p7: imgP7, p8: imgP8,
  s1: imgS1, s2: imgS2, s3: imgS3,
  pr1: imgPr1, pr2: imgPr2, pr3: imgPr3,
  f1: imgF1, f2: imgF2,
  sb1: imgSb1, sb2: imgSb2,
  e1: imgE1, e2: imgE2,
};

const categories = [
  { id: 'nastri-adesivi', label: 'Nastri adesivi' },
  { id: 'scatole-cartone', label: 'Scatole' },
  { id: 'protezione-riempimento', label: 'Protezione e riempimento' },
  { id: 'film-regge', label: 'Film estensibili e regge' },
  { id: 'sacchetti-buste', label: 'Sacchetti e buste' },
  { id: 'sostenibilita', label: 'Sostenibilità' },
];

interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  code: string;
  eco?: boolean;
  badge?: string;
  sizes: string[];
  colors?: { name: string; hex: string }[];
}

const products: Record<string, Product[]> = {
  'nastri-adesivi': [
    { id: 'p1', name: 'Biotape PLA Ecologico', desc: 'Nastro compostabile in PLA, impatto zero.', price: '€4.50', code: 'P1', eco: true, sizes: ['50mm x 66m', '75mm x 66m'], colors: [{ name: 'Trasparente', hex: '#e2e8f0' }, { name: 'Avana', hex: '#d4a373' }] },
    { id: 'p2', name: 'Nastro Riciclato Kraft', desc: 'Materiali 100% riciclati per spedizioni green.', price: '€3.80', code: 'P2', sizes: ['50mm', '75mm'], colors: [{ name: 'Avana', hex: '#8d6e63' }] },
    { id: 'p3', name: 'PP Hot Melt Standard', desc: 'Il nastro più venduto: affidabile e versatile.', price: '€1.20', code: 'P3', badge: 'Best Seller', sizes: ['48mm', '75mm'], colors: [{ name: 'Trasparente', hex: '#e2e8f0' }, { name: 'Avana', hex: '#8d6e63' }] },
    { id: 'p4', name: 'Nastro PVC Premium', desc: 'Massima resistenza e silenziosità allo srotolamento.', price: '€2.90', code: 'P4', sizes: ['48mm', '75mm'], colors: [{ name: 'Avana', hex: '#8d6e63' }, { name: 'Trasparente', hex: '#e2e8f0' }, { name: 'Bianco', hex: '#fff' }] },
    { id: 'p5', name: 'Nastro PP Acrilico Silenzioso', desc: 'Srotolamento silenzioso, ideale per uffici e magazzini.', price: '€1.60', code: 'P5', sizes: ['48mm', '75mm'], colors: [{ name: 'Trasparente', hex: '#e2e8f0' }] },
    { id: 'p6', name: 'Mascheratura 60°', desc: 'Ideale per edilizia e verniciature leggere.', price: '€1.80', code: 'P6', sizes: ['19mm', '25mm', '38mm', '50mm'] },
    { id: 'p7', name: 'Mascheratura UV Blue', desc: 'Resistente ai raggi UV per esterni (14 giorni).', price: '€3.20', code: 'P7', sizes: ['25mm', '50mm'] },
    { id: 'p8', name: 'Nastro Filament', desc: 'Rinforzato con fibre di vetro per carichi pesanti.', price: '€7.90', code: 'P8', badge: 'Heavy Duty', sizes: ['25mm', '50mm'] },
  ],
  'scatole-cartone': [
    { id: 's1', name: 'Scatola Americana 40×30×30', desc: 'Scatola standard per spedizioni medie.', price: '€1.50', code: 'S1', sizes: ['40×30×30'] },
    { id: 's2', name: 'Scatola Americana 60×40×40', desc: 'Per spedizioni di grandi dimensioni.', price: '€2.80', code: 'S2', sizes: ['60×40×40'] },
    { id: 's3', name: 'Scatola Fustellata', desc: 'Design personalizzato per prodotti specifici.', price: '€3.20', code: 'S3', sizes: ['Su misura'] },
  ],
  'protezione-riempimento': [
    { id: 'pr1', name: 'Pluriball Standard', desc: 'Protezione classica per oggetti fragili.', price: '€0.80/m²', code: 'PR1', sizes: ['50cm', '100cm'] },
    { id: 'pr2', name: 'Carta Kraft Imbottitura', desc: 'Riempimento eco-friendly riciclabile.', price: '€0.50/m²', code: 'PR2', eco: true, sizes: ['40cm', '60cm'] },
    { id: 'pr3', name: 'Schiuma PE Espanso', desc: 'Alta protezione per oggetti delicati.', price: '€1.20/m²', code: 'PR3', sizes: ['1mm', '2mm', '5mm'] },
  ],
  'film-regge': [
    { id: 'f1', name: 'Film Estensibile Manuale', desc: 'Per palettizzazione manuale.', price: '€8.50', code: 'F1', sizes: ['20μ', '23μ'] },
    { id: 'f2', name: 'Reggetta PP', desc: 'Reggettatura per colli pesanti.', price: '€12.00', code: 'F2', sizes: ['12mm', '15mm'] },
  ],
  'sacchetti-buste': [
    { id: 'sb1', name: 'Busta Trasparente LDPE', desc: 'Buste per confezionamento leggero.', price: '€0.05', code: 'SB1', sizes: ['20×30', '30×40', '40×60'] },
    { id: 'sb2', name: 'Sacchetto Zip Lock', desc: 'Chiusura richiudibile per piccoli oggetti.', price: '€0.08', code: 'SB2', sizes: ['10×15', '15×20', '20×30'] },
  ],
  'sostenibilita': [
    { id: 'e1', name: 'Biotape PLA Ecologico', desc: 'Nastro compostabile in PLA, impatto zero.', price: '€4.50', code: 'E1', eco: true, sizes: ['50mm', '75mm'] },
    { id: 'e2', name: 'Carta Kraft Imbottitura', desc: 'Riempimento eco-friendly riciclabile.', price: '€0.50/m²', code: 'E2', eco: true, sizes: ['40cm', '60cm'] },
  ],
};

function ProductCard({ product, delay, categoryId, onOpen }: { product: Product; delay: number; categoryId: string; onOpen: (p: Product, image: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const image = productImages[product.id] || categoryImages[categoryId];

  return (
    <motion.article
      onClick={() => onOpen(product, image)}
      className="group relative bg-background rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden flex flex-col h-[400px] cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.04, duration: 0.5 }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden bg-secondary/30">
        {product.eco && (
          <span className="absolute top-3 left-3 bg-accent/10 text-accent text-[10px] font-medium px-2.5 py-1 rounded-full z-20 uppercase tracking-[0.12em] animate-[pulse_3s_ease-in-out_infinite]">
            Eco
          </span>
        )}
        {product.badge && !product.eco && (
          <span className="absolute top-3 left-3 bg-primary/8 text-primary text-[10px] font-medium px-2.5 py-1 rounded-full z-20 uppercase tracking-[0.12em]">
            {product.badge}
          </span>
        )}
        {image && (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            width={768}
            height={768}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <button onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 w-7 h-7 bg-background/80 backdrop-blur rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors z-20 opacity-0 group-hover:opacity-100 duration-300">
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col relative bg-background z-20">
        <div className="mb-1">
          <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-[0.15em] mb-1.5">{product.code}</p>
          <h3 className="text-[15px] font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4 transition-opacity duration-300 group-hover:opacity-0 font-light">
          {product.desc}
        </p>
        <div className="mt-auto flex items-end justify-end transition-opacity duration-300 group-hover:opacity-0">
          {/* Prezzo nascosto su richiesta - {product.price} */}
          <button className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Variant Panel */}
        <div className="absolute inset-x-0 bottom-0 bg-background p-5 transform translate-y-full group-hover:translate-y-0 h-[200px] flex flex-col justify-between transition-transform duration-400">
          <div className="space-y-3">
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-[0.15em] block mb-2">Colore</span>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${selectedColor === i ? 'ring-1.5 ring-primary ring-offset-2' : 'border-border'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-[0.15em] block mb-2">Misura</span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(i)}
                    className={`px-2.5 py-1 text-[11px] rounded-full transition-colors ${selectedSize === i ? 'bg-foreground text-background' : 'bg-secondary/60 text-foreground hover:bg-secondary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-end">
            {/* Prezzo nascosto su richiesta - {product.price} */}
            <a
              href="#contact"
              className="bg-foreground text-background text-[11px] font-normal px-4 py-2 rounded-full hover:bg-primary transition-colors tracking-wide"
            >
              Contattaci per un'offerta dedicata
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsSection() {
  const [active, setActive] = useState('nastri-adesivi');

  return (
    <section className="bg-background text-foreground py-28" id="productCategories">
      <ScrollReveal>
        <div className="text-center px-10 mb-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Catalogo</p>
          <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase">
            Le nostre soluzioni
          </h2>
        </div>
      </ScrollReveal>

      {/* Advisor banner */}
      <ScrollReveal delay={0.05}>
        <div className="max-w-3xl mx-auto px-6 mb-10">
          <Link
            to="/tools/smart-tape-advisor"
            className="group flex items-center justify-between gap-4 bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-primary/40 rounded-2xl px-6 py-4 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-normal truncate">Non sai quale nastro scegliere?</p>
                <p className="text-[12px] text-muted-foreground font-light truncate">Fatti guidare dal nostro Advisor in 4 step.</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase font-light text-primary shrink-0">
              Inizia
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </ScrollReveal>

      {/* Category Tabs */}
      <ScrollReveal delay={0.1}>
        <div className="overflow-x-auto px-10 mb-12" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-2 min-w-max pb-1 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                  active === cat.id
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(products[active] || []).map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i} categoryId={active} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
