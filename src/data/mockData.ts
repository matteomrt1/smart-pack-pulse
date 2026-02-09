import { Product, PackagingConfig, User } from '@/types';

export const mockProducts: Product[] = [
  // Protective materials
  { id: 'p1', name: 'Pluriball Standard', category: 'protective', description: 'Pluriball a bolle medie per protezione generale', price: 0.85, unit: 'm²', ecoFriendly: false, specs: { 'Spessore bolla': '10mm', 'Larghezza rotolo': '100cm' }, available: true },
  { id: 'p2', name: 'Carta Kraft Imbottitura', category: 'protective', description: 'Carta kraft riciclata per riempimento e protezione', price: 0.45, unit: 'm²', ecoFriendly: true, specs: { 'Grammatura': '80g/m²', 'Riciclata': '100%' }, available: true },
  { id: 'p3', name: 'Schiuma PE Espanso', category: 'protective', description: 'Schiuma polietilene per oggetti fragili', price: 1.20, unit: 'm²', ecoFriendly: false, specs: { 'Spessore': '5mm', 'Densità': '30kg/m³' }, available: true },
  { id: 'p4', name: 'Patatine Biodegradabili', category: 'protective', description: 'Patatine da imballaggio in amido di mais', price: 0.95, unit: 'L', ecoFriendly: true, specs: { 'Materiale': 'Amido di mais', 'Biodegradabile': 'Sì' }, available: true },
  // Tapes & closures
  { id: 't1', name: 'Nastro Adesivo PP', category: 'tapes', description: 'Nastro adesivo polipropilene trasparente', price: 2.50, unit: 'rotolo', ecoFriendly: false, specs: { 'Larghezza': '48mm', 'Lunghezza': '66m' }, available: true },
  { id: 't2', name: 'Nastro Carta Kraft', category: 'tapes', description: 'Nastro adesivo in carta kraft riciclabile', price: 3.80, unit: 'rotolo', ecoFriendly: true, specs: { 'Larghezza': '50mm', 'Lunghezza': '50m' }, available: true },
  { id: 't3', name: 'Reggetta PP', category: 'tapes', description: 'Reggetta in polipropilene per pacchi pesanti', price: 12.00, unit: 'rotolo', ecoFriendly: false, specs: { 'Larghezza': '12mm', 'Lunghezza': '200m' }, available: true },
  // Boxes & containers
  { id: 'b1', name: 'Scatola Americana 40×30×30', category: 'boxes', description: 'Scatola americana doppia onda', price: 1.80, unit: 'pz', ecoFriendly: true, specs: { 'Dimensioni interne': '40×30×30cm', 'Onda': 'Doppia', 'Portata': '30kg' }, available: true },
  { id: 'b2', name: 'Scatola Americana 60×40×40', category: 'boxes', description: 'Scatola americana doppia onda grande', price: 2.90, unit: 'pz', ecoFriendly: true, specs: { 'Dimensioni interne': '60×40×40cm', 'Onda': 'Doppia', 'Portata': '40kg' }, available: true },
  { id: 'b3', name: 'Tubo Postale 60cm', category: 'boxes', description: 'Tubo in cartone per documenti e poster', price: 1.50, unit: 'pz', ecoFriendly: true, specs: { 'Lunghezza': '60cm', 'Diametro': '8cm' }, available: true },
  // Other
  { id: 'o1', name: 'Film Estensibile', category: 'other', description: 'Film estensibile manuale per pallettizzazione', price: 8.50, unit: 'rotolo', ecoFriendly: false, specs: { 'Larghezza': '50cm', 'Lunghezza': '300m' }, available: true },
  { id: 'o2', name: 'Busta Imbottita 26×36', category: 'other', description: 'Busta imbottita con bolle d\'aria', price: 0.35, unit: 'pz', ecoFriendly: false, specs: { 'Dimensioni esterne': '26×36cm', 'Chiusura': 'Autoadesiva' }, available: true },
];

export const mockConfigs: PackagingConfig[] = [
  {
    id: 'cfg1', clientId: 'u1',
    input: { length: 30, width: 20, height: 15, weight: 2.5, fragility: 3, productType: 'Elettronica' },
    suggestions: [
      { productId: 'b1', productName: 'Scatola Americana 40×30×30', category: 'boxes', quantity: 1, unit: 'pz', reason: 'Dimensione ottimale con margine per protezione', ecoFriendly: true },
      { productId: 'p1', productName: 'Pluriball Standard', category: 'protective', quantity: 0.8, unit: 'm²', reason: 'Protezione anti-urto per fragilità media', ecoFriendly: false, ecoAlternative: { productName: 'Carta Kraft Imbottitura', co2Saved: 120 } },
      { productId: 't1', productName: 'Nastro Adesivo PP', category: 'tapes', quantity: 1, unit: 'rotolo', reason: 'Chiusura standard per peso < 10kg', ecoFriendly: false, ecoAlternative: { productName: 'Nastro Carta Kraft', co2Saved: 45 } },
    ],
    totalCost: 5.15, co2Saved: 165, createdAt: '2026-02-08T10:30:00Z', status: 'saved',
  },
  {
    id: 'cfg2', clientId: 'u1',
    input: { length: 50, width: 40, height: 35, weight: 15, fragility: 5, productType: 'Vetro/Ceramica' },
    suggestions: [
      { productId: 'b2', productName: 'Scatola Americana 60×40×40', category: 'boxes', quantity: 1, unit: 'pz', reason: 'Scatola grande con spazio per protezione extra', ecoFriendly: true },
      { productId: 'p3', productName: 'Schiuma PE Espanso', category: 'protective', quantity: 2.5, unit: 'm²', reason: 'Protezione massima per fragilità 5/5', ecoFriendly: false },
      { productId: 'p4', productName: 'Patatine Biodegradabili', category: 'protective', quantity: 15, unit: 'L', reason: 'Riempimento vuoti interni', ecoFriendly: true },
      { productId: 't3', productName: 'Reggetta PP', category: 'tapes', quantity: 1, unit: 'rotolo', reason: 'Reggettatura necessaria per peso > 10kg', ecoFriendly: false },
    ],
    totalCost: 18.55, co2Saved: 0, createdAt: '2026-02-07T14:15:00Z', status: 'quoted',
  },
];

export const mockClients: User[] = [
  { id: 'u1', email: 'mario.rossi@techsrl.it', role: 'client', companyName: 'Tech S.r.l.', vatNumber: 'IT01234567890', sector: 'Elettronica' },
  { id: 'u2', email: 'anna.bianchi@ceramiche.it', role: 'client', companyName: 'Ceramiche Bianchi', vatNumber: 'IT09876543210', sector: 'Artigianato' },
  { id: 'u3', email: 'luca.verdi@foodco.it', role: 'client', companyName: 'FoodCo Italia', vatNumber: 'IT11223344556', sector: 'Alimentare' },
];

export const categoryLabels: Record<string, string> = {
  protective: 'Materiali Protettivi',
  tapes: 'Nastri e Chiusure',
  boxes: 'Scatole e Contenitori',
  other: 'Altro',
};

export const categoryIcons: Record<string, string> = {
  protective: 'Shield',
  tapes: 'Tape',
  boxes: 'Box',
  other: 'Package',
};
