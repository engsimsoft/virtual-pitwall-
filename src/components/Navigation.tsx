'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  title?: string
}

export default function Navigation({ title = "Virtual Pitwall" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationLinks = [
    { href: '/about', label: '📚 Начать здесь', icon: '📚' },
    { href: '/', label: 'Virtual Pitwall' },
    { href: '/features', label: 'Features' },
    { href: '/mvp_tech_spec', label: 'MVP Tech Spec' },
    { href: '/torgmash-proposal', label: '⚙️ Торгмаш', icon: '⚙️' },
    { href: '/legends', label: 'ArtLine' },
    { href: '/dev', label: '🔒 Developer', icon: '🔒' }
  ]

  const getMobileLinkClassName = (href: string): string => {
    const baseClasses = "font-medium px-4 py-3 rounded-lg transition-colors w-full text-left"
    const stateClasses = pathname === href || pathname.startsWith(href)
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
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/about' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📚 Начать здесь
            </Link>
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Virtual Pitwall
            </Link>
            <Link 
              href="/features" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/features' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Features
            </Link>
            <Link 
              href="/mvp_tech_spec" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/mvp_tech_spec' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              MVP Tech Spec
            </Link>
            <Link 
              href="/torgmash-proposal" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/torgmash-proposal' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              ⚙️ Торгмаш
            </Link>
            <Link
              href="/legends"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/legends') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              ArtLine
            </Link>
            <Link 
              href="/dev" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/dev') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              🔒 Developer
            </Link>
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
                  className={getMobileLinkClassName(link.href)}
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