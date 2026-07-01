import mongoose from "mongoose";
import { createHash } from "node:crypto";
import { readFile, access } from "node:fs/promises";
import path from "node:path";

const MONGO_URI = "mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster";
const CLOUD_NAME = "dgqbgdk73";
const API_KEY = "526178431419324";
const API_SECRET = "LFmUSdSOFQ1Yb4STdAAcBqvj8Lk";
const ADMIN_PUBLIC = "/home/kdx/Downloads/v4/Ractysh-v2-2/apps/admin/public";

function signature(params, secret) {
  const serialized = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(`${serialized}${secret}`).digest("hex");
}

async function uploadToCloudinary(filePath, projectTitle) {
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  const resourceType = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff"].includes(ext) ? "image" : "auto";
  const base = path.basename(filePath).replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 60);
  const folder = "ractysh-our-works";
  const publicId = `${folder}/${base}-${Date.now()}`;

  const fileBuffer = await readFile(filePath);
  const timestamp = String(Math.floor(Date.now() / 1000));

  const params = { folder, public_id: publicId, resource_type: resourceType, quality: "auto:best", fetch_format: "auto", timestamp };
  const sig = signature(params, API_SECRET);

  const formData = new FormData();
  formData.append("file", new Blob([new Uint8Array(fileBuffer)]), path.basename(filePath));
  formData.append("folder", folder);
  formData.append("public_id", publicId);
  formData.append("resource_type", resourceType);
  formData.append("quality", "auto:best");
  formData.append("fetch_format", "auto");
  formData.append("timestamp", timestamp);
  formData.append("api_key", API_KEY);
  formData.append("signature", sig);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
      method: "POST", body: formData, signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`);
    if (!data.secure_url) throw new Error("No secure_url returned");
    return data.secure_url;
  } finally {
    clearTimeout(timeout);
  }
}

async function run() {
  console.log("Connecting to MongoDB...");
  const conn = await mongoose.createConnection(MONGO_URI).asPromise();
  const collection = conn.db.collection("portfolioprojects");
  const docs = await collection.find({}).toArray();
  console.log(`Found ${docs.length} projects\n`);

  let uploaded = 0, skipped = 0, failed = 0;

  for (const doc of docs) {
    const imagesToUpload = [];

    if (doc.coverImage && !doc.coverImage.startsWith("http")) {
      imagesToUpload.push({ field: "coverImage", url: doc.coverImage });
    }
    if (doc.galleryImages?.length) {
      for (const gUrl of doc.galleryImages) {
        if (!gUrl.startsWith("http")) {
          imagesToUpload.push({ field: "galleryImages", url: gUrl });
        }
      }
    }

    if (imagesToUpload.length === 0) {
      console.log(`  ⏭️  ${doc.title} — already Cloudinary`);
      skipped++;
      continue;
    }

    const updateData = {};
    let hasChanges = false;

    for (const item of imagesToUpload) {
      const filePath = path.join(ADMIN_PUBLIC, item.url);
      try {
        await access(filePath);
      } catch {
        console.log(`  ❌ ${doc.title} — file not found: ${item.url}`);
        failed++;
        continue;
      }

      try {
        console.log(`  📤 ${doc.title} — uploading ${path.basename(item.url)}...`);
        const cloudinaryUrl = await uploadToCloudinary(filePath, doc.title);
        console.log(`     ✅ ${cloudinaryUrl.substring(0, 70)}...`);

        if (item.field === "coverImage") {
          updateData.coverImage = cloudinaryUrl;
        } else if (item.field === "galleryImages") {
          if (!updateData.galleryImages) {
            updateData.galleryImages = [...(doc.galleryImages || [])];
          }
          const idx = updateData.galleryImages.indexOf(item.url);
          if (idx !== -1) updateData.galleryImages[idx] = cloudinaryUrl;
        }
        hasChanges = true;
      } catch (err) {
        console.log(`     ❌ Failed: ${err.message}`);
        failed++;
      }
    }

    if (hasChanges) {
      await collection.updateOne({ _id: doc._id }, { $set: updateData });
      console.log(`     ✅ DB updated for ${doc.title}`);
      uploaded++;
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`Uploaded & updated: ${uploaded}`);
  console.log(`Skipped (already Cloudinary): ${skipped}`);
  console.log(`Failed: ${failed}`);

  await conn.close();
}

run().catch(err => { console.error("Fatal:", err); process.exit(1); });
