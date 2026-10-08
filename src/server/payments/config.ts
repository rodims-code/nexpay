/**
 * Rôle : configuration centralisée des règles métier pour les paiements.
 * Parcours : createPayment lit cette config pour valider l'intention du navigateur
 *            et calculer le total à enregistrer en base AVANT tout appel Moneroo.
 * Échec : si l'intention est hors limites, elle est refusée ici, sans écriture en base
 *         ni appel externe. L'utilisateur reçoit une erreur explicite.
 *
 * SANDBOX — valeurs modifiables :
 *   - currency : devise imposée par le serveur (le navigateur ne la choisit pas)
 *   - minimumAmount / maximumAmount : limites de montant acceptées
 *   - decimalPlaces : 0 = montants entiers uniquement (XAF, XOF...)
 *   - fixedFee : frais NexPay en plus du montant (0 pour le sandbox)
 */
export const paymentConfig = {
  /** Devise imposée par le serveur. Le navigateur envoie seulement un montant. */
  currency: 'XAF',

  /** Montant minimum accepté (en unité entière selon decimalPlaces). */
  minimumAmount: 500,

  /** Montant maximum accepté (protège contre les tests ou erreurs de saisie). */
  maximumAmount: 1_000_000,

  /**
   * Nombre de décimales autorisées.
   * 0 = montant entier (ex. XAF, XOF qui n'ont pas de centime).
   */
  decimalPlaces: 0,

  /**
   * Frais fixes NexPay ajoutés au montant (en XAF).
   * 0 en sandbox — à modifier quand la politique tarifaire sera définie.
   */
  fixedFee: 0,
} as const

/**
 * Pourquoi : centraliser le calcul du total pour que le navigateur
 * ne puisse jamais choisir ou manipuler le montant final débité.
 * C'est ce total qui est envoyé à Moneroo et comparé dans le webhook.
 */
export function calculatePaymentTotal(amount: number): number {
  return amount + paymentConfig.fixedFee
}

/**
 * Pourquoi : refuser tout montant imprécis, négatif ou hors politique
 * avant de créer une transaction ou d'appeler Moneroo.
 * Risque évité : contournement des limites via une valeur forgée depuis le client.
 */
export function validatePaymentAmount(amount: number): boolean {
  if (!Number.isFinite(amount)) return false
  if (amount < paymentConfig.minimumAmount) return false
  if (amount > paymentConfig.maximumAmount) return false

  // Risque évité : une valeur comme 100.123 passerait les limites mais provoquerait
  // une erreur Moneroo (amount doit être entier selon la doc).
  const factor = 10 ** paymentConfig.decimalPlaces
  return Math.round(amount * factor) === amount * factor
}
