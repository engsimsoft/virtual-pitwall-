import { ALARMS, ENGINES, SESSIONS, CLIENTS, DRIVERS } from '@/lib/mockData'
import { AlarmCenterDashboard } from '@/components/alarm/AlarmCenterDashboard'
import type { AlarmRow } from '@/components/alarm/AlarmCenterDashboard'

const SEVERITY_RANK = { critical: 0, violation: 1, warn: 2 } as const

export default function AlarmsPage() {
  const engineById = new Map(ENGINES.map((e) => [e.id, e]))
  const sessionById = new Map(SESSIONS.map((s) => [s.id, s]))
  const clientById = new Map(CLIENTS.map((c) => [c.id, c]))
  const driverById = new Map(DRIVERS.map((d) => [d.id, d]))

  const alarmRows: AlarmRow[] = ALARMS.slice()
    .sort(
      (a, b) =>
        SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
        new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime()
    )
    .map((alarm) => {
      const engine = engineById.get(alarm.engineId)
      const session = alarm.sessionId ? sessionById.get(alarm.sessionId) : null
      const client = engine?.clientId ? clientById.get(engine.clientId) : null
      const driver = session?.driverId ? driverById.get(session.driverId) : null
      return {
        alarm,
        engine: engine ?? null,
        session: session ?? null,
        client: client ?? null,
        driver: driver ?? null,
      }
    })

  return <AlarmCenterDashboard rows={alarmRows} />
}
