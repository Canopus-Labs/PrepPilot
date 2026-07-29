const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const sanitizeFilename = (filename, detectedExt) => {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  const sanitizedBase = basename
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `${sanitizedBase || "file"}.${detectedExt}`;
};

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported type: ${file.mimetype}`), false);
  }
};

const resumeFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf format is allowed for resume uploads"), false);
  }
};

const multerImageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const verifyRealImageType = async (buffer) => {
  const { fromBuffer } = require("file-type");
  const result = await fromBuffer(buffer);
  if (!result || !ALLOWED_MIME.has(result.mime)) {
    return null;
  }
  return result;
};

const persistVerifiedImage = async (fileBuffer, uploadDir, originalName) => {
  const detected = await verifyRealImageType(fileBuffer);
  if (!detected) {
    throw new Error("File content does not match an allowed image type");
  }
  
  const safeFilename = sanitizeFilename(originalName, detected.ext);
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}-${safeFilename}`;
  await fs.promises.writeFile(path.join(uploadDir, filename), fileBuffer);
  return filename;
};

const upload = {
  single: (fieldname) => {
    return (req, res, next) => {
      multerImageUpload.single(fieldname)(req, res, async (err) => {
        if (err) return next(err);
        if (req.file) {
          try {
            const filename = await persistVerifiedImage(req.file.buffer, "uploads", req.file.originalname);
            req.file.filename = filename;
            next();
          } catch (verifyErr) {
            next(verifyErr);
          }
        } else {
          next();
        }
      });
    };
  }
};

// Upload instance for resumes (memory storage)
const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter: resumeFileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = { upload, uploadResume };