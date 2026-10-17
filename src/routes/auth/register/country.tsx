import React, { useState, useEffect, useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRegister } from '#/components/auth/RegisterContext'
import { CountrySelector } from '#/components/auth/CountrySelector'
import { FormField } from '#/components/auth/FormField'
import { LoadingButton } from '#/components/auth/LoadingButton'
import { countrySchema } from '#/components/auth/mockAuth'
import { getCountryCurrency } from '#/components/auth/countriesData'

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

  // Détermination automatique et dynamique de la devise selon le pays
  const { code: autoCurrency, name: currencyName } = useMemo(() => {
    return getCountryCurrency(countryCode)
  }, [countryCode])

  useEffect(() => {
    setCurrency(autoCurrency)
  }, [autoCurrency])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setLoading(true)

    const effectiveCurrency = currency || autoCurrency
    const validation = countrySchema.safeParse({ countryCode, currency: effectiveCurrency })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message)
      setLoading(false)
      return
    }

    updateData({ countryCode, currency: effectiveCurrency })
    setLoading(false)
    navigate({ to: '/auth/register/security' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Pays de résidence" required error={error}>
        <CountrySelector
          value={countryCode}
          onChange={(code) => {
            setCountryCode(code)
            setError(undefined)
          }}
          onCurrencyChange={(curr) => setCurrency(curr)}
          disabled={loading}
          error={!!error}
        />
      </FormField>

      <div className="space-y-4">
        <FormField
          label="Devise de facturation (automatique)"
          description="Déterminée selon votre pays de résidence"
        >
          <div className="input input-bordered w-full font-bold bg-base-200 border-base-300 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span>🪙</span>
              <span className="font-mono text-primary font-extrabold text-base">
                {currency || autoCurrency}
              </span>
            </div>
            <span className="text-xs text-base-content/60 font-semibold">
              {currencyName}
            </span>
          </div>
        </FormField>

        <div className="alert alert-info text-xs font-semibold rounded-2xl bg-info/10 text-info border border-info/15 p-3.5 leading-relaxed">
          💡 Votre pays de résidence détermine les rails de paiement, les
          devises locales configurées, ainsi que les frais applicables sur
          votre compte NexPay.
        </div>
      </div>

      <LoadingButton type="submit" loading={loading} className="w-full btn-md">
        Continuer
      </LoadingButton>
    </form>
  )
}
