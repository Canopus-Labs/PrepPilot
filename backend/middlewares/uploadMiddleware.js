const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { fileTypeFromBuffer } = require("file-type");

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

// Study/notes PDFs tend to be larger than resumes, so they get a higher cap.
const NOTES_MAX_FILE_SIZE = 15 * 1024 * 1024;

const uploadNotes = multer({
  storage: multer.memoryStorage(),
  fileFilter: resumeFileFilter, // PDF-only, same filter as resumes
  limits: { fileSize: NOTES_MAX_FILE_SIZE },
});

module.exports = { upload, uploadResume, uploadNotes, NOTES_MAX_FILE_SIZE };
