import React from 'react'
import { Link } from '@tanstack/react-router'
import { ShieldCheck, ArrowLeft } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  backButtonText?: string
  heroEyebrow?: string
  heroTitle?: React.ReactNode
  heroDescription?: React.ReactNode
  heroImageSrc?: string
  heroImageAlt?: string
  logoNexPaySrc?: string
  logoNexPayAlt?: string
  iconNexpaySrc?: string
  iconNexpayAlt?: string
}

export function AuthLayout({
  children,
  showBackButton = false,
  onBackClick,
  backButtonText = 'Retour',
  heroEyebrow = 'NexPay',
  heroTitle = 'Accédez à votre argent sans friction',
  heroDescription = "Une expérience d'authentification moderne, claire et sécurisée pour vos comptes et vos transactions.",
  heroImageSrc = '/images/afro-friends-having-fun-together-while-drinking-fruit-juice.jpg',
  logoNexPaySrc = '/images/nexpay.png',
  logoNexPayAlt = 'Logo de NexPay',
  iconNexpaySrc = '/images/nexpay-icon.png',
  iconNexpayAlt = 'Icône de NexPay',
  heroImageAlt = 'Illustration de la page d’authentification NexPay',
}: AuthLayoutProps) {
  return (
    <div className="relative h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_28%),linear-gradient(180deg,_hsl(var(--b1))_0%,_hsl(var(--b2))_100%)] font-sans">
      <div className="mx-auto flex h-dvh w-full p-10 items-center px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        <div className="grid h-full min-h-0 w-full overflow-hidden rounded-[2rem] border border-base-300/70 bg-base-100/90 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
          {/* Visual panel */}
          <div className="relative hidden min-h-0 overflow-hidden bg-neutral-950 lg:flex lg:flex-col">
            {heroImageSrc ? (
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-neutral-900 to-secondary/50" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
            <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/85 via-black/45 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_38%,black_100%)]" />

            <div className="relative z-10 flex items-center justify-between gap-4 p-8 xl:p-10">
              <Link to="/" className="flex items-center gap-3 text-white">
                <div className="flex h-16 w-auto items-center justify-center rounded-2xl overflow-visible shadow-xl">
                  <img
                    src={logoNexPaySrc}
                    alt={logoNexPayAlt}
                    className="block h-100 w-auto max-w-[180px]  object-contain object-center"
                  />
                </div>
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <ShieldCheck className="size-3.5" />
                <span>Sécurisé</span>
              </div>
            </div>

            <div className="relative z-10 mt-auto max-w-2xl space-y-4 p-8 text-white xl:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                {heroEyebrow}
              </p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl xl:text-6xl">
                {heroTitle}
              </h1>
              <p className="max-w-xl text-sm leading-7  text-white/75 sm:text-base">
                {heroDescription}
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="relative flex h-full  flex-col justify-between overflow-hidden bg-base-100/95 p-5 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_28%)] lg:hidden" />

            <div className="relative z-10 flex items-center justify-between gap-3">
              {showBackButton ? (
                <button
                  onClick={onBackClick}
                  className="btn btn-ghost btn-sm gap-2 rounded-full border border-base-300/70 bg-base-100/70 font-medium"
                >
                  <ArrowLeft className="size-4" />
                  {backButtonText}
                </button>
              ) : (
                <div className="flex items-center gap-2 lg:hidden">
                  <div className="flex">
                    <span className=""><img src={iconNexpaySrc} alt={iconNexpayAlt} className='w-20 h-20' /></span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/55">
                      NexPay
                    </div>
                    <div className="text-[11px] text-base-content/45">
                      Paiements et comptes
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-4 sm:py-6">
              <div className="max-h-full w-full max-w-[520px]">{children}</div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 border-t border-base-300/70 pt-4 text-center text-xs text-base-content/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p>© {new Date().getFullYear()} NexPay. Tous droits réservés.</p>
              <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
                <a
                  href="#"
                  className="transition-colors hover:text-base-content/75"
                >
                  Aide
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-base-content/75"
                >
                  Sécurité
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-base-content/75"
                >
                  Confidentialité
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
