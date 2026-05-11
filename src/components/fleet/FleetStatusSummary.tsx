import type { Client, EngineStatus } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import type { FleetEngineRow } from './FleetDashboard'

interface Props {
  rows: FleetEngineRow[]
  clients: Client[]
}

const STATUS_LABEL: Record<EngineStatus, string> = {
  live: 'LIVE',
  idle: 'IDLE',
  maintenance: 'MAINT',
  decommissioned: 'DECOM',
}

const STATUS_TONE: Record<EngineStatus, string> = {
  live: 'text-emerald-700',
  idle: 'text-gray-700',
  maintenance: 'text-amber-700',
  decommissioned: 'text-gray-400',
}

export function FleetStatusSummary({ rows, clients }: Props) {
  const totals: Record<EngineStatus, number> = {
    live: 0,
    idle: 0,
    maintenance: 0,
    decommissioned: 0,
  }
  for (const r of rows) totals[r.engine.status]++

  const noContract = rows.filter((r) => r.client === null).length
  const byClient = clients.map((c) => ({
    client: c,
    count: rows.filter((r) => r.client?.id === c.id).length,
  }))

  return (
    <div className="grid shrink-0 grid-cols-[auto_1fr] gap-3 rounded-md border border-gray-200 bg-white px-3 py-2">
      <div className="flex items-center gap-3">
        <StatChip label="Всего" value={rows.length} tone="text-gray-900" />
        {(Object.keys(totals) as EngineStatus[]).map((s) => (
          <StatChip key={s} label={STATUS_LABEL[s]} value={totals[s]} tone={STATUS_TONE[s]} />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-1.5">
        {byClient.map(({ client, count }) => (
          <ClientChip key={client.id} name={client.name} count={count} />
        ))}
        {noContract > 0 && <ClientChip name="Без контракта" count={noContract} muted />}
      </div>
    </div>
  )
}

function StatChip({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <MonoNumber className={`text-sm font-semibold ${tone}`}>{value}</MonoNumber>
    </div>
  )
}

function ClientChip({ name, count, muted = false }: { name: string; count: number; muted?: boolean }) {
  const tone = muted
    ? 'border-gray-200 bg-gray-50 text-gray-500'
    : 'border-gray-200 bg-white text-gray-700'
  return (
    <div className={`flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] ${tone}`}>
      <span className="truncate">{name}</span>
      <MonoNumber className="font-semibold">{count}</MonoNumber>
    </div>
  )
}
