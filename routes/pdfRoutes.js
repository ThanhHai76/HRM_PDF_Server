const express = require("express");
const {
  uploadPDFController,
  uploadErrorController
} = require("../controllers/uploadPDFController");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadsPDF = multer({
  limits: {
    fileSize: 20000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.pdf$/)) {
      return cb(new Error("Please upload a PDF"));
    }
    cb(undefined, true);
  },
  storage: storage,
});

router
  .route("/upload_pdf")
  .post(uploadsPDF.single("pdfFile"), uploadPDFController),
  uploadErrorController;

module.exports = router;
