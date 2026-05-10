import type { Incident } from './types'

// 6 incidents across the violation sessions. INC-NNN convention. tMs values
// align with violation windows in sessions.ts so UI deep-links land on the
// right segment of the trace.
export const INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    sessionId: 'SES-001',
    engineId: 'ENG-001',
    kind: 'temp-warn',
    severity: 'info',
    tMs: 142_000,
    summary: 'Температура масла превысила рекомендованный лимит на 7°C',
    evidence: { observed: 132, threshold: 125, unit: '°C' },
  },
  {
    id: 'INC-002',
    sessionId: 'SES-003',
    engineId: 'ENG-004',
    kind: 'rpm-mismatch',
    severity: 'warn',
    tMs: 88_000,
    summary: 'CAN RPM ниже Gen-канала на ~700 об/мин в течение 4 с',
    evidence: { declared: 7500, observed: 8200, threshold: 300, unit: 'rpm' },
  },
  {
    id: 'INC-003',
    sessionId: 'SES-004',
    engineId: 'ENG-001',
    kind: 'rpm-mismatch',
    severity: 'violation',
    tMs: 64_000,
    summary: 'CAN RPM 7500 vs Gen 9200 — расхождение 1700 об/мин, длительность 3.8 с',
    evidence: { declared: 7500, observed: 9200, threshold: 300, unit: 'rpm' },
  },
  {
    id: 'INC-004',
    sessionId: 'SES-004',
    engineId: 'ENG-001',
    kind: 'overrev',
    severity: 'violation',
    tMs: 65_400,
    summary: 'Превышение redline по Gen-каналу: 9200 при лимите 8800',
    evidence: { observed: 9200, threshold: 8800, unit: 'rpm' },
  },
  {
    id: 'INC-005',
    sessionId: 'SES-005',
    engineId: 'ENG-007',
    kind: 'boost-mismatch',
    severity: 'violation',
    tMs: 105_000,
    summary: 'Boost CAN 1.4 бар при оценке по дайно 1.95 бар на 7000 об/мин',
    evidence: { declared: 1.4, observed: 1.95, threshold: 0.3, unit: 'bar' },
  },
  {
    id: 'INC-006',
    sessionId: 'SES-006',
    engineId: 'ENG-004',
    kind: 'launch-control',
    severity: 'violation',
    tMs: 12_000,
    summary: 'Boost 1.1 бар при V_GPS 18 км/ч — признак launch control',
    evidence: { observed: 1.1, threshold: 0.8, unit: 'bar' },
  },
]
