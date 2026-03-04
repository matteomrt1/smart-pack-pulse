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
      className={`fixed inset-0 z-[5000] flex justify-end transition-opacity duration-250 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex-1 bg-black/45" onClick={onClose} />
      <div className="w-[60vw] max-w-[720px] min-w-[320px] md:min-w-[480px] h-screen bg-primary text-primary-foreground flex flex-col p-7 md:p-11 shadow-[-16px_0_40px_rgba(0,0,0,0.2)]">
        <header className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl tracking-[0.22em] uppercase">Contattaci</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center" aria-label="Chiudi">
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[460px]">
            <p className="text-[0.9rem] leading-[1.8] mb-10 text-white/90">
              Il nostro team sarà disponibile a supportarti per ogni tua necessità, servizio o customizzazione.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="w-[26px] h-[26px] rounded-full border border-white/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <a href="tel:0331628019" className="text-[0.95rem] hover:underline">0331 628019</a>
                  <p className="text-[0.78rem] mt-0.5 opacity-80">Lun-Ven, 8:00–18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-[26px] h-[26px] rounded-full border border-white/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <div>
                  <a href="mailto:info@imballaggibustesi.it" className="text-[0.95rem] hover:underline">info@imballaggibustesi.it</a>
                  <p className="text-[0.78rem] mt-0.5 opacity-80">Scrivici per particolari richieste, prodotti o servizi.</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-[26px] h-[26px] rounded-full border border-white/80 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                </span>
                <div>
                  <a href="#" className="text-[0.95rem] hover:underline">WhatsApp</a>
                  <p className="text-[0.78rem] mt-0.5 opacity-80">Contattaci via mobile</p>
                </div>
              </li>
            </ul>

            <hr className="border-t border-white/25 my-8" />

            <ul className="space-y-3.5">
              <li><button className="text-[0.9rem] hover:underline cursor-pointer">Serve Aiuto?</button></li>
              <li><button className="text-[0.9rem] hover:underline cursor-pointer">FAQ</button></li>
              <li><button className="text-[0.9rem] hover:underline cursor-pointer">Assistenza</button></li>
              <li>
                <button onClick={() => setOfficesOpen(!officesOpen)} className="text-[0.9rem] hover:underline cursor-pointer flex items-center gap-1">
                  La nostra sede <ChevronDown className={`w-3 h-3 transition-transform ${officesOpen ? 'rotate-180' : ''}`} />
                </button>
                <ul className={`ml-4 mt-1.5 space-y-2 text-[13px] overflow-hidden transition-all duration-300 ${officesOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <li><strong>BUSTO ARSIZIO</strong></li>
                  <li><strong>Via Guglielmo Pepe, 5, 21052 Busto Arsizio VA</strong></li>
                  <li><strong>Provincia di Varese</strong></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 pt-5 border-t border-white/20 text-center">
          <span className="text-lg font-bold tracking-[0.12em] uppercase opacity-95">Imballaggi Bustesi</span>
        </div>
      </div>
    </div>
  );
}
