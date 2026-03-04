import { useState } from 'react';

export function SiteFooter() {
  const [legalOpen, setLegalOpen] = useState<string | null>(null);

  return (
    <>
      <footer className="bg-white text-foreground pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Imballaggi Bustesi</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li>Via Guglielmo Pepe, 5</li>
                <li>21052 Busto Arsizio VA</li>
                <li className="pt-2">P.IVA 000000000000</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Serve aiuto?</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><a href="tel:+390000000000" className="hover:text-foreground transition-colors">+39 00 000 00 000</a></li>
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
                <li><a href="#" className="hover:text-foreground transition-colors">Chi siamo</a></li>
                <li><a href="#sostenibilita" className="hover:text-foreground transition-colors">Sostenibilità</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Lavora con noi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-4 font-normal">Legale</h4>
              <ul className="text-[13px] text-muted-foreground space-y-1.5 font-light">
                <li><button onClick={() => setLegalOpen('privacy')} className="hover:text-foreground cursor-pointer transition-colors">Privacy</button></li>
                <li><button onClick={() => setLegalOpen('cookies')} className="hover:text-foreground cursor-pointer transition-colors">Cookie</button></li>
                <li><button onClick={() => setLegalOpen('terms')} className="hover:text-foreground cursor-pointer transition-colors">Termini</button></li>
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
            <section className="w-full max-w-[720px] bg-white rounded-3xl overflow-hidden">
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
