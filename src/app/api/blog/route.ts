import { NextResponse } from 'next/server'
import { prisma } from '@/lib/server/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (category) where.category = category
    if (search) {
      where.OR = [
        { title: { $regex: search, $options: 'i' } as unknown },
        { excerpt: { $regex: search, $options: 'i' } as unknown },
      ]
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ])

    return NextResponse.json({
      blogs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[blog] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, category, coverImage, tags, seoTitle, seoDescription, status, featured } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || '',
        content: content || '',
        category: category || '',
        coverImage: coverImage || '',
        tags: tags || [],
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || '',
        status: status || 'draft',
        featured: featured || false,
        publishedAt: status === 'published' ? new Date().toISOString() : null,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('[blog] POST Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
