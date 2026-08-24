import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, CreditCard, Globe2, LockKeyhole, Smartphone, Sparkles } from 'lucide-react'

const trustPoints = ['Afrique → Afrique', 'Europe → Afrique', 'Frais visibles', 'Suivi du statut']

export function HeroSection() {
  return (
    <section id="hero" className="hero min-h-[92vh] pt-24"><div className="hero-content grid max-w-7xl items-center gap-14 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="space-y-8">
        <div className="flex flex-wrap items-center gap-3"><span className="badge badge-outline badge-lg gap-2"><Sparkles className="size-3.5" />Paiements africains, simplifiés</span><span className="badge badge-warning badge-lg">MVP en développement</span></div>
        <div className="space-y-5"><h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-balance text-base-content sm:text-6xl lg:text-7xl">Envoyez de l’argent en Afrique, depuis l’Afrique ou l’Europe.</h1><p className="max-w-2xl text-lg leading-8 text-base-content/70 sm:text-xl">NexPay vous permet d’envoyer de l’argent d’un pays africain à un autre, ou depuis l’Europe vers l’Afrique avec Visa, Mastercard et les moyens de paiement disponibles.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><Link to="/auth/register" className="btn btn-primary btn-lg">Commencer un transfert<ArrowRight className="size-4" /></Link><a href="#how-it-works" className="btn btn-outline btn-lg">Voir comment ça marche</a></div>
        <div className="grid gap-3 sm:grid-cols-2">{trustPoints.map((point) => <div key={point} className="flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100/70 px-4 py-3 shadow-sm"><CheckCircle2 className="size-4 shrink-0 text-success" /><span className="text-sm font-medium text-base-content/70">{point}</span></div>)}</div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 26, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }} className="relative">
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/10 blur-3xl" />
        <div className="card relative overflow-hidden border border-base-200 bg-base-100/95 shadow-2xl shadow-base-300/20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_40%)]" /><div className="card-body relative p-6 sm:p-8">
          <div className="flex items-center justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/45">NexPay</p><h2 className="mt-1 text-2xl font-bold">Nouveau transfert</h2></div><span className="badge badge-success badge-outline gap-2"><LockKeyhole className="size-3.5" />Sécurisé</span></div>
          <div className="mt-6 rounded-[1.75rem] border border-base-200 bg-base-200/45 p-5"><div className="flex items-center justify-between"><div><div className="text-sm text-base-content/55">Destinataire</div><div className="mt-1 text-xl font-bold">Paul · Sénégal</div><div className="text-sm text-base-content/55">+221 XX XXX XX XX</div></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Globe2 className="size-5" /></div></div><div className="divider my-3" /><div className="grid gap-3 sm:grid-cols-2"><div><div className="text-sm text-base-content/55">Montant envoyé</div><div className="text-2xl font-black">10 000 XAF</div></div><div><div className="text-sm text-base-content/55">Frais + conversion</div><div className="text-lg font-bold text-primary">Visibles avant paiement</div></div></div></div>
          <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-base-200 bg-base-100 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><Smartphone className="size-4 text-success" />Afrique → Afrique</div><p className="mt-2 text-sm leading-6 text-base-content/60">Mobile Money selon le pays et la couverture.</p></div><div className="rounded-2xl border border-base-200 bg-base-100 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><CreditCard className="size-4 text-accent" />Europe → Afrique</div><p className="mt-2 text-sm leading-6 text-base-content/60">Visa, Mastercard ou méthode disponible.</p></div></div>
          <div className="flex items-center gap-2 rounded-2xl bg-success/10 px-4 py-3 text-sm font-medium text-success"><CheckCircle2 className="size-4" />Résumé clair avant confirmation par PIN</div>
        </div></div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.45 }} className="card absolute -bottom-6 -left-4 hidden border border-base-200 bg-base-100/95 shadow-xl backdrop-blur md:block"><div className="card-body p-4"><div className="text-xs uppercase tracking-[0.24em] text-base-content/45">Statut</div><div className="mt-1 flex items-center gap-2 text-lg font-bold"><span className="badge badge-warning badge-xs" />En attente de confirmation</div></div></motion.div>
      </motion.div>
    </div></section>
  )
}
