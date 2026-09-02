import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Network,
  Sparkles,
} from 'lucide-react'
import { AFRICA_COUNTRIES } from './africa-data'

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
  },
  {
    id: 'NG',
    country: 'Nigéria',
    city: 'Lagos',
    badge: 'Marché envisagé',
    title: 'Un marché numérique majeur',
    description:
      'Le Nigéria constitue un marché particulièrement important grâce à son écosystème fintech et son volume élevé de transactions.',
    methods: ['Bank Transfer', 'USSD', 'Cartes bancaires'],
    color: '#10B981',
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
  },
  {
    id: 'KE',
    country: 'Kenya',
    city: 'Nairobi',
    badge: 'À confirmer',
    title: 'Écosystème Mobile Money avancé',
    description:
      'Le Kenya est l’un des marchés africains les plus importants pour les paiements mobiles et les transferts numériques.',
    methods: ['M-Pesa', 'Virement bancaire', 'Cartes bancaires'],
    color: '#EF4444',
  },
  {
    id: 'ZA',
    country: 'Afrique du Sud',
    city: 'Johannesburg',
    badge: 'À confirmer',
    title: 'Infrastructure financière développée',
    description:
      'L’Afrique du Sud représente un marché important grâce à son infrastructure bancaire et financière avancée.',
    methods: ['EFT', 'Cartes bancaires', 'Virement bancaire'],
    color: '#3B82F6',
  },
] as const

interface HoverInfo {
  id: string
  name: string
  market?: Market
  x: number
  y: number
}

