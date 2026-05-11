'use client'

import type { IncidentKind } from '@/lib/mockData/types'
import type { SeverityFilter } from './IncidentsDashboard'

interface Props {
  severityFilter: SeverityFilter
  onSeverityChange: (v: SeverityFilter) => void
  kindFilter: IncidentKind | 'all'
  onKindChange: (v: IncidentKind | 'all') => void
  kinds: IncidentKind[]
  counts: { all: number; violation: number; warn: number; info: number }
}

const KIND_LABEL: Record<IncidentKind, string> = {
  'rpm-mismatch': 'RPM mismatch',
  overrev: 'Overrev',
  'boost-mismatch': 'Boost mismatch',
  'launch-control': 'Launch control',
  'tamper-detected': 'Tamper',
  overboost: 'Overboost',
  'temp-warn': 'Temperature',
}

export function FilterBar({
  severityFilter,
  onSeverityChange,
  kindFilter,
  onKindChange,
  kinds,
  counts,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-gray-200 bg-white px-3 py-2">
      <FilterGroup label="Severity">
        <Chip
          active={severityFilter === 'all'}
          onClick={() => onSeverityChange('all')}
          tone="neutral"
          count={counts.all}
        >
          Все
        </Chip>
        <Chip
          active={severityFilter === 'violation'}
          onClick={() => onSeverityChange('violation')}
          tone="violation"
          count={counts.violation}
        >
          Violation
        </Chip>
        <Chip
          active={severityFilter === 'warn'}
          onClick={() => onSeverityChange('warn')}
          tone="warn"
          count={counts.warn}
        >
          Warn
        </Chip>
        <Chip
          active={severityFilter === 'info'}
          onClick={() => onSeverityChange('info')}
          tone="info"
          count={counts.info}
        >
          Info
        </Chip>
      </FilterGroup>

      <FilterGroup label="Kind">
        <Chip
          active={kindFilter === 'all'}
          onClick={() => onKindChange('all')}
          tone="neutral"
        >
          Все
        </Chip>
        {kinds.map((k) => (
          <Chip
            key={k}
            active={kindFilter === k}
            onClick={() => onKindChange(k)}
            tone="neutral"
          >
            {KIND_LABEL[k]}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  )
}

const TONE_ACTIVE: Record<'neutral' | 'violation' | 'warn' | 'info', string> = {
  neutral: 'border-tms-orange bg-orange-50 text-tms-graphite',
  violation: 'border-red-300 bg-red-50 text-red-800',
  warn: 'border-amber-300 bg-amber-50 text-amber-800',
  info: 'border-blue-300 bg-blue-50 text-blue-800',
}

function Chip({
  active,
  onClick,
  tone,
  count,
  children,
}: {
  active: boolean
  onClick: () => void
  tone: 'neutral' | 'violation' | 'warn' | 'info'
  count?: number
  children: React.ReactNode
}) {
  const base = 'shrink-0 rounded-sm border px-2 py-0.5 text-[11px] transition-colors'
  const cls = active
    ? TONE_ACTIVE[tone]
    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
  return (
    <button type="button" onClick={onClick} className={`${base} ${cls}`}>
      {children}
      {count !== undefined && (
        <span className="ml-1 font-mono text-[10px] text-gray-500">{count}</span>
      )}
    </button>
  )
}
