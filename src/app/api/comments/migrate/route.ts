import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { Comment } from '../route'

// POST /api/comments/migrate - мигрировать localStorage комментарии в KV
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageId, comments } = body

    if (!pageId || !Array.isArray(comments)) {
      return NextResponse.json({ 
        error: 'pageId and comments array are required' 
      }, { status: 400 })
    }

    // Валидируем структуру комментариев
    const validComments = comments.filter(comment => 
      comment.id && 
      comment.author && 
      comment.content && 
      comment.category && 
      comment.status && 
      comment.timestamp &&
      comment.page
    )

    if (validComments.length === 0) {
      return NextResponse.json({ 
        message: 'No valid comments to migrate',
        migrated: 0
      })
    }

    // Получаем существующие комментарии на сервере
    const existingComments: Comment[] = await kv.get(`comments:${pageId}`) || []
    
    // Фильтруем дубликаты (по ID)
    const existingIds = new Set(existingComments.map(c => c.id))
    const newComments = validComments.filter(comment => !existingIds.has(comment.id))

    if (newComments.length === 0) {
      return NextResponse.json({ 
        message: 'All comments already exist on server',
        migrated: 0,
        duplicates: validComments.length
      })
    }

    // Объединяем новые комментарии с существующими
    // Сортируем по timestamp (новые сверху)
    const allComments = [...newComments, ...existingComments]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    // Сохраняем в KV
    await kv.set(`comments:${pageId}`, allComments)

    return NextResponse.json({ 
      success: true,
      message: 'Comments migrated successfully',
      migrated: newComments.length,
      total: allComments.length,
      duplicates: validComments.length - newComments.length
    })
  } catch (error) {
    console.error('Error migrating comments:', error)
    return NextResponse.json({ error: 'Failed to migrate comments' }, { status: 500 })
  }
} 