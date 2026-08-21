import { useState, type FormEvent } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { AuthLayout } from '#/components/auth/AuthLayout'
import { AuthCard } from '#/components/auth/AuthCard'
import { PhoneInput } from '#/components/auth/PhoneInput'
import { PasswordInput } from '#/components/auth/PasswordInput'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { ErrorMessage } from '#/components/auth/ErrorMessage'
import {
  mockAuthService,
  loginSchema,
  SUPPORTED_COUNTRIES,
  sanitizePhone,
} from '#/components/auth/mockAuth'
import { Lock } from 'lucide-react'

export const Route = createFileRoute('/auth/login/')({
  component: LoginComponent,
})

function LoginComponent() {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('CG') // default to Congo
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(undefined)

    // Form schema validation
    const validation = loginSchema.safeParse({ countryCode, phone, password })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message)
      return
    }

    const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode)
    if (!country) return

    const sanitized = sanitizePhone(phone, country.callingCode)
    const fullPhone = country.callingCode + sanitized

    setLoading(true)
    try {
      const res = await mockAuthService.loginUser(fullPhone, password)

      if (!res.success) {
        if (res.errorType === 'not_found') {
          setError(
            "Ce numéro de téléphone n'est associé à aucun compte NexPay.",
          )
        } else if (res.errorType === 'incorrect_password') {
          setError('Mot de passe incorrect. Veuillez réessayer.')
        } else {
          setError('Compte temporairement bloqué ou inaccessible.')
        }
        setLoading(false)
        return
      }

      // Success, route to secure user dashboard
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError('Une erreur de réseau est survenue. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      heroEyebrow="Connexion"
      heroImageSrc="/images/afro-friends-having-fun-together-while-drinking-fruit-juice.jpg"
      logoNexPaySrc="/images/nexpay.png"
      logoNexPayAlt="Logo de NexPay"
      iconNexpaySrc="/images/nexpay-icon.png"
      
      heroImageAlt="Femme utilisant son téléphone pendant sa journée"
      heroTitle={
        <>
          Vos paiements,
          <br />
          toujours avec vous.
        </>
      }
      heroDescription="Retrouvez votre espace NexPay et gardez le contrôle de vos comptes, où que vous soyez."
    >
      <AuthCard
        title="RAVI DE VOUS REVOIR 😁"
        subtitle="Connectez-vous pour continuer vers votre espace NexPay."
      >
        {/* Test account notification */}
        <div className="alert alert-info mb-1 flex min-w-0 flex-col items-start gap-1 rounded-2xl border border-primary/15 bg-primary/10 p-3 text-[11px] font-bold leading-relaxed text-primary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-0">
          <span className="w-full sm:w-auto">💡 Compte démo pour test :</span>
          <span className="max-w-full break-words">
            Tél : <span className="underline">+242 06 123 45 67</span>
          </span>
          <span className="max-w-full break-words">
            MDP : <span className="underline">Password123!</span>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Numéro de téléphone"
            required
            error={error && error.includes('téléphone') ? error : undefined}
          >
            <PhoneInput
              countryCode={countryCode}
              phoneNumber={phone}
              onCountryChange={(code) => {
                setCountryCode(code)
                setError(undefined)
              }}
              onPhoneChange={(val) => {
                setPhone(val)
                setError(undefined)
              }}
              disabled={loading}
              error={error && error.includes('téléphone') ? true : false}
            />
          </FormField>

          <FormField
            label="Mot de passe"
            required
            error={error && error.includes('passe') ? error : undefined}
          >
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(undefined)
              }}
              disabled={loading}
              placeholder="Saisissez votre mot de passe"
              error={error && error.includes('passe') ? true : false}
            />
          </FormField>

          {error &&
            !error.includes('téléphone') &&
            !error.includes('passe') && <ErrorMessage message={error} />}

          <div className="flex items-center justify-between text-sm">
            <label className="label cursor-pointer justify-start gap-2 py-0">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox checkbox-primary checkbox-xs rounded-md"
                disabled={loading}
              />
              <span className="label-text font-bold text-base-content/55">
                Se souvenir de moi
              </span>
            </label>

            <Link
              to="/auth/forgot-password"
              className="link link-primary font-bold hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <LoadingButton
            type="submit"
            loading={loading}
            className="w-full btn-md"
          >
            Se connecter
          </LoadingButton>

          <div className="text-center text-sm font-semibold text-base-content/60">
            Nouveau sur NexPay ?{' '}
            <Link to="/auth/register" className="link link-primary font-bold">
              Créer un compte
            </Link>
          </div>

          {/* Security lock indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-base-content/40 font-bold">
            <Lock className="size-3.5 stroke-[2.5]" />
            <span>Votre connexion est entièrement sécurisée.</span>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
