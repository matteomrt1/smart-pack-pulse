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
      className="group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-[420px]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.4 }}
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
        {product.eco && (
          <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md z-20 uppercase tracking-wide">
            Eco-Friendly
          </span>
        )}
        {product.badge && !product.eco && (
          <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md z-20 uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs">
          {product.code}
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col relative bg-white z-20">
        <div className="mb-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cod. {product.code}</p>
          <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 transition-opacity duration-300 group-hover:opacity-0">
          {product.desc}
        </p>
        <div className="mt-auto flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
          <div>
            <span className="text-xs text-slate-400">A partire da</span>
            <div className="text-xl font-bold text-slate-900">{product.price}</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Variant Panel (on hover) */}
        <div className="absolute inset-x-0 bottom-0 bg-white border-t border-slate-100 p-5 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transform translate-y-full group-hover:translate-y-0 h-[220px] flex flex-col justify-between transition-transform duration-300">
          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-2">Colore</span>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-6 h-6 rounded-full border border-slate-200 transition-transform hover:scale-110 ${selectedColor === i ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase block mb-2">Misura</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(i)}
                    className={`px-2 py-1 text-xs border rounded transition-colors ${selectedSize === i ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Prezzo Totale</span>
              <span className="text-lg font-bold text-slate-900">{product.price}</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2">
              <span>Aggiungi</span>
              <ShoppingCart className="w-4 h-4" />
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
    <section className="bg-white text-[#111] py-8 pb-10" id="productCategories">
      <div className="text-center px-10 mb-5">
        <p className="text-xl font-medium tracking-[0.06em] uppercase text-[#ef1717] mb-8">
          Le nostre soluzioni per imballaggi
        </p>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto px-10 mb-8" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 min-w-max pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[0.8rem] tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-200 ${
                active === cat.id
                  ? 'bg-[#111] text-white'
                  : 'bg-[#f5f5f5] text-[#111] hover:bg-[#111] hover:text-white hover:-translate-y-px'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
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
