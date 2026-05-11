'use client'

import type { BlackBoxBundle } from './BlackBoxDashboard'

interface Props {
  bundle: BlackBoxBundle
}

// Mock-экспорт: собирает компактный JSON-«пакет доказательства» в памяти
// и отдаёт через Blob-URL. Реальная криптоверификация и экспорт в юр-формат
// (PDF с QR-кодом, XAdES и т.п.) — задача чёрного ящика, не прототипного UI.
export function ExportButton({ bundle }: Props) {
  const handleExport = () => {
    const payload = {
      sessionId: bundle.session.id,
      engine: bundle.engine
        ? `${bundle.engine.id} (${bundle.engine.model}, ${bundle.engine.serialNumber})`
        : null,
      driver: bundle.driver?.name ?? null,
      track: bundle.track ? `${bundle.track.name}, ${bundle.track.city}` : null,
      client: bundle.client?.name ?? null,
      startedAt: bundle.session.startedAt,
      endedAt: bundle.session.endedAt,
      status: bundle.session.status,
      recordedOffline: bundle.session.recordedOffline,
      exportedAt: new Date().toISOString(),
      chain: {
        totalBlocks: bundle.session.signedBlocks.length,
        verification: 'valid',
        blocks: bundle.session.signedBlocks.map((b) => ({
          index: b.index,
          startMs: b.startMs,
          endMs: b.endMs,
          hash: b.hash,
          prevHash: b.prevHash,
        })),
      },
      violations: bundle.violations,
      incidents: bundle.incidents.map((i) => ({
        id: i.id,
        kind: i.kind,
        severity: i.severity,
        tMs: i.tMs,
        summary: i.summary,
        evidence: i.evidence,
      })),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tms-telos-evidence-${bundle.session.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="flex shrink-0 items-center gap-1.5 rounded-sm border border-tms-orange bg-status-warn-dim px-2.5 py-1 text-[11px] font-semibold text-text-primary transition-colors hover:bg-orange-100"
    >
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 1v7M3 5l3 3 3-3M2 11h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Скачать пакет доказательства (.json)
    </button>
  )
}
