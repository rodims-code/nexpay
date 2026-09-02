import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Coins,
  ExternalLink,
  Globe2,
  Layers,
  MapPin,
  Network,
  Sparkles,
} from 'lucide-react'
import { AFRICA_COUNTRIES } from './africa-data'
import { MONEROO_MARKETS, type MonerooMarket } from './moneroo-coverage'

interface HoverInfo {
  id: string
  name: string
  market?: MonerooMarket
  x: number
  y: number
}

export function AfricaMapSection() {
  const [activeCountryId, setActiveCountryId] = useState<string>('NG')
  const [viewMode, setViewMode] = useState<'primary' | 'all'>('primary')
  const [hoveredInfo, setHoveredInfo] = useState<HoverInfo | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const marketsMap = useMemo(() => {
    const map = new Map<string, MonerooMarket>()
    MONEROO_MARKETS.forEach((m) => map.set(m.id, m))
    return map
  }, [])

  const activeMarket = useMemo(
    () =>
      marketsMap.get(activeCountryId) ??
      MONEROO_MARKETS.find((m) => m.id === 'NG') ??
      MONEROO_MARKETS[0],
    [activeCountryId, marketsMap]
  )

  const displayedMarkets = useMemo(() => {
    if (viewMode === 'primary') {
      return MONEROO_MARKETS.filter((m) => m.isPrimary)
    }
    return MONEROO_MARKETS
  }, [viewMode])

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
              Expansion & Infrastructure
            </span>
          </div>

          <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Connecter les marchés
            <span className="block text-primary">à travers l’Afrique.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-base-content/65 sm:text-lg">
            NexPay s’appuie sur les infrastructures de paiement les plus fiables
            pour connecter plus de 24 marchés africains. Survolez la carte pour
            découvrir la couverture et les méthodes disponibles pour chaque pays.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          {/* ================= LEFT ================= */}
          <div className="space-y-6">
            {/* Stats / Network cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-base-200 bg-base-200/30 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Globe2 className="size-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-base-content/40">
                    Couverture
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-4xl font-black text-primary">
                    24+
                  </div>
                  <div className="mt-1 text-sm text-base-content/60">
                    Pays africains couverts
                  </div>
                </div>
              </div>

              {/* Clickable Moneroo Network card */}
              <a
                href="https://moneroo.io/fr/coverage"
                target="_blank"
                rel="noopener noreferrer"
                title="Consulter la couverture officielle sur Moneroo.io (s'ouvre dans un nouvel onglet)"
                className="group rounded-3xl border border-secondary/20 bg-gradient-to-br from-base-200/50 to-secondary/5 p-6 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-base-200/80 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-secondary/15 p-3 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                    <Network className="size-6" />
                  </div>

                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-secondary transition-colors group-hover:text-secondary-content">
                    Network
                    <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-2xl font-black transition-colors group-hover:text-secondary">
                    Moneroo
                    <ArrowUpRight className="size-5 text-secondary opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-base-content/70 group-hover:text-base-content">
                    <span>Provider envisagé</span>
                    <span className="badge badge-secondary badge-xs font-bold">
                      Voir couverture ↗
                    </span>
                  </div>
                </div>
              </a>
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
                    <p className="mt-1 flex items-center gap-2 font-medium text-base-content/65">
                      <span>{activeMarket.country}</span>
                      <span className="text-base-content/30">•</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-base-200/70 px-2 py-0.5 text-xs font-bold text-base-content/70">
                        <Coins className="size-3" />
                        {activeMarket.currency}
                      </span>
                    </p>
                  </div>

                  <span
                    className="badge border-0 text-white shadow-sm font-bold text-xs px-3 py-3"
                    style={{ backgroundColor: activeMarket.color }}
                  >
                    {activeMarket.badge}
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="font-bold text-base sm:text-lg">
                    {activeMarket.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-base-content/70">
                    {activeMarket.description}
                  </p>
                </div>

                {/* Methods */}
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-base-content/45">
                    <span>Méthodes disponibles (via Moneroo)</span>
                    <span className="text-[10px] font-semibold text-primary">
                      {activeMarket.methods.length} options
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeMarket.methods.map((method) => (
                      <span
                        key={method}
                        className="badge badge-lg gap-1.5 border-base-200 bg-base-200/50 text-xs font-medium"
                      >
                        <CheckCircle2 className="size-3.5 text-success" />
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gateways / ecosystem */}
                {activeMarket.gateways && activeMarket.gateways.length > 0 && (
                  <div className="mt-5 border-t border-base-200/60 pt-4">
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-base-content/45">
                      <Layers className="size-3.5 text-secondary" />
                      <span>Réseaux & Passerelles connectés</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeMarket.gateways.map((gw) => (
                        <span
                          key={gw}
                          className="rounded-lg bg-secondary/10 px-2.5 py-1 text-[11px] font-bold text-secondary"
                        >
                          {gw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Country selector & filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/45">
                  Explorer les marchés
                </div>

                {/* Tabs */}
                <div className="flex rounded-xl bg-base-200/60 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('primary')}
                    className={`rounded-lg px-2.5 py-1 font-bold transition-all ${
                      viewMode === 'primary'
                        ? 'bg-base-100 text-primary shadow-sm'
                        : 'text-base-content/60 hover:text-base-content'
                    }`}
                  >
                    Focus NexPay
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('all')}
                    className={`rounded-lg px-2.5 py-1 font-bold transition-all ${
                      viewMode === 'all'
                        ? 'bg-base-100 text-primary shadow-sm'
                        : 'text-base-content/60 hover:text-base-content'
                    }`}
                  >
                    Tous ({MONEROO_MARKETS.length})
                  </button>
                </div>
              </div>

              <div className="grid max-h-[340px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {displayedMarkets.map((market) => {
                  const isActive = market.id === activeCountryId

                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => setActiveCountryId(market.id)}
                      onMouseEnter={() => setActiveCountryId(market.id)}
                      className={`group rounded-2xl border p-3.5 text-left transition-all duration-200 ${
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
                          <span className="font-bold text-sm">
                            {market.country}
                          </span>
                        </div>

                        <span className="text-[10px] font-bold text-base-content/50">
                          {market.currency}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between pl-4.5 text-xs text-base-content/50">
                        <span>{market.city}</span>
                        <ArrowUpRight
                          className={`size-3.5 transition-transform ${
                            isActive
                              ? 'translate-x-0.5 -translate-y-0.5'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                          style={isActive ? { color: market.color } : undefined}
                        />
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
                    Couverture Moneroo en Afrique
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://moneroo.io/fr/coverage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge badge-secondary badge-outline gap-1.5 px-3 py-3 text-xs font-bold transition-all hover:bg-secondary hover:text-white"
                  >
                    <ExternalLink className="size-3" />
                    24+ marchés couverts
                  </a>
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
                    Moneroo Coverage
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
                      ({activeMarket.currency})
                    </span>
                  </div>

                  {/* Large Vector Map */}
                  <svg
                    viewBox="-2 -2 238 222"
                    preserveAspectRatio="xMidYMid meet"
                    className="relative z-10 h-full w-full select-none"
                    aria-label="Carte interactive de l'Afrique avec la couverture Moneroo"
                  >
                    <defs>
                      <filter
                        id="active-glow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="3"
                          stdDeviation="4"
                          floodOpacity="0.35"
                        />
                      </filter>
                    </defs>

                    {AFRICA_COUNTRIES.map((country) => {
                      const market = marketsMap.get(country.id)
                      const isCovered = !!market
                      const isActive = activeCountryId === country.id

                      let fill = '#CBD5E1'
                      let stroke = '#FFFFFF'
                      let strokeWidth = '0.5'
                      let opacity = 0.85
                      let filter = 'none'

                      if (isCovered) {
                        fill = market.color
                        if (isActive) {
                          opacity = 1
                          stroke = '#FFFFFF'
                          strokeWidth = '1.3'
                          filter = `drop-shadow(0px 3px 6px ${market.color}90)`
                        } else if (market.isPrimary) {
                          opacity = 0.8
                          stroke = '#FFFFFF'
                          strokeWidth = '0.7'
                        } else {
                          opacity = 0.65
                          stroke = '#FFFFFF'
                          strokeWidth = '0.5'
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
                          tabIndex={isCovered ? 0 : -1}
                          role="button"
                          aria-label={
                            isCovered
                              ? `${market.country} - ${market.city} (${market.methods.join(', ')})`
                              : country.name
                          }
                          onMouseEnter={(e) => handleCountryHover(country, e)}
                          onMouseMove={handleCountryMove}
                          onMouseLeave={() => setHoveredInfo(null)}
                          onClick={() => handleCountryClick(country.id)}
                          className={`transition-all duration-200 ease-out outline-none ${
                            isCovered
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
                        <div className="min-w-[150px] max-w-[240px] rounded-xl border border-base-200 bg-base-100/95 p-2.5 text-center shadow-2xl backdrop-blur-md">
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

                          {hoveredInfo.market ? (
                            <div className="mt-1 space-y-1">
                              <div className="text-[10px] font-semibold text-base-content/70">
                                {hoveredInfo.market.city} •{' '}
                                <span
                                  className="font-bold"
                                  style={{ color: hoveredInfo.market.color }}
                                >
                                  {hoveredInfo.market.currency}
                                </span>
                              </div>
                              <div className="line-clamp-2 text-[9px] text-base-content/50">
                                {hoveredInfo.market.methods.slice(0, 3).join(', ')}
                                {hoveredInfo.market.methods.length > 3 && '...'}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-0.5 text-[9px] text-base-content/40">
                              Marché en expansion
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

                    {MONEROO_MARKETS.filter((m) => m.isPrimary).map((market) => {
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-base-200 bg-base-200/20 px-6 py-4">
                <p className="text-center sm:text-left text-xs text-base-content/55">
                  Survolez un pays pour explorer ses méthodes de paiement réelles
                  sur Moneroo.
                </p>
                <a
                  href="https://moneroo.io/fr/coverage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                >
                  Voir toute la couverture Moneroo
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
