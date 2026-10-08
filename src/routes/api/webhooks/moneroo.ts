/**
 * Rôle : point d'entrée HTTP pour les webhooks Moneroo.
 *        Reçoit les événements de paiement (succès, échec, annulation)
 *        et met à jour la base de données après vérification.
 *
 * Parcours : Moneroo POST sur cette URL après chaque événement de paiement.
 *   1. On lit le corps BRUT (request.text()) — obligatoire pour la vérification HMAC.
 *   2. parseWebhook valide la signature x-moneroo-signature.
 *   3. On retrouve le paiement interne par providerReference.
 *   4. Idempotence : si déjà 'success', on répond 200 immédiatement.
 *   5. Pour un événement 'success', on appelle synchronizePayment
 *      (qui re-vérifie auprès de Moneroo avant de mettre à jour).
 *   6. On répond 200 rapidement — Moneroo attend moins de 3 secondes.
 *
 * Échec de signature : 403 Forbidden.
 * Paiement introuvable : 200 (pour ne pas indiquer à un attaquant que la référence existe).
 *
 * ⚠️  Ne pas lancer de tâche longue dans ce handler — répondre en < 3s.
 *     Si un traitement long est nécessaire, l'envoyer dans une file asynchrone.
 */
import { createFileRoute } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'
import { db } from '#/db'
import { paymentTransaction } from '#/db/schema'
import { synchronizePayment } from '#/server/payments/payments.server'
import { getProvider } from '#/server/payments/registry'

export const Route = createFileRoute('/api/webhooks/moneroo')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Étape 1 : lire le corps brut AVANT tout parsing.
        // Risque évité : si on parsait d'abord en JSON puis re-sérialisait,
        // la signature ne correspondrait plus (ordre des clés JSON peut changer).
        const rawBody = await request.text()

        try {
          // Étape 2 : valider la signature et extraire les données normalisées.
          // En cas de signature invalide, parseWebhook lève une erreur → catch → 403.
          const evt = await getProvider('moneroo').parseWebhook(rawBody, request.headers)

          // Étape 3 : retrouver le paiement par la référence fournisseur.
          const [payment] = await db
            .select()
            .from(paymentTransaction)
            .where(eq(paymentTransaction.providerReference, evt.providerReference))
            .limit(1)

          // Paiement introuvable : possible si la référence est invalide ou déjà supprimée.
          // On répond 200 pour ne pas exposer d'information à un potentiel attaquant.
          if (!payment) {
            console.warn(
              `[webhook] Paiement introuvable pour providerReference: ${evt.providerReference}`,
            )
            return new Response('ok')
          }

          // Étape 4 : idempotence.
          // Risque évité : Moneroo peut envoyer le même webhook plusieurs fois
          // (retries, réseau, etc.). Si le paiement est déjà 'success', on ignore.
          if (payment.status === 'success') {
            return new Response('ok')
          }

          if (evt.status === 'success') {
            // Étape 5 : avant de créditer, on re-vérifie auprès de Moneroo.
            // Risque évité : traiter un webhook 'success' falsifié sans vérification.
            // synchronizePayment compare aussi montant et devise avec la base.
            await synchronizePayment(payment)
          } else {
            // Pour les statuts 'failed' et 'cancelled', on met à jour directement.
            // Pas besoin de re-vérifier car ces statuts ne créditent rien.
            await db
              .update(paymentTransaction)
              .set({ status: evt.status, updatedAt: new Date() })
              .where(eq(paymentTransaction.id, payment.id))
          }

          // Étape 6 : répondre 200 rapidement.
          return new Response('ok')
        } catch (err) {
          // Signature invalide ou payload malformé.
          // On log l'erreur mais pas le corps brut ni les données sensibles.
          console.error('[webhook] Erreur de validation:', (err as Error).message)
          return new Response('invalid', { status: 403 })
        }
      },
    },
  },
})
