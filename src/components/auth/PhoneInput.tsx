import React from 'react'
import { SUPPORTED_COUNTRIES } from './mockAuth'

interface PhoneInputProps {
  countryCode: string
  phoneNumber: string
  onCountryChange: (code: string) => void
  onPhoneChange: (val: string) => void
  disabled?: boolean
  error?: boolean
  placeholder?: string
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryChange,
  onPhoneChange,
  disabled = false,
  error = false,
  placeholder,
}: PhoneInputProps) {
  const selectedCountry = SUPPORTED_COUNTRIES.find(
    (c) => c.code === countryCode,
  )

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    // Allow digits, spaces, and hyphens only
    val = val.replace(/[^\d\s-]/g, '')
    onPhoneChange(val)
  }

  return (
    <div className="join w-full">
      <select
        className={`select select-bordered join-item bg-base-200 border-base-300 font-bold px-3 text-center focus:outline-none focus:border-primary ${
          error ? 'border-error' : ''
        }`}
        value={countryCode}
        onChange={(e) => onCountryChange(e.target.value)}
        disabled={disabled}
        aria-label="Code pays"
      >
        {SUPPORTED_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.callingCode}
          </option>
        ))}
      </select>
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
  )
}
