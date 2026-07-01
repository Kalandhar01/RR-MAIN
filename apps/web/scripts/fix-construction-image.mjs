import mongoose from "mongoose";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const MONGO_URI = "mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster";
const CLOUD_NAME = "dgqbgdk73";
const API_KEY = "526178431419324";
const API_SECRET = "LFmUSdSOFQ1Yb4STdAAcBqvj8Lk";

function signature(params, secret) {
  const serialized = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(`${serialized}${secret}`).digest("hex");
}

async function uploadToCloudinary(filePath) {
  const fileBuffer = await readFile(filePath);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const folder = "ractysh-our-works";
  const publicId = `construction-cc-${Date.now()}`;

  // SEND public_id WITHOUT folder prefix, and folder separately
  const params = { public_id: publicId, folder, resource_type: "image", quality: "auto:best", fetch_format: "auto", timestamp };
  const sig = signature(params, API_SECRET);

  const formData = new FormData();
  formData.append("file", new Blob([new Uint8Array(fileBuffer)]), path.basename(filePath));
  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
  formData.append("api_key", API_KEY);
  formData.append("signature", sig);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`);
  return data.secure_url;
}

async function run() {
  const filePath = "/home/kdx/Downloads/v4/Ractysh-v2-2/apps/admin/public/uploads/ractysh-admin/our-works/1782537039236-School-1---1-2---Photo.jpg";
  
  console.log("Uploading to Cloudinary...");
  const url = await uploadToCloudinary(filePath);
  console.log("Cloudinary URL:", url);

  const conn = await mongoose.createConnection(MONGO_URI).asPromise();
  const r = await conn.db.collection("portfolioprojects").updateOne(
    { title: "CCD" },
    { $set: { coverImage: url } }
  );
  console.log("DB updated:", r.modifiedCount, "document(s)");
  await conn.close();
  console.log("Done!");
}

run().catch(e => { console.error("Failed:", e); process.exit(1); });
