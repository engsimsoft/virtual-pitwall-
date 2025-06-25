'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X, Bug, CheckSquare, FileText, MessageSquare, Trash2, RefreshCw } from 'lucide-react'

interface DevMessage {
  id: string
  author: string
  message: string
  timestamp: string
  type: 'chat' | 'note' | 'task' | 'bug'
  relatedPage?: string
  priority?: 'low' | 'medium' | 'high'
}

export default function DevChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<DevMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [messageType, setMessageType] = useState<DevMessage['type']>('chat')
  const [priority, setPriority] = useState<DevMessage['priority']>('low')
  const [loading, setLoading] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Загрузка имени разработчика из localStorage
  useEffect(() => {
    const savedAuthor = localStorage.getItem('dev-chat-author')
    if (savedAuthor) {
      setAuthor(savedAuthor)
    }
  }, [])

  // Сохранение имени разработчика
  useEffect(() => {
    if (author) {
      localStorage.setItem('dev-chat-author', author)
    }
  }, [author])

  // Загрузка сообщений
  const loadMessages = async () => {
    try {
      const response = await fetch('/api/dev-chat')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error loading dev chat messages:', error)
    }
  }

  // Автообновление сообщений
  useEffect(() => {
    loadMessages()
    
    if (autoRefresh) {
      const interval = setInterval(loadMessages, 5000) // Обновляем каждые 5 секунд
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Отправка сообщения
  const sendMessage = async () => {
    if (!author.trim() || !newMessage.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/dev-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          message: newMessage.trim(),
          type: messageType,
          priority: priority,
          relatedPage: window.location.pathname.includes('/dev/') ? window.location.pathname : undefined
        })
      })

      if (response.ok) {
        setNewMessage('')
        setMessageType('chat')
        setPriority('low')
        await loadMessages() // Обновляем сообщения
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Ошибка отправки сообщения')
    } finally {
      setLoading(false)
    }
  }

  // Удаление сообщения (только автор)
  const deleteMessage = async (messageId: string, messageAuthor: string) => {
    if (messageAuthor !== author) {
      alert('Можно удалять только свои сообщения')
      return
    }

    if (!confirm('Удалить сообщение?')) return

    try {
      const response = await fetch(`/api/dev-chat?messageId=${messageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadMessages()
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Ошибка удаления сообщения')
    }
  }

  // Иконки для типов сообщений
  const getTypeIcon = (type: DevMessage['type']) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-4 h-4" />
      case 'note': return <FileText className="w-4 h-4" />
      case 'task': return <CheckSquare className="w-4 h-4" />
      case 'bug': return <Bug className="w-4 h-4" />
    }
  }

  // Цвета для типов сообщений
  const getTypeColors = (type: DevMessage['type']) => {
    switch (type) {
      case 'chat': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'note': return 'bg-gray-50 border-gray-200 text-gray-800'
      case 'task': return 'bg-green-50 border-green-200 text-green-800'
      case 'bug': return 'bg-red-50 border-red-200 text-red-800'
    }
  }

  // Цвета для приоритета
  const getPriorityColor = (priority: DevMessage['priority']) => {
    switch (priority) {
      case 'low': return 'text-gray-500'
      case 'medium': return 'text-yellow-500'
      case 'high': return 'text-red-500'
    }
  }

  return (
    <>
      {/* Плавающая кнопка */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
        title="Dev Chat"
      >
        <MessageCircle className="w-6 h-6" />
        {messages.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {messages.length > 99 ? '99+' : messages.length}
          </span>
        )}
      </button>

      {/* Модальное окно чата */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[600px] flex flex-col">
            {/* Заголовок */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Dev Chat - Команда разработчиков
                </h3>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`p-1 rounded ${autoRefresh ? 'text-green-600' : 'text-gray-400'}`}
                  title={autoRefresh ? 'Автообновление включено' : 'Автообновление выключено'}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Пока нет сообщений. Начните обсуждение!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`border rounded-lg p-3 ${getTypeColors(msg.type)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(msg.type)}
                        <span className="font-medium text-sm">{msg.author}</span>
                        {msg.priority && msg.priority !== 'low' && (
                          <span className={`text-xs font-medium ${getPriorityColor(msg.priority)}`}>
                            {msg.priority.toUpperCase()}
                          </span>
                        )}
                        {msg.relatedPage && (
                          <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                            📍 {msg.relatedPage.replace('/dev/', '')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-75">
                          {new Date(msg.timestamp).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {msg.author === author && (
                          <button
                            onClick={() => deleteMessage(msg.id, msg.author)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Удалить сообщение"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Форма отправки */}
            <div className="border-t border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ваше имя..."
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <select
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value as DevMessage['type'])}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="chat">💬 Чат</option>
                    <option value="note">📝 Заметка</option>
                    <option value="task">✅ Задача</option>
                    <option value="bug">🐛 Баг</option>
                  </select>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as DevMessage['priority'])}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">🟢 Низкий</option>
                    <option value="medium">🟡 Средний</option>
                    <option value="high">🔴 Высокий</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  placeholder="Сообщение... (Enter для отправки, Shift+Enter для новой строки)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !author.trim() || !newMessage.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                🔒 Приватный чат только для команды разработчиков
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 