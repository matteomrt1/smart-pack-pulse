// Dettagli estesi prodotto: galleria, descrizione, specifiche, certificazioni.
// Le tabelle vuote sono lasciate da compilare manualmente.

export type SpecRow = { label: string; value: string };

export interface ProductDetail {
  longDesc: string;
  gallery?: string[]; // facoltativo: se vuoto, usa l'immagine principale ripetuta
  models?: string[]; // varianti/modelli disponibili
  specs: SpecRow[];
  certifications: string[];
}

const EMPTY_TAPE_SPECS: SpecRow[] = [
  { label: 'Utilizzo', value: '' },
  { label: 'Materiale', value: '' },
  { label: 'Tipo di adesivo', value: '' },
  { label: 'Lato adesivo', value: '' },
  { label: 'Tipo', value: '' },
  { label: 'Caratteristica', value: '' },
  { label: 'Stampa del design', value: '' },
  { label: 'Lavorazione di stampa', value: '' },
  { label: 'Anima in carta', value: '' },
  { label: 'Adesivo', value: '' },
  { label: 'Luogo di origine', value: '' },
  { label: 'Spessore', value: '' },
  { label: 'Codice modello', value: '' },
  { label: 'Nome del brand', value: '' },
  { label: 'Durata del ciclo', value: '' },
  { label: 'Nome', value: '' },
  { label: 'Colore', value: '' },
  { label: 'Larghezza', value: '' },
  { label: 'Spessore della lamina', value: '' },
  { label: 'Lunghezza', value: '' },
  { label: 'Dimensione Rotolo Jumbo', value: '' },
  { label: 'Applicazione', value: '' },
  { label: 'Temperatura', value: '' },
  { label: 'Certificati', value: '' },
];

const ACRYLIC_DESC = `Nastro adesivo trasparente in BOPP per imballaggio, ideale per la sigillatura sicura di scatole e cartoni in spedizione, traslochi, magazzinaggio e stoccaggio.

Caratteristiche principali:
• Base BOPP ad alta densità: rinforzata e di qualità premium, resistente a strappi, sfilacciature e rotture anche in condizioni d'uso intensivo.
• Spessore maggiorato (fino a 2,7 mil, ~35% più spesso degli standard 2,0 mil): tenuta forte su scatole fino a ~36 kg, supera i nastri tradizionali in durata e aderenza.
• Adesivo acrilico ad alte prestazioni: aderenza immediata e duratura, conforme alle normative postali, di corriere e di spedizione.
• Facile da aprire e silenzioso: l'estremità si individua subito, srotolamento più tranquillo rispetto ai nastri standard.
• Compatibile con tutti i dispenser standard e pistole per nastro; può essere strappato anche a mano.

Applicazioni: imballaggio domestico, ufficio, commerciale e industriale; sigillatura cartoni, spedizioni, traslochi e stoccaggio.

Disponibile in formato standard 1,88" × 60 yd / 65 m oppure su misura (10mm × 5m / personalizzato).`;

const ACRYLIC_SPECS: SpecRow[] = [
  { label: 'Utilizzo', value: 'Sigillatura cartoni' },
  { label: 'Materiale', value: 'BOPP' },
  { label: 'Tipo di adesivo', value: "Attivato dall'acqua, Termofusibile" },
  { label: 'Lato adesivo', value: 'Singolo lato' },
  { label: 'Tipo', value: 'Nastro BOPP' },
  { label: 'Caratteristica', value: 'Impermeabile' },
  { label: 'Stampa del design', value: 'Opzione di stampa' },
  { label: 'Lavorazione di stampa', value: 'Stampa offset' },
  { label: 'Anima in carta', value: '38 mm' },
  { label: 'Adesivo', value: 'Acrilico' },
  { label: 'Luogo di origine', value: 'Jiangsu, China' },
  { label: 'Spessore', value: 'Personalizzato' },
  { label: 'Codice modello', value: 'A27' },
  { label: 'Nome del brand', value: 'HUICONG' },
  { label: 'Durata del ciclo', value: 'Personalizzato' },
  { label: 'Nome', value: 'Nastro adesivo trasparente in BOPP per imballaggio' },
  { label: 'Colore', value: 'Trasparente' },
  { label: 'Larghezza', value: '48mm / 50mm / 100mm / 1200mm' },
  { label: 'Spessore della lamina', value: '35mic – 90mic' },
  { label: 'Lunghezza', value: '66 / 100m / personalizzato' },
  { label: 'Dimensione Rotolo Jumbo', value: '1280mm × 4000m' },
  { label: 'Applicazione', value: 'Confezione in cartone' },
  { label: 'Temperatura', value: '-20 ~ +80°C (-4 ~ +176°F)' },
  { label: 'Certificati', value: 'REACH / ROHS / ISO9001' },
];

