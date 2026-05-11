'use client'

import { useState, useMemo } from 'react'
import {
  Flag,
  AlertTriangle,
  AlertOctagon,
  Shield,
  Eye,
  CheckCircle2,
  Timer,
} from 'lucide-react'
import type { RaceEntry, RaceFlag } from '@/lib/mockData/race-control'
import { useRole } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole } from '@/lib/role/access'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { cn } from '@/lib/utils'

interface Props {
  entries: RaceEntry[]
}

const STATUS_LABEL: Record<RaceEntry['status'], string> = {
  'on-track': 'ON TRACK',
  pits: 'PITS',
  finished: 'FINISHED',
  dnf: 'DNF',
}

const STATUS_STYLE: Record<RaceEntry['status'], string> = {
  'on-track': 'bg-status-ok-dim text-status-ok',
  pits: 'bg-status-info-dim text-status-info',
  finished: 'bg-status-ok-dim text-status-ok',
  dnf: 'bg-status-critical-dim text-status-critical',
}

const FLAG_ICON: Record<RaceFlag['kind'], React.ElementType> = {
  'track-limits': Flag,
  'rpm-mismatch': Shield,
  overboost: AlertTriangle,
}

const FLAG_STYLE: Record<RaceFlag['severity'], string> = {
  warn: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  violation: 'bg-status-critical-dim text-status-critical border-status-critical',
}

function formatLap(ms: number): string {
  const m = Math.floor(ms / 60000)
  const s = ((ms % 60000) / 1000).toFixed(3)
  return `${m}:${s.padStart(6, '0')}`
}

function formatGap(ms: number | null): string {
  if (ms === null) return '—'
  if (ms < 1000) return `+${(ms / 1000).toFixed(3)}`
  return `+${(ms / 1000).toFixed(1)}`
}

function formatSector(ms: number): string {
  return (ms / 1000).toFixed(1)
}

