'use client'

import { useMemo, useState } from 'react'
import type { Incident, IncidentKind, IncidentSeverity } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { DashboardTopBar } from '@/components/ui/DashboardTopBar'
import { IncidentsTable } from './IncidentsTable'
import { FilterBar } from './FilterBar'

export interface IncidentJournalRow {
  incident: Incident
  engineModel: string
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
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all')
  const [kindFilter, setKindFilter] = useState<IncidentKind | 'all'>('all')

  const counts = useMemo(() => {
    const c = { all: rows.length, violation: 0, warn: 0, info: 0 }
    for (const r of rows) c[r.incident.severity]++
    return c
  }, [rows])

  const kindsPresent = useMemo(() => {
    const set = new Set<IncidentKind>()
    for (const r of rows) set.add(r.incident.kind)
    return Array.from(set)
  }, [rows])

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (severityFilter !== 'all' && r.incident.severity !== severityFilter) return false
        if (kindFilter !== 'all' && r.incident.kind !== kindFilter) return false
        return true
      }),
    [rows, severityFilter, kindFilter]
  )

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
