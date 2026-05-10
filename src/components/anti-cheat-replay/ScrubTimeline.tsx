'use client'

import { useCallback, useRef } from 'react'
import type { ViolationWindow } from '@/lib/mockData'
import { MonoNumber } from '@/components/MonoNumber'
import { formatLapTime } from '@/lib/format'

interface Props {
  durationMs: number
  currentMs: number
  violations: ViolationWindow[]
  onSeek: (ms: number) => void
}

// Полная длина сессии в одной полосе. Клик/перетаскивание устанавливает
// текущее положение playhead. Подсвеченные диапазоны — окна нарушений из
// VIOLATION_WINDOWS (точное, что зашито в генераторе, а не приблизительное
// округление вокруг incident.tMs).
export function ScrubTimeline({ durationMs, currentMs, violations, onSeek }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  const seekFromEvent = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pct = clamp((clientX - rect.left) / rect.width, 0, 1)
      onSeek(pct * durationMs)
    },
    [durationMs, onSeek]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    seekFromEvent(e.clientX)
    const onMove = (ev: MouseEvent) => seekFromEvent(ev.clientX)
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const cursorPct = (currentMs / durationMs) * 100

  return (
    <div className="flex w-full items-center gap-3">
      <MonoNumber className="shrink-0 text-[11px] text-gray-500">{formatLapTime(currentMs)}</MonoNumber>
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className="relative h-6 flex-1 cursor-pointer rounded-sm border border-gray-200 bg-gray-50"
      >
        {violations.map((v, idx) => {
          const left = (v.startMs / durationMs) * 100
          const width = ((v.endMs - v.startMs) / durationMs) * 100
          return (
            <div
              key={idx}
              style={{ left: `${left}%`, width: `${width}%` }}
              className="absolute top-0 h-full bg-red-200/70"
              title={`${v.kind} · ${formatLapTime(v.startMs)}–${formatLapTime(v.endMs)}`}
            />
          )
        })}
        <div
          className="absolute top-0 h-full w-px bg-gray-900"
          style={{ left: `${cursorPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-900 bg-white shadow-sm"
          style={{ left: `${cursorPct}%`, width: 10, height: 10 }}
        />
      </div>
      <MonoNumber className="shrink-0 text-[11px] text-gray-500">{formatLapTime(durationMs)}</MonoNumber>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}
