import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const menuData = {
  'menu-prodotti': {
    title: 'Soluzioni per imballaggi',
    columns: [
      { title: 'Nastri adesivi', links: ['Nastri adesivi ecologici', 'Nastri personalizzati', 'Nastri per mascheratura', 'Nastri telati e antiscivolo'] },
      { title: 'Scatole & cartone', links: ['Scatole in cartone', 'Protezione e riempimento', 'Sacchetti e buste'] },
      { title: 'Film & regge', links: ['Film estensibili', 'Regge per pallet', 'Soluzioni sostenibili'] },
    ],
    target: 'productCategories',
  },
  'menu-servizi': {
    title: 'Cosa facciamo per te',
    columns: [
      { title: 'Assistenza', links: ['Assistenza integrata', 'Supporto nella scelta dei materiali'] },
      { title: 'Custom design', links: ['Studi di imballo personalizzati', 'Branding su nastri e scatole'] },
      { title: 'Valore & qualità', links: ['Valore al Prodotto', 'Qualità e Sostenibilità'] },
    ],
    target: 'servizi',
  },
  'menu-settori': {
    title: 'Settori che serviamo',
    columns: [
      { title: 'Logistica & Trasporti', links: ['Industria della Logistica', 'Imprese di Traslochi'] },
      { title: 'Industria', links: ['Industria Automobilistica', 'Industria Alimentare e Beverage', 'Industria delle Costruzioni'] },
      { title: 'Retail & altri', links: ['Allestimento fiere e negozi', 'Industria Stampa e Grafica', 'Industria del Mobile', 'Bricolage e Fai da te'] },
    ],
    target: 'sectorsTrack',
  },
};

type PanelKey = keyof typeof menuData;

export function MegaMenu({ open, onClose, onNavigate }: MegaMenuProps) {
  const [activePanel, setActivePanel] = useState<PanelKey>('menu-prodotti');
  const items: { id: PanelKey; label: string }[] = [
    { id: 'menu-prodotti', label: 'Prodotti' },
    { id: 'menu-servizi', label: 'Servizi' },
    { id: 'menu-settori', label: 'Settori' },
  ];

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

  const panel = menuData[activePanel];

  return (
    <div
      className={`fixed inset-0 bg-white text-[#111] z-[5000] transition-all duration-350 ${
        open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-[1400px] p-5 md:px-10 md:py-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 text-[0.8rem] tracking-[0.18em] uppercase">
          <span>Menu principale</span>
          <button onClick={onClose} className="cursor-pointer">Chiudi</button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 border-t border-[#e0e0e0] pt-4 gap-8">
          <div className="w-full md:w-[260px] md:border-r border-[#eee] md:pr-4 overflow-y-auto">
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePanel(item.id)}
                    className={`w-full py-3.5 px-1 flex justify-between items-center text-[0.9rem] tracking-[0.16em] uppercase cursor-pointer transition-colors ${
                      activePanel === item.id ? 'font-semibold' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 overflow-y-auto pl-0 md:pl-2">
            <p className="text-[0.8rem] tracking-[0.18em] uppercase text-[#777] mb-4">{panel.title}</p>
            <div className="flex flex-col gap-7 max-w-[420px]">
              {panel.columns.map((col, i) => (
                <div key={i}>
                  <h3 className="text-[0.9rem] uppercase tracking-[0.12em] mb-2">{col.title}</h3>
                  <ul className="text-[0.9rem] leading-[1.6]">
                    {col.links.map((link, j) => (
                      <li key={j} className="mt-1">
                        <button
                          onClick={() => onNavigate(panel.target)}
                          className="relative text-[#222] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-[#111] after:transition-[width] after:duration-200 cursor-pointer"
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
