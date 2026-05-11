'use client'

import type { BlackBoxBundle } from './BlackBoxDashboard'

interface Props {
  bundles: BlackBoxBundle[]
  selectedId: string
  onSelect: (id: string) => void
}

const STATUS_DOT: Record<string, string> = {
  live: 'bg-emerald-500',
  completed: 'bg-text-muted',
  'offline-uploading': 'bg-amber-500',
}

export function SessionPicker({ bundles, selectedId, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      <span className="shrink-0 text-[10px] uppercase tracking-wider text-text-muted">Сессия</span>
      {bundles.map(({ session, engine, violations }) => {
        const active = session.id === selectedId
        const violationCount = violations.length
        return (
          <button
            key={session.id}
            type="button"
            onClick={() => onSelect(session.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-sm border px-2 py-1 text-left text-[11px] transition-colors ${
              active
                ? 'border-tms-orange bg-status-warn-dim text-text-primary'
                : 'border-border bg-surface text-text-secondary hover:bg-background'
            }`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[session.status] ?? 'bg-text-muted'}`} />
            <div>
              <div className="font-semibold">{session.id}</div>
              <div className="text-[10px] text-text-muted">{engine?.id ?? '—'}</div>
            </div>
            {violationCount > 0 && (
              <span className="rounded-sm border border-red-200 bg-status-critical-dim px-1 py-0 text-[10px] font-semibold text-status-critical">
                {violationCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
