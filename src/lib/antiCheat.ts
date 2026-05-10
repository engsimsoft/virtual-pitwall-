import type { TelemetrySample } from './mockData/types'

// Прокси-оценка наддува по независимым каналам (rpm + газ + калибровочный
// коэффициент). На честных сессиях совпадает с rpmCan/throttle-функцией в
// generator.ts и приходит близко к boostBarCan, на нарушительных — расходится.
// Это упрощённая прототипная модель, не реальная физика трубопровода.
const BOOST_GAIN_BAR = 1.6
const RPM_REF = 8000

export function estimateBoost(sample: TelemetrySample): number {
  return (sample.rpmCan / RPM_REF) * (sample.throttlePct / 100) * BOOST_GAIN_BAR
}

// Расхождение rpmCan vs rpmGen. Положительное — Gen выше CAN (классическая
// схема скрутки тахометра на ECU, заявленные обороты ниже фактических).
export function rpmDelta(sample: TelemetrySample): number {
  return sample.rpmGen - sample.rpmCan
}

export type DeltaSeverity = 'ok' | 'warn' | 'violation'

export function rpmDeltaSeverity(delta: number): DeltaSeverity {
  const abs = Math.abs(delta)
  if (abs < 300) return 'ok'
  if (abs < 800) return 'warn'
  return 'violation'
}
