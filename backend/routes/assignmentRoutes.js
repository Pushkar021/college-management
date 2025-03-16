const express = require("express");
const router = express.Router()
const multer = require("multer");
const {
  uploadFile,
  getUploadedAssignment,
} = require("../controllers/assignmentController");

const upload = multer({ dest: "uploads/" });

// Route for faculty to upload assignments
router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getUploadedAssignment);
module.exports = router;

