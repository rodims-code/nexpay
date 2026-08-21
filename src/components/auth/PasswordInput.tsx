import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function PasswordInput({
  error = false,
  className = '',
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative w-full">
      <input
        type={show ? 'text' : 'password'}
        className={`input input-bordered w-full pr-12 font-bold focus:outline-none focus:border-primary ${
          error ? 'border-error' : ''
        } ${className}`}
        {...props}
      />
      <button
        type="button"
        className="btn btn-ghost btn-circle btn-sm absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/85"
        onClick={() => setShow(!show)}
        tabIndex={-1}
        aria-label={
          show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
        }
      >
        {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
      </button>
    </div>
  )
}
