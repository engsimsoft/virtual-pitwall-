'use client'

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { Alarm, AlarmSeverity } from '@/lib/mockData/types'

interface AlarmContextValue {
  alarms: Alarm[]
  activeAlarms: Alarm[]
  acknowledgedAlarms: Alarm[]
  acknowledge: (id: string) => void
  unacknowledge: (id: string) => void
  activeCount: number
  criticalCount: number
  violationCount: number
  warnCount: number
}

const AlarmContext = createContext<AlarmContextValue | null>(null)

export function useAlarms() {
  const ctx = useContext(AlarmContext)
  if (!ctx) throw new Error('useAlarms must be used within AlarmProvider')
  return ctx
}

interface Props {
  initialAlarms: Alarm[]
  children: React.ReactNode
}

export function AlarmProvider({ initialAlarms, children }: Props) {
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms)

  const acknowledge = useCallback((id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    )
  }, [])

  const unacknowledge = useCallback((id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: false } : a))
    )
  }, [])

  const activeAlarms = useMemo(
    () => alarms.filter((a) => !a.acknowledged),
    [alarms]
  )

  const acknowledgedAlarms = useMemo(
    () => alarms.filter((a) => a.acknowledged),
    [alarms]
  )

  const severityCount = useCallback(
    (severity: AlarmSeverity) => activeAlarms.filter((a) => a.severity === severity).length,
    [activeAlarms]
  )

  const value = useMemo(
    () => ({
      alarms,
      activeAlarms,
      acknowledgedAlarms,
      acknowledge,
      unacknowledge,
      activeCount: activeAlarms.length,
      criticalCount: severityCount('critical'),
      violationCount: severityCount('violation'),
      warnCount: severityCount('warn'),
    }),
    [alarms, activeAlarms, acknowledgedAlarms, acknowledge, unacknowledge, severityCount]
  )

  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>
}
