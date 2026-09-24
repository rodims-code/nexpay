import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Globe2,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  User,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { useSession, signOut } from '#/lib/auth-client'
import { getUserProfile, updateUserProfile } from '#/lib/user.functions'
import type { User as DbUser } from '#/db/schema'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
})

const COUNTRIES = [
  { code: 'CG', name: 'Congo-Brazzaville', currency: 'XAF', flag: '🇨🇬' },
  { code: 'SN', name: 'Sénégal', currency: 'XOF', flag: '🇸🇳' },
  { code: 'CI', name: 'Côte d’Ivoire', currency: 'XOF', flag: '🇨🇮' },
  { code: 'CD', name: 'RDC (Congo-Kinshasa)', currency: 'CDF', flag: '🇨🇩' },
  { code: 'CM', name: 'Cameroun', currency: 'XAF', flag: '🇨🇲' },
  { code: 'GA', name: 'Gabon', currency: 'XAF', flag: '🇬🇦' },
]

export function SettingsPage() {
  const { data: session } = useSession()

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editTab, setEditTab] = useState<'profile' | 'country'>('profile')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Edit form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [countryCode, setCountryCode] = useState('CG')
  const [currency, setCurrency] = useState('XAF')

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

  const loadProfile = async () => {
    try {
      setLoading(true)
      const data = await getUserProfile()
      setProfile(data)
      setFirstName(data.firstName || '')
      setLastName(data.lastName || '')
      setPhone(data.phone || '')
      setBirthDate(data.birthDate || '')
      setCountryCode(data.countryCode || 'CG')
      setCurrency(data.currency || 'XAF')
    } catch (err: any) {
      console.error(err)
      // Fallback from session if available
      if (session?.user) {
        const u = session.user as any
        const fallback = {
          id: u.id,
          name: u.name,
          firstName: u.firstName || u.name?.split(' ')[0] || '',
          lastName: u.lastName || u.name?.split(' ').slice(1).join(' ') || '',
          phone: u.phone || '',
          email: u.email || '',
          birthDate: u.birthDate || '',
          countryCode: u.countryCode || 'CG',
          currency: u.currency || 'XAF',
        }
        setProfile(fallback)
        setFirstName(fallback.firstName)
        setLastName(fallback.lastName)
        setPhone(fallback.phone)
        setBirthDate(fallback.birthDate)
        setCountryCode(fallback.countryCode)
        setCurrency(fallback.currency)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [session?.user?.id])

  const handleCountryChange = (cCode: string) => {
    const c = COUNTRIES.find((item) => item.code === cCode)
    setCountryCode(cCode)
    if (c) {
      setCurrency(c.currency)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) {
      showNotification(undefined, 'Le prénom et le nom sont obligatoires')
      return
    }
    if (!phone.trim()) {
      showNotification(undefined, 'Le numéro de téléphone est obligatoire')
      return
    }

    try {
      setSubmitting(true)
      const updated = await updateUserProfile({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          birthDate: birthDate.trim(),
          countryCode: countryCode.trim(),
          currency: currency.trim(),
        },
      })
      setProfile(updated)
      showNotification('Vos informations ont été mises à jour avec succès !')
      setIsEditOpen(false)
    } catch (err: any) {
      showNotification(undefined, err.message || 'Erreur lors de la mise à jour')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/auth/login'
        },
      },
    })
  }

  const displayName = profile?.name || session?.user?.name || 'Utilisateur'
  const displayPhone = profile?.phone || (session?.user as any)?.phone || ''
  const displayEmail = profile?.email || session?.user?.email || ''
  const displayCountry =
    COUNTRIES.find((c) => c.code === (profile?.countryCode || 'CG'))?.name ||
    'Congo-Brazzaville'
  const displayCurrency = profile?.currency || 'XAF'

  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'NP'

  const settingsGroups = [
    {
      icon: UserRound,
      title: 'Informations personnelles',
      text: `${displayName} · ${displayPhone || displayEmail}`,
      action: () => {
        setEditTab('profile')
        setIsEditOpen(true)
      },
    },
    {
      icon: Globe2,
      title: 'Pays et devise de transfert',
      text: `${displayCountry} · ${displayCurrency}`,
      action: () => {
        setEditTab('country')
        setIsEditOpen(true)
      },
    },
    {
      icon: LockKeyhole,
      title: 'Sécurité et code secret',
      text: 'PIN de transfert, mot de passe et sessions actives',
      action: () => {
        showNotification('Votre session est chiffrée de bout en bout et protégée par votre code PIN.')
      },
    },
    {
      icon: Bell,
      title: 'Notifications et alertes SMS',
      text: 'Alertes instantanées à chaque envoi ou réception de fonds',
      action: () => {
        showNotification('Les notifications SMS sont automatiquement activées sur votre numéro principal.')
      },
    },
  ]

  return (
    <DashboardLayout title="Paramètres">
      <div className="mx-auto max-w-3xl space-y-6 pb-12">
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

        {/* User Card with Edit Action */}
        <div className="flex flex-col gap-5 rounded-[2.5rem] bg-primary p-6 text-primary-content shadow-xl shadow-primary/20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur-sm">
                {initials}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {displayName}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-primary-content/85 sm:text-sm">
                {displayPhone && (
                  <span className="flex items-center gap-1">
                    <Phone className="size-3.5" /> {displayPhone}
                  </span>
                )}
                {displayPhone && displayEmail && <span>•</span>}
                {displayEmail && (
                  <span className="flex items-center gap-1">
                    <Mail className="size-3.5" /> {displayEmail}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => {
                setEditTab('profile')
                setIsEditOpen(true)
              }}
              className="btn btn-sm rounded-xl border-white/20 bg-white/15 text-white hover:bg-white/25 gap-1.5 font-bold"
            >
              <Edit3 className="size-3.5" /> Modifier
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
              <CheckCircle2 className="size-3.5 text-emerald-300" />
              Vérifié
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-base-content/50">
              Prénom & Nom
            </span>
            <p className="mt-1 font-bold text-sm text-base-content truncate">
              {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : displayName}
            </p>
          </div>
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-base-content/50">
              Date de naissance
            </span>
            <p className="mt-1 font-bold text-sm text-base-content">
              {profile?.birthDate || 'Non renseignée'}
            </p>
          </div>
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-base-content/50">
              Pays & Devise
            </span>
            <p className="mt-1 font-bold text-sm text-base-content">
              {displayCountry} ({displayCurrency})
            </p>
          </div>
        </div>

        {/* Security & Direct Bridge Architecture Note */}
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-bold text-base-content">
                Statut du compte · Passerelle directe NexPay
              </p>
              <p className="mt-1 text-xs leading-relaxed text-base-content/70">
                Vos informations d’identité permettent de vous authentifier auprès des opérateurs partenaires (MTN MoMo, Airtel Money, etc.). Aucun dépôt bancaire n’est immobilisé sur NexPay.
              </p>
            </div>
          </div>
        </div>

        {/* Settings options list */}
        <section className="overflow-hidden rounded-[2.5rem] border border-base-200 bg-base-100 shadow-sm">
          {settingsGroups.map(({ icon: Icon, title, text, action }) => (
            <button
              key={title}
              type="button"
              onClick={action}
              className="flex w-full items-center gap-4 border-b border-base-200 p-5 text-left transition last:border-0 hover:bg-base-200/50"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-base-content text-sm sm:text-base">
                  {title}
                </p>
                <p className="truncate text-xs text-base-content/55 sm:text-sm">
                  {text}
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-base-content/30" />
            </button>
          ))}
        </section>

        {/* Sign Out CTA */}
        <div className="pt-2">
          <button
            onClick={handleSignOut}
            type="button"
            className="btn btn-outline btn-error w-full rounded-2xl gap-2 font-bold"
          >
            <LogOut className="size-4" /> Se déconnecter de la session
          </button>
        </div>

        {/* Modal: EDIT USER INFORMATION */}
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8">
              <button
                onClick={() => setIsEditOpen(false)}
                className="btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full"
              >
                <X className="size-5" />
              </button>

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-base-content">
                  Modifier mes informations
                </h3>
                <p className="text-xs text-base-content/60 mt-1">
                  Mettez à jour vos données d’identité et vos préférences de pays.
                </p>
              </div>

              {/* Tabs */}
              <div className="mb-5 flex rounded-2xl bg-base-200 p-1">
                <button
                  type="button"
                  onClick={() => setEditTab('profile')}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                    editTab === 'profile'
                      ? 'bg-base-100 text-primary shadow-sm'
                      : 'text-base-content/60 hover:text-base-content'
                  }`}
                >
                  Identité & Contact
                </button>
                <button
                  type="button"
                  onClick={() => setEditTab('country')}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                    editTab === 'country'
                      ? 'bg-base-100 text-primary shadow-sm'
                      : 'text-base-content/60 hover:text-base-content'
                  }`}
                >
                  Pays & Devise
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {editTab === 'profile' ? (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Votre prénom"
                          required
                          className="input input-bordered w-full rounded-2xl text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                          Nom de famille
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Votre nom"
                          required
                          className="input input-bordered w-full rounded-2xl text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Numéro de téléphone principal
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+242 06 123 45 67"
                          required
                          className="input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Date de naissance
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Pays de résidence
                      </label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {COUNTRIES.map((c) => {
                          const isSelected = countryCode === c.code
                          return (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleCountryChange(c.code)}
                              className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition ${
                                isSelected
                                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                                  : 'border-base-200 hover:bg-base-200/50'
                              }`}
                            >
                              <span className="text-xl">{c.flag}</span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold text-base-content">
                                  {c.name}
                                </p>
                                <p className="text-[10px] text-base-content/50">
                                  Devise: {c.currency}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Devise de compte
                      </label>
                      <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                        placeholder="XAF"
                        className="input input-bordered w-full rounded-2xl text-sm font-bold uppercase"
                      />
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="btn btn-ghost flex-1 rounded-2xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary flex-1 rounded-2xl font-bold"
                  >
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      'Enregistrer les modifications'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
