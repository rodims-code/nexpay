import { createFileRoute } from '@tanstack/react-router'
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Globe2,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { useSession, signOut } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
})

export function SettingsPage() {
  const { data: session } = useSession()

  const userName = session?.user?.name || 'Utilisateur'
  const userPhone = (session?.user as any)?.phone || ''
  const userEmail = session?.user?.email || ''
  const userCountry = (session?.user as any)?.countryCode === 'CG' ? 'Congo' : ((session?.user as any)?.countryCode || 'Congo')
  const userCurrency = (session?.user as any)?.currency || 'XAF'

  const initials =
    userName
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'NP'

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/auth/login'
        },
      },
    })
  }

  const settingsGroups = [
    {
      icon: UserRound,
      title: 'Informations personnelles',
      text: `${userName} · ${userPhone || userEmail}`,
    },
    {
      icon: LockKeyhole,
      title: 'Sécurité et code secret',
      text: 'PIN de transfert, mot de passe et sessions actives',
    },
    {
      icon: Globe2,
      title: 'Pays et devise de transaction',
      text: `${userCountry} · ${userCurrency}`,
    },
    {
      icon: Bell,
      title: 'Notifications et alertes',
      text: 'Alertes SMS et notifications instantanées par transfert',
    },
  ]

  return (
    <DashboardLayout title="Paramètres">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* User Card */}
        <div className="flex flex-col gap-5 rounded-[2rem] bg-primary p-6 text-primary-content shadow-xl shadow-primary/20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur-sm">
                {initials}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {userName}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-primary-content/80 sm:text-sm">
                {userPhone && (
                  <span className="flex items-center gap-1">
                    <Phone className="size-3.5" /> {userPhone}
                  </span>
                )}
                {userPhone && userEmail && <span>•</span>}
                {userEmail && (
                  <span className="flex items-center gap-1">
                    <Mail className="size-3.5" /> {userEmail}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold sm:self-center">
            <CheckCircle2 className="size-4 text-emerald-300" />
            Compte vérifié
          </div>
        </div>

        {/* Security & Direct Bridge Architecture Note */}
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-bold text-base-content">
                Statut de la passerelle NexPay
              </p>
              <p className="mt-1 text-xs leading-relaxed text-base-content/70">
                Votre compte est connecté à la passerelle directe. NexPay ne conserve aucun dépôt ou solde bancaire pour garantir la conformité et la sécurité de vos transferts directs.
              </p>
            </div>
          </div>
        </div>

        {/* Settings options list */}
        <section className="overflow-hidden rounded-[2rem] border border-base-200 bg-base-100 shadow-sm">
          {settingsGroups.map(({ icon: Icon, title, text }) => (
            <button
              key={title}
              type="button"
              className="flex w-full items-center gap-4 border-b border-base-200 p-5 text-left transition last:border-0 hover:bg-base-200/50"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-base-content">{title}</p>
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
      </div>
    </DashboardLayout>
  )
}
