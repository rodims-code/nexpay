/**
 * Rôle : page de liste et de détail des transactions /dashboard/transactions.
 * Parcours : lit les transactions depuis la base (getTransactions) OU depuis
 *            les données sandbox si PAYMENTS_ENV === 'sandbox'.
 * Échec : si le chargement échoue, une alerte est affichée. Les données sandbox
 *         sont en dur et ne peuvent pas échouer.
 *
 * En sandbox : les transactions viennent de sandbox-data.ts (données EN DUR).
 *   TODO : retirer sandboxData.transactions et appeler getTransactions() quand
 *          les vrais statuts paiement/payout seront stockés en base.
 */
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

// ─── Table de correspondance statuts → libellé + couleur ────────────────────
// Source unique : modifier ici pour changer l'affichage partout.

interface StatusMeta {
  label: string
  /** Classes Tailwind pour le badge (bg + text). */
  badgeClass: string
  icon: React.ReactNode
}

const STATUS_META: Record<TransactionStatus, StatusMeta> = {
  awaiting_payment: {
    label: 'En attente de paiement',
    badgeClass: 'bg-amber-100 text-amber-700',
    icon: <Clock className="size-3" />,
  },
  paid: {
    label: 'Payé, versement en attente',
    badgeClass: 'bg-blue-100 text-blue-700',
    icon: <Loader2 className="size-3" />,
  },
  payout_pending: {
    label: 'Versement en cours',
    badgeClass: 'bg-indigo-100 text-indigo-700',
    icon: <Loader2 className="size-3" />,
  },
  completed: {
    label: 'Terminé',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    icon: <CheckCircle2 className="size-3" />,
  },
  payout_failed: {
    label: 'Versement échoué',
    badgeClass: 'bg-orange-100 text-orange-700',
    icon: <AlertTriangle className="size-3" />,
  },
  failed: {
    label: 'Paiement échoué',
    badgeClass: 'bg-red-100 text-red-700',
    icon: <XCircle className="size-3" />,
  },
}

/** Table de correspondance pour les statuts bruts de la base de données (legacy). */
const LEGACY_STATUS_CLASS: Record<string, string> = {
  Terminée: 'bg-emerald-100 text-emerald-700',
  'En cours': 'bg-amber-100 text-amber-700',
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TransactionStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={`badge badge-sm gap-1 rounded-full border-0 font-bold ${meta.badgeClass}`}
    >
      {meta.icon}
      {meta.label}
    </span>
  )
}

/** Badge pour les statuts hérités de la base (chaînes libres). */
function LegacyStatusBadge({ status }: { status: string }) {
  const cls = LEGACY_STATUS_CLASS[status] ?? 'bg-base-200 text-base-content/60'
  const icon =
    status === 'Terminée' ? (
      <CheckCircle2 className="size-3" />
    ) : (
      <Clock className="size-3" />
    )
  return (
    <span className={`badge badge-sm gap-1 rounded-full border-0 font-bold ${cls}`}>
      {icon}
      {status}
    </span>
  )
}

/**
 * Suivi en 2 étapes pour une transaction sandbox.
 * Pourquoi : illustrer clairement le flux métier paiement → payout,
 * conformément à la règle "jamais Terminé avant que le payout soit en succès".
 */
