// Dictionnaire complet des devises officielles par pays (ISO 3166-1 alpha-2 -> ISO 4217)
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  // Afrique centrale et de l'Ouest (Zone CEMAC - Franc CFA BEAC)
  CG: 'XAF', // République du Congo
  CD: 'CDF', // R.D. Congo (Franc congolais)
  CM: 'XAF', // Cameroun
  GA: 'XAF', // Gabon
  TD: 'XAF', // Tchad
  CF: 'XAF', // Centrafrique
  GQ: 'XAF', // Guinée équatoriale

  // Zone UEMOA (Franc CFA BCEAO)
  SN: 'XOF', // Sénégal
  CI: 'XOF', // Côte d'Ivoire
  BJ: 'XOF', // Bénin
  BF: 'XOF', // Burkina Faso
  ML: 'XOF', // Mali
  NE: 'XOF', // Niger
  TG: 'XOF', // Togo
  GW: 'XOF', // Guinée-Bissau

  // Reste de l'Afrique
  GN: 'GNF', // Guinée
  MA: 'MAD', // Maroc
  DZ: 'DZD', // Algérie
  TN: 'TND', // Tunisie
  EG: 'EGP', // Égypte
  NG: 'NGN', // Nigeria
  GH: 'GHS', // Ghana
  KE: 'KES', // Kenya
  RW: 'RWF', // Rwanda
  ZA: 'ZAR', // Afrique du Sud
  AO: 'AOA', // Angola
  ET: 'ETB', // Éthiopie
  TZ: 'TZS', // Tanzanie
  UG: 'UGX', // Ouganda
  MZ: 'MZN', // Mozambique
  MG: 'MGA', // Madagascar
  MU: 'MUR', // Maurice
  SC: 'SCR', // Seychelles
  MR: 'MRU', // Mauritanie
  CV: 'CVE', // Cap-Vert
  SL: 'SLE', // Sierra Leone
  LR: 'LRD', // Libéria
  GM: 'GMD', // Gambie
  BI: 'BIF', // Burundi
  DJ: 'DJF', // Djibouti
  KM: 'KMF', // Comores
  SO: 'SOS', // Somalie
  ST: 'STN', // Sao Tomé-et-Principe
  ZM: 'ZMW', // Zambie
  ZW: 'ZWG', // Zimbabwe
  BW: 'BWP', // Botswana
  NA: 'NAD', // Namibie

  // Europe (Zone Euro)
  FR: 'EUR', // France
  BE: 'EUR', // Belgique
  DE: 'EUR', // Allemagne
  ES: 'EUR', // Espagne
  IT: 'EUR', // Italie
  PT: 'EUR', // Portugal
  NL: 'EUR', // Pays-Bas
  IE: 'EUR', // Irlande
  LU: 'EUR', // Luxembourg
  AT: 'EUR', // Autriche
  GR: 'EUR', // Grèce
  FI: 'EUR', // Finlande
  EE: 'EUR', // Estonie
  LV: 'EUR', // Lettonie
  LT: 'EUR', // Lituanie
  SK: 'EUR', // Slovaquie
  SI: 'EUR', // Slovénie
  CY: 'EUR', // Chypre
  MT: 'EUR', // Malte
  MC: 'EUR', // Monaco
  AD: 'EUR', // Andorre

  // Autres pays d'Europe
  GB: 'GBP', // Royaume-Uni
  CH: 'CHF', // Suisse
  SE: 'SEK', // Suède
  NO: 'NOK', // Norvège
  DK: 'DKK', // Danemark
  PL: 'PLN', // Pologne
  CZ: 'CZK', // République tchèque
  HU: 'HUF', // Hongrie
  RO: 'RON', // Roumanie
  BG: 'BGN', // Bulgarie
  HR: 'EUR', // Croatie
  RS: 'RSD', // Serbie
  TR: 'TRY', // Turquie
  UA: 'UAH', // Ukraine
  RU: 'RUB', // Russie

  // Amériques
  US: 'USD', // États-Unis
  CA: 'CAD', // Canada
  BR: 'BRL', // Brésil
  MX: 'MXN', // Mexique
  AR: 'ARS', // Argentine
  CO: 'COP', // Colombie
  CL: 'CLP', // Chili
  PE: 'PEN', // Pérou
  HT: 'HTG', // Haïti

  // Moyen-Orient & Asie
  AE: 'AED', // Émirats Arabes Unis
  SA: 'SAR', // Arabie Saoudite
  QA: 'QAR', // Qatar
  KW: 'KWD', // Koweït
  CN: 'CNY', // Chine
  JP: 'JPY', // Japon
  IN: 'INR', // Inde
  KR: 'KRW', // Corée du Sud
  SG: 'SGD', // Singapour
  AU: 'AUD', // Australie
  NZ: 'NZD', // Nouvelle-Zélande
}

// Noms explicites des devises en français pour l'affichage utilisateur
export const CURRENCY_NAMES: Record<string, string> = {
  XAF: 'Franc CFA (BEAC)',
  XOF: 'Franc CFA (BCEAO)',
  CDF: 'Franc Congolais',
  EUR: 'Euro',
  USD: 'Dollar américain',
  CAD: 'Dollar canadien',
  GBP: 'Livre sterling',
  CHF: 'Franc suisse',
  MAD: 'Dirham marocain',
  DZD: 'Dinar algérien',
  TND: 'Dinar tunisien',
  EGP: 'Livre égyptienne',
  NGN: 'Naira nigérian',
  GHS: 'Cedi ghanéen',
  KES: 'Shilling kényan',
  RWF: 'Franc rwandais',
  ZAR: 'Rand sud-africain',
  GNF: 'Franc guinéen',
  AED: 'Dirham des Émirats',
  SAR: 'Riyal saoudien',
  QAR: 'Riyal qatari',
  TRY: 'Livre turque',
  CNY: 'Yuan chinois',
  JPY: 'Yen japonais',
  INR: 'Roupie indienne',
  BRL: 'Real brésilien',
  AUD: 'Dollar australien',
  NZD: 'Dollar néo-zélandais',
  HTG: 'Gourde haïtienne',
  BIF: 'Franc burundais',
  DJF: 'Franc djiboutien',
  KMF: 'Franc comorien',
  MGA: 'Ariary malgache',
  MUR: 'Roupie mauricienne',
  SCR: 'Roupie seychelloise',
  MRU: 'Ouguiya mauritanien',
  CVE: 'Escudo cap-verdien',
  SLE: 'Leone sierra-léonais',
  LRD: 'Dollar libérien',
  GMD: 'Dalasi gambien',
}

// Obtenir la devise d'un pays avec un fallback propre
export function getCountryCurrency(countryCode: string): {
  code: string
  name: string
} {
  const code = COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] || 'USD'
  const name = CURRENCY_NAMES[code] || code
  return { code, name }
}
