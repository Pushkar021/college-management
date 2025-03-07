const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load .env file first

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DATABASE CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log("❌ ERROR CONNECTING TO MONGODB:", err));
  