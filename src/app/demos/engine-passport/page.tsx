import { notFound } from 'next/navigation'
import {
  CLIENTS,
  DRIVERS,
  DYNO_CURVES,
  ENGINES,
  INCIDENTS,
  MAINTENANCE,
  SESSIONS,
  TRACKS,
} from '@/lib/mockData'
import {
  EnginePassportDashboard,
  type PassportBundle,
} from '@/components/engine-passport/EnginePassportDashboard'
import type { SessionLogRow } from '@/components/engine-passport/SessionsLog'
import type { IncidentLogRow } from '@/components/engine-passport/IncidentsLog'

const DEFAULT_ENGINE_ID = 'ENG-001'

const LIVE_SESSION_IDS = new Set(['SES-008'])
const REPLAY_SESSION_IDS = new Set(['SES-003', 'SES-004', 'SES-005', 'SES-006'])

const SEVERITY_RANK = { violation: 0, warn: 1, info: 2 } as const

export default async function EnginePassportPage({
  searchParams,
}: {
  searchParams: Promise<{ engine?: string }>
}) {
  const params = await searchParams
  const requested = params.engine
  const initialEngineId =
    requested && ENGINES.some((e) => e.id === requested) ? requested : DEFAULT_ENGINE_ID

  const trackById = new Map(TRACKS.map((t) => [t.id, t]))
  const driverById = new Map(DRIVERS.map((d) => [d.id, d]))
  const incidentCountBySession = new Map<string, number>()
  for (const i of INCIDENTS) {
    incidentCountBySession.set(i.sessionId, (incidentCountBySession.get(i.sessionId) ?? 0) + 1)
  }

  const bundles: PassportBundle[] = ENGINES.map((engine) => {
    const sessions = SESSIONS.filter((s) => s.engineId === engine.id)
    const sessionRows: SessionLogRow[] = sessions
      .slice()
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
      .map((session) => {
        let href: string | null = null
        if (LIVE_SESSION_IDS.has(session.id)) href = '/demos/live-session'
        else if (REPLAY_SESSION_IDS.has(session.id))
          href = `/demos/anti-cheat-replay?session=${session.id}`
        return {
          session,
          trackName: trackById.get(session.trackId)?.name ?? '—',
          trackCity: trackById.get(session.trackId)?.city ?? '',
          driverName: driverById.get(session.driverId)?.name ?? '—',
          incidentCount: incidentCountBySession.get(session.id) ?? 0,
          href,
        }
      })

    const incidentRows: IncidentLogRow[] = INCIDENTS.filter((i) => i.engineId === engine.id)
      .slice()
      .sort(
        (a, b) =>
          SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || b.tMs - a.tMs
      )
      .map((incident) => {
        let href: string | null = null
        if (LIVE_SESSION_IDS.has(incident.sessionId)) href = '/demos/live-session'
        else if (REPLAY_SESSION_IDS.has(incident.sessionId))
          href = `/demos/anti-cheat-replay?session=${incident.sessionId}&seek=${incident.tMs}`
        return { incident, href }
      })

    return {
      engine,
      client: engine.clientId
        ? (CLIENTS.find((c) => c.id === engine.clientId) ?? null)
        : null,
      dyno: DYNO_CURVES.find((d) => d.engineId === engine.id) ?? null,
      sessions: sessionRows,
      incidents: incidentRows,
      maintenance: MAINTENANCE.filter((m) => m.engineId === engine.id)
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date)),
    }
  })

  if (bundles.length === 0) notFound()

  return (
    <EnginePassportDashboard bundles={bundles} defaultEngineId={initialEngineId} />
  )
}
