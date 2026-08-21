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
}

export function AuthLayout({
  children,
  showBackButton = false,
  onBackClick,
  backButtonText = 'Retour',
  heroEyebrow = 'NexPay',
  heroTitle = 'Accédez à votre argent sans friction',
  heroDescription = "Une expérience d'authentification moderne, claire et sécurisée pour vos comptes et vos transactions.",
  heroImageSrc = '/images/auth-hero.svg',
  heroImageAlt = 'Illustration de la page d’authentification NexPay',
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_28%),linear-gradient(180deg,_hsl(var(--b1))_0%,_hsl(var(--b2))_100%)] font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-base-300/70 bg-base-100/90 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:min-h-[calc(100vh-3rem)] xl:grid-cols-[1.08fr_0.92fr]">
          {/* Visual panel */}
          <div className="relative hidden overflow-hidden bg-base-200/80 p-8 lg:flex lg:flex-col lg:justify-between xl:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_26%)]" />
            <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/25">
                  <span className="text-lg font-black">N</span>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-base-content/55">
                    NexPay
                  </div>
                  <div className="text-sm font-medium text-base-content/75">
                    Paiements et comptes
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                <ShieldCheck className="size-3.5" />
                <span>Sécurisé</span>
              </div>
            </div>

            <div className="relative z-10 mt-8 max-w-xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                {heroEyebrow}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-5xl xl:text-6xl">
                {heroTitle}
              </h1>
              <p className="max-w-lg text-sm leading-7 text-base-content/60 sm:text-base">
                {heroDescription}
              </p>
            </div>

            <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-base-300/70 bg-base-100/85 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-base-content/40">
                  Sécurité
                </p>
                <p className="mt-2 text-lg font-black text-base-content">
                  Authentification
                </p>
                <p className="mt-1 text-xs leading-relaxed text-base-content/50">
                  Flux protégés et lisibles.
                </p>
              </div>
              <div className="rounded-2xl border border-base-300/70 bg-base-100/85 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-base-content/40">
                  Expérience
                </p>
                <p className="mt-2 text-lg font-black text-base-content">
                  Interface claire
                </p>
                <p className="mt-1 text-xs leading-relaxed text-base-content/50">
                  Un écran simple à parcourir.
                </p>
              </div>
              <div className="rounded-2xl border border-base-300/70 bg-base-100/85 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-base-content/40">
                  Image
                </p>
                <p className="mt-2 text-lg font-black text-base-content">
                  /public/images
                </p>
                <p className="mt-1 text-xs leading-relaxed text-base-content/50">
                  Remplace le visuel en un seul fichier.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 overflow-hidden rounded-[2rem] border border-white/40 bg-base-100/85 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              <div className="relative grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-base-content/45">
                    Zone image
                  </p>
                  <p className="text-sm leading-6 text-base-content/65">
                    Mets ton image dans <span className="font-mono">public/images/auth-hero.png</span>.
                    Elle apparaîtra automatiquement ici.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[1.5rem] border border-base-300/60 bg-base-200">
                  {heroImageSrc ? (
                    <img
                      src={heroImageSrc}
                      alt={heroImageAlt}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-primary/15 via-base-100 to-secondary/15 text-center text-sm font-semibold text-base-content/55">
                      Ajoute ici ton visuel
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="relative flex min-h-[32rem] flex-col justify-between bg-base-100/95 p-5 sm:p-8 lg:p-10">
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-md shadow-primary/20">
                    <span className="text-sm font-black">N</span>
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

              <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                <ShieldCheck className="size-3.5" />
                <span>Sécurisé</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-1 items-center justify-center py-8">
              <div className="w-full max-w-[520px]">{children}</div>
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
