'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Filter,
} from 'lucide-react'
import type { Alarm, AlarmSeverity, Engine, Session, Client, Driver } from '@/lib/mockData/types'
import { useAlarms } from '@/lib/alarm/AlarmContext'
import { useRole, PINNED_CLIENT_ID, PINNED_DRIVER_ID } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole, engineVisibleToRole } from '@/lib/role/access'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { MonoNumber } from '@/components/MonoNumber'
import { cn } from '@/lib/utils'

export interface AlarmRow {
  alarm: Alarm
  engine: Engine | null
  session: Session | null
  client: Client | null
  driver: Driver | null
}

interface Props {
  rows: AlarmRow[]
}

const SEVERITY_ICON: Record<AlarmSeverity, React.ElementType> = {
  critical: AlertOctagon,
  violation: AlertTriangle,
  warn: AlertCircle,
}

const SEVERITY_LABEL: Record<AlarmSeverity, string> = {
  critical: 'CRITICAL',
  violation: 'VIOLATION',
  warn: 'WARN',
}

const SEVERITY_BADGE: Record<AlarmSeverity, string> = {
  critical: 'bg-status-critical-dim text-status-critical border-status-critical',
  violation: 'bg-status-warn-dim text-status-warn border-status-warn',
  warn: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
}

const PARAM_LABEL: Record<string, string> = {
  rpm: 'Обороты',
  'oil-pressure': 'Давление масла',
  'coolant-temp': 'Температура ОЖ',
  'oil-temp': 'Температура масла',
  boost: 'Наддув',
}

export function AlarmCenterDashboard({ rows }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('alarms', role)
  const { acknowledge, unacknowledge } = useAlarms()
  const [filterSeverity, setFilterSeverity] = useState<AlarmSeverity | 'all'>('all')
  const [filterParam, setFilterParam] = useState<string>('all')
  const [showAcknowledged, setShowAcknowledged] = useState(false)

  const filtered = useMemo(() => {
    if (!hasAccess) return []
    let result = rows
    if (role === 'client') {
      result = result.filter((r) => r.engine?.clientId === PINNED_CLIENT_ID)
    } else if (role === 'driver') {
      result = result.filter((r) => r.session?.driverId === PINNED_DRIVER_ID)
    }
    if (filterSeverity !== 'all') {
      result = result.filter((r) => r.alarm.severity === filterSeverity)
    }
    if (filterParam !== 'all') {
      result = result.filter((r) => r.alarm.parameter === filterParam)
    }
    if (!showAcknowledged) {
      result = result.filter((r) => !r.alarm.acknowledged)
    }
    return result
  }, [rows, role, hasAccess, filterSeverity, filterParam, showAcknowledged])

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, violation: 0, warn: 0 }
    for (const r of rows) {
      if (!r.alarm.acknowledged && r.alarm.severity in counts) {
        counts[r.alarm.severity]++
      }
    }
    return counts
  }, [rows])

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
          <div className="text-base font-semibold text-text-primary">Alarm Center</div>
        </header>
        <EmptyForRole entity="доступа к Alarm Center" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
        <div className="text-base font-semibold text-text-primary">Alarm Center</div>
        <div className="flex items-center gap-3">
          <SeverityBadge severity="critical" count={severityCounts.critical} />
          <SeverityBadge severity="violation" count={severityCounts.violation} />
          <SeverityBadge severity="warn" count={severityCounts.warn} />
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle bg-surface px-3 py-2">
        <Filter className="h-3.5 w-3.5 text-text-muted" />
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value as AlarmSeverity | 'all')}
          className="rounded border border-border bg-background px-2 py-1 text-xs text-text-primary"
        >
          <option value="all">Все severity</option>
          <option value="critical">Critical</option>
          <option value="violation">Violation</option>
          <option value="warn">Warn</option>
        </select>
        <select
          value={filterParam}
          onChange={(e) => setFilterParam(e.target.value)}
          className="rounded border border-border bg-background px-2 py-1 text-xs text-text-primary"
        >
          <option value="all">Все параметры</option>
          <option value="rpm">Обороты</option>
          <option value="oil-pressure">Давление масла</option>
          <option value="coolant-temp">Температура ОЖ</option>
          <option value="oil-temp">Температура масла</option>
          <option value="boost">Наддув</option>
        </select>
        <label className="flex items-center gap-1.5 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={showAcknowledged}
            onChange={(e) => setShowAcknowledged(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          Показать просмотренные
        </label>
      </div>

      <main className="flex-1 overflow-auto p-3">
        {filtered.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-text-muted">
            Нет активных алармов
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((row) => (
              <AlarmCard key={row.alarm.id} row={row} onAcknowledge={() => acknowledge(row.alarm.id)} onUnacknowledge={() => unacknowledge(row.alarm.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function SeverityBadge({ severity, count }: { severity: AlarmSeverity; count: number }) {
  if (count === 0) return null
  return (
    <div className={cn('flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold', SEVERITY_BADGE[severity])}>
      <span>{SEVERITY_LABEL[severity]}</span>
      <span>{count}</span>
    </div>
  )
}

function AlarmCard({
  row,
  onAcknowledge,
  onUnacknowledge,
}: {
  row: AlarmRow
  onAcknowledge: () => void
  onUnacknowledge: () => void
}) {
  const { alarm, engine, session, client, driver } = row
  const Icon = SEVERITY_ICON[alarm.severity]
  const isAck = alarm.acknowledged

  return (
    <div
      className={cn(
        'rounded-md border bg-surface p-3 transition-opacity',
        isAck ? 'opacity-50 border-border-subtle' : 'border-border'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className={cn('flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-bold', SEVERITY_BADGE[alarm.severity])}>
            <Icon className="h-3 w-3" />
            {SEVERITY_LABEL[alarm.severity]}
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">
              {alarm.action}
            </div>
            <div className="text-xs text-text-secondary">{alarm.message}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isAck ? (
            <button
              onClick={onUnacknowledge}
              className="flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-[10px] text-text-secondary hover:bg-elevated"
            >
              <RotateCcw className="h-3 w-3" />
              Вернуть
            </button>
          ) : (
            <button
              onClick={onAcknowledge}
              className="flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-[10px] text-text-secondary hover:bg-elevated"
            >
              <CheckCircle2 className="h-3 w-3" />
              Просмотрено
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-muted">
        <span className="font-mono text-text-secondary">
          {alarm.value} {alarm.unit}
        </span>
        <span>/ лимит {alarm.limit} {alarm.unit}</span>
        <span>·</span>
        <span>{PARAM_LABEL[alarm.parameter]}</span>
        {engine && (
          <>
            <span>·</span>
            <Link href={`/demos/engine-passport?engine=${engine.id}`} className="hover:text-accent hover:underline">
              {engine.id} · {engine.model}
            </Link>
          </>
        )}
        {client && (
          <>
            <span>·</span>
            <span>{client.name}</span>
          </>
        )}
        {driver && (
          <>
            <span>·</span>
            <span>{driver.name}</span>
          </>
        )}
        {session && (
          <>
            <span>·</span>
            <Link
              href={`/demos/live-session`}
              className="hover:text-accent hover:underline"
            >
              {session.id}
            </Link>
          </>
        )}
        <span className="ml-auto">{new Date(alarm.triggeredAt).toLocaleString('ru-RU')}</span>
      </div>
    </div>
  )
}
