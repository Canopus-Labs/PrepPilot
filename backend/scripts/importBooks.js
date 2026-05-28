/*
 * One-time importer: loads all files from ../books into MongoDB (Book collection)
 * then removes the local books directory.
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Book = require("../models/Book");

// books folder lives at project root (one level above backend)
const BOOKS_ROOT = path.join(__dirname, "..", "..", "books");

const mimeByExt = {
  pdf: "application/pdf",
  txt: "text/plain",
  md: "text/markdown",
  epub: "application/epub+zip",
};

function createBucket() {
  const db = mongoose.connection?.db;
  if (!db) throw new Error("Database not initialized yet");
  return new mongoose.mongo.GridFSBucket(db, { bucketName: "books" });
}

async function streamToGridFS(bucket, filePath, filename, mimeType) {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimeType,
    });
    fs.createReadStream(filePath)
      .on("error", reject)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => resolve(uploadStream.id));
  });
}

async function importBooks() {
  await connectDB();

  if (!fs.existsSync(BOOKS_ROOT)) {
    throw new Error(`Books folder not found at ${BOOKS_ROOT}`);
  }

  const bucket = createBucket();

  // Reset previous imports
  await Book.deleteMany({});
  await bucket.drop().catch((err) => {
    if (err && err.code !== 26) throw err; // 26 = ns not found
  });

  const entries = await fs.promises.readdir(BOOKS_ROOT, { withFileTypes: true });
  let imported = 0;
  let categories = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    categories += 1;
    const category = entry.name;
    const categoryPath = path.join(BOOKS_ROOT, category);
    const files = await fs.promises.readdir(categoryPath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile() || file.name.startsWith(".")) continue;
      const filePath = path.join(categoryPath, file.name);
      const stat = await fs.promises.stat(filePath);
      const ext = path.extname(file.name).replace(/^\./, "").toLowerCase();
      const mimeType = mimeByExt[ext] || "application/octet-stream";

      const fileId = await streamToGridFS(bucket, filePath, file.name, mimeType);
      await Book.create({
        name: file.name,
        category,
        mimeType,
        size: stat.size,
        fileId,
      });
      imported += 1;
    }
  }

  if (imported === 0) {
    throw new Error("No files found to import.");
  }

  // Remove the local books directory after successful import
  await fs.promises.rm(BOOKS_ROOT, { recursive: true, force: true });

  return { imported, categories };
}

importBooks()
  .then((result) => {
    console.log(`Imported ${result.imported} files from ${result.categories} categories.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to import books:", err.message);
    process.exit(1);
  });

importBooks()
  .then((result) => {
    console.log(`Imported ${result.imported} files from ${result.categories} categories.`);
    if (result.skipped.length) {
      console.log("Skipped (too large >15MB):");
      for (const s of result.skipped) {
        console.log(`- ${s.category}/${s.name} (${s.size} bytes)`);
      }
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to import books:", err.message);
    process.exit(1);
  });
