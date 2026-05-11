import { DROP_ZONES, TRACKS } from '@/lib/mockData'
import { DropZoneDashboard } from '@/components/drop-zone/DropZoneDashboard'

export default function DropZonePage() {
  const trackById = new Map(TRACKS.map((t) => [t.id, t]))
  const sites = DROP_ZONES.map((site) => ({
    site,
    track: trackById.get(site.trackId) ?? null,
  }))

  return <DropZoneDashboard sites={sites} />
}
