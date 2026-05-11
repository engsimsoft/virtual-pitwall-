'use client'

import {
  HardDrive,
  Radio,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import type {
  DropZoneComponent,
  DropZoneComponentKind,
  DropZoneComponentStatus,
  DropZoneSite,
  Track,
} from '@/lib/mockData/types'
import { useRole } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole } from '@/lib/role/access'
import { EmptyForRole } from '@/components/role/EmptyForRole'

interface SiteRow {
  site: DropZoneSite
  track: Track | null
}

interface Props {
  sites: SiteRow[]
}

const ICON_BY_KIND: Record<DropZoneComponentKind, LucideIcon> = {
  'wifi-ap': Wifi,
  'edge-server': HardDrive,
  'lte-backup': Radio,
}

const KIND_LABEL: Record<DropZoneComponentKind, string> = {
  'wifi-ap': 'WiFi 6 точка доступа',
  'edge-server': 'Edge-сервер',
  'lte-backup': 'LTE backup-аплинк',
}

const STATUS_LABEL: Record<DropZoneComponentStatus, string> = {
  online: 'online',
  degraded: 'degraded',
  offline: 'offline',
}

const STATUS_CLASSES: Record<DropZoneComponentStatus, string> = {
  online: 'bg-status-ok-dim text-status-ok ring-1 ring-inset ring-green-600/20',
  degraded: 'bg-status-warn-dim text-status-warn ring-1 ring-inset ring-amber-600/30',
  offline: 'bg-status-critical-dim text-status-critical ring-1 ring-inset ring-red-600/20',
}

export function DropZoneDashboard({ sites }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('drop-zone', role)

  if (!hasAccess) {
    return (
      <div className="flex h-full flex-col bg-background text-text-primary">
                <header className="border-b border-border bg-surface px-3 py-2">
          <div className="text-base font-semibold text-text-primary">Drop Zone</div>
          <div className="text-[11px] text-text-muted">
            Инфраструктура связи на проблемных трассах
          </div>
        </header>
        <EmptyForRole entity="доступа к инфраструктуре Drop Zone" />
      </div>
    )
  }

  if (sites.length === 0) {
    return (
      <div className="flex h-full flex-col bg-background text-text-primary">
                <EmptyForRole entity="развёрнутых Drop Zone-комплектов" />
      </div>
    )
  }

  // Прототип: один сайт. Если будут несколько — добавится селектор. Сейчас
  // безопасно брать первый.
  const { site, track } = sites[0]
  const aggregate = aggregateStatus(site.components)

  return (
    <div className="flex h-full flex-col bg-background text-text-primary">
            <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface px-3 py-2">
        <div>
          <div className="text-base font-semibold text-text-primary">
            {site.name}
          </div>
          <div className="text-[11px] text-text-muted">
            {track ? `${track.name} · ${track.city}` : '—'} · комплект{' '}
            {site.id}
          </div>
        </div>
        <span
          className={`rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${STATUS_CLASSES[aggregate]}`}
        >
          {STATUS_LABEL[aggregate]}
        </span>
      </header>

      <main className="grid flex-1 min-h-0 grid-cols-[2fr_1fr] gap-2 p-2">
        <section className="grid min-h-0 grid-rows-3 gap-2">
          {site.components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </section>

        <aside className="flex min-h-0 flex-col rounded-md border border-border bg-surface">
          <div className="border-b border-border-subtle px-3 py-1.5">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Очередь в облако
            </div>
            <div className="truncate text-[11px] text-text-muted">
              Состояние edge-буфера и канала к Telos Cloud
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3 text-[12px]">
            <SummaryRow
              label="Последняя синхронизация"
              value={`${site.lastSyncMinutesAgo} мин назад`}
            />
            <SummaryRow
              label="Сессий в буфере"
              value={String(site.bufferSessions)}
            />
            <SummaryRow
              label="Подписанных блоков"
              value={String(site.bufferBlocks)}
            />
            <SummaryRow
              label="Стоимость комплекта"
              value={`${(site.costRub / 1000).toFixed(0)} тыс ₽`}
            />
          </div>
          <div className="mt-auto border-t border-border-subtle bg-background px-3 py-1.5 text-[11px] text-text-muted">
            Edge-узел продолжает приём WiFi-потоков даже при деградации
            LTE-канала — данные накапливаются в буфере и синхронизируются с
            облаком, когда аплинк стабилизируется. Buffer = 0 означает, что
            всё уже доставлено.
          </div>
        </aside>
      </main>
    </div>
  )
}

function aggregateStatus(
  components: DropZoneComponent[],
): DropZoneComponentStatus {
  if (components.some((c) => c.status === 'offline')) return 'offline'
  if (components.some((c) => c.status === 'degraded')) return 'degraded'
  return 'online'
}

function ComponentCard({ component }: { component: DropZoneComponent }) {
  const Icon = ICON_BY_KIND[component.kind]
  return (
    <div className="flex min-h-0 flex-col rounded-md border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-3 py-1.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-elevated text-text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-text-muted">
              {KIND_LABEL[component.kind]}
            </div>
            <div className="text-[13px] font-semibold text-text-primary">
              {component.model}
            </div>
          </div>
        </div>
        <span
          className={`rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_CLASSES[component.status]}`}
        >
          {STATUS_LABEL[component.status]}
        </span>
      </div>
      <div className="grid flex-1 min-h-0 grid-cols-4 gap-px bg-elevated">
        {component.metrics.map((m) => (
          <div key={m.label} className="bg-surface p-2">
            <div className="mb-0.5 text-[10px] uppercase tracking-wider text-text-muted">
              {m.label}
            </div>
            <div className="font-mono text-[12px] text-text-primary">
              {m.value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border-subtle bg-background px-3 py-1.5">
        <div className="text-[11px] text-text-muted">{component.note}</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          uptime {component.uptimeHours} ч
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className="font-mono text-[13px] font-semibold text-text-primary">
        {value}
      </span>
    </div>
  )
}
