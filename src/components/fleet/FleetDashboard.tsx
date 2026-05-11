'use client'

import { useMemo } from 'react'
import type { Client, Engine, Session } from '@/lib/mockData/types'
import { useRole, PINNED_CLIENT_ID, PINNED_DRIVER_ID } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole, engineVisibleToRole } from '@/lib/role/access'
import { DashboardTopBar } from '@/components/ui/DashboardTopBar'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { FleetStatusSummary } from './FleetStatusSummary'
import { EngineCard } from './EngineCard'
import { FleetIncidentsPanel, type IncidentRow } from './FleetIncidentsPanel'

export interface FleetEngineRow {
  engine: Engine
  client: Client | null
  liveSession: Session | null
  sessionCount: number
  incidentCount: number
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

  const filteredRows = useMemo(
    () =>
      hasAccess
        ? rows.filter((r) => engineVisibleToRole(r.engine, role, driverEngineIdSet))
        : [],
    [hasAccess, rows, role, driverEngineIdSet]
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
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <DashboardTopBar />
      <header className="flex items-baseline justify-between gap-4 border-b border-gray-200 bg-white px-3 py-2">
        <div className="text-base font-semibold text-gray-900">Парк моторов</div>
        <div className="text-[11px] text-gray-500">
          {filteredRows.length} моторов · {filteredClients.length} клиентов
        </div>
      </header>

      {!hasAccess ? (
        <EmptyForRole entity="доступа к парку моторов" />
      ) : filteredRows.length === 0 ? (
        <EmptyForRole entity="моторов в парке" />
      ) : (
        <main className="grid flex-1 min-h-0 grid-cols-[2fr_1fr] gap-2 p-2">
          <section className="flex min-h-0 flex-col gap-2">
            <FleetStatusSummary rows={filteredRows} clients={filteredClients} />
            <div className="grid flex-1 min-h-0 grid-cols-5 grid-rows-2 gap-2">
              {filteredRows.map((row) => (
                <EngineCard key={row.engine.id} row={row} />
              ))}
            </div>
          </section>

          <aside className="flex min-h-0 flex-col rounded-md border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-3 py-1.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                Недавние алерты по парку
              </div>
              <div className="truncate text-[11px] text-gray-500">
                Топ инцидентов · клик ведёт в сессию-отчёт
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <FleetIncidentsPanel rows={filteredIncidents} />
            </div>
          </aside>
        </main>
      )}
    </div>
  )
}
