import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import type { RegisterState } from './mockAuth'

interface RegisterContextValue {
  registrationData: RegisterState
  updateData: (data: Partial<RegisterState>) => void
  otpCode: string
  setOtpCode: (code: string) => void
}

const RegisterContext = createContext<RegisterContextValue | undefined>(
  undefined,
)

export function RegisterProvider({ children }: PropsWithChildren) {
  const [registrationData, setRegistrationData] = useState<RegisterState>({
    phoneNumber: '',
    countryCode: 'CG',
  })
  const [otpCode, setOtpCode] = useState('')

  const updateData = (data: Partial<RegisterState>) => {
    setRegistrationData((current) => ({ ...current, ...data }))
  }

  return (
    <RegisterContext.Provider
      value={{ registrationData, updateData, otpCode, setOtpCode }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegister() {
  const context = useContext(RegisterContext)
  if (!context) {
    throw new Error('useRegister must be used within RegisterProvider')
  }
  return context
}
