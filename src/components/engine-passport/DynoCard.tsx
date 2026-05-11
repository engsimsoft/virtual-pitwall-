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

// Стилизация под стендовый протокол LSGA / MAHA LPS 3000 PKW: шапка с
// атрибутами замера, ниже — двух-осевой график P/M по RPM и табличная сводка
// сэмплов справа. Числа — моноширина для построчного выравнивания, как на
// бумажном листе.
export function DynoCard({ engine, dyno }: Props) {
  if (!dyno || dyno.samples.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-md border border-gray-200 bg-white text-[11px] text-gray-400">
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
    <div className="flex min-h-0 flex-1 flex-col rounded-md border border-gray-200 bg-white">
      <ProtocolHeader engine={engine} measuredAt={dyno.measuredAt} />

      <div className="grid min-h-0 flex-1 grid-cols-[3fr_2fr] gap-2 p-2">
        <div className="min-h-0 rounded-sm border border-gray-100 p-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={samples} margin={{ top: 8, right: 24, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="2 4" />
              <XAxis
                dataKey="rpm"
                type="number"
                domain={[samples[0].rpm, rpmMax]}
                tickFormatter={(v) => `${v}`}
                tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'var(--font-geist-mono)' }}
                stroke="#9ca3af"
                label={{ value: 'n [rpm]', position: 'insideBottomRight', offset: -2, fontSize: 10, fill: '#6b7280' }}
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
                labelFormatter={(v) => `${v} rpm`}
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
                r={3}
                fill="#ff4f00"
                stroke="white"
                strokeWidth={1}
              />
              <ReferenceDot
                yAxisId="torque"
                x={peakTorque.rpm}
                y={peakTorque.torqueNm}
                r={3}
                fill="#39393f"
                stroke="white"
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex min-h-0 flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <PeakChip label="Peak P" value={`${peakPower.powerKw.toFixed(1)} кВт`} sub={`@ ${peakPower.rpm} rpm`} accent="text-tms-orange" />
            <PeakChip label="Peak M" value={`${peakTorque.torqueNm} Н·м`} sub={`@ ${peakTorque.rpm} rpm`} accent="text-tms-graphite" />
          </div>
          <div className="min-h-0 flex-1 overflow-auto rounded-sm border border-gray-100">
            <table className="w-full text-[10px]">
              <thead className="sticky top-0 bg-gray-50 text-[9px] uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-2 py-1 text-left font-semibold">n [rpm]</th>
                  <th className="px-2 py-1 text-right font-semibold">P [кВт]</th>
                  <th className="px-2 py-1 text-right font-semibold">M [Н·м]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {samples.map((s) => {
                  const isPeakP = s.rpm === peakPower.rpm
                  const isPeakM = s.rpm === peakTorque.rpm
                  return (
                    <tr key={s.rpm}>
                      <td className="px-2 py-0.5 text-gray-700">
                        <MonoNumber>{s.rpm}</MonoNumber>
                      </td>
                      <td className={`px-2 py-0.5 text-right ${isPeakP ? 'font-semibold text-tms-orange' : 'text-gray-700'}`}>
                        <MonoNumber>{s.powerKw.toFixed(1)}</MonoNumber>
                      </td>
                      <td className={`px-2 py-0.5 text-right ${isPeakM ? 'font-semibold text-tms-graphite' : 'text-gray-700'}`}>
                        <MonoNumber>{s.torqueNm}</MonoNumber>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProtocolHeader({ engine, measuredAt }: { engine: Engine; measuredAt: string }) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 px-3 py-1.5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500">Стендовая характеристика</div>
          <div className="text-xs font-semibold text-gray-900">TMS Bench · LPS 3000 PKW (synthetic baseline)</div>
        </div>
        <div className="text-right text-[10px] text-gray-500">
          <div>Otto-Motor / Turbocharger</div>
          <div>Measurement date: {measuredAt}</div>
        </div>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-3 border-t border-gray-200 pt-1 text-[10px] text-gray-600">
        <KeyVal k="Engine type" v={engine.model} />
        <KeyVal k="Serial" v={engine.serialNumber} />
        <KeyVal k="Inspector" v="TMS Motorsport" />
      </div>
    </div>
  )
}

function KeyVal({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500">{k}:</span>
      <span className="truncate font-mono text-gray-800">{v}</span>
    </div>
  )
}

function PeakChip({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub: string
  accent: string
}) {
  return (
    <div className="rounded-sm border border-gray-200 bg-white px-2 py-1">
      <div className="text-[9px] uppercase tracking-wider text-gray-500">{label}</div>
      <MonoNumber className={`text-xs font-semibold ${accent}`}>{value}</MonoNumber>
      <div className="text-[9px] text-gray-500">{sub}</div>
    </div>
  )
}
