'use client'

import { useState } from 'react'
import type {
  Client,
  DynoCurve,
  Engine,
  EngineStatus,
  MaintenanceEvent,
} from '@/lib/mockData/types'
import { DynoCard } from './DynoCard'
import { EngineSelector } from './EngineSelector'
import { SessionsLog, type SessionLogRow } from './SessionsLog'
import { MaintenanceLog } from './MaintenanceLog'
import { IncidentsLog, type IncidentLogRow } from './IncidentsLog'

export interface PassportBundle {
  engine: Engine
  client: Client | null
  dyno: DynoCurve | null
  sessions: SessionLogRow[]
  incidents: IncidentLogRow[]
  maintenance: MaintenanceEvent[]
}

interface Props {
  bundles: PassportBundle[]
  defaultEngineId: string
}

const STATUS_LABEL: Record<EngineStatus, string> = {
  live: 'LIVE',
  idle: 'IDLE',
  maintenance: 'MAINT',
  decommissioned: 'DECOM',
}

const STATUS_BADGE: Record<EngineStatus, string> = {
  live: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  idle: 'border-gray-200 bg-gray-50 text-gray-700',
  maintenance: 'border-amber-200 bg-amber-50 text-amber-700',
  decommissioned: 'border-gray-200 bg-gray-100 text-gray-400',
}

export function EnginePassportDashboard({ bundles, defaultEngineId }: Props) {
  const [selectedId, setSelectedId] = useState(defaultEngineId)
  const bundle = bundles.find((b) => b.engine.id === selectedId) ?? bundles[0]
  const { engine, client, dyno } = bundle

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex flex-col gap-2 border-b border-gray-200 bg-white px-3 py-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 text-sm">
          <HeaderCell label="Мотор" primary={engine.model} secondary={engine.serialNumber} />
          <HeaderCell
            label="Клиент"
            primary={client?.name ?? '—'}
            secondary={
              client
                ? `Контракт ${client.contractStart} → ${client.contractEnd}`
                : 'Без контракта'
            }
          />
          <HeaderCell
            label="Налёт"
            primary={`${engine.totalRunHours} ч`}
            secondary={`${(engine.totalRevolutions / 1_000_000).toFixed(1)} млн оборотов`}
          />
          <HeaderCell
            label="В эксплуатации"
            primary={engine.bornAt}
            secondary={`ID ${engine.id}`}
          />
          <StatusBadge status={engine.status} />
        </div>
        <EngineSelector bundles={bundles} selectedId={selectedId} onSelect={setSelectedId} />
      </header>

      <main className="grid flex-1 min-h-0 grid-cols-[2fr_1fr] gap-2 p-2">
        <section className="flex min-h-0 flex-col gap-2">
          <DynoCard engine={engine} dyno={dyno} />
        </section>
        <aside className="grid min-h-0 grid-rows-3 gap-2">
          <LogCard
            title="Инциденты мотора"
            subtitle={incidentSummaryLine(bundle.incidents)}
          >
            <IncidentsLog rows={bundle.incidents} />
          </LogCard>
          <LogCard
            title="Журнал сессий"
            subtitle="newest first · клик ведёт в сессию-отчёт"
          >
            <SessionsLog rows={bundle.sessions} />
          </LogCard>
          <LogCard
            title="Журнал обслуживания"
            subtitle={`${bundle.maintenance.length} запис${bundle.maintenance.length === 1 ? 'ь' : bundle.maintenance.length >= 2 && bundle.maintenance.length <= 4 ? 'и' : 'ей'}`}
          >
            <MaintenanceLog events={bundle.maintenance} />
          </LogCard>
        </aside>
      </main>
    </div>
  )
}

function incidentSummaryLine(rows: IncidentLogRow[]): string {
  if (rows.length === 0) return 'без зафиксированных событий'
  const violations = rows.filter((r) => r.incident.severity === 'violation').length
  const warns = rows.filter((r) => r.incident.severity === 'warn').length
  const infos = rows.filter((r) => r.incident.severity === 'info').length
  const parts: string[] = []
  if (violations) parts.push(`${violations} violation`)
  if (warns) parts.push(`${warns} warn`)
  if (infos) parts.push(`${infos} info`)
  return parts.join(' · ')
}

function LogCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-col rounded-md border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-3 py-1.5">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">{title}</div>
        <div className="truncate text-[11px] text-gray-500">{subtitle}</div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}

function HeaderCell({
  label,
  primary,
  secondary,
}: {
  label: string
  primary: string
  secondary: string
}) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="truncate font-semibold text-gray-900">{primary}</div>
      <div className="truncate text-[11px] text-gray-500">{secondary}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: EngineStatus }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_BADGE[status]}`}
    >
      {status === 'live' && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      )}
      {STATUS_LABEL[status]}
    </div>
  )
}

