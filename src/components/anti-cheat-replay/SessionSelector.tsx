'use client'

import type { Session } from '@/lib/mockData/types'

interface Bundle {
  session: Session
  label: string
  sublabel: string
}

interface Props {
  bundles: Bundle[]
  selectedId: string
  onSelect: (id: string) => void
}

// Chip-style selector over violation sessions. Replay-экран без выбора инцидента
// бессмыслен — это не live-просмотр, а ревью прошлых событий.
export function SessionSelector({ bundles, selectedId, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      <span className="shrink-0 text-[10px] uppercase tracking-wider text-gray-500">Инцидент</span>
      {bundles.map((b) => {
        const active = b.session.id === selectedId
        return (
          <button
            key={b.session.id}
            type="button"
            onClick={() => onSelect(b.session.id)}
            className={`shrink-0 rounded-sm border px-2 py-1 text-left text-[11px] transition-colors ${
              active
                ? 'border-red-300 bg-red-50 text-red-800'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold">{b.label}</div>
            <div className="text-[10px] text-gray-500">{b.sublabel}</div>
          </button>
        )
      })}
    </div>
  )
}

export type { Bundle as SessionBundle }
