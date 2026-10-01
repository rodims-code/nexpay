import { createFileRoute, Link } from '@tanstack/react-router'
import {
  AlertCircle,
  CheckCircle2,
  Edit2,
  Loader2,
  Phone,
  Plus,
  Search,
  Send,
  Star,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  toggleFavoriteContact,
} from '#/lib/contacts.functions'
import type { Contact } from '#/db/schema'

export const Route = createFileRoute('/dashboard/contacts')({
  component: ContactsPage,
})

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

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add form
  const [addName, setAddName] = useState('')
  const [addPhone, setAddPhone] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [addFavorite, setAddFavorite] = useState(false)

  // Edit form
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editFavorite, setEditFavorite] = useState(false)

  const notify = (success?: string, error?: string) => {
    if (success) {
      setSuccessMsg(success)
      setTimeout(() => setSuccessMsg(null), 4000)
    }
    if (error) {
      setErrorMsg(error)
      setTimeout(() => setErrorMsg(null), 5000)
    }
  }

  const load = async () => {
    try {
      setLoading(true)
      const data = await getContacts()
      setContacts(data)
    } catch (err: any) {
      notify(undefined, err.message || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return contacts
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q),
    )
  }, [contacts, search])

  const openAdd = () => {
    setAddName('')
    setAddPhone('')
    setAddEmail('')
    setAddFavorite(false)
    setIsAddOpen(true)
  }

  const openEdit = (c: Contact) => {
    setEditingContact(c)
    setEditName(c.name)
    setEditPhone(c.phone)
    setEditEmail(c.email || '')
    setEditFavorite(c.favorite)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addName.trim() || !addPhone.trim()) {
      notify(undefined, 'Nom et numéro obligatoires')
      return
    }
    try {
      setSubmitting(true)
      await createContact({
        data: {
          name: addName.trim(),
          phone: addPhone.trim(),
          email: addEmail.trim() || undefined,
          favorite: addFavorite,
        },
      })
      notify('Contact ajouté !')
      setIsAddOpen(false)
      await load()
    } catch (err: any) {
      notify(undefined, err.message || 'Impossible d\'ajouter ce contact')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingContact) return
    if (!editName.trim() || !editPhone.trim()) {
      notify(undefined, 'Nom et numéro obligatoires')
      return
    }
    try {
      setSubmitting(true)
      await updateContact({
        data: {
          id: editingContact.id,
          name: editName.trim(),
          phone: editPhone.trim(),
          email: editEmail.trim() || undefined,
          favorite: editFavorite,
        },
      })
      notify('Contact modifié !')
      setEditingContact(null)
      await load()
    } catch (err: any) {
      notify(undefined, err.message || 'Erreur lors de la mise à jour')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setSubmitting(true)
      await deleteContact({ data: { id } })
      notify('Contact supprimé !')
      setDeletingId(null)
      await load()
    } catch (err: any) {
      notify(undefined, err.message || 'Erreur lors de la suppression')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleFavorite = async (c: Contact) => {
    try {
      await toggleFavoriteContact({ data: { id: c.id, favorite: !c.favorite } })
      await load()
    } catch {
      // silencieux
    }
  }

  return (
    <DashboardLayout title="Mes contacts">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <label className="input input-bordered flex flex-1 max-w-sm items-center gap-2 rounded-2xl">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              placeholder="Rechercher un contact…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow bg-transparent outline-none text-sm"
            />
          </label>
          <button onClick={openAdd} className="btn btn-primary rounded-2xl gap-2 font-bold">
            <Plus className="size-4" />
            Nouveau contact
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

        {/* Loading */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex h-24 animate-pulse items-center gap-4 rounded-3xl border border-base-200 bg-base-100 p-5"
              >
                <div className="size-12 rounded-2xl bg-base-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-base-200" />
                  <div className="h-3 w-1/3 rounded bg-base-200" />
                </div>
              </div>
            ))}
          </div>
        ) : contacts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-base-300 bg-base-100 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Users className="size-8" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-base-content">
                Aucun contact enregistré
              </h3>
              <p className="mt-1 text-sm text-base-content/55">
                Ajoutez vos destinataires fréquents pour envoyer de l'argent plus rapidement.
              </p>
            </div>
            <button onClick={openAdd} className="btn btn-primary rounded-2xl gap-2 font-bold">
              <Plus className="size-4" />
              Ajouter mon premier contact
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[2rem] border border-base-200 bg-base-100 py-12 text-center text-sm text-base-content/55">
            Aucun résultat pour «&nbsp;<strong>{search}</strong>&nbsp;»
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((c, idx) => {
              const colorCls = AVATAR_COLORS[idx % AVATAR_COLORS.length]
              return (
                <div
                  key={c.id}
                  className="card rounded-3xl border border-base-200 bg-base-100 shadow-sm transition hover:shadow-md"
                >
                  <div className="card-body flex-row items-center gap-4 p-5">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${colorCls}`}
                    >
                      {getInitials(c.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-base-content">{c.name}</h3>
                        {c.favorite && (
                          <Star className="size-3.5 shrink-0 fill-warning text-warning" />
                        )}
                      </div>
                      <p className="flex items-center gap-1 text-sm text-base-content/50">
                        <Phone className="size-3 shrink-0" />
                        {c.phone}
                      </p>
                      {c.email && (
                        <p className="text-xs text-base-content/40 mt-0.5 truncate">{c.email}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleToggleFavorite(c)}
                        title={c.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        className={`btn btn-ghost btn-square btn-sm rounded-xl ${
                          c.favorite
                            ? 'text-warning hover:text-warning/70'
                            : 'text-base-content/40 hover:text-warning'
                        }`}
                      >
                        <Star className={`size-4 ${c.favorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => openEdit(c)}
                        className="btn btn-ghost btn-square btn-sm rounded-xl text-base-content/50 hover:text-base-content"
                        title="Modifier"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(c.id)}
                        className="btn btn-ghost btn-square btn-sm rounded-xl text-error/60 hover:bg-error/10 hover:text-error"
                        title="Supprimer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <Link
                        to="/dashboard/send"
                        className="btn btn-primary btn-sm rounded-2xl gap-1 font-bold ml-1"
                        title="Envoyer"
                      >
                        <Send className="size-3.5" />
                        <span className="hidden sm:inline">Envoyer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <p className="text-xs text-base-content/40 text-right">
            {filtered.length} / {contacts.length} contact{contacts.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Modal: ADD */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsAddOpen(false)}
              className="btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-base-content">
                  Nouveau contact
                </h3>
                <p className="text-xs text-base-content/60">
                  Enregistrez un destinataire fréquent.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="ex: Marie Nkouanang"
                  required
                  className="input input-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                  placeholder="+242 06 000 00 00"
                  required
                  className="input input-bordered w-full rounded-2xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="ex: marie@example.com"
                  className="input input-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={addFavorite}
                  onChange={(e) => setAddFavorite(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm rounded-lg"
                />
                <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/80">
                  <Star className="size-3.5 text-warning" />
                  Marquer comme favori
                </span>
              </label>

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

      {/* Modal: EDIT */}
      {editingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setEditingContact(null)}
              className="btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full"
            >
              <X className="size-5" />
            </button>

            <div className="mb-6">
              <h3 className="font-display text-xl font-bold text-base-content">
                Modifier le contact
              </h3>
              <p className="text-xs text-base-content/60 mt-1">
                Mettez à jour les informations de ce destinataire.
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-2xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="input input-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={editFavorite}
                  onChange={(e) => setEditFavorite(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm rounded-lg"
                />
                <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/80">
                  <Star className="size-3.5 text-warning" />
                  Marquer comme favori
                </span>
              </label>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingContact(null)}
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

      {/* Modal: DELETE */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2.5rem] border border-base-200 bg-base-100 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-error/10 text-error">
              <Trash2 className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-base-content">
              Supprimer ce contact ?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-base-content/60">
              Cette action est irréversible. Le contact sera définitivement retiré de votre liste.
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
    </DashboardLayout>
  )
}
