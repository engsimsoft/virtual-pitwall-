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
  live: 'text-status-ok',
  idle: 'text-text-secondary',
  maintenance: 'text-status-warn',
  decommissioned: 'text-text-muted',
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
    <div className="grid shrink-0 grid-cols-[auto_1fr] gap-3 rounded-md border border-border bg-surface px-3 py-2">
      <div className="flex items-center gap-3">
        <StatChip label="Всего" value={rows.length} tone="text-text-primary" />
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
      <span className="text-[10px] uppercase tracking-wider text-text-muted">{label}</span>
      <MonoNumber className={`text-sm font-semibold ${tone}`}>{value}</MonoNumber>
    </div>
  )
}

function ClientChip({ name, count, muted = false }: { name: string; count: number; muted?: boolean }) {
  const tone = muted
    ? 'border-border bg-background text-text-muted'
    : 'border-border bg-surface text-text-secondary'
  return (
    <div className={`flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] ${tone}`}>
      <span className="truncate">{name}</span>
      <MonoNumber className="font-semibold">{count}</MonoNumber>
    </div>
  )
}
