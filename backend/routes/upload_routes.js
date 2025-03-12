const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile, getAllFiles } = require("../controllers/files");
const upload = multer({ dest: "uploads/" });


router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getAllFiles);


module.exports = router
