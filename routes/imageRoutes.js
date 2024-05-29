const express = require("express");
const {
  getImageById,
  uploadImageController,
  uploadErrorController,
} = require("../controllers/uploadImageController");
const router = express.Router();

var multer = require("multer");

const storage = multer.memoryStorage();;

const uploadsImage = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|tiff|svg)$/i)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
  storage: storage,
});

router
  .route("/upload_image")
  .post(uploadsImage.single("imageFile"), uploadImageController),
  uploadErrorController;

router.route("/get-image/:id").get(getImageById);

module.exports = router;
