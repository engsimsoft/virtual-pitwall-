import type { Engine, Session } from '../mockData/types'
import { PINNED_CLIENT_ID, PINNED_DRIVER_ID, type Role } from './constants'

// Доступ на уровне экрана. ROADMAP: TMS — полный доступ; клиент — свой парк
// + свои сессии + свой replay/black-box; гонщик — только свои live-сессии
// (без парка, паспорта, инцидентов, доказательной части). Этот уровень
// контроля идёт до sub-фильтрации сущностей.
export type Dashboard =
  | 'fleet'
  | 'engine-passport'
  | 'incidents'
  | 'live-session'
  | 'anti-cheat-replay'
  | 'black-box'
  | 'drop-zone'
  | 'settings'
  | 'alarms'

const ACCESS: Record<Dashboard, ReadonlyArray<Role>> = {
  fleet: ['tms-engineer', 'client'],
  'engine-passport': ['tms-engineer', 'client'],
  incidents: ['tms-engineer', 'client'],
  'live-session': ['tms-engineer', 'client', 'driver'],
  'anti-cheat-replay': ['tms-engineer', 'client'],
  'black-box': ['tms-engineer', 'client'],
  // Инфраструктура трассы — операционная зона TMS, клиенту/гонщику невидима.
  'drop-zone': ['tms-engineer'],
  // Регламент: TMS редактирует, клиент видит только свой контракт (через
  // PINNED_CLIENT_ID-фильтр в самом экране), гонщик не работает с лимитами.
  settings: ['tms-engineer', 'client'],
  // Alarm Center: TMS видит всё, клиент — свои моторы, гонщик — свои сессии.
  alarms: ['tms-engineer', 'client', 'driver'],
}

export function dashboardVisibleToRole(dashboard: Dashboard, role: Role): boolean {
  return ACCESS[dashboard].includes(role)
}

// Предикаты «видна ли сущность роли» — применяются после того, как доступ
// к самому экрану подтверждён. Для engine-based экранов нужен Set engineId,
// на которых у пинённого гонщика были сессии (вычисляется на server-page).

export function engineVisibleToRole(
  engine: Engine,
  role: Role,
  driverEngineIds: Set<string>,
): boolean {
  if (role === 'tms-engineer') return true
  if (role === 'client') return engine.clientId === PINNED_CLIENT_ID
  return driverEngineIds.has(engine.id)
}

export function sessionVisibleToRole(
  session: Session,
  engine: Engine | null,
  role: Role,
): boolean {
  if (role === 'tms-engineer') return true
  if (role === 'client') return engine?.clientId === PINNED_CLIENT_ID
  return session.driverId === PINNED_DRIVER_ID
}
