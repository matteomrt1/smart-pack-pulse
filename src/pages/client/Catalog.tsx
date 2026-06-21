import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Search } from 'lucide-react';
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

type CategoryId =
  | 'nastri-adesivi'
  | 'scatole-cartone'
  | 'protezione-riempimento'
  | 'film-regge'
  | 'sacchetti-buste'
  | 'sostenibilita';

const categories: { id: CategoryId; label: string }[] = [
  { id: 'nastri-adesivi', label: 'Nastri adesivi' },
  { id: 'scatole-cartone', label: 'Scatole' },
  { id: 'protezione-riempimento', label: 'Protezione e riempimento' },
  { id: 'film-regge', label: 'Film estensibili e regge' },
  { id: 'sacchetti-buste', label: 'Sacchetti e buste' },
  { id: 'sostenibilita', label: 'Sostenibilità' },
];

const categoryImages: Record<CategoryId, string> = {
  'nastri-adesivi': imgNastri,
  'scatole-cartone': imgScatole,
  'protezione-riempimento': imgProtezione,
  'film-regge': imgFilm,
  'sacchetti-buste': imgSacchetti,
  'sostenibilita': imgSostenibilita,
};

interface Product {
  id: string;
  name: string;
  desc: string;
  code: string;
  category: CategoryId;
  image: string;
  eco?: boolean;
  badge?: string;
  sizes: string[];
}

