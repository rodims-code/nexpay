import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import {
  getPaymentStatusServer,
  initiatePaymentServer,
} from '#/server/payments/payments.server'
import {
  COMBINED_SCENARIOS,
  PAYMENT_TEST_NUMBERS,
  PAYOUT_TEST_NUMBERS,
  SANDBOX_CONFIG,
  SANDBOX_TRANSACTIONS,
} from '#/server/payments/sandbox-data'

// ─── Données sandbox (page /dashboard/send et /dashboard/transactions) ────────

/**
 * Pourquoi : exposer les données de test UNIQUEMENT si PAYMENTS_ENV === 'sandbox'.
 * La décision est prise côté serveur : en production, le panneau de test
 * ne s'affiche pas, même si quelqu'un modifie le bundle client.
 */
export const getSandboxData = createServerFn({ method: 'GET' }).handler(
  async () => {
    if (process.env.PAYMENTS_ENV !== 'sandbox') return null

    return {
      config: SANDBOX_CONFIG,
      paymentNumbers: PAYMENT_TEST_NUMBERS,
      payoutNumbers: PAYOUT_TEST_NUMBERS,
      scenarios: COMBINED_SCENARIOS,
      transactions: SANDBOX_TRANSACTIONS,
    }
  },
)

// ─── Statut de retour de paiement (page /payment/return) ─────────────────────

export const getPaymentReturnStatus = createServerFn({ method: 'POST' })
  .validator((data: { paymentId: string }) => data)
  .handler(async ({ data }) => {
    return await getPaymentStatusServer(data.paymentId)
  })

// ─── Création du paiement (page /dashboard/send) ─────────────────────────────

export const createPayment = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      amount: number
      recipientName: string
      recipientPhone: string
      note?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    const request = getRequest()
    return await initiatePaymentServer({
      ...data,
      originUrl: request.url,
    })
  })
