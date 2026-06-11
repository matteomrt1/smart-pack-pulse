## Obiettivo
Creare una pagina dedicata `/termini` con i Termini e Condizioni di Imballaggi Bustesi sas, ricalcata sulla struttura legale del modello PPM/iubenda condiviso, ma:
- limitata alla giurisdizione **Italia ed Europa** (rimuovo le sezioni "Utenti USA" e "Utenti australiani");
- adattata ai servizi reali del sito (sito vetrina + modulo contatto, niente account utente, niente vendita online);
- stessa estetica della Privacy Policy già pubblicata.

## Dati Titolare riusati dal `COMPANY` config
- Imballaggi Bustesi sas
- Via Guglielmo Pepe, 5 — 21052 Busto Arsizio (VA)
- P.IVA / C.F. 00656270121
- Tel. 0331 628019
- Email: `info@imballaggibustesi.it` (per comunicazioni legali)

## Struttura del documento (clonata dal modello, ridotta a IT/UE)
1. Intestazione + "Da sapere a colpo d'occhio"
2. Titolare (dati sopra)
3. Condizioni d'uso (requisiti Utenti, nessuna restrizione Consumer/Pro)
4. Contenuti su questa Applicazione
5. Diritti sui contenuti (proprietà intellettuale, divieti di copia/redistribuzione)
6. Accesso a risorse esterne
7. Uso ammesso (cosa è vietato, misure del Titolare)
8. Limitazione di responsabilità e manleva — **solo blocco generale + clausola Utenti europei / Utenti Commerciali** (cap 12 mesi). Rimuovo "Utenti USA" e "Utenti australiani".
9. Disposizioni comuni:
   - Nessuna rinuncia implicita
   - Interruzione del Servizio
   - Rivendita del Servizio
   - Privacy policy (link interno a `/privacy`)
   - Proprietà intellettuale
   - Modifiche dei Termini
   - Cessione del contratto
   - Contatti
10. Clausola di salvaguardia (variante **Utenti europei** soltanto)
11. Legge applicabile (legge italiana) + Foro competente (sede del Titolare) + eccezione Consumatori UE/UK/CH/NO/IS
12. Definizioni e riferimenti legali (Applicazione, Accordo, Utente Commerciale, Europeo, Titolare, Servizio, Termini, Utente, Consumatore)
13. Data di ultima modifica

## Implementazione tecnica

### File nuovo
- `src/pages/legal/TermsConditions.tsx` — clone strutturale di `PrivacyPolicy.tsx`:
  - Stessi `H2`, `H3`, `P` helper, stesso layout `max-w-3xl mx-auto px-6 py-24`
  - Stesso `SiteHeader` + `SiteFooter` riusati
  - Stesso indice anchor in cima e blocco "ultima modifica" in fondo
  - Stessa costante `COMPANY` (duplicata o estratta)

### File da modificare
- `src/App.tsx` → aggiungere `import TermsConditions` e `<Route path="/termini" element={<TermsConditions />} />`
- `src/components/site/SiteFooter.tsx` → il bottone "Termini" sostituisce l'apertura del modal con `<a href="#/termini">` (coerente con la Privacy già linkata via HashRouter)

## Note
- Niente sezioni USA/AU come richiesto.
- La sezione "Privacy policy" punta a `#/privacy`.
- Disclaimer: testo modello, **non sostituisce validazione legale** — consigliata revisione da consulente prima del go-live, specialmente per limitazioni di responsabilità e foro competente.
