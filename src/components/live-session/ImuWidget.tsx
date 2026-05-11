'use client'

import type { TelemetrySample } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'

interface Props {
  sample: TelemetrySample
}

// G-circle: горизонтальная ось — поперечное ускорение (повороты), вертикальная
// (инвертирована) — продольное (разгон/торможение). Шкала ±1.5G.
const RANGE_G = 1.5
const SIZE = 110
const CENTER = SIZE / 2
const RADIUS = (SIZE - 16) / 2

export function ImuWidget({ sample }: Props) {
  const xPct = clamp(sample.accLatG / RANGE_G, -1, 1)
  const yPct = clamp(-sample.accLongG / RANGE_G, -1, 1)
  const px = CENTER + xPct * RADIUS
  const py = CENTER + yPct * RADIUS

  return (
    <div className="flex h-full flex-col items-center justify-between gap-1 p-1 text-xs">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-[88px] w-[88px]" aria-label="G-circle">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#f9fafb" stroke="#d1d5db" strokeWidth={1} />
        <circle cx={CENTER} cy={CENTER} r={RADIUS / 2} fill="none" stroke="#e5e7eb" strokeWidth={0.5} />
        <line x1={CENTER - RADIUS} y1={CENTER} x2={CENTER + RADIUS} y2={CENTER} stroke="#d1d5db" strokeWidth={0.5} />
        <line x1={CENTER} y1={CENTER - RADIUS} x2={CENTER} y2={CENTER + RADIUS} stroke="#d1d5db" strokeWidth={0.5} />
        <circle cx={px} cy={py} r={3.5} fill="#dc2626" stroke="#fff" strokeWidth={1} />
      </svg>
      <div className="grid w-full grid-cols-2 gap-x-2 text-[10px]">
        <Stat label="Поперечное" value={sample.accLatG.toFixed(2)} unit="G" />
        <Stat label="Продольное" value={sample.accLongG.toFixed(2)} unit="G" />
      </div>
    </div>
  )
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-text-muted">{label}</span>
      <span className="flex items-baseline gap-0.5">
        <MonoNumber className="font-semibold text-text-primary">{value}</MonoNumber>
        <span className="text-text-muted">{unit}</span>
      </span>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}
