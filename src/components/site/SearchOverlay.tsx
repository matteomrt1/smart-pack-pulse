import { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const searchData = [
  {
    title: 'Prodotti',
    target: 'productCategories',
    items: ['Nastri adesivi ecologici', 'Nastri personalizzati', 'Nastri per mascheratura', 'Nastri telati e antiscivolo', 'Film estensibili e regge', 'Scatole in cartone', 'Protezione e riempimento', 'Sacchetti e buste'],
  },
  {
    title: 'Servizi',
    target: 'servizi',
    items: ['Assistenza integrata', 'Custom design', 'Valore al Prodotto', 'Qualità e Sostenibilità'],
  },
  {
    title: 'Settori',
    target: 'sectorsTrack',
    items: ['Industria della Logistica', 'Industria Automobilistica', 'Industria Alimentare e Beverage', 'Industria delle Costruzioni', 'Imprese di Traslochi', 'Allestimento fiere e negozi'],
  },
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

  const filtered = searchData.map(group => ({
    ...group,
    items: group.items.filter(item => !q || item.toLowerCase().includes(q)),
  })).filter(group => group.items.length > 0);

  return (
    <div
      className={`fixed left-0 right-0 top-0 h-[450px] bg-white text-[#111] z-[5000] border-b border-[#e0e0e0] transition-all duration-400 ${
        open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 py-7">
        <div className="flex items-center justify-between gap-6 pb-4 border-b border-[#e0e0e0] mb-5">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cerca nel sito"
              className="w-full border-none border-b border-[#111] bg-transparent text-base py-1.5 outline-none placeholder:text-[#999]"
            />
          </div>
          <button onClick={onClose} className="text-[0.8rem] tracking-[0.16em] uppercase whitespace-nowrap cursor-pointer">Chiudi</button>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-h-[calc(100%-80px)] overflow-y-auto">
            {filtered.map((group, i) => (
              <div key={i}>
                <h3 className="text-[0.85rem] uppercase tracking-[0.18em] mb-2.5">{group.title}</h3>
                <ul className="text-[0.9rem] leading-[1.6]">
                  {group.items.map((item, j) => (
                    <li key={j} className="mt-1">
                      <button
                        onClick={() => { onClose(); onNavigate(group.target); }}
                        className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-[#111] after:transition-[width] after:duration-250 cursor-pointer text-left"
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
          <p className="mt-5 text-[0.85rem] text-[#777]">Nessun risultato trovato.</p>
        )}
      </div>
    </div>
  );
}
