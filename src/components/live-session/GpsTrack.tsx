'use client'

import { useMemo } from 'react'
import type { TelemetrySample } from '@/lib/mockData/types'

interface Props {
  samples: TelemetrySample[]
  currentIndex: number
}

// SVG-полилиния трассы из накопленных GPS-точек сессии. Без карт-библиотек —
// нормализуем lat/lon-диапазон сэмплов в 0..1, рисуем замкнутый контур и
// текущую позицию. Форма задаётся в generator.ts (per-track parametric
// shape с шиканой/S-связкой), не точная топология автодрома.
const VB = 100
const PAD = 6

export function GpsTrack({ samples, currentIndex }: Props) {
  const projected = useMemo(() => projectSamples(samples), [samples])
  if (!projected) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
        Нет GPS
      </div>
    )
  }
  const cursor = projected.points[Math.min(currentIndex, projected.points.length - 1)]
  const polyline = projected.points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  return (
    <div className="flex h-full flex-col items-center justify-center p-1">
      <svg viewBox={`0 0 ${VB} ${VB}`} className="h-[120px] w-[120px]" aria-label="GPS-трек">
        <rect x={0} y={0} width={VB} height={VB} fill="#f9fafb" />
        <polyline
          points={polyline}
          fill="none"
          stroke="#9ca3af"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <circle cx={cursor.x} cy={cursor.y} r={2.4} fill="#dc2626" stroke="#fff" strokeWidth={0.8} />
      </svg>
    </div>
  )
}

interface Projected {
  points: { x: number; y: number }[]
}

function projectSamples(samples: TelemetrySample[]): Projected | null {
  if (samples.length === 0) return null
  let minLat = Infinity
  let maxLat = -Infinity
  let minLon = Infinity
  let maxLon = -Infinity
  for (const s of samples) {
    if (s.lat < minLat) minLat = s.lat
    if (s.lat > maxLat) maxLat = s.lat
    if (s.lon < minLon) minLon = s.lon
    if (s.lon > maxLon) maxLon = s.lon
  }
  const dLat = maxLat - minLat || 1
  const dLon = maxLon - minLon || 1
  const inner = VB - PAD * 2
  const points = samples.map((s) => ({
    x: PAD + ((s.lon - minLon) / dLon) * inner,
    // SVG y растёт вниз, география — вверх; инвертируем.
    y: PAD + (1 - (s.lat - minLat) / dLat) * inner,
  }))
  return { points }
}
