import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useDeferredValue,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import {
  getCountries,
  getCountryCallingCode,
  AsYouType,
  parsePhoneNumber,
  getExampleNumber,
  isValidPhoneNumber,
  type CountryCode,
} from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import flags from 'react-phone-number-input/flags'
import fr from 'react-phone-number-input/locale/fr.json'
import { SUPPORTED_COUNTRIES } from './mockAuth'

// Re-export des utilitaires de validation pour vos schémas Zod ou fonctions d'auth
export { isValidPhoneNumber, parsePhoneNumber, getCountryCallingCode, type CountryCode }

// Pays prioritaires épinglés en tête de liste (NexPay & partenaires fréquents)
const PRIORITY_COUNTRY_CODES: CountryCode[] = [
  'CG', // République du Congo
  'CD', // R.D. Congo
  'SN', // Sénégal
  'GA', // Gabon
  'CM', // Cameroun
  'CI', // Côte d'Ivoire
  'FR', // France
  'BE', // Belgique
  'US', // États-Unis
  'CA', // Canada
]

export interface CountryItem {
  code: CountryCode
  name: string
  callingCode: string
  searchString: string
}

export interface PhoneInputProps {
  /** Mode rétrocompatible (formulaires NexPay existants) */
  countryCode?: string
  phoneNumber?: string
  onCountryChange?: (code: string) => void
  onPhoneChange?: (val: string) => void
  onCallingCodeChange?: (callingCode: string) => void

  /** Mode standard unifié (format international E.164) */
  value?: string
  onChange?: (e164Value: string) => void
  defaultCountry?: CountryCode

  /** Props communes de formulaire */
  disabled?: boolean
  error?: boolean
  placeholder?: string
  id?: string
  name?: string
  autoFocus?: boolean
  className?: string
}

