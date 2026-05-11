import {
  CLIENTS,
  DRIVERS,
  ENGINES,
  INCIDENTS,
  SESSIONS,
  TRACKS,
  VIOLATION_WINDOWS,
} from '@/lib/mockData'
import {
  BlackBoxDashboard,
  type BlackBoxBundle,
} from '@/components/black-box/BlackBoxDashboard'

const DEFAULT_SESSION_ID = 'SES-004'

export default async function BlackBoxPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>
}) {
  const params = await searchParams

  const bundles: BlackBoxBundle[] = SESSIONS.map((session) => {
    const engine = ENGINES.find((e) => e.id === session.engineId) ?? null
    const driver = DRIVERS.find((d) => d.id === session.driverId) ?? null
    const track = TRACKS.find((t) => t.id === session.trackId) ?? null
    const client = CLIENTS.find((c) => c.id === session.clientId) ?? null
    return {
      session,
      engine,
      driver,
      track,
      client,
      incidents: INCIDENTS.filter((i) => i.sessionId === session.id),
      violations: VIOLATION_WINDOWS[session.id] ?? [],
    }
  })

  const requested = params.session
  const initialId = requested && bundles.some((b) => b.session.id === requested)
    ? requested
    : DEFAULT_SESSION_ID

  return <BlackBoxDashboard bundles={bundles} defaultSessionId={initialId} />
}
