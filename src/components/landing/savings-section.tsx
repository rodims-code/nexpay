import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheck, BadgePercent, Layers3 } from 'lucide-react'

const savingsTabs = [
  {
    id: 'automation',
    label: 'Automation',
    badge: 'badge-success',
    title: 'Moins d’opérations manuelles, plus de vélocité',
    value: '-42% de tâches répétitives',
    description:
      'Les règles d’automatisation réduisent les interventions humaines et accélèrent les validations cross-border.',
    stats: [
      { label: 'Heures économisées', value: '128h/mois' },
      { label: 'Erreurs évitées', value: '94%' },
    ],
  },
  {
    id: 'treasury',
    label: 'Treasury',
    badge: 'badge-accent',
    title: 'Une vision claire de vos flux et de votre trésorerie',
    value: '+31% de liquidité exploitée',
    description:
      'La lecture consolidée des entrées et sorties aide vos équipes à prioriser les mouvements et à mieux allouer la trésorerie.',
    stats: [
      { label: 'Visibilité', value: 'Temps réel' },
      { label: 'Décision', value: 'Plus rapide' },
    ],
  },
  {
    id: 'reconciliation',
    label: 'Reconciliation',
    badge: 'badge-info',
    title: 'Des écarts repérés plus tôt, des clôtures plus nettes',
    value: '-73% de délai de clôture',
    description:
      'Chaque transaction est liée à son statut, sa source et son résultat pour simplifier les rapprochements quotidiens.',
    stats: [
      { label: 'Clôture', value: '12 min' },
      { label: 'Traçabilité', value: '100%' },
    ],
  },
] as const

type SavingsTabId = (typeof savingsTabs)[number]['id']

export function SavingsSection() {
  const [activeTab, setActiveTab] = useState<SavingsTabId>(savingsTabs[0].id)
  const activeItem =
    savingsTabs.find((tab) => tab.id === activeTab) ?? savingsTabs[0]

  return (
    <section id="savings" className="px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="badge badge-outline gap-2">
              <BadgePercent className="size-3.5" />
              Valeur SaaS
            </span>
            <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Économiser du temps, réduire les coûts et garder le contrôle.
            </h2>
            <p className="text-lg leading-8 text-base-content/70">
              Les indicateurs ci-dessous sont pensés comme une lecture rapide
              des gains que Nexpay apporte aux équipes qui doivent exécuter vite
              et sans friction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="badge badge-success badge-lg">+21%</div>
            <div className="badge badge-accent badge-lg">ROI</div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-base-200 bg-base-100 p-4 shadow-xl shadow-base-300/10">
            <div className="tabs tabs-boxed w-full bg-base-200/70 p-2">
              {savingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab flex-1 gap-2 ${activeTab === tab.id ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3 }}
                className="mt-6 card bg-base-200/55"
              >
                <div className="card-body gap-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`badge ${activeItem.badge} badge-lg`}>
                          <Layers3 className="size-4" />
                        </span>
                        <div className="text-sm uppercase tracking-[0.3em] text-base-content/45">
                          {activeItem.label}
                        </div>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                        {activeItem.title}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-base-100 p-5 shadow-sm">
                    <div className="text-sm uppercase tracking-[0.24em] text-base-content/45">
                      Impact direct
                    </div>
                    <div className="mt-2 text-3xl font-black text-primary">
                      {activeItem.value}
                    </div>
                    <p className="mt-3 max-w-xl leading-7 text-base-content/70">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeItem.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-3xl border border-base-200 bg-base-100 p-4"
                      >
                        <div className="text-xs uppercase tracking-[0.24em] text-base-content/45">
                          {stat.label}
                        </div>
                        <div className="mt-2 text-xl font-bold">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Accélération',
                value: '2.4x',
                copy: 'des validations grâce à des workflows plus clairs',
              },
              {
                title: 'Réduction du risque',
                value: '99.9%',
                copy: 'de traçabilité sur les événements critiques',
              },
              {
                title: 'Gain de temps',
                value: '128h',
                copy: 'économisées par mois dans les opérations récurrentes',
              },
              {
                title: 'Qualité des clôtures',
                value: '12 min',
                copy: 'pour aligner les statuts et les écarts principaux',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="card border border-base-200 bg-base-100 shadow-lg shadow-base-300/10 transition"
              >
                <div className="card-body gap-4 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-base-content/55">
                    <BadgeCheck className="size-4 text-success" />
                    {item.title}
                  </div>
                  <div className="text-4xl font-black">{item.value}</div>
                  <p className="leading-7 text-base-content/65">{item.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
