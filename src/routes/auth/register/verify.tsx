import React, { useState, useEffect } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { OtpInput } from '#/components/auth/OtpInput'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { ErrorMessage } from '#/components/auth/ErrorMessage'
import { SuccessMessage } from '#/components/auth/SuccessMessage'
import {
  mockAuthService,
  SUPPORTED_COUNTRIES,
  sanitizePhone,
} from '#/components/auth/mockAuth'

export const Route = createFileRoute('/auth/register/verify')({
  component: VerifyStep,
})

function VerifyStep() {
  const { registrationData, otpCode, setOtpCode } = useRegister()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const [timeLeft, setTimeLeft] = useState(60)

  const navigate = useNavigate()

  // Format phone number with spacing for readable presentation
  const country = SUPPORTED_COUNTRIES.find(
    (c) => c.code === registrationData.countryCode,
  )
  const callingCode = country ? country.callingCode : ''
  const sanitized = sanitizePhone(registrationData.phoneNumber, callingCode)
  const fullPhoneDisplay = `${callingCode} ${sanitized}`

  // 60-second countdown for SMS code requests
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setSuccess(undefined)

    if (code.length < 6) {
      setError('Veuillez saisir le code complet à 6 chiffres.')
      return
    }

    const fullPhone = callingCode + sanitized

    setLoading(true)
    try {
      // Validate OTP code against mock database entries
      const res = await mockAuthService.verifyOtp(fullPhone, code)

      if (!res.success) {
        if (res.errorType === 'expired') {
          setError(
            'Ce code de vérification a expiré. Veuillez en générer un nouveau.',
          )
        } else if (res.errorType === 'blocked') {
          setError(
            'Trop de tentatives incorrectes. Compte temporairement bloqué.',
          )
        } else {
          setError('Code incorrect. Veuillez vérifier le code et réessayer.')
        }
        setLoading(false)
        return
      }

      // Create new user credentials inside DB once verified
      const regRes = await mockAuthService.registerUser(registrationData)
      if (!regRes.success) {
        setError(regRes.error || 'Impossible de finaliser l’inscription.')
        setLoading(false)
        return
      }

      setSuccess('Votre numéro de téléphone a bien été vérifié.')

      // Brief delay to allow reading success alert message before moving to dashboard
      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 1500)
    } catch (err) {
      setError('Une erreur inconnue est survenue. Veuillez réessayer.')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError(undefined)
    setSuccess(undefined)
    setCode('')

    const fullPhone = callingCode + sanitized
    setLoading(true)
    try {
      const newCode = await mockAuthService.sendOtp(fullPhone)
      setOtpCode(newCode)
      setTimeLeft(60)
    } catch (err) {
      setError('Échec de la relance SMS. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <div className="text-center sm:text-left space-y-1">
        <p className="text-sm text-base-content/55 font-medium">
          Nous avons envoyé un code de vérification à 6 chiffres au :
        </p>
        <p className="text-base font-black text-base-content/85 tracking-wide">
          {fullPhoneDisplay}
        </p>
      </div>

      {/* Helper simulation dialog to allow quick testing of register flow */}
      {otpCode && !success && (
        <div className="alert alert-warning text-xs font-semibold rounded-2xl bg-warning/10 text-warning-content border border-warning/15 p-3 flex flex-col items-center gap-1">
          <span className="opacity-75 text-center">
            📱 CODE DE SIMULATION SMS :
          </span>
          <span className="text-xl font-black tracking-widest text-warning">
            {otpCode}
          </span>
        </div>
      )}

      <OtpInput
        value={code}
        onChange={(val) => {
          setCode(val)
          setError(undefined)
        }}
        disabled={loading || !!success}
        error={!!error}
      />

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}

      <div className="flex flex-col items-center gap-3 pt-2 text-sm font-semibold">
        <div className="text-base-content/50">
          {timeLeft > 0 ? (
            <span>
              Renvoyer le code dans{' '}
              <span className="text-primary font-bold">{timeLeft}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="link link-primary font-bold no-underline hover:underline"
              disabled={loading || !!success}
            >
              Renvoyer le code
            </button>
          )}
        </div>

        <Link
          to="/auth/register/phone"
          className="link link-hover text-xs text-base-content/40 hover:text-base-content/55 font-bold"
        >
          Changer de numéro de téléphone
        </Link>
      </div>

      <LoadingButton
        type="submit"
        loading={loading}
        disabled={!!success}
        className="w-full btn-md"
      >
        Vérifier et continuer
      </LoadingButton>
    </form>
  )
}
