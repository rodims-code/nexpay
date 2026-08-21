import React from 'react'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  subtitle?: React.ReactNode
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="card max-h-full w-full overflow-hidden rounded-[2rem] border border-base-300/60 bg-base-100/85 shadow-2xl shadow-base-300/10 backdrop-blur-md">
      <div className="card-body min-h-0 gap-5 p-5 sm:gap-6 sm:p-8">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="card-title text-2xl font-black tracking-tight text-base-content/90 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="max-w-xl text-sm leading-relaxed text-base-content/55 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
