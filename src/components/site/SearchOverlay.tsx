import { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const searchData = [
  { title: 'Prodotti', target: 'productCategories', items: ['Nastri adesivi ecologici', 'Nastri personalizzati', 'Nastri per mascheratura', 'Film estensibili e regge', 'Scatole in cartone', 'Protezione e riempimento', 'Sacchetti e buste'] },
  { title: 'Servizi', target: 'servizi', items: ['Assistenza integrata', 'Custom design', 'Valore al Prodotto', 'Qualità e Sostenibilità'] },
  { title: 'Settori', target: 'sectorsTrack', items: ['Industria della Logistica', 'Industria Automobilistica', 'Industria Alimentare', 'Industria delle Costruzioni'] },
];

export function SearchOverlay({ open, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    else setQuery('');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const q = query.toLowerCase().trim();
  const filtered = searchData.map(g => ({ ...g, items: g.items.filter(i => !q || i.toLowerCase().includes(q)) })).filter(g => g.items.length > 0);

  return (
    <div
      className={`fixed left-0 right-0 top-0 h-[420px] bg-white/95 backdrop-blur-xl text-foreground z-[5000] transition-all duration-400 ${
        open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center justify-between gap-6 pb-6 mb-6">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca..."
            className="w-full border-none bg-transparent text-[18px] font-light py-2 outline-none placeholder:text-muted-foreground/50 tracking-wide"
          />
          <button onClick={onClose} className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light whitespace-nowrap">Chiudi</button>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[calc(100%-100px)] overflow-y-auto">
            {filtered.map((group, i) => (
              <div key={i}>
                <h3 className="text-[11px] uppercase tracking-[0.25em] mb-3 text-muted-foreground font-light">{group.title}</h3>
                <ul className="space-y-1.5">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <button
                        onClick={() => { onClose(); onNavigate(group.target); }}
                        className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light text-left"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-muted-foreground font-light">Nessun risultato.</p>
        )}
      </div>
    </div>
  );
}
