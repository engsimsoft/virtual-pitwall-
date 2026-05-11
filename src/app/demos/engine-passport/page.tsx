import { notFound } from 'next/navigation'
import { CLIENTS, DYNO_CURVES, ENGINES, INCIDENTS, MAINTENANCE, SESSIONS } from '@/lib/mockData'
import {
  EnginePassportDashboard,
  type PassportBundle,
} from '@/components/engine-passport/EnginePassportDashboard'

const DEFAULT_ENGINE_ID = 'ENG-001'

export default async function EnginePassportPage({
  searchParams,
}: {
  searchParams: Promise<{ engine?: string }>
}) {
  const params = await searchParams
  const requested = params.engine
  const initialEngineId =
    requested && ENGINES.some((e) => e.id === requested) ? requested : DEFAULT_ENGINE_ID

  const bundles: PassportBundle[] = ENGINES.map((engine) => ({
    engine,
    client: engine.clientId
      ? (CLIENTS.find((c) => c.id === engine.clientId) ?? null)
      : null,
    dyno: DYNO_CURVES.find((d) => d.engineId === engine.id) ?? null,
    sessions: SESSIONS.filter((s) => s.engineId === engine.id),
    incidents: INCIDENTS.filter((i) => i.engineId === engine.id),
    maintenance: MAINTENANCE.filter((m) => m.engineId === engine.id),
  }))

  if (bundles.length === 0) notFound()

  return (
    <EnginePassportDashboard bundles={bundles} defaultEngineId={initialEngineId} />
  )
}
