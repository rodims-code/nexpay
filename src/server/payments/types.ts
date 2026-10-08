/**
 * Rôle : contrat indépendant des prestataires de paiement.
 * Ce fichier est la seule « vérité » que le reste de l'application connaît.
 * Parcours : les server functions parlent à ce contrat ;
 *            Moneroo n'est qu'un adaptateur parmi d'autres (PawaPay à venir).
 * Échec : si un adaptateur est absent ou cassé, l'application conserve le
 *         paiement en statut pending/failed sans exposer l'erreur au navigateur.
 */

/** Statuts normalisés côté NexPay. Tout statut inconnu d'un fournisseur devient 'pending'. */
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled'

/** Données d'entrée envoyées par le serveur à un fournisseur pour démarrer un checkout. */
export interface PaymentInput {
  /** Montant entier (en plus petite unité ou sans décimale selon config). */
  amount: number
  currency: string
  description: string
  /** URL de retour que le fournisseur utilisera après le paiement. */
  returnUrl: string
  customer: {
    email: string
    firstName: string
    lastName: string
  }
  /** Métadonnées libres transmises au fournisseur (valeurs string uniquement). */
  metadata: Record<string, string>
}

/** Résultat retourné par verifyPayment — source de vérité avant tout crédit. */
export interface VerifiedPayment {
  status: PaymentStatus
  /** Montant tel que confirmé par le fournisseur, pour comparer avec la base. */
  amount: number
  /** Code devise tel que retourné par le fournisseur (ex. "XAF", "USD"). */
  currency: string
}

/**
 * Contrat que tout adaptateur de paiement doit respecter.
 * Pour ajouter PawaPay : implémenter cette interface et l'enregistrer dans registry.ts.
 */
export interface PaymentProvider {
  name: string

  /**
   * Pourquoi : démarrer un checkout Moneroo sans laisser le client
   * connaître la clé secrète ni le montant à facturer.
   */
  initiatePayment(input: PaymentInput): Promise<{
    /** Identifiant du paiement côté fournisseur (ex. ID Moneroo). */
    providerReference: string
    /** URL de checkout à laquelle rediriger l'utilisateur. */
    checkoutUrl: string
  }>

  /**
   * Pourquoi : obtenir la source de vérité du fournisseur avant de considérer
   * un paiement comme réussi. Ne jamais faire confiance au webhook seul.
   */
  verifyPayment(providerReference: string): Promise<VerifiedPayment>

  /**
   * Pourquoi : authentifier le webhook entrant et le réduire aux données
   * normalisées dont le code métier a besoin, sans exposer les détails internes.
   */
  parseWebhook(
    rawBody: string,
    headers: Headers,
  ): Promise<{ providerReference: string; status: PaymentStatus }>
}
