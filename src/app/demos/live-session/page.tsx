import { notFound } from 'next/navigation'
import { CLIENTS, DRIVERS, ENGINES, INCIDENTS, SESSIONS, TRACKS } from '@/lib/mockData'
import { LiveSessionDashboard } from '@/components/live-session/LiveSessionDashboard'

const FLEET_FEED_LIMIT = 4

// SES-008 — единственная live-сессия в моках (статус 'live', 120 с накопленных
// сэмплов на 5 Hz). Селектор сессий запланирован на M4 (role-switcher), здесь
// дефолтная привязка достаточна для прототипа.
const DEFAULT_SESSION_ID = 'SES-008'

export default function LiveSessionPage() {
  const session = SESSIONS.find((s) => s.id === DEFAULT_SESSION_ID)
  if (!session) notFound()

  const engine = ENGINES.find((e) => e.id === session.engineId)
  const driver = DRIVERS.find((d) => d.id === session.driverId)
  const track = TRACKS.find((t) => t.id === session.trackId)
  const client = CLIENTS.find((c) => c.id === session.clientId)
  if (!engine || !driver || !track || !client) notFound()

  const sessionIncidents = INCIDENTS.filter((i) => i.sessionId === session.id)

  // Recent fleet incidents anchored to session start time — берём свежие
  // высокоприоритетные события (violation > warn > info), ограничиваемся 4 для
  // плотного тикера.
  const severityRank = { violation: 0, warn: 1, info: 2 } as const
  const fleetFeed = INCIDENTS.slice()
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity] || b.tMs - a.tMs)
    .slice(0, FLEET_FEED_LIMIT)
    .map((incident) => ({ incident, sessionId: incident.sessionId }))

  return (
    <LiveSessionDashboard
      session={session}
      engine={engine}
      driver={driver}
      track={track}
      client={client}
      sessionIncidents={sessionIncidents}
      fleetFeed={fleetFeed}
    />
  )
}
