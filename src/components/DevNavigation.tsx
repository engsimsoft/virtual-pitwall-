'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Cpu, Code, LogOut, Home } from 'lucide-react'

export default function DevNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('dev-access')
    router.push('/')
  }

  const navigation = [
    {
      name: 'Hardware',
      href: '/dev/hardware',
      icon: Cpu,
      description: 'Железо и протоколы'
    },
    {
      name: 'FullStack',
      href: '/dev/fullstack',
      icon: Code,
      description: 'Веб приложение'
    }
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                Virtual Pitwall
                <span className="text-sm font-normal text-gray-500 ml-2">
                  Developer Area
                </span>
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                  title={item.description}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300" />
            
            {/* Back to main site */}
            <Link
              href="/"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="На главную"
            >
              <Home className="w-4 h-4 mr-2" />
              Главная
            </Link>
            
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              title="Выйти из dev области"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выход
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 