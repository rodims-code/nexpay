import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/securite')({
  component: Securite,
})

const protections = [
  {
    icon: '🔐',
    title: 'Secrets côté serveur',
    description:
      'Les clés API, identifiants et secrets des partenaires ne sont jamais exposés aux applications clientes.',
  },
  {
    icon: '📱',
    title: 'Authentification OTP',
    description:
      'Une couche de protection supplémentaire est prévue lors de la connexion.',
  },
  {
    icon: '✅',
    title: 'PIN de validation',
    description:
      'Les opérations sensibles utilisent un code distinct de connexion.',
  },
  {
    icon: '🛡️',
    title: 'Vérification des webhooks',
    description:
      'Chaque notification reçue est authentifiée avant traitement.',
  },
  {
    icon: '🚫',
    title: 'Anti double transaction',
    description:
      'La plateforme détecte les tentatives de duplication involontaires.',
  },
  {
    icon: '📋',
    title: 'Audit & Traçabilité',
    description:
      'Les actions importantes sont consignées dans des journaux sécurisés.',
  },
]

const reflexes = [
  'Ne partagez jamais votre OTP.',
  'Ne partagez jamais votre PIN.',
  'Vérifiez toujours l’adresse du site avant de vous connecter.',
  'Signalez tout comportement suspect.',
  'Utilisez un mot de passe unique.',
]

const faqs = [
  {
    q: 'Pourquoi utiliser un OTP ?',
    a: 'L’OTP ajoute une couche de protection supplémentaire et réduit les risques liés au vol de mot de passe.',
  },
  {
    q: 'Pourquoi un PIN séparé ?',
    a: 'Le PIN permet de protéger les opérations sensibles même lorsqu’une session est déjà ouverte.',
  },
  {
    q: 'Mes données sont-elles chiffrées ?',
    a: 'La conception prévoit la protection des données en transit ainsi que sur les infrastructures utilisées.',
  },
  {
    q: 'Comment signaler une faille ?',
    a: 'Vous pouvez contacter directement notre équipe sécurité à l’adresse indiquée ci-dessous.',
  },
]

function Securite() {
  return (
    <LegalLayout
      title="Centre de sécurité"
      updatedAt="4 octobre 2026"
    >
      <div className="space-y-8">

        {/* HERO */}

        <section className="hero rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-primary-content shadow-2xl">
          <div className="hero-content py-16 text-center">
            <div className="max-w-3xl">

              <div className="badge badge-success badge-lg mb-4">
                Security Center
              </div>

              <h1 className="text-5xl font-extrabold">
                Votre sécurité est notre priorité
              </h1>

              <p className="mt-6 text-lg opacity-90">
                NexPay applique une approche de sécurité
                dès la conception afin de protéger les
                utilisateurs, les données et les transactions.
              </p>

            </div>
          </div>
        </section>

        {/* STATS */}

        <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl">

          <div className="stat">
            <div className="stat-title">
              Connexion
            </div>
            <div className="stat-value text-primary">
              OTP
            </div>
            <div className="stat-desc">
              Vérification renforcée
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Transactions
            </div>
            <div className="stat-value text-success">
              PIN
            </div>
            <div className="stat-desc">
              Validation dédiée
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Surveillance
            </div>
            <div className="stat-value text-warning">
              24/7
            </div>
            <div className="stat-desc">
              Monitoring des événements
            </div>
          </div>

        </div>

        {/* PROTECTIONS */}

        <section>

          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              Mécanismes de protection
            </h2>

            <p className="opacity-70">
              Plusieurs couches de sécurité sont intégrées
              dans l’architecture de NexPay.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {protections.map((item) => (
              <div
                key={item.title}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">

                  <div className="text-5xl">
                    {item.icon}
                  </div>

                  <h3 className="card-title">
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </section>

        {/* FLOW */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Parcours sécurisé
            </h2>

            <ul className="steps steps-vertical lg:steps-horizontal w-full">

              <li className="step step-primary">
                Connexion
              </li>

              <li className="step step-primary">
                OTP
              </li>

              <li className="step step-primary">
                Vérification
              </li>

              <li className="step step-primary">
                PIN
              </li>

              <li className="step step-primary">
                Audit
              </li>

            </ul>

          </div>
        </section>

        {/* BONNES PRATIQUES */}

        <section className="card bg-warning text-warning-content shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              ⚠️ Bonnes pratiques
            </h2>

            <div className="grid gap-3 md:grid-cols-2">

              {reflexes.map((reflexe) => (
                <div
                  key={reflexe}
                  className="rounded-xl bg-warning-content/10 p-4"
                >
                  ✅ {reflexe}
                </div>
              ))}

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

              {faqs.map((item, index) => (
                <div
                  key={item.q}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input
                    type="radio"
                    name="security-faq"
                    defaultChecked={index === 0}
                  />

                  <div className="collapse-title font-semibold">
                    {item.q}
                  </div>

                  <div className="collapse-content">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* REPORT */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Signaler une vulnérabilité
            </h2>

            <p>
              Si vous identifiez une faille, un comportement
              inhabituel ou un incident de sécurité,
              contactez directement notre équipe.
            </p>

            <div className="grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold">
                  📧 Email Sécurité
                </div>

                <div className="mt-2 text-sm opacity-70">
                  security@nexpay-demo.com
                </div>
              </div>

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold">
                  🚨 Urgence
                </div>

                <div className="mt-2 text-sm opacity-70">
                  +243 999 000 111
                </div>
              </div>

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold">
                  🐞 Bug Bounty
                </div>

                <div className="mt-2 text-sm opacity-70">
                  bounty@nexpay-demo.com
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* TRUST */}

        <section className="card bg-primary text-primary-content shadow-2xl">
          <div className="card-body text-center">

            <h2 className="text-3xl font-bold">
              Construire la confiance
            </h2>

            <p className="mx-auto max-w-3xl opacity-90">
              La sécurité n’est pas une fonctionnalité ajoutée
              après coup. Elle fait partie intégrante de la
              conception de NexPay et guide chacune de nos
              décisions techniques.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">

              <div className="badge badge-lg badge-success">
                🔐 Authentification forte
              </div>

              <div className="badge badge-lg badge-warning">
                📱 OTP
              </div>

              <div className="badge badge-lg badge-info">
                📋 Audit
              </div>

              <div className="badge badge-lg badge-secondary">
                🛡️ Protection avancée
              </div>

            </div>

          </div>
        </section>

      </div>
    </LegalLayout>
  )
}