import { motion } from 'framer-motion'
import { ArrowUpRight, Clock3, PlugZap, ShieldCheck, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Connectez vos rails',
    description:
      'Branchez vos partenaires, vos comptes et vos règles de routage dans une seule couche d’orchestration.',
    tag: 'Intégration rapide',
    icon: PlugZap,
  },
  {
    number: '02',
    title: 'Automatisez vos opérations',
    description:
      'Réduisez les saisies manuelles avec des workflows qui déclenchent payouts, validations et alertes.',
    tag: 'Workflows pilotés',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Suivez et corrigez en temps réel',
    description:
      'Gardez le contrôle avec un suivi clair, des statuts lisibles et des remédiations plus rapides.',
    tag: 'Visibilité continue',
    icon: Clock3,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-neutral px-4 py-24 text-neutral-content lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="badge badge-outline border-neutral-content/20 text-neutral-content/80">
            Processus
          </span>
          <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.96] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Un système simple à lire, même quand vos opérations deviennent
            complexes.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-neutral-content/70">
            Pensée pour les équipes finance, produit et opérations, la plate-forme
            garde l’expérience lisible du premier branchement jusqu’à la
            supervision quotidienne.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Réduction du temps', value: '−68%' },
              { label: 'Flux unifiés', value: '12' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-neutral-content/45">
                  {item.label}
                </div>
                <div className="mt-2 text-3xl font-black">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="card border border-white/10 bg-base-100/5 text-neutral-content shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20"
              >
                <div className="card-body gap-5 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl font-black text-white/10">
                          {step.number}
                        </span>
                        <span className="badge badge-success badge-outline">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3>
                      <p className="max-w-2xl text-base leading-7 text-neutral-content/70">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon className="size-6" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-content/55">
                    <ShieldCheck className="size-4 text-success" />
                    Séquence sécurisée, prête à l’échelle
                    <ArrowUpRight className="ml-auto size-4" />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
