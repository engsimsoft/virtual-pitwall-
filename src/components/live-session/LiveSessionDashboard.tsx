'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Client, Driver, Engine, Incident, Session, Track } from '@/lib/mockData/types'
import { useRole } from '@/lib/role/RoleContext'
import { sessionVisibleToRole } from '@/lib/role/access'
import { Card } from '@/components/ui/Card'
import { DeviceStatusBar } from '@/components/ui/DeviceStatusBar'
import { AlarmStrip } from '@/components/alarm/AlarmStrip'
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

export interface LiveSessionBundle {
  session: Session
  engine: Engine
  driver: Driver
  track: Track
  client: Client
  sessionIncidents: Incident[]
}

interface Props {
  bundles: LiveSessionBundle[]
  defaultSessionId: string
  fleetFeed: { incident: Incident; sessionId: string }[]
}

const TICK_MS = 200
const WINDOW_MS = 30_000

export function LiveSessionDashboard({
  bundles,
  defaultSessionId,
  fleetFeed,
}: Props) {
  const { role } = useRole()
  const [selectedId, setSelectedId] = useState(defaultSessionId)
  const [pointer, setPointer] = useState(0)

  const filteredBundles = useMemo(
    () => bundles.filter((b) => sessionVisibleToRole(b.session, b.engine, role)),
    [bundles, role]
  )

  useEffect(() => {
    if (filteredBundles.length === 0) return
    if (!filteredBundles.some((b) => b.session.id === selectedId)) {
      setSelectedId(filteredBundles[0].session.id)
      setPointer(0)
    }
  }, [filteredBundles, selectedId])

  const bundle = filteredBundles.find((b) => b.session.id === selectedId) ?? filteredBundles[0]
  if (!bundle) {
    return (
      <div className="flex h-full flex-col">
        <EmptyForRole entity="активной live-сессии" />
      </div>
    )
  }

  const { session, engine, driver, track, client, sessionIncidents } = bundle
  const { samples } = session
  const hasAccess = sessionVisibleToRole(session, engine, role)

  useEffect(() => {
    if (!hasAccess) return
    if (samples.length === 0) return
    const id = setInterval(() => {
      setPointer((p) => (p < samples.length - 1 ? p + 1 : p))
    }, TICK_MS)
    return () => clearInterval(id)
  }, [hasAccess, samples.length])

  const prevIdRef = useRef(selectedId)
  useEffect(() => {
    if (prevIdRef.current === selectedId) return
    prevIdRef.current = selectedId
    setPointer(0)
  }, [selectedId])

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
      {/* Header strip */}
      <HeaderStrip
        engine={engine}
        driver={driver}
        track={track}
        client={client}
        session={session}
        currentTms={current.tMs}
      />

      {/* Session chips */}
      <div className="shrink-0 border-b border-border-subtle bg-surface px-3 py-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-text-muted">
            Сессия
          </span>
          {filteredBundles.map((b) => {
            const active = b.session.id === selectedId
            return (
              <button
                key={b.session.id}
                type="button"
                onClick={() => onSelectSession(b.session.id)}
                className={`shrink-0 rounded-sm border px-2 py-1 text-left text-[11px] transition-colors ${
                  active
                    ? 'border-accent bg-accent-dim text-accent'
                    : 'border-border bg-surface text-text-secondary hover:bg-background'
                }`}
              >
                <div className="font-semibold">{b.session.id}</div>
                <div className="text-[10px] text-text-muted">
                  {b.engine.model} · {b.track.name}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Device status */}
      <DeviceStatusBar
        serial="TMS-TLS-0042"
        firmware="v2.1.4"
        lteBars={4}
        gpsSats={12}
        latencyMs={180}
        lastPacketSec={0.2}
      />
      <AlarmStrip sessionId={session.id} engineId={engine.id} />

      {/* Main charts area */}
      <main className="flex-1 min-h-0 grid grid-cols-1 gap-2 overflow-y-auto p-2 lg:grid-cols-3 lg:overflow-hidden">
        {/* LEFT COLUMN — 2/3 width on desktop */}
        <section className="flex min-h-0 flex-col gap-2 lg:col-span-2">
          <div className="flex-[1.3] min-h-[200px] flex flex-col">
            <Card
              title="Обороты"
              subtitle="CAN vs Gen (независимый импульсный канал)"
              badge={<DeltaBadge delta={delta} severity={severity} />}
              className="h-full"
            >
              <div className="h-full w-full">
                <RpmChart samples={windowed} />
              </div>
            </Card>
          </div>

          <div className="flex-1 min-h-[180px] grid grid-cols-1 gap-2 md:grid-cols-2">
            <Card title="Наддув" subtitle="декларация CAN vs оценка" className="h-full">
              <div className="h-full w-full">
                <BoostChart samples={windowed} />
              </div>
            </Card>
            <Card title="Скорость и газ" subtitle="GPS км/ч, throttle %" className="h-full">
              <div className="h-full w-full">
                <SpeedThrottleChart samples={windowed} />
              </div>
            </Card>
          </div>
        </section>

        {/* RIGHT COLUMN — 1/3 width on desktop */}
        <aside className="flex min-h-0 flex-col gap-2">
          <div className="flex-1 min-h-[180px] flex flex-col">
            <Card title="Текущие значения" className="h-full">
              <CurrentValues sample={current} />
            </Card>
          </div>
          <div className="flex-1 min-h-[180px] grid grid-cols-2 gap-2">
            <Card title="IMU" className="h-full">
              <div className="h-full w-full">
                <ImuWidget sample={current} />
              </div>
            </Card>
            <Card title="GPS-трек" subtitle={`${samples.length} точек`} className="h-full">
              <div className="h-full w-full">
                <GpsTrack samples={samples} currentIndex={pointer} />
              </div>
            </Card>
          </div>
        </aside>
      </main>

      {/* Footer ticker + blocks */}
      <footer className="shrink-0 min-h-[90px] max-h-[130px] border-t border-border bg-surface p-2 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2">
        <div className="min-h-0 overflow-hidden rounded-md border border-border">
          <IncidentTicker
            session={session}
            sessionIncidents={sessionIncidents}
            fleetFeed={fleetFeed}
          />
        </div>
        <div className="min-h-0 overflow-hidden rounded-md border border-border">
          <SignedBlockBar
            blocks={session.signedBlocks}
            currentTms={current.tMs}
            durationMs={samples[samples.length - 1]?.tMs ?? 1}
          />
        </div>
      </footer>
    </div>
  )

  function onSelectSession(id: string) {
    setSelectedId(id)
    setPointer(0)
  }
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
  const isLive = session.status === 'live'
  return (
    <header className="shrink-0 grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-border bg-surface px-3 py-2 text-sm">
      <HeaderCell label="Мотор" primary={engine.model} secondary={engine.serialNumber} />
      <HeaderCell label="Гонщик" primary={driver.name} secondary={client.name} />
      <HeaderCell label="Трасса" primary={track.name} secondary={track.city} />
      <div className="text-right">
        <div className="text-[10px] uppercase tracking-wider text-text-muted">Время сессии</div>
        <MonoNumber className="text-lg font-semibold text-text-primary">
          {formatLapTime(currentTms)}
        </MonoNumber>
      </div>
      <div
        className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${
          isLive
            ? 'bg-status-ok-dim text-status-ok border-status-ok'
            : 'bg-elevated text-text-secondary border-border'
        }`}
      >
        {isLive && (
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-ok opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-status-ok" />
          </span>
        )}
        {isLive ? 'LIVE' : session.status.toUpperCase()}
      </div>
    </header>
  )
}

function HeaderCell({
  label,
  primary,
  secondary,
}: {
  label: string
  primary: string
  secondary: string
}) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
      <div className="truncate font-semibold text-text-primary">{primary}</div>
      <div className="truncate text-[11px] text-text-secondary">{secondary}</div>
    </div>
  )
}

function DeltaBadge({
  delta,
  severity,
}: {
  delta: number
  severity: ReturnType<typeof rpmDeltaSeverity>
}) {
  const tone =
    severity === 'ok'
      ? 'bg-status-ok-dim text-status-ok border-status-ok'
      : severity === 'warn'
        ? 'bg-status-warn-dim text-status-warn border-status-warn'
        : 'bg-status-critical-dim text-status-critical border-status-critical'
  const sign = delta > 0 ? '+' : ''
  return (
    <div
      className={`flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-semibold ${tone}`}
    >
      <span className="text-text-muted">Δ</span>
      <MonoNumber>
        {sign}
        {formatRpm(delta)}
      </MonoNumber>
    </div>
  )
}
