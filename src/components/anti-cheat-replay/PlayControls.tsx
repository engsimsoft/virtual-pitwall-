'use client'

import type { ViolationWindow } from '@/lib/mockData'

interface Props {
  playing: boolean
  currentMs: number
  durationMs: number
  violations: ViolationWindow[]
  onPlayToggle: () => void
  onSeek: (ms: number) => void
}

const STEP_MS = 1000

// Контролы транспорта: play/pause + ±1s + reset + перепрыжки между violation
// windows. Последнее — главная фишка для ревью: оператор хочет быстро бегать
// между моментами расхождения каналов, не скрабить вручную.
export function PlayControls({
  playing,
  currentMs,
  durationMs,
  violations,
  onPlayToggle,
  onSeek,
}: Props) {
  const seekDelta = (delta: number) => onSeek(clamp(currentMs + delta, 0, durationMs))
  const jumpToPrevViolation = () => {
    const sorted = [...violations].sort((a, b) => a.startMs - b.startMs)
    const prev = [...sorted].reverse().find((v) => v.startMs < currentMs - 100)
    if (prev) onSeek(prev.startMs)
  }
  const jumpToNextViolation = () => {
    const sorted = [...violations].sort((a, b) => a.startMs - b.startMs)
    const next = sorted.find((v) => v.startMs > currentMs + 100)
    if (next) onSeek(next.startMs)
  }

  return (
    <div className="flex items-center gap-1">
      <Btn label="⏮" title="К началу" onClick={() => onSeek(0)} />
      <Btn label="◀◀" title="К предыдущему нарушению" onClick={jumpToPrevViolation} />
      <Btn label="−1с" title="−1 с" onClick={() => seekDelta(-STEP_MS)} />
      <Btn
        label={playing ? '⏸ Пауза' : '▶ Воспроизвести'}
        primary
        onClick={onPlayToggle}
      />
      <Btn label="+1с" title="+1 с" onClick={() => seekDelta(STEP_MS)} />
      <Btn label="▶▶" title="К следующему нарушению" onClick={jumpToNextViolation} />
    </div>
  )
}

function Btn({
  label,
  title,
  primary,
  onClick,
}: {
  label: string
  title?: string
  primary?: boolean
  onClick: () => void
}) {
  const base = 'rounded-sm border px-2 py-1 text-[11px] font-semibold transition-colors'
  const tone = primary
    ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
    : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
  return (
    <button type="button" title={title} onClick={onClick} className={`${base} ${tone}`}>
      {label}
    </button>
  )
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}
