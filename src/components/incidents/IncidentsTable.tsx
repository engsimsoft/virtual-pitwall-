'use client'

import Link from 'next/link'
import type { IncidentKind } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { SeverityDot } from '@/components/ui/SeverityDot'
import { formatLapTime } from '@/lib/format'
import type { IncidentJournalRow } from './IncidentsDashboard'

interface Props {
  rows: IncidentJournalRow[]
}

const KIND_LABEL: Record<IncidentKind, string> = {
  'rpm-mismatch': 'RPM mismatch (CAN ≠ Gen)',
  overrev: 'Overrev',
  'boost-mismatch': 'Boost mismatch',
  'launch-control': 'Launch control',
  'tamper-detected': 'Tamper',
  overboost: 'Overboost',
  'temp-warn': 'Temperature warn',
}

export function IncidentsTable({ rows }: Props) {
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full text-[11px]">
        <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">
          <tr>
            <th className="w-6 px-2 py-2"></th>
            <th className="w-20 px-2 py-2 text-left font-semibold">ID</th>
            <th className="w-44 px-2 py-2 text-left font-semibold">Kind</th>
            <th className="w-32 px-2 py-2 text-left font-semibold">Мотор</th>
            <th className="w-32 px-2 py-2 text-left font-semibold">Сессия · трасса</th>
            <th className="w-24 px-2 py-2 text-left font-semibold">Дата</th>
            <th className="w-20 px-2 py-2 text-right font-semibold">Время</th>
            <th className="px-2 py-2 text-left font-semibold">Описание</th>
            <th className="w-16 px-2 py-2 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <Row key={row.incident.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Row({ row }: { row: IncidentJournalRow }) {
  const { incident, engineModel, trackName, clientName, sessionDate, href } = row
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 py-1.5 align-top">
        <SeverityDot severity={incident.severity} className="mt-1" />
      </td>
      <td className="px-2 py-1.5 align-top">
        <MonoNumber className="text-[11px] text-gray-700">{incident.id}</MonoNumber>
      </td>
      <td className="px-2 py-1.5 align-top text-[11px] text-gray-700">
        {KIND_LABEL[incident.kind] ?? incident.kind}
      </td>
      <td className="px-2 py-1.5 align-top">
        <MonoNumber className="text-[11px] font-semibold text-gray-900">{incident.engineId}</MonoNumber>
        <div className="truncate text-[10px] text-gray-500">{engineModel}</div>
      </td>
      <td className="px-2 py-1.5 align-top">
        <MonoNumber className="text-[11px] text-gray-700">{incident.sessionId}</MonoNumber>
        <div className="truncate text-[10px] text-gray-500">{trackName}</div>
      </td>
      <td className="px-2 py-1.5 align-top">
        <MonoNumber className="text-[10px] text-gray-700">{sessionDate}</MonoNumber>
        {clientName && <div className="truncate text-[10px] text-gray-500">{clientName}</div>}
      </td>
      <td className="px-2 py-1.5 text-right align-top">
        <MonoNumber className="text-[11px] text-gray-700">{formatLapTime(incident.tMs)}</MonoNumber>
      </td>
      <td className="px-2 py-1.5 align-top text-[11px] leading-snug text-gray-700">
        {incident.summary}
      </td>
      <td className="px-2 py-1.5 text-right align-top">
        {href ? (
          <Link
            href={href}
            className="inline-block rounded-sm border border-tms-orange bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-tms-graphite transition-colors hover:bg-orange-100"
          >
            Открыть
          </Link>
        ) : (
          <span className="text-[10px] text-gray-400">—</span>
        )}
      </td>
    </tr>
  )
}
