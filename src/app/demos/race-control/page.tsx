import { RACE_ENTRIES } from '@/lib/mockData/race-control'
import { RaceControlDashboard } from '@/components/race-control/RaceControlDashboard'

export default function RaceControlPage() {
  return <RaceControlDashboard entries={RACE_ENTRIES} />
}
