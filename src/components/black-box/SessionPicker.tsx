'use client'

import type { BlackBoxBundle } from './BlackBoxDashboard'

interface Props {
  bundles: BlackBoxBundle[]
  selectedId: string
  onSelect: (id: string) => void
}

const STATUS_DOT: Record<string, string> = {
  live: 'bg-emerald-500',
  completed: 'bg-gray-400',
  'offline-uploading': 'bg-amber-500',
}

export function SessionPicker({ bundles, selectedId, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      <span className="shrink-0 text-[10px] uppercase tracking-wider text-gray-500">Сессия</span>
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
                ? 'border-tms-orange bg-orange-50 text-tms-graphite'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[session.status] ?? 'bg-gray-300'}`} />
            <div>
              <div className="font-semibold">{session.id}</div>
              <div className="text-[10px] text-gray-500">{engine?.id ?? '—'}</div>
            </div>
            {violationCount > 0 && (
              <span className="rounded-sm border border-red-200 bg-red-50 px-1 py-0 text-[10px] font-semibold text-red-700">
                {violationCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
