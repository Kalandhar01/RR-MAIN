import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  summary: String,
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyCategory" },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyLocation" },
  propertyType: String,
  status: { type: String, default: "available" },
  investmentValue: String,
  priceLabel: String,
  roiIndicator: String,
  appreciation: String,
  ticketSize: String,
  area: String,
  bedrooms: String,
  handover: String,
  coverImage: String,
  heroVideo: String,
  brochureUrl: String,
  floorPlanUrl: String,
  amenities: [String],
  highlights: [String],
  metrics: mongoose.Schema.Types.Mixed,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model("Property", propertySchema);
