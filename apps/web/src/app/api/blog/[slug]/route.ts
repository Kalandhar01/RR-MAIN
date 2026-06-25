import { NextResponse } from 'next/server'
import { prisma } from '@/lib/server/db'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const blog = await prisma.blog.findFirst({
      where: { $or: [{ slug }, { _id: slug }] } as Record<string, unknown>,
    })
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (error) {
    console.error('[blog/slug] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await request.json()

    const existing = await prisma.blog.findFirst({
      where: { $or: [{ slug }, { _id: slug }] } as Record<string, unknown>,
    })
    if (!existing) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

    const data: Record<string, unknown> = { ...body, updatedAt: new Date().toISOString() }
    delete data.id
    delete data._id
    if (body.status === 'published' && existing.status !== 'published') {
      data.publishedAt = new Date().toISOString()
    }

    const blog = await prisma.blog.update({
      where: { id: existing.id },
      data,
    })
    return NextResponse.json(blog)
  } catch (error) {
    console.error('[blog/slug] PUT Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const existing = await prisma.blog.findFirst({
      where: { $or: [{ slug }, { _id: slug }] } as Record<string, unknown>,
    })
    if (!existing) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

    await prisma.blog.delete({ where: { id: existing.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[blog/slug] DELETE Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
