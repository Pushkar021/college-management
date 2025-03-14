const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const file = require("../models/file")

const uploadFile = async (req, res) => {
  try {
    console.log("file recevied:", req.file);
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploded!",
      });
    }
    const filepath = req.file.path;
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "raw",
      public_id: `uploads/${Date.now()}-${req.file.originalname}`,
    });

    fs.unlinkSync(filepath);
    const Fileinfo = await file.create({
      filename: req.file.originalname,
      url: result.secure_url,
    });
    res.json({
      url: result.secure_url,
      message: "File uploaded successfully!",
      Fileinfo,
    });
  } catch (error) {
    console.error(" Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};


const getAllFiles = async (req, res) => {
  try {
    const files = await File.find(); 
    res.json(files);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadFile, getAllFiles };
