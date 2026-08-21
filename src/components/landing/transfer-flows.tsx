import { motion } from 'framer-motion'
import { ArrowRightLeft, CreditCard, MapPinned, Smartphone } from 'lucide-react'

const flows = [
  {
    title: 'Afrique → Afrique',
    icon: MapPinned,
    badge: 'badge-success',
    description:
      'Faites circuler de l’argent entre pays africains avec une couverture lisible et des statuts unifiés.',
    points: [
      'Transferts régionaux',
      'Mobile money local',
      'Pays supportés visibles',
    ],
  },
  {
    title: 'Europe → Afrique',
    icon: CreditCard,
    badge: 'badge-accent',
    description:
      'Recevez depuis l’étranger via Visa, Mastercard ou mobile money selon le marché de destination.',
    points: [
      'Cartes internationales',
      'Mobile money',
      'Encaissement côté Afrique',
    ],
  },
]

export function TransferFlowsSection() {
  return (
    <section className="px-4 py-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-base-200 bg-base-100 px-6 py-8 shadow-xl shadow-base-300/10 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <span className="badge badge-outline gap-2">
                <ArrowRightLeft className="size-3.5" />
                Trajets d’argent
              </span>
              <h2 className="text-3xl font-black leading-[0.98] tracking-tight text-balance sm:text-4xl">
                Deux flux très clairs, pour deux besoins très différents.
              </h2>
              <p className="text-lg leading-8 text-base-content/70">
                L’utilisateur doit comprendre en une phrase qu’il peut envoyer
                de l’argent à l’intérieur de l’Afrique, mais aussi recevoir
                depuis l’Europe vers l’Afrique.
              </p>
            </div>

            <div className="badge badge-success badge-lg">
              Mobile money + cartes
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {flows.map((flow, index) => {
              const Icon = flow.icon
              return (
                <motion.article
                  key={flow.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="card border border-base-200 bg-base-200/40 transition hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="card-body gap-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <span className={`badge ${flow.badge} badge-lg`}>
                          <Icon className="size-4" />
                          {flow.title}
                        </span>
                        <h3 className="text-2xl font-bold">{flow.title}</h3>
                        <p className="max-w-xl leading-7 text-base-content/70">
                          {flow.description}
                        </p>
                      </div>
                      <div className="hidden rounded-2xl bg-base-100 p-3 text-primary lg:block">
                        <Smartphone className="size-6" />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {flow.points.map((point) => (
                        <div
                          key={point}
                          className="rounded-2xl border border-base-300/60 bg-base-100 px-4 py-3 text-sm font-medium text-base-content/75"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