// Nettoyage des accents et casse pour une recherche fluide
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function PhoneInput({
  countryCode: propCountryCode,
  phoneNumber: propPhoneNumber,
  onCountryChange,
  onPhoneChange,
  onCallingCodeChange,
  value,
  onChange,
  defaultCountry = 'CG',
  disabled = false,
  error = false,
  placeholder,
  id,
  name,
  autoFocus,
  className = '',
}: PhoneInputProps) {
  // Détection du mode : Unifié (E.164) ou Séparé (historique)
  const isUnifiedMode = value !== undefined && onChange !== undefined

  // 1. Détermination du pays initial
  const initialCountry: CountryCode = useMemo(() => {
    if (propCountryCode && propCountryCode !== 'OTHER') {
      return propCountryCode.toUpperCase() as CountryCode
    }
    if (value) {
      try {
        const parsed = parsePhoneNumber(value)
        if (parsed?.country) return parsed.country
      } catch {
        // Ignorer si format incomplet au départ
      }
    }
    return defaultCountry
  }, [propCountryCode, value, defaultCountry])

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(initialCountry)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)
  const [focusedIndex, setFocusedIndex] = useState(0)

  // Références DOM
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Synchronisation descendante si le parent modifie countryCode
  useEffect(() => {
    if (propCountryCode && propCountryCode !== 'OTHER') {
      setSelectedCountry(propCountryCode.toUpperCase() as CountryCode)
    }
  }, [propCountryCode])

  // Synchronisation descendante si le parent modifie value (E.164)
  useEffect(() => {
    if (value) {
      try {
        const parsed = parsePhoneNumber(value)
        if (parsed?.country && parsed.country !== selectedCountry) {
          setSelectedCountry(parsed.country)
        }
      } catch {
        // Ignorer
      }
    }
  }, [value, selectedCountry])

  // 2. Indexation mémoïsée de tous les pays (~240 pays en français)
  const allCountries: CountryItem[] = useMemo(() => {
    const rawCountries = getCountries()
    const frMap = fr as Record<string, string>

    const list: CountryItem[] = rawCountries.map((code) => {
      let callingCode = ''
      try {
        callingCode = '+' + getCountryCallingCode(code)
      } catch {
        callingCode = ''
      }
      const countryName = frMap[code] || code
      const searchString = normalizeText(
        `${countryName} ${code} ${callingCode} ${callingCode.replace('+', '')}`
      )

      return {
        code,
        name: countryName,
        callingCode,
        searchString,
      }
    })

    // Tri : pays prioritaires d'abord, puis ordre alphabétique français
    return list.sort((a, b) => {
      const idxA = PRIORITY_COUNTRY_CODES.indexOf(a.code)
      const idxB = PRIORITY_COUNTRY_CODES.indexOf(b.code)

      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return a.name.localeCompare(b.name, 'fr')
    })
  }, [])

  // 3. Filtrage en temps réel optimisé
  const filteredCountries = useMemo(() => {
    if (!deferredSearch.trim()) {
      return allCountries
    }
    const query = normalizeText(deferredSearch)
    return allCountries.filter((c) => c.searchString.includes(query))
  }, [allCountries, deferredSearch])

  // Indicatif actuel
  const currentCallingCode = useMemo(() => {
    try {
      return '+' + getCountryCallingCode(selectedCountry)
    } catch {
      return '+242'
    }
  }, [selectedCountry])

  // Placeholder dynamique formaté selon les conventions du pays actif
  const dynamicPlaceholder = useMemo(() => {
    if (placeholder) return placeholder
    try {
      const mockC = SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountry)
      if (mockC?.placeholder) return mockC.placeholder

      const example = getExampleNumber(selectedCountry, examples)
      if (example) {
        return example.formatNational()
      }
    } catch {
      // Ignorer
    }
    return '06 123 4567'
  }, [selectedCountry, placeholder])

  // Valeur affichée dans le champ de saisie
  const displayPhone = useMemo(() => {
    if (isUnifiedMode) {
      if (!value) return ''
      try {
        const parsed = parsePhoneNumber(value, selectedCountry)
        if (parsed) {
          return parsed.formatNational()
        }
      } catch {
        // Fallback
      }
      return value.replace(currentCallingCode, '').trim()
    }

    const raw = propPhoneNumber || ''
    try {
      const formatter = new AsYouType(selectedCountry)
      return formatter.input(raw)
    } catch {
      return raw
    }
  }, [isUnifiedMode, value, propPhoneNumber, selectedCountry, currentCallingCode])

  // Sélection d'un pays
  const handleSelectCountry = (country: CountryCode) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchQuery('')

    let newCallingCode = ''
    try {
      newCallingCode = '+' + getCountryCallingCode(country)
    } catch {
      newCallingCode = '+242'
    }

    if (onCountryChange) onCountryChange(country)
    if (onCallingCodeChange) onCallingCodeChange(newCallingCode)

    if (isUnifiedMode && onChange) {
      const nationalDigits = displayPhone.replace(/\D/g, '')
      if (nationalDigits) {
        onChange(`${newCallingCode}${nationalDigits}`)
      }
    }

    setTimeout(() => {
      phoneInputRef.current?.focus()
    }, 50)
  }

  // Formatage à la volée pendant la frappe (As-You-Type)
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value

    const formatter = new AsYouType(selectedCountry)
    const formatted = formatter.input(rawInput)

    if (isUnifiedMode && onChange) {
      const nationalDigits = rawInput.replace(/\D/g, '')
      onChange(nationalDigits ? `${currentCallingCode}${nationalDigits}` : '')
    } else if (onPhoneChange) {
      onPhoneChange(formatted)
    }
  }

  // Détection automatique du pays au Copier-Coller (Smart Paste)
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (!pastedText) return

    const trimmed = pastedText.trim()
    if (trimmed.startsWith('+')) {
      try {
        const parsed = parsePhoneNumber(trimmed)
        if (parsed?.country) {
          e.preventDefault()
          setSelectedCountry(parsed.country)
          if (onCountryChange) onCountryChange(parsed.country)

          const newCalling = '+' + getCountryCallingCode(parsed.country)
          if (onCallingCodeChange) onCallingCodeChange(newCalling)

          const nationalFormatted = parsed.formatNational()
          if (isUnifiedMode && onChange) {
            onChange(parsed.number)
          } else if (onPhoneChange) {
            onPhoneChange(nationalFormatted)
          }
        }
      } catch {
        // Fallback vers le collage standard
      }
    }
  }

  // Gestion du clic extérieur pour fermer le popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  // Navigation complète au clavier (Flèches, Entrée, Échap)
  const handleKeyDownPopover = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const countryToSelect = filteredCountries[focusedIndex]
      if (countryToSelect) {
        handleSelectCountry(countryToSelect.code)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
      triggerButtonRef.current?.focus()
    }
  }

  useEffect(() => {
    setFocusedIndex(0)
  }, [deferredSearch])

  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeElement = listRef.current.children[focusedIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [focusedIndex, isOpen])

  const ActiveFlag = flags[selectedCountry]
  const frMap = fr as Record<string, string>
  const selectedCountryName = frMap[selectedCountry] || selectedCountry

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Conteneur principal avec style DaisyUI soigné et unifié */}
      <div
        className={`flex items-center w-full rounded-btn border transition-all ${
          error
            ? 'border-error ring-1 ring-error bg-base-100'
            : 'border-base-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-base-100'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-base-200/50' : ''}`}
      >
        {/* Trigger Popover Pays */}
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev)
              setSearchQuery('')
            }
          }}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Sélectionner un pays. Actuellement : ${selectedCountryName}`}
          className="btn btn-ghost h-12 min-h-12 px-3 border-r border-base-300 hover:bg-base-200/70 focus:outline-none flex items-center gap-2 font-medium shrink-0 rounded-l-btn rounded-r-none"
        >
          {/* Drapeau SVG au ratio 3:2 */}
          <span className="w-5 h-3.5 flex items-center justify-center shrink-0 overflow-hidden rounded-xs shadow-xs border border-base-content/10 bg-base-300">
            {ActiveFlag ? (
              <ActiveFlag title={selectedCountryName} />
            ) : (
              <span className="text-[10px] font-bold">{selectedCountry}</span>
            )}
          </span>

          {/* Indicatif téléphonique */}
          <span className="text-xs font-mono font-bold text-base-content tracking-tight">
            {currentCallingCode}
          </span>

          <ChevronsUpDown className="size-3.5 text-base-content/50 shrink-0" />
        </button>

        {/* Saisie du numéro de téléphone */}
        <input
          ref={phoneInputRef}
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          autoFocus={autoFocus}
          disabled={disabled}
          placeholder={dynamicPlaceholder}
          value={displayPhone}
          onChange={handlePhoneChange}
          onPaste={handlePaste}
          className="w-full h-12 px-3.5 bg-transparent border-0 font-bold text-base text-base-content placeholder:text-base-content/30 focus:outline-none rounded-r-btn"
        />
      </div>

      {/* Popover / Combobox de sélection de pays (100% responsive, overflow confiné) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Rechercher un pays"
          onKeyDown={handleKeyDownPopover}
          className="absolute left-0 top-full mt-1.5 z-50 w-full sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-box border border-base-300 bg-base-100 shadow-2xl p-2 text-base-content overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Barre de recherche */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              className="input input-sm input-bordered w-full pl-9 pr-3 text-xs bg-base-200/50 focus:bg-base-100 focus:border-primary focus:outline-none font-medium"
              placeholder="Rechercher un pays, code ou indicatif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filtrer les pays"
            />
          </div>

          {/* Liste déroulante des pays (sans classe .menu parasite, responsive et scroll propre) */}
          <div
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="max-h-64 overflow-y-auto overflow-x-hidden space-y-0.5 scrollbar-thin scrollbar-thumb-base-300 pr-1"
          >
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-base-content/50">
                Aucun pays trouvé pour "{searchQuery}"
              </div>
            ) : (
              filteredCountries.map((country, index) => {
                const Flag = flags[country.code]
                const isSelected = country.code === selectedCountry
                const isFocused = index === focusedIndex

                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCountry(country.code)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-btn transition-colors text-left ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-bold'
                        : isFocused
                          ? 'bg-base-200 text-base-content font-medium'
                          : 'text-base-content font-medium hover:bg-base-200/60'
                    }`}
                  >
                    {/* Drapeau SVG + Nom du pays tronqué proprement si besoin */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                      <span className="w-5 h-3.5 flex items-center justify-center shrink-0 overflow-hidden rounded-xs shadow-xs border border-base-content/10 bg-base-300">
                        {Flag ? (
                          <Flag title={country.name} />
                        ) : (
                          <span className="text-[9px] font-bold">
                            {country.code}
                          </span>
                        )}
                      </span>
                      <span className="text-xs truncate">{country.name}</span>
                    </div>

                    {/* Indicatif + Check icon (toujours bien alignés à droite à l'intérieur du popover) */}
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[11px] font-mono text-base-content/50">
                        {country.callingCode}
                      </span>
                      {isSelected ? (
                        <Check className="size-3.5 text-primary shrink-0" />
                      ) : (
                        <span className="size-3.5 shrink-0" />
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
