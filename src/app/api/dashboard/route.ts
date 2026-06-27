import { NextResponse } from 'next/server'
import { prisma } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await prisma.$connect()

    const [
      totalLeads,
      newLeads,
      totalProjects,
      totalBlogs,
      publishedBlogs,
      totalApplications,
      recentLeads,
      recentBlogs,
    ] = await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: 'new' } }),
      prisma.portfolioProject.count(),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: 'published' } }),
      prisma.careerApplication.count(),
      prisma.contactInquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.blog.findMany({ orderBy: { createdAt: 'desc' }, take: 5, where: { status: 'published' } }),
    ])

    return NextResponse.json({
      metrics: {
        totalLeads,
        newLeads,
        totalProjects,
        totalBlogs,
        publishedBlogs,
        totalApplications,
      },
      recentActivity: {
        leads: recentLeads.map((l: Record<string, unknown>) => ({
          id: l.id,
          name: l.name,
          email: l.email,
          status: l.status,
          createdAt: l.createdAt,
        })),
        blogs: recentBlogs.map((b: Record<string, unknown>) => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          status: b.status,
          createdAt: b.createdAt,
        })),
      },
    })
  } catch (error) {
    console.error('[dashboard] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
