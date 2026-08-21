import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null

  const checks = [
    { label: 'Au moins 8 caractères', test: (p: string) => p.length >= 8 },
    {
      label: 'Majuscules & minuscules',
      test: (p: string) => /[A-Z]/.test(p) && /[a-z]/.test(p),
    },
    { label: 'Au moins un chiffre', test: (p: string) => /[0-9]/.test(p) },
    {
      label: 'Un caractère spécial',
      test: (p: string) => /[^A-Za-z0-9]/.test(p),
    },
  ]

  const passedCount = checks.filter((c) => c.test(password)).length

  // Determine strength label & progress bar color
  let strengthLabel = 'Faible'
  let progressColor = 'progress-error'
  let progressValue = 1

  if (passedCount >= 4) {
    strengthLabel = 'Robuste'
    progressColor = 'progress-success'
    progressValue = 3
  } else if (passedCount >= 2) {
    strengthLabel = 'Moyen'
    progressColor = 'progress-warning'
    progressValue = 2
  }

  return (
    <div className="space-y-2 p-3.5 bg-base-200/50 rounded-2xl border border-base-200/60">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-base-content/50">
          Sécurité du mot de passe :
        </span>
        <span
          className={`font-black ${
            passedCount >= 4
              ? 'text-success'
              : passedCount >= 2
                ? 'text-warning'
                : 'text-error'
          }`}
        >
          {strengthLabel}
        </span>
      </div>

      <progress
        className={`progress ${progressColor} w-full h-1.5`}
        value={progressValue}
        max="3"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1.5">
        {checks.map((check, idx) => {
          const ok = check.test(password)
          return (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-[11px] font-bold"
            >
              <span
                className={`flex size-4 items-center justify-center rounded-full shrink-0 ${
                  ok
                    ? 'bg-success/15 text-success'
                    : 'bg-base-300 text-base-content/25'
                }`}
              >
                {ok ? (
                  <Check className="size-2.5 stroke-[3]" />
                ) : (
                  <X className="size-2.5 stroke-[3]" />
                )}
              </span>
              <span
                className={ok ? 'text-base-content/80' : 'text-base-content/40'}
              >
                {check.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
