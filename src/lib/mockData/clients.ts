import type { Client } from './types'

// 3 fictional client-renters of TMS engines. ID convention: CLI-NN — short
// stable prefixed IDs for low-cardinality reference entities (clients,
// drivers, tracks). High-cardinality entities (engines, sessions, incidents)
// use 3-digit suffix: ENG-001, SES-001, INC-001.
export const CLIENTS: Client[] = [
  {
    id: 'CLI-01',
    name: 'Карбон-Спорт',
    contractStart: '2024-03-01',
    contractEnd: '2026-03-01',
  },
  {
    id: 'CLI-02',
    name: 'Северный Старт',
    contractStart: '2024-09-15',
    contractEnd: '2026-09-15',
  },
  {
    id: 'CLI-03',
    name: 'Меридиан Рейсинг',
    contractStart: '2025-02-01',
    contractEnd: '2027-02-01',
  },
]
