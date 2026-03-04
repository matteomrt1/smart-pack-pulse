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
      className={`fixed inset-0 bg-white text-foreground z-[5000] transition-all duration-400 ${
        open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto p-6 md:px-12 md:py-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] tracking-[0.25em] uppercase font-light text-muted-foreground">Menu</span>
          <button onClick={onClose} className="text-[11px] tracking-[0.2em] uppercase font-light text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Chiudi</button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 pt-4 gap-12">
          <div className="w-full md:w-[220px] md:border-r border-border/50 md:pr-6">
            <ul className="space-y-1">
              {items.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePanel(item.id)}
                    className={`w-full py-3 flex justify-between items-center text-[13px] tracking-[0.12em] uppercase cursor-pointer transition-colors font-light ${
                      activePanel === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 overflow-y-auto">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6 font-light">{panel.title}</p>
            <div className="flex flex-col gap-8 max-w-[400px]">
              {panel.columns.map((col, i) => (
                <div key={i}>
                  <h3 className="text-[12px] uppercase tracking-[0.15em] mb-2.5 font-normal text-foreground">{col.title}</h3>
                  <ul className="space-y-1.5">
                    {col.links.map((link, j) => (
                      <li key={j}>
                        <button
                          onClick={() => onNavigate(panel.target)}
                          className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light"
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
