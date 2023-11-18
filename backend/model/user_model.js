const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
