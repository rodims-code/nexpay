import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Phone,
  Send,
  ShieldCheck,
  User,
  UserX,
  CheckCircle2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { getRecentRecipients } from '#/lib/transactions.functions'
// Pourquoi createPayment et non createTransaction : createPayment crée le transfert
// en statut 'awaiting_payment', appelle Moneroo et retourne le checkoutUrl.
// Le transfert ne passe en 'paid' qu'après confirmation via webhook ou page de retour.
import { createPayment } from '#/lib/payments.functions'

export const Route = createFileRoute('/dashboard/send')({
  component: SendPage,
})

const QUICK_AMOUNTS = [5000, 10000, 25000, 50000, 100000]

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
]

function SendPage() {
  const [recentRecipients, setRecentRecipients] = useState<{ name: string; phone: string }[]>([])
  const [loadingRecipients, setLoadingRecipients] = useState(true)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [recipientType, setRecipientType] = useState<'contact' | 'custom'>('contact')
  const [selectedRecipientPhone, setSelectedRecipientPhone] = useState('')
  const [customName, setCustomName] = useState('')
  const [customPhone, setCustomPhone] = useState('')
  const [amountStr, setAmountStr] = useState('10000')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getRecentRecipients()
      .then((data) => {
        setRecentRecipients(data)
        if (data.length > 0) setSelectedRecipientPhone(data[0].phone)
      })
      .catch(() => {})
      .finally(() => setLoadingRecipients(false))
  }, [])

  const activeRecipient = recentRecipients.find((r) => r.phone === selectedRecipientPhone)
  const recipientName =
    recipientType === 'contact'
      ? activeRecipient?.name || 'Destinataire'
      : customName.trim() || 'Destinataire direct'
  const recipientPhone =
    recipientType === 'contact' ? activeRecipient?.phone || '' : customPhone.trim()

  const rawAmount = parseInt(amountStr.replace(/\D/g, '') || '0', 10)
  // NOTE : frais affichés à titre indicatif seulement. Le montant final est calculé
  // côté serveur (paymentConfig.fixedFee = 0 en sandbox — voir src/server/payments/config.ts).
  const displayFee = 0
  const displayTotal = rawAmount + displayFee

  const handleAmountChange = (val: string) => {
    setAmountStr(val.replace(/\D/g, ''))
  }

  /**
   * Pourquoi : on appelle createPayment (server function) qui crée le transfert
   * en 'awaiting_payment', appelle Moneroo, et retourne checkoutUrl.
   * On redirige vers Moneroo — le statut final arrive via webhook ou /payment/return.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (rawAmount < 500) return

    setIsSubmitting(true)
    try {
      const result = await createPayment({
        data: {
          amount: rawAmount,
          recipientName,
          recipientPhone: recipientPhone || 'Non spécifié',
          note: note.trim() || undefined,
        },
      })

      // Redirection vers Moneroo. Le retour se fait sur /payment/return?paymentId=...
      window.location.href = result.checkoutUrl
    } catch (err) {
      setSubmitError((err as Error).message || 'Une erreur est survenue. Veuillez réessayer.')
      setIsSubmitting(false)
    }
  }

  const noRecipients = !loadingRecipients && recentRecipients.length === 0

  return (
    <DashboardLayout
      title="Envoyer de l'argent"
      eyebrow="Passerelle instantanée · Transfert direct"
    >
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="btn btn-ghost btn-sm gap-2 rounded-full px-3 text-base-content/70 hover:text-base-content"
          >
            <ArrowLeft className="size-4" />
            <span>Retour au tableau de bord</span>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-bold text-base-content/50 sm:flex">
            <ShieldCheck className="size-4 text-primary" />
            <span>Passerelle directe sécurisée</span>
          </div>
        </div>


        {/* Message d'erreur si createPayment échoue */}
        {submitError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
            {/* Form Column */}
            <div className="space-y-6 rounded-[2.5rem] border border-base-200/80 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:p-8">
              <div className="border-b border-base-200 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <Send className="size-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight">
                      Nouveau transfert
                    </h2>
                    <p className="text-xs text-base-content/55 sm:text-sm">
                      Envoyez des fonds directement sans rechargement préalable.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Recipient */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
                      1. Destinataire
                    </label>
                    <div className="flex gap-1 rounded-xl bg-base-200 p-1 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setRecipientType('contact')}
                        className={`rounded-lg px-2.5 py-1 transition ${
                          recipientType === 'contact'
                            ? 'bg-base-100 text-primary shadow-sm'
                            : 'text-base-content/60 hover:text-base-content'
                        }`}
                      >
                        Récents
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientType('custom')}
                        className={`rounded-lg px-2.5 py-1 transition ${
                          recipientType === 'custom'
                            ? 'bg-base-100 text-primary shadow-sm'
                            : 'text-base-content/60 hover:text-base-content'
                        }`}
                      >
                        Nouveau numéro
                      </button>
                    </div>
                  </div>

                  {recipientType === 'contact' ? (
                    loadingRecipients ? (
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-20 animate-pulse rounded-2xl border border-base-200 bg-base-200"
                          />
                        ))}
                      </div>
                    ) : noRecipients ? (
                      /* Empty state destinataires */
                      <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-base-300 bg-base-50 p-6 text-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-base-200 text-base-content/40">
                          <UserX className="size-6" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-base-content">
                            Aucun destinataire
                          </p>
                          <p className="mt-0.5 text-xs text-base-content/55">
                            Vous n'avez encore envoyé de l'argent à personne. Utilisez "Nouveau numéro" pour envoyer directement.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRecipientType('custom')}
                          className="btn btn-outline btn-sm rounded-2xl gap-2 font-bold"
                        >
                          Saisir un numéro
                          <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {recentRecipients.slice(0, 4).map((r, idx) => {
                            const isSelected = selectedRecipientPhone === r.phone
                            const colorCls = AVATAR_COLORS[idx % AVATAR_COLORS.length]
                            return (
                              <button
                                key={r.phone}
                                type="button"
                                onClick={() => setSelectedRecipientPhone(r.phone)}
                                className={`flex flex-col items-center rounded-2xl border p-3 text-center transition ${
                                  isSelected
                                    ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                                    : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/50'
                                }`}
                              >
                                <div
                                  className={`flex size-10 items-center justify-center rounded-xl text-xs font-extrabold ${colorCls}`}
                                >
                                  {getInitials(r.name)}
                                </div>
                                <span className="mt-2 w-full truncate text-xs font-bold text-base-content">
                                  {r.name.split(' ')[0]}
                                </span>
                                <span className="w-full truncate text-[10px] text-base-content/50">
                                  {r.phone.slice(-4)}
                                </span>
                              </button>
                            )
                          })}
                        </div>

                        <select
                          aria-label="Sélectionner un destinataire"
                          value={selectedRecipientPhone}
                          onChange={(e) => setSelectedRecipientPhone(e.target.value)}
                          className="select select-bordered w-full rounded-2xl text-sm font-medium"
                        >
                          {recentRecipients.map((r) => (
                            <option key={r.phone} value={r.phone}>
                              {r.name} ({r.phone})
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-base-content/60">
                          Nom du bénéficiaire
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                          <input
                            type="text"
                            placeholder="ex: Jean Dupont"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-base-content/60">
                          Numéro de téléphone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                          <input
                            type="tel"
                            placeholder="+242 06 000 00 00"
                            value={customPhone}
                            onChange={(e) => setCustomPhone(e.target.value)}
                            className="input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Amount */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
                      2. Montant à envoyer
                    </label>
                    <span className="text-xs font-semibold text-base-content/50">Min: 500 XAF</span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(rawAmount)}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="input input-bordered h-16 w-full rounded-2xl pr-20 text-3xl font-extrabold tracking-tight"
                      placeholder="0"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-base-200 px-3 py-1.5 text-xs font-extrabold text-base-content/80">
                      XAF
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {QUICK_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmountStr(amt.toString())}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                          rawAmount === amt
                            ? 'bg-primary text-primary-content shadow-sm'
                            : 'border border-base-200 bg-base-200/50 hover:bg-base-200 text-base-content/75'
                        }`}
                      >
                        +{formatNumber(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Passerelle de paiement */}
                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
                    3. Mode de règlement
                  </label>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content text-xs font-black uppercase">
                      MNR
                    </span>
                    <div>
                      <p className="font-bold text-sm text-base-content">Passerelle sécurisée Moneroo</p>
                      <p className="text-xs text-base-content/60">
                        Choix du moyen (Mobile Money, Carte) sur la page de paiement
                      </p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-base-content/60">
                    Motif ou message (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Cadeau, loyer, courses..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={rawAmount < 500 || isSubmitting || (recipientType === 'contact' && noRecipients && !selectedRecipientPhone)}
                    className="btn btn-primary h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      <>
                        Payer et envoyer{' '}
                        {rawAmount > 0 ? `${formatNumber(displayTotal)} XAF` : ''}
                        <ArrowRight className="size-5" />
                      </>
                    )}
                  </button>
                  <div className="mt-3.5 flex items-center justify-center gap-2 text-xs font-medium text-base-content/50">
                    <LockKeyhole className="size-3.5 text-primary" />
                    <span>Redirection sécurisée vers la passerelle Moneroo</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-[2.5rem] border border-base-200/80 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:p-7">
                <div className="mb-5 flex items-center justify-between border-b border-base-200 pb-4">
                  <h3 className="font-display font-bold text-lg text-base-content">
                    Récapitulatif en direct
                  </h3>
                  <span className="badge badge-primary badge-sm font-bold">Instantané</span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60">Destinataire</span>
                    <span className="font-bold text-right text-base-content truncate max-w-[180px]">
                      {recipientType === 'custom'
                        ? customName.trim() || '—'
                        : activeRecipient?.name || '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60">Passerelle</span>
                    <span className="font-bold text-base-content">Moneroo</span>
                  </div>

                  <div className="divider my-1" />

                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60">Montant envoyé</span>
                    <span className="font-bold text-base-content">{formatNumber(rawAmount)} XAF</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-base-content/60">
                      <span>Frais de passerelle</span>
                      <span className="badge badge-ghost badge-xs">Sandbox</span>
                    </div>
                    <span className="font-bold text-base-content">{formatNumber(displayFee)} XAF</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-base-200/60 p-3.5">
                    <div>
                      <span className="text-xs font-bold text-base-content/70 block">
                        Total à régler
                      </span>
                      <span className="text-[11px] text-base-content/50">
                        Via Moneroo Checkout
                      </span>
                    </div>
                    <span className="font-display text-xl font-extrabold text-primary">
                      {formatNumber(displayTotal)} XAF
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold px-1">
                    <span>Net prévu pour le bénéficiaire</span>
                    <span>{formatNumber(rawAmount)} XAF</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-6 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-base-content">Passerelle directe sans rétention</p>
                    <p className="text-xs leading-relaxed text-base-content/70">
                      NexPay connecte directement vos comptes opérateurs via Moneroo
                      sans stocker votre argent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-base-200 bg-base-100 p-5 text-xs text-base-content/60 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Zéro frais cachés, taux transparents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Validation sécurisée par Moneroo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Traçabilité immédiate dans votre historique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}
