const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const File = require("../models/file");

const uploadFile = async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const filepath = req.file.path;
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto", 
      public_id: `uploads/${Date.now()}-${req.file.originalname}`,
    });

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    const fileInfo = await File.create({
      filename: req.file.originalname,
      url: result.secure_url,
    });

    res.json({
      url: result.secure_url,
      message: "File uploaded successfully!",
      fileInfo,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
      details: error.stack,
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      error: error.message,
      details: error.stack,
    });
  }
};

module.exports = { uploadFile, getAllFiles };
