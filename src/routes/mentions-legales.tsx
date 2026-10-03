import { Link, createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/mentions-legales')({ component: MentionsLegales })

function MentionsLegales() {
  return <LegalLayout title="Mentions légales" updatedAt="3 octobre 2026"><div className="alert alert-info"><span>RCCM, NIF, capital, siège : à compléter après création de la société.</span></div><h2>Éditeur</h2><p>Dieuveil RODIM'S, personne physique, projet NexPay en cours de constitution. Contact : [À COMPLÉTER]. Directeur de publication : l'éditeur.</p><h2>Hébergement</h2><p>Hébergeur : [À COMPLÉTER]. Base de données : Supabase.</p><h2>Statut du projet</h2><p>NexPay est une plateforme technologique en phase de démonstration. Aucun service financier réel n'est proposé : NexPay n'est ni une banque ni un établissement de paiement.</p><h2>Propriété intellectuelle</h2><p>Les contenus et éléments de NexPay sont protégés. Toute reproduction non autorisée est interdite.</p><p>Consultez également notre <Link to="/confidentialite" className="link link-primary">politique de confidentialité</Link>.</p><h2>Droit applicable</h2><p>[À COMPLÉTER]</p></LegalLayout>
}
