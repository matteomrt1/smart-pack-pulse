## Obiettivo
Creare una pagina dedicata `/privacy` con la Privacy Policy di Imballaggi Bustesi sas, basata sulla struttura legale del competitor PPM Industries ma adattata ai trattamenti effettivamente svolti dal sito (solo modulo di contatto + email diretta, niente newsletter, niente analytics, niente reCAPTCHA, niente Mailchimp, niente embed YouTube).

## Dati Titolare da inserire
- **Ragione sociale**: Imballaggi Bustesi sas
- **Sede**: Via Guglielmo Pepe 5, 21052 Busto Arsizio (VA)
- **P.IVA / C.F.**: 00656270121
- **Email contatto privacy**: privacy@imballaggibustesi.it (placeholder — da confermare; in alternativa uso `info@imballaggibustesi.it`)
- **Telefono**: 0331 628019

## Struttura del documento (clonata da PPM, ridotta ai trattamenti reali)
1. Intestazione + riassunto policy
2. Titolare del Trattamento (dati sopra)
3. Tipologie di Dati raccolti
4. Modalità e luogo del trattamento
5. Periodo di conservazione
6. Finalità del trattamento
7. **Dettagli sul trattamento** — solo due voci:
   - Modulo di contatto (nome, cognome, ragione sociale, email, telefono, messaggio)
   - Comunicazioni email dirette via `info@imballaggibustesi.it`
   - Log di sistema (IP, user-agent) — finalità di sicurezza e manutenzione
8. Cookie Policy → rimando a pagina/sezione dedicata (cookie tecnici essenziali only)
9. Base giuridica (art. 6 GDPR)
10. Diritti dell'Utente (accesso, rettifica, cancellazione, opposizione, portabilità, reclamo al Garante)
11. Come esercitare i diritti
12. Difesa in giudizio, log di sistema, modifiche alla policy
13. Definizioni e riferimenti legali
14. Data di ultima modifica

## Implementazione tecnica

### File nuovi
- `src/pages/legal/PrivacyPolicy.tsx` — pagina full-page con:
  - `SiteHeader` + `SiteFooter` riusati
  - Container `max-w-3xl mx-auto px-6 py-24`
  - Tipografia Inter, h1/h2/h3 con tracking minimal, paragrafi `text-muted-foreground leading-relaxed`
  - Indice (anchor links) cliccabile in cima
  - Aderente al design system (rounded-3xl, bg bianco, accenti blue)

### File da modificare
- `src/App.tsx` → aggiungere `<Route path="/privacy" element={<PrivacyPolicy />} />`
- `src/components/site/SiteFooter.tsx` → il bottone "Privacy" sostituisce l'apertura del modal con `<Link to="/privacy">` (uso `HashRouter`, quindi `#/privacy`). Lascio invariati Cookie e Termini per ora.

## Compliance — punti che dovrai verificare prima del go-live
Lista delle cose da controllare oltre ai dati anagrafici:

1. **Hosting reale del sito** — va dichiarato il provider (es. Lovable/Vercel/Netlify) e il paese del server. Adesso lo lascio come "fornitore di hosting cloud (UE)" da aggiornare.
2. **Email di privacy dedicata** — `privacy@imballaggibustesi.it` esiste? Altrimenti uso `info@`.
3. **DPO / Responsabile Protezione Dati** — non obbligatorio per una sas commerciale, ma se nominato va indicato.
4. **Form di contatto** — verificare che i dati inseriti finiscano davvero solo via email e non in un DB esterno. Se in futuro userai Lovable Cloud/Supabase per salvarli, va aggiunto.
5. **Cookie tecnici** — confermare che il sito usa solo cookie tecnici essenziali (no GA, no Meta Pixel, no Hotjar). Se aggiungerai analytics serve banner cookie + aggiornamento.
6. **Trasferimenti extra-UE** — al momento nessuno. Da rivedere se aggiungi servizi USA.
7. **Periodo di conservazione** — definire quanto tieni le email di contatto (proposta: 24 mesi dall'ultimo contatto).
8. **Registro dei trattamenti** — obbligo interno GDPR art. 30, non va in policy ma va tenuto.
9. **Newsletter / marketing** — non inclusi. Se attivati servirà opt-in esplicito + sezione dedicata.
10. **Whistleblower** — PPM la cita perché >50 dipendenti. Verificare se Imballaggi Bustesi rientra nell'obbligo (D.Lgs 24/2023).

## Disclaimer
Il testo prodotto è un modello redatto seguendo la struttura del competitor e i principi GDPR; **non sostituisce una validazione legale**. Consigliato far revisionare da un consulente prima della pubblicazione definitiva.
