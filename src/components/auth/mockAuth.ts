import { z } from 'zod'

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
    regex: /^(05|06)\d{7}$/, // standard Cog numbers are 9 digits usually starting with 05 or 06
  },
  {
    code: 'CD',
    name: 'R.D. Congo',
    callingCode: '+243',
    flag: '🇨🇩',
    currency: 'CDF',
    placeholder: '810 000 000',
    regex: /^[89]\d{8}$/, // standard DRC numbers are 9 digits
  },
  {
    code: 'SN',
    name: 'Sénégal',
    callingCode: '+221',
    flag: '🇸🇳',
    currency: 'XOF',
    placeholder: '77 000 00 00',
    regex: /^(70|75|76|77|78)\d{7}$/, // standard Senegal mobile
  },
  {
    code: 'GA',
    name: 'Gabon',
    callingCode: '+241',
    flag: '🇬🇦',
    currency: 'XAF',
    placeholder: '06 00 00 00',
    regex: /^(05|06|07)\d{7}$/, // standard Gabon mobile
  },
]

export interface RegisterState {
  phoneNumber: string
  countryCode: string
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
    const country = SUPPORTED_COUNTRIES.find(
      (c) => c.code === userData.countryCode,
    )
    if (!country) {
      return { success: false, error: 'Pays non pris en charge.' }
    }
    const fullPhone =
      country.callingCode +
      sanitizePhone(userData.phoneNumber, country.callingCode)

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
