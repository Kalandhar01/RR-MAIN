import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  dedupeKey: { type: String, unique: true, sparse: true },
  title: { type: String, required: true },
  message: String,
  project: String,
  division: String,
  priority: { type: String, default: "medium" },
  status: { type: String, default: "unread" },
  entity: String,
  entityId: String,
  actionUrl: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
