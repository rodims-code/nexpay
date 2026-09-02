// Données de couverture Moneroo enrichies pour l'Afrique
export interface MonerooMarket {
  id: string
  country: string
  city: string
  currency: string
  badge: string
  color: string
  isPrimary: boolean
  title: string
  description: string
  methods: string[]
  gateways?: string[]
}

export const MONEROO_MARKETS: readonly MonerooMarket[] = [
  {
    "id": "NG",
    "country": "Nigéria",
    "city": "Lagos",
    "currency": "NGN",
    "badge": "Hub Majeur",
    "color": "#10B981",
    "isPrimary": true,
    "title": "Le géant fintech d’Afrique de l’Ouest",
    "description": "Le Nigeria constitue le plus grand marché numérique d’Afrique avec des volumes transactionnels records et une adoption massive des paiements instantanés.",
    "methods": [
      "Bank Transfer",
      "USSD (NGN)",
      "Cartes NGN (Visa/MasterCard/Verve)",
      "MTN MoMo PSB",
      "Airtel Money",
      "Barter",
      "Crypto (NGN)"
    ],
    "gateways": [
      "Paystack",
      "Flutterwave",
      "Moneroo Direct"
    ]
  },
  {
    "id": "CI",
    "country": "Côte d'Ivoire",
    "city": "Abidjan",
    "currency": "XOF",
    "badge": "Hub UEMOA",
    "color": "#F97316",
    "isPrimary": true,
    "title": "Carrefour financier d’Afrique de l’Ouest francophone",
    "description": "La Côte d’Ivoire est le moteur économique de la zone UEMOA avec un taux de pénétration record du Mobile Money et des néobanques.",
    "methods": [
      "Wave",
      "Orange Money",
      "MTN MoMo",
      "Moov Money",
      "Djamo",
      "Visa / MasterCard XOF",
      "Hub2"
    ],
    "gateways": [
      "CinetPay",
      "Hub2",
      "Moneroo Direct"
    ]
  },
  {
    "id": "SN",
    "country": "Sénégal",
    "city": "Dakar",
    "currency": "XOF",
    "badge": "Hub UEMOA",
    "color": "#06B6D4",
    "isPrimary": true,
    "title": "Pionnier de l’innovation Mobile Money",
    "description": "Le Sénégal est l’un des marchés les plus dynamiques d’Afrique pour les transferts sans frais et les paiements digitaux du quotidien.",
    "methods": [
      "Wave",
      "Orange Money",
      "Free Money",
      "E-Money",
      "Djamo",
      "Wizall",
      "Visa / MasterCard XOF",
      "PayTech",
      "PayDunya"
    ],
    "gateways": [
      "PayTech",
      "PayDunya",
      "Hub2"
    ]
  },
  {
    "id": "KE",
    "country": "Kenya",
    "city": "Nairobi",
    "currency": "KES",
    "badge": "Leader Mobile Money",
    "color": "#EF4444",
    "isPrimary": true,
    "title": "La capitale mondiale du Mobile Money",
    "description": "Le Kenya est la référence mondiale de l’inclusion financière grâce à l’omniprésence de M-Pesa et à un écosystème e-commerce très mature.",
    "methods": [
      "M-Pesa (Safaricom)",
      "Card Kenya (Visa/MasterCard)",
      "Bank Transfer (KES)"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "ZA",
    "country": "Afrique du Sud",
    "city": "Johannesburg",
    "currency": "ZAR",
    "badge": "Hub Bancaire",
    "color": "#3B82F6",
    "isPrimary": true,
    "title": "Première infrastructure bancaire du continent",
    "description": "L’Afrique du Sud dispose d’un réseau bancaire et de cartes ultra-développé ainsi que des standards de paiement les plus stricts.",
    "methods": [
      "EFT Instant",
      "Visa / MasterCard ZAR",
      "Virement bancaire"
    ],
    "gateways": [
      "Paystack",
      "Stripe",
      "Moneroo Direct"
    ]
  },
  {
    "id": "MA",
    "country": "Maroc",
    "city": "Casablanca",
    "currency": "MAD",
    "badge": "Expansion Nord",
    "color": "#F59E0B",
    "isPrimary": true,
    "title": "Porte d’entrée vers l’Afrique du Nord",
    "description": "Le Maroc représente un marché stratégique à fort pouvoir d’achat pour connecter l’Afrique du Nord au reste du continent.",
    "methods": [
      "Cartes bancaires (CMI / Visa / MasterCard)",
      "Virement bancaire"
    ],
    "gateways": [
      "Passerelles bancaires régionales"
    ]
  },
  {
    "id": "CM",
    "country": "Cameroun",
    "city": "Douala",
    "currency": "XAF",
    "badge": "Hub CEMAC",
    "color": "#84CC16",
    "isPrimary": true,
    "title": "Centre économique d’Afrique Centrale",
    "description": "Le Cameroun concentre l’essentiel des transactions de la zone CEMAC avec une forte prédominance de MTN MoMo et Orange Money.",
    "methods": [
      "MTN MoMo Cameroon",
      "Orange Money Cameroon",
      "EU Mobile Money",
      "Visa / MasterCard XAF",
      "MonetBill",
      "NotchPay"
    ],
    "gateways": [
      "MonetBill",
      "NotchPay",
      "Hub2"
    ]
  },
  {
    "id": "RW",
    "country": "Rwanda",
    "city": "Kigali",
    "currency": "RWF",
    "badge": "Hub Technologique",
    "color": "#8B5CF6",
    "isPrimary": true,
    "title": "La Silicon Valley d’Afrique de l’Est",
    "description": "Le Rwanda propose un environnement réglementaire très favorable et un taux de numérisation des services publics et financiers exemplaire.",
    "methods": [
      "MTN Mobile Money Rwanda",
      "Airtel Money Rwanda",
      "Visa / MasterCard"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "BJ",
    "country": "Bénin",
    "city": "Cotonou",
    "currency": "XOF",
    "badge": "Couvert Moneroo",
    "color": "#14B8A6",
    "isPrimary": false,
    "title": "Écosystème fintech en pleine expansion",
    "description": "Le Bénin bénéficie d’une interopérabilité complète entre les trois grands opérateurs et les passerelles locales.",
    "methods": [
      "MTN MoMo Benin",
      "Moov Money Benin",
      "Celtiis Benin",
      "FeexPay",
      "FedaPay",
      "KkiaPay",
      "Qosic"
    ],
    "gateways": [
      "FedaPay",
      "KkiaPay",
      "FeexPay",
      "Qosic"
    ]
  },
  {
    "id": "GH",
    "country": "Ghana",
    "city": "Accra",
    "currency": "GHS",
    "badge": "Couvert Moneroo",
    "color": "#EAB308",
    "isPrimary": false,
    "title": "Marché dynamique d’Afrique anglophone",
    "description": "Le Ghana dispose d’un système de paiement interopérable très avancé liant comptes bancaires et portefeuilles mobiles.",
    "methods": [
      "MTN MoMo Ghana",
      "Vodafone Cash Ghana",
      "AirtelTigo Ghana",
      "Card GHS",
      "Crypto GHS"
    ],
    "gateways": [
      "Paystack",
      "Flutterwave",
      "Hub2"
    ]
  },
  {
    "id": "CD",
    "country": "RD Congo",
    "city": "Kinshasa",
    "currency": "USD / CDF",
    "badge": "Couvert Moneroo",
    "color": "#0284C7",
    "isPrimary": false,
    "title": "Grand marché d’Afrique Centrale",
    "description": "La RDC est un marché stratégique avec plus de 100 millions d’habitants où le mobile money remplace largement les banques classiques.",
    "methods": [
      "Vodacom M-Pesa RDC",
      "Airtel Money RDC",
      "Orange Money RDC",
      "Africell RDC"
    ],
    "gateways": [
      "Moneroo Direct",
      "PawaPay"
    ]
  },
  {
    "id": "TZ",
    "country": "Tanzanie",
    "city": "Dar es Salaam",
    "currency": "TZS",
    "badge": "Couvert Moneroo",
    "color": "#6366F1",
    "isPrimary": false,
    "title": "Corridor d’Afrique de l’Est",
    "description": "La Tanzanie dispose d’une couverture mobile money multi-opérateurs très concurrentielle et dynamique.",
    "methods": [
      "Vodacom M-Pesa Tanzania",
      "Airtel Money Tanzania",
      "Tigo Pesa",
      "Halopesa",
      "Card Tanzania"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "BF",
    "country": "Burkina Faso",
    "city": "Ouagadougou",
    "currency": "XOF",
    "badge": "Couvert Moneroo",
    "color": "#D97706",
    "isPrimary": false,
    "title": "Marché UEMOA",
    "description": "Forte adoption de Orange Money, Moov et l’arrivée rapide de Wave pour les paiements marchands.",
    "methods": [
      "Orange Money Burkina",
      "Moov Burkina",
      "Wave Burkina",
      "Visa / MasterCard XOF",
      "Hub2"
    ],
    "gateways": [
      "Hub2",
      "CinetPay"
    ]
  },
  {
    "id": "TG",
    "country": "Togo",
    "city": "Lomé",
    "currency": "XOF",
    "badge": "Couvert Moneroo",
    "color": "#10B981",
    "isPrimary": false,
    "title": "Hub logistique et financier",
    "description": "Siège de grandes institutions bancaires ouest-africaines et adoption élevée du Mobile Money T-Money et Flooz.",
    "methods": [
      "T-Money (Togocel)",
      "Moov Money (Flooz)",
      "FeexPay",
      "Qosic TG",
      "Hub2 TG"
    ],
    "gateways": [
      "FeexPay",
      "Qosic",
      "Hub2"
    ]
  },
  {
    "id": "ML",
    "country": "Mali",
    "city": "Bamako",
    "currency": "XOF",
    "badge": "Couvert Moneroo",
    "color": "#F59E0B",
    "isPrimary": false,
    "title": "Marché UEMOA",
    "description": "Présence historique d’Orange Money et Moov Money pour tous les règlements du quotidien.",
    "methods": [
      "Orange Money Mali",
      "Moov Money Mali",
      "Visa / MasterCard XOF",
      "Hub2 ML"
    ],
    "gateways": [
      "Hub2",
      "CinetPay"
    ]
  },
  {
    "id": "NE",
    "country": "Niger",
    "city": "Niamey",
    "currency": "XOF",
    "badge": "Couvert Moneroo",
    "color": "#EA580C",
    "isPrimary": false,
    "title": "Marché sahélien",
    "description": "Réseau étendu d’agences et de mobile money avec Airtel, Moov, Al Izza, MyNita et Amanata.",
    "methods": [
      "Airtel Niger",
      "Moov Niger",
      "MyNita Niger",
      "Amanata Niger",
      "Zamani Cash"
    ],
    "gateways": [
      "Moneroo Direct"
    ]
  },
  {
    "id": "GA",
    "country": "Gabon",
    "city": "Libreville",
    "currency": "XAF",
    "badge": "Couvert Moneroo",
    "color": "#059669",
    "isPrimary": false,
    "title": "Zone CEMAC",
    "description": "Marché à haut revenu par habitant avec une prédominance d’Airtel Money et Moov Money.",
    "methods": [
      "Airtel Money Gabon",
      "Moov Money Gabon",
      "Visa / MasterCard XAF"
    ],
    "gateways": [
      "Hub2",
      "Moneroo Direct"
    ]
  },
  {
    "id": "CG",
    "country": "Congo",
    "city": "Brazzaville",
    "currency": "XAF",
    "badge": "Couvert Moneroo",
    "color": "#16A34A",
    "isPrimary": false,
    "title": "Zone CEMAC",
    "description": "Couverture double opérateur avec MTN MoMo Congo et Airtel Congo.",
    "methods": [
      "MTN MoMo Congo",
      "Airtel Congo",
      "Visa / MasterCard XAF"
    ],
    "gateways": [
      "Moneroo Direct"
    ]
  },
  {
    "id": "UG",
    "country": "Ouganda",
    "city": "Kampala",
    "currency": "UGX",
    "badge": "Couvert Moneroo",
    "color": "#9333EA",
    "isPrimary": false,
    "title": "Afrique de l’Est",
    "description": "Marché très actif avec MTN MoMo et Airtel Money très ancrés dans le commerce local.",
    "methods": [
      "MTN MoMo Uganda",
      "Airtel Uganda",
      "Card Uganda"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "ZM",
    "country": "Zambie",
    "city": "Lusaka",
    "currency": "ZMW",
    "badge": "Couvert Moneroo",
    "color": "#2563EB",
    "isPrimary": false,
    "title": "Afrique Australe",
    "description": "Marché en pleine digitalisation avec MTN MoMo, Airtel et Zamtel Kwacha.",
    "methods": [
      "MTN MoMo Zambia",
      "Airtel Zambia",
      "Zamtel Kwacha"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "GN",
    "country": "Guinée",
    "city": "Conakry",
    "currency": "GNF",
    "badge": "Couvert Moneroo",
    "color": "#D97706",
    "isPrimary": false,
    "title": "Afrique de l’Ouest",
    "description": "Forte pénétration de Orange Money Guinée et MTN MoMo Guinée.",
    "methods": [
      "Orange Money Guinea",
      "MTN MoMo Guinea",
      "Lengo Pay"
    ],
    "gateways": [
      "Lengo Pay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "MG",
    "country": "Madagascar",
    "city": "Antananarivo",
    "currency": "MGA",
    "badge": "Couvert Moneroo",
    "color": "#4F46E5",
    "isPrimary": false,
    "title": "Océan Indien",
    "description": "Adoption massive de Telma MVola et Orange Money.",
    "methods": [
      "Telma MVola",
      "Orange Money Madagascar",
      "Airtel Money"
    ],
    "gateways": [
      "Moneroo Direct"
    ]
  },
  {
    "id": "MW",
    "country": "Malawi",
    "city": "Lilongwe",
    "currency": "MWK",
    "badge": "Couvert Moneroo",
    "color": "#7C3AED",
    "isPrimary": false,
    "title": "Afrique Australe",
    "description": "Couverture nationale via Airtel Money et TNM Mpamba.",
    "methods": [
      "Airtel Money Malawi",
      "TNM Mpamba Malawi"
    ],
    "gateways": [
      "PawaPay",
      "Moneroo Direct"
    ]
  },
  {
    "id": "MZ",
    "country": "Mozambique",
    "city": "Maputo",
    "currency": "MZN",
    "badge": "Couvert Moneroo",
    "color": "#DB2777",
    "isPrimary": false,
    "title": "Afrique Australe",
    "description": "Marché lusophone couvert par Vodacom M-Pesa et les banques locales.",
    "methods": [
      "Vodacom M-Pesa Mozambique",
      "e-Mola"
    ],
    "gateways": [
      "Moneroo Direct"
    ]
  }
] as const;
