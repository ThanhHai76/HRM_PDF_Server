const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentPDF: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PDF", pdfSchema);
