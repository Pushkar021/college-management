const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    profile_image: { type: String, default: null },
    enrollment: { type: BigInt, default: null },
    email: { type: String, default: null },
    mobile_phone: { type: Number, default: null },
    emailVerified: { type: Boolean, default: false },
    mobilePhoneVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "suspended", "archived", "marked_for_deletion"],
      default: "active",
    },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
    password: { type: String, default: null },
    checkBydelete: {
      type: String,
      enum: ["user", "teacher"],
      default: "user",
    },
    invalid_jwt: [{
      token: { type: String },
      expiry: { type: Date }
    }],
  },
  {
    collection: "users",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
