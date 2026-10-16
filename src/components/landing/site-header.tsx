import { Link } from '@tanstack/react-router'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Comment ça marche ?', href: '#how-it-works' },
  { label: 'Le MVP', href: '#savings' },
  { label: 'Marchés envisagés', href: '#africa-map' },
  { label: 'Contact', href: '#footer' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="navbar fixed top-0 z-50 border-b border-base-200/60 bg-base-100/90 px-3.5 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="navbar-start gap-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center">
              <img src="/images/nexpay-icon.png" alt="NexPay" className="size-full object-contain" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-base-content">
                NexPay
              </div>
              <div className="hidden text-[11px] text-base-content/50 sm:block">
                Transferts simples pour l’Afrique
              </div>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-4 py-2 hover:bg-base-200/80">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-1.5 sm:gap-2">
          <Link
            to="/auth/login"
            className="btn btn-ghost btn-sm hidden font-bold sm:inline-flex rounded-xl"
          >
            Se connecter
          </Link>
          <Link to="/auth/register" className="btn btn-primary btn-sm rounded-xl font-bold gap-1.5 px-3 sm:px-4">
            <span>Commencer</span>
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            className="btn btn-ghost btn-square btn-sm rounded-xl lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[57px] z-40 border-b border-base-200 bg-base-100/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <ul className="menu gap-1 p-0 text-sm font-bold">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl py-3 px-4 hover:bg-base-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <div className="divider my-2" />
            <li>
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline btn-sm w-full rounded-xl justify-center font-bold"
              >
                Se connecter
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

