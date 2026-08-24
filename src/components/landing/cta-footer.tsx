import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Comment ça marche ?', href: '#how-it-works' },
  { label: 'Le MVP', href: '#savings' },
  { label: 'Marchés envisagés', href: '#africa-map' },
  { label: 'Connexion', href: '/auth/login' },
]

export function CtaFooterSection() {
  return (
    <section className="px-4 pb-10 pt-6 lg:px-8" id="footer">
      <div className="mx-auto max-w-7xl">
        <div className="card border border-base-200 bg-neutral text-neutral-content shadow-2xl shadow-neutral/10">
          <div className="card-body gap-8 p-8 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <span className="badge badge-outline border-neutral-content/20 text-neutral-content/80">
                  The future is here
                </span>
                <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Envoyez de l’argent à vos proches, avec une expérience pensée
                  pour les réalités africaines.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/auth/register" className="btn btn-primary btn-lg">
                  Commencer
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="mailto:hello@nexpay.africa"
                  className="btn btn-outline btn-lg"
                >
                  Parler à l’équipe
                </a>
              </div>
            </div>

            <div className="divider divider-neutral-content/10 m-0" />

            <footer className="footer items-start gap-8 text-neutral-content/75">
              <aside className="max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content">
                    <span className="font-black">N</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-neutral-content">
                      Nexpay
                    </div>
                    <p className="text-sm text-neutral-content/60">
                      Une expérience simple pour les transferts locaux et cross-border.
                    </p>
                  </div>
                </div>
              </aside>

              <nav>
                <h6 className="footer-title text-neutral-content">
                  Navigation
                </h6>
                {footerLinks.map((link) =>
                  link.href.startsWith('#') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="link link-hover"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="link link-hover"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>

              <nav>
                <h6 className="footer-title text-neutral-content">Réseaux</h6>
                <a
                  className="link link-hover flex items-center gap-2"
                  href="https://twitter.com"
                >
                  <ArrowUpRight className="size-4" />X / Twitter
                </a>
                <a
                  className="link link-hover flex items-center gap-2"
                  href="https://linkedin.com"
                >
                  <ArrowUpRight className="size-4" />
                  LinkedIn
                </a>
                <a
                  className="link link-hover flex items-center gap-2"
                  href="https://github.com"
                >
                  <ArrowUpRight className="size-4" />
                  GitHub
                </a>
              </nav>

              <nav>
                <h6 className="footer-title text-neutral-content">Légal</h6>
                <a
                  className="link link-hover flex items-center gap-2"
                  href="mailto:hello@nexpay.africa"
                >
                  <Mail className="size-4" />
                  hello@nexpay.africa
                </a>
                <a className="link link-hover" href="#">
                  Projet en sandbox
                </a>
                <a className="link link-hover" href="#">
                  Mentions réglementaires
                </a>
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
