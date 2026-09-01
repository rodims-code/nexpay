import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Globe2, MapPin, Waves, CheckCircle2 } from 'lucide-react'

// Tracé SVG précis du continent Africain (viewBox 0 0 1000 1000)
const AFRICA_SVG_PATH =
  "M 458,52 C 485,50 515,62 542,65 C 575,68 610,65 642,76 C 675,87 705,107 735,125 C 765,142 795,162 815,190 C 830,212 842,238 845,265 C 848,290 838,315 828,338 C 815,365 798,390 778,412 C 760,432 748,458 745,485 C 742,512 752,540 758,567 C 765,595 762,625 752,652 C 738,688 718,722 692,752 C 665,782 635,810 602,835 C 572,858 540,880 508,900 C 485,915 460,932 435,945 C 420,952 405,960 390,950 C 375,940 372,918 368,898 C 362,868 358,838 350,808 C 342,778 328,750 315,722 C 300,690 282,660 268,628 C 255,598 245,565 240,532 C 235,500 238,468 245,438 C 252,408 242,380 228,355 C 212,328 190,305 168,285 C 145,265 118,252 90,245 C 62,238 32,232 20,208 C 10,188 22,165 40,150 C 62,132 90,122 118,115 C 150,108 182,105 215,100 C 250,95 285,88 320,80 C 355,72 390,60 425,55 Z"

interface MapMarker {
  id: string
  city: string
  country: string
  iso: string
  lat: number
  lng: number
  badge: string
  title: string
  description: string
  methods: string[]
}

const mapMarkers: readonly MapMarker[] = [
  {
    id: 'casablanca',
    city: 'Casablanca',
    country: 'Maroc',
    iso: 'MA',
    lat: 33.5731,
    lng: -7.5898,
    badge: 'À confirmer',
    title: 'Marché potentiel pour les transferts',
    description: 'Les devises et moyens de paiement seront précisés avant confirmation.',
    methods: ['Carte bancaire', 'Virement SEPA'],
  },
  {
    id: 'lagos',
    city: 'Lagos',
    country: 'Nigeria',
    iso: 'NG',
    lat: 6.5244,
    lng: 3.3792,
    badge: 'Marché envisagé',
    title: 'Transferts locaux à valider',
    description: 'La disponibilité dépendra du provider et des conditions de lancement.',
    methods: ['Bank Transfer', 'USSD', 'Nerve'],
  },
  {
    id: 'kigali',
    city: 'Kigali',
    country: 'Rwanda',
    iso: 'RW',
    lat: -1.9441,
    lng: 30.0619,
    badge: 'À confirmer',
    title: 'Destination à explorer',
    description: 'La carte présente une direction produit, pas une promesse de disponibilité.',
    methods: ['MTN Mobile Money', 'Airtel Money'],
  },
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    iso: 'KE',
    lat: -1.2921,
    lng: 36.8219,
    badge: 'À confirmer',
    title: 'Couverture à vérifier',
    description: 'Les méthodes disponibles seront affichées selon le trajet choisi.',
    methods: ['M-Pesa', 'Equitel', 'Virement'],
  },
  {
    id: 'johannesburg',
    city: 'Johannesburg',
    country: 'Afrique du Sud',
    iso: 'ZA',
    lat: -26.2041,
    lng: 28.0473,
    badge: 'À confirmer',
    title: 'Payout vers le destinataire',
    description: 'Le statut du transfert sera suivi jusqu’à la confirmation du provider.',
    methods: ['EFT', 'Capitec Pay', 'Cards'],
  },
] as const

// Conversion coordonnées GPS (Lat/Lng) en % sur la carte viewBox (0-100%)
function projectCoords(lat: number, lng: number) {
  const minLng = -18.0
  const maxLng = 52.0
  const minLat = -35.0
  const maxLat = 37.5

  const x = ((lng - minLng) / (maxLng - minLng)) * 100
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100

  return { x: Math.min(Math.max(x, 5), 95), y: Math.min(Math.max(y, 5), 95) }
}

