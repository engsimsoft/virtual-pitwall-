import Link from 'next/link'
import type { EngineStatus } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import type { FleetEngineRow } from './FleetDashboard'

interface Props {
  row: FleetEngineRow
}

const STATUS_LABEL: Record<EngineStatus, string> = {
  live: 'LIVE',
  idle: 'IDLE',
  maintenance: 'MAINT',
  decommissioned: 'DECOM',
}

const STATUS_BADGE: Record<EngineStatus, string> = {
  live: 'border-status-ok bg-status-ok-dim text-status-ok',
  idle: 'border-border bg-background text-text-secondary',
  maintenance: 'border-amber-200 bg-status-warn-dim text-status-warn',
  decommissioned: 'border-border bg-elevated text-text-muted',
}

export function EngineCard({ row }: Props) {
  const { engine, client, liveSession, sessionCount, incidentCount } = row
  const status = engine.status
  const revolutionsM = (engine.totalRevolutions / 1_000_000).toFixed(1)

  return (
    <Link
      href={`/demos/engine-passport?engine=${engine.id}`}
      className="flex min-h-0 flex-col gap-1.5 rounded-md border border-border bg-surface p-2 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between gap-2">
        <MonoNumber className="text-[11px] font-semibold text-text-primary">{engine.id}</MonoNumber>
        <StatusBadge status={status} liveSessionId={liveSession?.id ?? null} />
      </div>

      <div className="min-w-0">
        <div className="truncate text-[12px] font-semibold text-text-primary">{engine.model}</div>
        <div className="truncate text-[10px] text-text-muted">{engine.serialNumber}</div>
      </div>

      <div className="truncate text-[11px] text-text-secondary">
        {client ? client.name : <span className="text-text-muted">Без контракта</span>}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-1 border-t border-border-subtle pt-1.5 text-[10px] text-text-muted">
        <Stat label="Часы" value={`${engine.totalRunHours} ч`} />
        <Stat label="Обороты" value={`${revolutionsM} млн`} />
        <Stat label="Сессий" value={`${sessionCount}`} />
        <Stat label="Инцидентов" value={`${incidentCount}`} tone={incidentCount > 0 ? 'text-status-warn' : 'text-text-secondary'} />
      </div>
    </Link>
  )
}

function Stat({ label, value, tone = 'text-text-secondary' }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-1">
      <span className="uppercase tracking-wider">{label}</span>
      <MonoNumber className={`font-semibold ${tone}`}>{value}</MonoNumber>
    </div>
  )
}

function StatusBadge({ status, liveSessionId }: { status: EngineStatus; liveSessionId: string | null }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[status]}`}
      title={liveSessionId ? `Активная сессия: ${liveSessionId}` : undefined}
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
