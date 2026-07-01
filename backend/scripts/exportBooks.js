const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Book = require("../models/Book");

// Export to a folder named "exported_books" at project root
const EXPORT_ROOT = path.join(__dirname, "..", "..", "exported_books");

function createBucket() {
    const db = mongoose.connection ? .db;
    if (!db) throw new Error("Database not initialized yet");
    return new mongoose.mongo.GridFSBucket(db, { bucketName: "books" });
}

async function streamFromGridFS(bucket, fileId, filePath) {
    return new Promise((resolve, reject) => {
        const downloadStream = bucket.openDownloadStream(fileId);
        const writeStream = fs.createWriteStream(filePath);

        downloadStream
            .pipe(writeStream)
            .on("error", reject)
            .on("finish", resolve);
    });
}

async function exportBooks() {
    await connectDB();

    // Create export root if it doesn't exist
    if (!fs.existsSync(EXPORT_ROOT)) {
        fs.mkdirSync(EXPORT_ROOT, { recursive: true });
    }

    const bucket = createBucket();
    const books = await Book.find({});

    if (books.length === 0) {
        console.log("No books found in database to export.");
        return { exported: 0 };
    }

    let exported = 0;

    for (const book of books) {
        const categoryPath = path.join(EXPORT_ROOT, book.category);

        // Create category subdirectory
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }

        const filePath = path.join(categoryPath, book.name);

        try {
            await streamFromGridFS(bucket, book.fileId, filePath);
            console.log(`Exported: ${book.category}/${book.name}`);
            exported += 1;
        } catch (err) {
            console.error(`Failed to export ${book.name}:`, err.message);
        }
    }

    return { exported };
}

exportBooks()
    .then((result) => {
        console.log(`\nSuccessfully exported ${result.exported} books to ${EXPORT_ROOT}`);
        process.exit(0);
    })
    .catch((err) => {
        console.error("Export failed:", err.message);
        process.exit(1);
    });