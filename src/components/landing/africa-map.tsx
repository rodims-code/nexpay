import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Globe2, MapPin, Waves } from 'lucide-react'

const mapMarkers = [
  {
    id: 'lagos',
    city: 'Lagos',
    country: 'Nigeria',
    x: 31,
    y: 47,
    badge: 'Collecte',
    title: 'Volumes transactionnels élevés',
    description: 'Paiements domestiques et agrégations à forte cadence.',
  },
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    x: 58,
    y: 43,
    badge: 'API',
    title: 'Hub produit et intégrations',
    description: 'Orchestration des partenaires et tests de nouveaux rails.',
  },
  {
    id: 'johannesburg',
    city: 'Johannesburg',
    country: 'South Africa',
    x: 56,
    y: 76,
    badge: 'Payouts',
    title: 'Payouts pour les opérations du sud',
    description: 'Flux récurrents avec un suivi précis des statuts.',
  },
  {
    id: 'casablanca',
    city: 'Casablanca',
    country: 'Morocco',
    x: 43,
    y: 16,
    badge: 'Nord',
    title: 'Connexion rapide aux marchés du nord',
    description:
      'Une lecture claire des entrées et des conversions multi-devises.',
  },
  {
    id: 'kigali',
    city: 'Kigali',
    country: 'Rwanda',
    x: 50,
    y: 54,
    badge: 'Support',
    title: 'Déploiements rapides pour l’Est',
    description:
      'Des équipes qui suivent l’activité et les escalades en temps réel.',
  },
] as const

type MarkerId = (typeof mapMarkers)[number]['id']

export function AfricaMapSection() {
  const [activeMarkerId, setActiveMarkerId] = useState<MarkerId>(mapMarkers[0].id)
  const activeMarker =
    mapMarkers.find((marker) => marker.id === activeMarkerId) ?? mapMarkers[0]

  return (
    <section id="africa-map" className="px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            <span className="badge badge-outline gap-2">
              <Globe2 className="size-3.5" />
              Carte Afrique
            </span>
            <h2 className="text-4xl font-black leading-[0.96] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Explorer notre présence à travers le continent.
            </h2>
            <p className="text-lg leading-8 text-base-content/70">
              Les régions clés sont indiquées pour donner un aperçu rapide de la
              couverture, des volumes et des points d’attention opérationnels.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Régions suivies', value: '8+' },
                { label: 'Points de couverture', value: '18' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-base-200 bg-base-100 p-5 shadow-lg shadow-base-300/10"
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-base-content/45">
                    {item.label}
                  </div>
                  <div className="mt-2 text-3xl font-black">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-accent/10 to-info/10 blur-3xl" />
            <div className="card relative overflow-hidden border border-base-200 bg-base-100/90 shadow-2xl shadow-base-300/10">
              <div className="card-body gap-5 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.3em] text-base-content/45">
                      Network map
                    </div>
                    <h3 className="text-2xl font-bold">
                      Couverture régionale active
                    </h3>
                  </div>
                  <div className="badge badge-success badge-lg gap-2">
                    <Waves className="size-4" />
                    Temps réel
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-base-200 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_18%),radial-gradient(circle_at_75%_30%,rgba(59,130,246,0.16),transparent_18%),linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.05))]">
                  <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
                  <div
                    className="absolute inset-8 border border-primary/10 bg-gradient-to-b from-primary/10 via-base-100/20 to-accent/10 shadow-inner"
                    style={{
                      clipPath:
                        'polygon(45% 6%, 57% 8%, 69% 13%, 76% 22%, 79% 32%, 76% 41%, 81% 49%, 79% 58%, 73% 68%, 65% 80%, 55% 92%, 46% 96%, 36% 90%, 27% 81%, 22% 70%, 21% 60%, 24% 52%, 18% 42%, 20% 31%, 27% 20%, 36% 11%)',
                    }}
                  />

                  {mapMarkers.map((marker) => (
                    <button
                      key={marker.id}
                      type="button"
                      aria-label={`${marker.city}, ${marker.country}`}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 ${
                        activeMarkerId === marker.id ? 'z-20' : 'z-10'
                      }`}
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      onMouseEnter={() => setActiveMarkerId(marker.id)}
                      onFocus={() => setActiveMarkerId(marker.id)}
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-secondary/40 opacity-75" />
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-secondary shadow-lg shadow-secondary/40">
                        <span className="h-2 w-2 rounded-full bg-base-100" />
                      </span>
                    </button>
                  ))}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMarker.id}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ duration: 0.24 }}
                      className="absolute left-6 top-6 z-30 max-w-xs rounded-3xl border border-base-200 bg-base-100/95 p-4 shadow-2xl shadow-base-300/20 backdrop-blur"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-base-content/45">
                            <MapPin className="size-3.5 text-primary" />
                            {activeMarker.country}
                          </div>
                          <div className="mt-1 text-xl font-bold">
                            {activeMarker.city}
                          </div>
                        </div>
                        <span className="badge badge-accent">
                          {activeMarker.badge}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-base-content/70">
                        {activeMarker.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-base-content/55">
                        {activeMarker.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {mapMarkers.map((marker) => (
                    <button
                      key={marker.id}
                      type="button"
                      onMouseEnter={() => setActiveMarkerId(marker.id)}
                      onFocus={() => setActiveMarkerId(marker.id)}
                      className={`card border transition ${
                        activeMarkerId === marker.id
                          ? 'border-primary bg-primary/5'
                          : 'border-base-200 bg-base-100'
                      }`}
                    >
                      <div className="card-body gap-2 p-4 text-left">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-semibold">{marker.city}</div>
                          <span className="badge badge-outline">
                            {marker.badge}
                          </span>
                        </div>
                        <div className="text-sm text-base-content/55">
                          {marker.country}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary">
                          Détails
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
