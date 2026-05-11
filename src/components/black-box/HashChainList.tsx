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
      <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
        В сессии нет signed-block.
      </div>
    )
  }
  return (
    <div className="flex h-full min-h-0 flex-col overflow-auto p-2">
      <div className="mb-2 flex items-center gap-3 text-[10px] text-gray-500">
        <Legend swatch="bg-orange-100 ring-tms-orange" label="выбран" />
        <Legend swatch="bg-red-50 ring-red-300" label="содержит нарушение" />
        <Legend swatch="bg-white ring-gray-200" label="чистый" />
      </div>
      <ul className="flex flex-col gap-1.5">
        {blocks.map((b, idx) => {
          const isSelected = b.index === selectedIndex
          const hasViolation = violatingIndexes.has(b.index)
          const baseTone = isSelected
            ? 'bg-orange-50 border-tms-orange ring-1 ring-tms-orange'
            : hasViolation
              ? 'bg-red-50 border-red-300'
              : 'bg-white border-gray-200 hover:border-gray-300'
          return (
            <li key={b.index}>
              <button
                type="button"
                onClick={() => onSelect(b.index)}
                className={`block w-full rounded-sm border px-2 py-1.5 text-left transition-colors ${baseTone}`}
              >
                <div className="flex items-baseline justify-between gap-2 text-[11px]">
                  <MonoNumber className="font-semibold text-gray-900">#{b.index}</MonoNumber>
                  <MonoNumber className="text-[10px] text-gray-500">
                    {formatLapTime(b.startMs)}–{formatLapTime(b.endMs)}
                  </MonoNumber>
                </div>
                <div className="mt-0.5 flex items-baseline gap-1.5 text-[10px] text-gray-600">
                  <span className="text-gray-400">hash</span>
                  <MonoNumber className="text-gray-800">{b.hash.slice(0, 16)}…</MonoNumber>
                </div>
                {hasViolation && (
                  <div className="mt-0.5 inline-block rounded-sm border border-red-200 bg-white px-1.5 py-0 text-[10px] font-semibold text-red-700">
                    содержит violation
                  </div>
                )}
              </button>
              {idx < blocks.length - 1 && (
                <div className="my-0.5 text-center text-[10px] text-gray-400">↓</div>
              )}
            </li>
          )
        })}
      </ul>
      <div className="mt-2 text-[10px] text-gray-500">
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
