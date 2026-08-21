import { SUPPORTED_COUNTRIES } from './mockAuth'

interface CountrySelectorProps {
  value: string // country code e.g. 'CG', 'CD'
  onChange: (code: string) => void
  disabled?: boolean
  className?: string
}

export function CountrySelector({
  value,
  onChange,
  disabled = false,
  className = '',
}: CountrySelectorProps) {
  return (
    <select
      className={`select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-medium focus:border-primary focus:outline-none ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="" disabled>
        Sélectionnez votre pays
      </option>
      {SUPPORTED_COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.name} ({c.callingCode})
        </option>
      ))}
    </select>
  )
}
