'use client'

import { useMemo, useState } from 'react'
import type { Incident, IncidentKind, IncidentSeverity } from '@/lib/mockData/types'
import {
  useRole,
  PINNED_CLIENT_ID,
  PINNED_DRIVER_ID,
} from '@/lib/role/RoleContext'
import { dashboardVisibleToRole } from '@/lib/role/access'
import { MonoNumber } from '@/components/MonoNumber'
import { DashboardTopBar } from '@/components/ui/DashboardTopBar'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { IncidentsTable } from './IncidentsTable'
import { FilterBar } from './FilterBar'

export interface IncidentJournalRow {
  incident: Incident
  engineModel: string
  engineClientId: string | null
  sessionDriverId: string
  trackName: string
  clientName: string | null
  sessionDate: string
  href: string | null
}

interface Props {
  rows: IncidentJournalRow[]
}

export type SeverityFilter = IncidentSeverity | 'all'

export function IncidentsDashboard({ rows }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('incidents', role)
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all')
  const [kindFilter, setKindFilter] = useState<IncidentKind | 'all'>('all')

  const roleScopedRows = useMemo(() => {
    if (!hasAccess) return []
    if (role === 'tms-engineer') return rows
    if (role === 'client')
      return rows.filter((r) => r.engineClientId === PINNED_CLIENT_ID)
    return rows.filter((r) => r.sessionDriverId === PINNED_DRIVER_ID)
  }, [hasAccess, rows, role])

  const counts = useMemo(() => {
    const c = { all: roleScopedRows.length, violation: 0, warn: 0, info: 0 }
    for (const r of roleScopedRows) c[r.incident.severity]++
    return c
  }, [roleScopedRows])

  const kindsPresent = useMemo(() => {
    const set = new Set<IncidentKind>()
    for (const r of roleScopedRows) set.add(r.incident.kind)
    return Array.from(set)
  }, [roleScopedRows])

  const filtered = useMemo(
    () =>
      roleScopedRows.filter((r) => {
        if (severityFilter !== 'all' && r.incident.severity !== severityFilter) return false
        if (kindFilter !== 'all' && r.incident.kind !== kindFilter) return false
        return true
      }),
    [roleScopedRows, severityFilter, kindFilter]
  )

  if (!hasAccess) {
    return (
      <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
        <DashboardTopBar />
        <EmptyForRole entity="доступа к журналу инцидентов" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <DashboardTopBar />
      <header className="flex items-baseline justify-between gap-4 border-b border-gray-200 bg-white px-3 py-2">
        <div className="text-base font-semibold text-gray-900">Журнал инцидентов</div>
        <div className="flex items-baseline gap-3 text-[11px] text-gray-500">
          <Counter label="Всего" value={counts.all} tone="text-gray-900" />
          <Counter label="Violation" value={counts.violation} tone="text-red-600" />
          <Counter label="Warn" value={counts.warn} tone="text-amber-600" />
          <Counter label="Info" value={counts.info} tone="text-blue-600" />
        </div>
      </header>

      <FilterBar
        severityFilter={severityFilter}
        onSeverityChange={setSeverityFilter}
        kindFilter={kindFilter}
        onKindChange={setKindFilter}
        kinds={kindsPresent}
        counts={counts}
      />

      <main className="min-h-0 flex-1 p-2">
        <div className="flex h-full min-h-0 flex-col rounded-md border border-gray-200 bg-white">
          {filtered.length === 0 ? (
            <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
              Под фильтр не подошло ни одного инцидента.
            </div>
          ) : (
            <IncidentsTable rows={filtered} />
          )}
        </div>
      </main>
    </div>
  )
}

function Counter({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: string
}) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <MonoNumber className={`text-sm font-semibold ${tone}`}>{value}</MonoNumber>
    </div>
  )
}
