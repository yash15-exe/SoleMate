import multer from "multer";

// Configure multer for file storage
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "./temp"); // Specify the folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Create multer instance with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

// Middleware function
export const multerMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: err.message });
    }

    // Everything went fine.
    next();
  });
};
