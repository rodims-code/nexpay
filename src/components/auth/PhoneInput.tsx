import React, { useState, useEffect } from 'react'
import { SUPPORTED_COUNTRIES } from './mockAuth'
import { Globe, List } from 'lucide-react'

interface PhoneInputProps {
  countryCode: string
  phoneNumber: string
  onCountryChange: (code: string) => void
  onPhoneChange: (val: string) => void
  onCallingCodeChange?: (callingCode: string) => void
  disabled?: boolean
  error?: boolean
  placeholder?: string
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryChange,
  onPhoneChange,
  onCallingCodeChange,
  disabled = false,
  error = false,
  placeholder,
}: PhoneInputProps) {
  // Mode manuel vs mode liste
  const [isManual, setIsManual] = useState(countryCode === 'OTHER')
  const [manualCallingCode, setManualCallingCode] = useState('+')

  const selectedCountry = SUPPORTED_COUNTRIES.find(
    (c) => c.code === countryCode,
  )

  useEffect(() => {
    if (countryCode === 'OTHER') {
      setIsManual(true)
    }
  }, [countryCode])

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    // Allow digits, spaces, and hyphens only
    val = val.replace(/[^\d\s-]/g, '')
    onPhoneChange(val)
  }

  const handleManualCallingCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    // Toujours garder le '+' au début si tapé
    if (!val.startsWith('+')) {
      val = '+' + val.replace(/\+/g, '')
    }
    // Ne garder que le + et les chiffres (max 5 caractères, ex: +1, +242, +1246)
    val = '+' + val.slice(1).replace(/\D/g, '').slice(0, 4)
    setManualCallingCode(val)

    if (onCallingCodeChange) {
      onCallingCodeChange(val)
    }

    // Si l'indicatif correspond à un pays connu, on peut automatiquement synchroniser
    const matched = SUPPORTED_COUNTRIES.find((c) => c.callingCode === val)
    if (matched) {
      onCountryChange(matched.code)
    } else {
      onCountryChange('OTHER')
    }
  }

  const toggleManualMode = (manual: boolean) => {
    setIsManual(manual)
    if (manual) {
      const code = selectedCountry?.callingCode || '+242'
      setManualCallingCode(code)
      if (onCallingCodeChange) onCallingCodeChange(code)
    } else {
      // Revenir au pays par défaut si OTHER
      if (countryCode === 'OTHER') {
        onCountryChange('CG')
        if (onCallingCodeChange) onCallingCodeChange('+242')
      }
    }
  }

  return (
    <div className="w-full space-y-1.5">
      <div className="join w-full">
        {isManual ? (
          /* Saisie manuelle de l'indicatif */
          <div className="join-item relative flex items-center">
            <input
              type="text"
              className={`input input-bordered join-item w-28 bg-base-200 border-base-300 font-mono font-bold text-center px-2 focus:outline-none focus:border-primary ${
                error ? 'border-error' : ''
              }`}
              value={manualCallingCode}
              onChange={handleManualCallingCodeChange}
              placeholder="+242"
              maxLength={5}
              disabled={disabled}
              aria-label="Indicatif pays manuel"
            />
            <button
              type="button"
              onClick={() => toggleManualMode(false)}
              className="btn btn-ghost btn-xs btn-square absolute right-1 text-base-content/50 hover:text-base-content"
              title="Choisir dans la liste"
              disabled={disabled}
            >
              <List className="size-3.5" />
            </button>
          </div>
        ) : (
          /* Sélecteur de liste déroulante avec option Autre */
          <select
            className={`select select-bordered join-item bg-base-200 border-base-300 font-bold px-2 sm:px-3 text-center focus:outline-none focus:border-primary ${
              error ? 'border-error' : ''
            }`}
            value={countryCode}
            onChange={(e) => {
              const val = e.target.value
              if (val === 'OTHER') {
                toggleManualMode(true)
              } else {
                onCountryChange(val)
                const c = SUPPORTED_COUNTRIES.find((item) => item.code === val)
                if (c && onCallingCodeChange) {
                  onCallingCodeChange(c.callingCode)
                }
              }
            }}
            disabled={disabled}
            aria-label="Code pays"
          >
            {SUPPORTED_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.callingCode} ({c.code})
              </option>
            ))}
            <option value="OTHER">🌐 Autre (saisie manuelle)</option>
          </select>
        )}

        <input
          type="tel"
          className={`input input-bordered join-item w-full font-bold focus:outline-none focus:border-primary ${
            error ? 'border-error' : ''
          }`}
          placeholder={
            placeholder ||
            (selectedCountry ? selectedCountry.placeholder : '06 600 00 00')
          }
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          disabled={disabled}
        />
      </div>

      {/* Raccourci bascule discret sous le champ */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => toggleManualMode(!isManual)}
          className="text-[11px] text-base-content/60 hover:text-primary transition inline-flex items-center gap-1 font-semibold"
          disabled={disabled}
        >
          {isManual ? (
            <>
              <List className="size-3" />
              <span>Choisir un pays dans la liste</span>
            </>
          ) : (
            <>
              <Globe className="size-3" />
              <span>Saisir l'indicatif manuellement</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
