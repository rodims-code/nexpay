
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Network,
} from 'lucide-react'

import africaMapUrl from '/africa.svg?url'

type CountryId = 'MA' | 'NG' | 'RW' | 'KE' | 'ZA'

interface Market {
  id: CountryId
  country: string
  city: string
  badge: string
  title: string
  description: string
  methods: string[]
  color: string

  /**
   * Position visuelle du marqueur.
   * Elles peuvent être ajustées légèrement selon ton SVG.
   */
  x: number
  y: number
}

const markets: readonly Market[] = [
  {
    id: 'MA',
    country: 'Maroc',
    city: 'Casablanca',
    badge: 'Marché envisagé',
    title: 'Porte d’entrée vers l’Afrique du Nord',
    description:
      'Le Maroc représente un marché stratégique à explorer pour connecter les utilisateurs et les différents moyens de paiement.',
    methods: ['Carte bancaire', 'Virement bancaire'],
    color: '#F59E0B',
    x: 28,
    y: 13,
  },

  {
    id: 'NG',
    country: 'Nigeria',
    city: 'Lagos',
    badge: 'Marché envisagé',
    title: 'Un marché numérique majeur',
    description:
      'Le Nigeria constitue un marché particulièrement important grâce à son écosystème fintech et son volume élevé de transactions.',
    methods: ['Bank Transfer', 'USSD', 'Cartes'],
    color: '#10B981',
    x: 35,
    y: 44,
  },

  {
    id: 'RW',
    country: 'Rwanda',
    city: 'Kigali',
    badge: 'À confirmer',
    title: 'Un hub technologique africain',
    description:
      'Le Rwanda est un marché intéressant à explorer pour les paiements numériques et les services financiers modernes.',
    methods: ['MTN Mobile Money', 'Airtel Money'],
    color: '#8B5CF6',
    x: 59,
    y: 54,
  },

  {
    id: 'KE',
    country: 'Kenya',
    city: 'Nairobi',
    badge: 'À confirmer',
    title: 'Écosystème Mobile Money avancé',
    description:
      'Le Kenya est l’un des marchés africains les plus importants pour les paiements mobiles et les transferts numériques.',
    methods: ['M-Pesa', 'Virement bancaire', 'Cartes'],
    color: '#EF4444',
    x: 66,
    y: 48,
  },

  {
    id: 'ZA',
    country: 'Afrique du Sud',
    city: 'Johannesburg',
    badge: 'À confirmer',
    title: 'Infrastructure financière développée',
    description:
      'L’Afrique du Sud représente un marché important grâce à son infrastructure bancaire et financière avancée.',
    methods: ['EFT', 'Cartes', 'Virement bancaire'],
    color: '#3B82F6',
    x: 52,
    y: 82,
  },
] as const

const DEFAULT_COUNTRY_FILL = '#E2E8F0'
const DEFAULT_COUNTRY_STROKE = '#CBD5E1'

