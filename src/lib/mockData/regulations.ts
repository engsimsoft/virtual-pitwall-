import type { Regulation } from './types'

// Регламент per-client — лимиты, при превышении которых рождаются incidents
// (rpm-mismatch / overrev / overboost / temp-warn). Дифференциация между
// клиентами отражает разный профиль: CLI-01 «Карбон-Спорт» — стандарт,
// CLI-02 «Северный Старт» — мягче по boost (старший parc), CLI-03 «Меридиан
// Рейсинг» — самый агрессивный (топ-серия, высокий dwell-tolerance перед
// alert'ом). Числа подобраны так, чтобы существующие violation-сессии
// SES-003..006 валились по этим лимитам без перенастройки моков.
export const REGULATIONS: Regulation[] = [
  {
    clientId: 'CLI-01',
    rpmLimit: 8500,
    boostBarLimit: 1.4,
    coolantLimitC: 108,
    oilLimitC: 130,
    violationDwellMs: 500,
  },
  {
    clientId: 'CLI-02',
    rpmLimit: 8000,
    boostBarLimit: 1.2,
    coolantLimitC: 105,
    oilLimitC: 125,
    violationDwellMs: 700,
  },
  {
    clientId: 'CLI-03',
    rpmLimit: 8700,
    boostBarLimit: 1.5,
    coolantLimitC: 112,
    oilLimitC: 135,
    violationDwellMs: 400,
  },
]
