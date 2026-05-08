import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Award, Leaf, ChevronRight } from 'lucide-react';
import { getProductDetail } from '@/data/productDetails';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    code: string;
    desc: string;
    eco?: boolean;
    badge?: string;
    sizes: string[];
    colors?: { name: string; hex: string }[];
  } | null;
  image: string;
}

export function ProductDetailDialog({ open, onOpenChange, product, image }: Props) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return null;
  const detail = getProductDetail(product.id);
  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [image, image, image];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-0 rounded-3xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Galleria */}
          <div className="bg-secondary/30 p-6 md:p-10 md:sticky md:top-0 md:self-start">
            <Carousel className="w-full">
              <CarouselContent>
                {gallery.map((src, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-background">
                      <img src={src} alt={`${product.name} - vista ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <div className="flex justify-center gap-1.5 mt-4">
              {gallery.map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-6 md:p-10 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">{product.code}</p>
                {product.eco && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-full uppercase tracking-[0.12em]">
                    <Leaf className="w-3 h-3" /> Eco
                  </span>
                )}
                {product.badge && !product.eco && (
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-[0.12em]">{product.badge}</span>
                )}
              </div>
              <h2 className="text-2xl font-light tracking-tight">{product.name}</h2>
              <p className="text-sm text-muted-foreground mt-2 font-light">{product.desc}</p>
            </div>

            {/* Modelli disponibili */}
            {(detail.models?.length ?? 0) > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light mb-2">Modelli disponibili</p>
                <div className="flex flex-wrap gap-1.5">
                  {detail.models!.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setSelectedSize(i)}
                      className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
                        selectedSize === i ? 'bg-foreground text-background' : 'bg-secondary/60 text-foreground hover:bg-secondary'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colori */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light mb-2">Colore</p>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                        selectedColor === i ? 'ring-1.5 ring-primary ring-offset-2' : 'border-border'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Descrizione lunga */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light mb-2">Descrizione</p>
              <div className="text-sm text-foreground/80 font-light leading-relaxed whitespace-pre-line">
                {detail.longDesc}
              </div>
            </div>

            {/* Specifiche */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light mb-3">Specifiche tecniche</p>
              <div className="rounded-2xl border border-border/60 overflow-hidden">
                <table className="w-full text-[12px]">
                  <tbody>
                    {detail.specs.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-secondary/30' : 'bg-background'}>
                        <td className="px-3 py-2 text-muted-foreground font-light w-2/5 align-top">{row.label}</td>
                        <td className="px-3 py-2 text-foreground font-normal">
                          {row.value || <span className="text-muted-foreground/50 italic">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certificazioni */}
            {detail.certifications.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light mb-2">Certificazioni</p>
                <div className="flex flex-wrap gap-2">
                  {detail.certifications.map(c => (
                    <span key={c} className="inline-flex items-center gap-1.5 bg-secondary/60 text-foreground text-[11px] px-3 py-1.5 rounded-full">
                      <Award className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center gap-2 bg-foreground text-background text-[12px] font-normal px-5 py-3 rounded-full hover:bg-primary transition-colors tracking-wide"
              >
                Contattaci per un'offerta dedicata
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
