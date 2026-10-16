import { Link, useLocation, useRouterState } from '@tanstack/react-router'
import {
  Bell,
  ChevronDown,
  CircleHelp,
  CreditCard,
  History,
  House,
  LogOut,
  Menu,
  Send,
  Settings,
  Users,
  WalletCards,
  X,
  Palette,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useSession, signOut } from '#/lib/auth-client'
import { SandboxBanner } from '#/components/sandbox-banner'
import { useTheme } from '#/lib/theme'

const navItems = [
  { label: 'Vue d’ensemble', to: '/dashboard', icon: House },
  { label: 'Envoyer de l’argent', to: '/dashboard/send', icon: Send },
  { label: 'Transactions', to: '/dashboard/transactions', icon: History },
  { label: 'Contacts', to: '/dashboard/contacts', icon: Users },
]
const manageItems = [
  {
    label: 'Moyens de paiement',
    to: '/dashboard/payment-methods',
    icon: CreditCard,
  },
  { label: 'Paramètres', to: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({
  children,
  title,
  eyebrow,
}: {
  children: ReactNode
  title: string
  eyebrow?: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { data: session } = useSession()
  const isNavigating = useRouterState({ select: (s) => s.status === 'pending' })
  const { theme, setTheme, themes } = useTheme()

  const userName = session?.user?.name || 'Mon Compte'
  const displayName =
    (session?.user as any)?.firstName || userName.split(' ')[0] || 'Utilisateur'
  const initials =
    userName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
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

  const links = (items: typeof navItems) =>
    items.map(({ label, to, icon: Icon }) => {
      const active =
        location.pathname === to ||
        (to !== '/dashboard' && location.pathname.startsWith(to))
      return (
        <li key={to}>
          <Link
            to={to}
            onClick={() => setMobileOpen(false)}
            className={`gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}`}
          >
            <Icon className="size-[18px]" strokeWidth={2.2} />
            {label}
          </Link>
        </li>
      )
    })

  return (
    <div className="h-screen overflow-hidden p-2 sm:p-4 lg:p-7">
      <div className="mx-auto flex h-full max-w-[1500px] gap-4">
        <aside
          className={`fixed inset-y-2 left-2 z-50 flex w-[280px] flex-col overflow-y-auto rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-2xl transition-transform duration-300 ease-out sm:inset-y-4 sm:left-4 lg:static lg:translate-x-0 lg:rounded-[2rem] lg:shadow-lg ${mobileOpen ? 'translate-x-0' : '-translate-x-[115%]'}`}
        >
          <div className="mb-6 flex items-center justify-between px-1">
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <img
                src="/images/nexpay-icon.png"
                alt="NexPay"
                className="size-10"
              />
              <div>
                <div className="font-display text-lg font-bold tracking-tight">
                  NexPay
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-base-content/40">
                  Move money simply
                </div>
              </div>
            </Link>
            <button
              className="btn btn-ghost btn-sm btn-square rounded-xl lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35">
            Menu principal
          </div>
          <ul className="menu gap-1 p-0">{links(navItems)}</ul>
          <div className="mb-3 mt-6 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35">
            Gérer
          </div>
          <ul className="menu gap-1 p-0">{links(manageItems)}</ul>
          <div className="mt-auto rounded-2xl bg-base-200/70 p-4">
            <div className="mb-1.5 flex items-center gap-2 text-sm font-bold">
              <CircleHelp className="size-4 text-primary" /> Besoin d’aide ?
            </div>
            <p className="mb-3 text-xs leading-relaxed text-base-content/50">
              Notre équipe est disponible pour vous accompagner.
            </p>
            <Link
              to="/aide"
              onClick={() => setMobileOpen(false)}
              className="btn btn-outline btn-primary btn-xs rounded-full"
            >
              Centre d’aide
            </Link>
          </div>
          <div className="mt-3">
            <SandboxBanner />
          </div>
          <button
            onClick={handleSignOut}
            className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-bold text-base-content/55 transition hover:bg-error/10 hover:text-error"
          >
            <LogOut className="size-[18px]" /> Se déconnecter
          </button>
        </aside>
        {mobileOpen && (
          <button
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          />
        )}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-base-300/60 bg-base-100/90 shadow-xl shadow-base-content/5 backdrop-blur-sm sm:rounded-[2rem]">
          <header className="flex min-h-[72px] shrink-0 items-center justify-between gap-2 border-b border-base-200/80 px-3.5 py-3 sm:min-h-[84px] sm:gap-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <button
                className="btn btn-ghost btn-square btn-sm shrink-0 rounded-xl lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </button>
              <div className="min-w-0 flex-1">
                {eyebrow && (
                  <div className="truncate text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary sm:text-xs">
                    {eyebrow}
                  </div>
                )}
                <h1 className="truncate font-display text-base font-bold tracking-tight sm:text-2xl lg:text-3xl">
                  {title}
                </h1>
              </div>
            </div> 

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              {/* Sélecteur de Thème */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm h-9 min-h-[36px] gap-1.5 rounded-xl border border-base-300/80 px-2 sm:px-3 font-semibold"
                  aria-label="Changer de thème"
                >
                  <Palette className="size-4 text-primary shrink-0" />
                  <span className="hidden text-xs sm:inline">
                    {themes.find((t) => t.id === theme)?.label ?? 'Thème'}
                  </span>
                  <ChevronDown className="size-3 opacity-60" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-50 mt-2 w-52 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-2xl"
                >
                  <li className="menu-title text-[10px] uppercase font-bold tracking-wider text-base-content/40 px-2 py-1">
                    Sélectionner un thème
                  </li>
                  {themes.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setTheme(t.id)
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur()
                          }
                        }}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${
                          theme === t.id
                            ? 'bg-primary text-primary-content font-bold'
                            : 'hover:bg-base-200 text-base-content'
                        }`}
                      >
                        <span>{t.label}</span>
                        {theme === t.id && (
                          <span className="badge badge-xs badge-neutral">Actif</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton Notifications */}
              <button
                className="btn btn-ghost btn-circle btn-sm h-9 w-9 min-h-[36px] relative rounded-xl"
                aria-label="Notifications"
              >
                <Bell className="size-4 sm:size-4.5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-secondary ring-2 ring-base-100" />
              </button>

              <div className="hidden h-6 w-px bg-base-300/80 sm:block" />

              {/* Profil Utilisateur */}
              <div className="dropdown dropdown-end">
                <button
                  className="flex items-center gap-2 rounded-xl p-1 hover:bg-base-200/80 sm:pr-2.5 transition"
                  aria-label="Menu profil"
                >
                  <div className="avatar placeholder">
                    <div className="w-8 sm:w-9 rounded-xl bg-primary text-[11px] sm:text-xs font-extrabold text-primary-content shadow-sm">
                      {initials}
                    </div>
                  </div>
                  <span className="hidden max-w-[120px] truncate text-xs font-bold sm:inline">
                    {displayName}
                  </span>
                  <ChevronDown className="hidden size-3.5 text-base-content/50 sm:block" />
                </button>
                <ul className="menu dropdown-content z-[60] mt-2 w-56 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl">
                  <li className="px-3 py-2 border-b border-base-200/60 mb-1">
                    <span className="font-bold text-base-content text-xs sm:text-sm truncate block p-0">
                      {userName}
                    </span>
                    <span className="text-[11px] text-base-content/50 font-normal truncate block p-0">
                      {(session?.user as any)?.phone ||
                        session?.user?.email ||
                        'Compte vérifié'}
                    </span>
                  </li>
                  <li>
                    <Link to="/dashboard/settings" className="font-medium text-xs sm:text-sm py-2">
                      <Settings className="size-4" /> Mon profil & paramètres
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-error font-medium text-xs sm:text-sm py-2"
                    >
                      <LogOut className="size-4" /> Se déconnecter
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main className="relative min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            {/* Overlay transition de navigation */}
            <div
              className={`pointer-events-none absolute inset-0 z-10 bg-base-100/60 backdrop-blur-[1px] transition-opacity duration-200 ${
                isNavigating ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              {isNavigating && (
                <div className="flex h-full items-center justify-center">
                  <span className="loading loading-ring loading-lg text-primary" />
                </div>
              )}
            </div>
            {children}
          </main>
        </section>
      </div>
    </div>
  )
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-lg font-bold">{children}</h2>
      {action}
    </div>
  )
}
export function EmptyState({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof WalletCards
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-dashed border-base-300 p-8 text-center">
      <Icon className="mx-auto mb-3 size-8 text-base-content/25" />
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm text-base-content/50">{text}</p>
    </div>
  )
}
