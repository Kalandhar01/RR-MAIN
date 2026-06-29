const mongoose = require("mongoose");

const CATEGORY_TO_DIVISION = {
  architecture: "Architecture",
  construction: "Construction",
  "real-estate": "Real Estate",
  otc: "OTC",
  "import-export": "Import Export",
};

const BASE_URI = "mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net";

async function migrate() {
  const sourceConn = await mongoose.createConnection(`${BASE_URI}/ractysh?retryWrites=true&w=majority&appName=RactyshCluster`).asPromise();
  console.log("Connected to ractysh db");

  const destConn = await mongoose.createConnection(`${BASE_URI}/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster`).asPromise();
  console.log("Connected to Ractysh-Main db");

  const sourceDb = sourceConn.db;
  const destDb = destConn.db;

  const ourworks = sourceDb.collection("ourworks");
  const portfolioprojects = destDb.collection("portfolioprojects");

  const allDocs = await ourworks.find({}).toArray();
  console.log(`Found ${allDocs.length} docs in 'ourworks' (ractysh db)`);

  let migrated = 0;
  for (const doc of allDocs) {
    const category = doc.category;
    const division = CATEGORY_TO_DIVISION[category || ""];
    if (!division) {
      console.log(`  Skip '${doc.title}' — category '${category}' has no mapping`);
      continue;
    }

    const exists = await portfolioprojects.findOne({ slug: doc.slug });
    if (exists) {
      console.log(`  Skip '${doc.title}' — already in portfolioprojects`);
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

  console.log(`\nDone! Migrated ${migrated} projects.`);
  await sourceConn.close();
  await destConn.close();
  process.exit(0);
}

migrate().catch((err) => { console.error("Failed:", err); process.exit(1); });
