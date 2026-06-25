import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/server/db'
import mongoose from 'mongoose'

function getModel() {
  return mongoose.models.OurWork || mongoose.model('OurWork', new mongoose.Schema({
    title: String, slug: { type: String, unique: true },
    category: { type: String, enum: ['architecture', 'construction', 'real-estate', 'import-export', 'otc'] },
    description: String, location: String,
    status: { type: String, enum: ['Completed', 'Ongoing', 'Upcoming'], default: 'Ongoing' },
    coverImage: String, galleryImages: [String],
    featured: { type: Boolean, default: false }, order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now },
  }))
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect()
    const { slug } = await params
    const Model = getModel()
    const doc = await Model.findOne({
      $or: [{ slug }, ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : [])],
    }).lean()
    if (!doc) return NextResponse.json({ error: 'Work not found' }, { status: 404 })
    return NextResponse.json({ ...doc, id: String((doc as Record<string, unknown>)._id) })
  } catch (error) {
    console.error('[our-works/slug] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect()
    const { slug } = await params
    const body = await request.json()
    const Model = getModel()

    const existing = await Model.findOne({
      $or: [{ slug }, ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : [])],
    })
    if (!existing) return NextResponse.json({ error: 'Work not found' }, { status: 404 })

    const allowed = ['title', 'slug', 'category', 'description', 'location', 'status', 'coverImage', 'galleryImages', 'featured', 'order']
    const data: Record<string, unknown> = { updatedAt: new Date() }
    for (const key of allowed) {
      if (body[key] !== undefined) data[key] = body[key]
    }

    const doc = await Model.findByIdAndUpdate(existing._id, { $set: data }, { new: true }).lean()
    return NextResponse.json({ ...doc, id: String((doc as Record<string, unknown>)._id) })
  } catch (error) {
    console.error('[our-works/slug] PUT Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect()
    const { slug } = await params
    const Model = getModel()

    const existing = await Model.findOne({
      $or: [{ slug }, ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : [])],
    })
    if (!existing) return NextResponse.json({ error: 'Work not found' }, { status: 404 })

    await Model.findByIdAndDelete(existing._id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[our-works/slug] DELETE Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
