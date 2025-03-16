const mongoose = require("mongoose");

const studentAssignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "submitted", "checked"],
    default: "pending",
  },
  submittedFile: { type: String, default: null }, 
  uploadedAt: { type: Date, default: Date.now },
});

const StudentAssignment = mongoose.model(
  "StudentAssignment",
  studentAssignmentSchema
);

module.exports = StudentAssignment;
