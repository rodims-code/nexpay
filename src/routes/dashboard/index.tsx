import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  ChevronRight,
  Plus,
  Send,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import {
  DashboardLayout,
  SectionTitle,
} from '#/components/dashboard/dashboard-layout'
import { demoTransactions } from '#/components/dashboard/dashboard-data'
import { useSession } from '#/lib/auth-client'


export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session } = useSession()
  const userName =
    (session?.user as any)?.firstName ||
    session?.user?.name?.split(' ')[0] ||
    ''
  const greetingTitle = userName ? `Bonjour, ${userName}` : 'Bienvenue sur NexPay'

  const today = new Date()
  const rawDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today)
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1)

  return (
    <DashboardLayout title={greetingTitle} eyebrow={formattedDate}>
      <div className="space-y-7">
        <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-primary-content shadow-xl shadow-primary/20 sm:p-8">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider opacity-80">
                    Solde de stockage
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-sm">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Passerelle directe
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold sm:text-4xl">
                    Non disponible
                  </span>
                </div>
                <p className="mt-2.5 text-xs font-medium leading-relaxed text-primary-content/85 sm:text-sm">
                  NexPay opère comme une passerelle directe sans rétention de fonds. Vos transferts transitent instantanément d’un compte à un autre sans stockage intermédiaire.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold opacity-90">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Zéro rétention de dépôts · Pont sécurisé en direct</span>
              </div>
            </div>
            <div className="absolute -right-8 -top-12 size-48 rounded-full border-[24px] border-white/10" />
            <div className="absolute -bottom-20 right-20 size-56 rounded-full border-[32px] border-white/10" />
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] border border-base-200 bg-base-200/50 p-6 sm:p-8">
            <div>
              <p className="text-sm font-bold text-base-content/55">
                Votre prochaine action
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Envoyer de l’argent
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-base-content/55">
                Transférez de l’argent à vos proches en quelques secondes.
              </p>
            </div>
            <Link
              to="/dashboard/send"
              className="btn btn-secondary mt-6 w-full rounded-2xl sm:w-fit"
            >
              Commencer un envoi <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="stat rounded-3xl border border-base-200 bg-base-100 p-5">
            <div className="stat-figure text-primary">
              <Send className="size-5" />
            </div>
            <div className="stat-title text-xs font-bold">Envoyé ce mois</div>
            <div className="stat-value font-display text-2xl">
              85 500 <small className="text-xs">XAF</small>
            </div>
            <div className="stat-desc">12 transactions</div>
          </div>
          <div className="stat rounded-3xl border border-base-200 bg-base-100 p-5">
            <div className="stat-figure text-secondary">
              <WalletCards className="size-5" />
            </div>
            <div className="stat-title text-xs font-bold">Reçu ce mois</div>
            <div className="stat-value font-display text-2xl">
              40 000 <small className="text-xs">XAF</small>
            </div>
            <div className="stat-desc">3 transactions</div>
          </div>
          <div className="stat rounded-3xl border border-base-200 bg-base-100 p-5">
            <div className="stat-figure text-accent">
              <TrendingUp className="size-5" />
            </div>
            <div className="stat-title text-xs font-bold">Taux de réussite</div>
            <div className="stat-value font-display text-2xl">98,4%</div>
            <div className="stat-desc">Sur vos transferts</div>
          </div>
        </div>
        <section>
          <SectionTitle
            action={
              <Link
                to="/dashboard/transactions"
                className="btn btn-ghost btn-sm rounded-full text-primary"
              >
                Voir tout <ChevronRight className="size-4" />
              </Link>
            }
          >
            Transactions récentes
          </SectionTitle>
          <div className="overflow-hidden rounded-[1.75rem] border border-base-200 bg-base-100">
            {demoTransactions.slice(0, 3).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-3 border-b border-base-200 p-4 last:border-0 sm:p-5"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-2xl text-xs font-extrabold ${transaction.tone}`}
                >
                  {transaction.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-base-content/45">
                    {transaction.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold">{transaction.amount}</p>
                  <span
                    className={`text-[10px] font-extrabold uppercase ${transaction.tone.split(' ')[1]}`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/send" className="btn btn-primary rounded-2xl">
            <Plus className="size-4" /> Nouvel envoi
          </Link>
          <Link
            to="/dashboard/payment-methods"
            className="btn btn-outline rounded-2xl"
          >
            <WalletCards className="size-4" /> Ajouter un moyen
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
