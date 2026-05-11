interface HeaderCellProps {
  label: string
  primary: string
  secondary?: string
  className?: string
}

export function HeaderCell({ label, primary, secondary, className }: HeaderCellProps) {
  return (
    <div className={`min-w-0 ${className ?? ''}`}>
      <div className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </div>
      <div className="truncate font-semibold text-text-primary">{primary}</div>
      {secondary && (
        <div className="truncate text-[11px] text-text-secondary">{secondary}</div>
      )}
    </div>
  )
}
