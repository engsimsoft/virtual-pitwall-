import { cn } from '@/lib/utils'

interface IconButtonProps {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  title?: string
  className?: string
}

export function IconButton({
  children,
  onClick,
  active,
  disabled,
  title,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md border text-text-secondary transition-colors',
        active
          ? 'border-accent bg-accent-dim text-accent'
          : 'border-border bg-surface hover:border-text-muted hover:text-text-primary',
        disabled && 'cursor-not-allowed opacity-40',
        className
      )}
    >
      {children}
    </button>
  )
}
