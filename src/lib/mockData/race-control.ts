export interface RaceFlag {
  kind: 'track-limits' | 'rpm-mismatch' | 'overboost'
  severity: 'warn' | 'violation'
  count: number
  message: string
}

export interface RaceEntry {
  position: number
  number: number
  driverName: string
  team: string
  bestLapMs: number
  lastLapMs: number
  sector1Ms: number
  sector2Ms: number
  sector3Ms: number
  gapMs: number | null
  intervalMs: number | null
  status: 'on-track' | 'pits' | 'finished' | 'dnf'
  flags: RaceFlag[]
  checked: boolean
}

function lap(ms: number): string {
  const m = Math.floor(ms / 60000)
  const s = ((ms % 60000) / 1000).toFixed(3)
  return `${m}:${s.padStart(6, '0')}`
}

function sector(ms: number): string {
  return (ms / 1000).toFixed(3)
}

function gap(ms: number | null): string {
  if (ms === null) return '—'
  if (ms < 1000) return `+${(ms / 1000).toFixed(3)}`
  return `+${(ms / 1000).toFixed(1)}`
}

export const RACE_ENTRIES: RaceEntry[] = [
  {
    position: 1,
    number: 7,
    driverName: 'Павел Сорокин',
    team: 'Меридиан Рейсинг',
    bestLapMs: 83_456,
    lastLapMs: 83_612,
    sector1Ms: 28_234,
    sector2Ms: 30_156,
    sector3Ms: 25_222,
    gapMs: null,
    intervalMs: null,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 2,
    number: 23,
    driverName: 'Иван Петров',
    team: 'Speed Masters',
    bestLapMs: 83_789,
    lastLapMs: 83_901,
    sector1Ms: 28_412,
    sector2Ms: 30_234,
    sector3Ms: 25_255,
    gapMs: 289,
    intervalMs: 289,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 3,
    number: 44,
    driverName: 'Алексей Козлов',
    team: 'Турбо-Старт',
    bestLapMs: 84_012,
    lastLapMs: 84_156,
    sector1Ms: 28_567,
    sector2Ms: 30_345,
    sector3Ms: 25_244,
    gapMs: 544,
    intervalMs: 255,
    status: 'on-track',
    flags: [
      { kind: 'track-limits', severity: 'warn', count: 1, message: 'Turn 4 — 4 колеса за белую линию' },
    ],
    checked: false,
  },
  {
    position: 4,
    number: 11,
    driverName: 'Дмитрий Смирнов',
    team: 'Red Line',
    bestLapMs: 84_234,
    lastLapMs: 84_567,
    sector1Ms: 28_789,
    sector2Ms: 30_567,
    sector3Ms: 25_211,
    gapMs: 955,
    intervalMs: 411,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 5,
    number: 5,
    driverName: 'Андрей Волков',
    team: 'Меридиан Рейсинг',
    bestLapMs: 84_456,
    lastLapMs: 84_678,
    sector1Ms: 28_901,
    sector2Ms: 30_678,
    sector3Ms: 25_099,
    gapMs: 1_066,
    intervalMs: 111,
    status: 'on-track',
    flags: [
      { kind: 'rpm-mismatch', severity: 'violation', count: 1, message: 'CAN 7500 vs Gen 9200 — расхождение 1700 об/мин' },
    ],
    checked: false,
  },
  {
    position: 6,
    number: 88,
    driverName: 'Сергей Новиков',
    team: 'Форсаж',
    bestLapMs: 84_678,
    lastLapMs: 84_890,
    sector1Ms: 29_012,
    sector2Ms: 30_789,
    sector3Ms: 25_089,
    gapMs: 1_278,
    intervalMs: 212,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 7,
    number: 15,
    driverName: 'Максим Лебедев',
    team: 'Speed Masters',
    bestLapMs: 84_890,
    lastLapMs: 85_123,
    sector1Ms: 29_123,
    sector2Ms: 30_901,
    sector3Ms: 25_099,
    gapMs: 1_511,
    intervalMs: 233,
    status: 'on-track',
    flags: [
      { kind: 'overboost', severity: 'violation', count: 2, message: 'Boost 1.95 бар при лимите 1.4 — overboost x2' },
    ],
    checked: false,
  },
  {
    position: 8,
    number: 33,
    driverName: 'Никита Морозов',
    team: 'Турбо-Старт',
    bestLapMs: 85_123,
    lastLapMs: 85_345,
    sector1Ms: 29_234,
    sector2Ms: 31_012,
    sector3Ms: 25_099,
    gapMs: 1_733,
    intervalMs: 222,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 9,
    number: 2,
    driverName: 'Артём Кузнецов',
    team: 'Red Line',
    bestLapMs: 85_345,
    lastLapMs: 85_567,
    sector1Ms: 29_345,
    sector2Ms: 31_123,
    sector3Ms: 25_099,
    gapMs: 1_955,
    intervalMs: 222,
    status: 'on-track',
    flags: [
      { kind: 'track-limits', severity: 'warn', count: 2, message: 'Turn 7 — 2 нарушения границ' },
    ],
    checked: false,
  },
  {
    position: 10,
    number: 99,
    driverName: 'Егор Соколов',
    team: 'Форсаж',
    bestLapMs: 85_567,
    lastLapMs: 85_789,
    sector1Ms: 29_456,
    sector2Ms: 31_234,
    sector3Ms: 25_099,
    gapMs: 2_177,
    intervalMs: 222,
    status: 'pits',
    flags: [],
    checked: false,
  },
  {
    position: 11,
    number: 19,
    driverName: 'Владимир Попов',
    team: 'Меридиан Рейсинг',
    bestLapMs: 85_789,
    lastLapMs: 86_012,
    sector1Ms: 29_567,
    sector2Ms: 31_345,
    sector3Ms: 25_100,
    gapMs: 2_400,
    intervalMs: 223,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 12,
    number: 66,
    driverName: 'Роман Васильев',
    team: 'Speed Masters',
    bestLapMs: 86_012,
    lastLapMs: 86_234,
    sector1Ms: 29_678,
    sector2Ms: 31_456,
    sector3Ms: 25_100,
    gapMs: 2_622,
    intervalMs: 222,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 13,
    number: 77,
    driverName: 'Илья Макаров',
    team: 'Турбо-Старт',
    bestLapMs: 86_234,
    lastLapMs: 86_456,
    sector1Ms: 29_789,
    sector2Ms: 31_567,
    sector3Ms: 25_100,
    gapMs: 2_844,
    intervalMs: 222,
    status: 'on-track',
    flags: [
      { kind: 'rpm-mismatch', severity: 'warn', count: 1, message: 'CAN 7800 vs Gen 8100 — расхождение 300 об/мин' },
    ],
    checked: false,
  },
  {
    position: 14,
    number: 4,
    driverName: 'Кирилл Белов',
    team: 'Red Line',
    bestLapMs: 86_456,
    lastLapMs: 86_678,
    sector1Ms: 29_901,
    sector2Ms: 31_678,
    sector3Ms: 25_099,
    gapMs: 3_066,
    intervalMs: 222,
    status: 'on-track',
    flags: [],
    checked: false,
  },
  {
    position: 15,
    number: 55,
    driverName: 'Олег Зайцев',
    team: 'Форсаж',
    bestLapMs: 86_678,
    lastLapMs: 86_901,
    sector1Ms: 30_012,
    sector2Ms: 31_789,
    sector3Ms: 25_100,
    gapMs: 3_289,
    intervalMs: 223,
    status: 'dnf',
    flags: [],
    checked: false,
  },
]

export { lap, sector, gap }