function TwoStepTracker({ tx }: { tx: SandboxTransaction }) {
  const paymentDone = tx.paymentStatus === 'success'
  const paymentFailed = tx.paymentStatus === 'failed'
  const payoutDone = tx.payoutStatus === 'success'
  const payoutFailed = tx.payoutStatus === 'failed'
  const payoutPending = tx.payoutStatus === 'pending'

  const stepClass = (done: boolean, failed: boolean, pending: boolean) =>
    done
      ? 'text-emerald-700 bg-emerald-100'
      : failed
        ? 'text-red-700 bg-red-100'
        : pending
          ? 'text-indigo-700 bg-indigo-100'
          : 'text-base-content/40 bg-base-200'

  const stepLabel = (done: boolean, failed: boolean, pending: boolean, neutral: string) =>
    done ? 'Réussi' : failed ? 'Échoué' : pending ? 'En cours' : neutral

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Étape 1 : Paiement */}
      <span
        className={`rounded-lg px-2 py-0.5 font-bold ${stepClass(paymentDone, paymentFailed, false)}`}
      >
        ① Paiement : {stepLabel(paymentDone, paymentFailed, false, 'En attente')}
      </span>

      <span className="text-base-content/30">→</span>

      {/* Étape 2 : Versement — affiché seulement si le paiement a abouti */}
      <span
        className={`rounded-lg px-2 py-0.5 font-bold ${
          tx.payoutStatus
            ? stepClass(payoutDone, payoutFailed, payoutPending)
            : 'text-base-content/30 bg-base-200'
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

/**
 * Panneau détail déplié d'une transaction sandbox.
 * Pourquoi : afficher référence, parties, montants, statuts des deux étapes
 * et le scénario de test correspondant — sans navigation vers une nouvelle page.
 */
function SandboxTxDetail({
  tx,
  scenarioDesc,
}: {
  tx: SandboxTransaction
  scenarioDesc: string
}) {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-50 p-4 space-y-3 text-xs">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Référence</p>
          <p className="font-mono font-bold text-base-content">{tx.reference}</p>
        </div>
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Destinataire</p>
          <p className="font-bold text-base-content">{tx.recipientName}</p>
          <p className="text-base-content/50">{tx.recipientPhone}</p>
        </div>
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Devise</p>
          <p className="font-bold text-base-content">{tx.currency}</p>
        </div>
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Montant</p>
          <p className="font-bold text-base-content">{tx.amount} {tx.currency}</p>
        </div>
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Frais</p>
          <p className="font-bold text-base-content">{tx.fee} {tx.currency}</p>
        </div>
        <div>
          <p className="font-bold text-base-content/50 uppercase tracking-wider">Total</p>
          <p className="font-bold text-primary">{tx.total} {tx.currency}</p>
        </div>
      </div>

      <div className="border-t border-base-200 pt-3 space-y-1.5">
        <p className="font-bold text-base-content/50 uppercase tracking-wider">Suivi des étapes</p>
        <div className="flex flex-wrap gap-2">
          <span className={`rounded-lg px-2 py-0.5 font-bold ${
            tx.paymentStatus === 'success'
              ? 'bg-emerald-100 text-emerald-700'
              : tx.paymentStatus === 'failed'
                ? 'bg-red-100 text-red-700'
                : 'bg-amber-100 text-amber-700'
          }`}>
            ① Paiement : {
              tx.paymentStatus === 'success' ? 'Réussi' :
              tx.paymentStatus === 'failed' ? 'Échoué' : 'En attente'
            }
          </span>
          <span className={`rounded-lg px-2 py-0.5 font-bold ${
            tx.payoutStatus === 'success'
              ? 'bg-emerald-100 text-emerald-700'
              : tx.payoutStatus === 'failed'
                ? 'bg-orange-100 text-orange-700'
                : tx.payoutStatus === 'pending'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-base-200 text-base-content/40'
          }`}>
            ② Versement : {
              tx.payoutStatus === 'success' ? 'Réussi' :
              tx.payoutStatus === 'failed' ? 'Échoué' :
              tx.payoutStatus === 'pending' ? 'En cours' : '—'
            }
          </span>
        </div>
      </div>

      <div className="border-t border-base-200 pt-3">
        <p className="font-bold text-base-content/50 uppercase tracking-wider mb-1">
          Scénario de test #{tx.scenarioId}
        </p>
        <p className="text-base-content/70 italic">{scenarioDesc}</p>
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAmount(val: string | number) {
  const n = typeof val === 'string' ? parseInt(val || '0', 10) : val
  return new Intl.NumberFormat('fr-FR').format(n)
}

function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(
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
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
]

// ─── Composant principal ──────────────────────────────────────────────────────

function TransactionsPage() {
  // Transactions depuis la base (mode live).
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Données sandbox (null si mode live).
  const [sandboxData, setSandboxData] = useState<Awaited<ReturnType<typeof getSandboxData>> | null>(null)
  const isSandbox = sandboxData !== null

  // État déplié / replié des lignes sandbox.
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

  // En sandbox, on affiche les transactions en dur plutôt que celles de la base.
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
    <DashboardLayout title="Transactions">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="input input-bordered flex flex-1 max-w-sm items-center gap-2 rounded-2xl">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              placeholder="Rechercher une transaction…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow bg-transparent outline-none text-sm"
            />
          </label>
          <button
            className="btn btn-outline rounded-2xl gap-2 font-bold"
            disabled={totalCount === 0}
          >
            <Download className="size-4" />
            Exporter
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error rounded-2xl text-sm font-semibold text-white">
            <XCircle className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading skeleton (mode live uniquement) */}
        {!isSandbox && loading ? (
          <div className="overflow-x-auto rounded-[1.75rem] border border-base-200 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Destinataire</th>
                  <th>Référence</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="size-9 animate-pulse rounded-xl bg-base-200" />
                        <div className="h-4 w-24 animate-pulse rounded bg-base-200" />
                      </div>
                    </td>
                    <td>
                      <div className="h-3 w-20 animate-pulse rounded bg-base-200" />
                    </td>
                    <td>
                      <div className="h-3 w-28 animate-pulse rounded bg-base-200" />
                    </td>
                    <td>
                      <div className="h-4 w-20 animate-pulse rounded bg-base-200" />
                    </td>
                    <td>
                      <div className="h-5 w-16 animate-pulse rounded-full bg-base-200" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-base-300 bg-base-100 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <ReceiptText className="size-8" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-base-content">
                Aucune transaction
              </h3>
              <p className="mt-1 text-sm text-base-content/55">
                Vous n'avez encore effectué aucun transfert.
              </p>
            </div>
            <Link to="/dashboard/send" className="btn btn-primary rounded-2xl gap-2 font-bold">
              <ArrowUpRight className="size-4" />
              Faire un premier envoi
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[2rem] border border-base-200 bg-base-100 py-12 text-center text-sm text-base-content/55">
            Aucun résultat pour «&nbsp;<strong>{search}</strong>&nbsp;»
          </div>
        ) : isSandbox ? (
          /* ── Tableau sandbox avec suivi 2 étapes et panneau détail ── */
          <div className="rounded-[1.75rem] border border-base-200 bg-base-100 overflow-hidden">
            <table className="table">
              <thead>
                <tr>
                  <th>Destinataire</th>
                  <th>Référence</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Statut global</th>
                  <th>Étapes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {(filteredSandbox as SandboxTransaction[]).map((tx, idx) => {
                  const isExpanded = expandedId === tx.id
                  const scenario = sandboxData!.scenarios.find((s) => s.id === tx.scenarioId)
                  return (
                    <Fragment key={tx.id}>
                      <tr className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                            >
                              {getInitials(tx.recipientName)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-base-content truncate max-w-[120px]">
                                {tx.recipientName}
                              </p>
                              <p className="text-[11px] text-base-content/50">{tx.recipientPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="font-mono text-xs text-base-content/50">{tx.reference}</td>
                        <td className="text-sm text-base-content/60 whitespace-nowrap">
                          {formatDate(tx.createdAt)}
                        </td>
                        <td>
                          <div>
                            <p className="font-bold text-sm text-base-content">
                              {formatAmount(tx.amount)} {tx.currency}
                            </p>
                            <p className="text-[11px] text-base-content/50">via Moneroo</p>
                          </div>
                        </td>
                        <td>
                          <StatusBadge status={tx.status} />
                        </td>
                        <td>
                          <TwoStepTracker tx={tx} />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                            className="btn btn-ghost btn-xs rounded-xl"
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
                          <td colSpan={7} className="bg-base-50 px-4 py-3">
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
        ) : (
          /* ── Tableau mode live (inchangé) ── */
          <div className="overflow-x-auto rounded-[1.75rem] border border-base-200 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Destinataire</th>
                  <th>Référence</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {(filteredLive as Transaction[]).map((tx, idx) => (
                  <tr key={tx.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                        >
                          {getInitials(tx.recipientName)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-base-content truncate max-w-[120px]">
                            {tx.recipientName}
                          </p>
                          <p className="text-[11px] text-base-content/50">{tx.recipientPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-base-content/50">{tx.reference}</td>
                    <td className="text-sm text-base-content/60 whitespace-nowrap">
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

        {/* Count */}
        {!loading && totalCount > 0 && (
          <p className="text-xs text-base-content/40 text-right">
            {filtered.length} / {totalCount} transaction{totalCount > 1 ? 's' : ''}
            {isSandbox && ' · données sandbox'}
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
