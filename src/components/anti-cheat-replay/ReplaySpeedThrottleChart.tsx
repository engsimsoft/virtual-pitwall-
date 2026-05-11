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
import type { TelemetrySample } from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'

interface Props {
  samples: TelemetrySample[]
  violations: ViolationWindow[]
  currentMs: number
}

// Launch-control особенно ярко читается на этом чарте: газ 100% при V_GPS<30.
// Все типы нарушений тут подсвечиваются — каждое имеет осмысленный отпечаток
// в комбинации скорость/газ.
export function ReplaySpeedThrottleChart({ samples, violations, currentMs }: Props) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={samples} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="tMs"
            tickFormatter={(v: number) => `${Math.floor(v / 1000)}с`}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
            minTickGap={36}
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            yAxisId="speed"
            domain={[0, 260]}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
            width={36}
          />
          <YAxis
            yAxisId="throttle"
            orientation="right"
            domain={[0, 100]}
            stroke="var(--text-muted)"
            tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
            width={32}
            tickFormatter={(v: number) => `${v}%`}
          />
          {violations.map((v, idx) => (
            <ReferenceArea
              key={`st-${idx}`}
              yAxisId="speed"
              x1={v.startMs}
              x2={v.endMs}
              fill="var(--status-critical)"
              fillOpacity={0.15}
              stroke="none"
            />
          ))}
          <ReferenceLine
            yAxisId="speed"
            x={currentMs}
            stroke="var(--accent)"
            strokeWidth={1.5}
            ifOverflow="extendDomain"
          />
          <Tooltip
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
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
            stroke="var(--data-gps)"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
            name="Скорость"
          />
          <Line
            yAxisId="throttle"
            type="monotone"
            dataKey="throttlePct"
            stroke="var(--data-gen)"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
            name="Газ"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
