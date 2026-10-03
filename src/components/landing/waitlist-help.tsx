import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { joinWaitlist, waitlistSchema } from '#/lib/waitlist.functions'

const questions = [
  [
    'Quand NexPay sera-t-il disponible ?',
    'NexPay est en phase de démonstration. Inscrivez-vous pour être informé des prochaines étapes.',
  ],
  [
    'Mon argent est-il utilisé ?',
    'Non. La plateforme fonctionne actuellement en mode simulation, sans argent réel.',
  ],
  [
    'Quels pays sont visés ?',
    'Le Congo, la RDC, le Sénégal et le Gabon font partie des marchés envisagés.',
  ],
]

export function WaitlistHelpSection() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const input = {
      email: String(form.get('email') ?? ''),
      country: String(form.get('country') ?? ''),
      website: String(form.get('website') ?? ''),
    }
    const result = waitlistSchema.safeParse(input)
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Données invalides')
      setState('error')
      return
    }
    setState('loading')
    try {
      await joinWaitlist({ data: result.data })
      setState('success')
    } catch {
      setError('Une erreur est survenue. Réessayez plus tard.')
      setState('error')
    }
  }

  return (
    <section className="px-4 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body p-7 sm:p-10">
            <span className="badge badge-secondary badge-outline w-fit">
              Accès anticipé
            </span>
            <h2 className="card-title mt-3 text-3xl sm:text-4xl">
              Soyez parmi les premiers à essayer NexPay.
            </h2>
            <p className="max-w-xl text-primary-content/85">
              Laissez vos coordonnées pour recevoir les nouvelles du projet et
              une invitation lorsque la prochaine phase de démonstration sera
              ouverte.
            </p>
            <form className="mt-4 space-y-3" onSubmit={submit}>
              <input
                className="hidden"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                className="input input-bordered w-full bg-base-100 text-base-content"
                name="email"
                type="email"
                placeholder="vous@exemple.com"
                required
              />
              <select
                className="select select-bordered w-full bg-base-100 text-base-content"
                name="country"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Votre pays
                </option>
                <option>Congo</option>
                <option>RDC</option>
                <option>Sénégal</option>
                <option>Gabon</option>
                <option>Autre</option>
              </select>
              <button
                className="btn btn-warning w-full sm:w-auto"
                disabled={state === 'loading'}
              >
                {state === 'loading'
                  ? 'Inscription…'
                  : 'Rejoindre la liste d’attente'}
              </button>
              {state === 'success' && (
                <div className="alert alert-success text-base-content">
                  <span>Merci, votre intérêt est enregistré.</span>
                </div>
              )}
              {state === 'error' && (
                <div className="alert alert-error text-base-content">
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="card border border-base-200 bg-base-100 shadow-xl">
          <div className="card-body p-7 sm:p-10">
            <h2 className="card-title text-3xl">Questions fréquentes</h2>
            <div className="join join-vertical mt-2 w-full">
              {questions.map(([question, answer], index) => (
                <div
                  key={question}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input
                    type="radio"
                    name="landing-faq"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title font-semibold">{question}</div>
                  <div className="collapse-content">
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/aide" className="btn btn-ghost mt-2 w-fit">
              Voir le centre d’aide
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
