const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const StudentAssignment = require("../models/studentAssignment");

const getStudentAssignments = async (req, res) => {
  try {
    const studentId = req.body.studentId || "67d6e74a96f85fcc29e2e57a"; 

    const assignments = await StudentAssignment.find({ studentId }).populate(
      "assignmentId"
    );

    res.json(assignments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      error: error.message,
    }); 
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await StudentAssignment.find().populate("assignmentId","subject").populate('studentId', 'first_name last_name')
    res.json(assignments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      error: error.message,

    });
  }
};

const submitAssignment = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body received:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const filepath = req.file.path;
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
      public_id: `submissions/${Date.now()}-${req.file.originalname}`,
    });

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    const { assignmentId } = req.body;
    const studentId = req.body.studentId || "67d6e74a96f85fcc29e2e57a"; // Assuming user ID is from auth middleware

    let assignment = await StudentAssignment.findOne({
      studentId,
      assignmentId,
    });

    if (assignment) {
      assignment.status = "submitted";
      assignment.submittedFile = result.secure_url;
      await assignment.save();
    } else {
      assignment = await StudentAssignment.create({
        studentId,
        assignmentId,
        submittedFile: result.secure_url,
        status: "submitted",
      });
    }

    res.json({ message: "Assignment submitted successfully!", assignment });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

const acceptAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body; // Faculty sends assignmentId and studentId
console.log(
  "Searching for assignment with studentId:",
  studentId,
  "and assignmentId:",
  assignmentId
);

    let assignment = await StudentAssignment.findOne({
      studentId,
      assignmentId,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.status = "submitted";
    await assignment.save();

    res.json({
      message: "Assignment accepted successfully",
      assignment,
    });
  } catch (error) {
    console.error("Acceptance Error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
   
    });
  }
};

const getSubmissionStatus = async (req, res) => {
  try {
    const studentId = req.body.studentId || "67d6e74a96f85fcc29e2e57a"; // Assuming user ID is from auth middleware

    const submissions = await StudentAssignment.find({ studentId }).populate(
      "assignmentId"
    );

    res.json(submissions);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      error: error.message,
     
    });
  }
};

module.exports = {
  getStudentAssignments,
  submitAssignment,
  getSubmissionStatus,
  acceptAssignment,
  getAllAssignments,
};
