import mongoose from "mongoose";

const CATEGORY_TO_DIVISION: Record<string, string> = {
  architecture: "Architecture",
  construction: "Construction",
  "real-estate": "Real Estate",
  otc: "OTC",
  "import-export": "Import Export",
};

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error("MONGODB_URI not set"); process.exit(1); }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const ourworks = mongoose.connection.collection("ourworks");
  const portfolioprojects = mongoose.connection.collection("portfolioprojects");

  const allDocs = await ourworks.find({}).toArray();
  console.log(`Found ${allDocs.length} docs in 'ourworks' collection`);

  let migrated = 0;
  for (const doc of allDocs) {
    const category = doc.category as string | undefined;
    const division = CATEGORY_TO_DIVISION[category || ""];
    if (!division) {
      console.log(`  Skipping '${doc.title}' — no division mapping for category '${category}'`);
      continue;
    }

    const exists = await portfolioprojects.findOne({ slug: doc.slug });
    if (exists) {
      console.log(`  Skipping '${doc.title}' — already exists in portfolioprojects`);
      continue;
    }

    await portfolioprojects.insertOne({
      title: doc.title,
      slug: doc.slug,
      division,
      shortDescription: doc.shortDescription || "",
      description: doc.description || "",
      location: doc.location || "",
      status: doc.status || "Ongoing",
      coverImage: doc.coverImage || "",
      galleryImages: doc.galleryImages || [],
      featured: doc.featured || false,
      published: doc.published ?? true,
      displayOrder: doc.displayOrder || 0,
      createdAt: doc.createdAt || new Date(),
      updatedAt: doc.updatedAt || new Date(),
    });
    console.log(`  Migrated: ${doc.title} → ${division}`);
    migrated++;
  }

  console.log(`\nDone! Migrated ${migrated} projects to portfolioprojects.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
