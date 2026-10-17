import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useDeferredValue,
  type KeyboardEvent,
} from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import flags from 'react-phone-number-input/flags'
import fr from 'react-phone-number-input/locale/fr.json'
import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js'
import { getCountryCurrency, CURRENCY_NAMES } from './countriesData'

export interface CountryOption {
  code: CountryCode
  name: string
  callingCode: string
  currency: string
  currencyName: string
  searchString: string
}

interface CountrySelectorProps {
  value: string // code pays ISO, ex: 'CG', 'FR', 'CM'
  onChange: (code: string) => void
  onCurrencyChange?: (currency: string) => void
  disabled?: boolean
  error?: boolean
  className?: string
  id?: string
}

// Ordre de priorité des pays pour NexPay (Afrique centrale, Afrique de l'Ouest, partenaires majeurs)
const PRIORITY_COUNTRY_CODES: CountryCode[] = [
  'CG', // République du Congo (XAF)
  'CD', // R.D. Congo (CDF)
  'SN', // Sénégal (XOF)
  'GA', // Gabon (XAF)
  'CM', // Cameroun (XAF)
  'CI', // Côte d'Ivoire (XOF)
  'BJ', // Bénin (XOF)
  'TG', // Togo (XOF)
  'ML', // Mali (XOF)
  'BF', // Burkina Faso (XOF)
  'GN', // Guinée (GNF)
  'TD', // Tchad (XAF)
  'CF', // Centrafrique (XAF)
  'GQ', // Guinée équatoriale (XAF)
  'MA', // Maroc (MAD)
  'DZ', // Algérie (DZD)
  'TN', // Tunisie (TND)
  'RW', // Rwanda (RWF)
  'NG', // Nigeria (NGN)
  'GH', // Ghana (GHS)
  'KE', // Kenya (KES)
  'ZA', // Afrique du Sud (ZAR)
  'FR', // France (EUR)
  'BE', // Belgique (EUR)
  'US', // États-Unis (USD)
  'CA', // Canada (CAD)
  'CH', // Suisse (CHF)
  'GB', // Royaume-Uni (GBP)
]

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function CountrySelector({
  value,
  onChange,
  onCurrencyChange,
  disabled = false,
  error = false,
  className = '',
  id,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // 1. Liste complète et ordonnée de tous les pays avec devises
  const allCountries: CountryOption[] = useMemo(() => {
    const rawCodes = getCountries()
    const frMap = fr as Record<string, string>

    const list: CountryOption[] = rawCodes.map((code) => {
      let callingCode = ''
      try {
        callingCode = '+' + getCountryCallingCode(code)
      } catch {
        callingCode = ''
      }
      const countryName = frMap[code] || code
      const { code: currencyCode, name: currencyName } = getCountryCurrency(code)
      const searchString = normalizeText(
        `${countryName} ${code} ${callingCode} ${callingCode.replace('+', '')} ${currencyCode} ${currencyName}`
      )

      return {
        code,
        name: countryName,
        callingCode,
        currency: currencyCode,
        currencyName,
        searchString,
      }
    })

    // Tri prioritaire puis alphabétique
    return list.sort((a, b) => {
      const idxA = PRIORITY_COUNTRY_CODES.indexOf(a.code)
      const idxB = PRIORITY_COUNTRY_CODES.indexOf(b.code)

      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return a.name.localeCompare(b.name, 'fr')
    })
  }, [])

  // 2. Pays actuellement sélectionné
  const selectedCountry = useMemo(() => {
    const targetCode = value ? (value.toUpperCase() as CountryCode) : 'CG'
    return allCountries.find((c) => c.code === targetCode) || allCountries[0]
  }, [allCountries, value])

  // Notifier la devise lors du montage ou du changement
  useEffect(() => {
    if (selectedCountry && onCurrencyChange) {
      onCurrencyChange(selectedCountry.currency)
    }
  }, [selectedCountry, onCurrencyChange])

  // 3. Filtrage en direct par nom, code, indicatif ou devise
  const filteredCountries = useMemo(() => {
    if (!deferredSearch.trim()) {
      return allCountries
    }
    const query = normalizeText(deferredSearch)
    return allCountries.filter((c) => c.searchString.includes(query))
  }, [allCountries, deferredSearch])

  // Fermeture lors d'un clic extérieur
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

  // Navigation clavier fluide (Flèches, Entrée, Échap)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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
        handleSelect(countryToSelect)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  useEffect(() => {
    setFocusedIndex(0)
  }, [deferredSearch])

  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[focusedIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [focusedIndex, isOpen])

  const handleSelect = (country: CountryOption) => {
    onChange(country.code)
    if (onCurrencyChange) {
      onCurrencyChange(country.currency)
    }
    setIsOpen(false)
    setSearchQuery('')
    triggerRef.current?.focus()
  }

  const ActiveFlag = selectedCountry?.code ? flags[selectedCountry.code] : null

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Bouton déclencheur style DaisyUI */}
      <button
        ref={triggerRef}
        id={id}
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
        aria-label={`Sélectionner votre pays de résidence. Actuellement : ${selectedCountry?.name || 'Aucun'}`}
        className={`w-full h-12 px-3.5 rounded-btn border transition-all flex items-center justify-between text-left font-bold ${
          error
            ? 'border-error ring-1 ring-error bg-base-100'
            : 'border-base-300 bg-base-100 hover:bg-base-200/50 focus:border-primary focus:ring-1 focus:ring-primary'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-base-200/50' : ''}`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
          {/* Drapeau SVG au format vectoriel 3:2 */}
          <span className="w-5 h-3.5 flex items-center justify-center shrink-0 overflow-hidden rounded-xs shadow-xs border border-base-content/10 bg-base-300">
            {ActiveFlag ? (
              <ActiveFlag title={selectedCountry?.name || ''} />
            ) : (
              <span className="text-[10px] font-bold">{selectedCountry?.code}</span>
            )}
          </span>

          <span className="text-base text-base-content truncate">
            {selectedCountry?.name}
          </span>

          <span className="text-xs font-mono font-medium text-base-content/50 shrink-0">
            ({selectedCountry?.callingCode})
          </span>
        </div>

        {/* Badge de devise et chevrons */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {selectedCountry?.currency && (
            <span className="badge badge-sm badge-ghost font-mono text-[11px] font-bold text-primary">
              {selectedCountry.currency}
            </span>
          )}
          <ChevronsUpDown className="size-4 text-base-content/50" />
        </div>
      </button>

      {/* Popover déroulant complet (tous pays + devises, recherche rapide) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Rechercher votre pays de résidence"
          onKeyDown={handleKeyDown}
          className="absolute left-0 top-full mt-1.5 z-50 w-full sm:w-[400px] max-w-[calc(100vw-2rem)] rounded-box border border-base-300 bg-base-100 shadow-2xl p-2 text-base-content overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Champ de recherche */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              className="input input-sm input-bordered w-full pl-9 pr-3 text-xs bg-base-200/50 focus:bg-base-100 focus:border-primary focus:outline-none font-medium"
              placeholder="Rechercher par pays, indicatif ou devise (ex: CFA, EUR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filtrer les pays"
            />
          </div>

          {/* Liste déroulante des pays */}
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
              filteredCountries.map((c, index) => {
                const Flag = flags[c.code]
                const isSelected = c.code === selectedCountry?.code
                const isFocused = index === focusedIndex

                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-btn transition-colors text-left ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-bold'
                        : isFocused
                          ? 'bg-base-200 text-base-content font-medium'
                          : 'text-base-content font-medium hover:bg-base-200/60'
                    }`}
                  >
                    {/* Drapeau SVG + Nom de pays */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                      <span className="w-5 h-3.5 flex items-center justify-center shrink-0 overflow-hidden rounded-xs shadow-xs border border-base-content/10 bg-base-300">
                        {Flag ? (
                          <Flag title={c.name} />
                        ) : (
                          <span className="text-[9px] font-bold">{c.code}</span>
                        )}
                      </span>
                      <span className="text-xs truncate">{c.name}</span>
                      <span className="text-[11px] font-mono text-base-content/50 shrink-0">
                        ({c.callingCode})
                      </span>
                    </div>

                    {/* Devise officielle + Check icon */}
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="badge badge-xs badge-ghost font-mono text-[10px] font-semibold">
                        {c.currency}
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

export { CURRENCY_NAMES }
