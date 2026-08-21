import React, { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { AuthLayout } from '#/components/auth/AuthLayout'
import { AuthCard } from '#/components/auth/AuthCard'
import { PhoneInput } from '#/components/auth/PhoneInput'
import { PasswordInput } from '#/components/auth/PasswordInput'
import { OtpInput } from '#/components/auth/OtpInput'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { ErrorMessage } from '#/components/auth/ErrorMessage'
import { SuccessMessage } from '#/components/auth/SuccessMessage'
import {
  mockAuthService,
  SUPPORTED_COUNTRIES,
  sanitizePhone,
} from '#/components/auth/mockAuth'

export const Route = createFileRoute('/auth/forgot-password/')({
  component: ForgotPasswordComponent,
})

function ForgotPasswordComponent() {
  const [step, setStep] = useState(1) // 1 = Phone search, 2 = Code + New password
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('CG')
  const [otpCode, setOtpCode] = useState('')
  const [mockOtp, setMockOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode)
  const callingCode = country ? country.callingCode : ''
  const sanitized = sanitizePhone(phone, callingCode)
  const fullPhone = callingCode + sanitized

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)

    if (!phone) {
      setError('Veuillez saisir votre numéro de téléphone.')
      return
    }

    setLoading(true)
    try {
      const exists = await mockAuthService.checkPhoneExists(fullPhone)
      if (!exists) {
        setError("Ce numéro de téléphone n'est pas associé à un compte NexPay.")
        setLoading(false)
        return
      }

      // Generate verification code for demo
      const code = await mockAuthService.sendOtp(fullPhone)
      setMockOtp(code)
      setStep(2)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setSuccess(undefined)

    if (otpCode !== mockOtp) {
      setError('Le code de vérification SMS est incorrect.')
      return
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    try {
      // Find existing user in memory db and rewrite password
      const userRes = await mockAuthService.loginUser(fullPhone)
      if (userRes.success && userRes.user) {
        const updatedUser = { ...userRes.user, password: newPassword }
        await mockAuthService.registerUser(updatedUser)
      }

      setSuccess('Votre mot de passe a bien été réinitialisé.')
      setTimeout(() => {
        navigate({ to: '/auth/login' })
      }, 1500)
    } catch (err) {
      setError(
        'Impossible de réinitialiser le mot de passe. Veuillez réessayer.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      showBackButton={step === 2}
      onBackClick={() => {
        setStep(1)
        setError(undefined)
        setOtpCode('')
      }}
      backButtonText="Retour"
    >
      <AuthCard
        title="Mot de passe oublié ?"
        subtitle={
          step === 1
            ? 'Entrez votre numéro de téléphone pour recevoir un code de réinitialisation.'
            : 'Veuillez renseigner le code SMS et choisir votre nouveau mot de passe.'
        }
      >
        {step === 1 ? (
          <form onSubmit={handleSendCode} className="space-y-6">
            <FormField label="Numéro de téléphone" required error={error}>
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
                error={!!error}
              />
            </FormField>

            <LoadingButton
              type="submit"
              loading={loading}
              className="w-full btn-md"
            >
              Continuer
            </LoadingButton>

            <div className="text-center text-sm font-semibold text-base-content/60">
              Retourner à la{' '}
              <Link to="/auth/login" className="link link-primary font-bold">
                page de connexion
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-xs text-base-content/55 font-bold">
                Code envoyé au {fullPhone}
              </p>
            </div>

            {mockOtp && !success && (
              <div className="alert alert-warning text-xs font-semibold rounded-2xl bg-warning/10 text-warning-content border border-warning/15 p-3 flex flex-col items-center gap-1">
                <span className="opacity-75">
                  📱 CODE SMS REÇU (Simulation) :
                </span>
                <span className="text-xl font-black tracking-widest text-warning">
                  {mockOtp}
                </span>
              </div>
            )}

            <FormField
              label="Code de validation"
              required
              error={error && error.includes('code') ? error : undefined}
            >
              <OtpInput
                value={otpCode}
                onChange={(val) => {
                  setOtpCode(val)
                  setError(undefined)
                }}
                disabled={loading || !!success}
                error={error && error.includes('code') ? true : false}
              />
            </FormField>

            <FormField
              label="Nouveau mot de passe"
              required
              error={error && error.includes('passe') ? error : undefined}
            >
              <PasswordInput
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setError(undefined)
                }}
                disabled={loading || !!success}
                placeholder="Saisissez un nouveau mot de passe"
                error={error && error.includes('passe') ? true : false}
              />
            </FormField>

            <FormField label="Confirmer le nouveau mot de passe" required>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setError(undefined)
                }}
                disabled={loading || !!success}
                placeholder="Confirmez votre mot de passe"
              />
            </FormField>

            {error && !error.includes('code') && !error.includes('passe') && (
              <ErrorMessage message={error} />
            )}
            {success && <SuccessMessage message={success} />}

            <LoadingButton
              type="submit"
              loading={loading}
              disabled={!!success}
              className="w-full btn-md"
            >
              Réinitialiser le mot de passe
            </LoadingButton>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  )
}