const products: Product[] = [
  // Nastri
  { id: 'p1', category: 'nastri-adesivi', name: 'Biotape PLA Ecologico', desc: 'Nastro compostabile in PLA, impatto zero.', code: 'P1', eco: true, sizes: ['50mm x 66m', '75mm x 66m'], image: imgP1 },
  { id: 'p2', category: 'nastri-adesivi', name: 'Nastro Riciclato Kraft', desc: 'Materiali 100% riciclati per spedizioni green.', code: 'P2', sizes: ['50mm', '75mm'], image: imgP2 },
  { id: 'p3', category: 'nastri-adesivi', name: 'PP Hot Melt Standard', desc: 'Il nastro più venduto: affidabile e versatile.', code: 'P3', badge: 'Best Seller', sizes: ['48mm', '75mm'], image: imgP3 },
  { id: 'p4', category: 'nastri-adesivi', name: 'Nastro PVC Premium', desc: 'Massima resistenza e silenziosità allo srotolamento.', code: 'P4', sizes: ['48mm', '75mm'], image: imgP4 },
  { id: 'p5', category: 'nastri-adesivi', name: 'Nastro PP Acrilico Silenzioso', desc: 'Srotolamento silenzioso, ideale per uffici e magazzini.', code: 'P5', sizes: ['48mm', '75mm'], image: imgP5 },
  { id: 'p6', category: 'nastri-adesivi', name: 'Mascheratura 60°', desc: 'Ideale per edilizia e verniciature leggere.', code: 'P6', sizes: ['19mm', '25mm', '38mm', '50mm'], image: imgP6 },
  { id: 'p7', category: 'nastri-adesivi', name: 'Mascheratura UV Blue', desc: 'Resistente ai raggi UV per esterni (14 giorni).', code: 'P7', sizes: ['25mm', '50mm'], image: imgP7 },
  { id: 'p8', category: 'nastri-adesivi', name: 'Nastro Filament', desc: 'Rinforzato con fibre di vetro per carichi pesanti.', code: 'P8', badge: 'Heavy Duty', sizes: ['25mm', '50mm'], image: imgP8 },
  // Scatole
  { id: 's1', category: 'scatole-cartone', name: 'Scatola Americana 40×30×30', desc: 'Scatola standard per spedizioni medie.', code: 'S1', sizes: ['40×30×30'], image: imgS1 },
  { id: 's2', category: 'scatole-cartone', name: 'Scatola Americana 60×40×40', desc: 'Per spedizioni di grandi dimensioni.', code: 'S2', sizes: ['60×40×40'], image: imgS2 },
  { id: 's3', category: 'scatole-cartone', name: 'Scatola Fustellata', desc: 'Design personalizzato per prodotti specifici.', code: 'S3', sizes: ['Su misura'], image: imgS3 },
  // Protezione
  { id: 'pr1', category: 'protezione-riempimento', name: 'Pluriball Standard', desc: 'Protezione classica per oggetti fragili.', code: 'PR1', sizes: ['50cm', '100cm'], image: imgPr1 },
  { id: 'pr2', category: 'protezione-riempimento', name: 'Carta Kraft Imbottitura', desc: 'Riempimento eco-friendly riciclabile.', code: 'PR2', eco: true, sizes: ['40cm', '60cm'], image: imgPr2 },
  { id: 'pr3', category: 'protezione-riempimento', name: 'Schiuma PE Espanso', desc: 'Alta protezione per oggetti delicati.', code: 'PR3', sizes: ['1mm', '2mm', '5mm'], image: imgPr3 },
  // Film e regge
  { id: 'f1', category: 'film-regge', name: 'Film Estensibile Manuale', desc: 'Per palettizzazione manuale.', code: 'F1', sizes: ['20μ', '23μ'], image: imgF1 },
  { id: 'f2', category: 'film-regge', name: 'Reggetta PP', desc: 'Reggettatura per colli pesanti.', code: 'F2', sizes: ['12mm', '15mm'], image: imgF2 },
  // Sacchetti
  { id: 'sb1', category: 'sacchetti-buste', name: 'Busta Trasparente LDPE', desc: 'Buste per confezionamento leggero.', code: 'SB1', sizes: ['20×30', '30×40', '40×60'], image: imgSb1 },
  { id: 'sb2', category: 'sacchetti-buste', name: 'Sacchetto Zip Lock', desc: 'Chiusura richiudibile per piccoli oggetti.', code: 'SB2', sizes: ['10×15', '15×20', '20×30'], image: imgSb2 },
  // Sostenibilità
  { id: 'e1', category: 'sostenibilita', name: 'Biotape PLA Ecologico', desc: 'Nastro compostabile in PLA, impatto zero.', code: 'E1', eco: true, sizes: ['50mm', '75mm'], image: imgE1 },
  { id: 'e2', category: 'sostenibilita', name: 'Carta Kraft Imbottitura', desc: 'Riempimento eco-friendly riciclabile.', code: 'E2', eco: true, sizes: ['40cm', '60cm'], image: imgE2 },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="px-6 md:px-12 py-10 md:py-14 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground font-light">
          Area Cliente
        </span>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">Catalogo Prodotti</h1>
        <p className="text-sm text-muted-foreground font-light">
          Esplora i materiali disponibili per l'imballaggio
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            Tutti
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(product => {
          const image = product.image || categoryImages[product.category];
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-44 overflow-hidden bg-secondary/30">
                {image && (
                  <img
                    src={image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {product.eco && (
                  <span className="absolute top-3 left-3 bg-accent/10 text-accent text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-[0.12em]">
                    <Leaf className="w-3 h-3 inline mr-1" />Eco
                  </span>
                )}
                {product.badge && !product.eco && (
                  <span className="absolute top-3 left-3 bg-primary/10 text-primary text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-[0.12em]">
                    {product.badge}
                  </span>
                )}
              </div>
              <CardContent className="p-5">
                <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-[0.15em] mb-1.5">
                  {product.code}
                </p>
                <h3 className="font-medium text-sm mb-2 leading-snug">{product.name}</h3>
                <p className="text-xs text-muted-foreground font-light mb-3 line-clamp-2">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.sizes.map(s => (
                    <span key={s} className="text-[11px] bg-secondary/60 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-end">
                  <Badge variant="secondary" className="text-[10px]">Disponibile</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full text-center py-12">
            Nessun prodotto trovato.
          </p>
        )}
      </div>
    </div>
  );
}
