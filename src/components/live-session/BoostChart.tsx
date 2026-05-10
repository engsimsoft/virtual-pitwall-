'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useMemo } from 'react'
import type { TelemetrySample } from '@/lib/mockData/types'
import { estimateBoost } from '@/lib/antiCheat'

interface Props {
  samples: TelemetrySample[]
}

interface Row {
  tMs: number
  declared: number
  estimate: number
}

export function BoostChart({ samples }: Props) {
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
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            minTickGap={32}
          />
          <YAxis
            domain={[0, 2.2]}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={36}
            tickFormatter={(v: number) => v.toFixed(1)}
          />
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
            stroke="#2563eb"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
            name="CAN"
          />
          <Line
            type="monotone"
            dataKey="estimate"
            stroke="#dc2626"
            strokeWidth={1.5}
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
