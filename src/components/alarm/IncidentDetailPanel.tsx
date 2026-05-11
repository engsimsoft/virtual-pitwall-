'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { X, AlertOctagon, AlertTriangle, AlertCircle, ExternalLink } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import type { Alarm } from '@/lib/mockData/types'
import type { Incident } from '@/lib/mockData/types'
import { SESSIONS, ENGINES, TRACKS } from '@/lib/mockData'
import { MonoNumber } from '@/components/MonoNumber'
import { cn } from '@/lib/utils'

export type PanelData = {
  id: string
  severity: 'critical' | 'violation' | 'warn'
  action: string
  message: string
  value: number
  limit: number
  unit: string
  parameter: string
  engineId: string
  sessionId?: string
  triggeredAt: string
}

interface Props {
  data: PanelData | null
  onClose: () => void
}

const SEVERITY_ICON = {
  critical: AlertOctagon,
  violation: AlertTriangle,
  warn: AlertCircle,
}

const SEVERITY_LABEL = {
  critical: 'CRITICAL',
  violation: 'VIOLATION',
  warn: 'WARN',
}

const SEVERITY_STYLE = {
  critical: 'bg-status-critical-dim text-status-critical border-status-critical',
  violation: 'bg-status-warn-dim text-status-warn border-status-warn',
  warn: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
}

const PARAM_LABEL: Record<string, string> = {
  rpm: 'Обороты',
  'oil-pressure': 'Давление масла',
  'coolant-temp': 'Температура ОЖ',
  'oil-temp': 'Температура масла',
  boost: 'Наддув',
}

export function alarmToPanelData(alarm: Alarm): PanelData {
  return {
    id: alarm.id,
    severity: alarm.severity,
    action: alarm.action,
    message: alarm.message,
    value: alarm.value,
    limit: alarm.limit,
    unit: alarm.unit,
    parameter: alarm.parameter,
    engineId: alarm.engineId,
    sessionId: alarm.sessionId,
    triggeredAt: alarm.triggeredAt,
  }
}

export function incidentToPanelData(incident: Incident): PanelData {
  const parameter = incident.kind === 'overrev' || incident.kind === 'rpm-mismatch'
    ? 'rpm'
    : incident.kind === 'boost-mismatch' || incident.kind === 'overboost' || incident.kind === 'launch-control'
    ? 'boost'
    : incident.kind === 'temp-warn'
    ? 'coolant-temp'
    : 'rpm'

  const severity = incident.severity === 'info' ? 'warn' : incident.severity

  return {
    id: incident.id,
    severity,
    action: incident.summary.split('—')[0]?.trim() || 'Инцидент',
    message: incident.summary,
    value: incident.evidence?.observed ?? 0,
    limit: incident.evidence?.threshold ?? 0,
    unit: incident.evidence?.unit ?? '',
    parameter,
    engineId: incident.engineId,
    sessionId: incident.sessionId,
    triggeredAt: new Date().toISOString(),
  }
}

export function IncidentDetailPanel({ data, onClose }: Props) {
  const session = useMemo(() => {
    if (!data?.sessionId) return null
    return SESSIONS.find((s) => s.id === data.sessionId) ?? null
  }, [data])

  const engine = useMemo(() => {
    if (!data) return null
    return ENGINES.find((e) => e.id === data.engineId) ?? null
  }, [data])

  const track = useMemo(() => {
    if (!session) return null
    return TRACKS.find((t) => t.id === session.trackId) ?? null
  }, [session])

  if (!data) return null

  const Icon = SEVERITY_ICON[data.severity]

  const chartData = useMemo(() => {
    if (!session) return []
    const centerMs = session.samples.length > 0
      ? session.samples[Math.floor(session.samples.length / 2)].tMs
      : 0
    const windowMs = 10_000
    const samples = session.samples.filter(
      (s) => s.tMs >= centerMs - windowMs && s.tMs <= centerMs + windowMs
    )
    return samples.map((s) => {
      const val = data.parameter === 'rpm' ? s.rpmCan
        : data.parameter === 'boost' ? s.boostBarCan
        : data.parameter === 'coolant-temp' ? s.coolantC
        : data.parameter === 'oil-temp' ? s.oilC
        : data.parameter === 'oil-pressure' ? s.rpmCan * 0.0002
        : 0
      return {
        t: (s.tMs / 1000).toFixed(1),
        value: val,
        limit: data.limit,
      }
    })
  }, [session, data])

  const gpsPoint = useMemo(() => {
    if (!session) return null
    const centerMs = session.samples.length > 0
      ? session.samples[Math.floor(session.samples.length / 2)].tMs
      : 0
    return session.samples.find((s) => Math.abs(s.tMs - centerMs) < 500) ?? null
  }, [session])

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex w-full max-w-xl flex-col bg-surface shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
          <div className="flex items-start gap-3">
            <div className={cn('flex items-center gap-1 rounded-sm border px-2 py-1 text-[10px] font-bold', SEVERITY_STYLE[data.severity])}>
              <Icon className="h-3 w-3" />
              {SEVERITY_LABEL[data.severity]}
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">
                {data.action}
              </div>
              <div className="text-xs text-text-secondary">{data.message}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded p-1 text-text-muted hover:bg-elevated hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-border-subtle px-4 py-2 text-[11px] text-text-muted">
          <span className="font-mono text-text-secondary">{data.value} {data.unit}</span>
          <span>/ лимит {data.limit} {data.unit}</span>
          {engine && (
            <>
              <span>·</span>
              <Link href={`/demos/engine-passport?engine=${engine.id}`} className="hover:text-accent hover:underline">
                {engine.id}
              </Link>
            </>
          )}
          {track && (
            <>
              <span>·</span>
              <span>{track.name}</span>
            </>
          )}
          {session && (
            <>
              <span>·</span>
              <Link href="/demos/live-session" className="hover:text-accent hover:underline">
                {session.id}
              </Link>
            </>
          )}
          <span className="ml-auto">{new Date(data.triggeredAt).toLocaleString('ru-RU')}</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-4 py-3">
          {/* Chart */}
          {chartData.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {PARAM_LABEL[data.parameter] || data.parameter} — момент нарушения
              </div>
              <div className="h-48 rounded-md border border-border bg-background p-2">
                <AreaChart data={chartData} width={400} height={170}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" />
                  <XAxis dataKey="t" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '11px',
                    }}
                  />
                  <ReferenceLine y={data.limit} stroke="var(--status-warn)" strokeDasharray="5 5" />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--accent)"
                    fill="var(--accent-dim)"
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </div>
            </div>
          )}

          {/* GPS */}
          {gpsPoint && (
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Место на трассе
              </div>
              <div className="flex h-32 items-center justify-center rounded-md border border-border bg-background">
                <div className="text-center">
                  <div className="text-sm font-mono text-text-primary">
                    {gpsPoint.lat.toFixed(4)}°N, {gpsPoint.lon.toFixed(4)}°E
                  </div>
                  <div className="mt-1 text-[11px] text-text-muted">
                    V_GPS: {gpsPoint.vGpsKmh.toFixed(0)} км/ч
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {session && (
              <Link
                href={`/demos/anti-cheat-replay?session=${session.id}&seek=${session.samples.length > 0 ? session.samples[Math.floor(session.samples.length / 2)].tMs : 0}`}
                className="flex items-center justify-center gap-2 rounded-md border border-accent bg-accent-dim px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-text-inverse"
              >
                <ExternalLink className="h-4 w-4" />
                Открыть в Anti-Cheat Replay
              </Link>
            )}
            <button
              onClick={onClose}
              className="rounded-md border border-border bg-elevated px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
