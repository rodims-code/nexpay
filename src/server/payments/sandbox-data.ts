/**
 * Rôle : source unique de vérité pour les données de test Moneroo sandbox.
 * Parcours : importé par la server function getSandboxData (payments.functions.ts)
 *            et affiché dans /dashboard/send et /dashboard/transactions.
 * Échec : ce fichier ne fait aucun appel réseau. S'il est absent, la server
 *         function retourne null et aucun panneau de test n'est affiché.
 *
 * ⚠️  Toutes les valeurs de ce fichier sont des données de test Moneroo.
 *     Ne jamais utiliser en production.
 */

// ─── Configuration sandbox ──────────────────────────────────────────────────────

// TODO : remplacer par des données réelles avant le live.
export const SANDBOX_CONFIG = {
  /** Devise imposée en mode sandbox (Moneroo demo requiert USD). */
  currency: 'USD',
  /** Pays configuré dans la session sandbox Moneroo. */
  country: 'US',
  /** Méthode de paiement (pay-in) sandbox Moneroo. */
  paymentMethod: 'moneroo_payment_demo',
  /** Méthode de versement (payout) sandbox Moneroo — non implémentée, réservée. */
  payoutMethod: 'moneroo_payout_demo',
} as const

// ─── Types ──────────────────────────────────────────────────────────────────────

/**
 * Résultat attendu d'un numéro de test Moneroo pour le paiement (pay-in).
 * Source : documentation Moneroo sandbox.
 */
export type PaymentTestResult = 'success' | 'pending' | 'failed'

/**
 * Résultat attendu d'un numéro de test Moneroo pour le payout (versement).
 * ATTENTION : l'ordre échec/attente est INVERSÉ par rapport au paiement.
 */
export type PayoutTestResult = 'success' | 'failed' | 'pending'

/** Entrée du tableau des numéros de test paiement. */
export interface PaymentTestNumber {
  /** Numéro à saisir sur la page de paiement Moneroo (format (414)951-XXXX). */
  phone: string
  /** Résultat Moneroo attendu après confirmation. */
  result: PaymentTestResult
  /** Libellé lisible en français. */
  label: string
}

/** Entrée du tableau des numéros de test payout. */
export interface PayoutTestNumber {
  /**
   * Numéro à passer dans recipient.account_number lors d'un appel payout.
   * À utiliser comme "numéro du destinataire" dans le formulaire d'envoi.
   */
  accountNumber: string
  /** Résultat Moneroo attendu pour le payout. */
  result: PayoutTestResult
  /** Libellé lisible en français. */
  label: string
}

/** Scénario combiné paiement + payout avec le résultat NexPay attendu. */
export interface CombinedScenario {
  id: number
  /** Numéro de paiement (pay-in) utilisé. */
  paymentPhone: string
  /**
   * Numéro payout utilisé (null si le paiement échoue avant tout versement).
   */
  payoutAccount: string | null
  /** Statut global NexPay attendu à l'issue du scénario. */
  expectedStatus: TransactionStatus
  /** Description lisible du scénario. */
  description: string
}

/**
 * Statuts possibles d'un transfert NexPay.
 * Chaque statut correspond à une combinaison pay-in / payout.
 */
export type TransactionStatus =
  | 'awaiting_payment'
  | 'paid'
  | 'payout_pending'
  | 'completed'
  | 'payout_failed'
  | 'failed'

/** Transaction d'exemple pour l'affichage sandbox. */
export interface SandboxTransaction {
  id: string
  reference: string
  recipientName: string
  recipientPhone: string
  /** Montant envoyé par l'expéditeur (hors frais). */
  amount: number
  /** Frais NexPay (0 en sandbox). */
  fee: number
  /** Total débité (amount + fee). */
  total: number
  currency: 'USD'
  /** Statut du paiement côté Moneroo. */
  paymentStatus: PaymentTestResult
  /** Statut du payout côté Moneroo. Null si le paiement n'a pas abouti. */
  payoutStatus: PayoutTestResult | null
  /** Statut global NexPay calculé à partir des deux précédents. */
  status: TransactionStatus
  /** Scénario de test correspondant (référence au champ id de COMBINED_SCENARIOS). */
  scenarioId: number
  createdAt: string
}

// ─── Numéros de test PAIEMENT ───────────────────────────────────────────────────

// TODO : remplacer par des données réelles avant le live.
// Source : documentation Moneroo sandbox — numéros saisis sur la page de paiement.
export const PAYMENT_TEST_NUMBERS: PaymentTestNumber[] = [
  {
    phone: '(414)951-8161',
    result: 'success',
    label: 'Paiement accepté',
  },
  {
    phone: '(414)951-8162',
    result: 'pending',
    label: 'Paiement en attente',
  },
  {
    phone: '(414)951-8163',
    result: 'failed',
    label: 'Paiement refusé',
  },
]

// ─── Numéros de test PAYOUT ─────────────────────────────────────────────────────

