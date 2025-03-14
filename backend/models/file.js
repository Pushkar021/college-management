const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema(
  
  {
    filename:{type:String},
    url:{type:String  , required:true}
  },
 
  {
    collection: "fileUrl",
    timestamps: true,
  }
);

const file = mongoose.model("file", fileSchema);

module.exports = file;
