import { useState } from 'react';

export function SiteFooter() {
  const [legalOpen, setLegalOpen] = useState<string | null>(null);

  return (
    <>
      <footer className="bg-white text-[#111] border-t border-[#e0e0e0] pt-[50px] pb-[30px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 text-[0.9rem]">
          {/* Nav Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            <div>
              <h4 className="text-[0.85rem] uppercase tracking-[0.12em] mb-2.5">Imballaggi Bustesi</h4>
              <ul className="text-[0.86rem] text-[#444] space-y-1">
                <li>Via Guglielmo Pepe, 5, 21052 Busto Arsizio VA</li>
                <li>C.F. e R.I. di Varese 000000000000</li>
                <li>P.IVA 000000000000</li>
                <li>REA VA - 000000</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.85rem] uppercase tracking-[0.12em] mb-2.5">Serve aiuto?</h4>
              <ul className="text-[0.86rem] text-[#444] space-y-1">
                <li><a href="tel:+390000000000" className="hover:text-black hover:underline">Chiamaci +39 00 000 00 000</a></li>
                <li><a href="#" className="hover:text-black hover:underline">Scrivici su WhatsApp</a></li>
                <li><a href="#" className="hover:text-black hover:underline">Contatti</a></li>
                <li><a href="#" className="hover:text-black hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.85rem] uppercase tracking-[0.12em] mb-2.5">Servizi</h4>
              <ul className="text-[0.86rem] text-[#444] space-y-1">
                <li><a href="#servizi" className="hover:text-black hover:underline">Panoramica servizi</a></li>
                <li><a href="#productCategories" className="hover:text-black hover:underline">Prodotti</a></li>
                <li><a href="#sectorsTrack" className="hover:text-black hover:underline">Settori che serviamo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.85rem] uppercase tracking-[0.12em] mb-2.5">Azienda</h4>
              <ul className="text-[0.86rem] text-[#444] space-y-1">
                <li><a href="#" className="hover:text-black hover:underline">Chi siamo</a></li>
                <li><a href="#sostenibilita" className="hover:text-black hover:underline">Sostenibilità</a></li>
                <li><a href="#" className="hover:text-black hover:underline">Lavora con noi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.85rem] uppercase tracking-[0.12em] mb-2.5 cursor-pointer" onClick={() => setLegalOpen('legal')}>Legale</h4>
              <ul className="text-[0.86rem] text-[#444] space-y-1">
                <li><button onClick={() => setLegalOpen('privacy')} className="hover:text-black hover:underline cursor-pointer">Informativa Privacy</button></li>
                <li><button onClick={() => setLegalOpen('cookies')} className="hover:text-black hover:underline cursor-pointer">Cookie Policy</button></li>
                <li><button onClick={() => setLegalOpen('terms')} className="hover:text-black hover:underline cursor-pointer">Termini e condizioni</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-[#e0e0e0] pt-3.5 mt-1.5">
            <p className="text-[0.8rem] text-[#777]">© Imballaggi Bustesi sas 2026</p>
            <div className="flex gap-3.5 flex-wrap">
              <span className="text-[0.8rem] tracking-[0.12em] uppercase text-[#111]">Trova un negozio</span>
              <span className="text-[0.8rem] tracking-[0.12em] uppercase text-[#111] opacity-80">
                Paese di consegna: Italia / Italiano
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Overlay */}
      {legalOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setLegalOpen(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <section className="w-full max-w-[920px] bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.25)] overflow-hidden">
              <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-black/10">
                <h3 className="text-lg font-semibold">
                  {legalOpen === 'privacy' ? 'Informativa Privacy' : legalOpen === 'cookies' ? 'Cookie Policy' : legalOpen === 'terms' ? 'Termini e condizioni' : 'Legale'}
                </h3>
                <button onClick={() => setLegalOpen(null)} className="border border-black/15 bg-white rounded-[10px] px-2.5 py-2 cursor-pointer text-sm">
                  Chiudi
                </button>
              </header>
              <div className="px-5 py-4 max-h-[min(70vh,680px)] overflow-auto text-sm leading-[1.6] text-black/80">
                <p>
                  {legalOpen === 'privacy' && 'Informativa Privacy – Imballaggi Bustesi sas, Via Guglielmo Pepe, 5, 21052 Busto Arsizio (VA). I dati personali vengono trattati nel rispetto del GDPR (Regolamento UE 2016/679). Per dettagli completi contattare privacy@imballaggibustesi.it.'}
                  {legalOpen === 'cookies' && 'Cookie Policy – Questo sito utilizza cookie tecnici necessari al funzionamento e cookie analitici per migliorare l\'esperienza di navigazione. Puoi gestire le preferenze tramite il banner cookie.'}
                  {legalOpen === 'terms' && 'Termini e Condizioni – L\'utilizzo di questo sito è soggetto ai presenti termini. Imballaggi Bustesi sas si riserva il diritto di modificare i contenuti senza preavviso.'}
                  {legalOpen === 'legal' && 'Ragione sociale: Imballaggi Bustesi sas – Sede: Via Guglielmo Pepe, 5, 21052 Busto Arsizio (VA) – P.IVA e CF: da inserire.'}
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
