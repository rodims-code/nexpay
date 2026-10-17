import { z } from 'zod'

import { getCountryCurrency } from './countriesData'

export interface Country {
  code: string
  name: string
  callingCode: string
  flag: string
  currency: string
  placeholder: string
  regex: RegExp
}

export const SUPPORTED_COUNTRIES: Country[] = [
  {
    code: 'CG',
    name: 'République du Congo',
    callingCode: '+242',
    flag: '🇨🇬',
    currency: 'XAF',
    placeholder: '06 600 00 00',
    regex: /^(05|06)\d{7}$/,
  },
  {
    code: 'CD',
    name: 'R.D. Congo',
    callingCode: '+243',
    flag: '🇨🇩',
    currency: 'CDF',
    placeholder: '810 000 000',
    regex: /^[89]\d{8}$/,
  },
  {
    code: 'SN',
    name: 'Sénégal',
    callingCode: '+221',
    flag: '🇸🇳',
    currency: 'XOF',
    placeholder: '77 000 00 00',
    regex: /^(70|75|76|77|78)\d{7}$/,
  },
  {
    code: 'GA',
    name: 'Gabon',
    callingCode: '+241',
    flag: '🇬🇦',
    currency: 'XAF',
    placeholder: '06 00 00 00',
    regex: /^(05|06|07)\d{7}$/,
  },
  {
    code: 'CM',
    name: 'Cameroun',
    callingCode: '+237',
    flag: '🇨🇲',
    currency: 'XAF',
    placeholder: '6 70 00 00 00',
    regex: /^6\d{8}$/,
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    callingCode: '+225',
    flag: '🇨🇮',
    currency: 'XOF',
    placeholder: '07 00 00 00 00',
    regex: /^\d{10}$/,
  },
  {
    code: 'BJ',
    name: 'Bénin',
    callingCode: '+229',
    flag: '🇧🇯',
    currency: 'XOF',
    placeholder: '97 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'TG',
    name: 'Togo',
    callingCode: '+228',
    flag: '🇹🇬',
    currency: 'XOF',
    placeholder: '90 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'ML',
    name: 'Mali',
    callingCode: '+223',
    flag: '🇲🇱',
    currency: 'XOF',
    placeholder: '70 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    callingCode: '+226',
    flag: '🇧🇫',
    currency: 'XOF',
    placeholder: '70 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'GN',
    name: 'Guinée',
    callingCode: '+224',
    flag: '🇬🇳',
    currency: 'GNF',
    placeholder: '620 00 00 00',
    regex: /^6\d{8}$/,
  },
  {
    code: 'TD',
    name: 'Tchad',
    callingCode: '+235',
    flag: '🇹🇩',
    currency: 'XAF',
    placeholder: '66 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'CF',
    name: 'Centrafrique',
    callingCode: '+236',
    flag: '🇨🇫',
    currency: 'XAF',
    placeholder: '75 00 00 00',
    regex: /^\d{8}$/,
  },
  {
    code: 'GQ',
    name: 'Guinée équatoriale',
    callingCode: '+240',
    flag: '🇬🇶',
    currency: 'XAF',
    placeholder: '222 000 000',
    regex: /^\d{9}$/,
  },
  {
    code: 'MA',
    name: 'Maroc',
    callingCode: '+212',
    flag: '🇲🇦',
    currency: 'MAD',
    placeholder: '06 50 12 34 56',
    regex: /^[67]\d{8}$/,
  },
  {
    code: 'DZ',
    name: 'Algérie',
    callingCode: '+213',
    flag: '🇩🇿',
    currency: 'DZD',
    placeholder: '05 50 12 34 56',
    regex: /^[567]\d{8}$/,
  },
  {
    code: 'TN',
    name: 'Tunisie',
    callingCode: '+216',
    flag: '🇹🇳',
    currency: 'TND',
    placeholder: '20 123 456',
    regex: /^\d{8}$/,
  },
  {
    code: 'RW',
    name: 'Rwanda',
    callingCode: '+250',
    flag: '🇷🇼',
    currency: 'RWF',
    placeholder: '078 000 000',
    regex: /^7\d{8}$/,
  },
  {
    code: 'FR',
    name: 'France',
    callingCode: '+33',
    flag: '🇫🇷',
    currency: 'EUR',
    placeholder: '06 12 34 56 78',
    regex: /^[67]\d{8}$/,
  },
  {
    code: 'BE',
    name: 'Belgique',
    callingCode: '+32',
    flag: '🇧🇪',
    currency: 'EUR',
    placeholder: '0470 12 34 56',
    regex: /^4\d{8}$/,
  },
  {
    code: 'US',
    name: 'États-Unis',
    callingCode: '+1',
    flag: '🇺🇸',
    currency: 'USD',
    placeholder: '(555) 000-0000',
    regex: /^\d{10}$/,
  },
  {
    code: 'CA',
    name: 'Canada',
    callingCode: '+1',
    flag: '🇨🇦',
    currency: 'CAD',
    placeholder: '(555) 000-0000',
    regex: /^\d{10}$/,
  },
  {
    code: 'CH',
    name: 'Suisse',
    callingCode: '+41',
    flag: '🇨🇭',
    currency: 'CHF',
    placeholder: '079 123 45 67',
    regex: /^7\d{8}$/,
  },
  {
    code: 'GB',
    name: 'Royaume-Uni',
    callingCode: '+44',
    flag: '🇬🇧',
    currency: 'GBP',
    placeholder: '07911 123456',
    regex: /^7\d{9}$/,
  },
]

