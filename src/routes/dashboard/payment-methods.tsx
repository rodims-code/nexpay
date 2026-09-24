import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  Check,
  CheckCircle2,
  CreditCard,
  Edit2,
  Loader2,
  Plus,
  ShieldCheck,
  Smartphone,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from '#/lib/payment-methods.functions'
import { useSession } from '#/lib/auth-client'
import type { PaymentMethod } from '#/db/schema'

export const Route = createFileRoute('/dashboard/payment-methods')({
  component: PaymentMethodsPage,
})

const PROVIDERS = [
  { id: 'mtn', name: 'MTN Mobile Money', type: 'mobile_money', badge: 'MTN', badgeClass: 'bg-[#ffcc00] text-black font-extrabold' },
  { id: 'airtel', name: 'Airtel Money', type: 'mobile_money', badge: 'airtel', badgeClass: 'bg-[#ed1c24] text-white font-extrabold' },
  { id: 'visa', name: 'Carte Visa', type: 'card', badge: 'VISA', badgeClass: 'bg-[#172b85] text-white font-extrabold' },
  { id: 'mastercard', name: 'Mastercard', type: 'card', badge: 'MC', badgeClass: 'bg-[#eb001b] text-white font-extrabold' },
  { id: 'other', name: 'Autre compte bancaire', type: 'bank', badge: 'BANQUE', badgeClass: 'bg-base-300 text-base-content font-bold' },
]

function getProviderStyle(provider: string) {
  const found = PROVIDERS.find((p) => p.id === provider.toLowerCase())
  if (found) return found
  return {
    id: provider,
    name: provider,
    type: 'mobile_money',
    badge: provider.slice(0, 4).toUpperCase(),
    badgeClass: 'bg-primary/20 text-primary font-bold',
  }
}

