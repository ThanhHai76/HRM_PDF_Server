const pdfService = require("../services/pdfService");

exports.getPDFById = async (req, res) => {
  try {
    const PDF = await pdfService.getPDFById(req.params.id);
    const buffer = Buffer.from(PDF.contentPDF, 'base64');
    res.set('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadPDFController = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Convert the file buffer to Base64
    const base64Content = fileBuffer.toString('base64');
    const content = {
      filename: req.file.originalname,
      contentPDF: base64Content
    }
    const PDF = await pdfService.createPDF(content);
    const linkPDF = `${process.env.BACKEND_URI_SERVER}/api/pdf/get-pdf/${PDF._id}`;
    res.json({ data: linkPDF, status: "success" });
    // const savePath = process.env.BACKEND_URI_SERVER + "/" + req.file.path;
    // res.json({ data: savePath.replaceAll("\\", "/"), status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadErrorController = (error, req, res, next) => {
  res.status(400).send({
    error: error.message,
  });
};
