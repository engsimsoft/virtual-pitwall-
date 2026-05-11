'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DynoCurve, Engine } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'

interface Props {
  engine: Engine
  dyno: DynoCurve | null
}

// Стендовая характеристика мотора. Шапка — короткий протокольный лейбл с
// датой замера и типом стенда. Сверху строкой — два peak-чипа (мощность и
// момент). Ниже — двух-осевой график P/M на всю ширину карточки.
export function DynoCard({ engine: _engine, dyno }: Props) {
  if (!dyno || dyno.samples.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-md border border-border bg-surface text-[11px] text-text-muted">
        Стендовая характеристика недоступна.
      </div>
    )
  }

  const samples = dyno.samples
  const peakPower = samples.reduce((a, b) => (b.powerKw > a.powerKw ? b : a))
  const peakTorque = samples.reduce((a, b) => (b.torqueNm > a.torqueNm ? b : a))
  const rpmMax = samples[samples.length - 1].rpm
  const powerMax = Math.ceil(peakPower.powerKw / 50) * 50
  const torqueMax = Math.ceil(peakTorque.torqueNm / 50) * 50

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-surface">
      <div className="flex items-baseline justify-between gap-3 border-b border-border-subtle px-3 py-1.5">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Стендовая характеристика
          </div>
          <div className="truncate text-[11px] text-text-muted">
            TMS Bench · LPS 3000 PKW (synthetic baseline)
          </div>
        </div>
        <div className="text-right text-[10px] text-text-muted">
          <div>Otto-Motor / Turbocharger</div>
          <div>
            Замер: <span className="font-mono">{dyno.measuredAt}</span>
          </div>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-2 px-3 py-2">
        <PeakTile
          label="Пиковая мощность"
          value={`${peakPower.powerKw.toFixed(1)} кВт`}
          sub={`@ ${peakPower.rpm} об/мин`}
          accent="text-accent"
          dotClass="bg-tms-orange"
        />
        <PeakTile
          label="Пиковый момент"
          value={`${peakTorque.torqueNm} Н·м`}
          sub={`@ ${peakTorque.rpm} об/мин`}
          accent="text-text-primary"
          dotClass="bg-tms-graphite"
        />
      </div>

      <div className="min-h-0 flex-1 px-2 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={samples} margin={{ top: 12, right: 28, left: 8, bottom: 12 }}>
            <CartesianGrid stroke="var(--grid-line)" strokeDasharray="2 4" />
            <XAxis
              dataKey="rpm"
              type="number"
              domain={[samples[0].rpm, rpmMax]}
              tickFormatter={(v) => `${v}`}
              tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'var(--font-geist-mono)' }}
              stroke="#9ca3af"
              label={{ value: 'n [об/мин]', position: 'insideBottomRight', offset: -4, fontSize: 10, fill: '#6b7280' }}
            />
            <YAxis
              yAxisId="power"
              domain={[0, powerMax]}
              tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'var(--font-geist-mono)' }}
              stroke="#9ca3af"
              label={{ value: 'P [кВт]', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6b7280' }}
            />
            <YAxis
              yAxisId="torque"
              orientation="right"
              domain={[0, torqueMax]}
              tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'var(--font-geist-mono)' }}
              stroke="#9ca3af"
              label={{ value: 'M [Н·м]', angle: 90, position: 'insideRight', fontSize: 10, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)' }}
              labelFormatter={(v) => `${v} об/мин`}
              formatter={(value: number, name: string) => {
                if (name === 'powerKw') return [`${value.toFixed(1)} кВт`, 'Мощность']
                if (name === 'torqueNm') return [`${value} Н·м`, 'Момент']
                return [value, name]
              }}
            />
            <Line
              yAxisId="power"
              type="monotone"
              dataKey="powerKw"
              stroke="#ff4f00"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              yAxisId="torque"
              type="monotone"
              dataKey="torqueNm"
              stroke="#39393f"
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceDot
              yAxisId="power"
              x={peakPower.rpm}
              y={peakPower.powerKw}
              r={4}
              fill="#ff4f00"
              stroke="white"
              strokeWidth={1.5}
            />
            <ReferenceDot
              yAxisId="torque"
              x={peakTorque.rpm}
              y={peakTorque.torqueNm}
              r={4}
              fill="#39393f"
              stroke="white"
              strokeWidth={1.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function PeakTile({
  label,
  value,
  sub,
  accent,
  dotClass,
}: {
  label: string
  value: string
  sub: string
  accent: string
  dotClass: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
        <MonoNumber className={`text-base font-semibold ${accent}`}>{value}</MonoNumber>
        <div className="text-[10px] text-text-muted">{sub}</div>
      </div>
    </div>
  )
}
