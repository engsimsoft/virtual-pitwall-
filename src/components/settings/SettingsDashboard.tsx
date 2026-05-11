'use client'

import { useEffect, useMemo, useState } from 'react'
import type {
  Client,
  Incident,
  IncidentKind,
  Regulation,
} from '@/lib/mockData/types'
import { useRole, PINNED_CLIENT_ID } from '@/lib/role/RoleContext'
import { dashboardVisibleToRole } from '@/lib/role/access'
import { DashboardTopBar } from '@/components/ui/DashboardTopBar'
import { EmptyForRole } from '@/components/role/EmptyForRole'
import { SeverityDot } from '@/components/ui/SeverityDot'

export interface RelevantIncidentRow {
  incident: Incident
  engineModel: string
  engineClientId: string | null
}

interface Props {
  clients: Client[]
  regulations: Regulation[]
  incidents: RelevantIncidentRow[]
}

// Маппинг типов инцидентов к лимитам регламента, для подсветки в таблице
// и для «связанных нарушений».
const KIND_TO_LIMIT: Record<IncidentKind, keyof Regulation | null> = {
  'rpm-mismatch': 'rpmLimit',
  'overrev': 'rpmLimit',
  'boost-mismatch': 'boostBarLimit',
  'overboost': 'boostBarLimit',
  'temp-warn': 'coolantLimitC',
  'launch-control': null,
  'tamper-detected': null,
}

const KIND_LABEL: Record<IncidentKind, string> = {
  'rpm-mismatch': 'CAN/Gen RPM',
  'overrev': 'overrev',
  'boost-mismatch': 'boost CAN/est',
  'overboost': 'overboost',
  'temp-warn': 'температура',
  'launch-control': 'launch control',
  'tamper-detected': 'тампер',
}

