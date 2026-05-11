'use client'

import type { SignedBlock } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'

interface Props {
  blocks: SignedBlock[]
  currentTms: number
  durationMs: number
}

// Цепочка подписанных блоков: каждый блок — окно фиксированной длительности с
// hash и prevHash, образующих неразрывную последовательность. Здесь — чисто
// визуализация (хэши синтетические); реальная криптоверификация задача чёрного
// ящика, не прототипного UI.
export function SignedBlockBar({ blocks, currentTms, durationMs }: Props) {
  const cursorPct = Math.min(100, Math.max(0, (currentTms / durationMs) * 100))

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border-subtle px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
        Подписанные блоки ({blocks.length})
      </div>
      <div className="relative flex-1 px-2 pt-2">
        <div className="relative flex h-7 w-full overflow-hidden rounded-sm border border-border bg-background">
          {blocks.map((b) => {
            const widthPct = ((b.endMs - b.startMs) / durationMs) * 100
            const active = currentTms >= b.startMs && currentTms < b.endMs
            return (
              <div
                key={b.index}
                style={{ width: `${widthPct}%` }}
                className={`flex items-center justify-center border-r border-border-subtle last:border-r-0 ${
                  active ? 'bg-status-ok-dim text-status-ok' : 'bg-elevated text-text-muted'
                }`}
              >
                <MonoNumber className="text-[10px]">#{b.index}</MonoNumber>
              </div>
            )
          })}
          <div
            className="absolute top-0 h-full w-px bg-status-critical"
            style={{ left: `${cursorPct}%` }}
          />
        </div>
        <ul className="mt-1.5 grid grid-cols-2 gap-x-3 text-[10px] text-text-muted">
          {blocks.map((b) => (
            <li key={b.index} className="flex items-center gap-1.5">
              <span className="text-text-muted">#{b.index}</span>
              <MonoNumber className="text-text-secondary">{b.hash.slice(0, 8)}…</MonoNumber>
              <span className="text-text-muted">← prev</span>
              <MonoNumber className="text-text-muted">{b.prevHash.slice(0, 8)}…</MonoNumber>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
