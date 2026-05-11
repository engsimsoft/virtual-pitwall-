'use client'

import { cn } from '@/lib/utils'

type StatusVariant = 'live' | 'idle' | 'offline' | 'maintenance' | 'ok' | 'warn' | 'critical' | 'info' | 'neutral'

interface StatusBadgeProps {
  variant: StatusVariant
  label: string
  pulse?: boolean
  className?: string
}

const VARIANTS: Record<StatusVariant, string> = {
  live: 'bg-status-ok-dim text-status-ok border-status-ok',
  idle: 'bg-status-info-dim text-status-info border-status-info',
  offline: 'bg-status-critical-dim text-status-critical border-status-critical',
  maintenance: 'bg-status-warn-dim text-status-warn border-status-warn',
  ok: 'bg-status-ok-dim text-status-ok border-status-ok',
  warn: 'bg-status-warn-dim text-status-warn border-status-warn',
  critical: 'bg-status-critical-dim text-status-critical border-status-critical',
  info: 'bg-status-info-dim text-status-info border-status-info',
  neutral: 'bg-elevated text-text-muted border-border',
}

export function StatusBadge({ variant, label, pulse, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold',
        VARIANTS[variant],
        className
      )}
    >
      {pulse && (
        <span className={cn('inline-block h-1.5 w-1.5 rounded-full', {
          'bg-status-ok animate-pulse-live': variant === 'live' || variant === 'ok',
          'bg-status-warn animate-pulse-live': variant === 'warn' || variant === 'maintenance',
          'bg-status-critical animate-pulse-live': variant === 'critical' || variant === 'offline',
          'bg-status-info': variant === 'idle' || variant === 'info',
          'bg-text-muted': variant === 'neutral',
        })} />
      )}
      {label}
    </span>
  )
}
