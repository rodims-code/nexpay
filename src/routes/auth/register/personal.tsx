import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { personalSchema } from '#/components/auth/mockAuth'

export const Route = createFileRoute('/auth/register/personal')({
  component: PersonalStep,
})

function PersonalStep() {
  const { registrationData, updateData } = useRegister()
  const [firstName, setFirstName] = useState(registrationData.firstName || '')
  const [lastName, setLastName] = useState(registrationData.lastName || '')
  const [birthDate, setBirthDate] = useState(registrationData.birthDate || '')
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setLoading(true)

    // Form schema validation with birthDate age check
    const validation = personalSchema.safeParse({
      firstName,
      lastName,
      birthDate,
    })

    if (!validation.success) {
      setError(validation.error.issues[0]?.message)
      setLoading(false)
      return
    }

    // Save personal information and go to Step 3
    updateData({ firstName, lastName, birthDate })
    setLoading(false)
    navigate({ to: '/auth/register/country' })
  }

  const isUnderAge = error && error.includes('18 ans')

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Prénom" required>
          <input
            type="text"
            className="input input-bordered w-full font-bold focus:outline-none focus:border-primary"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            placeholder="Jean"
          />
        </FormField>

        <FormField label="Nom" required>
          <input
            type="text"
            className="input input-bordered w-full font-bold focus:outline-none focus:border-primary"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            placeholder="Mpemba"
          />
        </FormField>
      </div>

      <FormField
        label="Date de naissance"
        required
        description="Minimum 18 ans"
        error={error}
      >
        <input
          type="date"
          className={`input input-bordered w-full font-bold focus:outline-none focus:border-primary ${
            isUnderAge
              ? 'border-error text-error bg-error/5 focus:border-error'
              : ''
          }`}
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value)
            setError(undefined)
          }}
          disabled={loading}
        />
      </FormField>

      {isUnderAge && (
        <div className="alert alert-warning text-xs font-semibold rounded-2xl bg-warning/10 text-warning-content border border-warning/15 p-3.5 leading-relaxed">
          NexPay est actuellement disponible uniquement aux utilisateurs qui
          remplissent les conditions d'âge minimum (18 ans ou plus).
        </div>
      )}

      <LoadingButton
        type="submit"
        loading={loading}
        className="w-full btn-md mt-2"
      >
        Continuer
      </LoadingButton>
    </form>
  )
}
