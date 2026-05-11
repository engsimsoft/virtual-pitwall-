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

export default async function AntiCheatReplayPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string; seek?: string }>
}) {
  const params = await searchParams
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

  // Deep-link из fleet/incidents: ?session=SES-XXX&seek=tMs. Неизвестные
  // session-id и невалидный seek молча игнорируются — экран открывается
  // на дефолтной сессии без seek, не показывая ошибку зрителю демо.
  const requestedSession = params.session
  const validSession =
    requestedSession && bundles.some((b) => b.session.id === requestedSession)
      ? requestedSession
      : DEFAULT_SESSION_ID
  const seekRaw = params.seek ? Number.parseInt(params.seek, 10) : NaN
  const initialSeekMs = Number.isFinite(seekRaw) && seekRaw >= 0 ? seekRaw : undefined

  return (
    <AntiCheatReplayDashboard
      bundles={bundles}
      defaultSessionId={validSession}
      initialSeekMs={initialSeekMs}
    />
  )
}
