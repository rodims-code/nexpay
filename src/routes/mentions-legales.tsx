import { Link, createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/mentions-legales')({
  component: MentionsLegales,
})

function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions légales"
      updatedAt="4 octobre 2026"
    >
      <div className="space-y-10">

        {/* HERO */}

        <section className="hero rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent text-primary-content shadow-2xl">
          <div className="hero-content py-16 text-center">
            <div className="max-w-3xl">

              <div className="badge badge-info badge-lg mb-4">
                Legal Center
              </div>

              <h1 className="text-5xl font-black">
                Informations légales
              </h1>

              <p className="mt-6 text-lg opacity-90">
                Retrouvez toutes les informations
                concernant l'éditeur du projet,
                son hébergement, son statut juridique
                et les règles encadrant NexPay.
              </p>

            </div>
          </div>
        </section>

        {/* INFO */}

        <div className="alert alert-warning shadow-lg">
          <span>
            ⚠️ Cette page contient des informations
            provisoires qui devront être complétées
            après l'immatriculation officielle
            de la société.
          </span>
        </div>

        {/* QUICK STATS */}

        <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl">

          <div className="stat">
            <div className="stat-title">
              Projet
            </div>

            <div className="stat-value text-primary text-3xl">
              NexPay
            </div>

            <div className="stat-desc">
              Plateforme technologique
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              État
            </div>

            <div className="stat-value text-warning text-3xl">
              Sandbox
            </div>

            <div className="stat-desc">
              Démonstration uniquement
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Services financiers
            </div>

            <div className="stat-value text-error text-3xl">
              Non
            </div>

            <div className="stat-desc">
              Aucun service réel
            </div>
          </div>

        </div>

        {/* COMPANY */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Éditeur
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold mb-2">
                  Fondateur
                </div>

                <div>
                  Dieuveil RODIM'S
                </div>
              </div>

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold mb-2">
                  Contact
                </div>

                <div>
                  contact@nexpay-demo.com
                </div>
              </div>

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold mb-2">
                  Publication
                </div>

                <div>
                  Directeur de publication
                </div>
              </div>

              <div className="rounded-2xl border border-base-300 p-5">
                <div className="font-bold mb-2">
                  Statut
                </div>

                <div>
                  Société en cours de constitution
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* LEGAL INFO */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Informations administratives
            </h2>

            <div className="overflow-x-auto">

              <table className="table">

                <tbody>

                  <tr>
                    <td>Raison sociale</td>
                    <td>À compléter</td>
                  </tr>

                  <tr>
                    <td>RCCM</td>
                    <td>À compléter</td>
                  </tr>

                  <tr>
                    <td>NIF</td>
                    <td>À compléter</td>
                  </tr>

                  <tr>
                    <td>Capital social</td>
                    <td>À compléter</td>
                  </tr>

                  <tr>
                    <td>Adresse du siège</td>
                    <td>À compléter</td>
                  </tr>

                  <tr>
                    <td>Pays d'incorporation</td>
                    <td>À compléter</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>
        </section>

        {/* PROJECT STATUS */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Statut du projet
            </h2>

            <div className="rounded-3xl bg-warning/10 border border-warning p-6">

              <h3 className="font-bold text-xl mb-3">
                🚧 En phase Sandbox
              </h3>

              <p>
                NexPay est actuellement une plateforme
                technologique de démonstration.
              </p>

              <p className="mt-3">
                Aucun compte financier réel,
                aucun dépôt et aucun transfert
                d'argent réel ne sont proposés
                via cette version.
              </p>

            </div>

          </div>
        </section>

        {/* INFRA */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Hébergement
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl bg-base-200 p-5">

                <div className="text-4xl mb-3">
                  ☁️
                </div>

                <h3 className="font-bold">
                  Application
                </h3>

                <p className="opacity-70">
                  Vercel (à remplacer)
                </p>

              </div>

              <div className="rounded-2xl bg-base-200 p-5">

                <div className="text-4xl mb-3">
                  🗄️
                </div>

                <h3 className="font-bold">
                  Base de données
                </h3>

                <p className="opacity-70">
                  Supabase
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* IP */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Propriété intellectuelle
            </h2>

            <p>
              Les textes, illustrations, graphismes,
              logos, interfaces, éléments visuels,
              marques, dénominations et contenus
              présents sur NexPay sont protégés par
              les lois relatives à la propriété
              intellectuelle.
            </p>

            <p>
              Toute utilisation non autorisée
              est interdite.
            </p>

          </div>
        </section>

        {/* TRUST CENTER */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Centre de confiance
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <Link
                to="/confidentialite"
                className="btn btn-outline h-20 justify-start"
              >
                🔒 Politique de confidentialité
              </Link>

              <Link
                to="/securite"
                className="btn btn-outline h-20 justify-start"
              >
                🛡️ Centre de sécurité
              </Link>

              <Link
                to="/aide"
                className="btn btn-outline h-20 justify-start"
              >
                ❓ Centre d'aide
              </Link>

              <Link
                to="/sandbox"
                className="btn btn-outline h-20 justify-start"
              >
                🚀 Sandbox
              </Link>

            </div>

          </div>
        </section>

        {/* LAW */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl">
              Droit applicable
            </h2>

            <p>
              Les présentes mentions légales sont
              soumises au droit applicable du pays
              dans lequel l'entité NexPay sera
              officiellement enregistrée.
            </p>

            <div className="alert mt-4">
              <span>
                📍 Juridiction compétente : à compléter.
              </span>
            </div>

          </div>
        </section>

      </div>
    </LegalLayout>
  )
}