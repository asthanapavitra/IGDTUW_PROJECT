const multer = require('multer');
const path = require('path');

// store in memory first
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"));
  }
});

module.exports = upload;
