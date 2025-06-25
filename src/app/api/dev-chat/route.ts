import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export interface DevMessage {
  id: string
  author: string
  message: string
  timestamp: string
  type: 'chat' | 'note' | 'task' | 'bug'
  relatedPage?: string
  priority?: 'low' | 'medium' | 'high'
}

// GET /api/dev-chat - получить все сообщения чата
export async function GET() {
  try {
    // Получаем все сообщения dev-чата
    const messages: DevMessage[] = await kv.get('dev-chat:messages') || []
    
    // Сортируем по времени (новые снизу для чата)
    const sortedMessages = messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    
    return NextResponse.json({ messages: sortedMessages })
  } catch (error) {
    console.error('Error fetching dev chat messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// POST /api/dev-chat - добавить новое сообщение
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { author, message, type = 'chat', relatedPage, priority = 'low' } = body

    if (!author || !message) {
      return NextResponse.json({ 
        error: 'author and message are required' 
      }, { status: 400 })
    }

    // Создаем новое сообщение
    const newMessage: DevMessage = {
      id: Date.now().toString(),
      author: author.trim(),
      message: message.trim(),
      type,
      relatedPage,
      priority,
      timestamp: new Date().toISOString()
    }

    // Получаем существующие сообщения
    const existingMessages: DevMessage[] = await kv.get('dev-chat:messages') || []
    
    // Добавляем новое сообщение
    const updatedMessages = [...existingMessages, newMessage]
    
    // Ограничиваем количество сообщений (последние 200)
    const trimmedMessages = updatedMessages.slice(-200)
    
    // Сохраняем обновленный список
    await kv.set('dev-chat:messages', trimmedMessages)

    console.log(`Dev chat message created: ${newMessage.id} by ${author}`)

    return NextResponse.json({ message: newMessage, success: true })
  } catch (error) {
    console.error('Error creating dev chat message:', error)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}

// DELETE /api/dev-chat?messageId=xxx - удалить сообщение (для модерации)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('messageId')
    
    if (!messageId) {
      return NextResponse.json({ 
        error: 'messageId is required' 
      }, { status: 400 })
    }

    // Получаем существующие сообщения
    const messages: DevMessage[] = await kv.get('dev-chat:messages') || []
    
    // Находим сообщение для удаления
    const messageIndex = messages.findIndex(m => m.id === messageId)
    if (messageIndex === -1) {
      return NextResponse.json({ 
        error: 'Message not found' 
      }, { status: 404 })
    }

    // Удаляем сообщение
    const deletedMessage = messages[messageIndex]
    messages.splice(messageIndex, 1)
    
    // Сохраняем обновленный список
    await kv.set('dev-chat:messages', messages)
    
    console.log(`Dev chat message deleted: ${messageId}`)
    
    return NextResponse.json({ 
      success: true, 
      deletedMessage,
      remainingCount: messages.length 
    })
  } catch (error) {
    console.error('Error deleting dev chat message:', error)
    return NextResponse.json({ 
      error: 'Failed to delete message' 
    }, { status: 500 })
  }
} 