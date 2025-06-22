'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, User, Clock } from 'lucide-react'

interface Comment {
  id: string
  author: string
  content: string
  category: 'ui' | 'functionality' | 'technical'
  status: 'new' | 'in_progress' | 'completed' | 'rejected'
  timestamp: string
  page: string
}

interface CommentSystemProps {
  pageId: string
  pageName: string
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

// Статические CSS классы для категорий
const categoryStyles = {
  ui: {
    active: 'bg-blue-100 text-blue-800',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    badge: 'bg-blue-100 text-blue-800',
    button: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  functionality: {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    badge: 'bg-green-100 text-green-800',
    button: 'bg-green-100 text-green-800 border-green-300'
  },
  technical: {
    active: 'bg-purple-100 text-purple-800',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    badge: 'bg-purple-100 text-purple-800',
    button: 'bg-purple-100 text-purple-800 border-purple-300'
  }
}

// Статические CSS классы для статусов
const statusStyles = {
  new: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

export default function CommentSystem({ pageId, pageName }: CommentSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [userName, setUserName] = useState('')
  const [category, setCategory] = useState<'ui' | 'functionality' | 'technical'>('ui')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments and username from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${pageId}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }

    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserName(savedUserName)
    }
  }, [pageId])

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments_${pageId}`, JSON.stringify(updatedComments))
    setComments(updatedComments)
  }

  // Save username to localStorage
  const saveUserName = (name: string) => {
    localStorage.setItem('userName', name)
    setUserName(name)
  }

  // Add new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !userName.trim()) return

    setIsSubmitting(true)

    const comment: Comment = {
      id: Date.now().toString(),
      author: userName.trim(),
      content: newComment.trim(),
      category,
      status: 'new',
      timestamp: new Date().toISOString(),
      page: pageId
    }

    const updatedComments = [comment, ...comments]
    saveComments(updatedComments)
    saveUserName(userName.trim())
    
    setNewComment('')
    setIsSubmitting(false)
  }

  // Update comment status (for admin/dev use)
  const updateCommentStatus = (commentId: string, newStatus: Comment['status']) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? { ...comment, status: newStatus } : comment
    )
    saveComments(updatedComments)
  }

  // Get new comments count
  const newCommentsCount = comments.filter(c => c.status === 'new').length

  // Filter comments by category
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ui' | 'functionality' | 'technical'>('all')
  const filteredComments = selectedFilter === 'all' 
    ? comments 
    : comments.filter(c => c.category === selectedFilter)

  return (
    <>
      {/* Floating Comment Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-40"
        title="Открыть комментарии"
      >
        <MessageCircle className="w-6 h-6" />
        {newCommentsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {newCommentsCount}
          </span>
        )}
      </button>

      {/* Comment Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="ml-auto w-full max-w-md bg-white h-full shadow-xl flex flex-col relative">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Комментарии</h3>
                  <p className="text-sm text-gray-600">{pageName}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedFilter === 'all' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Все ({comments.length})
                </button>
                {Object.entries(categories).map(([key, cat]) => {
                  const count = comments.filter(c => c.category === key).length
                  const categoryKey = key as keyof typeof categoryStyles
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedFilter(key as 'ui' | 'functionality' | 'technical')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedFilter === key 
                          ? categoryStyles[categoryKey].active
                          : categoryStyles[categoryKey].inactive
                      }`}
                    >
                      {cat.icon} {cat.label} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredComments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Пока нет комментариев</p>
                  <p className="text-sm">Будьте первым!</p>
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {/* Comment Header */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{comment.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">
                          {new Date(comment.timestamp).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-800 text-sm leading-relaxed">{comment.content}</p>

                    {/* Comment Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${categoryStyles[comment.category].badge}`}>
                          <span>{categories[comment.category].icon}</span>
                          {categories[comment.category].label}
                        </span>
                      </div>

                      {/* Status Selector (for admin/dev) */}
                      <select
                        value={comment.status}
                        onChange={(e) => updateCommentStatus(comment.id, e.target.value as Comment['status'])}
                        className={`text-xs border-none rounded-full px-2 py-1 cursor-pointer ${statusStyles[comment.status]}`}
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

            {/* Add Comment Form */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Username Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category Selector */}
                <div className="flex gap-2">
                  {Object.entries(categories).map(([key, cat]) => {
                    const categoryKey = key as keyof typeof categoryStyles
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCategory(key as 'ui' | 'functionality' | 'technical')}
                        className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors border ${
                          category === key
                            ? categoryStyles[categoryKey].button
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="block">{cat.icon}</span>
                        <span className="block">{cat.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Comment Textarea */}
                <div>
                  <textarea
                    placeholder="Ваш комментарий или предложение..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim() || !userName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Отправить комментарий
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 