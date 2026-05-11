'use client'

import {
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useMemo } from 'react'
import type { TelemetrySample } from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'
import { estimateBoost } from '@/lib/antiCheat'

interface Props {
  samples: TelemetrySample[]
  violations: ViolationWindow[]
  currentMs: number
}

interface Row {
  tMs: number
  declared: number
  estimate: number
}

// Подсветка релевантна и для boost-mismatch (расхождение declared vs estimate),
// и для launch-control (нулевая скорость + высокий наддув). Оба раскрашиваются
// одинаково — это «boost-канал в окне нарушения».
const HIGHLIGHT_KINDS = new Set(['boost-mismatch', 'launch-control'])

export function ReplayBoostChart({ samples, violations, currentMs }: Props) {
  const data: Row[] = useMemo(
    () =>
      samples.map((s) => ({
        tMs: s.tMs,
        declared: s.boostBarCan,
        estimate: Math.round(estimateBoost(s) * 100) / 100,
      })),
    [samples]
  )

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="tMs"
            tickFormatter={(v: number) => `${Math.floor(v / 1000)}с`}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            minTickGap={36}
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            domain={[0, 2.2]}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={36}
            tickFormatter={(v: number) => v.toFixed(1)}
          />
          {violations
            .filter((v) => HIGHLIGHT_KINDS.has(v.kind))
            .map((v, idx) => (
              <ReferenceArea
                key={`b-${idx}`}
                x1={v.startMs}
                x2={v.endMs}
                fill="var(--status-critical)"
                fillOpacity={0.15}
                stroke="none"
              />
            ))}
          <ReferenceLine x={currentMs} stroke="var(--text-primary)" strokeWidth={1} ifOverflow="extendDomain" />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              fontFamily: 'var(--font-geist-mono)',
              padding: '6px 8px',
            }}
            labelFormatter={(v: number) => `t=${(v / 1000).toFixed(1)} с`}
            formatter={(v: number, name: string) => [v.toFixed(2), name]}
          />
          <Line
            type="monotone"
            dataKey="declared"
            stroke="var(--data-can)"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
            name="CAN"
          />
          <Line
            type="monotone"
            dataKey="estimate"
            stroke="var(--status-critical)"
            strokeWidth={1.2}
            strokeDasharray="4 3"
            dot={false}
            isAnimationActive={false}
            name="Оценка"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
