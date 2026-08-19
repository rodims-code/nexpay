import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export function ImpactBanner() {
  return (
    <section className="px-4 py-10 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl rounded-[2rem] border border-base-200 bg-base-100 px-6 py-14 shadow-xl shadow-base-300/10 lg:px-12"
      >
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-4">
            <span className="badge badge-outline gap-2">
              <Sparkles className="size-3.5" />
              Mission produit
            </span>
            <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-7xl">
              Nous simplifions la complexité des paiements pour que votre
              croissance voyage plus vite que vos frictions.
            </h2>
          </div>

          <a href="#africa-map" className="btn btn-ghost btn-lg">
            Explorer la couverture
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
