import { CheckCircle2 } from 'lucide-react'

interface SuccessMessageProps {
  message?: string
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  if (!message) return null
  return (
    <div className="alert alert-success rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-success/15 bg-success/8 text-success text-sm leading-relaxed">
      <CheckCircle2 className="size-5 shrink-0 text-success mt-0.5" />
      <span className="font-semibold">{message}</span>
    </div>
  )
}
