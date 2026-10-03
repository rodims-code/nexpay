import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/confidentialite')({ component: Confidentialite })

function Confidentialite() {
  return <LegalLayout title="Politique de confidentialité" updatedAt="3 octobre 2026"><div className="alert alert-warning"><span>Texte à valider par un conseil juridique avant tout lancement réel.</span></div><h2>Données collectées</h2><p>Téléphone, profil, bénéficiaires, historique de transactions de démonstration et logs techniques. Aucune pièce d'identité n'est collectée en sandbox.</p><h2>Finalités</h2><p>Créer le compte, faire fonctionner la démo, sécuriser le service et fournir le support.</p><h2>Destinataires et hébergement</h2><p>Les destinataires sont l'éditeur, l'hébergeur, Supabase et le service SMS. La région d'hébergement est [À COMPLÉTER] ; des transferts internationaux sont possibles.</p><h2>Conservation</h2><p>À titre provisoire, les comptes de démonstration sont supprimés après 12 mois d'inactivité (à valider).</p><h2>Vos droits</h2><p>Vous pouvez demander l'accès, la rectification ou la suppression de vos données via [À COMPLÉTER].</p><h2>Fonds et cookies</h2><p>NexPay ne détient pas les fonds des utilisateurs : le pont, pas le coffre. Seuls des cookies essentiels sont utilisés.</p></LegalLayout>
}
