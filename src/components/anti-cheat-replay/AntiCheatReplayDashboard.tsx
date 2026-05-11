'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Client, Driver, Engine, Incident, Session, Track } from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'
import { useRole } from '@/lib/role/RoleContext'
import {
  dashboardVisibleToRole,
  sessionVisibleToRole,
} from '@/lib/role/access'
import { Card } from '@/components/ui/Card'
import { DeviceStatusBar } from '@/components/ui/DeviceStatusBar'
import { MonoNumber } from '@/components/MonoNumber'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { formatLapTime } from '@/lib/format'
import { SessionSelector, type SessionBundle } from './SessionSelector'
import { ScrubTimeline } from './ScrubTimeline'
import { ReplayRpmChart } from './ReplayRpmChart'
import { ReplayBoostChart } from './ReplayBoostChart'
import { ReplaySpeedThrottleChart } from './ReplaySpeedThrottleChart'
import { IncidentSummary } from './IncidentSummary'
import { HashChainViz } from './HashChainViz'
import { PlayControls } from './PlayControls'

export interface ReplayBundle {
  session: Session
  engine: Engine
  driver: Driver
  track: Track
  client: Client
  incidents: Incident[]
  violations: ViolationWindow[]
}

interface Props {
  bundles: ReplayBundle[]
  defaultSessionId: string
  initialSeekMs?: number
}

const TICK_MS = 200

