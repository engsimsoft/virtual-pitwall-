'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Role } from './constants'

export { type Role, PINNED_CLIENT_ID, PINNED_DRIVER_ID } from './constants'

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
