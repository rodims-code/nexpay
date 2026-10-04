import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

const questions = [
  {
    question: 'Qu’est-ce que NexPay ?',
    answer:
      'NexPay est une plateforme technologique permettant de simplifier les paiements et transferts. Vous consultez actuellement une version de démonstration (sandbox).',
  },
  {
    question: 'Le service est-il disponible ?',
    answer:
      'Pas encore. NexPay est actuellement en phase de test et aucune opération réelle n’est exécutée.',
  },
  {
    question: 'Mon argent est-il utilisé ?',
    answer:
      'Non. Toutes les opérations affichées dans cette démonstration sont simulées. Aucun fonds réel n’est envoyé, débité ou conservé.',
  },
  {
    question: 'Quels pays sont concernés ?',
    answer:
      'Le projet vise notamment la RDC, le Congo-Brazzaville, le Sénégal et le Gabon. Aucun lancement officiel n’a encore été annoncé.',
  },
  {
    question: 'Comment fonctionnent les frais ?',
    answer:
      'Les frais, taux de change et détails de transaction seront toujours affichés avant toute validation lorsqu’un service réel sera disponible.',
  },
  {
    question: 'Que signifient les statuts ?',
    answer:
      'CREATED : créée • PENDING : en attente • PROCESSING : en traitement • SUCCESS : réussie • FAILED : échouée • CANCELLED : annulée.',
  },
  {
    question: 'NexPay détient-il les fonds ?',
    answer:
      'Non. NexPay agit comme plateforme technologique et ne conserve pas les fonds des utilisateurs.',
  },
  {
    question: 'Comment devenir bêta-testeur ?',
    answer:
      'Vous pouvez rejoindre la liste d’attente afin d’être informé de l’ouverture des prochaines phases de test.',
  },
]

export const Route = createFileRoute('/aide')({
  component: Aide,
})

function Aide() {
  return (
    <LegalLayout
      title="Centre d'aide"
      updatedAt="4 octobre 2026"
    >
      <div className="space-y-8">

        {/* HERO */}

        <section className="hero rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-primary-content">
          <div className="hero-content py-12 text-center">
            <div className="max-w-2xl">

              <div className="badge badge-warning mb-4">
                Support Sandbox
              </div>

              <h1 className="text-4xl font-bold">
                Comment pouvons-nous vous aider ?
              </h1>

              <p className="mt-4 opacity-90">
                Retrouvez les réponses aux questions
                les plus fréquentes concernant NexPay,
                les transactions simulées et les futurs
                services.
              </p>

            </div>
          </div>
        </section>

        {/* QUICK LINKS */}

        <section className="grid gap-4 md:grid-cols-3">

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">
                🚀 Démarrage
              </h3>
              <p>
                Comprendre rapidement le
                fonctionnement de la plateforme.
              </p>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">
                🔒 Sécurité
              </h3>
              <p>
                Informations sur les comptes,
                vérifications et conformité.
              </p>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">
                💸 Transactions
              </h3>
              <p>
                Explications sur les statuts et les
                simulations de paiement.
              </p>
            </div>
          </div>

        </section>

        {/* FAQ */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Questions fréquentes
            </h2>

            <div className="join join-vertical w-full">

              {questions.map((item, index) => (
                <div
                  key={item.question}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input
                    type="radio"
                    name="faq"
                    defaultChecked={index === 0}
                  />

                  <div className="collapse-title font-semibold">
                    {item.question}
                  </div>

                  <div className="collapse-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* STATUS GUIDE */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Guide des statuts
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

              <div className="badge badge-info p-4">
                CREATED
              </div>

              <div className="badge badge-warning p-4">
                PENDING
              </div>

              <div className="badge badge-secondary p-4">
                PROCESSING
              </div>

              <div className="badge badge-success p-4">
                SUCCESS
              </div>

              <div className="badge badge-error p-4">
                FAILED
              </div>

            </div>

          </div>
        </section>

        {/* CONTACT */}

        <section className="grid gap-6 lg:grid-cols-3">

          <div className="card bg-base-100 shadow-xl lg:col-span-2">
            <div className="card-body">

              <h2 className="card-title text-2xl">
                Besoin d'aide supplémentaire ?
              </h2>

              <p>
                Notre équipe est disponible pour répondre
                à vos questions concernant NexPay,
                les démonstrations et les futurs
                lancements.
              </p>

              <div className="divider" />

              <div className="space-y-3">

                <div>
                  <strong>Email :</strong>{' '}
                  support@nexpay-demo.com
                </div>

                <div>
                  <strong>Téléphone :</strong>{' '}
                  +243 800 000 000
                </div>

                <div>
                  <strong>WhatsApp :</strong>{' '}
                  +243 900 000 000
                </div>

                <div>
                  <strong>Adresse :</strong>{' '}
                  45 Avenue du Commerce,
                  Kinshasa, RDC
                </div>

              </div>

            </div>
          </div>

          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">

              <h3 className="text-xl font-bold">
                Temps de réponse
              </h3>

              <p>
                📧 Email
              </p>

              <p className="font-bold">
                &lt; 24 heures
              </p>

              <div className="divider divider-neutral" />

              <p>
                💬 Support WhatsApp
              </p>

              <p className="font-bold">
                &lt; 2 heures
              </p>

            </div>
          </div>

        </section>

      </div>
    </LegalLayout>
  )
}