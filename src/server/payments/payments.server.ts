/**
 * Rôle : logique métier serveur pour les paiements.
 * Ce module s'exécute STRICTEMENT côté serveur.
 * Il ne doit JAMAIS être importé dans le bundle client.
 */
import '@tanstack/react-start/server-only'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { and, eq } from 'drizzle-orm'
import { db } from '#/db'
import { paymentTransaction, transaction } from '#/db/schema'
import { auth } from '#/lib/auth'
import { calculatePaymentTotal, paymentConfig, validatePaymentAmount } from './config.ts'
import { getProvider } from './registry.ts'

// ─── Helper d'authentification ─────────────────────────────────────────────────

export async function requireAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  if (!session?.user) {
    throw new Error('Utilisateur non authentifié')
  }
  return session.user
}

// ─── Synchronisation du statut via Moneroo ─────────────────────────────────────

export async function synchronizePayment(
  payment: typeof paymentTransaction.$inferSelect,
) {
  // Si pas de référence fournisseur, on ne peut pas vérifier.
  if (!payment.providerReference) return payment

  const verified = await getProvider('moneroo').verifyPayment(payment.providerReference)

  let finalStatus = verified.status
  if (
    verified.status === 'success' &&
    (verified.amount !== payment.amount ||
      verified.currency.toUpperCase() !== payment.currency.toUpperCase())
  ) {
    console.error(
      `[payment] Montant/devise Moneroo (${verified.amount} ${verified.currency}) ` +
        `≠ base (${payment.amount} ${payment.currency}) — paymentId: ${payment.id}`,
    )
    finalStatus = 'failed'
  }

  const [updated] = await db
    .update(paymentTransaction)
    .set({ status: finalStatus, updatedAt: new Date() })
    .where(eq(paymentTransaction.id, payment.id))
    .returning()

  // Si le paiement est confirmé, on passe aussi le transfert en 'paid'.
  if (finalStatus === 'success') {
    await db
      .update(transaction)
      .set({ status: 'paid', updatedAt: new Date() })
      .where(eq(transaction.id, payment.transactionId))
  }

  return updated
}

// ─── Statut de retour de paiement ─────────────────────────────────────────────

export async function getPaymentStatusServer(paymentId: string) {
  const user = await requireAuthenticatedUser()

  const [row] = await db
    .select({ payment: paymentTransaction })
    .from(paymentTransaction)
    .innerJoin(transaction, eq(paymentTransaction.transactionId, transaction.id))
    .where(
      and(
        eq(paymentTransaction.id, paymentId),
        eq(transaction.userId, user.id),
      ),
    )
    .limit(1)

  if (!row) throw new Error('Paiement introuvable')

  const payment =
    row.payment.status === 'pending'
      ? await synchronizePayment(row.payment)
      : row.payment

  return { status: payment.status as string }
}

// ─── Initialisation de paiement ────────────────────────────────────────────────

export async function initiatePaymentServer(data: {
  amount: number
  recipientName: string
  recipientPhone: string
  note?: string
  originUrl: string
}) {
  const user = await requireAuthenticatedUser()

  if (!validatePaymentAmount(data.amount)) {
    throw new Error(
      `Montant invalide : doit être entre ${paymentConfig.minimumAmount} et ${paymentConfig.maximumAmount} ${paymentConfig.currency}`,
    )
  }
  if (!data.recipientName.trim() || !data.recipientPhone.trim()) {
    throw new Error('Destinataire invalide')
  }

  const total = calculatePaymentTotal(data.amount)

  const [transfer] = await db
    .insert(transaction)
    .values({
      id: crypto.randomUUID(),
      reference: `NP-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      userId: user.id,
      recipientName: data.recipientName.trim(),
      recipientPhone: data.recipientPhone.trim(),
      amount: String(data.amount),
      fee: String(paymentConfig.fixedFee),
      total: String(total),
      currency: paymentConfig.currency,
      paymentMethodName: 'Moneroo',
      paymentMethodBadge: 'MNR',
      status: 'awaiting_payment',
      note: data.note?.trim() || null,
    })
    .returning()

  const [payment] = await db
    .insert(paymentTransaction)
    .values({
      id: crypto.randomUUID(),
      transactionId: transfer.id,
      provider: 'moneroo',
      amount: total,
      currency: paymentConfig.currency,
      status: 'pending',
    })
    .returning()

  const returnUrl = new URL('/payment/return', data.originUrl)
  returnUrl.searchParams.set('paymentId', payment.id)

  try {
    const initialized = await getProvider('moneroo').initiatePayment({
      amount: payment.amount,
      currency: payment.currency,
      description: `Transfert NexPay ${transfer.reference}`,
      returnUrl: returnUrl.toString(),
      customer: {
        email: user.email,
        firstName: (user as any).firstName ?? user.name.split(' ')[0],
        lastName: (user as any).lastName ?? (user.name.split(' ').slice(1).join(' ') || '-'),
      },
      metadata: {
        payment_id: payment.id,
        transaction_id: transfer.id,
        user_id: user.id,
      },
    })

    await db
      .update(paymentTransaction)
      .set({ providerReference: initialized.providerReference, updatedAt: new Date() })
      .where(eq(paymentTransaction.id, payment.id))

    return {
      checkoutUrl: initialized.checkoutUrl,
      paymentId: payment.id,
    }
  } catch (err) {
    await db
      .update(paymentTransaction)
      .set({ status: 'failed', updatedAt: new Date() })
      .where(eq(paymentTransaction.id, payment.id))

    console.error('[payment] Échec initialisation Moneroo:', err)
    throw new Error("Impossible d'initialiser le paiement. Veuillez réessayer.")
  }
}
