'use client'

import type { TelemetrySample } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { formatRpm } from '@/lib/format'
import { estimateBoost } from '@/lib/antiCheat'

interface Props {
  sample: TelemetrySample
}

// Плотная таблица текущих значений — то, что инженер хочет видеть, не двигая
// глазами по чартам. Все числа в monospace, единицы измерения отделены
// neutral-серым.
export function CurrentValues({ sample }: Props) {
  const estimate = Math.round(estimateBoost(sample) * 100) / 100
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 p-1 text-xs">
      <Row label="Об/мин CAN" value={formatRpm(sample.rpmCan)} unit="" />
      <Row label="Об/мин Gen" value={formatRpm(sample.rpmGen)} unit="" />
      <Row label="Наддув CAN" value={sample.boostBarCan.toFixed(2)} unit="бар" />
      <Row label="Наддув (оценка)" value={estimate.toFixed(2)} unit="бар" />
      <Row label="Скорость" value={String(sample.vGpsKmh)} unit="км/ч" />
      <Row label="Газ" value={String(sample.throttlePct)} unit="%" />
      <Row label="ОЖ" value={String(sample.coolantC)} unit="°C" />
      <Row label="Масло" value={String(sample.oilC)} unit="°C" />
      <Row label="Впуск" value={String(sample.intakeC)} unit="°C" />
      <Row label="Лямбда" value={sample.lambda.toFixed(2)} unit="" />
    </div>
  )
}

function Row({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-gray-100 pb-1 last:border-0">
      <span className="text-[11px] text-gray-500">{label}</span>
      <span className="flex items-baseline gap-1">
        <MonoNumber className="font-semibold text-gray-900">{value}</MonoNumber>
        {unit && <span className="text-[10px] text-gray-400">{unit}</span>}
      </span>
    </div>
  )
}
