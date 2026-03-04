import { useEffect } from 'react';
import { X, Phone, Mail, MessageCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ContactPanelProps {
  open: boolean;
  onClose: () => void;
}

export function ContactPanel({ open, onClose }: ContactPanelProps) {
  const [officesOpen, setOfficesOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[5000] flex justify-end transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="w-[55vw] max-w-[600px] min-w-[320px] h-screen bg-white text-foreground flex flex-col p-8 md:p-12 shadow-[-8px_0_30px_rgba(0,0,0,0.08)]">
        <header className="flex items-center justify-between gap-4 mb-10">
          <h2 className="text-[13px] tracking-[0.25em] uppercase font-light">Contattaci</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Chiudi">
            <X className="w-3.5 h-3.5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[400px]">
            <p className="text-[14px] leading-[1.8] mb-10 text-muted-foreground font-light">
              Il nostro team sarà disponibile a supportarti per ogni tua necessità.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                </span>
                <div>
                  <a href="tel:0331628019" className="text-[14px] hover:text-primary transition-colors">0331 628019</a>
                  <p className="text-[12px] mt-1 text-muted-foreground font-light">Lun-Ven, 8:00–18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                </span>
                <div>
                  <a href="mailto:info@imballaggibustesi.it" className="text-[14px] hover:text-primary transition-colors">info@imballaggibustesi.it</a>
                  <p className="text-[12px] mt-1 text-muted-foreground font-light">Scrivici per qualsiasi richiesta.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
                </span>
                <div>
                  <a href="#" className="text-[14px] hover:text-primary transition-colors">WhatsApp</a>
                  <p className="text-[12px] mt-1 text-muted-foreground font-light">Contattaci via mobile</p>
                </div>
              </li>
            </ul>

            <hr className="border-t border-border/50 my-10" />

            <ul className="space-y-3">
              <li><button className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light">Serve Aiuto?</button></li>
              <li><button className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light">FAQ</button></li>
              <li>
                <button onClick={() => setOfficesOpen(!officesOpen)} className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light flex items-center gap-1">
                  La nostra sede <ChevronDown className={`w-3 h-3 transition-transform ${officesOpen ? 'rotate-180' : ''}`} />
                </button>
                <ul className={`ml-4 mt-2 space-y-1.5 text-[12px] text-muted-foreground font-light overflow-hidden transition-all duration-300 ${officesOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <li>Busto Arsizio</li>
                  <li>Via Guglielmo Pepe, 5</li>
                  <li>21052 – Provincia di Varese</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-border/50 text-center">
          <span className="text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground">Imballaggi Bustesi</span>
        </div>
      </div>
    </div>
  );
}
