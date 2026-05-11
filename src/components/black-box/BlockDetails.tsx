'use client'

import type { Incident, SignedBlock } from '@/lib/mockData/types'
import { MonoNumber } from '@/components/MonoNumber'
import { SeverityDot } from '@/components/ui/SeverityDot'
import { formatLapTime } from '@/lib/format'

interface Props {
  block: SignedBlock
  sampleCount: number
  incidents: Incident[]
  isFirst: boolean
}

export function BlockDetails({ block, sampleCount, incidents, isFirst }: Props) {
  return (
    <div className="flex flex-col gap-3 p-3 text-[12px]">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-text-muted">Block index</div>
        <MonoNumber className="text-2xl font-semibold text-text-primary">#{block.index}</MonoNumber>
      </div>

      <KV label="Окно времени">
        <MonoNumber className="text-[12px] text-text-primary">
          {formatLapTime(block.startMs)} → {formatLapTime(block.endMs)}
        </MonoNumber>
        <span className="ml-2 text-[10px] text-text-muted">
          ({block.endMs - block.startMs} ms)
        </span>
      </KV>

      <KV label="Sample count в окне">
        <MonoNumber className="font-semibold text-text-primary">{sampleCount}</MonoNumber>
        <span className="ml-1 text-[10px] text-text-muted">@ 25 Hz</span>
      </KV>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-text-muted">Hash блока</div>
        <div className="mt-0.5 break-all rounded-sm border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-text-primary">
          {block.hash}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-wider text-text-muted">Prev-hash</div>
          {isFirst && (
            <span className="text-[10px] italic text-text-muted">genesis-блок</span>
          )}
        </div>
        <div className="mt-0.5 break-all rounded-sm border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-text-primary">
          {block.prevHash}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-wider text-text-muted">
            Инциденты в окне блока
          </div>
          <MonoNumber className="text-[10px] text-text-muted">{incidents.length}</MonoNumber>
        </div>
        {incidents.length === 0 ? (
          <div className="mt-1 rounded-sm border border-border bg-background px-2 py-1.5 text-[11px] text-text-muted">
            В этом блоке нет зарегистрированных инцидентов.
          </div>
        ) : (
          <ul className="mt-1 flex flex-col gap-1">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="flex items-start gap-2 rounded-sm border border-border bg-surface px-2 py-1.5"
              >
                <SeverityDot severity={i.severity} className="mt-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <MonoNumber className="text-[11px] font-semibold text-text-primary">{i.id}</MonoNumber>
                    <MonoNumber className="text-[10px] text-text-muted">
                      {formatLapTime(i.tMs)}
                    </MonoNumber>
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-text-secondary">{i.summary}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}
