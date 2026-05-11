'use client'

import { useEffect, useMemo, useState } from 'react'
import type {
  Client,
  Driver,
  Engine,
  Incident,
  Session,
  Track,
} from '@/lib/mockData/types'
import type { ViolationWindow } from '@/lib/mockData'
import { useRole } from '@/lib/role/RoleContext'
import {
  dashboardVisibleToRole,
  sessionVisibleToRole,
} from '@/lib/role/access'
import { MonoNumber } from '@/components/MonoNumber'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { formatLapTime } from '@/lib/format'
import { SessionPicker } from './SessionPicker'
import { HashChainList } from './HashChainList'
import { BlockDetails } from './BlockDetails'
import { ExportButton } from './ExportButton'

export interface BlackBoxBundle {
  session: Session
  engine: Engine | null
  driver: Driver | null
  track: Track | null
  client: Client | null
  incidents: Incident[]
  violations: ViolationWindow[]
}

interface Props {
  bundles: BlackBoxBundle[]
  defaultSessionId: string
}

export function BlackBoxDashboard({ bundles, defaultSessionId }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('black-box', role)
  const filteredBundles = useMemo(
    () =>
      hasAccess
        ? bundles.filter((b) => sessionVisibleToRole(b.session, b.engine, role))
        : [],
    [hasAccess, bundles, role],
  )

  const [selectedId, setSelectedId] = useState(defaultSessionId)
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(0)

  useEffect(() => {
    if (filteredBundles.length === 0) return
    if (!filteredBundles.some((b) => b.session.id === selectedId)) {
      setSelectedId(filteredBundles[0].session.id)
      setSelectedBlockIndex(0)
    }
  }, [filteredBundles, selectedId])

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col bg-background text-text-primary">
                <EmptyForRole entity="доступа к чёрному ящику" />
      </div>
    )
  }

  if (filteredBundles.length === 0) {
    return (
      <div className="flex h-full flex-col bg-background text-text-primary">
                <EmptyForRole entity="записей в её скоупе" />
      </div>
    )
  }

  const bundle =
    filteredBundles.find((b) => b.session.id === selectedId) ?? filteredBundles[0]
  const blocks = bundle.session.signedBlocks
  // Сбрасываем выбранный блок при смене сессии — индексы блоков валидны для
  // конкретной сессии, на чужой может выйти за пределы.
  const safeBlockIndex = Math.min(selectedBlockIndex, blocks.length - 1)
  const selectedBlock = blocks[safeBlockIndex] ?? blocks[0]

  const violatingBlockIndexes = useMemo(() => {
    const set = new Set<number>()
    for (const b of blocks) {
      const has = bundle.violations.some(
        (v) => v.startMs < b.endMs && v.endMs > b.startMs
      )
      if (has) set.add(b.index)
    }
    return set
  }, [blocks, bundle.violations])

  const blockSampleCount = useMemo(() => {
    if (!selectedBlock) return 0
    return bundle.session.samples.filter(
      (s) => s.tMs >= selectedBlock.startMs && s.tMs < selectedBlock.endMs
    ).length
  }, [bundle.session.samples, selectedBlock])

  const blockIncidents = useMemo(() => {
    if (!selectedBlock) return [] as Incident[]
    return bundle.incidents.filter(
      (i) => i.tMs >= selectedBlock.startMs && i.tMs < selectedBlock.endMs
    )
  }, [bundle.incidents, selectedBlock])

  const handleSessionSelect = (id: string) => {
    setSelectedId(id)
    setSelectedBlockIndex(0)
  }

  return (
    <div className="flex h-full flex-col bg-background text-text-primary">
            <header className="flex flex-col gap-2 border-b border-border bg-surface px-3 py-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="text-base font-semibold text-text-primary">
            Чёрный ящик · viewer записи
          </div>
          <ExportButton bundle={bundle} />
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 text-sm">
          <HeaderCell
            label="Мотор"
            primary={bundle.engine?.model ?? '—'}
            secondary={bundle.engine?.serialNumber ?? ''}
          />
          <HeaderCell
            label="Гонщик"
            primary={bundle.driver?.name ?? '—'}
            secondary={bundle.client?.name ?? ''}
          />
          <HeaderCell
            label="Трасса"
            primary={bundle.track?.name ?? '—'}
            secondary={bundle.track?.city ?? ''}
          />
          <HeaderCell
            label="Длительность"
            primary={formatLapTime(
              bundle.session.samples[bundle.session.samples.length - 1]?.tMs ?? 0
            )}
            secondary={`${blocks.length} signed-block`}
          />
          <ChainStatusBadge totalBlocks={blocks.length} />
        </div>
        <SessionPicker
          bundles={filteredBundles}
          selectedId={bundle.session.id}
          onSelect={handleSessionSelect}
        />
      </header>

      <main className="grid flex-1 min-h-0 grid-cols-[3fr_2fr] gap-2 p-2">
        <section className="flex min-h-0 flex-col rounded-md border border-border bg-surface">
          <div className="border-b border-border-subtle px-3 py-1.5">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Hash chain
            </div>
            <div className="truncate text-[11px] text-text-muted">
              {blocks.length} блоков · клик — детали блока · красные содержат нарушение
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <HashChainList
              blocks={blocks}
              selectedIndex={safeBlockIndex}
              violatingIndexes={violatingBlockIndexes}
              onSelect={setSelectedBlockIndex}
            />
          </div>
        </section>

        <aside className="flex min-h-0 flex-col rounded-md border border-border bg-surface">
          <div className="border-b border-border-subtle px-3 py-1.5">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Детали блока
            </div>
            <div className="truncate text-[11px] text-text-muted">
              hash, prev-hash, samples, инциденты в окне
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            {selectedBlock && (
              <BlockDetails
                block={selectedBlock}
                sampleCount={blockSampleCount}
                incidents={blockIncidents}
                isFirst={selectedBlock.index === 0}
              />
            )}
          </div>
        </aside>
      </main>
    </div>
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
      <div className="truncate text-[11px] text-text-muted">{secondary}</div>
    </div>
  )
}

function ChainStatusBadge({ totalBlocks }: { totalBlocks: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-status-ok bg-status-ok-dim px-2 py-1 text-xs font-semibold text-status-ok">
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      VALID · <MonoNumber>{totalBlocks}</MonoNumber>/<MonoNumber>{totalBlocks}</MonoNumber>
    </div>
  )
}
