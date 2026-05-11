'use client'

import { Signal, Wifi, Satellite, Clock, Cpu, HardDrive } from 'lucide-react'

interface DeviceStatusBarProps {
  serial?: string
  firmware?: string
  lteBars?: number // 0-5
  wifiStatus?: 'on' | 'off'
  gpsSats?: number
  latencyMs?: number
  lastPacketSec?: number
  className?: string
}

export function DeviceStatusBar({
  serial = 'TMS-TLS-0042',
  firmware = 'v2.1.4',
  lteBars = 4,
  wifiStatus = 'off',
  gpsSats = 12,
  latencyMs = 180,
  lastPacketSec = 0.2,
  className,
}: DeviceStatusBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border-subtle bg-surface px-3 py-1 text-[11px] ${className ?? ''}`}
    >
      <StatusItem icon={<HardDrive className="h-3 w-3" />} label={serial} />
      <StatusItem icon={<Cpu className="h-3 w-3" />} label={firmware} />

      <div className="flex items-center gap-1 text-text-secondary">
        <Signal className="h-3 w-3" />
        <LteBars bars={lteBars} />
        <span className="text-text-muted">LTE</span>
      </div>

      {wifiStatus === 'on' && (
        <div className="flex items-center gap-1 text-text-secondary">
          <Wifi className="h-3 w-3" />
          <span className="text-text-muted">WiFi</span>
        </div>
      )}

      <div className="flex items-center gap-1 text-text-secondary">
        <Satellite className="h-3 w-3" />
        <span className="font-mono text-text-primary">{gpsSats}</span>
        <span className="text-text-muted">GPS</span>
      </div>

      <div className="flex items-center gap-1 text-text-secondary">
        <Clock className="h-3 w-3" />
        <span className="font-mono text-text-primary">{latencyMs}</span>
        <span className="text-text-muted">мс</span>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            lastPacketSec < 1
              ? 'bg-status-ok animate-pulse-live'
              : lastPacketSec < 5
                ? 'bg-status-warn'
                : 'bg-status-critical'
          }`}
        />
        <span className="text-text-muted">
          пакет <span className="font-mono text-text-primary">{lastPacketSec.toFixed(1)}</span> с назад
        </span>
      </div>
    </div>
  )
}

function StatusItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 text-text-secondary">
      {icon}
      <span className="font-mono text-text-primary">{label}</span>
    </div>
  )
}

function LteBars({ bars }: { bars: number }) {
  return (
    <span className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`block h-2.5 w-[3px] rounded-sm ${
            i <= bars ? 'bg-status-ok' : 'bg-border'
          }`}
          style={{ height: `${8 + i * 3}px` }}
        />
      ))}
    </span>
  )
}
