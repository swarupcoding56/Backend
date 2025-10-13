// config/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const limits = { fileSize: 1024 * 1024 * 5 };

const upload = multer({ storage, limits });

export default upload;
