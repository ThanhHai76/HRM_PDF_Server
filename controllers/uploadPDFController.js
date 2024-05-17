exports.uploadPDFController = async (req, res) => {
    try {
      const savePath = process.env.BACKEND_URI + "/" + req.file.path;
      res.json({ data: savePath.replaceAll("\\", "/"), status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.uploadErrorController = (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  };