'use client'

import type { Incident, Session } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { SeverityDot } from '@/components/ui/SeverityDot'
import { formatLapTime } from '@/lib/format'

interface Props {
  session: Session
  sessionIncidents: Incident[]
  fleetFeed: { incident: Incident; sessionId: string }[]
}

// Two-mode ticker: для текущей сессии (если есть свои инциденты) или сводка
// последних событий по парку. На SES-008 инцидентов нет — это сам по себе
// сигнал, что независимые каналы пока сходятся.
export function IncidentTicker({ session, sessionIncidents, fleetFeed }: Props) {
  if (sessionIncidents.length > 0) {
    return (
      <Tile title={`Инциденты сессии (${sessionIncidents.length})`}>
        <ul className="divide-y divide-gray-100">
          {sessionIncidents.map((i) => (
            <li key={i.id} className="flex items-center gap-2 py-1">
              <SeverityDot severity={i.severity} />
              <MonoNumber className="text-[11px] text-gray-500">{formatLapTime(i.tMs)}</MonoNumber>
              <span className="flex-1 truncate text-[11px] text-gray-800">{i.summary}</span>
              <span className="text-[10px] text-gray-400">{i.id}</span>
            </li>
          ))}
        </ul>
      </Tile>
    )
  }

  return (
    <Tile title={`Инциденты сессии ${session.id}`}>
      <div className="mb-1 flex items-center gap-2 rounded-sm bg-emerald-50 px-2 py-1 text-[11px] text-emerald-800">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Каналы синхронны, наддув в норме — без инцидентов.
      </div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">
        Последние события по парку
      </div>
      <ul className="divide-y divide-gray-100">
        {fleetFeed.map(({ incident, sessionId }) => (
          <li key={incident.id} className="flex items-center gap-2 py-1">
            <SeverityDot severity={incident.severity} />
            <span className="flex-1 truncate text-[11px] text-gray-800">{incident.summary}</span>
            <span className="text-[10px] text-gray-400">
              {sessionId} · {incident.engineId}
            </span>
          </li>
        ))}
      </ul>
    </Tile>
  )
}

function Tile({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-gray-100 px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
        {title}
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pt-1">{children}</div>
    </div>
  )
}

