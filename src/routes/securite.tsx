import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/securite')({ component: Securite })

function Securite() {
  return <LegalLayout title="Sécurité" updatedAt="3 octobre 2026"><h2>Principes de conception</h2><ul><li>Les secrets des prestataires restent uniquement côté serveur.</li><li>Un OTP est prévu à la connexion et un PIN distinct pour autoriser une transaction.</li><li>Les signatures de webhooks sont vérifiées.</li><li>La conception prévoit une protection contre les doubles transactions et une limitation des tentatives.</li><li>Des journaux d'audit sont conservés.</li></ul><h2>Vos réflexes</h2><p>Ne partagez jamais votre OTP ou votre PIN. NexPay ne vous les demandera jamais. Signalez toute activité suspecte.</p><h2>Signaler une faille</h2><p>Écrivez à security@[À COMPLÉTER].</p></LegalLayout>
}
