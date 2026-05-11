'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Client, Driver, Engine, Incident, Session, Track } from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'
import { MonoNumber } from '@/components/MonoNumber'
import { DashboardTopBar } from '@/components/ui/DashboardTopBar'
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
  const [selectedId, setSelectedId] = useState(defaultSessionId)
  const [pointer, setPointer] = useState(() => {
    if (initialSeekMs === undefined) return 0
    const initialBundle = bundles.find((b) => b.session.id === defaultSessionId) ?? bundles[0]
    return nearestSampleIndex(initialBundle.session.samples, initialSeekMs)
  })
  const [playing, setPlaying] = useState(false)

  const bundle = bundles.find((b) => b.session.id === selectedId) ?? bundles[0]
  const samples = bundle.session.samples
  const durationMs = samples[samples.length - 1]?.tMs ?? 0
  const current = samples[Math.min(pointer, samples.length - 1)] ?? samples[0]

  // Сброс позиции при смене сессии — но не при первом mount, там pointer уже
  // выставлен из initialSeekMs (deep-link). Используем флаг прошлого id.
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
      bundles.map((b) => ({
        session: b.session,
        label: `${b.session.id} · ${b.engine.model}`,
        sublabel: b.violations.map((v) => v.kind).join(', '),
      })),
    [bundles]
  )

  const seek = (ms: number) => {
    const idx = nearestSampleIndex(samples, ms)
    setPointer(idx)
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <DashboardTopBar />
      <header className="flex flex-col gap-2 border-b border-gray-200 bg-white px-3 py-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 text-sm">
          <HeaderCell label="Мотор" primary={bundle.engine.model} secondary={bundle.engine.serialNumber} />
          <HeaderCell label="Гонщик" primary={bundle.driver.name} secondary={bundle.client.name} />
          <HeaderCell label="Трасса" primary={bundle.track.name} secondary={bundle.track.city} />
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">Позиция</div>
            <MonoNumber className="text-lg font-semibold text-gray-900">
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

      <main className="grid flex-1 min-h-0 grid-cols-[3fr_2fr] gap-2 p-2">
        <section className="flex min-h-0 flex-col gap-2">
          <ChartCard
            title="Обороты"
            subtitle="CAN vs Gen. Красные полосы — окна нарушений из VIOLATION_WINDOWS."
          >
            <ReplayRpmChart samples={samples} violations={bundle.violations} currentMs={current.tMs} />
          </ChartCard>
          <ChartCard
            title="Наддув"
            subtitle="Declared CAN vs оценка по rpm×газ. Подсвечивается boost/launch."
          >
            <ReplayBoostChart samples={samples} violations={bundle.violations} currentMs={current.tMs} />
          </ChartCard>
          <ChartCard
            title="Скорость и газ"
            subtitle="V_GPS vs throttle. Launch-control: газ 100% при V_GPS<30."
          >
            <ReplaySpeedThrottleChart
              samples={samples}
              violations={bundle.violations}
              currentMs={current.tMs}
            />
          </ChartCard>
        </section>
        <aside className="flex min-h-0 flex-col gap-2">
          <ChartCard title="Сводка инцидентов" subtitle="Клик по карточке — переход к моменту">
            <IncidentSummary
              incidents={bundle.incidents}
              currentMs={current.tMs}
              onSeek={seek}
            />
          </ChartCard>
          <ChartCard
            title="Цепочка подписанных блоков"
            subtitle={`${bundle.session.signedBlocks.length} блоков, ${bundle.violations.length > 0 ? 'часть содержит нарушения' : 'без нарушений'}`}
          >
            <HashChainViz
              blocks={bundle.session.signedBlocks}
              violations={bundle.violations}
              currentMs={current.tMs}
            />
          </ChartCard>
        </aside>
      </main>

      <footer className="flex shrink-0 flex-col gap-1.5 border-t border-gray-200 bg-white px-3 py-2">
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
          <span className="text-[11px] text-gray-500">
            ▶▶/◀◀ — перейти к следующему/предыдущему окну нарушения. Клик по полосе — скраб.
          </span>
        </div>
      </footer>
    </div>
  )
}

function nearestSampleIndex(samples: { tMs: number }[], ms: number): number {
  if (samples.length === 0) return 0
  // Сэмплы равномерные 200 ms, поэтому округлённый индекс точен.
  const step = samples.length > 1 ? samples[1].tMs - samples[0].tMs : 200
  const idx = Math.round(ms / step)
  return Math.min(samples.length - 1, Math.max(0, idx))
}

function HeaderCell({ label, primary, secondary }: { label: string; primary: string; secondary: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="truncate font-semibold text-gray-900">{primary}</div>
      <div className="truncate text-[11px] text-gray-500">{secondary}</div>
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-md border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-3 py-1.5">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">{title}</div>
        {subtitle && <div className="truncate text-[11px] text-gray-500">{subtitle}</div>}
      </div>
      <div className="min-h-0 flex-1 p-2">{children}</div>
    </div>
  )
}

