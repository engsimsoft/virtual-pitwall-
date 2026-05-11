'use client'

import Link from 'next/link'
import type { Session } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'

export interface SessionLogRow {
  session: Session
  trackName: string
  trackCity: string
  driverName: string
  incidentCount: number
  href: string | null
}

interface Props {
  rows: SessionLogRow[]
}

const STATUS_DOT: Record<Session['status'], string> = {
  live: 'bg-emerald-500',
  completed: 'bg-text-muted',
  'offline-uploading': 'bg-amber-500',
}

export function SessionsLog({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[11px] text-text-muted">
        Сессий нет в журнале мотора.
      </div>
    )
  }
  return (
    <ul className="flex h-full flex-col divide-y divide-border-subtle overflow-auto">
      {rows.map((row) => (
        <li key={row.session.id}>
          {row.href ? (
            <Link href={row.href} className="block px-3 py-2 transition-colors hover:bg-background">
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

function RowBody({ row, interactive }: { row: SessionLogRow; interactive: boolean }) {
  const { session, trackName, trackCity, driverName, incidentCount } = row
  const dateOnly = session.startedAt.slice(0, 10)
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[session.status]}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <MonoNumber className="text-[11px] font-semibold text-text-primary">{session.id}</MonoNumber>
          <MonoNumber className="text-[10px] text-text-muted">{dateOnly}</MonoNumber>
        </div>
        <div className="mt-0.5 truncate text-[11px] text-text-secondary">
          {trackName} <span className="text-text-muted">· {trackCity}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2 text-[10px] text-text-muted">
          <span className="truncate">{driverName}</span>
          {incidentCount > 0 ? (
            <span className="rounded-sm border border-amber-200 bg-status-warn-dim px-1.5 py-0.5 text-[10px] font-semibold text-status-warn">
              {incidentCount} инцидент{plural(incidentCount)}
            </span>
          ) : (
            <span className="text-status-ok">без инцидентов</span>
          )}
        </div>
        {!interactive && session.status === 'completed' && (
          <div className="mt-0.5 text-[10px] italic text-text-muted">без deep-link отчёта</div>
        )}
      </div>
    </div>
  )
}

function plural(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return ''
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'а'
  return 'ов'
}
