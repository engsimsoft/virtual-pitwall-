'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Code, Cpu, FileText } from 'lucide-react'

export default function DevAuth() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const DEV_PASSWORD = 'pitwall2025'

  useEffect(() => {
    // Проверяем, есть ли уже доступ
    if (sessionStorage.getItem('dev-access') === 'granted') {
      router.push('/dev/hardware')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === DEV_PASSWORD) {
      sessionStorage.setItem('dev-access', 'granted')
      router.push('/dev/hardware')
    } else {
      setError('Неправильный пароль')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Developer Area
          </h1>
          <p className="text-gray-600">
            Доступ к технической документации
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Войти
          </button>
        </form>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Доступные разделы:
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Cpu className="w-4 h-4 mr-2" />
              Hardware - Железо и протоколы
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Code className="w-4 h-4 mr-2" />
              FullStack - Веб приложение
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              MVP Tech Spec - Техническая спецификация
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 