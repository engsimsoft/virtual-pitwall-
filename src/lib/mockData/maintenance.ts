import type { MaintenanceEvent } from './types'

// 9 событий по парку. Регламент TMS: routine service каждые 100 моточасов,
// overhaul на ~300 hr (ENG-002, ENG-004) или досрочно по incident-метрикам.
// ENG-003 и ENG-009 сейчас в статусе maintenance — последняя запись отражает
// текущее состояние. ENG-010 — final overhaul + decommission.
export const MAINTENANCE: MaintenanceEvent[] = [
  {
    id: 'MNT-001',
    engineId: 'ENG-001',
    kind: 'service',
    date: '2025-08-12',
    runHoursAtEvent: 100,
    summary: 'Плановый service: масло, фильтры, дефектовка свечей.',
  },
  {
    id: 'MNT-002',
    engineId: 'ENG-002',
    kind: 'service',
    date: '2024-04-18',
    runHoursAtEvent: 100,
    summary: 'Плановый service по 100-часовому регламенту.',
  },
  {
    id: 'MNT-003',
    engineId: 'ENG-002',
    kind: 'overhaul',
    date: '2025-09-30',
    runHoursAtEvent: 250,
    summary: 'Капитальный ремонт по контракту — переборка ЦПГ, замена ГРМ.',
  },
  {
    id: 'MNT-004',
    engineId: 'ENG-003',
    kind: 'inspection',
    date: '2026-04-20',
    runHoursAtEvent: 95,
    summary: 'Текущая инспекция: жалоба клиента на пропадание мощности на 6500 rpm. В работе.',
  },
  {
    id: 'MNT-005',
    engineId: 'ENG-004',
    kind: 'service',
    date: '2024-08-04',
    runHoursAtEvent: 100,
    summary: 'Плановый service.',
  },
  {
    id: 'MNT-006',
    engineId: 'ENG-004',
    kind: 'overhaul',
    date: '2026-01-12',
    runHoursAtEvent: 300,
    summary: 'Капитальный ремонт: замена поршневой группы, головки, актуализация мап.',
  },
  {
    id: 'MNT-007',
    engineId: 'ENG-007',
    kind: 'service',
    date: '2025-06-22',
    runHoursAtEvent: 100,
    summary: 'Плановый service.',
  },
  {
    id: 'MNT-008',
    engineId: 'ENG-009',
    kind: 'overhaul',
    date: '2026-03-15',
    runHoursAtEvent: 220,
    summary: 'Внеплановый overhaul после серии overrev-инцидентов в 2025. В работе.',
  },
  {
    id: 'MNT-009',
    engineId: 'ENG-010',
    kind: 'decommission',
    date: '2025-11-30',
    runHoursAtEvent: 814,
    summary: 'Списание после исчерпания ресурса: трещина в блоке выявлена при overhaul.',
  },
]
