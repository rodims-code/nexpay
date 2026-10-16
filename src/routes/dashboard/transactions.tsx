import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Search,
  ReceiptText,
  XCircle,
  AlertTriangle,
  Loader2,
  FlaskConical,
  ArrowRight,
} from 'lucide-react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { getTransactions } from '#/lib/transactions.functions'
import { getSandboxData } from '#/lib/payments.functions'
import type { Transaction } from '#/db/schema'
import type { SandboxTransaction, TransactionStatus } from '#/server/payments/sandbox-data'

export const Route = createFileRoute('/dashboard/transactions')({
  component: TransactionsPage,
})

// ─── Table de correspondance statuts → libellé + badge DaisyUI ─────────────
interface StatusMeta {
  label: string
  badgeClass: string
  icon: React.ReactNode
}

const STATUS_META: Record<TransactionStatus, StatusMeta> = {
  awaiting_payment: {
    label: 'En attente de paiement',
    badgeClass: 'badge-warning',
    icon: <Clock className="size-3 shrink-0" />,
  },
  paid: {
    label: 'Payé, versement en attente',
    badgeClass: 'badge-info',
    icon: <Loader2 className="size-3 shrink-0 animate-spin" />,
  },
  payout_pending: {
    label: 'Versement en cours',
    badgeClass: 'badge-primary',
    icon: <Loader2 className="size-3 shrink-0 animate-spin" />,
  },
  completed: {
    label: 'Terminé',
    badgeClass: 'badge-success',
    icon: <CheckCircle2 className="size-3 shrink-0" />,
  },
  payout_failed: {
    label: 'Versement échoué',
    badgeClass: 'badge-error',
    icon: <AlertTriangle className="size-3 shrink-0" />,
  },
  failed: {
    label: 'Paiement échoué',
    badgeClass: 'badge-error',
    icon: <XCircle className="size-3 shrink-0" />,
  },
}

const LEGACY_STATUS_CLASS: Record<string, string> = {
  Terminée: 'badge-success',
  'En cours': 'badge-warning',
}

// ─── Badges et Suivi ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TransactionStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={`badge badge-sm inline-flex items-center gap-1.5 rounded-full font-bold ${meta.badgeClass}`}
    >
      {meta.icon}
      <span>{meta.label}</span>
    </span>
  )
}

function LegacyStatusBadge({ status }: { status: string }) {
  const cls = LEGACY_STATUS_CLASS[status] ?? 'badge-ghost'
  const icon =
    status === 'Terminée' ? (
      <CheckCircle2 className="size-3" />
    ) : (
      <Clock className="size-3" />
    )
  return (
    <span className={`badge badge-sm inline-flex items-center gap-1.5 rounded-full font-bold ${cls}`}>
      {icon}
      <span>{status}</span>
    </span>
  )
}

function TwoStepTracker({ tx }: { tx: SandboxTransaction }) {
  const paymentDone = tx.paymentStatus === 'success'
  const paymentFailed = tx.paymentStatus === 'failed'
  const payoutDone = tx.payoutStatus === 'success'
  const payoutFailed = tx.payoutStatus === 'failed'
  const payoutPending = tx.payoutStatus === 'pending'

  const stepBadgeClass = (done: boolean, failed: boolean, pending: boolean) =>
    done
      ? 'badge-success'
      : failed
        ? 'badge-error'
        : pending
          ? 'badge-primary'
          : 'badge-ghost opacity-60'

  const stepLabel = (done: boolean, failed: boolean, pending: boolean, neutral: string) => {
    if (done) return 'Réussi'
    if (failed) return 'Échoué'
    if (pending) {
      return (
        <span className="inline-flex items-center gap-1">
          <Loader2 className="size-2.5 animate-spin shrink-0" />
          <span>En cours</span>
        </span>
      )
    }
    return neutral
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span
        className={`badge badge-sm font-bold whitespace-nowrap ${stepBadgeClass(paymentDone, paymentFailed, false)}`}
      >
        ① Payé : {stepLabel(paymentDone, paymentFailed, false, 'En attente')}
      </span>

      <span className="text-base-content/40 text-xs">→</span>

      <span
        className={`badge badge-sm font-bold whitespace-nowrap inline-flex items-center gap-1 ${
          tx.payoutStatus
            ? stepBadgeClass(payoutDone, payoutFailed, payoutPending)
            : 'badge-ghost opacity-50'
        }`}
      >
        ② Versement :{' '}
        {tx.payoutStatus
          ? stepLabel(payoutDone, payoutFailed, payoutPending, 'En attente')
          : '—'}
      </span>
    </div>
  )
}

