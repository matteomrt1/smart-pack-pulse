import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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
        className={`fixed top-0 left-0 w-full z-[1000] grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-all duration-500 ease-out ${
          isCompact
            ? 'bg-white/80 backdrop-blur-xl text-foreground px-5 py-3'
            : 'text-white px-5 py-4 md:px-12 md:py-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.25)]'
        }`}
      >
        <div className="flex items-center gap-3 justify-self-start">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] cursor-pointer group"
            aria-label="Apri il menu"
          >
            <span className="w-[16px] h-[0.5px] bg-current block transition-all group-hover:w-[20px]" />
            <span className="w-[16px] h-[0.5px] bg-current block" />
            <span className="w-[16px] h-[0.5px] bg-current block transition-all group-hover:w-[12px]" />
          </button>
          <span className="hidden md:inline text-[0.75rem] tracking-[0.2em] uppercase font-light">Menu</span>
        </div>

        <div className="justify-self-center">
          <Link to="/" className="block">
            <span className={`font-light tracking-[0.18em] uppercase ${isCompact ? 'text-sm' : 'text-base md:text-xl'} transition-all duration-500`}>
              Imballaggi Bustesi
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <button
            onClick={() => setContactOpen(true)}
            className="text-[0.65rem] md:text-[0.72rem] tracking-[0.2em] uppercase whitespace-nowrap cursor-pointer font-light hover:opacity-60 transition-opacity"
          >
            CONTATTI
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 rounded-full border border-current/30 inline-flex items-center justify-center cursor-pointer hover:opacity-60 transition-opacity"
            aria-label="Cerca nel sito"
          >
            <Search className="w-[14px] h-[14px]" />
          </button>
        </div>
      </header>

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={scrollTo} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={scrollTo} />
    </>
  );
}
