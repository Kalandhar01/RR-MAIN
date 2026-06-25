import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/server/db'
import mongoose from 'mongoose'

const ourWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['architecture', 'construction', 'real-estate', 'import-export', 'otc'] },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  status: { type: String, enum: ['Completed', 'Ongoing', 'Upcoming'], default: 'Ongoing' },
  coverImage: { type: String, default: '' },
  galleryImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})
ourWorkSchema.index({ category: 1, order: 1 })
ourWorkSchema.index({ featured: 1 })
ourWorkSchema.index({ slug: 1 }, { unique: true })

function getModel() {
  return mongoose.models.OurWork || mongoose.model('OurWork', ourWorkSchema)
}

export async function GET(request: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const filter: Record<string, unknown> = {}
    if (category) filter.category = category
    if (status) filter.status = status
    if (featured === 'true') filter.featured = true
    if (search) filter.title = { $regex: search, $options: 'i' }

    const Model = getModel()
    const [docs, total] = await Promise.all([
      Model.find(filter).sort({ order: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Model.countDocuments(filter),
    ])

    return NextResponse.json({
      works: docs.map((d: Record<string, unknown>) => ({ ...d, id: String(d._id) })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[our-works] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { title, slug, category, description, location, status, coverImage, galleryImages, featured } = body

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug, and category are required' }, { status: 400 })
    }

    const validCategories = ['architecture', 'construction', 'real-estate', 'import-export', 'otc']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` }, { status: 400 })
    }

    const Model = getModel()
    const existing = await Model.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'A work with this slug already exists' }, { status: 409 })
    }

    const doc = await Model.create({
      title, slug, category,
      description: description || '',
      location: location || '',
      status: status || 'Ongoing',
      coverImage: coverImage || '',
      galleryImages: galleryImages || [],
      featured: featured || false,
    })

    return NextResponse.json({ ...doc.toObject(), id: String(doc._id) }, { status: 201 })
  } catch (error) {
    console.error('[our-works] POST Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
