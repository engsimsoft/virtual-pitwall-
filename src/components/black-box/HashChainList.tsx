'use client'

import type { SignedBlock } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { formatLapTime } from '@/lib/format'

interface Props {
  blocks: SignedBlock[]
  selectedIndex: number
  violatingIndexes: Set<number>
  onSelect: (index: number) => void
}

export function HashChainList({ blocks, selectedIndex, violatingIndexes, onSelect }: Props) {
  if (blocks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-text-muted">
        В сессии нет signed-block.
      </div>
    )
  }
  return (
    <div className="flex h-full min-h-0 flex-col overflow-auto p-2">
      <div className="mb-2 flex items-center gap-3 text-[10px] text-text-muted">
        <Legend swatch="bg-orange-100 ring-tms-orange" label="выбран" />
        <Legend swatch="bg-status-critical-dim ring-red-300" label="содержит нарушение" />
        <Legend swatch="bg-surface ring-gray-200" label="чистый" />
      </div>
      <ul className="flex flex-col gap-1.5">
        {blocks.map((b, idx) => {
          const isSelected = b.index === selectedIndex
          const hasViolation = violatingIndexes.has(b.index)
          const baseTone = isSelected
            ? 'bg-status-warn-dim border-tms-orange ring-1 ring-tms-orange'
            : hasViolation
              ? 'bg-status-critical-dim border-red-300'
              : 'bg-surface border-border hover:border-border'
          return (
            <li key={b.index}>
              <button
                type="button"
                onClick={() => onSelect(b.index)}
                className={`block w-full rounded-sm border px-2 py-1.5 text-left transition-colors ${baseTone}`}
              >
                <div className="flex items-baseline justify-between gap-2 text-[11px]">
                  <MonoNumber className="font-semibold text-text-primary">#{b.index}</MonoNumber>
                  <MonoNumber className="text-[10px] text-text-muted">
                    {formatLapTime(b.startMs)}–{formatLapTime(b.endMs)}
                  </MonoNumber>
                </div>
                <div className="mt-0.5 flex items-baseline gap-1.5 text-[10px] text-text-secondary">
                  <span className="text-text-muted">hash</span>
                  <MonoNumber className="text-text-primary">{b.hash.slice(0, 16)}…</MonoNumber>
                </div>
                {hasViolation && (
                  <div className="mt-0.5 inline-block rounded-sm border border-red-200 bg-surface px-1.5 py-0 text-[10px] font-semibold text-status-critical">
                    содержит violation
                  </div>
                )}
              </button>
              {idx < blocks.length - 1 && (
                <div className="my-0.5 text-center text-[10px] text-text-muted">↓</div>
              )}
            </li>
          )
        })}
      </ul>
      <div className="mt-2 text-[10px] text-text-muted">
        Цепочка целостна: {blocks.length} блоков, prev-hash каждого совпадает с hash предыдущего.
      </div>
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`inline-block h-2 w-2 rounded-sm ring-1 ${swatch}`} />
      {label}
    </span>
  )
}
