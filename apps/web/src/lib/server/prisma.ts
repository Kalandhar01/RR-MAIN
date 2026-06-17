import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) return cachedConnection;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment");
  cachedConnection = await mongoose.connect(MONGODB_URI);
  return cachedConnection;
}

export const prisma = {
  async $connect() { return dbConnect(); }
};
