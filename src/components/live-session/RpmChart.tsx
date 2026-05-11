'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TelemetrySample } from '@/lib/mockData/types'

interface Props {
  samples: TelemetrySample[]
}

// Два канала RPM на одной оси: rpmCan (декларация ECU) и rpmGen (независимый
// импульсный датчик). На честных сессиях линии сливаются; на нарушениях
// расходятся — это и есть фирменный приём anti-cheat Telos.
export function RpmChart({ samples }: Props) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={samples} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="tMs"
            tickFormatter={(v: number) => `${Math.floor(v / 1000)}с`}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            minTickGap={32}
          />
          <YAxis
            domain={[2000, 9500]}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={42}
            tickFormatter={(v: number) => String(v)}
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
            type="monotone"
            dataKey="rpmCan"
            stroke="var(--data-can)"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
            name="CAN"
          />
          <Line
            type="monotone"
            dataKey="rpmGen"
            stroke="var(--status-critical)"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
            name="Gen"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
