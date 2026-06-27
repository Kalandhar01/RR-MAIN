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

const CATEGORY_TO_DIVISION: Record<string, string> = {
  architecture: 'Architecture',
  construction: 'Construction',
  'real-estate': 'Real Estate',
  'import-export': 'Import Export',
  otc: 'OTC',
};

const DIVISION_TO_CATEGORY: Record<string, string> = {
  Architecture: 'architecture',
  Construction: 'construction',
  'Real Estate': 'real-estate',
  'Import Export': 'import-export',
  OTC: 'otc',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const division = category ? CATEGORY_TO_DIVISION[category] : '';

    const filter: Record<string, unknown> = {}
    if (division) filter.division = division
    if (status) filter.status = status
    if (featured === 'true') filter.featured = true
    if (search) filter.title = { $regex: search, $options: 'i' }

    const Model = await getPortfolioModel()
    const [docs, total] = await Promise.all([
      Model.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Model.countDocuments(filter),
    ])

    const works = docs.map((d: Record<string, unknown>) => {
      const mongoDoc = d as Record<string, unknown> & { division?: string };
      return {
        id: String(mongoDoc._id),
        _id: String(mongoDoc._id),
        title: mongoDoc.title,
        slug: mongoDoc.slug,
        category: DIVISION_TO_CATEGORY[mongoDoc.division as string] || (mongoDoc.division as string) || '',
        shortDescription: mongoDoc.shortDescription || '',
        description: mongoDoc.description || '',
        location: mongoDoc.location || '',
        status: mongoDoc.status || 'Ongoing',
        coverImage: mongoDoc.coverImage || '',
        galleryImages: (mongoDoc.galleryImages as string[]) || [],
        featured: !!mongoDoc.featured,
      };
    });

    return NextResponse.json({
      works,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[our-works] GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, category, shortDescription, description, location, status, coverImage, galleryImages, featured, displayOrder, seoTitle, seoDescription } = body

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug, and category are required' }, { status: 400 })
    }

    const validCategories = ['architecture', 'construction', 'real-estate', 'import-export', 'otc']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` }, { status: 400 })
    }

    const division = CATEGORY_TO_DIVISION[category] || category;
    const Model = await getPortfolioModel()
    const existing = await Model.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'A work with this slug already exists' }, { status: 409 })
    }

    const doc = await Model.create({
      title, slug, division,
      category: division,
      shortDescription: shortDescription || '',
      description: description || '',
      location: location || '',
      status: status || 'Ongoing',
      coverImage: coverImage || '',
      galleryImages: galleryImages || [],
      featured: featured || false,
      displayOrder: displayOrder || 0,
    })

    return NextResponse.json({ ...doc.toObject(), id: String(doc._id) }, { status: 201 })
  } catch (error) {
    console.error('[our-works] POST Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