export function SettingsDashboard({ clients, regulations, incidents }: Props) {
  const { role } = useRole()
  const hasAccess = dashboardVisibleToRole('settings', role)

  const visibleClients = useMemo(() => {
    if (role === 'tms-engineer') return clients
    if (role === 'client') return clients.filter((c) => c.id === PINNED_CLIENT_ID)
    return []
  }, [clients, role])

  const [selectedId, setSelectedId] = useState<string | null>(
    visibleClients[0]?.id ?? null,
  )

  // Fallback при смене роли — выбранный клиент мог стать невидимым.
  useEffect(() => {
    if (visibleClients.length === 0) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !visibleClients.some((c) => c.id === selectedId)) {
      setSelectedId(visibleClients[0].id)
    }
  }, [visibleClients, selectedId])

  const regByClient = useMemo(
    () => new Map(regulations.map((r) => [r.clientId, r])),
    [regulations],
  )

  const selectedClient = selectedId
    ? visibleClients.find((c) => c.id === selectedId) ?? null
    : null
  const selectedReg = selectedId ? regByClient.get(selectedId) ?? null : null

  const relevantIncidents = useMemo(() => {
    if (!selectedId) return []
    return incidents
      .filter((row) => row.engineClientId === selectedId)
      .slice(0, 8)
  }, [incidents, selectedId])

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900">
      <DashboardTopBar />
      <header className="flex items-baseline justify-between gap-4 border-b border-gray-200 bg-white px-3 py-2">
        <div>
          <div className="text-base font-semibold text-gray-900">Регламент</div>
          <div className="text-[11px] text-gray-500">
            Лимиты RPM/boost/temp на контракт. Изменение вступает в силу со
            следующей сессии (mock-режим, изменения не сохраняются).
          </div>
        </div>
        {visibleClients.length > 1 && (
          <div className="flex gap-1 text-[11px]">
            {visibleClients.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={
                  selectedId === c.id
                    ? 'rounded-sm border border-tms-orange bg-tms-orange/10 px-2 py-1 font-semibold text-tms-graphite'
                    : 'rounded-sm border border-gray-200 px-2 py-1 text-gray-600 hover:border-tms-orange/60 hover:text-tms-graphite'
                }
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {!hasAccess ? (
        <EmptyForRole entity="доступа к регламенту" />
      ) : !selectedClient || !selectedReg ? (
        <EmptyForRole entity="регламента" />
      ) : (
        <main className="grid flex-1 min-h-0 grid-cols-[1.4fr_1fr] gap-2 p-2">
          <section className="flex min-h-0 flex-col rounded-md border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-3 py-1.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                {selectedClient.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                {selectedClient.id} · контракт{' '}
                {selectedClient.contractStart.slice(0, 7)} —{' '}
                {selectedClient.contractEnd.slice(0, 7)}
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0 bg-gray-50 text-left text-[10px] uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-3 py-1.5 font-medium">Параметр</th>
                    <th className="px-3 py-1.5 text-right font-medium">
                      Лимит
                    </th>
                    <th className="px-3 py-1.5 text-right font-medium">
                      Единица
                    </th>
                    <th className="px-3 py-1.5 text-left font-medium">
                      Сигнал
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <ParamRow
                    name="Максимальные обороты"
                    value={selectedReg.rpmLimit}
                    unit="об/мин"
                    signal="CAN rpm + Gen pulses (cross-check)"
                  />
                  <ParamRow
                    name="Максимальный boost"
                    value={selectedReg.boostBarLimit.toFixed(2)}
                    unit="бар"
                    signal="CAN boost vs GPS/IMU dyno-estimate"
                  />
                  <ParamRow
                    name="Температура ОЖ"
                    value={selectedReg.coolantLimitC}
                    unit="°C"
                    signal="CAN coolantC"
                  />
                  <ParamRow
                    name="Температура масла"
                    value={selectedReg.oilLimitC}
                    unit="°C"
                    signal="CAN oilC"
                  />
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="px-3 py-1.5 text-[11px] text-gray-600">
                      Dwell перед alert'ом
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-[12px] text-gray-800">
                      {selectedReg.violationDwellMs}
                    </td>
                    <td className="px-3 py-1.5 text-right text-[11px] text-gray-500">
                      мс
                    </td>
                    <td className="px-3 py-1.5 text-[11px] text-gray-500">
                      Минимальная длительность превышения для триггера
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-500">
              Регламент привязан к контракту клиента. Лимиты применяются ко
              всем моторам клиента; индивидуальные исключения на конкретный
              мотор оформляются отдельным приложением.
            </div>
          </section>

          <aside className="flex min-h-0 flex-col rounded-md border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-3 py-1.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                Связанные нарушения
              </div>
              <div className="truncate text-[11px] text-gray-500">
                Последние инциденты на моторах клиента, попадающие под лимиты
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              {relevantIncidents.length === 0 ? (
                <div className="p-3 text-[12px] text-gray-500">
                  По регламенту {selectedClient.name} нарушений не
                  зафиксировано.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 text-[12px]">
                  {relevantIncidents.map((row) => (
                    <RelevantIncident
                      key={row.incident.id}
                      row={row}
                      regulation={selectedReg}
                    />
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </main>
      )}
    </div>
  )
}

function ParamRow({
  name,
  value,
  unit,
  signal,
}: {
  name: string
  value: number | string
  unit: string
  signal: string
}) {
  return (
    <tr className="border-t border-gray-100">
      <td className="px-3 py-1.5 text-gray-800">{name}</td>
      <td className="px-3 py-1.5 text-right font-mono text-[13px] font-semibold text-tms-graphite">
        {value}
      </td>
      <td className="px-3 py-1.5 text-right text-[11px] text-gray-500">
        {unit}
      </td>
      <td className="px-3 py-1.5 text-[11px] text-gray-500">{signal}</td>
    </tr>
  )
}

function RelevantIncident({
  row,
  regulation,
}: {
  row: RelevantIncidentRow
  regulation: Regulation
}) {
  const { incident, engineModel } = row
  const limitKey = KIND_TO_LIMIT[incident.kind]
  const limitValue = limitKey ? regulation[limitKey] : null
  const observed = incident.evidence?.observed
  const unit = incident.evidence?.unit ?? ''

  return (
    <li className="px-3 py-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SeverityDot severity={incident.severity} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
            {incident.id}
          </span>
          <span className="text-[11px] text-gray-800">
            {KIND_LABEL[incident.kind]}
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400">
          {engineModel}
        </span>
      </div>
      <div className="mt-0.5 truncate text-[11px] text-gray-600">
        {incident.summary}
      </div>
      {limitValue != null && observed != null && (
        <div className="mt-0.5 font-mono text-[10px] text-gray-500">
          лимит {limitValue}
          {unit} · наблюдалось {observed}
          {unit}
        </div>
      )}
    </li>
  )
}
