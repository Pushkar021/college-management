const express = require("express");
const multer = require("multer");
const {
    getStudentAssignments,
    submitAssignment,
    getSubmissionStatus,
} = require("../controllers/submissionController");
const { acceptAssignment, getAllAssignments } = require("../controllers/submissionController");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Get assignments assigned to the logged-in student
router.get("/assignments", getStudentAssignments);

// Submit an assignment
router.post("/submit", upload.single("file"), submitAssignment);

router.get("/allassignments", getAllAssignments); // Get all assignments
router.post("/accept-assignment", acceptAssignment); // Faculty accepting assignment


// Check submission status
router.get("/status", getSubmissionStatus);

module.exports = router;
