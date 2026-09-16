import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { PasswordInput } from '#/components/auth/PasswordInput'
import { PasswordStrength } from '#/components/auth/PasswordStrength'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { securitySchema, SUPPORTED_COUNTRIES } from '#/components/auth/mockAuth'
import { authClient, phoneLoginEmail } from '#/lib/auth-client'

export const Route = createFileRoute('/auth/register/security')({
  component: SecurityStep,
})

function SecurityStep() {
  const { registrationData, updateData } = useRegister()
  const [password, setPassword] = useState(registrationData.password || '')
  const [confirmPassword, setConfirmPassword] = useState(
    registrationData.password || '',
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setLoading(true)

    // Form schema validation with password complexity matching
    const validation = securitySchema.safeParse({ password, confirmPassword })
    if (!validation.success) {
      // Access errors inside refine block path
      setError(validation.error.issues[0]?.message)
      setLoading(false)
      return
    }

    const country = SUPPORTED_COUNTRIES.find(
      (item) => item.code === registrationData.countryCode,
    )
    if (
      !country ||
      !registrationData.firstName ||
      !registrationData.lastName ||
      !registrationData.birthDate ||
      !registrationData.currency
    ) {
      setError('Veuillez compléter les étapes précédentes avant de créer votre compte.')
      setLoading(false)
      return
    }

    updateData({ password })
    const phone = country.callingCode + registrationData.phoneNumber
    const { error: signUpError } = await authClient.signUp.email({
      name: `${registrationData.firstName} ${registrationData.lastName}`,
      email: phoneLoginEmail(phone),
      password,
      phone,
      countryCode: registrationData.countryCode,
      currency: registrationData.currency,
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      birthDate: registrationData.birthDate,
    })

    if (signUpError) {
      setError(
        signUpError.code === 'USER_ALREADY_EXISTS'
          ? 'Ce numéro de téléphone est déjà enregistré chez NexPay.'
          : "Impossible de créer votre compte. Veuillez réessayer.",
      )
      setLoading(false)
      return
    }

    navigate({ to: '/dashboard' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Mot de passe" required error={error}>
        <PasswordInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(undefined)
          }}
          disabled={loading}
          placeholder="Définir un mot de passe"
        />
      </FormField>

      {password && <PasswordStrength password={password} />}

      <FormField label="Confirmer le mot de passe" required>
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setError(undefined)
          }}
          disabled={loading}
          placeholder="Ressaisir le mot de passe"
        />
      </FormField>

      <LoadingButton type="submit" loading={loading} className="w-full btn-md">
        Créer mon compte
      </LoadingButton>
    </form>
  )
}
