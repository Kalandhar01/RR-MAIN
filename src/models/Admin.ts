import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  imageUrl: String,
  active: { type: Boolean, default: true },
  lastLoginAt: Date,
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
