import mongoose from "mongoose";

const newsletterSubscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  division: { type: String, default: "real-estate" },
}, { timestamps: true });

export default mongoose.models.NewsletterSubscriber || mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
