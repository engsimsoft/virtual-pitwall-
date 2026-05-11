'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'telos-theme'

function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) {
      setTheme(stored)
      document.documentElement.classList.toggle('light', stored === 'light')
    } else {
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      setTheme(system)
      document.documentElement.classList.toggle('light', system === 'light')
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('light', next === 'light')
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
