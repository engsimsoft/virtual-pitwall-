'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Client, Engine, EngineStatus, Session } from '@/lib/mockData/types'
import { useRole, PINNED_CLIENT_ID, PINNED_DRIVER_ID } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole, engineVisibleToRole } from '@/lib/role/access'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { FleetStatusSummary } from './FleetStatusSummary'
import { EngineCard } from './EngineCard'
import { FleetIncidentsPanel, type IncidentRow } from './FleetIncidentsPanel'
import { IncidentDetailPanel, alarmToPanelData } from '@/components/alarm/IncidentDetailPanel'
import type { PanelData } from '@/components/alarm/IncidentDetailPanel'
import { ALARMS } from '@/lib/mockData'

export interface FleetEngineRow {
  engine: Engine
  client: Client | null
  liveSession: Session | null
  sessionCount: number
  incidentCount: number
  alarmCount: number
}

interface Props {
  rows: FleetEngineRow[]
  clients: Client[]
  incidents: IncidentRow[]
  driverEngineIds: string[]
}

export function FleetDashboard({ rows, clients, incidents, driverEngineIds }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('fleet', role)
  const driverEngineIdSet = useMemo(() => new Set(driverEngineIds), [driverEngineIds])
  const [animatedRows, setAnimatedRows] = useState(rows)
  const [selectedPanel, setSelectedPanel] = useState<PanelData | null>(null)

  const openAlarmForEngine = (engineId: string) => {
    const alarm = ALARMS.find((a) => a.engineId === engineId && !a.acknowledged)
    if (alarm) setSelectedPanel(alarmToPanelData(alarm))
  }

  useEffect(() => {
    setAnimatedRows(rows)
  }, [rows])

  // Heartbeat simulation: every 10s random engine flips status
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedRows((prev) => {
        if (prev.length === 0) return prev
        const idx = Math.floor(Math.random() * prev.length)
        const statuses: EngineStatus[] = ['live', 'idle', 'maintenance']
        const next = [...prev]
        next[idx] = {
          ...next[idx],
          engine: { ...next[idx].engine, status: statuses[Math.floor(Math.random() * statuses.length)] },
        }
        return next
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const filteredRows = useMemo(
    () =>
      hasAccess
        ? animatedRows.filter((r) => engineVisibleToRole(r.engine, role, driverEngineIdSet))
        : [],
    [hasAccess, animatedRows, role, driverEngineIdSet]
  )

  const filteredClients = useMemo(() => {
    if (role === 'tms-engineer') return clients
    if (role === 'client') return clients.filter((c) => c.id === PINNED_CLIENT_ID)
    // driver: показываем клиента, которому принадлежит пинённый гонщик
    const driverClientIds = new Set(
      filteredRows.flatMap((r) => (r.engine.clientId ? [r.engine.clientId] : []))
    )
    return clients.filter((c) => driverClientIds.has(c.id))
  }, [role, clients, filteredRows])

  const filteredIncidents = useMemo(() => {
    if (role === 'tms-engineer') return incidents
    if (role === 'client')
      return incidents.filter((i) => i.engineClientId === PINNED_CLIENT_ID)
    return incidents.filter((i) => i.sessionDriverId === PINNED_DRIVER_ID)
  }, [incidents, role])

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
        <div className="text-base font-semibold text-text-primary">Парк моторов</div>
        <div className="text-[11px] text-text-muted">
          {filteredRows.length} моторов · {filteredClients.length} клиентов
        </div>
      </header>

      {!hasAccess ? (
        <EmptyForRole entity="доступа к парку моторов" />
      ) : filteredRows.length === 0 ? (
        <EmptyForRole entity="моторов в парке" />
      ) : (
        <main className="grid flex-1 min-h-0 grid-cols-1 gap-2 p-2 lg:grid-cols-[2fr_1fr]">
          <section className="flex min-h-0 flex-col gap-2">
            <FleetStatusSummary rows={filteredRows} clients={filteredClients} />
            <div className="grid flex-1 min-h-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredRows.map((row) => (
                <EngineCard key={row.engine.id} row={row} onAlarmClick={() => openAlarmForEngine(row.engine.id)} />
              ))}
            </div>
          </section>

          <aside className="flex min-h-0 flex-col rounded-md border border-border bg-surface">
            <div className="border-b border-border-subtle px-3 py-1.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                Недавние алерты по парку
              </div>
              <div className="truncate text-[11px] text-text-muted">
                Топ инцидентов · клик ведёт в сессию-отчёт
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <FleetIncidentsPanel rows={filteredIncidents} />
            </div>
          </aside>
        </main>
      )}
      <IncidentDetailPanel data={selectedPanel} onClose={() => setSelectedPanel(null)} />
    </div>
  )
}
