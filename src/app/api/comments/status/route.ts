import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { Comment } from '../route'

// PUT /api/comments/status - обновить статус комментария
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageId, commentId, status } = body

    if (!pageId || !commentId || !status) {
      return NextResponse.json({ 
        error: 'pageId, commentId, and status are required' 
      }, { status: 400 })
    }

    // Проверяем валидность статуса
    const validStatuses = ['new', 'in_progress', 'completed', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      }, { status: 400 })
    }

    // Получаем существующие комментарии для страницы
    const existingComments: Comment[] = await kv.get(`comments:${pageId}`) || []
    
    // Находим и обновляем комментарий
    const updatedComments = existingComments.map(comment =>
      comment.id === commentId ? { ...comment, status } : comment
    )

    // Проверяем, что комментарий был найден
    const commentFound = updatedComments.some(comment => 
      comment.id === commentId && comment.status === status
    )

    if (!commentFound) {
      return NextResponse.json({ 
        error: 'Comment not found' 
      }, { status: 404 })
    }
    
    // Сохраняем обновленный список
    await kv.set(`comments:${pageId}`, updatedComments)

    return NextResponse.json({ success: true, message: 'Comment status updated' })
  } catch (error) {
    console.error('Error updating comment status:', error)
    return NextResponse.json({ error: 'Failed to update comment status' }, { status: 500 })
  }
} 