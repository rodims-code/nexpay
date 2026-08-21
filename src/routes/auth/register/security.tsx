import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { PasswordInput } from '#/components/auth/PasswordInput'
import { PasswordStrength } from '#/components/auth/PasswordStrength'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { securitySchema } from '#/components/auth/mockAuth'

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Save security configuration
    updateData({ password })
    setLoading(false)

    // Move to step 5 to finalize phone verification
    navigate({ to: '/auth/register/verify' })
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
