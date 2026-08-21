import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message?: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null
  return (
    <div className="alert alert-error rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-error/15 bg-error/8 text-error text-sm leading-relaxed">
      <AlertCircle className="size-5 shrink-0 text-error mt-0.5" />
      <span className="font-semibold">{message}</span>
    </div>
  )
}
