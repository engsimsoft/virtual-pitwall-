import type { Driver } from './types'

// 5 drivers across 3 clients (1-2 drivers per client).
export const DRIVERS: Driver[] = [
  { id: 'DRV-01', name: 'Артём Воронов', clientId: 'CLI-01' },
  { id: 'DRV-02', name: 'Игорь Ляхов', clientId: 'CLI-01' },
  { id: 'DRV-03', name: 'Денис Камнев', clientId: 'CLI-02' },
  { id: 'DRV-04', name: 'Павел Сорокин', clientId: 'CLI-03' },
  { id: 'DRV-05', name: 'Михаил Дёготь', clientId: 'CLI-03' },
]
