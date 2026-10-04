import { useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { joinWaitlist, waitlistSchema } from '#/lib/waitlist.functions'

const checklist: Array<{
  label: string
  status: 'todo' | 'wip' | 'done'
}> = [
  { label: 'Société créée', status: 'todo' },
  { label: 'Objet social validé', status: 'todo' },
  { label: 'Compte bancaire pro', status: 'todo' },
  { label: 'KYB Moneroo', status: 'todo' },
  { label: 'KYB pawaPay', status: 'todo' },
  { label: 'Avis juridique local', status: 'todo' },
  { label: 'KYC/AML défini', status: 'todo' },
  { label: 'CGU', status: 'todo' },
  { label: 'Politique de confidentialité', status: 'wip' },
  { label: 'Procédure d’incident', status: 'todo' },
  { label: 'Tests de sécurité', status: 'todo' },
  { label: 'Go / No-Go signé', status: 'todo' },
]

const badgeClass: Record<'todo' | 'wip' | 'done', string> = {
  todo: 'badge-ghost',
  wip: 'badge-warning',
  done: 'badge-success',
}

const badgeLabel: Record<'todo' | 'wip' | 'done', string> = {
  todo: 'À faire',
  wip: 'En cours',
  done: 'Validé',
}

export const Route = createFileRoute('/sandbox')({
  component: Sandbox,
})

function Sandbox() {
  const [state, setState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const [error, setError] = useState('')

  const completed = checklist.filter(
    item => item.status === 'done',
  ).length

  const progress = Math.round(
    (completed / checklist.length) * 100,
  )

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const input = {
      email: String(form.get('email') ?? ''),
      country: String(form.get('country') ?? ''),
      website: String(form.get('website') ?? ''),
    }

    const result = waitlistSchema.safeParse(input)

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          'Données invalides',
      )
      setState('error')
      return
    }

    setState('loading')

    try {
      await joinWaitlist({
        data: result.data,
      })

      setState('success')
    } catch {
      setError(
        'Une erreur est survenue. Réessayez plus tard.',
      )
      setState('error')
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-base-200 via-base-100 to-base-200 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HERO */}

        <section className="hero rounded-3xl bg-linear-to-br from-primary via-secondary to-accent text-primary-content shadow-2xl">
          <div className="hero-content py-16 text-center">
            <div className="max-w-3xl">

              <div className="badge badge-warning badge-lg mb-5">
                Sandbox Preview 🚀
              </div>

              <h1 className="text-5xl font-extrabold">
                Testez Moneroo avant son lancement
              </h1>

              <p className="mt-6 text-lg opacity-90">
                Simulez des transferts, explorez
                l'expérience utilisateur et découvrez
                l'écosystème Moneroo sans utiliser
                d'argent réel.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="#demo" className="btn btn-secondary">
                  Essayer la démo
                </a>

                <a href="#waitlist" className="btn btn-outline btn-secondary">
                  Rejoindre la liste
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl">

          <div className="stat">
            <div className="stat-title">
              Pays ciblés
            </div>
            <div className="stat-value text-primary">
              4
            </div>
            <div className="stat-desc">
              RDC, Congo, Sénégal, Gabon
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Progression
            </div>
            <div className="stat-value text-success">
              {progress}%
            </div>
            <div className="stat-desc">
              Préparation au lancement
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Mode actuel
            </div>
            <div className="stat-value text-warning">
              Sandbox
            </div>
            <div className="stat-desc">
              Aucun débit réel
            </div>
          </div>
        </div>

        {/* PROCESS */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-2xl">
              Comment ça fonctionne ?
            </h2>

            <ul className="steps steps-vertical lg:steps-horizontal w-full">
              <li className="step step-primary">
                Créer un compte
              </li>

              <li className="step step-primary">
                Saisir un montant
              </li>

              <li className="step">
                Choisir un bénéficiaire
              </li>

              <li className="step">
                Voir le statut
              </li>
            </ul>
          </div>
        </section>

        {/* DEMO */}

        <section
          id="demo"
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl">
              Démonstration simulée
            </h2>

            <div className="mockup-window border bg-base-300">
              <div className="bg-base-100 p-6">

                <div className="chat chat-start">
                  <div className="chat-bubble">
                    Envoi de 50 USD vers
                    Kinshasa
                  </div>
                </div>

                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-info">
                    Vérification de l'identité
                  </div>
                </div>

                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-success">
                    ✅ Transaction simulée
                    réussie
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SCENARIOS */}

        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Scénarios disponibles
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="card bg-success text-success-content">
              <div className="card-body">
                <h3 className="font-bold">
                  ✅ Succès
                </h3>
                <p>
                  La transaction se termine
                  normalement.
                </p>
              </div>
            </div>

            <div className="card bg-error text-error-content">
              <div className="card-body">
                <h3 className="font-bold">
                  ❌ Échec
                </h3>
                <p>
                  La transaction est refusée.
                </p>
              </div>
            </div>

            <div className="card bg-warning">
              <div className="card-body">
                <h3 className="font-bold">
                  ⏳ En attente
                </h3>
                <p>
                  Traitement en cours.
                </p>
              </div>
            </div>

            <div className="card bg-base-300">
              <div className="card-body">
                <h3 className="font-bold">
                  ⌛ Timeout
                </h3>
                <p>
                  Délai maximal dépassé.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ROADMAP */}

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <div className="flex items-center justify-between">
              <h2 className="card-title text-2xl">
                Préparation au lancement
              </h2>

              <span className="badge badge-primary">
                {progress}%
              </span>
            </div>

            <progress
              className="progress progress-primary w-full"
              max="100"
              value={progress}
            />

            <ul className="space-y-2">

              {checklist.map(item => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-base-200 p-3"
                >
                  <span>{item.label}</span>

                  <span
                    className={`badge ${badgeClass[item.status]}`}
                  >
                    {badgeLabel[item.status]}
                  </span>
                </li>
              ))}

            </ul>

          </div>
        </section>

        {/* WAITLIST */}

        <section
          id="waitlist"
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body max-w-2xl">

            <h2 className="text-3xl font-bold">
              Rejoignez les premiers
              testeurs
            </h2>

            <p className="text-base-content/70">
              Soyez averti dès l'ouverture
              officielle des tests privés et
              du lancement de Moneroo.
            </p>

            <form
              className="space-y-4"
              onSubmit={submit}
            >
              <input
                className="hidden"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                className="input input-bordered w-full"
                name="email"
                type="email"
                placeholder="vous@exemple.com"
                required
              />

              <select
                className="select select-bordered w-full"
                name="country"
                defaultValue=""
                required
              >
                <option disabled value="">
                  Choisissez votre pays
                </option>

                <option>RDC</option>
                <option>Congo</option>
                <option>Sénégal</option>
                <option>Gabon</option>
                <option>Autre</option>
              </select>

              <button
                className="btn btn-primary btn-block"
                disabled={state === 'loading'}
              >
                {state === 'loading'
                  ? 'Envoi...'
                  : '🚀 Rejoindre la liste d’attente'}
              </button>

              {state === 'success' && (
                <div className="alert alert-success">
                  <span>
                    Merci ! Votre inscription a
                    bien été enregistrée.
                  </span>
                </div>
              )}

              {state === 'error' && (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </section>

      </div>
    </main>
  )
}