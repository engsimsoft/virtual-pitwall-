'use client'

import { useRole, type Role } from '@/lib/role/RoleContext'

interface RoleOption {
  value: Role
  label: string
  hint: string
}

const ROLES: RoleOption[] = [
  { value: 'tms-engineer', label: 'TMS', hint: 'TMS-инженер — полный доступ' },
  { value: 'client', label: 'Клиент', hint: 'Клиент-арендатор — свой парк' },
  { value: 'driver', label: 'Гонщик', hint: 'Гонщик — свои сессии' },
]

export function RoleSwitcher() {
  const { role, setRole } = useRole()

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-elevated p-0.5 text-[11px]">
      {ROLES.map((r) => {
        const active = r.value === role
        return (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            title={r.hint}
            className={
              active
                ? 'rounded-sm bg-surface px-2 py-0.5 font-semibold text-accent shadow-sm'
                : 'rounded-sm px-2 py-0.5 text-text-muted transition-colors hover:text-text-primary'
            }
          >
            {r.label}
          </button>
        )
      })}
    </div>
  )
}
