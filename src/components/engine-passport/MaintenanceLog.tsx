'use client'

import type { MaintenanceEvent, MaintenanceKind } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'

interface Props {
  events: MaintenanceEvent[]
}

const KIND_LABEL: Record<MaintenanceKind, string> = {
  service: 'Service',
  overhaul: 'Overhaul',
  inspection: 'Inspection',
  decommission: 'Decommission',
}

const KIND_BADGE: Record<MaintenanceKind, string> = {
  service: 'border-blue-200 bg-blue-50 text-blue-700',
  overhaul: 'border-purple-200 bg-purple-50 text-purple-700',
  inspection: 'border-amber-200 bg-amber-50 text-amber-700',
  decommission: 'border-gray-200 bg-gray-100 text-gray-500',
}

export function MaintenanceLog({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-gray-400">
        Нет записей в журнале обслуживания.
      </div>
    )
  }
  return (
    <ul className="flex h-full flex-col divide-y divide-gray-100 overflow-auto">
      {events.map((e) => (
        <li key={e.id} className="px-3 py-2">
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={`shrink-0 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold ${KIND_BADGE[e.kind]}`}
            >
              {KIND_LABEL[e.kind]}
            </span>
            <MonoNumber className="text-[10px] text-gray-500">{e.date}</MonoNumber>
          </div>
          <div className="mt-1 flex items-baseline gap-2 text-[10px] text-gray-500">
            <span>На</span>
            <MonoNumber className="font-semibold text-gray-700">{e.runHoursAtEvent} ч</MonoNumber>
            <span className="text-gray-400">наработки</span>
          </div>
          <div className="mt-0.5 text-[11px] leading-snug text-gray-700">{e.summary}</div>
          <div className="mt-0.5 text-[10px] text-gray-400">{e.id}</div>
        </li>
      ))}
    </ul>
  )
}
