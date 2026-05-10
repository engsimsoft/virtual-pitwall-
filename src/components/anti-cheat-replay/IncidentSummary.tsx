'use client'

import type { Incident, IncidentSeverity } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { formatLapTime } from '@/lib/format'

interface Props {
  incidents: Incident[]
  currentMs: number
  onSeek: (ms: number) => void
}

const KIND_LABEL: Record<string, string> = {
  'rpm-mismatch': 'Расхождение RPM (CAN ≠ Gen)',
  'overrev': 'Превышение redline',
  'boost-mismatch': 'Boost CAN ≠ Оценка',
  'launch-control': 'Launch control',
  'tamper-detected': 'Вмешательство',
  'overboost': 'Превышение наддува',
  'temp-warn': 'Температурный warn',
}

export function IncidentSummary({ incidents, currentMs, onSeek }: Props) {
  if (incidents.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-gray-400">
        Без зарегистрированных инцидентов в этой сессии.
      </div>
    )
  }
  return (
    <ul className="flex h-full flex-col divide-y divide-gray-100 overflow-auto">
      {incidents.map((i) => {
        const active = Math.abs(i.tMs - currentMs) < 1500
        return (
          <li key={i.id}>
            <button
              type="button"
              onClick={() => onSeek(i.tMs)}
              className={`flex w-full items-start gap-2 px-2 py-2 text-left transition-colors ${
                active ? 'bg-amber-50' : 'hover:bg-gray-50'
              }`}
            >
              <SeverityDot severity={i.severity} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-semibold text-gray-900">
                    {KIND_LABEL[i.kind] ?? i.kind}
                  </span>
                  <MonoNumber className="text-[11px] text-gray-700">
                    {formatLapTime(i.tMs)}
                  </MonoNumber>
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-gray-700">{i.summary}</div>
                {i.evidence && (
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-500">
                    {i.evidence.declared !== undefined && (
                      <Evidence label="декларация" value={i.evidence.declared} unit={i.evidence.unit} />
                    )}
                    {i.evidence.observed !== undefined && (
                      <Evidence label="фактически" value={i.evidence.observed} unit={i.evidence.unit} />
                    )}
                    {i.evidence.threshold !== undefined && (
                      <Evidence label="порог" value={i.evidence.threshold} unit={i.evidence.unit} />
                    )}
                  </div>
                )}
                <div className="mt-1 text-[10px] text-gray-400">{i.id}</div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function Evidence({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span>{label}</span>
      <MonoNumber className="text-gray-700">{value}</MonoNumber>
      {unit && <span>{unit}</span>}
    </span>
  )
}

function SeverityDot({ severity }: { severity: IncidentSeverity }) {
  const colors: Record<IncidentSeverity, string> = {
    info: 'bg-blue-500',
    warn: 'bg-amber-500',
    violation: 'bg-red-500',
  }
  return <span className={`mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${colors[severity]}`} />
}
