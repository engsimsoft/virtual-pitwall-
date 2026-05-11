'use client'

import Link from 'next/link'
import type { Incident, IncidentKind } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { SeverityDot } from '@/components/ui/SeverityDot'
import { formatLapTime } from '@/lib/format'

export interface IncidentLogRow {
  incident: Incident
  href: string | null
}

interface Props {
  rows: IncidentLogRow[]
}

const KIND_LABEL: Record<IncidentKind, string> = {
  'rpm-mismatch': 'RPM mismatch (CAN ≠ Gen)',
  'overrev': 'Overrev',
  'boost-mismatch': 'Boost mismatch',
  'launch-control': 'Launch control',
  'tamper-detected': 'Tamper',
  'overboost': 'Overboost',
  'temp-warn': 'Temperature warn',
}

export function IncidentsLog({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-emerald-700">
        Без зарегистрированных инцидентов.
      </div>
    )
  }
  return (
    <ul className="flex h-full flex-col divide-y divide-gray-100 overflow-auto">
      {rows.map((row) => (
        <li key={row.incident.id}>
          {row.href ? (
            <Link href={row.href} className="block px-3 py-2 transition-colors hover:bg-gray-50">
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

function RowBody({ row, interactive }: { row: IncidentLogRow; interactive: boolean }) {
  const { incident } = row
  return (
    <div className="flex items-start gap-2">
      <SeverityDot severity={incident.severity} className="mt-1" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[11px] font-semibold text-gray-900">
            {KIND_LABEL[incident.kind] ?? incident.kind}
          </span>
          <MonoNumber className="text-[10px] text-gray-500">
            {incident.sessionId} · {formatLapTime(incident.tMs)}
          </MonoNumber>
        </div>
        <div className="mt-0.5 text-[11px] leading-snug text-gray-700">{incident.summary}</div>
        {!interactive && (
          <div className="mt-0.5 text-[10px] italic text-gray-400">без deep-link отчёта</div>
        )}
      </div>
    </div>
  )
}
