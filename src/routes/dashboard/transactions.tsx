import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  Search,
  ReceiptText,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { getTransactions } from '#/lib/transactions.functions'
import type { Transaction } from '#/db/schema'

export const Route = createFileRoute('/dashboard/transactions')({
  component: TransactionsPage,
})

function formatAmount(val: string) {
  const n = parseInt(val || '0', 10)
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

function StatusBadge({ status }: { status: string }) {
  if (status === 'Terminée')
    return (
      <span className="badge badge-sm gap-1 rounded-full border-0 bg-emerald-100 font-bold text-emerald-700">
        <CheckCircle2 className="size-3" />
        {status}
      </span>
    )
  if (status === 'En cours')
    return (
      <span className="badge badge-sm gap-1 rounded-full border-0 bg-amber-100 font-bold text-amber-700">
        <Clock className="size-3" />
        {status}
      </span>
    )
  return (
    <span className="badge badge-sm gap-1 rounded-full border-0 bg-red-100 font-bold text-red-700">
      <XCircle className="size-3" />
      {status}
    </span>
  )
}

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
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
            disabled={transactions.length === 0}
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

        {/* Loading skeleton */}
        {loading ? (
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
        ) : transactions.length === 0 ? (
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
        ) : (
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
                {filtered.map((tx, idx) => (
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
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Count */}
        {!loading && transactions.length > 0 && (
          <p className="text-xs text-base-content/40 text-right">
            {filtered.length} / {transactions.length} transaction{transactions.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
