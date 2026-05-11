'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Menu } from 'lucide-react'
import { AlarmProvider } from '@/lib/alarm/AlarmContext'
import { AlarmToast } from '@/components/alarm/AlarmToast'
import { ALARMS } from '@/lib/mockData'

interface AppShellProps {
  children: React.ReactNode
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/demos/live-session': 'Live Session',
  '/demos/anti-cheat-replay': 'Anti-Cheat',
  '/demos/fleet': 'Fleet',
  '/demos/engine-passport': 'Engine Passport',
  '/demos/incidents': 'Incidents',
  '/demos/black-box': 'Black Box',
  '/demos/drop-zone': 'Drop Zone',
  '/demos/settings': 'Regulations',
  '/demos/alarms': 'Alarm Center',
  '/demos/race-control': 'Race Control',
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <AlarmProvider initialAlarms={ALARMS}>
      <AppShellInner mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} pathname={pathname}>
        {children}
      </AppShellInner>
    </AlarmProvider>
  )
}

function AppShellInner({
  children,
  mobileOpen,
  setMobileOpen,
  pathname,
}: {
  children: React.ReactNode
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  pathname: string
}) {

  return (
    <div className="flex h-dvh bg-background text-text-primary">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <AlarmToast />
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-2 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-secondary"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-text-primary">
            {PAGE_TITLES[pathname] || 'Telos'}
          </span>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
