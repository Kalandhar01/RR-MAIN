import { dbConnect } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

let PortfolioProjectModel: mongoose.Model<Record<string, unknown>>;

function getProjectModel() {
  if (!PortfolioProjectModel) {
    const portfolioProjectSchema = new mongoose.Schema({
      title: String,
      slug: { type: String, unique: true },
      category: String,
      description: String,
      location: String,
      status: { type: String, default: "Ongoing" },
      coverImage: String,
      galleryImages: [String],
      order: Number,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });
    PortfolioProjectModel =
      mongoose.models.PortfolioProject || mongoose.model("PortfolioProject", portfolioProjectSchema);
  }
  return PortfolioProjectModel;
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const Model = getProjectModel();

    // Try finding by _id first, then by slug
    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    let project = null;
    if (isObjectId) {
      project = await Model.findById(slug).lean();
    }
    if (!project) {
      project = await Model.findOne({ slug }).lean();
    }
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const Model = getProjectModel();
    const body = await request.json();

    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    let project = null;
    if (isObjectId) {
      project = await Model.findByIdAndUpdate(
        slug,
        { ...body, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
    }
    if (!project) {
      project = await Model.findOneAndUpdate(
        { slug },
        { ...body, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
    }
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const Model = getProjectModel();

    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    let project = null;
    if (isObjectId) {
      project = await Model.findByIdAndDelete(slug).lean();
    }
    if (!project) {
      project = await Model.findOneAndDelete({ slug }).lean();
    }
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
