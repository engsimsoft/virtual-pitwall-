'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Client, Driver, Engine, Incident, Session, Track } from '@/lib/mockData/types'
import { useRole } from '@/lib/role/RoleContext'
import { sessionVisibleToRole } from '@/lib/role/access'
import { Card } from '@/components/ui/Card'
import { MonoNumber } from '@/components/MonoNumber'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { formatLapTime, formatRpm } from '@/lib/format'
import { rpmDelta, rpmDeltaSeverity } from '@/lib/antiCheat'
import { RpmChart } from './RpmChart'
import { BoostChart } from './BoostChart'
import { SpeedThrottleChart } from './SpeedThrottleChart'
import { CurrentValues } from './CurrentValues'
import { ImuWidget } from './ImuWidget'
import { GpsTrack } from './GpsTrack'
import { IncidentTicker } from './IncidentTicker'
import { SignedBlockBar } from './SignedBlockBar'

interface Props {
  session: Session
  engine: Engine
  driver: Driver
  track: Track
  client: Client
  sessionIncidents: Incident[]
  fleetFeed: { incident: Incident; sessionId: string }[]
}

const TICK_MS = 200       // совпадает с шагом 5 Hz в generator.ts
const WINDOW_MS = 30_000  // окно прокрутки в чартах

export function LiveSessionDashboard({
  session,
  engine,
  driver,
  track,
  client,
  sessionIncidents,
  fleetFeed,
}: Props) {
  const { role } = useRole()
  const hasAccess = sessionVisibleToRole(session, engine, role)
  const { samples } = session
  const [pointer, setPointer] = useState(0)

  useEffect(() => {
    if (!hasAccess) return
    if (samples.length === 0) return
    const id = setInterval(() => {
      setPointer((p) => (p < samples.length - 1 ? p + 1 : p))
    }, TICK_MS)
    return () => clearInterval(id)
  }, [hasAccess, samples.length])

  const current = samples[pointer] ?? samples[samples.length - 1]
  const windowed = useMemo(() => {
    if (!current) return []
    const minT = Math.max(0, current.tMs - WINDOW_MS)
    return samples.filter((s) => s.tMs >= minT && s.tMs <= current.tMs)
  }, [samples, current])

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col">
        <EmptyForRole entity="активной live-сессии" />
      </div>
    )
  }

  if (!current) return null

  const delta = rpmDelta(current)
  const severity = rpmDeltaSeverity(delta)

  return (
    <div className="flex h-full flex-col">
      <HeaderStrip
        engine={engine}
        driver={driver}
        track={track}
        client={client}
        session={session}
        currentTms={current.tMs}
      />

      <main className="grid flex-1 min-h-0 grid-cols-1 gap-2 p-2 lg:grid-cols-3">
        <section className="flex min-h-0 flex-col gap-2 lg:col-span-2">
          <Card
            title="Обороты"
            subtitle="CAN vs Gen (независимый импульсный канал)"
            badge={<DeltaBadge delta={delta} severity={severity} />}
          >
            <RpmChart samples={windowed} />
          </Card>

          <div className="grid flex-1 min-h-0 grid-cols-1 gap-2 md:grid-cols-2">
            <Card title="Наддув" subtitle="декларация CAN vs оценка по rpm×газ">
              <BoostChart samples={windowed} />
            </Card>
            <Card title="Скорость и газ" subtitle="GPS км/ч, throttle %">
              <SpeedThrottleChart samples={windowed} />
            </Card>
          </div>
        </section>

        <aside className="flex min-h-0 flex-col gap-2">
          <Card title="Текущие значения">
            <CurrentValues sample={current} />
          </Card>
          <div className="grid flex-1 min-h-0 grid-cols-2 gap-2">
            <Card title="IMU">
              <ImuWidget sample={current} />
            </Card>
            <Card title="GPS-трек" subtitle={`${samples.length} GPS-точек`}>
              <GpsTrack samples={samples} currentIndex={pointer} />
            </Card>
          </div>
        </aside>
      </main>

      <footer className="grid h-[150px] shrink-0 grid-cols-1 gap-2 border-t border-border bg-surface p-2 lg:grid-cols-[3fr_2fr]">
        <div className="min-h-0 rounded-md border border-border">
          <IncidentTicker
            session={session}
            sessionIncidents={sessionIncidents}
            fleetFeed={fleetFeed}
          />
        </div>
        <div className="min-h-0 rounded-md border border-border">
          <SignedBlockBar
            blocks={session.signedBlocks}
            currentTms={current.tMs}
            durationMs={samples[samples.length - 1]?.tMs ?? 1}
          />
        </div>
      </footer>
    </div>
  )
}

interface HeaderProps {
  engine: Engine
  driver: Driver
  track: Track
  client: Client
  session: Session
  currentTms: number
}

function HeaderStrip({ engine, driver, track, client, session, currentTms }: HeaderProps) {
  const status = session.status === 'live' ? 'LIVE' : session.status.toUpperCase()
  const statusColor =
    session.status === 'live' ? 'bg-status-ok-dim text-status-ok border-status-ok' : 'bg-elevated text-text-secondary border-border'

  return (
    <header className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-border bg-surface px-3 py-2 text-sm">
      <HeaderCell label="Мотор" primary={engine.model} secondary={engine.serialNumber} />
      <HeaderCell label="Гонщик" primary={driver.name} secondary={client.name} />
      <HeaderCell label="Трасса" primary={track.name} secondary={track.city} />
      <div className="text-right">
        <div className="text-[10px] uppercase tracking-wider text-text-muted">Время сессии</div>
        <MonoNumber className="text-lg font-semibold text-text-primary">
          {formatLapTime(currentTms)}
        </MonoNumber>
      </div>
      <div className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${statusColor}`}>
        {session.status === 'live' && (
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-ok animate-pulse-live" />
        )}
        {status}
      </div>
    </header>
  )
}

function HeaderCell({ label, primary, secondary }: { label: string; primary: string; secondary: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
      <div className="truncate font-semibold text-text-primary">{primary}</div>
      <div className="truncate text-[11px] text-text-secondary">{secondary}</div>
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string
  subtitle?: string
  badge?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-surface">
      <div className="flex items-baseline justify-between gap-2 border-b border-border-subtle px-3 py-1.5">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{title}</div>
          {subtitle && <div className="truncate text-[11px] text-text-muted">{subtitle}</div>}
        </div>
        {badge}
      </div>
      <div className="min-h-0 flex-1 p-2">{children}</div>
    </div>
  )
}

function DeltaBadge({ delta, severity }: { delta: number; severity: ReturnType<typeof rpmDeltaSeverity> }) {
  const tone =
    severity === 'ok'
      ? 'bg-status-ok-dim text-status-ok border-status-ok'
      : severity === 'warn'
        ? 'bg-status-warn-dim text-status-warn border-status-warn'
        : 'bg-status-critical-dim text-status-critical border-status-critical'
  const sign = delta > 0 ? '+' : ''
  return (
    <div className={`flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      <span className="text-text-muted">Δ</span>
      <MonoNumber>
        {sign}
        {formatRpm(delta)}
      </MonoNumber>
    </div>
  )
}

