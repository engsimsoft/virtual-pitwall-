'use client'

import type { PassportBundle } from './EnginePassportDashboard'

interface Props {
  bundles: PassportBundle[]
  selectedId: string
  onSelect: (id: string) => void
}

export function EngineSelector({ bundles, selectedId, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      <span className="shrink-0 text-[10px] uppercase tracking-wider text-text-muted">Мотор</span>
      {bundles.map(({ engine, client }) => {
        const active = engine.id === selectedId
        return (
          <button
            key={engine.id}
            type="button"
            onClick={() => onSelect(engine.id)}
            className={`shrink-0 rounded-sm border px-2 py-1 text-left text-[11px] transition-colors ${
              active
                ? 'border-tms-orange bg-status-warn-dim text-text-primary'
                : 'border-border bg-surface text-text-secondary hover:bg-background'
            }`}
          >
            <div className="font-semibold">
              {engine.id} · {engine.model}
            </div>
            <div className="text-[10px] text-text-muted">
              {client?.name ?? 'Без контракта'}
            </div>
          </button>
        )
      })}
    </div>
  )
}
