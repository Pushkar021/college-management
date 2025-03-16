const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const File = require("../models/Assignment");
const User = require("../models/users");
const StudentAssignment = require("../models/studentAssignment");

const uploadFile = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body received:", req.body);

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

    const { subject } = req.body;

    const fileInfo = await File.create({
      filename: req.file.originalname,
      url: result.secure_url,
      subject: subject,
    });

   
    const students = await User.find({ role: "student" });

    const studentAssignments = students.map((student) => ({
      studentId: student._id,
      assignmentId: fileInfo._id,
      status: "pending",
    }));

    await StudentAssignment.insertMany(studentAssignments);

    res.json({
      url: result.secure_url,
      message: "File uploaded successfully and assigned to students!",
      fileInfo,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

const getUploadedAssignment = async (req, res) => {
  try {
    const results = await File.find();

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No assignments found" });
    }

    res.json({
      message: "Assignments fetched successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Error fetching assignments" });
  }
};


module.exports = { uploadFile, getUploadedAssignment };
