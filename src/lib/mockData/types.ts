export type EngineId = string
export type SessionId = string
export type TrackId = string
export type ClientId = string
export type DriverId = string
export type IncidentId = string

export type Role = 'tms-engineer' | 'client' | 'driver'

export type EngineStatus = 'live' | 'idle' | 'maintenance' | 'decommissioned'

export interface Client {
  id: ClientId
  name: string
  contractStart: string
  contractEnd: string
}

export interface Driver {
  id: DriverId
  name: string
  clientId: ClientId
}

export interface Track {
  id: TrackId
  name: string
  city: string
  lapLengthMeters: number
}

export interface DynoCurve {
  engineId: EngineId
  measuredAt: string
  samples: { rpm: number; torqueNm: number; powerKw: number }[]
}

export interface Engine {
  id: EngineId
  model: string
  serialNumber: string
  clientId: ClientId | null
  bornAt: string
  totalRunHours: number
  totalRevolutions: number
  status: EngineStatus
}

// 25 Hz telemetry sample. rpmCan / boostBarCan / throttlePct / temps / lambda
// come from CAN — what the client's ECU declares. rpmGen + GPS + IMU are
// independent physical channels used for anti-cheat cross-check.
export interface TelemetrySample {
  tMs: number

  rpmCan: number
  boostBarCan: number
  throttlePct: number
  coolantC: number
  oilC: number
  intakeC: number
  lambda: number

  rpmGen: number
  vGpsKmh: number
  lat: number
  lon: number
  altM: number
  accLongG: number
  accLatG: number
  accVertG: number
  yawRateDegS: number
  pitchDeg: number
  rollDeg: number
}

export interface SignedBlock {
  index: number
  startMs: number
  endMs: number
  prevHash: string
  hash: string
}

export type IncidentKind =
  | 'rpm-mismatch'
  | 'boost-mismatch'
  | 'launch-control'
  | 'tamper-detected'
  | 'overrev'
  | 'overboost'
  | 'temp-warn'

export type IncidentSeverity = 'info' | 'warn' | 'violation'

export interface Incident {
  id: IncidentId
  sessionId: SessionId
  engineId: EngineId
  kind: IncidentKind
  severity: IncidentSeverity
  tMs: number
  summary: string
  evidence?: {
    declared?: number
    observed?: number
    threshold?: number
    unit?: string
  }
}

export type SessionStatus = 'live' | 'completed' | 'offline-uploading'

export interface Session {
  id: SessionId
  engineId: EngineId
  trackId: TrackId
  driverId: DriverId
  clientId: ClientId
  startedAt: string
  endedAt: string | null
  status: SessionStatus
  recordedOffline: boolean
  samples: TelemetrySample[]
  signedBlocks: SignedBlock[]
  incidentIds: IncidentId[]
}

export interface Regulation {
  clientId: ClientId
  rpmLimit: number
  boostBarLimit: number
  coolantLimitC: number
  oilLimitC: number
  violationDwellMs: number
}

export type AlarmParameter = 'rpm' | 'oil-pressure' | 'coolant-temp' | 'oil-temp' | 'boost'

export type AlarmSeverity = 'warn' | 'violation' | 'critical'

export interface Alarm {
  id: string
  engineId: EngineId
  sessionId?: SessionId
  parameter: AlarmParameter
  severity: AlarmSeverity
  value: number
  limit: number
  unit: string
  action: string
  message: string
  acknowledged: boolean
  triggeredAt: string
}

export type MaintenanceKind = 'service' | 'overhaul' | 'inspection' | 'decommission'

export interface MaintenanceEvent {
  id: string
  engineId: EngineId
  kind: MaintenanceKind
  date: string
  runHoursAtEvent: number
  summary: string
}

export type DropZoneComponentKind = 'wifi-ap' | 'edge-server' | 'lte-backup'
export type DropZoneComponentStatus = 'online' | 'degraded' | 'offline'

export interface DropZoneComponentMetric {
  label: string
  value: string
}

export interface DropZoneComponent {
  id: string
  kind: DropZoneComponentKind
  model: string
  status: DropZoneComponentStatus
  uptimeHours: number
  metrics: DropZoneComponentMetric[]
  note?: string
}

export interface DropZoneSite {
  id: string
  trackId: TrackId
  name: string
  costRub: number
  lastSyncMinutesAgo: number
  bufferSessions: number
  bufferBlocks: number
  components: DropZoneComponent[]
}