// TODO : remplacer par des données réelles avant le live.
// Source : documentation Moneroo sandbox — champ recipient.account_number.
// ⚠️  L'ordre échec / attente est INVERSÉ par rapport aux numéros de paiement.
//     Ne jamais fusionner les deux tableaux.
export const PAYOUT_TEST_NUMBERS: PayoutTestNumber[] = [
  {
    accountNumber: '4149518161',
    result: 'success',
    label: 'Versement réussi',
  },
  {
    accountNumber: '4149518162',
    result: 'failed',       // ← ÉCHEC (≠ paiement où 8162 = attente)
    label: 'Versement échoué',
  },
  {
    accountNumber: '4149518163',
    result: 'pending',      // ← ATTENTE (≠ paiement où 8163 = échec)
    label: 'Versement en cours',
  },
]

// ─── Scénarios combinés paiement + payout ───────────────────────────────────────

// TODO : remplacer par des données réelles avant le live.
// Chaque scénario illustre un cas de bout en bout pour les tests manuels.
export const COMBINED_SCENARIOS: CombinedScenario[] = [
  {
    id: 1,
    paymentPhone: '(414)951-8161',
    payoutAccount: '4149518161',
    expectedStatus: 'completed',
    description: 'Paiement accepté + versement réussi → Transfert terminé',
  },
  {
    id: 2,
    paymentPhone: '(414)951-8161',
    payoutAccount: '4149518162',
    expectedStatus: 'payout_failed',
    description: 'Paiement accepté + versement échoué → Versement à retraiter',
  },
  {
    id: 3,
    paymentPhone: '(414)951-8161',
    payoutAccount: '4149518163',
    expectedStatus: 'payout_pending',
    description: 'Paiement accepté + versement en cours → En attente Moneroo',
  },
  {
    id: 4,
    paymentPhone: '(414)951-8163',
    payoutAccount: null,
    expectedStatus: 'failed',
    description: 'Paiement refusé → Aucun versement déclenché',
  },
  {
    id: 5,
    paymentPhone: '(414)951-8162',
    payoutAccount: null,
    expectedStatus: 'awaiting_payment',
    description: 'Paiement en attente → Versement déclenché lors du rattrapage',
  },
]

// ─── Transactions d'exemple EN DUR ──────────────────────────────────────────────

// TODO : remplacer par des données réelles depuis la base de données.
//        Branchement : retirer ce tableau et appeler getTransactions() dans
//        transactions.tsx une fois la base connectée et les vrais statuts stockés.
export const SANDBOX_TRANSACTIONS: SandboxTransaction[] = [
  {
    id: 'sbx-001',
    reference: 'NP-DEMO-001',
    recipientName: 'Amara Diallo',
    recipientPhone: '4149518161',
    amount: 50,
    fee: 0,
    total: 50,
    currency: 'USD',
    paymentStatus: 'success',
    payoutStatus: 'success',
    status: 'completed',
    scenarioId: 1,
    createdAt: '2026-10-13T08:00:00Z',
  },
  {
    id: 'sbx-002',
    reference: 'NP-DEMO-002',
    recipientName: 'Fatou Coulibaly',
    recipientPhone: '4149518162',
    amount: 25,
    fee: 0,
    total: 25,
    currency: 'USD',
    paymentStatus: 'success',
    payoutStatus: 'failed',
    status: 'payout_failed',
    scenarioId: 2,
    createdAt: '2026-10-13T09:00:00Z',
  },
  {
    id: 'sbx-003',
    reference: 'NP-DEMO-003',
    recipientName: 'Mamadou Traoré',
    recipientPhone: '4149518163',
    amount: 100,
    fee: 0,
    total: 100,
    currency: 'USD',
    paymentStatus: 'success',
    payoutStatus: 'pending',
    status: 'payout_pending',
    scenarioId: 3,
    createdAt: '2026-10-13T09:30:00Z',
  },
  {
    id: 'sbx-004',
    reference: 'NP-DEMO-004',
    recipientName: 'Aïssatou Bah',
    recipientPhone: '4149518161',
    amount: 10,
    fee: 0,
    total: 10,
    currency: 'USD',
    paymentStatus: 'failed',
    payoutStatus: null,
    status: 'failed',
    scenarioId: 4,
    createdAt: '2026-10-13T10:00:00Z',
  },
  {
    id: 'sbx-005',
    reference: 'NP-DEMO-005',
    recipientName: 'Oumar Konaté',
    recipientPhone: '4149518163',
    amount: 75,
    fee: 0,
    total: 75,
    currency: 'USD',
    paymentStatus: 'pending',
    payoutStatus: null,
    status: 'awaiting_payment',
    scenarioId: 5,
    createdAt: '2026-10-13T10:30:00Z',
  },
  {
    id: 'sbx-006',
    reference: 'NP-DEMO-006',
    recipientName: 'Kadiatou Sylla',
    recipientPhone: '4149518161',
    amount: 200,
    fee: 0,
    total: 200,
    currency: 'USD',
    paymentStatus: 'success',
    payoutStatus: 'success',
    status: 'completed',
    scenarioId: 1,
    createdAt: '2026-10-13T11:00:00Z',
  },
]
