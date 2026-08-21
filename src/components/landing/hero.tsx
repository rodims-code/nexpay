import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Smartphone,
  CreditCard,
  WalletCards,
} from 'lucide-react'

const floatingCards = [
  {
    label: 'Payouts actifs',
    value: '24/7',
    tone: 'badge-success',
    icon: WalletCards,
  },
  {
    label: 'Temps gagné',
    value: '−68%',
    tone: 'badge-accent',
    icon: TrendingUp,
  },
  {
    label: 'Pays couverts',
    value: '18',
    tone: 'badge-info',
    icon: Globe2,
  },
]

const trustPoints = [
  'Afrique → Afrique',
  'Europe → Afrique',
  'Réconciliation unifiée',
  'Mobile Money, Visa, Mastercard',
]

export function HeroSection() {
  return (
    <section id="hero" className="hero min-h-[92vh] pt-24">
      <div className="hero-content grid max-w-7xl items-center gap-14 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-outline badge-lg gap-2">
              <Sparkles className="size-3.5" />
              Plateforme SaaS pour l’Afrique
            </span>
            <span className="badge badge-success badge-lg">Temps réel</span>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-balance text-base-content sm:text-6xl lg:text-7xl">
              Envoyez de l’argent partout en Afrique, ou depuis l’Europe vers
              l’Afrique, en quelques clics.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-base-content/70 sm:text-xl">
              Nexpay permet les transferts Afrique → Afrique et les envois
              Europe → Afrique via mobile money, Visa et Mastercard, avec une
              couverture claire des marchés africains.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/auth/register" className="btn btn-primary btn-lg">
              Commencer
              <ArrowRight className="size-4" />
            </Link>
            <a href="#how-it-works" className="btn btn-outline btn-lg">
              Découvrir
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100/70 px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="size-4 shrink-0 text-success" />
                <span className="text-sm font-medium text-base-content/70">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Afrique → Afrique',
                copy: 'Envoi local et régional vers les pays couverts sur le continent.',
                icon: Globe2,
              },
              {
                title: 'Europe → Afrique',
                copy: 'Dépôts via mobile money, Visa et Mastercard depuis l’étranger.',
                icon: CreditCard,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="card border border-base-200 bg-base-100/75 shadow-sm"
                >
                  <div className="card-body gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-bold text-base-content">
                          {item.title}
                        </div>
                        <div className="text-sm text-base-content/55">
                          {item.copy}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/10 blur-3xl" />

          <div className="card relative overflow-hidden border border-base-200 bg-base-100/90 shadow-2xl shadow-base-300/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.03),transparent_55%)]" />

            <div className="card-body relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/45">
                    Nexpay OS
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-base-content">
                    Opérations pilotées par la donnée
                  </h2>
                </div>
                <div className="badge badge-success badge-outline gap-2 px-3 py-3">
                  <ShieldCheck className="size-4" />
                  Sécurisé
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] border border-base-200 bg-base-200/45 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-base-content/55">
                        Flux du jour
                      </div>
                      <div className="text-3xl font-black text-base-content">
                        2.48M$
                      </div>
                    </div>
                    <div className="badge badge-accent badge-lg">+21.4%</div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[72, 88, 54, 96].map((height, index) => (
                      <motion.div
                        key={height}
                        initial={{ scaleY: 0.4, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          duration: 0.4,
                        }}
                        className="h-32 origin-bottom rounded-[1.25rem] bg-gradient-to-t from-primary via-primary/70 to-primary-content/70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: 'Taux de réussite', value: '99.92%' },
                      { label: 'Réconciliation', value: '12 min' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-base-100 px-4 py-3 shadow-sm"
                      >
                        <div className="text-xs uppercase tracking-[0.24em] text-base-content/45">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xl font-bold">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.75rem] border border-base-200 bg-base-200/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 text-success">
                        <BarChart3 className="size-5" />
                      </div>
                      <div>
                        <div className="font-semibold">Réconciliation</div>
                        <div className="text-sm text-base-content/55">
                          automatisée sur plusieurs rails
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-base-200 bg-base-200/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                        <ShieldCheck className="size-5" />
                      </div>
                      <div>
                        <div className="font-semibold">Gouvernance</div>
                        <div className="text-sm text-base-content/55">
                          permissions, audit et alertes intégrés
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-base-200 bg-base-200/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-info/15 text-info">
                        <WalletCards className="size-5" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          Mobile money & cartes
                        </div>
                        <div className="text-sm text-base-content/55">
                          pour envoyer et recevoir partout en Afrique
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-base-200 bg-base-200/50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                        <Smartphone className="size-5" />
                      </div>
                      <div>
                        <div className="font-semibold">Couverture visible</div>
                        <div className="text-sm text-base-content/55">
                          les pays supportés sont lisibles dès le premier écran
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {floatingCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.12, duration: 0.45 }}
                className={`card absolute hidden min-w-44 border border-base-200 bg-base-100/90 shadow-xl backdrop-blur md:block ${
                  index === 0
                    ? '-left-8 top-12'
                    : index === 1
                      ? '-right-2 top-8'
                      : '-bottom-6 left-16'
                }`}
              >
                <div className="card-body p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-base-content/45">
                        {card.label}
                      </div>
                      <div className="mt-1 text-2xl font-black">
                        {card.value}
                      </div>
                    </div>
                    <div className={`badge ${card.tone} badge-lg`}>
                      <Icon className="size-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
