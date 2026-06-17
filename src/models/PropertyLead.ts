import mongoose from "mongoose";

const propertyLeadSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  interestType: { type: String, default: "consultation" },
  budget: String,
  message: String,
  sourcePage: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.models.PropertyLead || mongoose.model("PropertyLead", propertyLeadSchema);
