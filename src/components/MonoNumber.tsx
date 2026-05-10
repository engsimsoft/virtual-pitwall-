import type { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

// Tabular monospace span: keeps digit columns aligned across stacked or
// live-updating numeric cells. Compose with formatRpm / formatLapTime.
export function MonoNumber({ children, className = '', ...rest }: Props) {
  const composed = `font-mono tabular-nums ${className}`.trim()
  return (
    <span className={composed} {...rest}>
      {children}
    </span>
  )
}
