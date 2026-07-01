import mongoose from "mongoose";

let mongoConnected = false;

export async function connectDatabase(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not set. API will use in-memory fallbacks.");
    return false;
  }
  if (mongoConnected) return true;
  try {
    await mongoose.connect(uri, { autoIndex: true });
    mongoConnected = true;
    console.log("MongoDB connected successfully.");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed. Falling back to memory store.", error);
    return false;
  }
}

export function isMongoConnected(): boolean {
  return mongoConnected && mongoose.connection.readyState === 1;
}