export function AntiCheatReplayDashboard({ bundles, defaultSessionId, initialSeekMs }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('anti-cheat-replay', role)
  const filteredBundles = useMemo(
    () =>
      hasAccess
        ? bundles.filter((b) => sessionVisibleToRole(b.session, b.engine, role))
        : [],
    [hasAccess, bundles, role],
  )

  const [selectedId, setSelectedId] = useState(defaultSessionId)
  const [pointer, setPointer] = useState(() => {
    if (initialSeekMs === undefined) return 0
    const initialBundle = bundles.find((b) => b.session.id === defaultSessionId) ?? bundles[0]
    return nearestSampleIndex(initialBundle.session.samples, initialSeekMs)
  })
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (filteredBundles.length === 0) return
    if (!filteredBundles.some((b) => b.session.id === selectedId)) {
      setSelectedId(filteredBundles[0].session.id)
      setPointer(0)
      setPlaying(false)
    }
  }, [filteredBundles, selectedId])

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col">
        <EmptyForRole entity="доступа к anti-cheat replay" />
      </div>
    )
  }

  if (filteredBundles.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <EmptyForRole entity="сессий-нарушений в её скоупе" />
      </div>
    )
  }

  const bundle = filteredBundles.find((b) => b.session.id === selectedId) ?? filteredBundles[0]
  const samples = bundle.session.samples
  const durationMs = samples[samples.length - 1]?.tMs ?? 0
  const current = samples[Math.min(pointer, samples.length - 1)] ?? samples[0]

  const prevSelectedRef = useRef(selectedId)
  useEffect(() => {
    if (prevSelectedRef.current === selectedId) return
    prevSelectedRef.current = selectedId
    setPointer(0)
    setPlaying(false)
  }, [selectedId])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setPointer((p) => {
        if (p >= samples.length - 1) {
          setPlaying(false)
          return p
        }
        return p + 1
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [playing, samples.length])

  const selectorBundles: SessionBundle[] = useMemo(
    () =>
      filteredBundles.map((b) => ({
        session: b.session,
        label: `${b.session.id} · ${b.engine.model}`,
        sublabel: b.violations.map((v) => v.kind).join(', '),
      })),
    [filteredBundles]
  )

  const seek = (ms: number) => {
    const idx = nearestSampleIndex(samples, ms)
    setPointer(idx)
  }

  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 flex flex-col gap-2 border-b border-border bg-surface px-3 py-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 text-sm">
          <HeaderCell label="Мотор" primary={bundle.engine.model} secondary={bundle.engine.serialNumber} />
          <HeaderCell label="Гонщик" primary={bundle.driver.name} secondary={bundle.client.name} />
          <HeaderCell label="Трасса" primary={bundle.track.name} secondary={bundle.track.city} />
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-text-muted">Позиция</div>
            <MonoNumber className="text-lg font-semibold text-text-primary">
              {formatLapTime(current.tMs)}
            </MonoNumber>
          </div>
        </div>
        <SessionSelector
          bundles={selectorBundles}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </header>

      <DeviceStatusBar
        serial="TMS-TLS-0042"
        firmware="v2.1.4"
        lteBars={4}
        gpsSats={12}
        latencyMs={180}
        lastPacketSec={0.2}
      />

      {/* Charts + sidebar — explicit heights for Recharts */}
      <main className="flex-1 min-h-0 grid grid-cols-1 gap-2 overflow-y-auto p-2 lg:grid-cols-[3fr_2fr] lg:overflow-hidden">
        {/* LEFT — three charts stacked */}
        <section className="flex min-h-0 flex-col gap-2">
          <div className="flex-[1.3] min-h-[200px] flex flex-col">
            <Card
              title="Обороты"
              subtitle="CAN vs Gen. Красные полосы — окна нарушений."
              className="h-full"
            >
              <div className="h-full w-full">
                <ReplayRpmChart samples={samples} violations={bundle.violations} currentMs={current.tMs} />
              </div>
            </Card>
          </div>
          <div className="flex-1 min-h-[180px] grid grid-cols-1 gap-2 md:grid-cols-2">
            <Card
              title="Наддув"
              subtitle="Declared CAN vs оценка. Подсвечивается boost/launch."
              className="h-full"
            >
              <div className="h-full w-full">
                <ReplayBoostChart samples={samples} violations={bundle.violations} currentMs={current.tMs} />
              </div>
            </Card>
            <Card
              title="Скорость и газ"
              subtitle="V_GPS vs throttle. Launch-control: газ 100% при V_GPS<30."
              className="h-full"
            >
              <div className="h-full w-full">
                <ReplaySpeedThrottleChart
                  samples={samples}
                  violations={bundle.violations}
                  currentMs={current.tMs}
                />
              </div>
            </Card>
          </div>
        </section>

        {/* RIGHT — incident summary + hash chain */}
        <aside className="flex min-h-0 flex-col gap-2">
          <Card title="Сводка инцидентов" subtitle="Клик по карточке — переход к моменту" className="flex-1 min-h-[200px]">
            <IncidentSummary
              incidents={bundle.incidents}
              currentMs={current.tMs}
              onSeek={seek}
            />
          </Card>
          <Card
            title="Цепочка подписанных блоков"
            subtitle={`${bundle.session.signedBlocks.length} блоков`}
            className="flex-1 min-h-[200px]"
          >
            <HashChainViz
              blocks={bundle.session.signedBlocks}
              violations={bundle.violations}
              currentMs={current.tMs}
            />
          </Card>
        </aside>
      </main>

      <footer className="shrink-0 flex flex-col gap-1.5 border-t border-border bg-surface px-3 py-2">
        <ScrubTimeline
          durationMs={durationMs}
          currentMs={current.tMs}
          violations={bundle.violations}
          onSeek={seek}
        />
        <div className="flex items-center justify-between gap-3">
          <PlayControls
            playing={playing}
            currentMs={current.tMs}
            durationMs={durationMs}
            violations={bundle.violations}
            onPlayToggle={() => setPlaying((p) => !p)}
            onSeek={seek}
          />
          <span className="text-[11px] text-text-muted">
            ▶▶/◀◀ — перейти к следующему/предыдущему окну нарушения. Клик по полосе — скраб.
          </span>
        </div>
      </footer>
    </div>
  )
}

function nearestSampleIndex(samples: { tMs: number }[], ms: number): number {
  if (samples.length === 0) return 0
  const step = samples.length > 1 ? samples[1].tMs - samples[0].tMs : 200
  const idx = Math.round(ms / step)
  return Math.min(samples.length - 1, Math.max(0, idx))
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
