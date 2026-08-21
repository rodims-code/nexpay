import React, { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { PhoneInput } from '#/components/auth/PhoneInput'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import {
  mockAuthService,
  phoneSchema,
  SUPPORTED_COUNTRIES,
  sanitizePhone,
} from '#/components/auth/mockAuth'

export const Route = createFileRoute('/auth/register/phone')({
  component: PhoneStep,
})

function PhoneStep() {
  const { registrationData, updateData, setOtpCode } = useRegister()
  const [phoneNumber, setPhoneNumber] = useState(registrationData.phoneNumber)
  const [countryCode, setCountryCode] = useState(registrationData.countryCode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)

    // Form schema validation
    const validation = phoneSchema.safeParse({
      countryCode,
      phone: phoneNumber,
    })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message)
      return
    }

    const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode)
    if (!country) return

    const sanitized = sanitizePhone(phoneNumber, country.callingCode)

    // Regex check based on country specific formatting rules
    if (!country.regex.test(sanitized)) {
      setError(
        `Format invalide pour le pays sélectionné. Ex: ${country.placeholder}`,
      )
      return
    }

    setLoading(true)
    try {
      const fullPhone = country.callingCode + sanitized

      // Check if phone number is already registered in DB
      const exists = await mockAuthService.checkPhoneExists(fullPhone)
      if (exists) {
        setError('Ce numéro de téléphone est déjà enregistré chez NexPay.')
        setLoading(false)
        return
      }

      // Simulate sending OTP and store code in context for step 5 access
      const code = await mockAuthService.sendOtp(fullPhone)
      setOtpCode(code)

      // Save form data into parent Context
      updateData({
        phoneNumber: sanitized,
        countryCode,
      })

      // Proceed to Step 2
      navigate({ to: '/auth/register/personal' })
    } catch (err) {
      setError('Une erreur de réseau est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Numéro de téléphone" required error={error}>
        <PhoneInput
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          onCountryChange={(code) => {
            setCountryCode(code)
            setError(undefined)
          }}
          onPhoneChange={(val) => {
            setPhoneNumber(val)
            setError(undefined)
          }}
          disabled={loading}
          error={!!error}
        />
      </FormField>

      <div className="text-[11px] text-base-content/40 leading-relaxed font-medium">
        En continuant, vous acceptez les{' '}
        <a href="#" className="underline font-bold hover:text-base-content/60">
          Conditions d'Utilisation
        </a>{' '}
        et la{' '}
        <a href="#" className="underline font-bold hover:text-base-content/60">
          Politique de Confidentialité
        </a>{' '}
        de NexPay.
      </div>

      <LoadingButton type="submit" loading={loading} className="w-full btn-md">
        Continuer
      </LoadingButton>

      <div className="text-center text-sm font-semibold text-base-content/60">
        Vous avez déjà un compte ?{' '}
        <Link to="/auth/login" className="link link-primary font-bold">
          Se connecter
        </Link>
      </div>
    </form>
  )
}
