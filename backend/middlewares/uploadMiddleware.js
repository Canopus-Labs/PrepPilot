const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { fileTypeFromBuffer } = require("file-type");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const sanitizeBase = (filename) =>
  path
    .basename(filename, path.extname(filename))
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || "file";

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// File filter for image uploads
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported type: ${file.mimetype}`), false);
  }
};

// MIME type -> server-decided whitelisted extension. Extensions are never
// taken from the client-supplied filename.
const IMAGE_EXTENSION_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Detect the true image type from the content's magic bytes and derive a
 * server-decided filename with a whitelisted extension. Returns null when the
 * buffer is not a supported image, so the client mimetype/extension can never
 * be trusted to determine what gets stored or served.
 * @param {import('multer').File} file - Multer file with a Buffer (memory storage).
 * @returns {Promise<string|null>} Stored filename, or null if content is not an image.
 */
const resolveImageFileName = async (file) => {
  const fileType = await fileTypeFromBuffer(file.buffer);
  const ext = fileType && IMAGE_EXTENSION_BY_MIME[fileType.mime];
  if (!ext) return null;
  return `${Date.now()}-${sanitizeBase(file.originalname)}.${ext}`;
};

/**
 * Post-upload middleware for profile images: validates the content by magic
 * bytes (never the client mimetype), writes the file to disk using a
 * server-decided whitelisted extension, and stashes the stored filename on
 * req.file.filename for the route handler.
 */
const validateImageUpload = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const filename = await resolveImageFileName(req.file);
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file. Only JPEG, PNG, and WebP images are allowed.",
      });
    }
    await fs.promises.writeFile(path.join("uploads", filename), req.file.buffer);
    req.file.filename = filename;
    next();
  } catch (error) {
    console.error("Error validating image upload:", error);
    return res.status(500).json({ success: false, message: "Failed to validate image" });
  }
};

// Extensions that are safe to render inline from /uploads.
const SERVED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * setHeaders callback for the /uploads express.static mount. Prevents content
 * sniffing, sandboxes any inline rendering, and forces non-image content to be
 * downloaded as an attachment instead of executed by the browser.
 * @param {import('express').Response} res
 * @param {string} filePath
 */
const uploadsStaticHeaders = (res, filePath) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
  const ext = path.extname(filePath).toLowerCase();
  if (!SERVED_IMAGE_EXTENSIONS.has(ext)) {
    res.setHeader("Content-Disposition", "attachment");
    res.setHeader("Content-Type", "application/octet-stream");
  }
};

// File filter for resume (PDF) uploads with basic MIME type check
const resumeFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf format is allowed for resume uploads"), false);
  }
};

// Validate file magic bytes after upload to ensure actual file type matches extension
const validateResumeMagicBytes = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const fileType = await fileTypeFromBuffer(req.file.buffer);

    const allowedMimeTypes = new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]);

    if (!fileType || !allowedMimeTypes.has(fileType.mime)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are allowed.'
      });
    }

    next();
  } catch (error) {
    console.error('Error validating file type:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to validate file'
    });
  }
};

// Upload instance for images (memory storage so magic bytes can be inspected
// before anything is persisted; the client mimetype/filename is never trusted)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Upload instance for resumes (memory storage)
const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter: resumeFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Study/notes PDFs tend to be larger than resumes, so they get a higher cap.
const NOTES_MAX_FILE_SIZE = 15 * 1024 * 1024;

const uploadNotes = multer({
  storage: multer.memoryStorage(),
  fileFilter: resumeFileFilter, // PDF-only, same filter as resumes
  limits: { fileSize: NOTES_MAX_FILE_SIZE },
});

module.exports = {
  upload,
  uploadResume,
  uploadNotes,
  NOTES_MAX_FILE_SIZE,
  validateResumeMagicBytes,
  validateImageUpload,
  resolveImageFileName,
  uploadsStaticHeaders,
};
