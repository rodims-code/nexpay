import { CtaFooterSection } from './cta-footer'
import { AfricaMapSection } from './africa-map'
import { HeroSection } from './hero'
import { HowItWorksSection } from './how-it-works'
import { ImpactBanner } from './impact-banner'
import { SiteHeader } from './site-header'
import { SavingsSection } from './savings-section'

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_46%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.12),transparent_30%)]" />
      <SiteHeader />
      <HeroSection />
      <ImpactBanner />
      <HowItWorksSection />
      <SavingsSection />
      <AfricaMapSection />
      <CtaFooterSection />
    </main>
  )
}