function SandboxTxDetail({
  tx,
  scenarioDesc,
}: {
  tx: SandboxTransaction
  scenarioDesc: string
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4 space-y-3.5 text-xs text-base-content">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Référence</p>
          <p className="font-mono font-bold text-base-content break-all">{tx.reference}</p>
        </div>
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Bénéficiaire</p>
          <p className="font-bold text-base-content truncate">{tx.recipientName}</p>
          <p className="text-[11px] text-base-content/60 font-mono">{tx.recipientPhone}</p>
        </div>
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Devise</p>
          <p className="font-bold text-base-content">{tx.currency}</p>
        </div>
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Montant net</p>
          <p className="font-bold text-base-content">{tx.amount} {tx.currency}</p>
        </div>
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Frais passerelle</p>
          <p className="font-bold text-base-content">{tx.fee} {tx.currency}</p>
        </div>
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Total débité</p>
          <p className="font-bold text-primary text-sm">{tx.total} {tx.currency}</p>
        </div>
      </div>

      <div className="border-t border-base-300 pt-3 space-y-1.5">
        <p className="font-extrabold text-[10px] uppercase tracking-wider text-base-content/50">Statut détaillé par étape</p>
        <div className="flex flex-wrap gap-2">
          <span className={`badge badge-sm font-bold py-3 px-3 gap-1.5 ${
            tx.paymentStatus === 'success'
              ? 'badge-success'
              : tx.paymentStatus === 'failed'
                ? 'badge-error'
                : 'badge-warning'
          }`}>
            ① Encaissement : {
              tx.paymentStatus === 'success' ? 'Réussi (carte/mobile accepté)' :
              tx.paymentStatus === 'failed' ? 'Échoué' : 'En attente'
            }
          </span>
          <span className={`badge badge-sm font-bold py-3 px-3 gap-1.5 ${
            tx.payoutStatus === 'success'
              ? 'badge-success'
              : tx.payoutStatus === 'failed'
                ? 'badge-error'
                : tx.payoutStatus === 'pending'
                  ? 'badge-primary'
                  : 'badge-ghost opacity-60'
          }`}>
            ② Versement bénéficiaire : {
              tx.payoutStatus === 'success' ? 'Réussi (fonds transférés)' :
              tx.payoutStatus === 'failed' ? 'Échec du virement' :
              tx.payoutStatus === 'pending' ? (
                <span className="inline-flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin shrink-0" />
                  <span>Traitement en cours</span>
                </span>
              ) : 'Non déclenché'
            }
          </span>
        </div>
      </div>

      <div className="border-t border-base-300 pt-3">
        <div className="flex items-center gap-1.5 mb-1 text-warning">
          <FlaskConical className="size-3.5" />
          <p className="font-extrabold text-[10px] uppercase tracking-wider">
            Scénario de test sandbox #{tx.scenarioId}
          </p>
        </div>
        <p className="text-base-content/80 italic leading-relaxed">{scenarioDesc}</p>
      </div>
    </div>
  )
}

function formatAmount(val: string | number) {
  const n = typeof val === 'string' ? parseInt(val || '0', 10) : val
  return new Intl.NumberFormat('fr-FR').format(n)
}

