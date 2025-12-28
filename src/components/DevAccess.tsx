'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface DevAccessProps {
  children: React.ReactNode
}

export default function DevAccess({ children }: DevAccessProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAccess = () => {
      const access = sessionStorage.getItem('dev-access')
      if (access === 'granted') {
        setHasAccess(true)
      } else {
        router.push('/dev')
      }
      setLoading(false)
    }

    checkAccess()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Проверка доступа...</div>
      </div>
    )
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
} 