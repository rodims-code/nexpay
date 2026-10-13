import { useEffect, useState } from 'react'

export const THEMES = [
  { id: 'bumblebee', label: 'Défaut (Bumblebee)' },
  { id: 'caramellatte', label: 'Caramel Latte' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'cupcake', label: 'Cupcake' },
  { id: 'black', label: 'Black' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

const THEME_STORAGE_KEY = 'nexpay-theme'
const DEFAULT_THEME: ThemeId = 'bumblebee'

/**
 * Hook pour gérer et persister le thème DaisyUI dans localStorage et document.documentElement (data-theme).
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved
      }
    }
    return DEFAULT_THEME
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  return { theme, setTheme, themes: THEMES }
}
