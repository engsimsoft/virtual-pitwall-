'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  AlertTriangle,
  Archive,
  Bell,
  FileText,
  LayoutDashboard,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Wifi,
  Sun,
  Moon,
} from 'lucide-react'
import { RoleSwitcher } from '@/components/role/RoleSwitcher'
import { useTheme } from '@/lib/theme/ThemeContext'
import { useAlarms } from '@/lib/alarm/AlarmContext'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/demos/live-session', label: 'Live Session', icon: Activity },
  { href: '/demos/anti-cheat-replay', label: 'Anti-Cheat', icon: ShieldCheck },
  { href: '/demos/fleet', label: 'Fleet', icon: Server },
  { href: '/demos/engine-passport', label: 'Passport', icon: FileText },
  { href: '/demos/alarms', label: 'Alarm Center', icon: Bell },
  { href: '/demos/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/demos/black-box', label: 'Black Box', icon: Archive },
  { href: '/demos/drop-zone', label: 'Drop Zone', icon: Wifi },
  { href: '/demos/settings', label: 'Regulations', icon: SlidersHorizontal },
]

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { activeCount } = useAlarms()

  return (
    <aside className="flex h-dvh w-56 flex-col border-r border-border bg-surface">
      {/* Product mark */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <span className="text-base font-bold tracking-tight text-text-primary">Telos</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto px-2 py-3">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Экраны
        </div>
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-elevated text-accent'
                    : 'text-text-secondary hover:bg-elevated hover:text-text-primary'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.href === '/demos/alarms' && activeCount > 0 && (
                  <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-status-critical px-1 text-[10px] font-bold text-text-inverse">
                    {activeCount}
                  </span>
                )}
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer controls */}
      <div className="border-t border-border px-3 py-3 space-y-2">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-elevated hover:text-text-primary"
          title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="text-xs">
            {theme === 'dark' ? 'Тёмная' : 'Светлая'}
          </span>
        </button>
        <RoleSwitcher />
      </div>
    </aside>
  )
}
