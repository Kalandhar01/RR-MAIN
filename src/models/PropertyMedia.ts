import mongoose from "mongoose";

const propertyMediaSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  kind: { type: String, default: "image" },
  title: String,
  altText: String,
  url: { type: String, required: true },
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.PropertyMedia || mongoose.model("PropertyMedia", propertyMediaSchema);
