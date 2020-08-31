const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

exports.module = Post = mongoose.model("Post", postSchema);
