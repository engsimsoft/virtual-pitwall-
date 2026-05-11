import Link from 'next/link'
import type { Incident } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { SeverityDot } from '@/components/ui/SeverityDot'
import { formatLapTime } from '@/lib/format'

export interface IncidentRow {
  incident: Incident
  engineModel: string
  href: string | null
}

interface Props {
  rows: IncidentRow[]
}

export function FleetIncidentsPanel({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
        Без инцидентов в парке.
      </div>
    )
  }

  return (
    <ul className="flex h-full flex-col divide-y divide-gray-100 overflow-auto">
      {rows.map((row) => (
        <li key={row.incident.id}>
          {row.href ? (
            <Link
              href={row.href}
              className="block px-3 py-2 transition-colors hover:bg-gray-50"
            >
              <RowBody row={row} interactive />
            </Link>
          ) : (
            <div className="px-3 py-2">
              <RowBody row={row} interactive={false} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function RowBody({ row, interactive }: { row: IncidentRow; interactive: boolean }) {
  const { incident, engineModel } = row
  return (
    <div className="flex items-start gap-2">
      <SeverityDot severity={incident.severity} className="mt-1" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <MonoNumber className="text-[11px] font-semibold text-gray-900">
            {incident.sessionId} · {incident.engineId}
          </MonoNumber>
          <MonoNumber className="text-[10px] text-gray-500">
            {formatLapTime(incident.tMs)}
          </MonoNumber>
        </div>
        <div className="mt-0.5 truncate text-[10px] text-gray-500">{engineModel}</div>
        <div className="mt-0.5 text-[11px] leading-snug text-gray-700">{incident.summary}</div>
        {!interactive && (
          <div className="mt-0.5 text-[10px] italic text-gray-400">без deep-link отчёта</div>
        )}
      </div>
    </div>
  )
}