const PLACEHOLDER_DESC = 'Descrizione in fase di compilazione. Inserisci qui i dettagli tecnici e commerciali del prodotto.';

const EMPTY_GENERIC_SPECS: SpecRow[] = [
  { label: 'Materiale', value: '' },
  { label: 'Dimensioni', value: '' },
  { label: 'Peso', value: '' },
  { label: 'Confezione', value: '' },
  { label: 'Applicazione', value: '' },
  { label: 'Certificati', value: '' },
];

export const productDetails: Record<string, ProductDetail> = {
  // === NASTRI ADESIVI ===
  p5: {
    longDesc: ACRYLIC_DESC,
    models: ['48mm × 66m', '50mm × 66m', '75mm × 66m', '100mm × 66m', 'Su misura'],
    specs: ACRYLIC_SPECS,
    certifications: ['REACH', 'ROHS', 'ISO 9001'],
  },
  p1: { longDesc: PLACEHOLDER_DESC, models: ['50mm × 66m', '75mm × 66m'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p2: { longDesc: PLACEHOLDER_DESC, models: ['50mm', '75mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p3: { longDesc: PLACEHOLDER_DESC, models: ['48mm', '75mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p4: { longDesc: PLACEHOLDER_DESC, models: ['48mm', '75mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p6: { longDesc: PLACEHOLDER_DESC, models: ['19mm', '25mm', '38mm', '50mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p7: { longDesc: PLACEHOLDER_DESC, models: ['25mm', '50mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  p8: { longDesc: PLACEHOLDER_DESC, models: ['25mm', '50mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },

  // === SCATOLE ===
  s1: { longDesc: PLACEHOLDER_DESC, models: ['40×30×30'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  s2: { longDesc: PLACEHOLDER_DESC, models: ['60×40×40'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  s3: { longDesc: PLACEHOLDER_DESC, models: ['Su misura'], specs: EMPTY_GENERIC_SPECS, certifications: [] },

  // === PROTEZIONE ===
  pr1: { longDesc: PLACEHOLDER_DESC, models: ['50cm', '100cm'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  pr2: { longDesc: PLACEHOLDER_DESC, models: ['40cm', '60cm'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  pr3: { longDesc: PLACEHOLDER_DESC, models: ['1mm', '2mm', '5mm'], specs: EMPTY_GENERIC_SPECS, certifications: [] },

  // === FILM / REGGE ===
  f1: { longDesc: PLACEHOLDER_DESC, models: ['20μ', '23μ'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  f2: { longDesc: PLACEHOLDER_DESC, models: ['12mm', '15mm'], specs: EMPTY_GENERIC_SPECS, certifications: [] },

  // === SACCHETTI / BUSTE ===
  sb1: { longDesc: PLACEHOLDER_DESC, models: ['20×30', '30×40', '40×60'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
  sb2: { longDesc: PLACEHOLDER_DESC, models: ['10×15', '15×20', '20×30'], specs: EMPTY_GENERIC_SPECS, certifications: [] },

  // === SOSTENIBILITÀ ===
  e1: { longDesc: PLACEHOLDER_DESC, models: ['50mm', '75mm'], specs: EMPTY_TAPE_SPECS, certifications: [] },
  e2: { longDesc: PLACEHOLDER_DESC, models: ['40cm', '60cm'], specs: EMPTY_GENERIC_SPECS, certifications: [] },
};

export function getProductDetail(id: string): ProductDetail {
  return (
    productDetails[id] ?? {
      longDesc: PLACEHOLDER_DESC,
      models: [],
      specs: EMPTY_GENERIC_SPECS,
      certifications: [],
    }
  );
}
