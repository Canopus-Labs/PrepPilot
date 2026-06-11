const multer = require("multer");
const fs = require("fs");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image uploads
const imageFileFilter = (req, file, cb) => {
  console.log("FILE:", file.originalname);
  console.log("MIMETYPE:", file.mimetype);

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("REJECTED:", file.mimetype);
    cb(new Error(`Unsupported type: ${file.mimetype}`), false);
  }
};

// File filter for resume (PDF) uploads
const resumeFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf format is allowed for resume uploads"), false);
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