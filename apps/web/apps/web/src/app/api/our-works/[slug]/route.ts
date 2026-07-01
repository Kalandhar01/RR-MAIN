import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

const PORTFOLIO_DB_URI = (process.env.MONGODB_URI || "").replace("/ractysh?", "/Ractysh-Main?");

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  division: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  status: { type: String, enum: ['Completed', 'Ongoing', 'Upcoming'], default: 'Ongoing' },
  coverImage: { type: String, default: '' },
  galleryImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'portfolioprojects' });

let portfolioConnection: mongoose.Connection | null = null;

async function getPortfolioModel() {
  if (!portfolioConnection) {
    portfolioConnection = await mongoose.createConnection(PORTFOLIO_DB_URI).asPromise();
  }
  const modelName = 'PortfolioWork';
  return portfolioConnection.models[modelName] || portfolioConnection.model(modelName, portfolioSchema);
}

const DIVISION_TO_CATEGORY: Record<string, string> = {
  Architecture: 'architecture',
  Construction: 'construction',
  'Real Estate': 'real-estate',
  'Import Export': 'import-export',
  OTC: 'otc',
};

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const Model = await getPortfolioModel()
    const doc = await Model.findOne({
      $or: [{ slug }, ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : [])],
    }).lean()
    if (!doc) return NextResponse.json({ error: 'Work not found' }, { status: 404 })
    const mongoDoc = doc as Record<string, unknown> & { division?: string }
    return NextResponse.json({
      ...mongoDoc,
      id: String(mongoDoc._id),
      category: DIVISION_TO_CATEGORY[mongoDoc.division as string] || (mongoDoc.division as string) || '',
    })
  } catch (error) {
    console.error('[our-works/slug] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const Model = await getPortfolioModel()

    const existing = await Model.findOne({
      $or: [{ slug }, ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : [])],
    })
    if (!existing) return NextResponse.json({ error: 'Work not found' }, { status: 404 })

    const allowed = ['title', 'slug', 'shortDescription', 'description', 'location', 'status', 'coverImage', 'galleryImages', 'featured', 'displayOrder']
    const data: Record<string, unknown> = { updatedAt: new Date() }
    for (const key of allowed) {
      if (body[key] !== undefined) data[key] = body[key]
    }
    if (body.category) {
      const catToDiv: Record<string, string> = { architecture: 'Architecture', construction: 'Construction', 'real-estate': 'Real Estate', 'import-export': 'Import Export', otc: 'OTC' }
      data.division = catToDiv[body.category as string] || body.category
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
    const { slug } = await params
    const Model = await getPortfolioModel()

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
