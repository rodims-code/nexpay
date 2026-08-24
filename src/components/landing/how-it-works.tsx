import { motion } from 'framer-motion'
import { CheckCircle2, ClipboardList, LockKeyhole, Send } from 'lucide-react'

const steps = [
  { number: '01', title: 'Choisissez un destinataire', description: 'Utilisez un numéro de téléphone, un contact enregistré ou un favori NexPay.', tag: 'Simple', icon: ClipboardList },
  { number: '02', title: 'Voyez le vrai coût', description: 'Saisissez le montant et consultez les frais, le taux de change et le montant reçu avant de confirmer.', tag: 'Transparent', icon: Send },
  { number: '03', title: 'Confirmez et suivez', description: 'Autorisez avec votre PIN, puis suivez chaque étape : en attente, en cours, réussi ou échoué.', tag: 'Traçable', icon: LockKeyhole },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-neutral px-4 py-24 text-neutral-content lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="badge badge-outline border-neutral-content/20 text-neutral-content/80">Comment ça marche ?</span>
          <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.96] tracking-tight text-balance sm:text-5xl lg:text-6xl">Envoyer de l’argent devrait être aussi simple qu’envoyer un message.</h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-neutral-content/70">NexPay masque la complexité des providers et garde chaque information importante visible avant et après le paiement.</p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" /><p className="text-sm leading-6 text-neutral-content/75">Le MVP est conçu pour les environnements de développement, de test et de sandbox avant un lancement réglementaire.</p></div>
          </div>
        </div>
        <div className="grid gap-5">
          {steps.map((step, index) => { const Icon = step.icon; return (
            <motion.article key={step.number} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="card border border-white/10 bg-base-100/5 text-neutral-content shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20">
              <div className="card-body gap-5 p-6 sm:p-8"><div className="flex items-start justify-between gap-6"><div className="space-y-3"><div className="flex items-center gap-3"><span className="text-5xl font-black text-white/10">{step.number}</span><span className="badge badge-success badge-outline">{step.tag}</span></div><h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3><p className="max-w-2xl text-base leading-7 text-neutral-content/70">{step.description}</p></div><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white"><Icon className="size-6" /></div></div></div>
            </motion.article>
          )})}
        </div>
      </div>
    </section>
  )
}
