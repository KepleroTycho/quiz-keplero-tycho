export type Question = {
  q: string;
  options: string[];
  answer: number;
  note: string;
};

export const questions: Question[] = [
  { q: "Di quale nazionalità era Tycho Brahe?", options: ["Tedesca", "Danese", "Olandese", "Polacca"], answer: 1, note: "Tycho nacque nel 1546 a Knutstorp, nella Scania, allora parte del regno di Danimarca." },
  { q: "In quale paese nacque Giovanni Keplero?", options: ["Germania", "Austria", "Italia", "Boemia"], answer: 0, note: "Keplero nacque nel 1571 a Weil der Stadt, nel Sacro Romano Impero di area tedesca." },
  { q: "Che cosa perse Tycho Brahe in un duello da giovane?", options: ["Un occhio", "Una mano", "Parte del naso", "Un orecchio"], answer: 2, note: "Un duello di spada lo sfregiò: portò per tutta la vita una protesi sul naso." },
  { q: "Su quale isola Tycho costruì il suo osservatorio di Uraniborg?", options: ["Hven", "Zelanda", "Bornholm", "Gotland"], answer: 0, note: "Il re Federico II gli concesse l'isola di Hven, nello stretto dell'Øresund." },
  { q: "Come osservava il cielo Tycho Brahe?", options: ["Con un telescopio rifrattore", "Con strumenti di precisione a occhio nudo", "Con una fotocamera", "Solo con calcoli, senza osservare"], answer: 1, note: "Il telescopio non esisteva ancora: Tycho usava grandi quadranti e sestanti, con precisioni di circa un primo d'arco." },
  { q: "Quale evento celeste del 1572 rese famoso Tycho?", options: ["Una cometa di Halley", "Un'eclissi totale di Sole", "Una nuova stella (supernova) in Cassiopea", "Il transito di Venere"], answer: 2, note: "Dimostrò che la \"stella nuova\" era oltre la Luna, mettendo in crisi l'idea di cieli immutabili." },
  { q: "Quale imperatore accolse Tycho e poi Keplero a Praga?", options: ["Carlo V", "Rodolfo II", "Ferdinando II", "Massimiliano I"], answer: 1, note: "Rodolfo II nominò Tycho matematico imperiale e dopo la sua morte, nel 1601, lo stesso incarico passò a Keplero." },
  { q: "Quale forma hanno le orbite dei pianeti secondo Keplero?", options: ["Circolari", "Ellittiche", "A spirale", "Quadrate"], answer: 1, note: "Fu una rottura con duemila anni di astronomia basata su cerchi perfetti." },
  { q: "Cosa afferma la prima legge di Keplero?", options: ["Ogni pianeta orbita in un'ellisse con il Sole in uno dei fuochi", "I pianeti ruotano attorno alla Terra", "Il Sole è fermo al centro di un cerchio", "I periodi crescono con il quadrato del raggio"], answer: 0, note: "Pubblicata nel 1609 nell'Astronomia Nova." },
  { q: "Quale pianeta studiò Keplero usando le osservazioni di Tycho per scoprire le sue leggi?", options: ["Venere", "Giove", "Saturno", "Marte"], answer: 3, note: "L'orbita di Marte, la più eccentrica tra quelle ben osservabili, non si accordava con nessun cerchio." },
  { q: "Come è fatto il sistema del mondo proposto da Tycho?", options: ["Il Sole è al centro di tutto", "La Terra è centrale: Sole e Luna le girano attorno, gli altri pianeti girano attorno al Sole", "Tutti i pianeti girano attorno a Giove", "Le stelle girano attorno alla Luna"], answer: 1, note: "Un compromesso tra Tolomeo e Copernico, coerente con le sue misure che non mostravano parallasse stellare." },
  { q: "Cosa dice la seconda legge di Keplero?", options: ["Il periodo orbitale è uguale per tutti i pianeti", "Il raggio vettore spazza aree uguali in tempi uguali", "L'orbita è sempre perpendicolare al Sole", "La velocità è costante lungo l'orbita"], answer: 1, note: "Un pianeta è più veloce al perielio e più lento all'afelio." },
  { q: "In quale opera Keplero enunciò la terza legge, sul rapporto tra periodo e distanza?", options: ["Astronomia Nova", "Harmonices Mundi", "Sidereus Nuncius", "De revolutionibus"], answer: 1, note: "Nel 1619, in Harmonices Mundi: il quadrato del periodo è proporzionale al cubo del semiasse maggiore." },
  { q: "Quale idea geometrica propose Keplero nel Mysterium Cosmographicum (1596)?", options: ["Le orbite sono ovali di Cassini", "Le sfere planetarie sono separate da solidi platonici annidati", "I pianeti sono legati da fili magnetici", "La Terra è un cubo"], answer: 1, note: "Cinque solidi regolari avrebbero spiegato le distanze dei sei pianeti allora noti." },
  { q: "In che anno furono pubblicate le Tavole Rudolfine, basate sui dati di Tycho?", options: ["1609", "1619", "1627", "1650"], answer: 2, note: "Keplero le completò anni dopo la morte di Tycho; furono il catalogo e le tavole più precisi del tempo." },
];
