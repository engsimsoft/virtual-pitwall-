'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Filter, FileText, User, Clock, Download } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface Comment {
  id: string
  author: string
  content: string
  category: 'ui' | 'functionality' | 'technical'
  status: 'new' | 'in_progress' | 'completed' | 'rejected'
  timestamp: string
  page: string
}

interface PageInfo {
  id: string
  name: string
  url: string
}

const categories = {
  ui: { label: 'UI/UX', icon: '🎨', color: 'blue' },
  functionality: { label: 'Функционал', icon: '⚙️', color: 'green' },
  technical: { label: 'Техническое', icon: '🔧', color: 'purple' }
}

const statuses = {
  new: { label: 'Новый', icon: '🆕', color: 'gray' },
  in_progress: { label: 'В работе', icon: '⏳', color: 'yellow' },
  completed: { label: 'Выполнено', icon: '✅', color: 'green' },
  rejected: { label: 'Отклонено', icon: '❌', color: 'red' }
}

// Статические CSS классы
const categoryStyles = {
  ui: 'bg-blue-100 text-blue-800',
  functionality: 'bg-green-100 text-green-800',
  technical: 'bg-purple-100 text-purple-800'
}

const statusStyles = {
  new: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

// Информация о страницах
const pageInfos: PageInfo[] = [
  { id: 'about', name: 'О проекте', url: '/about' },
  { id: 'home', name: 'Virtual Pitwall', url: '/' },
  { id: 'features', name: 'Features', url: '/features' },
  { id: 'tracks', name: 'Track Management', url: '/tracks' },
  { id: 'mvp_tech_spec', name: 'MVP Tech Spec', url: '/mvp_tech_spec' },
  { id: 'rental-management', name: 'Fleet Control', url: '/rental-management' },
  { id: 'shortcut', name: 'DK Racing', url: '/shortcut' },
  { id: 'demo', name: 'Team Demo', url: '/shortcut/demo' },
  { id: 'dk', name: 'DK Demo', url: '/shortcut/dk' }
]

export default function CommentsPage() {
  const [allComments, setAllComments] = useState<Comment[]>([])
  const [filteredComments, setFilteredComments] = useState<Comment[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Загрузка всех комментариев со всех страниц
  useEffect(() => {
    const loadAllComments = async () => {
      const comments: Comment[] = []
      
      try {
        // Загружаем комментарии с сервера для каждой страницы
        const loadPromises = pageInfos.map(async (pageInfo) => {
          try {
            const response = await fetch(`/api/comments?pageId=${pageInfo.id}`)
            if (response.ok) {
              const data = await response.json()
              return data.comments || []
            }
          } catch (error) {
            console.log(`Ошибка загрузки комментариев для ${pageInfo.id}:`, error)
            
            // Fallback к localStorage
            const savedComments = localStorage.getItem(`comments_${pageInfo.id}`)
            if (savedComments) {
              try {
                return JSON.parse(savedComments)
              } catch {
                return []
              }
            }
          }
          return []
        })

        const pageCommentsArrays = await Promise.all(loadPromises)
        pageCommentsArrays.forEach(pageComments => {
          comments.push(...pageComments)
        })

        // Сортировка по времени (новые сверху)
        comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        
        setAllComments(comments)
      } catch (error) {
        console.error('Ошибка загрузки комментариев:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAllComments()
  }, [])

  // Фильтрация комментариев
  useEffect(() => {
    let filtered = [...allComments]

    if (selectedPage !== 'all') {
      filtered = filtered.filter(comment => comment.page === selectedPage)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(comment => comment.category === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(comment => comment.status === selectedStatus)
    }

    setFilteredComments(filtered)
  }, [allComments, selectedPage, selectedCategory, selectedStatus])

  // Обновление статуса комментария
  const updateCommentStatus = async (commentId: string, newStatus: Comment['status']) => {
    const comment = allComments.find(c => c.id === commentId)
    if (!comment) return

    try {
      // Обновляем на сервере
      const response = await fetch('/api/comments/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: comment.page,
          commentId,
          status: newStatus
        })
      })

      if (response.ok) {
        // Обновляем локальное состояние
        const updatedAllComments = allComments.map(c =>
          c.id === commentId ? { ...c, status: newStatus } : c
        )
        setAllComments(updatedAllComments)
      } else {
        throw new Error('Failed to update comment status')
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error)
      
      // Fallback к localStorage
      const savedComments = localStorage.getItem(`comments_${comment.page}`)
      if (savedComments) {
        try {
          const pageComments = JSON.parse(savedComments)
          const updatedPageComments = pageComments.map((c: Comment) =>
            c.id === commentId ? { ...c, status: newStatus } : c
          )
          localStorage.setItem(`comments_${comment.page}`, JSON.stringify(updatedPageComments))

          // Обновляем локальное состояние
          const updatedAllComments = allComments.map(c =>
            c.id === commentId ? { ...c, status: newStatus } : c
          )
          setAllComments(updatedAllComments)
        } catch (error) {
          console.log('Ошибка обновления статуса:', error)
        }
      }
    }
  }

  // Экспорт комментариев
  const exportComments = () => {
    const data = {
      exported_at: new Date().toISOString(),
      total_comments: allComments.length,
      comments: allComments
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `comments-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Статистика
  const stats = {
    total: allComments.length,
    new: allComments.filter(c => c.status === 'new').length,
    inProgress: allComments.filter(c => c.status === 'in_progress').length,
    completed: allComments.filter(c => c.status === 'completed').length,
    today: allComments.filter(c => {
      const today = new Date().toDateString()
      return new Date(c.timestamp).toDateString() === today
    }).length
  }

  // Группировка по страницам
  const commentsByPage = pageInfos.map(pageInfo => ({
    ...pageInfo,
    comments: allComments.filter(c => c.page === pageInfo.id),
    newCount: allComments.filter(c => c.page === pageInfo.id && c.status === 'new').length
  })).filter(page => page.comments.length > 0)

  const getPageName = (pageId: string) => {
    const pageInfo = pageInfos.find(p => p.id === pageId)
    return pageInfo ? pageInfo.name : pageId
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка комментариев...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                Центр комментариев
              </h1>
              <p className="text-gray-600 mt-2">
                Все комментарии и предложения по проекту в одном месте
              </p>
            </div>
            
            <button
              onClick={exportComments}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Экспорт
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700">Всего</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{stats.new}</div>
              <div className="text-sm text-gray-700">Новые</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-sm text-yellow-700">В работе</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-green-700">Выполнено</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.today}</div>
              <div className="text-sm text-purple-700">Сегодня</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Page List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Страницы проекта
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPage('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedPage === 'all' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Все страницы</span>
                    <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                      {allComments.length}
                    </span>
                  </div>
                </button>

                {commentsByPage.map(page => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPage === page.id 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{page.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                          {page.comments.length}
                        </span>
                        {page.newCount > 0 && (
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                            {page.newCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">Фильтры:</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Все категории</option>
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Все статусы</option>
                    {Object.entries(statuses).map(([key, status]) => (
                      <option key={key} value={key}>
                        {status.icon} {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Комментариев не найдено</h3>
                  <p className="text-gray-600">
                    {allComments.length === 0 
                      ? 'Пока нет ни одного комментария. Оставьте первый!' 
                      : 'Попробуйте изменить фильтры для поиска комментариев'
                    }
                  </p>
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    {/* Comment Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{comment.author}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FileText className="w-3 h-3" />
                          <span>{getPageName(comment.page)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(comment.timestamp).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-800 mb-4 leading-relaxed">{comment.content}</p>

                    {/* Comment Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${categoryStyles[comment.category]}`}>
                          <span>{categories[comment.category].icon}</span>
                          {categories[comment.category].label}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={comment.status}
                        onChange={(e) => updateCommentStatus(comment.id, e.target.value as Comment['status'])}
                        className={`text-xs border-none rounded-full px-3 py-1 cursor-pointer ${statusStyles[comment.status]}`}
                      >
                        {Object.entries(statuses).map(([key, status]) => (
                          <option key={key} value={key}>
                            {status.icon} {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 