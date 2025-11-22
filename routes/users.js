const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');

mongoose.connect(
  "mongodb+srv://tabishabbasmzp04_db_user:NtTV3totSwUXpLus@practice.ggmt3nu.mongodb.net/pinterest?appName=Practice"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  dp: {
    type: String, // URL of profile picture
    default: "",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.plugin(plm)

module.exports = mongoose.model("User", userSchema);
