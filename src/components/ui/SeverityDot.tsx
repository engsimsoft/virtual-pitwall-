import type { IncidentSeverity } from '@/lib/mockData/types'

interface Props {
  severity: IncidentSeverity
  className?: string
}

const SEVERITY_BG: Record<IncidentSeverity, string> = {
  info: 'bg-blue-500',
  warn: 'bg-amber-500',
  violation: 'bg-red-500',
}

export function SeverityDot({ severity, className = '' }: Props) {
  return (
    <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_BG[severity]} ${className}`.trim()} />
  )
}
