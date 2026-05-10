import type {
  Session,
  SessionId,
  SessionStatus,
  EngineId,
  TrackId,
  DriverId,
  ClientId,
} from './types'
import {
  synthesizeSamples,
  synthesizeSignedBlocks,
  type ViolationWindow,
} from './generator'
import { INCIDENTS } from './incidents'

// 8 sessions covering the M1 design rules: 2 honest references, 2 rpm-mismatch
// (one mild, one severe), 1 boost-mismatch, 1 launch-control, 1 offline-upload,
// 1 currently-live. Telemetry samples are generated deterministically from the
// session ID so a re-render produces the same trace.

const FULL_DURATION_MS = 180_000  // 3 min
const LIVE_DURATION_MS = 120_000  // 2 min elapsed for the in-progress session

interface SessionSpec {
  id: string
  engineId: EngineId
  trackId: TrackId
  driverId: DriverId
  clientId: ClientId
  startedAt: string
  status: SessionStatus
  recordedOffline: boolean
  durationMs: number
  violations: ViolationWindow[]
}

const SPECS: SessionSpec[] = [
  {
    id: 'SES-001',
    engineId: 'ENG-001',
    trackId: 'TRK-01',
    driverId: 'DRV-01',
    clientId: 'CLI-01',
    startedAt: '2026-04-15T13:20:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [],
  },
  {
    id: 'SES-002',
    engineId: 'ENG-007',
    trackId: 'TRK-03',
    driverId: 'DRV-04',
    clientId: 'CLI-03',
    startedAt: '2026-03-22T11:45:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [],
  },
  {
    id: 'SES-003',
    engineId: 'ENG-004',
    trackId: 'TRK-02',
    driverId: 'DRV-03',
    clientId: 'CLI-02',
    startedAt: '2026-04-02T14:10:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [
      { kind: 'rpm-mismatch', startMs: 86_000, endMs: 90_000, intensity: 0.3 },
    ],
  },
  {
    id: 'SES-004',
    engineId: 'ENG-001',
    trackId: 'TRK-05',
    driverId: 'DRV-02',
    clientId: 'CLI-01',
    startedAt: '2026-04-28T15:30:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [
      { kind: 'rpm-mismatch', startMs: 62_000, endMs: 67_000, intensity: 1.0 },
    ],
  },
  {
    id: 'SES-005',
    engineId: 'ENG-007',
    trackId: 'TRK-04',
    driverId: 'DRV-05',
    clientId: 'CLI-03',
    startedAt: '2026-04-19T16:00:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [
      { kind: 'boost-mismatch', startMs: 103_000, endMs: 108_000, intensity: 0.9 },
    ],
  },
  {
    id: 'SES-006',
    engineId: 'ENG-004',
    trackId: 'TRK-01',
    driverId: 'DRV-03',
    clientId: 'CLI-02',
    startedAt: '2026-05-03T12:00:00.000Z',
    status: 'completed',
    recordedOffline: false,
    durationMs: FULL_DURATION_MS,
    violations: [
      { kind: 'launch-control', startMs: 10_000, endMs: 14_000, intensity: 0.7 },
    ],
  },
  {
    id: 'SES-007',
    engineId: 'ENG-001',
    trackId: 'TRK-05',
    driverId: 'DRV-01',
    clientId: 'CLI-01',
    startedAt: '2026-05-08T14:25:00.000Z',
    status: 'offline-uploading',
    recordedOffline: true,
    durationMs: FULL_DURATION_MS,
    violations: [],
  },
  {
    id: 'SES-008',
    engineId: 'ENG-007',
    trackId: 'TRK-04',
    driverId: 'DRV-04',
    clientId: 'CLI-03',
    startedAt: '2026-05-10T11:30:00.000Z',
    status: 'live',
    recordedOffline: false,
    durationMs: LIVE_DURATION_MS,
    violations: [],
  },
]

function endedAtFor(spec: SessionSpec): string | null {
  if (spec.status === 'live') return null
  return new Date(new Date(spec.startedAt).getTime() + spec.durationMs).toISOString()
}

// Окна нарушений на сессию — нужны UI для подсветки бэндов в чартах и
// timeline. В Incident этот диапазон не лежит (только tMs), а сам спец
// SessionSpec в этом файле private — поэтому выносим в отдельную карту.
export const VIOLATION_WINDOWS: Record<SessionId, ViolationWindow[]> = Object.fromEntries(
  SPECS.map((spec) => [spec.id, spec.violations])
)

export const SESSIONS: Session[] = SPECS.map((spec) => ({
  id: spec.id,
  engineId: spec.engineId,
  trackId: spec.trackId,
  driverId: spec.driverId,
  clientId: spec.clientId,
  startedAt: spec.startedAt,
  endedAt: endedAtFor(spec),
  status: spec.status,
  recordedOffline: spec.recordedOffline,
  samples: synthesizeSamples({
    sessionId: spec.id,
    engineId: spec.engineId,
    trackId: spec.trackId,
    durationMs: spec.durationMs,
    violations: spec.violations,
  }),
  signedBlocks: synthesizeSignedBlocks(spec.id, spec.durationMs),
  incidentIds: INCIDENTS.filter((i) => i.sessionId === spec.id).map((i) => i.id),
}))
