import { Link, useLocation } from '@tanstack/react-router'
import { Bell, ChevronDown, CircleHelp, CreditCard, History, House, LogOut, Menu, Send, Settings, Users, WalletCards, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

const navItems = [
  { label: 'Vue d’ensemble', to: '/dashboard', icon: House },
  { label: 'Envoyer de l’argent', to: '/dashboard/send', icon: Send },
  { label: 'Transactions', to: '/dashboard/transactions', icon: History },
  { label: 'Contacts', to: '/dashboard/contacts', icon: Users },
]
const manageItems = [
  { label: 'Moyens de paiement', to: '/dashboard/payment-methods', icon: CreditCard },
  { label: 'Paramètres', to: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children, title, eyebrow }: { children: ReactNode; title: string; eyebrow?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const links = (items: typeof navItems) => items.map(({ label, to, icon: Icon }) => {
    const active = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))
    return <li key={to}><Link to={to} onClick={() => setMobileOpen(false)} className={`gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}`}><Icon className="size-[18px]" strokeWidth={2.2} />{label}</Link></li>
  })

  return <div className="min-h-screen p-3 sm:p-5 lg:p-7"><div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1500px] gap-4 lg:min-h-[calc(100vh-3.5rem)]">
    <aside className={`fixed inset-y-3 left-3 z-50 flex w-[280px] flex-col rounded-[2rem] border border-base-300/70 bg-base-100 p-5 shadow-xl shadow-base-content/5 transition-transform sm:inset-y-5 sm:left-5 lg:static lg:translate-x-0 lg:shadow-lg ${mobileOpen ? 'translate-x-0' : '-translate-x-[115%]'}`}>
      <div className="mb-8 flex items-center justify-between px-2"><Link to="/dashboard" className="flex items-center gap-3"><img src="/images/nexpay-icon.png" alt="NexPay" className="size-11" /><div><div className="font-display text-lg font-bold tracking-tight">NexPay</div><div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-base-content/40">Move money simply</div></div></Link><button className="btn btn-ghost btn-sm btn-square lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"><X className="size-5" /></button></div>
      <div className="mb-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35">Menu principal</div><ul className="menu gap-1 p-0">{links(navItems)}</ul>
      <div className="mb-3 mt-8 px-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35">Gérer</div><ul className="menu gap-1 p-0">{links(manageItems)}</ul>
      <div className="mt-auto rounded-3xl bg-base-200/70 p-4"><div className="mb-2 flex items-center gap-2 text-sm font-bold"><CircleHelp className="size-4 text-primary" /> Besoin d’aide ?</div><p className="mb-3 text-xs leading-relaxed text-base-content/50">Notre équipe est disponible pour vous accompagner.</p><button className="btn btn-outline btn-primary btn-xs rounded-full">Centre d’aide</button></div>
      <button className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-base-content/55 hover:bg-base-200"><LogOut className="size-[18px]" /> Se déconnecter</button>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-40 bg-base-content/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu" />}
    <section className="min-w-0 flex-1 rounded-[2rem] border border-base-300/60 bg-base-100/80 shadow-xl shadow-base-content/5 backdrop-blur-sm"><header className="flex min-h-[92px] items-center justify-between gap-4 border-b border-base-200/80 px-5 sm:px-8"><div className="flex items-center gap-3"><button className="btn btn-ghost btn-square lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"><Menu className="size-5" /></button><div><div className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{eyebrow ?? 'Espace personnel'}</div><h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1></div></div><div className="flex items-center gap-2 sm:gap-4"><button className="btn btn-ghost btn-circle relative"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-secondary ring-2 ring-base-100" /></button><div className="hidden h-8 w-px bg-base-300 sm:block" /><div className="dropdown dropdown-end"><button className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-base-200"><div className="avatar placeholder"><div className="w-9 rounded-full bg-primary text-xs font-extrabold text-primary-content">DR</div></div><span className="hidden text-sm font-bold sm:inline">Dieuveil</span><ChevronDown className="size-4 text-base-content/50" /></button><ul className="menu dropdown-content z-[1] mt-3 w-48 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl"><li><Link to="/dashboard/settings">Mon profil</Link></li><li><button>Se déconnecter</button></li></ul></div></div></header><main className="p-5 sm:p-8">{children}</main></section>
  </div></div>
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) { return <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-display text-lg font-bold">{children}</h2>{action}</div> }
export function EmptyState({ icon: Icon, title, text }: { icon: typeof WalletCards; title: string; text: string }) { return <div className="rounded-3xl border border-dashed border-base-300 p-8 text-center"><Icon className="mx-auto mb-3 size-8 text-base-content/25" /><p className="font-bold">{title}</p><p className="mt-1 text-sm text-base-content/50">{text}</p></div> }
