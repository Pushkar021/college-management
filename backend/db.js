const mongoose = require("mongoose");
const dotenv = require('dotenv');

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLYYYYYY "))
  .catch((err) => console.log("ERROR CONNECTING TO MONGODBBBBBB", err));

dotenv.config();


  //"mongodb://localhost:27017/brightsmile"
 //process.env.MONGO_CONNECTION_STRING 