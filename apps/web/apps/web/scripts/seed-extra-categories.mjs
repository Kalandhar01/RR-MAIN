import mongoose from "mongoose";
import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/ractysh?retryWrites=true&w=majority&appName=RactyshCluster";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const extraProjects = [
  // Real Estate
  {
    title: "Luxury Villa Estate",
    category: "Real Estate",
    description:
      "A premium villa development featuring modern architecture, private outdoor spaces, and luxury finishes across a gated community with 24/7 security.",
    location: "Dubai, UAE",
    status: "Completed",
    coverImage: "/images/photo-1560518883-ce09059eeffa.webp",
    galleryImages: [
      "/images/photo-1560518883-ce09059eeffa.webp",
      "/images/photo-1494526585095-c41746248156.webp",
      "/images/photo-1486406146926-c627a92ad1ab.webp",
    ],
  },
  {
    title: "Prime Development Plots",
    category: "Real Estate",
    description:
      "Strategically located plotted development with clear titles, infrastructure-ready land, and investment-grade growth potential.",
    location: "Chennai, India",
    status: "Ongoing",
    coverImage: "/visualization/gallery-exterior.webp",
    galleryImages: [
      "/visualization/gallery-exterior.webp",
      "/visualization/presentation-standards.webp",
    ],
  },
  {
    title: "Gated Community Township",
    category: "Real Estate",
    description:
      "Master-planned gated community with residential towers, clubhouse, retail boulevards, and landscaped gardens across 85 acres.",
    location: "Coimbatore, India",
    status: "Completed",
    coverImage: "/visualization/gallery-lobby.webp",
    galleryImages: [
      "/visualization/gallery-lobby.webp",
      "/visualization/gallery-exterior.webp",
    ],
  },
  // Export & Import
  {
    title: "Cross-Border Commodity Trade",
    category: "Export & Import",
    description:
      "Structured trade finance and logistics for agricultural commodities, metals, and energy products across emerging markets in Asia and the Middle East.",
    location: "Singapore",
    status: "Ongoing",
    coverImage: "/services/showcase-import-export.webp",
    galleryImages: [
      "/services/showcase-import-export.webp",
      "/services/global-trade-transport.webp",
    ],
  },
  {
    title: "Global Trade Logistics Hub",
    category: "Export & Import",
    description:
      "Integrated logistics hub facilitating cross-border movement with customs clearance, warehousing, and supply chain finance solutions.",
    location: "Mumbai, India",
    status: "Completed",
    coverImage: "/services/global-trade-transport.webp",
    galleryImages: [
      "/services/global-trade-transport.webp",
      "/services/showcase-import-export.webp",
    ],
  },
  // OTC Exchange
  {
    title: "Private OTC Deal Desk",
    category: "OTC Exchange",
    description:
      "Institutional-grade OTC exchange desk handling block trades, structured settlements, and confidential asset transfers with full regulatory compliance.",
    location: "Doha, Qatar",
    status: "Completed",
    coverImage: "/services/otc-exchange-private-desk.webp",
    galleryImages: [
      "/services/otc-exchange-private-desk.webp",
      "/services/otc-exchange-verification-documents.webp",
    ],
  },
  {
    title: "Multi-Currency Settlement Desk",
    category: "OTC Exchange",
    description:
      "Cross-border OTC settlement desk managing USD, EUR, and AED-denominated private transactions with institutional counterparties and real-time reconciliation.",
    location: "Abu Dhabi, UAE",
    status: "Ongoing",
    coverImage: "/services/otc-exchange-verification-documents.webp",
    galleryImages: [
      "/services/otc-exchange-verification-documents.webp",
      "/services/otc-exchange-private-desk.webp",
    ],
  },
];

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const db = mongoose.connection.db;
  const projectsCollection = db.collection("portfolioprojects");

  let count = 0;
  for (const project of extraProjects) {
    const slug = slugify(project.title);
    const existing = await projectsCollection.findOne({ slug });
    if (existing) {
      console.log(`  Skipped (exists): ${project.title}`);
      continue;
    }
    await projectsCollection.insertOne({
      ...project,
      slug,
      order: Date.now() + count,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    count++;
    console.log(`  Created: ${project.title} [${project.category}]`);
  }

  console.log(`\nDone! ${count} new projects added.`);
  await mongoose.disconnect();
}

main().catch(console.error);
