/**
 * Rôle : page de retour après le checkout Moneroo.
 *        Affiche l'état du paiement à l'utilisateur.
 *
 * Parcours : Moneroo redirige ici après paiement (succès ou échec).
 *   URL reçue : /payment/return?paymentId=<id_interne>
 *   1. On lit le paymentId depuis l'URL.
 *   2. On appelle getPaymentReturnStatus (server function) → lit la base.
 *   3. Si toujours 'pending', synchronizePayment est appelé en secours.
 *   4. On affiche le statut sans jamais faire confiance aux params URL.
 *
 * Échec : si paymentId est absent ou invalide → message d'erreur neutre.
 * Sécurité : le statut affiché vient toujours de la base de données, jamais
 *            des paramètres Moneroo dans l'URL (paymentStatus, etc.).
 *
 * ⚠️  Un paiement confirmé ici signifie que l'encaissement est validé,
 *     PAS que le transfert au destinataire est effectué (hors périmètre).
 */
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { getPaymentReturnStatus } from '#/lib/payments.functions'

export const Route = createFileRoute('/payment/return')({
  /** Pourquoi : extraire uniquement paymentId de l'URL — ignorer paymentStatus de Moneroo. */
  validateSearch: (search: Record<string, unknown>) => ({
    paymentId: typeof search.paymentId === 'string' ? search.paymentId : '',
  }),
  component: PaymentReturnPage,
})

type PageStatus = 'loading' | 'success' | 'failed' | 'cancelled' | 'pending' | 'error'

function PaymentReturnPage() {
  const { paymentId } = Route.useSearch()
  const [pageStatus, setPageStatus] = useState<PageStatus>('loading')

  useEffect(() => {
    if (!paymentId) {
      setPageStatus('error')
      return
    }

    // Appel server function — le statut vient de la base, pas de l'URL.
    getPaymentReturnStatus({ data: { paymentId } })
      .then((result) => {
        const s = result.status as PageStatus
        setPageStatus(['success', 'failed', 'cancelled', 'pending'].includes(s) ? s : 'pending')
      })
      .catch(() => {
        setPageStatus('error')
      })
  }, [paymentId])

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-base-200 bg-base-100 p-8 text-center shadow-xl">
        <StatusIcon status={pageStatus} />
        <h1 className="mt-4 font-display text-2xl font-bold">
          {statusTitle(pageStatus)}
        </h1>
        <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
          {statusMessage(pageStatus)}
        </p>

        {pageStatus !== 'loading' && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/dashboard/transactions"
              className="btn btn-primary rounded-2xl font-bold"
            >
              Voir mes transactions
            </Link>
            {pageStatus !== 'success' && (
              <Link
                to="/dashboard/send"
                className="btn btn-outline rounded-2xl font-bold"
              >
                Réessayer
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

// ─── Helpers d'affichage ────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: PageStatus }) {
  if (status === 'loading') {
    return (
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-base-200">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    )
  }
  if (status === 'success') {
    return (
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle2 className="size-10 text-emerald-500" />
      </div>
    )
  }
  if (status === 'pending') {
    return (
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-500/10">
        <Clock className="size-10 text-amber-500" />
      </div>
    )
  }
  if (status === 'failed' || status === 'cancelled') {
    return (
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-500/10">
        <XCircle className="size-10 text-red-500" />
      </div>
    )
  }
  return (
    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-base-200">
      <AlertCircle className="size-10 text-base-content/50" />
    </div>
  )
}

function statusTitle(status: PageStatus): string {
  switch (status) {
    case 'loading': return 'Vérification en cours…'
    case 'success': return 'Paiement confirmé'
    case 'pending': return 'Paiement en attente'
    case 'failed': return 'Paiement échoué'
    case 'cancelled': return 'Paiement annulé'
    case 'error': return 'Erreur'
  }
}

function statusMessage(status: PageStatus): string {
  switch (status) {
    case 'loading':
      return 'Nous vérifions l\'état de votre paiement auprès de Moneroo…'
    case 'success':
      // Important : ne pas dire "transfert envoyé" — le payout est hors périmètre.
      return 'Votre paiement a été validé par Moneroo. Le transfert au destinataire sera traité séparément.'
    case 'pending':
      return 'Votre paiement est en cours de traitement. Cette page se met à jour automatiquement.'
    case 'failed':
      return 'Le paiement n\'a pas pu être traité. Aucun débit n\'a eu lieu. Vous pouvez réessayer.'
    case 'cancelled':
      return 'Le paiement a été annulé. Aucun débit n\'a eu lieu.'
    case 'error':
      return 'Impossible de retrouver ce paiement. Vérifiez votre historique de transactions.'
  }
}
