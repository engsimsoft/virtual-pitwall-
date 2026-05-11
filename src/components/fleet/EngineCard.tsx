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
  live: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  idle: 'border-gray-200 bg-gray-50 text-gray-700',
  maintenance: 'border-amber-200 bg-amber-50 text-amber-700',
  decommissioned: 'border-gray-200 bg-gray-100 text-gray-400',
}

export function EngineCard({ row }: Props) {
  const { engine, client, liveSession, sessionCount, incidentCount } = row
  const status = engine.status
  const revolutionsM = (engine.totalRevolutions / 1_000_000).toFixed(1)

  return (
    <Link
      href={`/demos/engine-passport?engine=${engine.id}`}
      className="flex min-h-0 flex-col gap-1.5 rounded-md border border-gray-200 bg-white p-2 transition-colors hover:border-tms-orange"
    >
      <div className="flex items-baseline justify-between gap-2">
        <MonoNumber className="text-[11px] font-semibold text-gray-900">{engine.id}</MonoNumber>
        <StatusBadge status={status} liveSessionId={liveSession?.id ?? null} />
      </div>

      <div className="min-w-0">
        <div className="truncate text-[12px] font-semibold text-gray-900">{engine.model}</div>
        <div className="truncate text-[10px] text-gray-500">{engine.serialNumber}</div>
      </div>

      <div className="truncate text-[11px] text-gray-700">
        {client ? client.name : <span className="text-gray-400">Без контракта</span>}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-1 border-t border-gray-100 pt-1.5 text-[10px] text-gray-500">
        <Stat label="Часы" value={`${engine.totalRunHours} ч`} />
        <Stat label="Обороты" value={`${revolutionsM} млн`} />
        <Stat label="Сессий" value={`${sessionCount}`} />
        <Stat label="Инцидентов" value={`${incidentCount}`} tone={incidentCount > 0 ? 'text-amber-700' : 'text-gray-700'} />
      </div>
    </Link>
  )
}

function Stat({ label, value, tone = 'text-gray-700' }: { label: string; value: string; tone?: string }) {
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
