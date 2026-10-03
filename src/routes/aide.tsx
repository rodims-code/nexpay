import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

const questions = [['Qu’est-ce que NexPay ?', 'NexPay est une plateforme technologique d’orchestration, en phase de démonstration.'], ['Est-il disponible ?', 'Non, le service est actuellement en sandbox.'], ['Mon argent est-il en jeu ?', 'Non. La sandbox simule les transactions ; aucun argent réel n’est envoyé ni débité.'], ['Qui détient les fonds ?', 'NexPay ne détient pas les fonds des utilisateurs.'], ['Quels pays sont visés ?', 'Congo, RDC, Sénégal et Gabon sont des cibles ; aucun lancement n’y est encore effectué.'], ['Frais et taux de change', 'Ils seront affichés avant validation d’une transaction.'], ['Que signifient les statuts ?', 'CREATED : créée ; PENDING : en attente ; PROCESSING : en cours ; SUCCESS : réussie ; FAILED : échouée ; CANCELLED : annulée.'], ['Comment contacter NexPay ?', 'Contact : [À COMPLÉTER].']]

export const Route = createFileRoute('/aide')({ component: Aide })

function Aide() {
  return <LegalLayout title="Aide" updatedAt="3 octobre 2026"><div className="join join-vertical w-full">{questions.map(([question, answer], index) => <div key={question} className="collapse collapse-arrow join-item border border-base-300"><input type="radio" name="faq" defaultChecked={index === 0} /><div className="collapse-title font-semibold">{question}</div><div className="collapse-content"><p>{answer}</p></div></div>)}</div><div className="card bg-base-200"><div className="card-body"><h2 className="card-title">Contact</h2><p>[À COMPLÉTER]</p></div></div></LegalLayout>
}
