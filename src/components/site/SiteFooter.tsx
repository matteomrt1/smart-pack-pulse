import { useState } from 'react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export function SiteFooter() {
  const [legalOpen, setLegalOpen] = useState<string | null>(null);

  return (
    <>
      <footer className="bg-background text-foreground pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Imballaggi Bustesi</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li>Via Guglielmo Pepe, 5</li>
                <li>21052 Busto Arsizio (VA)</li>
                <li className="pt-2">P.IVA / C.F. 00656270121</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Serve aiuto?</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><a href="tel:+390331628019" className="hover:text-foreground transition-colors">0331 628019</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contatti</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Servizi</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><a href="#servizi" className="hover:text-foreground transition-colors">Panoramica</a></li>
                <li><a href="#productCategories" className="hover:text-foreground transition-colors">Prodotti</a></li>
                <li><a href="#sectorsTrack" className="hover:text-foreground transition-colors">Settori</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Azienda</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><a href="#chi-siamo" className="hover:text-foreground transition-colors">Chi siamo</a></li>
                <li><a href="#sostenibilita" className="hover:text-foreground transition-colors">Sostenibilità</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Lavora con noi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Legale</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><a href="#/privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><button onClick={() => setLegalOpen('cookies')} className="hover:text-foreground cursor-pointer transition-colors">Cookie</button></li>
                <li><a href="#/termini" className="hover:text-foreground transition-colors">Termini</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
            <p className="text-[11px] text-muted-foreground font-light">© Imballaggi Bustesi sas 2026</p>
            <p className="text-[11px] text-muted-foreground font-light tracking-wide">Italia / Italiano</p>
          </div>
        </div>
      </footer>

      {legalOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setLegalOpen(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <section className="w-full max-w-[720px] bg-background rounded-3xl overflow-hidden">
              <header className="flex items-center justify-between gap-3 px-7 py-5 border-b border-border/50">
                <h3 className="text-[14px] font-normal tracking-[0.05em]">
                  {legalOpen === 'privacy' ? 'Informativa Privacy' : legalOpen === 'cookies' ? 'Cookie Policy' : 'Termini e condizioni'}
                </h3>
                <button onClick={() => setLegalOpen(null)} className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-light">
                  Chiudi
                </button>
              </header>
              <div className="px-7 py-6 max-h-[60vh] overflow-auto text-[14px] leading-relaxed text-muted-foreground font-light">
                <p>
                  {legalOpen === 'privacy' && 'Informativa Privacy – Imballaggi Bustesi sas, Via Guglielmo Pepe, 5, 21052 Busto Arsizio (VA). I dati personali vengono trattati nel rispetto del GDPR (Regolamento UE 2016/679).'}
                  {legalOpen === 'cookies' && 'Cookie Policy – Questo sito utilizza cookie tecnici necessari al funzionamento e cookie analitici per migliorare l\'esperienza di navigazione.'}
                  {legalOpen === 'terms' && 'Termini e Condizioni – L\'utilizzo di questo sito è soggetto ai presenti termini. Imballaggi Bustesi sas si riserva il diritto di modificare i contenuti senza preavviso.'}
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
