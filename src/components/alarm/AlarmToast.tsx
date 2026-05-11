'use client'

import { useEffect, useState } from 'react'
import { X, AlertTriangle, AlertOctagon, AlertCircle } from 'lucide-react'
import { useAlarms } from '@/lib/alarm/AlarmContext'
import { IncidentDetailPanel, alarmToPanelData } from './IncidentDetailPanel'
import type { PanelData } from './IncidentDetailPanel'
import { cn } from '@/lib/utils'

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertOctagon,
    color: 'border-status-critical bg-status-critical-dim text-status-critical',
    pulse: true,
  },
  violation: {
    icon: AlertTriangle,
    color: 'border-status-warn bg-status-warn-dim text-status-warn',
    pulse: false,
  },
  warn: {
    icon: AlertCircle,
    color: 'border-amber-200 bg-amber-50 text-amber-700',
    pulse: false,
  },
}

export function AlarmToast() {
  const { activeAlarms, acknowledge } = useAlarms()
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [selectedPanel, setSelectedPanel] = useState<PanelData | null>(null)

  // Auto-dismiss after 8 seconds, but keep critical
  useEffect(() => {
    const timers = activeAlarms
      .filter((a) => a.severity !== 'critical' && !dismissed.has(a.id))
      .map((a) =>
        setTimeout(() => {
          setDismissed((prev) => new Set(prev).add(a.id))
        }, 8000)
      )
    return () => timers.forEach(clearTimeout)
  }, [activeAlarms, dismissed])

  const visibleAlarms = activeAlarms.filter((a) => !dismissed.has(a.id))

  return (
    <>
    {visibleAlarms.length > 0 && (
    <div className="fixed right-3 top-3 z-[60] flex w-80 flex-col gap-2">
      {visibleAlarms.map((alarm) => (
        <ToastItem key={alarm.id} alarm={alarm} onAcknowledge={() => {
          acknowledge(alarm.id)
          setDismissed((prev) => new Set(prev).add(alarm.id))
        }} onOpen={() => setSelectedPanel(alarmToPanelData(alarm))} />
      ))}
    </div>
    )}
    <IncidentDetailPanel data={selectedPanel} onClose={() => setSelectedPanel(null)} />
    </>
  )
}

function ToastItem({
  alarm,
  onAcknowledge,
  onOpen,
}: {
  alarm: ReturnType<typeof useAlarms>['activeAlarms'][number]
  onAcknowledge: () => void
  onOpen: () => void
}) {
  const config = SEVERITY_CONFIG[alarm.severity]
  const Icon = config.icon

  return (
    <div
      onClick={onOpen}
      className={cn(
        'relative flex cursor-pointer items-start gap-2.5 rounded-md border p-3 shadow-lg backdrop-blur-sm',
        config.color
      )}
    >
      {config.pulse && (
        <span className="absolute -right-1 -top-1 inline-flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
      )}
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold">
          {alarm.action}
        </div>
        <div className="mt-0.5 text-[11px] leading-snug opacity-90">
          {alarm.message}
        </div>
        <div className="mt-1 text-[10px] opacity-70">
          {alarm.engineId} · {alarm.value} {alarm.unit} / лимит {alarm.limit} {alarm.unit}
        </div>
      </div>
      <button
        onClick={onAcknowledge}
        className="shrink-0 rounded p-0.5 opacity-60 hover:bg-black/10 hover:opacity-100"
        title="Пометить как просмотренное"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
