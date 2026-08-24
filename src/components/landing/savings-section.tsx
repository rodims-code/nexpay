import { motion } from 'framer-motion'
import { BadgeCheck, Banknote, ReceiptText, ShieldCheck } from 'lucide-react'

const capabilities = [
  { title: 'Méthodes adaptées au marché', value: 'Mobile Money, Visa, Mastercard', copy: 'Les moyens disponibles dépendent du pays, de la devise et du provider connecté.', icon: Banknote },
  { title: 'Une confirmation sans surprise', value: 'Frais + taux visibles', copy: 'Le montant envoyé, le coût total et le montant reçu sont présentés avant validation.', icon: ReceiptText },
  { title: 'Une transaction autorisée', value: 'PIN séparé', copy: 'Être connecté ne suffit pas à autoriser un paiement : le PIN protège la transaction.', icon: ShieldCheck },
]

export function SavingsSection() {
  return (
    <section id="savings" className="px-4 py-24 lg:px-8"><div className="mx-auto max-w-7xl">
      <div className="max-w-3xl space-y-4"><span className="badge badge-outline gap-2">Ce que le MVP rend possible</span><h2 className="text-4xl font-black leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl">Moins de devinettes. Plus de clarté à chaque transfert.</h2><p className="text-lg leading-8 text-base-content/70">NexPay ne promet pas une couverture identique partout. Il indique les options réellement disponibles pour chaque trajet et chaque méthode de paiement.</p></div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">{capabilities.map((item, index) => { const Icon = item.icon; return (
        <motion.article key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.08 }} className="card border border-base-200 bg-base-100 shadow-lg shadow-base-300/10 transition hover:-translate-y-1"><div className="card-body gap-4 p-6"><div className="flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></div><span className="badge badge-success badge-outline">MVP</span></div><h3 className="text-xl font-bold">{item.title}</h3><div className="text-lg font-black text-primary">{item.value}</div><p className="leading-7 text-base-content/65">{item.copy}</p><div className="flex items-center gap-2 text-sm text-base-content/55"><BadgeCheck className="size-4 text-success" />Information affichée avant confirmation</div></div></motion.article>
      )})}</div>
    </div></section>
  )
}
