import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export interface Comment {
  id: string
  author: string
  content: string
  category: 'ui' | 'functionality' | 'technical'
  status: 'new' | 'in_progress' | 'completed' | 'rejected'
  timestamp: string
  page: string
}

// GET /api/comments?pageId=xxx - получить комментарии для страницы
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    
    if (!pageId) {
      return NextResponse.json({ error: 'pageId is required' }, { status: 400 })
    }

    // Получаем комментарии для конкретной страницы
    const comments: Comment[] = await kv.get(`comments:${pageId}`) || []
    
    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

// POST /api/comments - добавить новый комментарий
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageId, author, content, category } = body

    if (!pageId || !author || !content || !category) {
      return NextResponse.json({ 
        error: 'pageId, author, content, and category are required' 
      }, { status: 400 })
    }

    // Создаем новый комментарий
    const newComment: Comment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      category,
      status: 'new',
      timestamp: new Date().toISOString(),
      page: pageId
    }

    // Получаем существующие комментарии для страницы
    const existingComments: Comment[] = await kv.get(`comments:${pageId}`) || []
    
    // Добавляем новый комментарий в начало списка
    const updatedComments = [newComment, ...existingComments]
    
    // Сохраняем обновленный список
    await kv.set(`comments:${pageId}`, updatedComments)

    return NextResponse.json({ comment: newComment, success: true })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
} 