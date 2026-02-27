import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Menu } from 'lucide-react';
import { ContactPanel } from './ContactPanel';
import { MegaMenu } from './MegaMenu';
import { SearchOverlay } from './SearchOverlay';

export function SiteHeader() {
  const [isCompact, setIsCompact] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 10 || window.innerWidth <= 768);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    setSearchOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 transition-all duration-300 ${
          isCompact
            ? 'bg-white/[0.98] text-[#111] shadow-[0_2px_12px_rgba(0,0,0,0.15)] px-3.5 py-2.5'
            : 'mix-blend-difference text-white px-3.5 py-2.5 md:px-10 md:py-5'
        }`}
      >
        <div className="flex items-center gap-2.5 justify-self-start">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1 cursor-pointer"
            aria-label="Apri il menu"
          >
            <span className="w-[18px] h-px bg-current block" />
            <span className="w-[18px] h-px bg-current block" />
            <span className="w-[18px] h-px bg-current block" />
          </button>
          <span className="hidden md:inline text-[0.85rem] tracking-[0.14em] uppercase">Menu</span>
        </div>

        <div className="justify-self-center">
          <Link to="/" className="block">
            <span className={`font-bold tracking-[0.12em] uppercase ${isCompact ? 'text-base' : 'text-lg md:text-2xl'} transition-all duration-500`}>
              Imballaggi Bustesi
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2.5 justify-self-end">
          <button
            onClick={() => setContactOpen(true)}
            className="text-[0.62rem] md:text-[0.8rem] tracking-[0.10em] md:tracking-[0.16em] uppercase whitespace-nowrap cursor-pointer"
          >
            CONTATTI
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="w-[34px] h-[34px] rounded-full border border-current inline-flex items-center justify-center cursor-pointer"
            aria-label="Cerca nel sito"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
        </div>
      </header>

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={scrollTo} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={scrollTo} />
    </>
  );
}
