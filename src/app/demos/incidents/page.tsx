import {
  CLIENTS,
  ENGINES,
  INCIDENTS,
  SESSIONS,
  TRACKS,
} from '@/lib/mockData'
import {
  IncidentsDashboard,
  type IncidentJournalRow,
} from '@/components/incidents/IncidentsDashboard'

const LIVE_SESSION_IDS = new Set(['SES-008'])
const REPLAY_SESSION_IDS = new Set(['SES-003', 'SES-004', 'SES-005', 'SES-006'])

export default function IncidentsPage() {
  const engineById = new Map(ENGINES.map((e) => [e.id, e]))
  const sessionById = new Map(SESSIONS.map((s) => [s.id, s]))
  const trackById = new Map(TRACKS.map((t) => [t.id, t]))
  const clientById = new Map(CLIENTS.map((c) => [c.id, c]))

  const rows: IncidentJournalRow[] = INCIDENTS.slice()
    .sort((a, b) => b.tMs - a.tMs)
    .map((incident) => {
      const engine = engineById.get(incident.engineId) ?? null
      const session = sessionById.get(incident.sessionId) ?? null
      const track = session ? (trackById.get(session.trackId) ?? null) : null
      const client = engine?.clientId ? (clientById.get(engine.clientId) ?? null) : null
      let href: string | null = null
      if (LIVE_SESSION_IDS.has(incident.sessionId)) href = '/demos/live-session'
      else if (REPLAY_SESSION_IDS.has(incident.sessionId))
        href = `/demos/anti-cheat-replay?session=${incident.sessionId}&seek=${incident.tMs}`
      return {
        incident,
        engineModel: engine?.model ?? '—',
        trackName: track?.name ?? '—',
        clientName: client?.name ?? null,
        sessionDate: session?.startedAt.slice(0, 10) ?? '—',
        href,
      }
    })

  return <IncidentsDashboard rows={rows} />
}
