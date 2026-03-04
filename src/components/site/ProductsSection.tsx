import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, ShoppingCart } from 'lucide-react';

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

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <motion.article
      className="group relative bg-white rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden flex flex-col h-[400px]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.04, duration: 0.5 }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden bg-secondary/50 p-6 flex items-center justify-center">
        {product.eco && (
          <span className="absolute top-3 left-3 bg-accent/10 text-accent text-[10px] font-medium px-2.5 py-1 rounded-full z-20 uppercase tracking-[0.12em]">
            Eco
          </span>
        )}
        {product.badge && !product.eco && (
          <span className="absolute top-3 left-3 bg-primary/8 text-primary text-[10px] font-medium px-2.5 py-1 rounded-full z-20 uppercase tracking-[0.12em]">
            {product.badge}
          </span>
        )}
        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground text-[10px] font-light tracking-wider">
          {product.code}
        </div>
        <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors z-20 opacity-0 group-hover:opacity-100 duration-300">
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col relative bg-white z-20">
        <div className="mb-1">
          <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-[0.15em] mb-1.5">{product.code}</p>
          <h3 className="text-[15px] font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4 transition-opacity duration-300 group-hover:opacity-0 font-light">
          {product.desc}
        </p>
        <div className="mt-auto flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
          <div>
            <span className="text-[10px] text-muted-foreground font-light">da</span>
            <div className="text-lg font-normal text-foreground">{product.price}</div>
          </div>
          <button className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Variant Panel */}
        <div className="absolute inset-x-0 bottom-0 bg-white p-5 transform translate-y-full group-hover:translate-y-0 h-[200px] flex flex-col justify-between transition-transform duration-400">
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
                    className={`px-2.5 py-1 text-[11px] rounded-full transition-colors ${selectedSize === i ? 'bg-foreground text-white' : 'bg-secondary/60 text-foreground hover:bg-secondary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between">
            <span className="text-lg font-normal text-foreground">{product.price}</span>
            <button className="bg-foreground text-white text-[11px] font-normal px-4 py-2 rounded-full hover:bg-primary transition-colors flex items-center gap-2 tracking-wide">
              Aggiungi
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsSection() {
  const [active, setActive] = useState('nastri-adesivi');

  return (
    <section className="bg-white text-foreground py-28" id="productCategories">
      <div className="text-center px-10 mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-light">Catalogo</p>
        <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-light tracking-[0.08em] uppercase">
          Le nostre soluzioni
        </h2>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto px-10 mb-12" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 min-w-max pb-1 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                active === cat.id
                  ? 'bg-foreground text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

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
              <ProductCard key={product.id} product={product} delay={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
