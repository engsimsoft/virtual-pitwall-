import { notFound } from 'next/navigation'
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
  AntiCheatReplayDashboard,
  type ReplayBundle,
} from '@/components/anti-cheat-replay/AntiCheatReplayDashboard'

// 4 завершённые сессии с заложенными нарушениями. Дефолт — SES-004
// (CAN 7500 vs Gen 9200, два инцидента), это центральный нарратив anti-cheat.
const VIOLATION_SESSION_IDS = ['SES-003', 'SES-004', 'SES-005', 'SES-006'] as const
const DEFAULT_SESSION_ID = 'SES-004'

export default function AntiCheatReplayPage() {
  const bundles: ReplayBundle[] = []

  for (const id of VIOLATION_SESSION_IDS) {
    const session = SESSIONS.find((s) => s.id === id)
    if (!session) continue
    const engine = ENGINES.find((e) => e.id === session.engineId)
    const driver = DRIVERS.find((d) => d.id === session.driverId)
    const track = TRACKS.find((t) => t.id === session.trackId)
    const client = CLIENTS.find((c) => c.id === session.clientId)
    if (!engine || !driver || !track || !client) continue
    bundles.push({
      session,
      engine,
      driver,
      track,
      client,
      incidents: INCIDENTS.filter((i) => i.sessionId === session.id),
      violations: VIOLATION_WINDOWS[session.id] ?? [],
    })
  }

  if (bundles.length === 0) notFound()

  return <AntiCheatReplayDashboard bundles={bundles} defaultSessionId={DEFAULT_SESSION_ID} />
}
