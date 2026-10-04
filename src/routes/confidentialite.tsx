import { createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/confidentialite')({
  component: Confidentialite,
})

const dataCategories = [
  {
    title: 'Informations de compte',
    description:
      'Téléphone, nom d’utilisateur, préférences et paramètres du compte.',
    icon: '👤',
  },
  {
    title: 'Bénéficiaires',
    description:
      'Données nécessaires à la gestion des contacts de paiement.',
    icon: '👥',
  },
  {
    title: 'Transactions de démonstration',
    description:
      'Historique des opérations simulées effectuées dans la sandbox.',
    icon: '💸',
  },
  {
    title: 'Logs techniques',
    description:
      'Informations de connexion, erreurs, diagnostics et événements système.',
    icon: '📋',
  },
]

const rights = [
  'Accéder à vos données',
  'Corriger vos informations',
  'Supprimer votre compte',
  'Exporter vos données',
  'Limiter certains traitements',
]

function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt="4 octobre 2026"
    >
      <div className="space-y-8">

        {/* HERO */}

        <section className="hero rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-primary-content shadow-2xl">
          <div className="hero-content py-16 text-center">
            <div className="max-w-3xl">

              <div className="badge badge-info badge-lg mb-4">
                Privacy Center
              </div>

              <h1 className="text-5xl font-extrabold">
                Vos données vous appartiennent
              </h1>

              <p className="mt-6 text-lg opacity-90">
                Cette page explique quelles informations
                sont utilisées, pourquoi elles le sont
                et comment elles sont protégées au sein
                de NexPay.
              </p>

            </div>
          </div>
        </section>

        {/* WARNING */}

        <div className="alert alert-warning shadow-lg">
          <span>
            ⚠️ Ce document correspond à une version de
            démonstration et devra être validé par un
            conseiller juridique avant tout lancement
            commercial.
          </span>
        </div>

        {/* STATS */}

        <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl">

          <div className="stat">
            <div className="stat-title">
              Données d'identité
            </div>

            <div className="stat-value text-primary">
              Non
            </div>

            <div className="stat-desc">
              En sandbox
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Cookies
            </div>

            <div className="stat-value text-success">
              Essentiels
            </div>

            <div className="stat-desc">
              Fonctionnement du service
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Fonds utilisateurs
            </div>

            <div className="stat-value text-warning">
              Aucun
            </div>

            <div className="stat-desc">
              Sandbox uniquement
            </div>
          </div>

        </div>

        {/* DATA */}

        <section>

          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              Données collectées
            </h2>

            <p className="opacity-70">
              Les catégories suivantes peuvent être utilisées
              pour assurer le fonctionnement du service.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {dataCategories.map((item) => (
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

        {/* PURPOSE */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Pourquoi utilisons-nous ces données ?
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-xl border border-base-300 p-5">
                ✅ Création et gestion du compte
              </div>

              <div className="rounded-xl border border-base-300 p-5">
                ✅ Fonctionnement de la démonstration
              </div>

              <div className="rounded-xl border border-base-300 p-5">
                ✅ Sécurisation du service
              </div>

              <div className="rounded-xl border border-base-300 p-5">
                ✅ Assistance et support utilisateur
              </div>

            </div>

          </div>
        </section>

        {/* HOSTING */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Destinataires et hébergement
            </h2>

            <p>
              Certaines données peuvent être traitées par
              les services nécessaires au fonctionnement
              technique de NexPay.
            </p>

            <div className="overflow-x-auto">

              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Rôle</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Éditeur NexPay</td>
                    <td>
                      Gestion de la plateforme
                    </td>
                  </tr>

                  <tr>
                    <td>Supabase</td>
                    <td>
                      Base de données
                    </td>
                  </tr>

                  <tr>
                    <td>Fournisseur SMS</td>
                    <td>
                      Authentification OTP
                    </td>
                  </tr>

                  <tr>
                    <td>Infrastructure Cloud</td>
                    <td>
                      Hébergement applicatif
                    </td>
                  </tr>

                </tbody>
              </table>

            </div>

            <div className="alert">
              <span>
                🌍 Région d'hébergement :
                Europe (à adapter)
                <br />
                Des transferts internationaux peuvent
                être nécessaires selon les services utilisés.
              </span>
            </div>

          </div>
        </section>

        {/* RETENTION */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Durée de conservation
            </h2>

            <p>
              Les comptes de démonstration inactifs
              peuvent être supprimés après 12 mois
              sans activité.
            </p>

            <div className="alert alert-info">
              <span>
                Cette durée est indicative et devra être
                validée juridiquement avant production.
              </span>
            </div>

          </div>
        </section>

        {/* RIGHTS */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Vos droits
            </h2>

            <div className="grid gap-3 md:grid-cols-2">

              {rights.map((right) => (
                <div
                  key={right}
                  className="rounded-xl border border-base-300 p-4"
                >
                  ✅ {right}
                </div>
              ))}

            </div>

            <div className="divider" />

            <div className="rounded-2xl bg-base-200 p-5">
              <div className="font-bold">
                Contact vie privée
              </div>

              <div className="mt-2 opacity-70">
                privacy@nexpay-demo.com
              </div>
            </div>

          </div>
        </section>

        {/* COOKIES */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Cookies et fonds utilisateurs
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl bg-base-200 p-5">
                <h3 className="font-bold mb-2">
                  🍪 Cookies
                </h3>

                <p>
                  Seuls les cookies nécessaires au
                  fonctionnement et à la sécurité
                  du service sont utilisés.
                </p>
              </div>

              <div className="rounded-2xl bg-base-200 p-5">
                <h3 className="font-bold mb-2">
                  🏦 Fonds
                </h3>

                <p>
                  NexPay ne détient pas les fonds
                  des utilisateurs.
                  La plateforme agit comme un pont,
                  pas comme un coffre-fort.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* FOOTER CTA */}

        <section className="card bg-primary text-primary-content shadow-2xl">
          <div className="card-body text-center">

            <h2 className="text-3xl font-bold">
              Transparence et contrôle
            </h2>

            <p className="mx-auto max-w-3xl opacity-90">
              Nous nous engageons à être transparents
              sur l'utilisation des données et à donner
              aux utilisateurs un contrôle maximal sur
              leurs informations personnelles.
            </p>

          </div>
        </section>

      </div>
    </LegalLayout>
  )
}