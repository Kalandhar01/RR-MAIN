import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/server/db'
import mongoose from 'mongoose'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType and entityId are required' }, { status: 400 })
    }

    await dbConnect()

    const modelMap: Record<string, string> = {
      ContactInquiry: 'ContactInquiry',
      CareerApplication: 'CareerApplication',
      Consultation: 'Consultation',
      DemoInquiry: 'DemoInquiry',
      ServiceRequest: 'ServiceRequest',
      Blog: 'Blog',
      PortfolioProject: 'PortfolioProject',
      PortfolioCategory: 'PortfolioCategory',
    }

    const modelName = modelMap[entityType]
    if (!modelName) {
      return NextResponse.json({ error: `Unknown entity type: ${entityType}` }, { status: 400 })
    }

    const Model = mongoose.models[modelName]
    if (!Model) {
      return NextResponse.json({ error: `Model not found: ${modelName}` }, { status: 500 })
    }

    let doc
    if (mongoose.Types.ObjectId.isValid(entityId)) {
      doc = await Model.findById(entityId).lean()
    } else {
      doc = await Model.findOne({ slug: entityId }).lean()
    }

    if (!doc) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...doc,
      id: String((doc as Record<string, unknown>)._id),
    })
  } catch (error) {
    console.error('[entity-detail] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
