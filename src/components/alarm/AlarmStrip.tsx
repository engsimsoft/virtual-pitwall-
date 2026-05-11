'use client'

import { AlertOctagon, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { useAlarms } from '@/lib/alarm/AlarmContext'
import { cn } from '@/lib/utils'

const SEVERITY_ICON = {
  critical: AlertOctagon,
  violation: AlertTriangle,
  warn: AlertCircle,
}

const SEVERITY_STYLE = {
  critical: 'border-status-critical bg-status-critical-dim text-status-critical',
  violation: 'border-status-warn bg-status-warn-dim text-status-warn',
  warn: 'border-amber-200/30 bg-amber-500/10 text-amber-500',
}

interface Props {
  sessionId?: string
  engineId?: string
}

export function AlarmStrip({ sessionId, engineId }: Props) {
  const { activeAlarms, acknowledge } = useAlarms()

  const filtered = activeAlarms.filter((a) => {
    if (sessionId && a.sessionId === sessionId) return true
    if (engineId && a.engineId === engineId) return true
    return false
  })

  if (filtered.length === 0) return null

  return (
    <div className="flex flex-col gap-1 border-b border-border bg-surface px-3 py-1.5">
      {filtered.map((alarm) => {
        const Icon = SEVERITY_ICON[alarm.severity]
        return (
          <div
            key={alarm.id}
            className={cn(
              'flex items-center gap-2 rounded-sm border px-2.5 py-1 text-xs',
              SEVERITY_STYLE[alarm.severity]
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="font-semibold">{alarm.action}</span>
            <span className="opacity-80">— {alarm.message}</span>
            <span className="ml-auto opacity-60">
              {alarm.value} {alarm.unit} / лимит {alarm.limit} {alarm.unit}
            </span>
            <button
              onClick={() => acknowledge(alarm.id)}
              className="shrink-0 rounded p-0.5 opacity-50 hover:bg-black/10 hover:opacity-100"
              title="Пометить как просмотренное"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