export function AfricaMapSection() {
  const [activeCountryId, setActiveCountryId] =
    useState<CountryId>('NG')

  const objectRef = useRef<HTMLObjectElement>(null)

  const activeMarket =
    markets.find((market) => market.id === activeCountryId) ??
    markets[0]

  /**
   * Coloration des vrais pays directement dans africa.svg
   */
  useEffect(() => {
    const objectElement = objectRef.current

    if (!objectElement) return

    const handleLoad = () => {
      const svgDocument = objectElement.contentDocument

      if (!svgDocument) return

      /**
       * Tous les pays redeviennent neutres.
       */
      svgDocument.querySelectorAll('[id]').forEach((element) => {
        const countryId = element.id

        if (
          countryId.length === 2 &&
          /^[A-Z]{2}$/.test(countryId)
        ) {
          const svgElement = element as SVGElement

          svgElement.style.fill = DEFAULT_COUNTRY_FILL
          svgElement.style.stroke = DEFAULT_COUNTRY_STROKE
          svgElement.style.strokeWidth = '0.7'
          svgElement.style.transition =
            'fill 300ms ease, opacity 300ms ease, filter 300ms ease'
          svgElement.style.cursor = 'default'
          svgElement.style.opacity = '1'
        }
      })

      /**
       * Pays ciblés.
       */
      markets.forEach((market) => {
        const country = svgDocument.getElementById(market.id)

        if (!country) return

        const svgCountry = country as SVGElement

        svgCountry.style.fill = market.color
        svgCountry.style.stroke = '#FFFFFF'
        svgCountry.style.strokeWidth =
          market.id === activeCountryId ? '1.5' : '0.9'

        svgCountry.style.cursor = 'pointer'
        svgCountry.style.opacity =
          market.id === activeCountryId ? '1' : '0.72'

        svgCountry.style.filter =
          market.id === activeCountryId
            ? `drop-shadow(0px 5px 8px ${market.color}88)`
            : 'none'

        svgCountry.onclick = () => {
          setActiveCountryId(market.id)
        }

        svgCountry.onmouseenter = () => {
          svgCountry.style.opacity = '1'
        }

        svgCountry.onmouseleave = () => {
          svgCountry.style.opacity =
            market.id === activeCountryId ? '1' : '0.72'
        }
      })
    }

    objectElement.addEventListener('load', handleLoad)

    /**
     * Si déjà chargé.
     */
    if (objectElement.contentDocument) {
      handleLoad()
    }

    return () => {
      objectElement.removeEventListener('load', handleLoad)
    }
  }, [activeCountryId])

  return (
    <section
      id="africa-map"
      className="relative overflow-hidden bg-base-100 px-4 py-20 text-base-content sm:py-24 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[15%] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-[10%] right-[-10%] h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 flex justify-center">
            <span className="badge badge-primary badge-outline gap-2 px-4 py-3 text-xs font-bold tracking-wide">
              <Globe2 className="size-4" />
              Expansion africaine
            </span>
          </div>

          <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Connecter les marchés
            <span className="block text-primary">
              à travers l’Afrique.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-base-content/65 sm:text-lg">
            NexPay ambitionne de faciliter les transferts et les paiements
            entre différents marchés africains. Explore les pays ciblés sur
            la carte et découvre notre vision pour chaque marché.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          {/* ================= LEFT ================= */}

          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-base-200 bg-base-200/30 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Globe2 className="size-6" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-base-content/40">
                    Expansion
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-4xl font-black text-primary">
                    {markets.length}
                  </div>

                  <div className="mt-1 text-sm text-base-content/60">
                    Marchés ciblés
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-base-200 bg-base-200/30 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
                    <Network className="size-6" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-base-content/40">
                    Network
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-2xl font-black">
                    Moneroo
                  </div>

                  <div className="mt-2 text-sm text-base-content/60">
                    Provider envisagé
                  </div>
                </div>
              </div>
            </div>

            {/* Active market card */}

            <motion.div
              key={activeMarket.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-xl"
            >
              {/* Color bar */}

              <div
                className="h-2 w-full"
                style={{
                  backgroundColor: activeMarket.color,
                }}
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 border-b border-base-200 pb-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin
                        className="size-4"
                        style={{
                          color: activeMarket.color,
                        }}
                      />

                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/50">
                        Marché sélectionné
                      </span>
                    </div>

                    <h3 className="text-2xl font-black">
                      {activeMarket.city}
                    </h3>

                    <p className="mt-1 font-medium text-base-content/55">
                      {activeMarket.country}
                    </p>
                  </div>

                  <span
                    className="badge border-0 text-white"
                    style={{
                      backgroundColor: activeMarket.color,
                    }}
                  >
                    {activeMarket.badge}
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="font-bold">
                    {activeMarket.title}
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                    {activeMarket.description}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-widest text-base-content/45">
                    Méthodes envisagées
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeMarket.methods.map((method) => (
                      <span
                        key={method}
                        className="badge badge-lg gap-1.5 border-base-200 bg-base-200/40 font-medium"
                      >
                        <CheckCircle2 className="size-3.5 text-success" />

                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Country selector */}

            <div className="space-y-2">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-base-content/45">
                Explorer les marchés
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {markets.map((market) => {
                  const isActive =
                    market.id === activeCountryId

                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() =>
                        setActiveCountryId(market.id)
                      }
                      className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-transparent bg-base-200 shadow-md'
                          : 'border-base-200 bg-base-100 hover:bg-base-200/40'
                      }`}
                      style={
                        isActive
                          ? {
                              boxShadow: `0 8px 30px ${market.color}22`,
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          {market.country}
                        </span>

                        <ArrowUpRight
                          className={`size-4 transition-transform ${
                            isActive
                              ? 'translate-x-0.5 -translate-y-0.5'
                              : 'opacity-40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100'
                          }`}
                          style={
                            isActive
                              ? {
                                  color: market.color,
                                }
                              : undefined
                          }
                        />
                      </div>

                      <div className="mt-1 text-xs text-base-content/50">
                        {market.city}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT MAP ================= */}

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-primary/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-base-200 bg-base-100 shadow-2xl">
              {/* Card header */}

              <div className="flex flex-col gap-4 border-b border-base-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-base-content/40">
                    Carte interactive
                  </div>

                  <h3 className="mt-1 text-xl font-black sm:text-2xl">
                    Marchés ciblés en Afrique
                  </h3>
                </div>

                <div className="badge badge-success badge-outline gap-2 px-3 py-3 text-xs font-bold">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />

                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>

                  5 marchés
                </div>
              </div>

              {/* MAP */}

              <div className="p-3 sm:p-6">
                <div className="relative w-full overflow-hidden rounded-3xl border border-base-200 bg-slate-50">
                  {/* Grid */}

                  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(100,116,139,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,.5) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                    />
                  </div>

                  {/* Decorative labels */}

                  <div className="pointer-events-none absolute left-5 top-5 z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Africa
                  </div>

                  {/* Map wrapper */}

                  <div className="relative z-10 aspect-[1.1/1] w-full p-2 sm:p-6">
                    <object
                      ref={objectRef}
                      data={africaMapUrl}
                      type="image/svg+xml"
                      className="pointer-events-auto h-full w-full"
                      aria-label="Carte de l'Afrique avec les marchés ciblés"
                    />

                    {/* City markers */}

                    {markets.map((market) => {
                      const isActive =
                        market.id === activeCountryId

                      return (
                        <button
                          key={market.id}
                          type="button"
                          aria-label={`${market.city}, ${market.country}`}
                          onClick={() =>
                            setActiveCountryId(market.id)
                          }
                          onMouseEnter={() =>
                            setActiveCountryId(market.id)
                          }
                          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            isActive
                              ? 'scale-110'
                              : 'hover:scale-110'
                          }`}
                          style={{
                            left: `${market.x}%`,
                            top: `${market.y}%`,
                          }}
                        >
                          {/* Pulse */}

                          {isActive && (
                            <span
                              className="absolute -inset-3 animate-ping rounded-full opacity-30"
                              style={{
                                backgroundColor:
                                  market.color,
                              }}
                            />
                          )}

                          {/* Pin */}

                          <span
                            className="relative flex size-5 items-center justify-center rounded-full border-[3px] border-white shadow-lg"
                            style={{
                              backgroundColor:
                                market.color,
                            }}
                          >
                            <span className="size-1.5 rounded-full bg-white" />
                          </span>

                          {/* Label */}

                          <span
                            className={`absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10px] font-black shadow-lg transition-all sm:text-xs ${
                              isActive
                                ? 'scale-100 opacity-100 text-white'
                                : 'scale-95 bg-white/95 text-slate-700 opacity-75'
                            }`}
                            style={
                              isActive
                                ? {
                                    backgroundColor:
                                      market.color,
                                  }
                                : undefined
                            }
                          >
                            {market.city}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}

                  <div className="relative z-20 border-t border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-slate-300" />

                        Autres pays
                      </div>

                      {markets.map((market) => (
                        <button
                          key={market.id}
                          type="button"
                          onClick={() =>
                            setActiveCountryId(market.id)
                          }
                          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                        >
                          <span
                            className="size-2 rounded-full"
                            style={{
                              backgroundColor:
                                market.color,
                            }}
                          />

                          {market.country}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom */}

              <div className="border-t border-base-200 bg-base-200/20 px-6 py-4">
                <p className="text-center text-xs text-base-content/45">
                  Cliquez sur un pays, un point ou un marché pour explorer
                  la vision NexPay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

