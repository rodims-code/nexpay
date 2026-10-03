import { useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { joinWaitlist, waitlistSchema } from '#/lib/waitlist.functions'

const checklist = [
  { label: 'Société créée', status: 'todo' }, { label: 'Objet social validé', status: 'todo' }, { label: 'Compte bancaire pro', status: 'todo' }, { label: 'KYB Moneroo', status: 'todo' }, { label: 'KYB pawaPay', status: 'todo' }, { label: 'Avis juridique local', status: 'todo' }, { label: 'KYC/AML défini', status: 'todo' }, { label: 'CGU', status: 'todo' }, { label: 'Politique de confidentialité', status: 'wip' }, { label: 'Procédure d’incident', status: 'todo' }, { label: 'Tests de sécurité', status: 'todo' }, { label: 'Go/No-Go signé', status: 'todo' },
] as const

const badgeClass = { todo: 'badge-ghost', wip: 'badge-warning', done: 'badge-success' }

export const Route = createFileRoute('/sandbox')({ component: Sandbox })

function Sandbox() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const input = { email: String(form.get('email') ?? ''), country: String(form.get('country') ?? ''), website: String(form.get('website') ?? '') }
    const result = waitlistSchema.safeParse(input)
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Données invalides'); setState('error'); return }
    setState('loading')
    try { await joinWaitlist({ data: result.data }); setState('success') } catch { setError('Une erreur est survenue. Réessayez plus tard.'); setState('error') }
  }
  return <main className="min-h-screen bg-base-200 px-4 py-10"><div className="mx-auto max-w-4xl space-y-8"><div className="alert alert-warning"><span>MODE SANDBOX : aucun argent réel n'est envoyé ni débité.</span></div><section className="card bg-base-100 shadow-xl"><div className="card-body"><h1 className="card-title text-3xl">Essayer en 2 min</h1><ul className="steps steps-vertical lg:steps-horizontal"><li className="step step-primary">Créer un compte</li><li className="step">Saisir un montant</li><li className="step">Choisir un bénéficiaire</li><li className="step">Voir le statut</li></ul><p>Test téléphone/OTP : [À COMPLÉTER]</p></div></section><section className="card bg-base-100 shadow-xl"><div className="card-body overflow-x-auto"><h2 className="card-title">Scénarios simulés</h2><table className="table"><thead><tr><th>Scénario</th><th>Description</th></tr></thead><tbody><tr><td><span className="badge badge-success">Succès</span></td><td>La simulation se termine avec succès.</td></tr><tr><td><span className="badge badge-error">Échec</span></td><td>La simulation indique un refus.</td></tr><tr><td><span className="badge badge-warning">En attente</span></td><td>La simulation attend une mise à jour.</td></tr><tr><td><span className="badge badge-ghost">Timeout</span></td><td>La simulation dépasse son délai prévu.</td></tr></tbody></table></div></section><section className="card bg-base-100 shadow-xl"><div className="card-body"><h2 className="card-title">Avant argent réel</h2><ul className="space-y-2">{checklist.map((item) => <li key={item.label} className="flex items-center justify-between gap-4 border-b border-base-200 py-2"><span>{item.label}</span><span className={`badge ${badgeClass[item.status]}`}>{item.status}</span></li>)}</ul></div></section><section className="card bg-base-100 shadow-xl"><div className="card-body"><h2 className="card-title">Liste d'attente</h2><form className="space-y-4" onSubmit={submit}><input className="hidden" name="website" tabIndex={-1} autoComplete="off" /><input className="input input-bordered w-full" name="email" type="email" placeholder="vous@exemple.com" required /><select className="select select-bordered w-full" name="country" defaultValue="" required><option value="" disabled>Choisissez votre pays</option><option>Congo</option><option>RDC</option><option>Sénégal</option><option>Gabon</option><option>Autre</option></select><button className="btn btn-primary" disabled={state === 'loading'}>{state === 'loading' ? 'Envoi…' : 'Rejoindre la liste'}</button>{state === 'success' && <div className="alert alert-success"><span>Merci, votre intérêt est enregistré.</span></div>}{state === 'error' && <div className="alert alert-error"><span>{error}</span></div>}</form></div></section></div></main>
}
