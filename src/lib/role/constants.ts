// Server-safe constants и тип Role. Отдельно от RoleContext.tsx, чтобы
// server-pages могли импортировать без втягивания 'use client' boundary.
// См. decisions/2026-05-11-role-context-prototype-scope.md.

export type Role = 'tms-engineer' | 'client' | 'driver'

// Pinned subjects подобраны под SES-008 (единственная live-сессия в моках):
// engine=ENG-007, client=CLI-03 «Меридиан Рейсинг», driver=DRV-04
// «Павел Сорокин». Без этого совпадения не-TMS роли видели бы пустую
// live-session, что обедняет демо.
export const PINNED_CLIENT_ID = 'CLI-03'
export const PINNED_DRIVER_ID = 'DRV-04'
