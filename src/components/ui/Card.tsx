'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  title?: string
  subtitle?: string
  badge?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerClassName?: string
  compact?: boolean
}

export function Card({
  title,
  subtitle,
  badge,
  children,
  className,
  headerClassName,
  compact,
}: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border bg-surface shadow-sm',
        className
      )}
    >
      {(title || subtitle || badge) && (
        <div
          className={cn(
            'flex items-baseline justify-between gap-2 border-b border-border-subtle',
            compact ? 'px-2 py-1' : 'px-3 py-1.5',
            headerClassName
          )}
        >
          <div className="min-w-0">
            {title && (
              <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="truncate text-[11px] text-text-muted">
                {subtitle}
              </div>
            )}
          </div>
          {badge}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  )
}
