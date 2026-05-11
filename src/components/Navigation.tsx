'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavigationProps {
  title?: string
}

export default function Navigation({ title = "Telos" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()

  const mainLinks: { href: string; label: string; highlight?: boolean }[] = [
    { href: '/', label: 'Главная' },
  ]

  const dropdownSections: { title: string; links: { href: string; label: string }[] }[] = []

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const getLinkClassName = (href: string, highlight?: boolean): string => {
    const baseClasses = "text-sm font-medium transition-colors"
    const activeClasses = isActive(href)
      ? "text-tms-orange"
      : "text-gray-700 hover:text-tms-orange"
    const highlightClasses = highlight
      ? "bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100"
      : ""

    return `${baseClasses} ${activeClasses} ${highlightClasses}`
  }

  const getMobileLinkClassName = (href: string): string => {
    const baseClasses = "font-medium px-4 py-3 rounded-lg transition-colors w-full text-left"
    const stateClasses = isActive(href)
      ? " text-tms-orange bg-orange-50"
      : " text-gray-700 hover:text-tms-orange hover:bg-orange-50"
    return baseClasses + stateClasses
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/tms-logo-graphite.svg"
                alt="TMS"
                width={120}
                height={24}
                priority
                className="h-6 w-auto"
              />
              <span className="text-xl font-bold text-tms-graphite">{title}</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClassName(link.href, link.highlight)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Dropdown "Ещё" */}
            {dropdownSections.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="text-sm font-medium text-gray-700 hover:text-tms-orange transition-colors flex items-center gap-1"
                >
                  Ещё
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                    {dropdownSections.map((section, sectionIndex) => (
                      <div key={section.title}>
                        {sectionIndex > 0 && <div className="border-t border-gray-100 my-2"></div>}
                        <div className="px-4 py-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {section.title}
                          </div>
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-tms-orange rounded-md transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-tms-orange hover:bg-gray-100 transition-colors"
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
              {/* Main links */}
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getMobileLinkClassName(link.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Dropdown sections */}
              {dropdownSections.map((section) => (
                <div key={section.title} className="pt-4">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </div>
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={getMobileLinkClassName(link.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
