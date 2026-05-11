import { MonoNumber } from '@/components/MonoNumber'

interface DataRowProps {
  label: string
  value: string | number
  unit?: string
  mono?: boolean
  highlight?: boolean
  className?: string
}

export function DataRow({ label, value, unit, mono, highlight, className }: DataRowProps) {
  const ValueWrapper = mono ? MonoNumber : 'span'
  return (
    <div className={`flex items-baseline justify-between gap-3 py-0.5 ${className ?? ''}`}>
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className={`text-xs font-medium ${highlight ? 'text-accent' : 'text-text-primary'}`}>
        <ValueWrapper>{value}</ValueWrapper>
        {unit && <span className="ml-0.5 text-text-muted">{unit}</span>}
      </span>
    </div>
  )
}