export function AfricaMapSection() {
  const [activeCountryId, setActiveCountryId] = useState<CountryId>('NG')
  const [hoveredInfo, setHoveredInfo] = useState<HoverInfo | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const activeMarket = useMemo(
    () =>
      markets.find((market) => market.id === activeCountryId) ?? markets[0],
    [activeCountryId]
  )

  const marketsMap = useMemo(() => {
    const map = new Map<string, Market>()
    markets.forEach((m) => map.set(m.id, m))
    return map
  }, [])

  const handleCountryHover = (
    country: (typeof AFRICA_COUNTRIES)[number],
    e: React.MouseEvent<SVGPathElement>
  ) => {
    const market = marketsMap.get(country.id)
    if (market) {
      setActiveCountryId(market.id)
    }

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect()
      setHoveredInfo({
        id: country.id,
        name: country.name,
        market,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleCountryMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (!hoveredInfo || !mapContainerRef.current) return
    const rect = mapContainerRef.current.getBoundingClientRect()
    setHoveredInfo((prev) =>
      prev
        ? {
            ...prev,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          }
        : null
    )
  }

  const handleCountryClick = (countryId: string) => {
    const market = marketsMap.get(countryId)
    if (market) {
      setActiveCountryId(market.id)
    }
  }

  return (
    <section
      id="africa-map"
      className="relative overflow-hidden bg-base-100 px-4 py-20 text-base-content sm:py-24 lg:px-8"
    >
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[15%] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
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
            <span className="block text-primary">à travers l’Afrique.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-base-content/65 sm:text-lg">
            NexPay ambitionne de faciliter les transferts et les paiements entre
            différents marchés africains. Passez la souris sur les pays de la
            carte pour découvrir notre vision pour chaque marché.
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
                  <div className="text-2xl font-black">Moneroo</div>
                  <div className="mt-2 text-sm text-base-content/60">
                    Provider envisagé
                  </div>
                </div>
              </div>
            </div>

            {/* Active market card */}
            <motion.div
              key={activeMarket.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-xl"
            >
              {/* Color accent bar */}
              <div
                className="h-2 w-full transition-colors duration-300"
                style={{ backgroundColor: activeMarket.color }}
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 border-b border-base-200 pb-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin
                        className="size-4"
                        style={{ color: activeMarket.color }}
                      />
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/50">
                        Marché sélectionné
                      </span>
                    </div>

                    <h3 className="text-2xl font-black">{activeMarket.city}</h3>
                    <p className="mt-1 font-medium text-base-content/55">
                      {activeMarket.country}
                    </p>
                  </div>

                  <span
                    className="badge border-0 text-white shadow-sm"
                    style={{ backgroundColor: activeMarket.color }}
                  >
                    {activeMarket.badge}
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="font-bold text-base sm:text-lg">
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
                  const isActive = market.id === activeCountryId

                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => setActiveCountryId(market.id)}
                      onMouseEnter={() => setActiveCountryId(market.id)}
                      className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-transparent bg-base-200 shadow-md'
                          : 'border-base-200 bg-base-100 hover:bg-base-200/50'
                      }`}
                      style={
                        isActive
                          ? {
                              boxShadow: `0 8px 24px ${market.color}25`,
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 rounded-full transition-transform group-hover:scale-125"
                            style={{ backgroundColor: market.color }}
                          />
                          <span className="font-bold">{market.country}</span>
                        </div>

                        <ArrowUpRight
                          className={`size-4 transition-transform ${
                            isActive
                              ? 'translate-x-0.5 -translate-y-0.5'
                              : 'opacity-40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100'
                          }`}
                          style={
                            isActive
                              ? { color: market.color }
                              : undefined
                          }
                        />
                      </div>

                      <div className="mt-1 pl-4.5 text-xs text-base-content/50">
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
                  {markets.length} marchés
                </div>
              </div>

              {/* MAP WRAPPER */}
              <div className="p-3 sm:p-6">
                <div
                  ref={mapContainerRef}
                  className="relative flex aspect-[1.08/1] w-full items-center justify-center overflow-hidden rounded-3xl border border-base-200 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 sm:p-6 dark:from-base-300/30 dark:to-base-300/10"
                >
                  {/* Background Grid */}
                  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.14] dark:opacity-[0.06]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(100,116,139,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,.4) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                      }}
                    />
                  </div>

                  {/* Watermark label */}
                  <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400/80">
                    <Sparkles className="size-3 text-primary/60" />
                    Africa
                  </div>

                  {/* Active country badge in corner */}
                  <div className="pointer-events-none absolute right-5 top-5 z-10 hidden sm:flex items-center gap-2 rounded-xl bg-base-100/90 px-3 py-1.5 shadow-sm backdrop-blur border border-base-200">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: activeMarket.color }}
                    />
                    <span className="text-xs font-bold">
                      {activeMarket.country}
                    </span>
                    <span className="text-[10px] text-base-content/50">
                      ({activeMarket.city})
                    </span>
                  </div>

                  {/* Large Vector Map */}
                  <svg
                    viewBox="-2 -2 238 222"
                    preserveAspectRatio="xMidYMid meet"
                    className="relative z-10 h-full w-full select-none"
                    aria-label="Carte interactive de l'Afrique avec les marchés ciblés"
                  >
                    {AFRICA_COUNTRIES.map((country) => {
                      const market = marketsMap.get(country.id)
                      const isTarget = !!market
                      const isActive = activeCountryId === country.id

                      let fill = '#CBD5E1'
                      let stroke = '#FFFFFF'
                      let strokeWidth = '0.5'
                      let opacity = 0.85
                      let filter = 'none'

                      if (isTarget) {
                        fill = market.color
                        if (isActive) {
                          opacity = 1
                          stroke = '#FFFFFF'
                          strokeWidth = '1.3'
                          filter = `drop-shadow(0px 3px 6px ${market.color}90)`
                        } else {
                          opacity = 0.75
                          stroke = '#FFFFFF'
                          strokeWidth = '0.7'
                        }
                      }

                      return (
                        <path
                          key={country.id}
                          id={country.id}
                          d={country.d}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={strokeWidth}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          opacity={opacity}
                          filter={filter}
                          tabIndex={isTarget ? 0 : -1}
                          role="button"
                          aria-label={
                            isTarget
                              ? `${market.country} - ${market.city}`
                              : country.name
                          }
                          onMouseEnter={(e) => handleCountryHover(country, e)}
                          onMouseMove={handleCountryMove}
                          onMouseLeave={() => setHoveredInfo(null)}
                          onClick={() => handleCountryClick(country.id)}
                          className={`transition-all duration-200 ease-out outline-none ${
                            isTarget
                              ? 'cursor-pointer hover:opacity-100 hover:brightness-110'
                              : 'cursor-pointer hover:fill-slate-400 hover:opacity-95'
                          }`}
                        />
                      )
                    })}
                  </svg>

                  {/* Floating Tooltip following cursor */}
                  <AnimatePresence>
                    {hoveredInfo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-full pb-3"
                        style={{
                          left: hoveredInfo.x,
                          top: hoveredInfo.y,
                        }}
                      >
                        <div className="rounded-xl border border-base-200 bg-base-100/95 px-3 py-2 text-center shadow-xl backdrop-blur-md">
                          <div className="flex items-center justify-center gap-1.5">
                            {hoveredInfo.market && (
                              <span
                                className="size-2 rounded-full"
                                style={{
                                  backgroundColor: hoveredInfo.market.color,
                                }}
                              />
                            )}
                            <span className="text-xs font-extrabold text-base-content">
                              {hoveredInfo.name}
                            </span>
                          </div>

                          {hoveredInfo.market && (
                            <div className="mt-0.5 text-[10px] font-semibold text-base-content/60">
                              {hoveredInfo.market.city} •{' '}
                              <span
                                style={{ color: hoveredInfo.market.color }}
                              >
                                {hoveredInfo.market.badge}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Legend */}
                <div className="relative z-20 mt-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-base-200 dark:bg-base-200/40">
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 dark:text-base-content/70">
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-base-content/40">
                      <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                      Autres pays
                    </div>

                    {markets.map((market) => {
                      const isActive = market.id === activeCountryId
                      return (
                        <button
                          key={market.id}
                          type="button"
                          onClick={() => setActiveCountryId(market.id)}
                          onMouseEnter={() => setActiveCountryId(market.id)}
                          className={`flex items-center gap-1.5 transition-all ${
                            isActive
                              ? 'scale-105 font-bold text-base-content'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <span
                            className="size-2.5 rounded-full"
                            style={{
                              backgroundColor: market.color,
                              boxShadow: isActive
                                ? `0 0 8px ${market.color}`
                                : 'none',
                            }}
                          />
                          {market.country}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom helper */}
              <div className="border-t border-base-200 bg-base-200/20 px-6 py-4">
                <p className="text-center text-xs text-base-content/50">
                  Passez la souris sur un pays ou cliquez dessus pour explorer
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
