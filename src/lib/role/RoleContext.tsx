'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Role = 'tms-engineer' | 'client' | 'driver'

// Прикреплённые ID для не-TMS ролей. Прототип не даёт UX-выбора конкретного
// клиента или гонщика — переключатель меняет уровень доступа, субъект
// фиксирован. См. decisions/2026-05-11-role-context-prototype-scope.md.
export const PINNED_CLIENT_ID = 'CLI-01'
export const PINNED_DRIVER_ID = 'DRV-01'

interface RoleContextValue {
  role: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)
const STORAGE_KEY = 'telos-role'

function isRole(value: unknown): value is Role {
  return value === 'tms-engineer' || value === 'client' || value === 'driver'
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>('tms-engineer')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isRole(stored)) setRoleState(stored)
  }, [])

  const setRole = (r: Role) => {
    setRoleState(r)
    window.localStorage.setItem(STORAGE_KEY, r)
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used inside RoleProvider')
  return ctx
}
