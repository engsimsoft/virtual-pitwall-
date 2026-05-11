import type { Client, Engine, Session } from '@/lib/mockData/types'
import { FleetStatusSummary } from './FleetStatusSummary'
import { EngineCard } from './EngineCard'

export interface FleetEngineRow {
  engine: Engine
  client: Client | null
  liveSession: Session | null
  sessionCount: number
  incidentCount: number
}

interface Props {
  rows: FleetEngineRow[]
  clients: Client[]
}

export function FleetDashboard({ rows, clients }: Props) {
  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex items-baseline justify-between gap-4 border-b border-gray-200 bg-white px-3 py-2">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500">TMS Telos</div>
          <div className="text-base font-semibold text-gray-900">Парк моторов</div>
        </div>
        <div className="text-[11px] text-gray-500">
          {rows.length} моторов · {clients.length} клиентов
        </div>
      </header>

      <main className="grid flex-1 min-h-0 grid-cols-[2fr_1fr] gap-2 p-2">
        <section className="flex min-h-0 flex-col gap-2">
          <FleetStatusSummary rows={rows} clients={clients} />
          <div className="grid flex-1 min-h-0 grid-cols-5 grid-rows-2 gap-2">
            {rows.map((row) => (
              <EngineCard key={row.engine.id} row={row} />
            ))}
          </div>
        </section>

        <aside className="flex min-h-0 flex-col rounded-md border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-3 py-1.5">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Недавние алерты по парку
            </div>
            <div className="truncate text-[11px] text-gray-500">
              Топ инцидентов с deep-link в сессию
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-3 text-[11px] text-gray-400">
            Панель алертов — следующая стадия
          </div>
        </aside>
      </main>
    </div>
  )
}
