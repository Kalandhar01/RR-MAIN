import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function connectDatabase(): Promise<boolean> {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not set.");
    return false;
  }

  try {
    if (mongoose.connection.readyState === 1) return true;
    await mongoose.connect(MONGODB_URI);
    return true;
  } catch (error) {
    console.error("MongoDB connection failed.", error);
    return false;
  }
}

export const prisma = { $connect: connectDatabase };
