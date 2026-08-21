import {
  createFileRoute,
  Outlet,
  useNavigate,
  useLocation,
} from '@tanstack/react-router'
import { AuthLayout } from '#/components/auth/AuthLayout'
import { AuthCard } from '#/components/auth/AuthCard'
import { ProgressIndicator } from '#/components/auth/ProgressIndicator'
import { RegisterProvider } from '#/components/auth/RegisterContext'

export const Route = createFileRoute('/auth/register')({
  component: RegisterLayout,
})

function RegisterLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const getStepDetails = (pathname: string) => {
    if (pathname.includes('/auth/register/phone')) {
      return {
        step: 1,
        title: 'Créer votre compte NexPay',
        subtitle:
          "Commencez par votre numéro de téléphone. Nous l'utiliserons pour sécuriser votre compte.",
      }
    }
    if (pathname.includes('/auth/register/personal')) {
      return {
        step: 2,
        title: 'Informations personnelles',
        subtitle:
          'Veuillez saisir vos détails personnels. Uniquement ce qui est requis pour le service.',
      }
    }
    if (pathname.includes('/auth/register/country')) {
      return {
        step: 3,
        title: 'Où résidez-vous ?',
        subtitle:
          'Votre pays détermine les devises et méthodes de paiement éligibles.',
      }
    }
    if (pathname.includes('/auth/register/security')) {
      return {
        step: 4,
        title: 'Sécuriser votre compte',
        subtitle:
          'Créez un mot de passe robuste pour protéger vos fonds et transactions.',
      }
    }
    if (pathname.includes('/auth/register/verify')) {
      return {
        step: 5,
        title: 'Vérifier votre téléphone',
        subtitle: '', // will build dynamic message inside step 5 with custom formatting
      }
    }
    return {
      step: 1,
      title: 'Créer votre compte NexPay',
      subtitle:
        "Commencez par votre numéro de téléphone. Nous l'utiliserons pour sécuriser votre compte.",
    }
  }

  const {
    step: currentStep,
    title,
    subtitle,
  } = getStepDetails(location.pathname)

  const handleBack = () => {
    if (currentStep === 2) navigate({ to: '/auth/register/phone' })
    else if (currentStep === 3) navigate({ to: '/auth/register/personal' })
    else if (currentStep === 4) navigate({ to: '/auth/register/country' })
    else if (currentStep === 5) navigate({ to: '/auth/register/security' })
  }

  return (
    <RegisterProvider>
      <AuthLayout
        showBackButton={currentStep > 1}
        onBackClick={handleBack}
        backButtonText="Étape précédente"
        heroEyebrow="Inscription"
        heroImageSrc="/images/industrial-designer-working-3d-model.jpg"
        heroImageAlt="Homme consultant son téléphone dans un espace de travail"
        heroTitle={
          <>
            Construis ton avenir
            <br />
            financier.
          </>
        }
        heroDescription="Créez votre compte NexPay et avancez avec une expérience pensée pour vos projets et vos paiements."
      >
        <AuthCard
          title={title}
          subtitle={
            <div className="space-y-4">
              <ProgressIndicator currentStep={currentStep} />
              {subtitle && (
                <div className="text-base-content/60 text-sm leading-relaxed">
                  {subtitle}
                </div>
              )}
            </div>
          }
        >
          <div className="mt-2">
            <Outlet />
          </div>
        </AuthCard>
      </AuthLayout>
    </RegisterProvider>
  )
}
