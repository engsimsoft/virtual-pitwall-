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

export function ReplayRpmChart({ samples, violations, currentMs }: Props) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={samples} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="tMs"
            tickFormatter={(v: number) => `${Math.floor(v / 1000)}с`}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            minTickGap={36}
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            domain={[2000, 9500]}
            stroke="#9ca3af"
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={42}
          />
          {violations
            .filter((v) => v.kind === 'rpm-mismatch')
            .map((v, idx) => (
              <ReferenceArea
                key={`rpm-${idx}`}
                x1={v.startMs}
                x2={v.endMs}
                fill="#fecaca"
                fillOpacity={0.5}
                stroke="none"
              />
            ))}
          <ReferenceLine x={currentMs} stroke="#111827" strokeWidth={1} ifOverflow="extendDomain" />
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
            stroke="#2563eb"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
            name="CAN"
          />
          <Line
            type="monotone"
            dataKey="rpmGen"
            stroke="#dc2626"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
            name="Gen"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
