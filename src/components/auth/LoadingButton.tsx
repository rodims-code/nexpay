import React from 'react'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export function LoadingButton({
  loading = false,
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: LoadingButtonProps) {
  let btnClass =
    'btn rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] '
  if (variant === 'primary') {
    btnClass +=
      'btn-primary text-primary-content shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'
  } else if (variant === 'secondary') {
    btnClass +=
      'btn-secondary text-secondary-content shadow-md shadow-secondary/15 hover:shadow-lg'
  } else if (variant === 'outline') {
    btnClass += 'btn-outline border-base-300 hover:bg-base-200'
  } else {
    btnClass += 'btn-ghost shadow-none'
  }

  return (
    <button
      className={`${btnClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-xs" />}
      {children}
    </button>
  )
}