export interface RegisterState {
  phoneNumber: string
  countryCode: string
  callingCode?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  password?: string
  currency?: string
}

// In-memory mock database for registration & users
// Seeded with a demo user for quick testing: Phone: +242 06 123 45 67, Password: Password123!
const usersDb = new Map<string, RegisterState>([
  [
    '+242061234567',
    {
      phoneNumber: '061234567',
      countryCode: 'CG',
      firstName: 'Jean',
      lastName: 'Mpemba',
      birthDate: '1995-05-15',
      password: 'Password123!',
      currency: 'XAF',
    },
  ],
])

const otpStore = new Map<
  string,
  { code: string; expiresAt: number; attempts: number }
>()

// Helper to sanitize phone numbers (removes spaces, dashes, leading calling code)
export function sanitizePhone(phone: string, callingCode: string): string {
  let cleaned = phone.replace(/[\s()-]/g, '')
  if (cleaned.startsWith(callingCode)) {
    cleaned = cleaned.substring(callingCode.length)
  }
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.replace(/^\+\d+/, '')
  }
  return cleaned
}

// Zod schemas for form validations
export const phoneSchema = z.object({
  countryCode: z.string().min(2, 'Veuillez sélectionner un pays'),
  phone: z.string().min(6, 'Numéro de téléphone trop court'),
})

export const personalSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  birthDate: z.string().refine(
    (val) => {
      if (!val) return false
      const date = new Date(val)
      if (isNaN(date.getTime())) return false

      // Check minimum age of 18
      const today = new Date()
      let age = today.getFullYear() - date.getFullYear()
      const m = today.getMonth() - date.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--
      }
      return age >= 18
    },
    {
      message: 'Vous devez avoir au moins 18 ans pour utiliser NexPay.',
    },
  ),
})

export const countrySchema = z.object({
  countryCode: z.string().min(2, 'Veuillez sélectionner un pays de résidence'),
  currency: z.string().min(3, 'Devise requise'),
})

export const securitySchema = z
  .object({
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Requiert au moins une lettre majuscule')
      .regex(/[a-z]/, 'Requiert au moins une lettre minuscule')
      .regex(/[0-9]/, 'Requiert au moins un chiffre')
      .regex(/[^A-Za-z0-9]/, 'Requiert au moins un caractère spécial'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  countryCode: z.string().min(2),
  phone: z.string().min(6, 'Numéro de téléphone requis'),
  password: z.string().min(1, 'Mot de passe requis'),
})

// Simulated Mock API Calls
export const mockAuthService = {
  // Check if phone number is already registered
  checkPhoneExists: async (fullPhone: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 850))
    return usersDb.has(fullPhone)
  },

  // Send OTP code to a phone number (returns the code for display/simulation purposes)
  sendOtp: async (fullPhone: string): Promise<string> => {
    await new Promise((r) => setTimeout(r, 1000))

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 60 * 1000 // 60 seconds lifetime

    otpStore.set(fullPhone, { code, expiresAt, attempts: 0 })
    console.log(`[MOCK SMS] OTP code for ${fullPhone}: ${code}`)
    return code
  },

  // Verify OTP code
  verifyOtp: async (
    fullPhone: string,
    code: string,
  ): Promise<{
    success: boolean
    errorType?: 'incorrect' | 'expired' | 'blocked'
  }> => {
    await new Promise((r) => setTimeout(r, 800))
    const entry = otpStore.get(fullPhone)

    if (!entry) {
      return { success: false, errorType: 'incorrect' }
    }

    if (entry.attempts >= 3) {
      return { success: false, errorType: 'blocked' }
    }

    if (Date.now() > entry.expiresAt) {
      return { success: false, errorType: 'expired' }
    }

    if (entry.code !== code) {
      entry.attempts++
      otpStore.set(fullPhone, entry)
      return { success: false, errorType: 'incorrect' }
    }

    // Success, clear OTP code
    otpStore.delete(fullPhone)
    return { success: true }
  },

  // Finalize registration
  registerUser: async (
    userData: RegisterState,
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 1200))
    const country =
      SUPPORTED_COUNTRIES.find((c) => c.code === userData.countryCode) ||
      (() => {
        const { code: curr } = getCountryCurrency(userData.countryCode)
        return {
          code: userData.countryCode,
          name: userData.countryCode,
          callingCode: userData.callingCode || '+242',
          flag: '🌐',
          currency: curr,
          placeholder: '00 000 0000',
          regex: /^\d{6,14}$/,
        }
      })()
    const callingCode = country.callingCode || userData.callingCode || '+242'
    const fullPhone =
      callingCode +
      sanitizePhone(userData.phoneNumber, callingCode)

    if (usersDb.has(fullPhone)) {
      return {
        success: false,
        error: 'Ce numéro de téléphone est déjà enregistré.',
      }
    }

    usersDb.set(fullPhone, userData)
    return { success: true }
  },

  // Authenticate user
  loginUser: async (
    fullPhone: string,
    password?: string,
  ): Promise<{
    success: boolean
    user?: RegisterState
    errorType?: 'not_found' | 'incorrect_password' | 'locked'
  }> => {
    await new Promise((r) => setTimeout(r, 1200))

    const user = usersDb.get(fullPhone)
    if (!user) {
      return { success: false, errorType: 'not_found' }
    }

    // For demo purposes, check password
    if (user.password !== password) {
      return { success: false, errorType: 'incorrect_password' }
    }

    return { success: true, user }
  },
}
