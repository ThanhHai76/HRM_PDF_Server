const imageService = require("../services/imageService");

exports.getImageById = async (req, res) => {
  try {
    const Image = await imageService.getImageById(req.params.id);
    const buffer = Buffer.from(Image.contentImage, 'base64');
    res.set('Content-Type', 'image/jpeg');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.uploadImageController = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Convert the file buffer to Base64
    const base64Content = fileBuffer.toString('base64');
    const content = {
      filename: req.file.originalname,
      contentImage: base64Content
    }
    const Image = await imageService.createImage(content);
    const linkImage = `${process.env.BACKEND_URI_SERVER}/api/image/get-image/${Image._id}`;
    res.json({ data: linkImage, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.uploadErrorController = (error, req, res, next) => {
  res.status(400).send({
    error: error.message,
  });
}
