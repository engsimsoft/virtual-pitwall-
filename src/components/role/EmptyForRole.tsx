'use client'

import { useRole } from '@/lib/role/RoleContext'
import type { Role } from '@/lib/role/constants'

const LABEL: Record<Role, string> = {
  'tms-engineer': 'TMS-инженер',
  client: 'Клиент',
  driver: 'Гонщик',
}

interface Props {
  entity: string
}

export function EmptyForRole({ entity }: Props) {
  const { role } = useRole()
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-center">
      <div className="max-w-sm">
        <div className="mb-2 text-base font-semibold text-text-secondary">
          У роли «{LABEL[role]}» нет {entity}.
        </div>
        <div className="text-sm text-text-muted">
          Переключите роль в боковой панели, чтобы увидеть доступы
          других уровней.
        </div>
      </div>
    </div>
  )
}
