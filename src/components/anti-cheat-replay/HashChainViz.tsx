'use client'

import type { SignedBlock } from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'
import { MonoNumber } from '@/components/MonoNumber'
import { formatLapTime } from '@/lib/format'

interface Props {
  blocks: SignedBlock[]
  violations: ViolationWindow[]
  currentMs: number
}

// Цепочка signed-block: каждый блок ссылается на хэш предыдущего, образуя
// неразрывную последовательность. Здесь — визуализация поверх синтетических
// хэшей, реальная криптоверификация задача чёрного ящика, не прототипного UI.
// Подсвечиваются блоки, содержащие violation-окно: именно их нужно показывать
// клиенту в споре «вы поменяли логи постфактум — нет, посмотрите цепочку».
export function HashChainViz({ blocks, violations, currentMs }: Props) {
  return (
    <div className="flex h-full flex-col p-2 text-[11px]">
      <div className="mb-2 flex items-center gap-2 text-[10px] text-text-muted">
        <span className="inline-block h-2 w-2 rounded-sm bg-status-ok-dim ring-1 ring-emerald-300" />
        активный блок
        <span className="ml-2 inline-block h-2 w-2 rounded-sm bg-red-100 ring-1 ring-red-300" />
        содержит нарушение
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-auto">
        {blocks.map((b, idx) => {
          const active = currentMs >= b.startMs && currentMs < b.endMs
          const hasViolation = violations.some((v) => v.startMs < b.endMs && v.endMs > b.startMs)
          const bgColor = active
            ? 'bg-status-ok-dim border-emerald-300'
            : hasViolation
              ? 'bg-status-critical-dim border-red-300'
              : 'bg-surface border-border'
          return (
            <div key={b.index} className={`rounded-sm border px-2 py-1.5 ${bgColor}`}>
              <div className="flex items-baseline justify-between gap-2">
                <MonoNumber className="font-semibold text-text-primary">#{b.index}</MonoNumber>
                <MonoNumber className="text-[10px] text-text-muted">
                  {formatLapTime(b.startMs)}–{formatLapTime(b.endMs)}
                </MonoNumber>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1.5 text-[10px] text-text-secondary">
                <span className="text-text-muted">hash</span>
                <MonoNumber className="text-text-primary">{b.hash.slice(0, 12)}…</MonoNumber>
              </div>
              <div className="flex items-baseline gap-1.5 text-[10px] text-text-muted">
                <span className="text-text-muted">prev</span>
                <MonoNumber>{b.prevHash.slice(0, 12)}…</MonoNumber>
              </div>
              {idx < blocks.length - 1 && (
                <div className="mt-0.5 text-center text-[10px] text-text-muted">↓</div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-1.5 text-[10px] text-text-muted">
        Цепочка целостна: {blocks.length} блоков, prev-hash каждого совпадает с hash предыдущего.
      </div>
    </div>
  )
}