function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(
    new Date(d),
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_COLORS = [
  'bg-primary/20 text-primary',
  'bg-secondary/20 text-secondary',
  'bg-accent/20 text-accent',
  'bg-info/20 text-info',
  'bg-success/20 text-success',
  'bg-neutral text-neutral-content',
]

// ─── Composant principal ──────────────────────────────────────────────────────

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [sandboxData, setSandboxData] = useState<Awaited<ReturnType<typeof getSandboxData>> | null>(null)
  const isSandbox = sandboxData !== null

  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    getSandboxData().then(setSandboxData).catch(() => {})
  }, [])

  useEffect(() => {
    // TODO : retirer cet appel getTransactions() quand les données sandbox
    //        viennent de cette page (isSandbox). Pour l'instant on charge
    //        quand même pour ne pas casser le mode live.
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  // En sandbox, on affiche les transactions de simulation en dur.
  // TODO : brancher la base quand les vrais statuts paiement/payout seront stockés.
  const sandboxTxs = sandboxData?.transactions ?? []

  const filteredSandbox = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return sandboxTxs
    return sandboxTxs.filter(
      (tx) =>
        tx.recipientName.toLowerCase().includes(q) ||
        tx.recipientPhone.includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        STATUS_META[tx.status].label.toLowerCase().includes(q),
    )
  }, [sandboxTxs, search])

  const filteredLive = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return transactions
    return transactions.filter(
      (tx) =>
        tx.recipientName.toLowerCase().includes(q) ||
        tx.recipientPhone.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        tx.status.toLowerCase().includes(q),
    )
  }, [transactions, search])

  const filtered = isSandbox ? filteredSandbox : filteredLive
  const totalCount = isSandbox ? sandboxTxs.length : transactions.length
  const isEmpty = isSandbox ? sandboxTxs.length === 0 : transactions.length === 0

  return (
    <DashboardLayout title="Transactions" eyebrow="Historique des transferts">
      <div className="space-y-4 sm:space-y-6">

        {/* ── Bandeau Information Mode Simulation / Sandbox (100% DaisyUI alert-warning) ── */}
        {isSandbox && (
          <div className="alert alert-warning shadow-sm rounded-2xl p-3.5 sm:p-4">
            <FlaskConical className="size-5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-xs sm:text-sm">
                  Mode Simulation · Données de test
                </h3>
                <span className="badge badge-sm badge-neutral font-extrabold text-[10px]">
                  Sandbox actif
                </span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed opacity-90">
                Ces transactions sont des exemples simulés illustrant les cas d'usage réels Moneroo (succès, échec de versement, attente). Aucun fonds réel n'est engagé.
              </p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="input input-bordered input-sm sm:input-md flex flex-1 max-w-sm items-center gap-2 rounded-xl sm:rounded-2xl bg-base-100">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              placeholder="Rechercher (nom, tél, référence)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow bg-transparent outline-none text-xs sm:text-sm"
            />
          </label>
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-[11px] font-semibold text-base-content/50 sm:hidden">
              {filtered.length} élément{filtered.length > 1 ? 's' : ''}
            </span>
            <button
              className="btn btn-outline btn-sm rounded-xl gap-2 font-bold"
              disabled={totalCount === 0}
            >
              <Download className="size-3.5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error rounded-2xl text-xs sm:text-sm font-semibold text-error-content">
            <XCircle className="size-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Skeleton loading (live) */}
        {!isSandbox && loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl border border-base-300 bg-base-200" />
            ))}
          </div>
        ) : isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-base-300 bg-base-100 py-12 sm:py-16 text-center px-4">
            <div className="flex size-14 sm:size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <ReceiptText className="size-7 sm:size-8" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-base-content">
                Aucune transaction
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-base-content/55">
                Vous n'avez encore effectué aucun transfert.
              </p>
            </div>
            <Link to="/dashboard/send" className="btn btn-primary btn-sm sm:btn-md rounded-2xl gap-2 font-bold">
              <ArrowUpRight className="size-4" />
              Faire un premier envoi
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 py-10 text-center text-xs sm:text-sm text-base-content/55">
            Aucun résultat pour «&nbsp;<strong>{search}</strong>&nbsp;»
          </div>
        ) : isSandbox ? (
          /* ── Affichage Sandbox : Cartes mobiles + Tableau Desktop ── */
          <div className="space-y-3">

            {/* VUE MOBILE (visible < lg) : Cartes tactiles et complètes */}
            <div className="grid gap-3 lg:hidden">
              {(filteredSandbox as SandboxTransaction[]).map((tx, idx) => {
                const isExpanded = expandedId === tx.id
                const scenario = sandboxData!.scenarios.find((s) => s.id === tx.scenarioId)

                return (
                  <div
                    key={tx.id}
                    className="card bg-base-100 border border-base-300 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                        >
                          {getInitials(tx.recipientName)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-base-content truncate">
                            {tx.recipientName}
                          </p>
                          <p className="text-[11px] text-base-content/60 font-mono">
                            {tx.recipientPhone}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-display text-base font-extrabold text-base-content">
                          {formatAmount(tx.amount)} {tx.currency}
                        </p>
                        <p className="text-[10px] text-base-content/50">
                          {formatDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-base-200 pt-2.5">
                      <StatusBadge status={tx.status} />
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                        className="btn btn-ghost btn-xs gap-1 rounded-xl text-primary font-bold px-2"
                      >
                        <span>{isExpanded ? 'Masquer détails' : 'Détails & Scénario'}</span>
                        {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </button>
                    </div>

                    {/* Étapes résumées toujours visibles sur mobile */}
                    <div className="mt-2.5 pt-2 border-t border-dashed border-base-200">
                      <TwoStepTracker tx={tx} />
                    </div>

                    {/* Section repliable détaillée */}
                    {isExpanded && (
                      <div className="mt-3">
                        <SandboxTxDetail
                          tx={tx}
                          scenarioDesc={scenario?.description ?? '—'}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* VUE DESKTOP (visible >= lg) : Grand Tableau avec scroll horizontal sécurisé */}
            <div className="hidden lg:block overflow-x-auto rounded-[1.75rem] border border-base-300 bg-base-100 shadow-sm">
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-base-300 text-xs text-base-content/70">
                    <th>Destinataire</th>
                    <th>Référence</th>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Statut global</th>
                    <th>Étapes métier</th>
                    <th className="text-right">Détail</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredSandbox as SandboxTransaction[]).map((tx, idx) => {
                    const isExpanded = expandedId === tx.id
                    const scenario = sandboxData!.scenarios.find((s) => s.id === tx.scenarioId)
                    return (
                      <Fragment key={tx.id}>
                        <tr className="hover border-b border-base-200">
                          <td>
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                              >
                                {getInitials(tx.recipientName)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-sm text-base-content truncate max-w-[130px]">
                                  {tx.recipientName}
                                </p>
                                <p className="text-[11px] text-base-content/60 font-mono">{tx.recipientPhone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="font-mono text-xs text-base-content/60 whitespace-nowrap">{tx.reference}</td>
                          <td className="text-xs text-base-content/70 whitespace-nowrap">
                            {formatDate(tx.createdAt)}
                          </td>
                          <td>
                            <div className="whitespace-nowrap">
                              <p className="font-bold text-sm text-base-content">
                                {formatAmount(tx.amount)} {tx.currency}
                              </p>
                              <p className="text-[10px] text-base-content/50">via Moneroo (démo)</p>
                            </div>
                          </td>
                          <td>
                            <StatusBadge status={tx.status} />
                          </td>
                          <td>
                            <TwoStepTracker tx={tx} />
                          </td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                              className="btn btn-ghost btn-sm btn-square rounded-xl"
                              aria-label={isExpanded ? 'Replier' : 'Voir le détail'}
                            >
                              {isExpanded ? (
                                <ChevronUp className="size-4" />
                              ) : (
                                <ChevronDown className="size-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={7} className="bg-base-200/40 p-4">
                              <SandboxTxDetail
                                tx={tx}
                                scenarioDesc={scenario?.description ?? '—'}
                              />
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* ── Tableau mode live (adapté mobile/desktop) ── */
          <div className="overflow-x-auto rounded-[1.75rem] border border-base-300 bg-base-100 shadow-sm">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-base-300 text-xs text-base-content/70">
                  <th>Destinataire</th>
                  <th>Référence</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {(filteredLive as Transaction[]).map((tx, idx) => (
                  <tr key={tx.id} className="hover border-b border-base-200">
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                        >
                          {getInitials(tx.recipientName)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-base-content truncate max-w-[130px]">
                            {tx.recipientName}
                          </p>
                          <p className="text-[11px] text-base-content/60 font-mono">{tx.recipientPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-base-content/60 whitespace-nowrap">{tx.reference}</td>
                    <td className="text-xs text-base-content/70 whitespace-nowrap">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td>
                      <div>
                        <p className="font-bold text-sm text-base-content">
                          {formatAmount(tx.amount)} {tx.currency}
                        </p>
                        <p className="text-[11px] text-base-content/50">
                          via {tx.paymentMethodBadge}
                        </p>
                      </div>
                    </td>
                    <td>
                      <LegacyStatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pied de page avec décompte */}
        {!loading && totalCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-base-content/50">
            {isSandbox && (
              <span className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                <FlaskConical className="size-3.5" />
                Mode Bac à sable (Sandbox) — Données non réelles
              </span>
            )}
            <p className="sm:ml-auto">
              {filtered.length} sur {totalCount} transaction{totalCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

