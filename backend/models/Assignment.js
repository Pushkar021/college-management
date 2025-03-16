const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String },
    url: { type: String, required: true },
    subject: { type: String, required: true },
  },
  {
    collection: "fileUrl",
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
