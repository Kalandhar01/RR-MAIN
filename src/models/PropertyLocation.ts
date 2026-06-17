import mongoose from "mongoose";

const propertyLocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  slug: { type: String, unique: true },
  microMarket: String,
  address: String,
  latitude: Number,
  longitude: Number,
  landmarks: [String],
  connectivity: mongoose.Schema.Types.Mixed,
  active: { type: Boolean, default: true },
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.PropertyLocation || mongoose.model("PropertyLocation", propertyLocationSchema);
