import React, { useRef } from 'react'

interface OtpInputProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  error?: boolean
}

export function OtpInput({
  value,
  onChange,
  disabled = false,
  error = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value
    const cleaned = val.replace(/\D/g, '')
    if (!cleaned) return

    const newOtp = [...Array(6)].map((_, i) => value[i] || '')
    newOtp[index] = cleaned[cleaned.length - 1] // Keep last character
    const result = newOtp.join('')
    onChange(result)

    // Auto-focus next input
    if (index < 5 && cleaned.length > 0) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace') {
      const newOtp = [...Array(6)].map((_, i) => value[i] || '')

      // If current is empty, clear previous and focus it
      if (!newOtp[index] && index > 0) {
        newOtp[index - 1] = ''
        onChange(newOtp.join(''))
        inputsRef.current[index - 1]?.focus()
      } else {
        newOtp[index] = ''
        onChange(newOtp.join(''))
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const cleaned = pasted.replace(/\D/g, '').substring(0, 6)
    if (cleaned) {
      onChange(cleaned)
      const targetIdx = Math.min(cleaned.length, 5)
      inputsRef.current[targetIdx]?.focus()
    }
  }

  return (
    <div
      className="flex justify-between items-center gap-2 sm:gap-3 w-full"
      dir="ltr"
    >
      {Array.from({ length: 6 }).map((_, idx) => {
        const val = value[idx] || ''
        return (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            ref={(el) => {
              inputsRef.current[idx] = el
            }}
            value={val}
            onChange={(e) => handleInputChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`input input-bordered w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-all ${
              error
                ? 'border-error text-error bg-error/5 focus:border-error'
                : ''
            }`}
          />
        )
      })}
    </div>
  )
}
