import { NextResponse } from 'next/server'
import { prisma } from '@/lib/server/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (search) {
      where.OR = [
        { fullName: { $regex: search, $options: 'i' } as unknown },
        { email: { $regex: search, $options: 'i' } as unknown },
        { position: { $regex: search, $options: 'i' } as unknown },
      ]
    }

    const [applications, total] = await Promise.all([
      prisma.careerApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.careerApplication.count({ where }),
    ])

    return NextResponse.json({ applications, total, page, limit })
  } catch (error) {
    console.error('[admin/careers] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const body = await request.json()
    await prisma.careerApplication.update({ where: { id }, data: body })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/careers] PATCH Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    await prisma.careerApplication.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/careers] DELETE Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
