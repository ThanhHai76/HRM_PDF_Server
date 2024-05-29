const ImageModel = require("../models/Image");

exports.getAllImages = async () => {
  return await ImageModel.find();
};

exports.createImage = async (Image) => {
  return await ImageModel.create(Image);
};

exports.getImageById = async (id) => {
    return await ImageModel.findById(id);
  };

exports.updateImage = async (id, Image) => {
  return await ImageModel.findByIdAndUpdate(id, Image);
};

exports.deleteImage = async (id) => {
  return await ImageModel.findByIdAndDelete(id);
};
