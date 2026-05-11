import { notFound } from 'next/navigation'
import { CLIENTS, DRIVERS, ENGINES, INCIDENTS, SESSIONS, TRACKS } from '@/lib/mockData'
import { LiveSessionDashboard } from '@/components/live-session/LiveSessionDashboard'
import type { LiveSessionBundle } from '@/components/live-session/LiveSessionDashboard'

const FLEET_FEED_LIMIT = 4
const DEFAULT_SESSION_ID = 'SES-008'

export default function LiveSessionPage() {
  const severityRank = { violation: 0, warn: 1, info: 2 } as const
  const fleetFeed = INCIDENTS.slice()
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity] || b.tMs - a.tMs)
    .slice(0, FLEET_FEED_LIMIT)
    .map((incident) => ({ incident, sessionId: incident.sessionId }))

  const sessionBundles: LiveSessionBundle[] = []
  for (const session of SESSIONS) {
    const engine = ENGINES.find((e) => e.id === session.engineId)
    const driver = DRIVERS.find((d) => d.id === session.driverId)
    const track = TRACKS.find((t) => t.id === session.trackId)
    const client = CLIENTS.find((c) => c.id === session.clientId)
    if (!engine || !driver || !track || !client) continue
    sessionBundles.push({
      session,
      engine,
      driver,
      track,
      client,
      sessionIncidents: INCIDENTS.filter((i) => i.sessionId === session.id),
    })
  }

  if (sessionBundles.length === 0) notFound()

  const defaultBundle = sessionBundles.find((b) => b.session.id === DEFAULT_SESSION_ID) ?? sessionBundles[0]

  return (
    <LiveSessionDashboard
      bundles={sessionBundles}
      defaultSessionId={defaultBundle.session.id}
      fleetFeed={fleetFeed}
    />
  )
}
