import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  division: String,
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: String,
  companyName: String,
  rating: Number,
  approved: { type: Boolean, default: false },
  source: String,
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
