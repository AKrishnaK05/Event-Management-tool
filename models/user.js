const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  name: String, // Optional
  role: { type: String, default: "student" } // or 'organizer'
});

module.exports = mongoose.model("User", userSchema);