export function RaceControlDashboard({ entries }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('race-control', role)
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set())
  const [showOnlyFlags, setShowOnlyFlags] = useState(false)

  const toggleChecked = (num: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(num)) next.delete(num)
      else next.add(num)
      return next
    })
  }

  const filtered = useMemo(() => {
    if (!showOnlyFlags) return entries
    return entries.filter((e) => e.flags.length > 0)
  }, [entries, showOnlyFlags])

  const activeFlagsCount = useMemo(
    () => entries.filter((e) => e.flags.length > 0).length,
    [entries]
  )

  const violationCount = useMemo(
    () =>
      entries.reduce(
        (sum, e) => sum + e.flags.filter((f) => f.severity === 'violation').length,
        0
      ),
    [entries]
  )

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
          <div className="text-base font-semibold text-text-primary">Race Control</div>
        </header>
        <EmptyForRole entity="доступа к Race Control" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="text-base font-semibold text-text-primary">Race Control</div>
          <div className="text-[11px] text-text-muted">
            15 участников · Moscow Raceway
          </div>
        </div>
        <div className="flex items-center gap-3">
          {violationCount > 0 && (
            <div className="flex items-center gap-1 rounded-sm border border-status-critical bg-status-critical-dim px-2 py-0.5 text-[10px] font-bold text-status-critical">
              <AlertOctagon className="h-3 w-3" />
              {violationCount} VIOLATION
            </div>
          )}
          {activeFlagsCount > 0 && (
            <div className="flex items-center gap-1 rounded-sm border border-status-warn bg-status-warn-dim px-2 py-0.5 text-[10px] font-bold text-status-warn">
              <AlertTriangle className="h-3 w-3" />
              {activeFlagsCount} FLAG
            </div>
          )}
          <label className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <input
              type="checkbox"
              checked={showOnlyFlags}
              onChange={(e) => setShowOnlyFlags(e.target.checked)}
              className="h-3.5 w-3.5 accent-accent"
            />
            Только с нарушениями
          </label>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10 bg-surface">
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-text-muted">
              <th className="px-2 py-1.5 font-medium">Pos</th>
              <th className="px-2 py-1.5 font-medium">№</th>
              <th className="px-2 py-1.5 font-medium">Гонщик</th>
              <th className="px-2 py-1.5 font-medium">Команда</th>
              <th className="px-2 py-1.5 font-medium text-right">S1</th>
              <th className="px-2 py-1.5 font-medium text-right">S2</th>
              <th className="px-2 py-1.5 font-medium text-right">S3</th>
              <th className="px-2 py-1.5 font-medium text-right">Last</th>
              <th className="px-2 py-1.5 font-medium text-right">Best</th>
              <th className="px-2 py-1.5 font-medium text-right">Gap</th>
              <th className="px-2 py-1.5 font-medium">Флаги</th>
              <th className="px-2 py-1.5 font-medium">Статус</th>
              <th className="px-2 py-1.5 font-medium">Действие</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <RaceRow
                key={entry.number}
                entry={entry}
                checked={checkedIds.has(entry.number)}
                onToggle={() => toggleChecked(entry.number)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

function RaceRow({
  entry,
  checked,
  onToggle,
}: {
  entry: RaceEntry
  checked: boolean
  onToggle: () => void
}) {
  const hasViolation = entry.flags.some((f) => f.severity === 'violation')
  const hasWarn = entry.flags.some((f) => f.severity === 'warn')

  return (
    <tr
      className={cn(
        'border-b border-border-subtle transition-colors',
        hasViolation && 'bg-status-critical-dim/30',
        hasWarn && !hasViolation && 'bg-amber-500/5',
        checked && 'opacity-40'
      )}
    >
      <td className="px-2 py-1.5 font-mono font-bold text-text-primary">
        {entry.position}
      </td>
      <td className="px-2 py-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-accent text-[10px] font-bold text-text-inverse">
          {entry.number}
        </div>
      </td>
      <td className="px-2 py-1.5 font-medium text-text-primary">
        {entry.driverName}
      </td>
      <td className="px-2 py-1.5 text-text-secondary">{entry.team}</td>
      <td className="px-2 py-1.5 text-right font-mono text-text-secondary">
        {formatSector(entry.sector1Ms)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono text-text-secondary">
        {formatSector(entry.sector2Ms)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono text-text-secondary">
        {formatSector(entry.sector3Ms)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono text-text-primary">
        {formatLap(entry.lastLapMs)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono font-semibold text-accent">
        {formatLap(entry.bestLapMs)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono text-text-secondary">
        {formatGap(entry.gapMs)}
      </td>
      <td className="px-2 py-1.5">
        <div className="flex flex-wrap gap-1">
          {entry.flags.map((flag, i) => {
            const Icon = FLAG_ICON[flag.kind]
            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-0.5 rounded-sm border px-1 py-0.5 text-[9px] font-bold',
                  FLAG_STYLE[flag.severity]
                )}
                title={flag.message}
              >
                <Icon className="h-2.5 w-2.5" />
                {flag.kind === 'track-limits' ? 'TL' : flag.kind === 'rpm-mismatch' ? 'RPM' : 'BOOST'}
                {flag.count > 1 && `×${flag.count}`}
              </div>
            )
          })}
        </div>
      </td>
      <td className="px-2 py-1.5">
        <span
          className={cn(
            'rounded-sm px-1.5 py-0.5 text-[9px] font-bold',
            STATUS_STYLE[entry.status]
          )}
        >
          {STATUS_LABEL[entry.status]}
        </span>
      </td>
      <td className="px-2 py-1.5">
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-1 rounded-sm border px-2 py-1 text-[10px] font-medium transition-colors',
            checked
              ? 'border-status-ok bg-status-ok-dim text-status-ok'
              : 'border-border bg-elevated text-text-secondary hover:border-accent hover:text-accent'
          )}
        >
          {checked ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Проверен
            </>
          ) : (
            <>
              <Eye className="h-3 w-3" />
              Проверить
            </>
          )}
        </button>
      </td>
    </tr>
  )
}
