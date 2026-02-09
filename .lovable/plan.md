

# Configuratore di Imballaggio Eco-Ottimizzato

## Panoramica
Piattaforma web professionale con doppio accesso (clienti e team interno) che permette di configurare l'imballaggio ideale per qualsiasi prodotto, con suggerimenti AI sui materiali e visualizzazione 2D dello schema di imballaggio.

---

## 1. Portale Cliente

### Pagina di Login/Registrazione
- Accesso con email e password
- Registrazione con dati aziendali (ragione sociale, P.IVA, settore)

### Dashboard Cliente
- Riepilogo configurazioni salvate
- Storico ordini recenti
- Accesso rapido al configuratore

### Configuratore Imballaggio (cuore dell'app)
- **Step 1 - Inserimento prodotto**: dimensioni (L×P×H), peso, livello di fragilità (scala 1-5), tipo di prodotto
- **Step 2 - Suggerimento AI**: il sistema analizza i dati e propone il mix ottimale di materiali:
  - Scatola/contenitore consigliato (tipo e dimensioni)
  - Materiale protettivo (pluriball, schiuma, carta kraft) con quantità esatte
  - Nastro e chiusure adeguati al peso
  - Alternative eco-friendly quando disponibili
- **Step 3 - Schema 2D**: visualizzazione grafica del pacco con i livelli di materiale, dimensioni quotate e legenda materiali
- **Step 4 - Riepilogo**: lista materiali con quantità, costo stimato, impatto ambientale (CO₂ risparmiata vs soluzione standard), possibilità di salvare o richiedere preventivo

### Catalogo Prodotti
- Navigazione per categoria: materiali protettivi, nastri e chiusure, scatole e contenitori, altro
- Schede prodotto con specifiche tecniche

---

## 2. Pannello Interno (Team)

### Dashboard Gestione
- Panoramica richieste/configurazioni dei clienti
- Statistiche utilizzo configuratore
- Clienti più attivi

### Gestione Catalogo
- CRUD prodotti con prezzi, specifiche, disponibilità
- Regole di compatibilità tra materiali (usate dall'AI per i suggerimenti)

### Gestione Clienti
- Anagrafica clienti e storico interazioni
- Configurazioni richieste e preventivi generati

---

## 3. Motore AI per Suggerimenti
- L'AI riceve dimensioni, peso e fragilità e restituisce la configurazione ottimale
- Tiene conto delle regole di compatibilità definite dal team interno
- Ottimizza per ridurre sprechi e costi di spedizione (volume minimo)
- Propone alternative sostenibili quando possibili

---

## 4. Stile e Design
- Look professionale e corporate con colori neutri
- Tipografia pulita, layout spaziosi
- Icone chiare per le categorie di materiali
- Badge "eco" per materiali sostenibili

---

## 5. Backend e Dati
- Database per catalogo prodotti, configurazioni, clienti e storico
- Autenticazione con ruoli (cliente vs operatore interno)
- AI tramite Lovable AI per i suggerimenti sui materiali
- Predisposizione futura per integrazione con gestionale esterno via API