function PaymentMethodsPage() {
  const { data: session } = useSession()
  const userPhone = (session?.user as any)?.phone || ''

  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Add form fields
  const [addProvider, setAddProvider] = useState('mtn')
  const [addName, setAddName] = useState('MTN Mobile Money')
  const [addAccountNumber, setAddAccountNumber] = useState(userPhone)
  const [addIsDefault, setAddIsDefault] = useState(false)

  // Edit form fields
  const [editProvider, setEditProvider] = useState('mtn')
  const [editName, setEditName] = useState('')
  const [editAccountNumber, setEditAccountNumber] = useState('')
  const [editIsDefault, setEditIsDefault] = useState(false)

  const showNotification = (success?: string, error?: string) => {
    if (success) {
      setSuccessMsg(success)
      setTimeout(() => setSuccessMsg(null), 4000)
    }
    if (error) {
      setErrorMsg(error)
      setTimeout(() => setErrorMsg(null), 5000)
    }
  }

  const loadMethods = async () => {
    try {
      setLoading(true)
      const data = await getPaymentMethods()
      setMethods(data)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Erreur lors du chargement des moyens de paiement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMethods()
  }, [])

  const handleProviderSelect = (provId: string, isEdit = false) => {
    const p = PROVIDERS.find((item) => item.id === provId)
    if (!p) return
    if (isEdit) {
      setEditProvider(p.id)
      if (!editName || PROVIDERS.some((item) => item.name === editName)) {
        setEditName(p.name)
      }
    } else {
      setAddProvider(p.id)
      setAddName(p.name)
      if (p.type === 'mobile_money' && userPhone && !addAccountNumber) {
        setAddAccountNumber(userPhone)
      }
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addName.trim() || !addAccountNumber.trim()) {
      showNotification(undefined, 'Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      setSubmitting(true)
      const prov = getProviderStyle(addProvider)
      await createPaymentMethod({
        data: {
          type: prov.type,
          provider: prov.id,
          name: addName.trim(),
          accountNumber: addAccountNumber.trim(),
          isDefault: addIsDefault,
        },
      })
      showNotification('Moyen de paiement ajouté avec succès !')
      setIsAddOpen(false)
      setAddAccountNumber(userPhone)
      setAddIsDefault(false)
      await loadMethods()
    } catch (err: any) {
      showNotification(undefined, err.message || 'Impossible d’ajouter ce moyen de paiement')
    } finally {
      setSubmitting(false)
    }
  }

  const openEditModal = (method: PaymentMethod) => {
    setEditingMethod(method)
    setEditProvider(method.provider)
    setEditName(method.name)
    setEditAccountNumber(method.accountNumber)
    setEditIsDefault(method.isDefault)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMethod) return
    if (!editName.trim() || !editAccountNumber.trim()) {
      showNotification(undefined, 'Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      setSubmitting(true)
      const prov = getProviderStyle(editProvider)
      await updatePaymentMethod({
        data: {
          id: editingMethod.id,
          type: prov.type,
          provider: prov.id,
          name: editName.trim(),
          accountNumber: editAccountNumber.trim(),
          isDefault: editIsDefault,
        },
      })
      showNotification('Moyen de paiement modifié avec succès !')
      setEditingMethod(null)
      await loadMethods()
    } catch (err: any) {
      showNotification(undefined, err.message || 'Erreur lors de la mise à jour')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setSubmitting(true)
      await deletePaymentMethod({ data: { id } })
      showNotification('Moyen de paiement supprimé avec succès !')
      setDeletingId(null)
      await loadMethods()
    } catch (err: any) {
      showNotification(undefined, err.message || 'Erreur lors de la suppression')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultPaymentMethod({ data: { id } })
      showNotification('Défini comme moyen de paiement principal')
      await loadMethods()
    } catch (err: any) {
      showNotification(undefined, err.message || 'Erreur lors du changement de moyen principal')
    }
  }

  return (
    <DashboardLayout title="Moyens de paiement">
      <div className="mx-auto max-w-3xl space-y-6 pb-12">
        {/* Header bar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-base-content sm:text-2xl">
              Vos comptes & cartes
            </h2>
            <p className="text-xs text-base-content/60 sm:text-sm">
              Enregistrez vos comptes MTN MoMo, Airtel ou cartes pour vos envois directs.
            </p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn btn-primary rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20"
          >
            <Plus className="size-4" /> Ajouter un moyen
          </button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="alert alert-success rounded-2xl text-sm font-semibold text-white shadow-md">
            <CheckCircle2 className="size-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-error rounded-2xl text-sm font-semibold text-white shadow-md">
            <AlertCircle className="size-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* List of Payment Methods */}
        <div className="space-y-3.5">
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex h-24 animate-pulse items-center gap-4 rounded-3xl border border-base-200 bg-base-100 p-5"
                >
                  <div className="size-12 rounded-2xl bg-base-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-base-300" />
                    <div className="h-3 w-1/2 rounded bg-base-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : methods.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-base-300 bg-base-100/50 p-10 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <CreditCard className="size-8" />
              </div>
              <h3 className="font-display text-lg font-bold">
                Aucun moyen de paiement enregistré
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-base-content/60 sm:text-sm">
                Ajoutez dès maintenant votre numéro MTN Mobile Money, Airtel Money ou votre carte bancaire pour initier des transferts instantanés.
              </p>
              <button
                onClick={() => setIsAddOpen(true)}
                className="btn btn-primary mt-6 rounded-2xl gap-2 font-bold"
              >
                <Plus className="size-4" /> Ajouter mon premier compte
              </button>
            </div>
          ) : (
            methods.map((method) => {
              const prov = getProviderStyle(method.provider)
              return (
                <div
                  key={method.id}
                  className={`flex flex-col gap-4 rounded-[2rem] border bg-base-100 p-5 shadow-sm transition sm:flex-row sm:items-center sm:justify-between ${
                    method.isDefault
                      ? 'border-primary/40 shadow-primary/5 ring-1 ring-primary/20'
                      : 'border-base-200 hover:border-base-300'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-xs uppercase shadow-sm ${prov.badgeClass}`}
                    >
                      {prov.badge}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-bold text-base text-base-content">
                          {method.name}
                        </p>
                        {method.isDefault && (
                          <span className="badge badge-primary badge-sm gap-1 rounded-full font-bold">
                            <Check className="size-3" /> Principal
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-base-content/60 font-medium">
                        {method.accountNumber}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="btn btn-ghost btn-sm rounded-xl gap-1 text-xs font-semibold text-base-content/70 hover:text-primary"
                        title="Définir comme moyen principal"
                      >
                        <Star className="size-3.5" />
                        <span className="hidden sm:inline">Par défaut</span>
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(method)}
                      className="btn btn-ghost btn-square btn-sm rounded-xl text-base-content/60 hover:text-base-content"
                      title="Modifier"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(method.id)}
                      className="btn btn-ghost btn-square btn-sm rounded-xl text-error/70 hover:bg-error/10 hover:text-error"
                      title="Supprimer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Security & Direct Bridge compliance alert */}
        <div className="alert rounded-3xl border-primary/20 bg-primary/5 text-sm">
          <ShieldCheck className="size-5 shrink-0 text-primary" />
          <div className="text-xs leading-relaxed text-base-content/75 sm:text-sm">
            <span className="font-bold text-base-content block mb-0.5">
              Passerelle directe sans rétention
            </span>
            Vos données de paiement servent uniquement de lien direct vers votre opérateur lors de vos transferts. NexPay n’héberge aucun fonds.
          </div>
        </div>

        {/* Modal: ADD Payment Method */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8">
              <button
                onClick={() => setIsAddOpen(false)}
                className="btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full"
              >
                <X className="size-5" />
              </button>

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-base-content">
                  Nouveau moyen de paiement
                </h3>
                <p className="text-xs text-base-content/60 mt-1">
                  Connectez votre compte mobile money ou carte pour vos transferts.
                </p>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {/* Provider selection buttons */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Opérateur / Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROVIDERS.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleProviderSelect(p.id)}
                        className={`flex items-center gap-2.5 rounded-2xl border p-2.5 text-left text-xs font-bold transition ${
                          addProvider === p.id
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                            : 'border-base-200 hover:bg-base-200/50'
                        }`}
                      >
                        <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-[10px] ${p.badgeClass}`}>
                          {p.badge}
                        </span>
                        <span className="truncate">{p.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name / Label */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Nom du moyen (Libellé)
                  </label>
                  <input
                    type="text"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    placeholder="ex: MTN Mobile Money Principal"
                    required
                    className="input input-bordered w-full rounded-2xl text-sm"
                  />
                </div>

                {/* Account / Phone Number */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Numéro de compte / téléphone / carte
                  </label>
                  <input
                    type="text"
                    value={addAccountNumber}
                    onChange={(e) => setAddAccountNumber(e.target.value)}
                    placeholder={addProvider === 'visa' || addProvider === 'mastercard' ? '•••• 4242' : '+242 06 123 45 67'}
                    required
                    className="input input-bordered w-full rounded-2xl text-sm font-medium"
                  />
                </div>

                {/* Is Default Checkbox */}
                <label className="flex cursor-pointer items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={addIsDefault}
                    onChange={(e) => setAddIsDefault(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm rounded-lg"
                  />
                  <span className="text-xs font-semibold text-base-content/80">
                    Définir comme moyen de paiement principal
                  </span>
                </label>

                {/* Actions */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="btn btn-ghost flex-1 rounded-2xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary flex-1 rounded-2xl font-bold"
                  >
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: EDIT Payment Method */}
        {editingMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8">
              <button
                onClick={() => setEditingMethod(null)}
                className="btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full"
              >
                <X className="size-5" />
              </button>

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-base-content">
                  Modifier le moyen de paiement
                </h3>
                <p className="text-xs text-base-content/60 mt-1">
                  Mettez à jour le nom ou le numéro de ce compte.
                </p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Provider selection buttons */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Opérateur / Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROVIDERS.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleProviderSelect(p.id, true)}
                        className={`flex items-center gap-2.5 rounded-2xl border p-2.5 text-left text-xs font-bold transition ${
                          editProvider === p.id
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                            : 'border-base-200 hover:bg-base-200/50'
                        }`}
                      >
                        <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-[10px] ${p.badgeClass}`}>
                          {p.badge}
                        </span>
                        <span className="truncate">{p.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name / Label */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Nom du moyen (Libellé)
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-2xl text-sm"
                  />
                </div>

                {/* Account / Phone Number */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Numéro de compte / téléphone / carte
                  </label>
                  <input
                    type="text"
                    value={editAccountNumber}
                    onChange={(e) => setEditAccountNumber(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-2xl text-sm font-medium"
                  />
                </div>

                {/* Is Default Checkbox */}
                <label className="flex cursor-pointer items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={editIsDefault}
                    onChange={(e) => setEditIsDefault(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm rounded-lg"
                  />
                  <span className="text-xs font-semibold text-base-content/80">
                    Définir comme moyen de paiement principal
                  </span>
                </label>

                {/* Actions */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingMethod(null)}
                    className="btn btn-ghost flex-1 rounded-2xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary flex-1 rounded-2xl font-bold"
                  >
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: DELETE Confirmation */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-[2.5rem] border border-base-200 bg-base-100 p-6 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-error/10 text-error">
                <Trash2 className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-base-content">
                Supprimer ce moyen de paiement ?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-base-content/60">
                Cette action retirera ce compte de vos options de paiement pour vos futurs transferts directs.
              </p>
              <div className="mt-6 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeletingId(null)}
                  className="btn btn-ghost flex-1 rounded-2xl"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleDelete(deletingId)}
                  className="btn btn-error flex-1 rounded-2xl font-bold text-white"
                >
                  {submitting ? <Loader2 className="size-4 animate-spin" /> : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
