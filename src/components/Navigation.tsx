'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Lock } from 'lucide-react'

interface NavigationProps {
  title?: string
}

interface NavigationLink {
  href: string
  label: string
  isSpecial?: boolean
  isSecondary?: boolean
  icon?: React.ReactNode
}

export default function Navigation({ title = "Virtual Pitwall" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationLinks: NavigationLink[] = [
    { href: '/about', label: '📚 Начать здесь', isSpecial: true },
    { href: '/', label: 'Virtual Pitwall' },
    { href: '/features', label: 'Features' },
    { href: '/shortcut', label: 'DK Racing' },
    { href: '/shortcut/demo', label: 'Team Demo' },
    { href: '/shortcut/dk', label: 'DK Demo' },
    { href: '/shortcut/benefits', label: 'Benefits' },
    { href: '/dev', label: 'Developer', icon: <Lock className="w-4 h-4" />, isSecondary: true }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const getLinkClassName = (link: NavigationLink): string => {
    if (link.isSpecial) {
      return "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
    }
    
    if (link.isSecondary) {
      const baseClasses = "text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"
      const activeClasses = isActive(link.href) ? " text-gray-700 bg-gray-100" : ""
      return baseClasses + activeClasses
    }

    const baseClasses = "font-medium px-3 py-2 rounded-lg transition-colors"
    const stateClasses = isActive(link.href) 
      ? " text-red-600 bg-red-50" 
      : " text-gray-700 hover:text-red-600 hover:bg-red-50"
    return baseClasses + stateClasses
  }

  const getMobileLinkClassName = (link: NavigationLink): string => {
    if (link.isSpecial) {
      return "bg-blue-600 text-white px-4 py-3 rounded-lg font-medium flex items-center gap-2 w-full"
    }
    
    if (link.isSecondary) {
      const baseClasses = "text-gray-500 font-medium flex items-center gap-2 px-4 py-3 rounded-lg transition-colors w-full"
      const activeClasses = isActive(link.href) ? " text-gray-700 bg-gray-100" : " hover:bg-gray-100"
      return baseClasses + activeClasses
    }

    const baseClasses = "font-medium px-4 py-3 rounded-lg transition-colors w-full text-left"
    const stateClasses = isActive(link.href) 
      ? " text-red-600 bg-red-50" 
      : " text-gray-700 hover:text-red-600 hover:bg-red-50"
    return baseClasses + stateClasses
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
              <span className="text-xl font-bold text-gray-900">{title}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClassName(link)}
                title={link.href === '/dev' ? 'Техническая документация (требует пароль)' : undefined}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getMobileLinkClassName(link)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={link.href === '/dev' ? 'Техническая документация (требует пароль)' : undefined}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 