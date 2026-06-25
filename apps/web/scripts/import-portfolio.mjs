import mongoose from "mongoose";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ractysh";
const ASSETS_DIR = "/home/kdx/Documents/To Website";
const PUBLIC_UPLOAD_DIR = join(__dirname, "..", "public", "uploads", "portfolio");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".avi", ".mkv", ".webm"]);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function isImageFile(filename) {
  return IMAGE_EXTS.has(extname(filename).toLowerCase());
}

function isVideoFile(filename) {
  return VIDEO_EXTS.has(extname(filename).toLowerCase());
}

function getImageFiles(dirPath) {
  try {
    return readdirSync(dirPath).filter((f) => {
      const fullPath = join(dirPath, f);
      return statSync(fullPath).isFile() && isImageFile(f);
    });
  } catch {
    return [];
  }
}

async function copyImages(sourceDir, projectSlug, title) {
  const imageFiles = getImageFiles(sourceDir);
  const destDir = join(PUBLIC_UPLOAD_DIR, projectSlug);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  const urls = [];
  for (const file of imageFiles) {
    const src = join(sourceDir, file);
    const dest = join(destDir, file);
    copyFileSync(src, dest);
    urls.push(`/uploads/portfolio/${projectSlug}/${file}`);
  }
  return urls;
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const db = mongoose.connection.db;
  const projectsCollection = db.collection("portfolioprojects");
  const categoriesCollection = db.collection("portfoliocategories");

  // Clear existing data
  await projectsCollection.deleteMany({});
  await categoriesCollection.deleteMany({});
  console.log("Cleared existing portfolio data.");

  // Create categories
  const categories = [
    { name: "Architecture Works", slug: "architecture-works", description: "Architecture design and interior projects", order: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: "Construction Works", slug: "construction-works", description: "Construction and development projects", order: 2, createdAt: new Date(), updatedAt: new Date() },
  ];
  await categoriesCollection.insertMany(categories);
  console.log("Created categories.");

  // Read asset folders
  const topFolders = readdirSync(ASSETS_DIR).filter((f) => {
    const fullPath = join(ASSETS_DIR, f);
    return statSync(fullPath).isDirectory();
  });

  let totalProjects = 0;

  for (const folder of topFolders) {
    const folderPath = join(ASSETS_DIR, folder);

    if (folder === "ARCHI") {
      // Architecture Works - subfolders of Home/
      const homePath = join(folderPath, "Home");
      if (!existsSync(homePath)) continue;

      const subFolders = readdirSync(homePath).filter((f) => {
        const fullPath = join(homePath, f);
        return statSync(fullPath).isDirectory();
      });

      for (const sub of subFolders) {
        const projectDir = join(homePath, sub);
        const title = `Home ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
        const slug = slugify(title);
        const images = await copyImages(projectDir, slug, title);
        if (images.length === 0) continue;

        const project = {
          title,
          slug,
          category: "Architecture Works",
          description: `${title} project showcasing premium architectural design and execution.`,
          location: "",
          status: "Completed",
          coverImage: images[0],
          galleryImages: images,
          order: totalProjects,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await projectsCollection.insertOne(project);
        totalProjects++;
        console.log(`  Imported: ${title} (${images.length} images)`);
      }
    } else {
      // Construction Works
      // Check if folder has image files directly
      const imageFiles = getImageFiles(folderPath);
      const subFolders = readdirSync(folderPath).filter((f) => {
        const fullPath = join(folderPath, f);
        return statSync(fullPath).isDirectory();
      });

      if (imageFiles.length > 0) {
        // Project name = folder name, images at folder root
        const title = folder;
        const slug = slugify(title);
        const images = await copyImages(folderPath, slug, title);
        if (images.length > 0) {
          const project = {
            title,
            slug,
            category: "Construction Works",
            description: `${title} project delivered with precision and quality craftsmanship.`,
            location: "",
            status: "Completed",
            coverImage: images[0],
            galleryImages: images,
            order: totalProjects,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          await projectsCollection.insertOne(project);
          totalProjects++;
          console.log(`  Imported: ${title} (${images.length} images)`);
        }
      }

      // Process subdirectories (skip Videos/)
      for (const sub of subFolders) {
        if (sub.toLowerCase() === "video" || sub.toLowerCase() === "videos") continue;
        const projectDir = join(folderPath, sub);

        // Check if there are deeper subdirs
        const deeperSubs = readdirSync(projectDir).filter((f) => {
          const fullPath = join(projectDir, f);
          return statSync(fullPath).isDirectory();
        });

        if (deeperSubs.length > 0) {
          for (const deep of deeperSubs) {
            const deepPath = join(projectDir, deep);
            const images = await copyImages(deepPath, slugify(`${folder}-${deep}`), `${folder} - ${deep}`);
            if (images.length === 0) continue;
            const title = `${folder} - ${deep}`;
            const slug = slugify(title);
            const project = {
              title,
              slug,
              category: "Construction Works",
              description: `${title} project delivered with precision and quality craftsmanship.`,
              location: "",
              status: "Completed",
              coverImage: images[0],
              galleryImages: images,
              order: totalProjects,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            await projectsCollection.insertOne(project);
            totalProjects++;
            console.log(`  Imported: ${title} (${images.length} images)`);
          }
        } else {
          const images = await copyImages(projectDir, slugify(`${folder}-${sub}`), `${folder} - ${sub}`);
          if (images.length === 0) continue;
          const title = `${folder} - ${sub}`;
          const slug = slugify(title);
          const project = {
            title,
            slug,
            category: "Construction Works",
            description: `${title} project delivered with precision and quality craftsmanship.`,
            location: "",
            status: "Completed",
            coverImage: images[0],
            galleryImages: images,
            order: totalProjects,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          await projectsCollection.insertOne(project);
          totalProjects++;
          console.log(`  Imported: ${title} (${images.length} images)`);
        }
      }
    }
  }

  console.log(`\nImport complete! ${totalProjects} projects imported.`);
  await mongoose.disconnect();
}

main().catch(console.error);
