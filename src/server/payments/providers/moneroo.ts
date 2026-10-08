 /**
 * Rôle : adaptateur Moneroo — seul fichier de l'application qui connaît
 *        l'API HTTP Moneroo, son format de réponse et la mécanique de signature.
 * Parcours : il est invoqué par create-payment.ts (initialisation et vérification)
 *            et par le webhook route (parsing et vérification de signature).
 * Échec : toute erreur est propagée sans exposer la clé secrète ni les données
 *         sensibles au navigateur ou aux logs applicatifs.
 *
 * ⚠️  NOTE sur la signature webhook (différence avec la doc) :
 *     La documentation Moneroo montre, dans l'exemple Node.js :
 *       crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex')
 *     Cela implique de re-sérialiser le JSON parsé, ce qui peut modifier l'ordre
 *     des clés et casser la comparaison.
 *     Ce code utilise le corps BRUT (rawBody) — c'est la méthode la plus sûre et
 *     cohérente avec les exemples PHP, Python et Go de la même documentation.
 *     Si les signatures ne concordent pas en production, essayez JSON.stringify(JSON.parse(rawBody)).
 */
import crypto from 'node:crypto'
import type { PaymentInput, PaymentProvider, PaymentStatus, VerifiedPayment } from '../types.ts'

const API_BASE_URL = 'https://api.moneroo.io/v1'

// ─── Helpers privés ────────────────────────────────────────────────────────────

/**
 * Pourquoi : ne jamais envoyer une requête authentifiée si la clé serveur
 * est absente — cela évite une erreur 401 silencieuse ou un appel non sécurisé.
 */
function getSecretKey(): string {
  const key = process.env.MONEROO_SECRET_KEY
  if (!key) throw new Error('MONEROO_SECRET_KEY is not configured')
  return key
}

/**
 * Pourquoi : empêcher qu'un statut Moneroo nouveau ou inconnu (ex. 'on_hold')
 * soit considéré comme 'success' par défaut, ce qui créditerait un paiement non confirmé.
 * Tout statut inconnu retombe en 'pending' pour re-vérification.
 *
 * Statuts documentés par Moneroo : 'success', 'pending', 'failed', 'cancelled'.
 */
function mapStatus(raw: string): PaymentStatus {
  if (raw === 'success') return 'success'
  if (raw === 'failed') return 'failed'
  if (raw === 'cancelled') return 'cancelled'
  // Risque évité : considérer 'on_hold', 'processing' ou tout futur statut comme réussi.
  return 'pending'
}

/**
 * Pourquoi : lire l'enveloppe de réponse Moneroo de manière uniforme
 * et relancer une erreur propre sans exposer le corps complet dans les logs.
 */
async function readData(response: Response): Promise<Record<string, unknown>> {
  const body = (await response.json()) as { data?: unknown }
  if (!response.ok || !body.data) {
    throw new Error(`Moneroo request failed: ${response.status}`)
  }
  return body.data as Record<string, unknown>
}

// ─── Adaptateur ────────────────────────────────────────────────────────────────

