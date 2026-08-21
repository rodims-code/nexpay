import React from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
  description?: string
}

export function FormField({
  label,
  error,
  children,
  required,
  description,
}: FormFieldProps) {
  return (
    <div className="form-control w-full space-y-1.5">
      <div className="flex justify-between items-baseline px-0.5">
        <label className="label py-0">
          <span className="label-text font-bold text-base-content/85 text-xs sm:text-sm">
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
        {description && (
          <span className="text-[10px] text-base-content/40 font-medium">
            {description}
          </span>
        )}
      </div>
      {children}
      {error && (
        <span className="text-xs text-error font-semibold px-0.5 transition-all">
          {error}
        </span>
      )}
    </div>
  )
}
