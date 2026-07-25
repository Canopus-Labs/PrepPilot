const multer = require("multer");
const fs = require("fs");
const path = require("path");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const sanitizeFilename = (filename) => {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  const sanitizedBase = basename
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `${sanitizedBase || "file"}${ext.toLowerCase()}`;
};

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure storage
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${safeFilename}`);
  },
});

// File filter for image uploads
const imageFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ]);
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

  if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(ext)) {
    console.log("REJECTED:", file.mimetype, "| ext:", ext);
    cb(new Error(`Unsupported file type. Expected an image (jpg, png, webp) but got mimetype '${file.mimetype}' and extension '${ext}'.`), false);
    return;
  }

  cb(null, true);
};

// File filter for resume (PDF) uploads
const resumeFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype === "application/pdf" && ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf format is allowed for resume uploads. Ensure the file extension matches the content type."), false);
  }
};

// Upload instance for images (disk storage)
const upload = multer({
  storage: diskStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Upload instance for resumes (memory storage)
const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter: resumeFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = { upload, uploadResume };