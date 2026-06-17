import mongoose from "mongoose";

const propertyCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: String,
  position: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.PropertyCategory || mongoose.model("PropertyCategory", propertyCategorySchema);
