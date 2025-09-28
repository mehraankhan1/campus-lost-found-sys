// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String, // or hashed
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

module.exports = mongoose.model("User", userSchema);
