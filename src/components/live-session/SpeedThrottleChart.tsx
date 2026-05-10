'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TelemetrySample } from '@/lib/mockData/types'

interface Props {
  samples: TelemetrySample[]
}

// Скорость и педаль газа физически разные величины — две Y-оси оправданы.
// Слева — скорость (км/ч), справа — газ (%).
export function SpeedThrottleChart({ samples }: Props) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={samples} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="tMs"
            tickFormatter={(v: number) => `${Math.floor(v / 1000)}с`}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            minTickGap={32}
          />
          <YAxis
            yAxisId="speed"
            domain={[0, 260]}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={36}
          />
          <YAxis
            yAxisId="throttle"
            orientation="right"
            domain={[0, 100]}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={32}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              fontFamily: 'var(--font-geist-mono)',
              padding: '6px 8px',
            }}
            labelFormatter={(v: number) => `t=${(v / 1000).toFixed(1)} с`}
            formatter={(v: number, name: string) => [Math.round(v), name]}
          />
          <Line
            yAxisId="speed"
            type="monotone"
            dataKey="vGpsKmh"
            stroke="#0f766e"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
            name="Скорость"
          />
          <Line
            yAxisId="throttle"
            type="monotone"
            dataKey="throttlePct"
            stroke="#ea580c"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
            name="Газ"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
