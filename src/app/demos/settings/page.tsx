import { CLIENTS, ENGINES, INCIDENTS, REGULATIONS } from '@/lib/mockData'
import {
  SettingsDashboard,
  type RelevantIncidentRow,
} from '@/components/settings/SettingsDashboard'

export default function SettingsPage() {
  const engineById = new Map(ENGINES.map((e) => [e.id, e]))

  const incidentRows: RelevantIncidentRow[] = INCIDENTS.slice()
    .sort((a, b) => b.tMs - a.tMs)
    .map((incident) => {
      const engine = engineById.get(incident.engineId)
      return {
        incident,
        engineModel: engine?.model ?? '—',
        engineClientId: engine?.clientId ?? null,
      }
    })

  return (
    <SettingsDashboard
      clients={CLIENTS}
      regulations={REGULATIONS}
      incidents={incidentRows}
    />
  )
}
