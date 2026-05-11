'use client'

import { useRole } from '@/lib/role/RoleContext'
import type { Role } from '@/lib/role/constants'

const LABEL: Record<Role, string> = {
  'tms-engineer': 'TMS-инженер',
  client: 'Клиент',
  driver: 'Гонщик',
}

interface Props {
  // Слово, описывающее отсутствующую сущность в винительном падеже:
  // «моторов в парке», «инцидентов», «активной live-сессии», «записей» и т.п.
  entity: string
}

export function EmptyForRole({ entity }: Props) {
  const { role } = useRole()
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-center">
      <div className="max-w-sm">
        <div className="mb-2 text-base font-semibold text-gray-700">
          У роли «{LABEL[role]}» нет {entity}.
        </div>
        <div className="text-sm text-gray-500">
          Переключите роль в правом верхнем углу, чтобы увидеть доступы
          других уровней.
        </div>
      </div>
    </div>
  )
}
