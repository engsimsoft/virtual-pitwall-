'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Client, Driver, Engine, Incident, Session, Track } from '@/lib/mockData/types'
import { useRole } from '@/lib/role/RoleContext'
import { sessionVisibleToRole } from '@/lib/role/access'
import { Card } from '@/components/ui/Card'
import { DeviceStatusBar } from '@/components/ui/DeviceStatusBar'
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
    () =>
      bundles.filter((b) => sessionVisibleToRole(b.session, b.engine, role)),
    [bundles, role]
  )

  // При смене роли selectedId может стать недоступным
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

  // Сброс pointer при смене сессии
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
      <HeaderStrip
        engine={engine}
        driver={driver}
        track={track}
        client={client}
        session={session}
        currentTms={current.tMs}
      />
      <SessionSelector
        bundles={filteredBundles}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <DeviceStatusBar
        serial="TMS-TLS-0042"
        firmware="v2.1.4"
        lteBars={4}
        gpsSats={12}
        latencyMs={180}
        lastPacketSec={0.2}
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

function SessionSelector({
  bundles,
  selectedId,
  onSelect,
}: {
  bundles: LiveSessionBundle[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border-subtle bg-surface px-3 py-1.5">
      <span className="shrink-0 text-[10px] uppercase tracking-wider text-text-muted">Сессия</span>
      {bundles.map((b) => {
        const active = b.session.id === selectedId
        return (
          <button
            key={b.session.id}
            type="button"
            onClick={() => onSelect(b.session.id)}
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
    session.status === 'live'
      ? 'bg-status-ok-dim text-status-ok border-status-ok'
      : 'bg-elevated text-text-secondary border-border'

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
