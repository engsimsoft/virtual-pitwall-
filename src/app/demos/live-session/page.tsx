import { notFound } from 'next/navigation'
import { CLIENTS, DRIVERS, ENGINES, SESSIONS, TRACKS } from '@/lib/mockData'
import { LiveSessionDashboard } from '@/components/live-session/LiveSessionDashboard'

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

  return (
    <LiveSessionDashboard
      session={session}
      engine={engine}
      driver={driver}
      track={track}
      client={client}
    />
  )
}
