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
        <div className="text-[10px] uppercase tracking-wider text-gray-500">Block index</div>
        <MonoNumber className="text-2xl font-semibold text-gray-900">#{block.index}</MonoNumber>
      </div>

      <KV label="Окно времени">
        <MonoNumber className="text-[12px] text-gray-900">
          {formatLapTime(block.startMs)} → {formatLapTime(block.endMs)}
        </MonoNumber>
        <span className="ml-2 text-[10px] text-gray-500">
          ({block.endMs - block.startMs} ms)
        </span>
      </KV>

      <KV label="Sample count в окне">
        <MonoNumber className="font-semibold text-gray-900">{sampleCount}</MonoNumber>
        <span className="ml-1 text-[10px] text-gray-500">@ 25 Hz</span>
      </KV>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500">Hash блока</div>
        <div className="mt-0.5 break-all rounded-sm border border-gray-200 bg-gray-50 px-2 py-1.5 font-mono text-[11px] text-gray-800">
          {block.hash}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">Prev-hash</div>
          {isFirst && (
            <span className="text-[10px] italic text-gray-400">genesis-блок</span>
          )}
        </div>
        <div className="mt-0.5 break-all rounded-sm border border-gray-200 bg-gray-50 px-2 py-1.5 font-mono text-[11px] text-gray-800">
          {block.prevHash}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">
            Инциденты в окне блока
          </div>
          <MonoNumber className="text-[10px] text-gray-500">{incidents.length}</MonoNumber>
        </div>
        {incidents.length === 0 ? (
          <div className="mt-1 rounded-sm border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] text-gray-500">
            В этом блоке нет зарегистрированных инцидентов.
          </div>
        ) : (
          <ul className="mt-1 flex flex-col gap-1">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="flex items-start gap-2 rounded-sm border border-gray-200 bg-white px-2 py-1.5"
              >
                <SeverityDot severity={i.severity} className="mt-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <MonoNumber className="text-[11px] font-semibold text-gray-900">{i.id}</MonoNumber>
                    <MonoNumber className="text-[10px] text-gray-500">
                      {formatLapTime(i.tMs)}
                    </MonoNumber>
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-gray-700">{i.summary}</div>
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
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}
