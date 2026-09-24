import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  LockKeyhole,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Smartphone,
  User,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { demoContacts } from '#/components/dashboard/dashboard-data'
import { useSession } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard/send')({
  component: SendPage,
})

const QUICK_AMOUNTS = [5000, 10000, 25000, 50000, 100000]

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

function SendPage() {
  const { data: session } = useSession()
  const userPhone = (session?.user as any)?.phone || '+242 06 123 45 67'

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      detail: userPhone,
      badge: 'MTN',
      badgeClass: 'bg-[#ffcc00] text-black',
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      detail: userPhone,
      badge: 'Airtel',
      badgeClass: 'bg-[#ed1c24] text-white',
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      detail: '•••• 4242 (Visa)',
      badge: 'VISA',
      badgeClass: 'bg-[#172b85] text-white',
    },
  ]

  // Form states
  const [recipientType, setRecipientType] = useState<'contact' | 'custom'>('contact')
  const [selectedContactPhone, setSelectedContactPhone] = useState(demoContacts[0].phone)
  const [customName, setCustomName] = useState('')
  const [customPhone, setCustomPhone] = useState('')
  const [amountStr, setAmountStr] = useState('10000')
  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods[0].id)
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentSuccessData, setSentSuccessData] = useState<{
    txId: string
    recipientName: string
    recipientPhone: string
    amount: number
    fee: number
    total: number
    methodName: string
    date: string
  } | null>(null)

  // Derived recipient data
  const activeContact = demoContacts.find((c) => c.phone === selectedContactPhone)
  const recipientName =
    recipientType === 'contact'
      ? activeContact?.name || 'Destinataire'
      : customName.trim() || 'Destinataire direct'
  const recipientPhone =
    recipientType === 'contact'
      ? activeContact?.phone || ''
      : customPhone.trim()

  const currentMethod =
    paymentMethods.find((m) => m.id === selectedMethodId) || paymentMethods[0]

  const rawAmount = parseInt(amountStr.replace(/\D/g, '') || '0', 10)
  // Transparent gateway fee: 2% of amount (min 200 XAF)
  const fee = rawAmount > 0 ? Math.max(200, Math.round(rawAmount * 0.02)) : 0
  const totalAmount = rawAmount + fee

  const handleAmountChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '')
    setAmountStr(cleaned)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rawAmount < 500) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const now = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date())

      setSentSuccessData({
        txId: `NP-${Math.floor(100000 + Math.random() * 900000)}`,
        recipientName,
        recipientPhone: recipientPhone || 'Non spécifié',
        amount: rawAmount,
        fee,
        total: totalAmount,
        methodName: currentMethod.name,
        date: now,
      })
    }, 600)
  }

  const resetForm = () => {
    setSentSuccessData(null)
    setAmountStr('10000')
    setNote('')
  }

  return (
    <DashboardLayout
      title="Envoyer de l’argent"
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

        {/* Success screen */}
        {sentSuccessData ? (
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-base-100 p-6 shadow-2xl sm:p-10">
            <div className="text-center">
              <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
                <Check className="size-10 stroke-[2.5]" />
              </div>
              <span className="badge badge-success badge-sm gap-1.5 font-bold uppercase tracking-wider text-white">
                <CheckCircle2 className="size-3" /> Transfert initié avec succès
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {formatNumber(sentSuccessData.amount)} XAF
              </h2>
              <p className="mt-2 text-sm text-base-content/65">
                Acheminement direct vers{' '}
                <strong className="text-base-content">
                  {sentSuccessData.recipientName}
                </strong>
                {sentSuccessData.recipientPhone && ` (${sentSuccessData.recipientPhone})`}
              </p>
            </div>

            {/* Transaction Receipt Card */}
            <div className="mt-8 rounded-3xl border border-base-200 bg-base-200/40 p-6 text-sm">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Référence transaction</span>
                  <span className="font-mono font-bold">{sentSuccessData.txId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Date et heure</span>
                  <span className="font-medium">{sentSuccessData.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Moyen de débit (Source)</span>
                  <span className="font-bold">{sentSuccessData.methodName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Mode de transfert</span>
                  <span className="badge badge-outline badge-primary font-bold">Passerelle directe</span>
                </div>
                <div className="divider my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Montant net transféré</span>
                  <span className="font-bold">{formatNumber(sentSuccessData.amount)} XAF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Frais de passerelle NexPay</span>
                  <span className="font-bold text-base-content">{formatNumber(sentSuccessData.fee)} XAF</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold">
                  <span>Total débité</span>
                  <span className="text-primary">{formatNumber(sentSuccessData.total)} XAF</span>
                </div>
              </div>
            </div>

            {/* Direct Bridge clarification */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-primary/5 p-4 text-xs text-base-content/75">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Les fonds transitent directement d’opérateur à opérateur en temps réel. Le destinataire reçoit une notification SMS instantanée dès la validation par son opérateur.
              </span>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={resetForm}
                className="btn btn-outline flex-1 rounded-2xl gap-2 font-bold"
              >
                <RotateCcw className="size-4" />
                Nouveau transfert
              </button>
              <Link
                to="/dashboard/transactions"
                className="btn btn-primary flex-1 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/25"
              >
                Voir les transactions
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Main Transfer Form Layout */
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
                      Envoyez des fonds directement sans rechargement de solde préalable.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Recipient Selection */}
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
                        Contacts
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
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {demoContacts.map((contact) => {
                          const isSelected = selectedContactPhone === contact.phone
                          return (
                            <button
                              key={contact.phone}
                              type="button"
                              onClick={() => setSelectedContactPhone(contact.phone)}
                              className={`flex flex-col items-center rounded-2xl border p-3 text-center transition ${
                                isSelected
                                  ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                                  : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/50'
                              }`}
                            >
                              <div
                                className={`flex size-10 items-center justify-center rounded-xl text-xs font-extrabold ${contact.color}`}
                              >
                                {contact.initials}
                              </div>
                              <span className="mt-2 w-full truncate text-xs font-bold text-base-content">
                                {contact.name.split(' ')[0]}
                              </span>
                              <span className="w-full truncate text-[10px] text-base-content/50">
                                {contact.phone.slice(-4)}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <select
                        aria-label="Sélectionner un contact"
                        value={selectedContactPhone}
                        onChange={(e) => setSelectedContactPhone(e.target.value)}
                        className="select select-bordered w-full rounded-2xl text-sm font-medium"
                      >
                        {demoContacts.map((contact) => (
                          <option key={contact.phone} value={contact.phone}>
                            {contact.name} ({contact.phone})
                          </option>
                        ))}
                      </select>
                    </div>
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

                {/* Step 2: Amount to Send */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
                      2. Montant à envoyer
                    </label>
                    <span className="text-xs font-semibold text-base-content/50">
                      Min: 500 XAF
                    </span>
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

                  {/* Quick amount chips */}
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

                {/* Step 3: Payment Method (Direct Debit Source) */}
                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
                    3. Moyen de paiement (Source débitée)
                  </label>
                  <div className="grid gap-2.5">
                    {paymentMethods.map((method) => {
                      const isSelected = selectedMethodId === method.id
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                              : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/40'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-black uppercase ${method.badgeClass}`}
                            >
                              {method.badge}
                            </span>
                            <div>
                              <p className="font-bold text-sm text-base-content">
                                {method.name}
                              </p>
                              <p className="text-xs text-base-content/50">
                                {method.detail}
                              </p>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isSelected}
                            onChange={() => setSelectedMethodId(method.id)}
                            className="radio radio-primary radio-sm"
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Optional Note */}
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

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={rawAmount < 500 || isSubmitting}
                    className="btn btn-primary h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      <>
                        Confirmer et envoyer {rawAmount > 0 ? `${formatNumber(totalAmount)} XAF` : ''}
                        <ArrowRight className="size-5" />
                      </>
                    )}
                  </button>
                  <div className="mt-3.5 flex items-center justify-center gap-2 text-xs font-medium text-base-content/50">
                    <LockKeyhole className="size-3.5 text-primary" />
                    <span>Sécurisé de bout en bout · Validation par PIN opérateur</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar Column: Live Recap & Bridge Information */}
            <div className="space-y-5">
              {/* Dynamic Live Summary Card */}
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
                      {recipientName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60">Moyen débité</span>
                    <span className="font-bold text-base-content">
                      {currentMethod.name.split(' ')[0]} ({currentMethod.badge})
                    </span>
                  </div>

                  <div className="divider my-1" />

                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60">Montant envoyé</span>
                    <span className="font-bold text-base-content">
                      {formatNumber(rawAmount)} XAF
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-base-content/60">
                      <span>Frais de passerelle</span>
                      <span className="badge badge-ghost badge-xs">NexPay</span>
                    </div>
                    <span className="font-bold text-base-content">
                      {formatNumber(fee)} XAF
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-base-200/60 p-3.5">
                    <div>
                      <span className="text-xs font-bold text-base-content/70 block">
                        Total à débiter
                      </span>
                      <span className="text-[11px] text-base-content/50">
                        Débité sur votre compte {currentMethod.badge}
                      </span>
                    </div>
                    <span className="font-display text-xl font-extrabold text-primary">
                      {formatNumber(totalAmount)} XAF
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold px-1">
                    <span>Montant net reçu par le bénéficiaire</span>
                    <span>{formatNumber(rawAmount)} XAF</span>
                  </div>
                </div>
              </div>

              {/* Legal & Architectural Bridge Card */}
              <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-6 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-base-content">
                      Passerelle directe sans rétention de fonds
                    </p>
                    <p className="text-xs leading-relaxed text-base-content/70">
                      NexPay n’est pas un compte de dépôt ou une banque. Nous connectons directement vos comptes opérateurs (MTN MoMo, Airtel, etc.) pour réaliser le pont sans stocker votre argent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="rounded-[2rem] border border-base-200 bg-base-100 p-5 text-xs text-base-content/60 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Zéro frais cachés, taux et montants transparents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Validation sécurisée par invite USSD / SMS sur votre mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Traçabilité immédiate dans votre historique</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
