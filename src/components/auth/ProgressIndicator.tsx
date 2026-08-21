interface ProgressIndicatorProps {
  currentStep: number // 1 to 5
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: 'Téléphone' },
    { number: 2, label: 'Informations' },
    { number: 3, label: 'Éligibilité' },
    { number: 4, label: 'Sécurité' },
    { number: 5, label: 'Vérification' },
  ]

  return (
    <div className="w-full pb-4 space-y-3">
      {/* Mobile Step indicator */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-2">
          <span className="badge badge-primary font-bold text-xs">
            Étape {currentStep} / 5
          </span>
          <span className="text-sm font-bold text-base-content/80">
            {steps[currentStep - 1]?.label}
          </span>
        </div>
        <span className="text-xs font-semibold text-base-content/40">
          {Math.round((currentStep / 5) * 100)}%
        </span>
      </div>

      {/* Mobile progress bar */}
      <progress
        className="progress progress-primary w-full lg:hidden h-1.5"
        value={currentStep}
        max="5"
      />

      {/* Desktop Step Indicator (DaisyUI steps) */}
      <ul className="steps steps-horizontal w-full hidden lg:grid text-xs">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep
          return (
            <li
              key={step.number}
              className={`step text-[11px] leading-tight ${
                isCompleted || isActive
                  ? 'step-primary font-bold text-primary-content'
                  : 'text-base-content/40'
              }`}
            >
              <span className={isActive ? 'font-black text-primary' : ''}>
                {step.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
