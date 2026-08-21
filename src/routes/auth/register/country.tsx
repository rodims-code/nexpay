import React, { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { CountrySelector } from '#/components/auth/CountrySelector'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { countrySchema, SUPPORTED_COUNTRIES } from '#/components/auth/mockAuth'

export const Route = createFileRoute('/auth/register/country')({
  component: CountryStep,
})

function CountryStep() {
  const { registrationData, updateData } = useRegister()
  const [countryCode, setCountryCode] = useState(
    registrationData.countryCode || 'CG',
  )
  const [currency, setCurrency] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const navigate = useNavigate()

  // Update preferred currency automatically based on country code
  useEffect(() => {
    const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode)
    if (country) {
      setCurrency(country.currency)
    }
  }, [countryCode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setLoading(true)

    const validation = countrySchema.safeParse({ countryCode, currency })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message)
      setLoading(false)
      return
    }

    updateData({ countryCode, currency })
    setLoading(false)
    navigate({ to: '/auth/register/security' })
  }

  const selectedCountry = SUPPORTED_COUNTRIES.find(
    (c) => c.code === countryCode,
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Pays de résidence" required error={error}>
        <CountrySelector
          value={countryCode}
          onChange={(code) => {
            setCountryCode(code)
            setError(undefined)
          }}
          disabled={loading}
        />
      </FormField>

      {selectedCountry && (
        <div className="space-y-4">
          <FormField
            label="Devise de facturation (automatique)"
            description="Déterminée selon votre pays"
          >
            <div className="input input-bordered w-full font-bold bg-base-200 border-base-300 flex items-center gap-2 select-none">
              <span>🪙</span>
              <span>{selectedCountry.currency}</span>
              <span className="text-xs text-base-content/40 font-medium">
                (
                {selectedCountry.currency === 'CDF'
                  ? 'Franc Congolais'
                  : 'Franc CFA'}
                )
              </span>
            </div>
          </FormField>

          <div className="alert alert-info text-xs font-semibold rounded-2xl bg-info/10 text-info border border-info/15 p-3.5 leading-relaxed">
            💡 Votre pays de résidence détermine les rails de paiement, les
            devises locales configurées, ainsi que les frais applicables sur
            votre compte NexPay.
          </div>
        </div>
      )}

      <LoadingButton type="submit" loading={loading} className="w-full btn-md">
        Continuer
      </LoadingButton>
    </form>
  )
}
