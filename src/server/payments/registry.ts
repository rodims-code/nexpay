/**
 * Rôle : registre des adaptateurs de paiement disponibles dans l'application.
 * Parcours : le reste de l'application demande un fournisseur par son nom
 *            (ex. 'moneroo') sans jamais importer l'adaptateur directement.
 * Échec : un fournisseur non enregistré lève une erreur explicite au lieu
 *         d'envoyer silencieusement un paiement au mauvais service.
 *
 * Pour ajouter PawaPay plus tard :
 *   1. Créer src/server/payments/providers/pawapay.ts (implémenter PaymentProvider)
 *   2. Importer pawapayProvider ici
 *   3. L'ajouter à l'objet providers
 */
import { monerooProvider } from './providers/moneroo.ts'

/** Pourquoi : registre central — le métier ne dépend jamais d'un import direct. */
const providers = {
  moneroo: monerooProvider,
  // pawapay: pawapayProvider, ← à décommenter plus tard
} as const

/**
 * Retourne l'adaptateur demandé.
 * TypeScript garantit que seuls les noms enregistrés sont acceptés à la compilation.
 */
export function getProvider(name: keyof typeof providers) {
  return providers[name]
}
