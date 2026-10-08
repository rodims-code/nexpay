/**
 * Rôle : Server Functions TanStack Start pour les paiements.
 * Ce fichier est destiné à être importé aussi bien côté client que côté serveur.
 * Grâce au suffixe `.functions.ts` et à `createServerFn`, TanStack Start génère
 * des stubs RPC pour le client et n'inclut aucun code serveur (ni Drizzle, ni pg)
 * dans le bundle du navigateur.
 */
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import {
  getPaymentStatusServer,
  initiatePaymentServer,
} from '#/server/payments/payments.server'

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