export const monerooProvider: PaymentProvider = {
  name: 'moneroo',

  /**
   * Pourquoi : appeler POST /v1/payments/initialize côté serveur.
   * Le navigateur ne voit jamais la clé secrète ni le checkout_url brut.
   * Réponse attendue : { data: { id: string, checkout_url: string } }
   */
  async initiatePayment(input: PaymentInput) {
    const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        amount: input.amount,
        currency: input.currency,
        description: input.description,
        return_url: input.returnUrl,
        customer: {
          email: input.customer.email,
          first_name: input.customer.firstName,
          last_name: input.customer.lastName,
        },
        metadata: input.metadata,
      }),
    })

    // La doc indique un code 201 en succès.
    const data = await readData(response)

    if (typeof data.id !== 'string' || typeof data.checkout_url !== 'string') {
      throw new Error('Moneroo returned an invalid initialization response')
    }

    return {
      providerReference: data.id,
      checkoutUrl: data.checkout_url,
    }
  },

  /**
   * Pourquoi : appeler GET /v1/payments/{id}/verify pour obtenir la source de
   * vérité Moneroo, indépendamment du webhook.
   * Risque évité : se fier uniquement au webhook qui peut être retardé ou falsifié.
   */
  async verifyPayment(providerReference: string): Promise<VerifiedPayment> {
    const response = await fetch(
      `${API_BASE_URL}/payments/${encodeURIComponent(providerReference)}/verify`,
      {
        headers: {
          Authorization: `Bearer ${getSecretKey()}`,
          Accept: 'application/json',
        },
      },
    )

    const data = await readData(response)

    // La réponse contient data.status (string) et data.amount (number).
    // data.currency est un objet { code: string } selon l'exemple de réponse de la doc.
    if (
      typeof data.status !== 'string' ||
      typeof data.amount !== 'number'
    ) {
      throw new Error('Moneroo returned an invalid verification response')
    }

    // Risque évité : la devise peut être un objet { code, name, ... } selon la doc.
    // On extrait le code de devise de manière défensive.
    let currencyCode: string
    if (typeof data.currency === 'string') {
      currencyCode = data.currency
    } else if (
      data.currency &&
      typeof data.currency === 'object' &&
      'code' in data.currency &&
      typeof (data.currency as Record<string, unknown>).code === 'string'
    ) {
      currencyCode = (data.currency as { code: string }).code
    } else {
      throw new Error('Moneroo returned an unrecognized currency format')
    }

    return {
      status: mapStatus(data.status),
      amount: data.amount,
      currency: currencyCode,
    }
  },

  /**
   * Pourquoi : valider que le webhook provient bien de Moneroo avant toute
   * mise à jour en base. Sans cette vérification, n'importe qui pourrait
   * POST sur notre endpoint et marquer un paiement comme réussi.
   *
   * Algorithme : HMAC-SHA256(rawBody, MONEROO_WEBHOOK_SECRET) → hex
   * Header attendu : x-moneroo-signature
   * Comparaison : timingSafeEqual pour éviter les attaques par timing.
   *
   * ⚠️  La doc Node.js utilise JSON.stringify(payload) ; ce code utilise rawBody.
   *     Voir le commentaire en tête de fichier pour les détails.
   */
  async parseWebhook(rawBody: string, headers: Headers) {
    const webhookSecret = process.env.MONEROO_WEBHOOK_SECRET
    const signature = headers.get('x-moneroo-signature')

    // Risque évité : accepter un appel sans secret configuré (mauvaise config côté NexPay).
    if (!webhookSecret) throw new Error('MONEROO_WEBHOOK_SECRET is not configured')

    // Risque évité : accepter un webhook sans header de signature (appel non signé).
    if (!signature) throw new Error('Missing x-moneroo-signature header')

    // Calcul de la signature attendue.
    const expected = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex')

    // Risque évité : comparaison en temps constant pour éviter les attaques par timing
    // qui permettraient de deviner la signature octet par octet.
    const sigBuffer = Buffer.from(signature)
    const expBuffer = Buffer.from(expected)
    if (
      sigBuffer.length !== expBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expBuffer)
    ) {
      throw new Error('Invalid webhook signature')
    }

    // Parser le payload seulement après validation de la signature.
    const event = JSON.parse(rawBody) as {
      event?: string
      data?: { id?: unknown; status?: unknown; amount?: unknown; currency?: unknown }
    }

    // Risque évité : un payload malformé ne provoque pas une mise à jour silencieuse.
    if (
      typeof event.data?.id !== 'string' ||
      typeof event.data?.status !== 'string'
    ) {
      throw new Error('Invalid Moneroo webhook payload structure')
    }

    return {
      providerReference: event.data.id,
      status: mapStatus(event.data.status),
    }
  },
}
