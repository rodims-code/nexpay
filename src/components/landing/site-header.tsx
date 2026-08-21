import { Link } from '@tanstack/react-router'
import { ArrowRight, Menu } from 'lucide-react'

const navItems = [
  { label: 'Comment ça marche ?', href: '#how-it-works' },
  { label: 'Économies', href: '#savings' },
  { label: 'Afrique', href: '#africa-map' },
  { label: 'Contact', href: '#footer' },
]

export function SiteHeader() {
  return (
    <div className="navbar fixed top-0 z-50 border-b border-base-200/60 bg-base-100/85 px-4 backdrop-blur-xl lg:px-8">
      <div className="navbar-start gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
          <span className="text-lg font-black">N</span>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.35em] text-base-content/55">
            Nexpay
          </div>
          <div className="text-xs text-base-content/55">
            Paiements orchestrés à l’échelle du continent
          </div>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="rounded-full px-4 py-2">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <Link
          to="/auth/login"
          className="btn btn-ghost btn-sm hidden sm:inline-flex"
        >
          Se connecter
        </Link>
        <Link to="/auth/register" className="btn btn-primary btn-sm">
          Commencer
          <ArrowRight className="size-4" />
        </Link>
        <button
          className="btn btn-ghost btn-square btn-sm lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-5" />
        </button>
      </div>
    </div>
  )
}