export function AfricaMapSection() {
  const [activeMarkerId, setActiveMarkerId] = useState<string>(mapMarkers[0].id)
  const activeMarker =
    mapMarkers.find((marker) => marker.id === activeMarkerId) ?? mapMarkers[0]

  return (
    <section id="africa-map" className="px-4 py-24 lg:px-8 bg-base-100 text-base-content overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          
          {/* Colonne Gauche - Textes et Métriques */}
          <div className="space-y-6">
            <span className="badge badge-primary badge-outline gap-2 py-3 px-4 text-xs font-semibold tracking-wide">
              <Globe2 className="size-4" />
              Couverture Régionale
            </span>
            
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Explorer nos marchés cibles en Afrique.
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-base-content/70">
              Consultez les pays et méthodes disponibles pour préparer vos transferts. La couverture réelle évolue selon nos partenariats, les régulations locales et l'intégration des providers.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {[
                { label: 'Marchés ciblés', value: `${mapMarkers.length} Pays` },
                { label: 'Partenaire principal', value: 'Moneroo' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-base-200 bg-base-200/40 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="text-xs uppercase tracking-[0.2em] font-medium text-base-content/50">
                    {item.label}
                  </div>
                  <div className="mt-2 text-2xl font-black text-primary">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Fiche récapitulative dynamique */}
            <div className="hidden lg:block rounded-3xl border border-base-200 bg-base-200/30 p-6 backdrop-blur">
              <div className="flex items-center justify-between border-b border-base-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Focus Marché</span>
                <span className="badge badge-sm badge-accent">{activeMarker.badge}</span>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xl font-bold">{activeMarker.city}, {activeMarker.country}</h4>
                <p className="text-sm text-base-content/70">{activeMarker.description}</p>
                <div className="pt-3">
                  <div className="text-xs font-semibold text-base-content/50 mb-2">Méthodes prévues :</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMarker.methods.map((method) => (
                      <span key={method} className="badge badge-ghost badge-sm gap-1">
                        <CheckCircle2 className="size-3 text-success" />
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite - Carte SVG Interactive */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-accent/20 blur-3xl opacity-70" />

            <div className="card relative overflow-hidden border border-base-200 bg-base-100/95 shadow-2xl backdrop-blur-md">
              <div className="card-body gap-6 p-4 sm:p-6">
                
                {/* En-tête Carte */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-base-200 pb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] font-bold text-base-content/40">
                      Carte Interactive
                    </div>
                    <h3 className="text-xl font-bold">
                      Réseau & Corridors d'Afrique
                    </h3>
                  </div>
                  <div className="badge badge-success badge-outline gap-2 py-2 px-3 text-xs font-medium">
                    <Waves className="size-3.5 animate-pulse" />
                    Mise à jour Provider
                  </div>
                </div>

                {/* Zone Graphique Carte SVG */}
                <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-2xl border border-base-200 bg-gradient-to-b from-base-200/50 via-base-100 to-base-200/30 flex items-center justify-center p-4">
                  
                  {/* Grille cartographique en fond */}
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:32px_32px]" />

                  {/* SVG Vrai Tracé Afrique */}
                  <svg
                    viewBox="0 0 1000 1000"
                    className="h-full w-full max-w-[520px] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="africaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" className="text-primary/20" />
                        <stop offset="50%" stopColor="currentColor" className="text-secondary/15" />
                        <stop offset="100%" stopColor="currentColor" className="text-accent/25" />
                      </linearGradient>
                    </defs>

                    {/* Silhouete de l'Afrique */}
                    <path
                      d={AFRICA_SVG_PATH}
                      fill="url(#africaGrad)"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-primary/30 transition-colors duration-300"
                    />
                  </svg>

                  {/* Marqueurs sur la carte (GPS convertis en position %) */}
                  {mapMarkers.map((marker) => {
                    const pos = projectCoords(marker.lat, marker.lng)
                    const isActive = activeMarkerId === marker.id

                    return (
                      <button
                        key={marker.id}
                        type="button"
                        aria-label={`${marker.city}, ${marker.country}`}
                        className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 focus:outline-none ${
                          isActive ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                        }`}
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        onClick={() => setActiveMarkerId(marker.id)}
                        onMouseEnter={() => setActiveMarkerId(marker.id)}
                        onFocus={() => setActiveMarkerId(marker.id)}
                      >
                        {/* Animation d'onde */}
                        <span
                          className={`absolute -inset-2 animate-ping rounded-full ${
                            isActive ? 'bg-primary/50' : 'bg-secondary/30 opacity-50'
                          }`}
                        />
                        
                        {/* Point Marqueur */}
                        <span
                          className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-base-100 shadow-xl transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-content ring-4 ring-primary/30'
                              : 'bg-secondary text-secondary-content group-hover:bg-primary'
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-base-100" />
                        </span>

                        {/* Tag ville affiché en permanence */}
                        <span
                          className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md transition-all ${
                            isActive
                              ? 'bg-primary text-primary-content opacity-100'
                              : 'bg-base-100/90 text-base-content/80 opacity-75 group-hover:opacity-100'
                          }`}
                        >
                          {marker.city}
                        </span>
                      </button>
                    )
                  })}

                  {/* Popup Info-Bulle Overlay (Animation Framer Motion) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMarker.id}
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 left-4 right-4 z-40 rounded-2xl border border-base-200 bg-base-100/95 p-4 shadow-xl backdrop-blur-md sm:left-6 sm:right-auto sm:max-w-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                            <MapPin className="size-3.5" />
                            {activeMarker.country}
                          </div>
                          <div className="mt-0.5 text-lg font-black text-base-content">
                            {activeMarker.city}
                          </div>
                        </div>
                        <span className="badge badge-accent badge-sm font-medium">
                          {activeMarker.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-base-content/75">
                        {activeMarker.title}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Liste des cartes d'accès rapide aux pays */}
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {mapMarkers.map((marker) => {
                    const isActive = activeMarkerId === marker.id

                    return (
                      <button
                        key={marker.id}
                        type="button"
                        onClick={() => setActiveMarkerId(marker.id)}
                        onMouseEnter={() => setActiveMarkerId(marker.id)}
                        onFocus={() => setActiveMarkerId(marker.id)}
                        className={`group rounded-xl border p-3 text-left transition-all duration-200 ${
                          isActive
                            ? 'border-primary bg-primary/10 shadow-sm'
                            : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm group-hover:text-primary transition-colors">
                            {marker.city}
                          </span>
                          <span className="text-[10px] opacity-60 font-medium">
                            {marker.iso}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-base-content/60">
                          <span>{marker.country}</span>
                          <ArrowUpRight className={`size-3.5 transition-transform ${isActive ? 'text-primary translate-x-0.5 -translate-y-0.5' : 'opacity-40'}`} />
                        </div>
                      </button>
                    )
                  })}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}