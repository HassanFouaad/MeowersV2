const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: "Email Is Required",
    },
    password: { type: String, required: "Password Is Required" },

    followers: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
