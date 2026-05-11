import { CLIENTS, ENGINES, INCIDENTS, SESSIONS } from '@/lib/mockData'
import { FleetDashboard, type FleetEngineRow } from '@/components/fleet/FleetDashboard'
import type { IncidentRow } from '@/components/fleet/FleetIncidentsPanel'

// Сессии, на которые есть готовый детальный экран. SES-008 — единственная
// live-сессия (live-session). SES-003/004/005/006 — четыре violation-сессии,
// загружаемые на anti-cheat-replay. Остальные инциденты (например INC-001
// на SES-001 — info temp-warn в честной сессии) показываются без deep-link.
const LIVE_SESSION_IDS = new Set(['SES-008'])
const REPLAY_SESSION_IDS = new Set(['SES-003', 'SES-004', 'SES-005', 'SES-006'])

const SEVERITY_RANK = { violation: 0, warn: 1, info: 2 } as const

export default function FleetPage() {
  const clientById = new Map(CLIENTS.map((c) => [c.id, c]))
  const engineById = new Map(ENGINES.map((e) => [e.id, e]))
  const liveSessionByEngine = new Map(
    SESSIONS.filter((s) => s.status === 'live').map((s) => [s.engineId, s])
  )
  const sessionCountByEngine = new Map<string, number>()
  for (const s of SESSIONS) {
    sessionCountByEngine.set(s.engineId, (sessionCountByEngine.get(s.engineId) ?? 0) + 1)
  }
  const incidentCountByEngine = new Map<string, number>()
  for (const i of INCIDENTS) {
    incidentCountByEngine.set(i.engineId, (incidentCountByEngine.get(i.engineId) ?? 0) + 1)
  }

  const engineRows: FleetEngineRow[] = ENGINES.map((engine) => ({
    engine,
    client: engine.clientId ? (clientById.get(engine.clientId) ?? null) : null,
    liveSession: liveSessionByEngine.get(engine.id) ?? null,
    sessionCount: sessionCountByEngine.get(engine.id) ?? 0,
    incidentCount: incidentCountByEngine.get(engine.id) ?? 0,
  }))

  const incidentRows: IncidentRow[] = INCIDENTS.slice()
    .sort(
      (a, b) =>
        SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || b.tMs - a.tMs
    )
    .map((incident) => {
      const engine = engineById.get(incident.engineId)
      let href: string | null = null
      if (LIVE_SESSION_IDS.has(incident.sessionId)) {
        href = '/demos/live-session'
      } else if (REPLAY_SESSION_IDS.has(incident.sessionId)) {
        href = `/demos/anti-cheat-replay?session=${incident.sessionId}&seek=${incident.tMs}`
      }
      return {
        incident,
        engineModel: engine?.model ?? '—',
        href,
      }
    })

  return <FleetDashboard rows={engineRows} clients={CLIENTS} incidents={incidentRows} />
}
