
# Piano: Servizi B2B specialistici + Smart Tape Advisor

## Obiettivo

Aggiungere nella sezione **"Servizio Esclusivo"** di `ServicesSection.tsx` una griglia di **5 pulsanti** che rappresentano i nuovi servizi tecnici ad alto valore B2B. Uno di questi (lo Smart Tape Advisor) è subito **funzionante** su pagina dedicata; gli altri 4 puntano a pagine "coming soon" coerenti graficamente, pronte ad essere riempite in futuro.

Nessuna modifica all'hero, all'ordine delle sezioni o all'identità visiva attuale.

---

## 1. Sezione "Servizio Esclusivo" — restyling

File: `src/components/site/ServicesSection.tsx`

La parte attuale (titolo "Configuratore Imballaggio AI" + un solo bottone) viene trasformata in:

- Eyebrow "Servizi esclusivi" + titolo "Strumenti tecnici per professionisti dell'imballaggio"
- Sottotitolo breve che introduce il concetto: non vendiamo nastri, vendiamo affidabilità
- **Griglia 5 card** (responsive: 1 col mobile, 2 col tablet, 3 col desktop con la prima riga di 3 e la seconda di 2 centrata)

Ogni card è un `<Link>` cliccabile con:
- Icona Lucide (in cerchio con sfondo blue/5)
- Titolo del servizio
- Descrizione breve (1–2 righe)
- Badge "Disponibile" (per Smart Tape Advisor) o "In arrivo" (per gli altri 4)
- Hover: leggero lift + bordo che diventa primary
- Stile coerente con il resto: `rounded-3xl`, `bg-white`, `border-border/40`

### Le 5 card

| # | Titolo | Icona | Route | Stato |
|---|--------|-------|-------|-------|
| 1 | Smart Tape Advisor | `Sparkles` | `/tools/smart-tape-advisor` | Disponibile |
| 2 | Configuratore di Performance | `Gauge` | `/tools/performance-configurator` | In arrivo |
| 3 | Calcolatore TCO | `Calculator` | `/tools/tco-calculator` | In arrivo |
| 4 | Test di Stress (video) | `FlaskConical` | `/tools/stress-test` | In arrivo |
| 5 | Analisi Cartone via Foto | `ScanLine` | `/tools/carton-analysis` | In arrivo |

Il vecchio Configuratore Imballaggio AI rimane accessibile ma viene spostato come **link testuale secondario** sotto la griglia ("Cerchi il configuratore di imballaggio completo? →") per non perderlo.

---

## 2. Smart Tape Advisor — pagina funzionante

File nuovo: `src/pages/tools/SmartTapeAdvisor.tsx`

Wizard a 4 step con stato locale (`useState`), nessun backend. Layout `max-w-3xl mx-auto`, stile coerente con la landing (white bg, rounded-3xl, blue accent).

### Struttura

- **Header pagina**: breadcrumb "Servizi / Smart Tape Advisor", H1 "Trova il nastro perfetto in 4 step", sottotitolo
- **Progress bar**: componente `Progress` di shadcn/ui + label "Step X di 4"
- **Card step**: domanda + 3 opzioni come bottoni grandi cliccabili (icona Lucide + label + descrizione breve). Cliccando si avanza automaticamente allo step successivo
- **Navigation**: bottone "Indietro" (ghost) sempre visibile dallo step 2 in poi
- **Animazione**: transizione fade tra step usando `framer-motion` `AnimatePresence`

### I 4 step

1. **Peso del pacco**: Leggero (0–5 kg) `Feather` / Medio (5–15 kg) `Package` / Pesante (>15 kg) `PackageOpen`
2. **Superficie del cartone**: Standard `Square` / Riciclato Eco `Recycle` / Plastica `Layers`
3. **Ambiente**: Standard `Warehouse` / Cella frigo `Snowflake` / Umidità elevata `Droplets`
4. **Esigenza principale**: Silenziosità `Volume2` / Antimanomissione `ShieldCheck` / Costo minimo `Wallet`

### Algoritmo (logica locale, pure function)

```text
function recommend(answers):
  if answers.weight === 'pesante'
    → "Nastro Rinforzato Filament"
  else if answers.surface === 'riciclato' OR answers.environment === 'cella-frigo'
    → "Nastro in Gomma Naturale (Solvente) / Hot-Melt"
  else if answers.goal === 'silenziosita'
    → "Nastro Acrilico Low-Noise"
  else if answers.goal === 'antimanomissione'
    → "Nastro Antimanomissione VOID"
  else
    → "Nastro Acrilico Universale Alta Adesività"
```

Mappa di 5 prodotti raccomandabili: ciascuno con `name`, `image` (riusiamo gli asset esistenti `p-*.jpg`), `tagline`, `whyBullets` generati dinamicamente in base alle risposte (es. se environment === 'cella-frigo' aggiunge "Adesivo solvente che resiste fino a -20°C").

### Schermata risultato

- Eyebrow "Il tuo nastro ideale"
- H2 con il nome del nastro raccomandato
- Immagine prodotto (rounded-3xl)
- Lista di **3 bullet** "Scelto perché:" — generati dinamicamente combinando i match dell'algoritmo con le risposte effettive
- Box "Le tue risposte" con riepilogo compatto
- 2 CTA: **"Richiedi un campione gratuito"** (primary, blu pieno) + **"Vedi scheda tecnica"** (outline)
- Link testuale "↺ Ricomincia il test"

---

## 3. Pagine "Coming Soon" per gli altri 4 servizi

File nuovo: `src/pages/tools/ToolComingSoon.tsx` (un solo componente riutilizzabile, riceve titolo/descrizione/icona via props o via mappa per route)

Quattro route dedicate, ognuna mostra:
- Stesso header (breadcrumb + H1 specifico)
- Icona grande + descrizione lunga del servizio (presa dal tuo prompt iniziale, sintetizzata)
- Lista delle "feature in sviluppo" come anticipazione
- CTA "Sei interessato? Contattaci" → ancora `#contatti`

Questo garantisce che già da oggi il sito comunichi una roadmap di servizi avanzati.

---

## 4. Routing

File: `src/App.tsx`

Aggiungere 5 route fuori dall'`AppLayout` (sono pagine pubbliche standalone con header/footer del sito):

```text
/tools/smart-tape-advisor       → SmartTapeAdvisor
/tools/performance-configurator → ToolComingSoon (variant: performance)
/tools/tco-calculator           → ToolComingSoon (variant: tco)
/tools/stress-test              → ToolComingSoon (variant: stress)
/tools/carton-analysis          → ToolComingSoon (variant: carton)
```

Ogni pagina include `<SiteHeader />` e `<SiteFooter />` per restare integrata nella navigazione del sito pubblico.

---

## 5. Dettagli tecnici

- **Componenti shadcn/ui**: `Progress`, `Button`, `Card` (già presenti)
- **Icone**: tutte da `lucide-react` (già installato)
- **Animazioni**: `framer-motion` con `AnimatePresence` per transizioni step (già installato)
- **Stato**: solo `useState` locale, nessuna persistenza
- **Responsive**: mobile-first; griglia card `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; wizard centrato `max-w-3xl px-5`
- **Accessibilità**: ogni opzione del wizard è un `<button>` con `aria-label`, focus ring visibile

---

## File toccati

**Nuovi**
- `src/pages/tools/SmartTapeAdvisor.tsx`
- `src/pages/tools/ToolComingSoon.tsx`

**Modificati**
- `src/components/site/ServicesSection.tsx` — nuova griglia 5 card
- `src/App.tsx` — 5 nuove route
