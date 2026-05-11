import { CLIENTS, ENGINES, INCIDENTS, SESSIONS } from '@/lib/mockData'
import { FleetDashboard, type FleetEngineRow } from '@/components/fleet/FleetDashboard'

// Парк моторов TMS — родительский экран, без role-фильтра (M4). Подбираем
// для каждого мотора активную сессию (если есть) и базовые лейблы клиента.
export default function FleetPage() {
  const clientById = new Map(CLIENTS.map((c) => [c.id, c]))
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

  const rows: FleetEngineRow[] = ENGINES.map((engine) => ({
    engine,
    client: engine.clientId ? (clientById.get(engine.clientId) ?? null) : null,
    liveSession: liveSessionByEngine.get(engine.id) ?? null,
    sessionCount: sessionCountByEngine.get(engine.id) ?? 0,
    incidentCount: incidentCountByEngine.get(engine.id) ?? 0,
  }))

  return <FleetDashboard rows={rows} clients={CLIENTS} />
}
